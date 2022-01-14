// Autor: Sergio Sebastián Reyes Arango
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MongoDB_URL = 'mongodb://localhost/Pedidos';
const Schema = mongoose.Schema;
const model = mongoose.model;
const methodoverride = require('method-override');  // Módulo para utilizar métodos HTTP como delete o put con post para formularios
const req = require('express/lib/request');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));  // Configuración para uso de archivos estaticos como css o js
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodoverride('_method')); // Configuración del módulo de métodos

// Base de datos
mongoose.connect(MongoDB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log('La base de datos esta conectada'))
.catch(err => console.log(err));

// Modelos y Schemas
const Pedido = new Schema ({
    Productos: String,
    Precios: Number,
    Cantidad: Number
});

const Producto = model('Producto', Pedido);

// Rutas
// Página principal
app.get('/', (req, res) => {
    res.render('index');
});

// Página principal obteniendo el producto
app.post('/', async (req, res) => {
    const {Productos, Precios, Cantidad } = req.body;

    const NuevoProducto = new Producto ({Productos, Precios, Cantidad});
    await NuevoProducto.save(); // Registro del nuevo producto en la base de datos
});

// Página de productos registrados
app.get('/registro', async (req, res) => {
    const Productos = await Producto.find();    // Creación de arreglo con todos los productos en la base de datos
    res.render('ListaDePedidos', { Productos });
})

// Eliminar productos
app.delete('/delete/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);    // Método para eliminar un producto ya registrado
    res.redirect('/registro');
});

// Editar productos
app.get('/edit/:id', async (req, res) => {
    const objeto = await Producto.findById(req.params.id);  // Método para encontrar un producto y mostrarlo en consola
    res.render('Edit', { objeto });
});

app.put('/edit/:id', async (req, res) => {
    const { Precios, Cantidad } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, {Precios, Cantidad});   // Método para actualizar el precio y la cantidad de cada artículo
    res.redirect('/registro');
});

// Configuración del puerto
app.listen(app.get('port'), () => {
    console.log('Server abierto en el puerto:',app.get('port'));
});
