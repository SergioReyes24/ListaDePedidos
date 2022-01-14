let ArregloProductos = [];
let ArregloPrecios = [];
let ArregloCantidad = [];
let Registro = document.getElementById("Registro");
let PrecioSumador = 0;
let PrecioFinal = 0;

function PrecioDinamico(){ // Función de precio dinámico que cada vez que es presionado el botón, se recogen los datos, se mandan a arreglos, se multiplican, suman e imprimen sustituyendo párrafos "p" en el html
   let Productos = document.getElementById("Productos").value;
   let Precios = document.getElementById("Precios").value;
   let Cantidad = document.getElementById("Cantidad").value;
   let PrecioMultiplicado = 0;
   
   ArregloProductos.push(Productos + "<br>");
   ArregloCantidad.push(Cantidad + "<br>");

   if(Cantidad > 0){ // Condicional que funcionará para que cuando se agregue la cantidad se muestre el total del precio de los productos multiplicado por la cantidad de estos
      PrecioMultiplicado = Precios * Cantidad;
   }

   ArregloPrecios.push(PrecioMultiplicado + "<br>");
    
   ArregloPrecios.forEach(function(element){ // Ciclo foreach en el arreglo "ArregloPrecios" que multiplica el precio de los productos por el IVA ya sumado (1.16) y se guarda en una variable para su uso fuera del ciclo

      let IVA = 1.16 * parseFloat(element);

      PrecioSumador = IVA;
   });

   PrecioFinal += PrecioSumador; // Variable que obtiene el precio final y se actualiza con el precio

   let a = new String(ArregloProductos);

   document.getElementById("ProductosMostrados").innerHTML = a.replace(",", " ");
   document.getElementById("CantidadMostrada").innerHTML = ArregloCantidad;
   document.getElementById("PreciosMostrados").innerHTML = ArregloPrecios;
   document.getElementById("Pago").innerHTML = "El monto total es: " + PrecioFinal;
}

Registro.addEventListener("click", PrecioDinamico);   // Evento ligado al elemento del html "Registro" que cada vez que se presiona ejecuta la función PrecioDinamico