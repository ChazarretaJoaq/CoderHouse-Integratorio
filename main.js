class Product {
  constructor(nombre, precio, detalle, id, categoria, cantidad, total) {
    this.nombre = nombre;
    this.precio = precio;
    this.detalle = detalle;
    this.id = id;
    this.categoria = categoria;
    this.cantidad = cantidad;
    this.total = total;
  }
}
class carritoTotal {
  constructor(total, interes) {
    this.total = total;
    this.interes = interes;
  }
}
let vecProduct = [];
let filtroSelect = document.querySelector("#filtro");
let contenedor = document.getElementById("contenedor");
cargaProd();
if(filtroSelect){
  filtroSelect.addEventListener("change", () => {
    if (filtroSelect.value == "all") {
      mostrarProductos(arrayDetalles);
    } else {
      let arrayFiltrado = arrayDetalles.filter(
        (prod) => prod.categoria.toLowerCase() == filtroSelect.value
      );
      mostrarProductos(arrayFiltrado);
    }
  });}

const mostrarProductos = (array) => {
 if (contenedor){
  contenedor.innerHTML = "";
    array.forEach((prod) => {
      let div = document.createElement("div");
      div.className = "col active align-self-start";
      div.innerHTML = `<div id="CAMISETA" class="card text-center" style="width: 15rem;">
                                <img id="camisetaTitular" class="card-img-top" src=${prod.img}
                                    alt="Card image cap">
                                <p class="PRUEBA">${prod.nombre}</p>
                                <p class="PRUEBA">$ ${prod.precio}  </p>
                            </div>
            `;
      contenedor.appendChild(div);
    });
  };
}
mostrarProductos(arrayDetalles);
const agregarCarrito = () => {
  let label = document.getElementById("label");
  label.innerHTML = "";
  let index = document.getElementById("Productos").selectedIndex;
  let descripcion = arrayDetalles.find(
    (description) => description.id === index
  );
  // obtener precios
  let prodValue = obtenerValorProduct();
  let cantidad = 1;
  let totalIva = calcularIva(prodValue) * cantidad;
  console.log(totalIva);
  if (cantidad > 0 && totalIva > 0) {
    vecProduct.push(
      new Product(
        descripcion.nombre,
        descripcion.precio,
        descripcion.detalle,
        descripcion.id,
        descripcion.categoria,
        cantidad,
        totalIva.toFixed(2)
      )
    );
  }
  let productosMap = vecProduct.map((producto) => {
    return [JSON.stringify(producto), producto];
  });
  let prodMapArr = new Map(productosMap);
  let unicos = [...prodMapArr.values()];
  arreglo_json = JSON.stringify(unicos);
  localStorage.setItem("vect_product", arreglo_json);
};

const mostrarCarrito = () => {
  document.getElementById("total").innerHTML = "";
  let sumTotal = 0;
  let mos_arreglo = localStorage.getItem("vect_product");
  let pantallacarrito = document.getElementById("tbody");
  pantallacarrito.innerHTML = "";
  mos_arreglo = JSON.parse(mos_arreglo);
  for (let i of mos_arreglo) {
    sumTotal += parseFloat(i.total);
    pantallacarrito.innerHTML += `
            <tr>
                    <td>${i.nombre}</td>
                    <td> ${i.cantidad}</td>
                    <td>$ ${i.total}</td>
                    <td> <button  class="btn-danger btn_eliminar" type="button">  Eliminar </button></td>
            </tr>`;
  }

  let btn_borrar = document.querySelectorAll(".btn_eliminar");
  for (let btn of btn_borrar) {
    btn.addEventListener("click", borrar_producto);
  }
  if (sumTotal > 0) {
    document.getElementById("total").innerHTML += `
        <div >
        <h1>TOTAL A PAGAR:    $ ${parseFloat(sumTotal)}</h1>
        <a href="compra.html">
        <button  class="btn-success" type="button"> Finalizar Compra </button> 
        </a>
        </div></br>
        `;
  }
};

// pantalla de compra
let inicio = document.getElementById("Inicio");
if (inicio) {
  let mos_arreglo = localStorage.getItem("vect_product");
  mos_arreglo = JSON.parse(mos_arreglo);
  console.log(mos_arreglo)
  
  inicio.innerHTML = `
  </br>
    <form>
        <ul>
          <li>
            <label class="letra" for="name">Nombre:</label>
            <input type="text" id="name" name="user_name">
          </li>   
          <li>
            <label class="letra" for="name">Apellido:</label>
            <input type="text" id="apellido" name="user_lastname">
          </li>
          <li>
            <label  class="letra" for="mail">Correo electrónico:</label>
            <input type="email" id="mail" name="user_mail">
          </li>
          <li>
            <label class="letra" for="msg">Mensaje:</label>
            <textarea id="msg" name="user_message"></textarea>
          </li>
               </form> 
        `;
        // SEGUNDO DIV
      
        let pantallacarrito = document.getElementById("tbody");
        let total = document.getElementById("total");
        total.innerHTML="";
        let sumTotal=0;
        pantallacarrito.innerHTML = "";
        for (let i of mos_arreglo) {
          sumTotal += parseFloat(i.total);
          pantallacarrito.innerHTML += `
                  <tr>
                          <td>${i.nombre}</td>
                          <td> ${i.cantidad}</td>
                          <td>$ ${i.total}</td>
                          <td> <button  class="btn-danger btn_eliminar" type="button">  Eliminar </button></td>
                  
                  </tr>
            `;

        }
        total.innerHTML=`PRECIO TOTAL: $${sumTotal}`
}


const compra_producto = () => {
  let formulario = document.getElementById("compra");
  console.log("LLEGO");
  formulario.innerHTML = `<h1>LLEGO </h1>`;
};
function borrar_producto(e) {
  console.log("BORRAR ESTE ELEMENTO: ", e.target);
  let abuelo = e.target.parentNode.parentNode;
  console.log(abuelo);
  // let producto_eliminar = abuelo.querySelector("p").textContent;
  //   function eliminar_producto(producto) {
  //     return producto.nombre != producto_eliminar;
  //   }
  //   let resultado_filter = carrito.filter(eliminar_producto);

  //   carrito = resultado_filter;
  //   // console.log( carrito );

  mostrarCarrito();
  //abuelo.remove();
}

const realizarCompra = () => {
  document.getElementById("label").innerHTML = "";

  let valor1 = document.getElementById("Productos").value;
  let cantidad = document.getElementById("Cantidad").value;
  let iva = calcularIva(parseFloat(valor1 * cantidad));
  let cuotas = document.getElementById("cuotas").value;
  if (iva > 0 && cuotas != 0) {
    let { total, interes } = calcularCuotas(iva, cuotas);
    if (
      confirm(`El precio final del producto es: ${total.toFixed(2)}$
    Valor de Cuota: ${(total / cuotas).toFixed(2)} $. En ${cuotas} cuotas.
    Con un interes de ${interes.toFixed(2)}$.`)
    ) {
      //document.getElementById('label').innerHTML = "CONFIRMO PAGO";
    } else {
      //document.getElementById('label').innerHTML = "CANCELO EL PAGO";
      document.getElementById("Productos").value = 0;
      document.getElementById("cuotas").value = 0;
    }
  } else if (cuotas == 0 || valor1 == 0 || iva == 0 || valor1 != 0) {
    alert("Seleccione un producto / cuotas a pagar");
  }
};
