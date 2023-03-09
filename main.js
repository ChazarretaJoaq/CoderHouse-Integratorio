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
let arrayDetalles = [
  {
    id: 1,
    nombre: "Camiseta Titular Seleccion",
    categoria: "Camiseta",
    detalle: "Camiseta Titular Seleccion con las 3 estrellas",
    precio: 19000,
    img: "img/camiseta-argentina.jpg",
  },
  {
    id: 2,
    nombre: "Camiseta Alternativa Seleccion",
    categoria: "Camiseta",
    detalle: "Camiseta Aleternativa Seleccion color violeta con detalles",
    precio: 17000,
    img: "img/seleccion-alternativa.jpg",
  },
  {
    id: 3,
    nombre: "Short Titular Seleccion",
    categoria: "Short",
    detalle: "Short Titular Seleccion color negro",
    precio: 15000,
    img: "img/short_seleccion_argentina.jpg",
  },
  {
    id: 4,
    nombre: "Short Alternativo Seleccion",
    categoria: "Short",
    detalle: "Short Alternativa Seleccion color violeta",
    precio: 15000,
    img: "img/short_alternativo.jpg",
  },
  {
    id: 5,
    nombre: "Campera Seleccion",
    categoria: "Campera",
    detalle: "Campera Seleccion con capucha para lluvia",
    precio: 26000,
    img: "img/campera-seleccion.jpg",
  },
  {
    id: 6,
    nombre: "Campera Seleccion Reversible",
    categoria: "Campera",
    detalle:
      "Campera Reversible Seleccion de un lado celeste y del otro violeta",
    precio: 32000,
    img: "img/campera_seleccion_2.jpg",
  },
  {
    id: 7,
    nombre: "Medias Seleccion Argentina",
    categoria: "Medias",
    detalle: "Medias Seleccion, blancas titulares",
    precio: 12000,
    img: "img/medias_seleccion.jpg",
  },
  {
    id: 8,
    nombre: "Botines Adidas",
    categoria: "Botines",
    detalle: "Botines Adidas, ultima generacion para futbol sala",
    precio: 35000,
    img: "img/botines_seleccion.jpg",
  },
];

let vecProduct = [];

function calcularIva(valor) {
  return valor * 1.21;
}
function calcularCuotas(valor, cuotas) {
  let total;
  let int;
  if (cuotas == 1) {
    int = 0;
    total = valor;
  } else if (cuotas == 3) {
    int = 1.15;
    total = valor * int;
  } else if (cuotas == 6) {
    int = 1.2;
    total = valor * int;
  } else if (cuotas == 12) {
    int = 1.25;
    total = valor * int;
  }
  if (int > 0) {
    return {
      total: total,
      interes: valor * (int - 1).toFixed(2),
    };
  } else {
    return {
      total: total,
      interes: valor,
    };
  }
}
function obtenerValorProduct() {
  return (valor1 = document.getElementById("Productos").value);
}
function obtenerCantidadProduct() {
  return (cantidad = document.getElementById("Cantidad").value);
}
function obtenerIvaProduct(valor, cantidad) {
  return (iva = calcularIva(parseFloat(valor * cantidad)));
}
function obtenerCuotas() {
  return (cuotas = document.getElementById("cuotas").value);
}
let filtroSelect = document.querySelector("#filtro");
let contenedor = document.getElementById("contenedor");
if (filtroSelect) {
  filtroSelect.addEventListener("change", () => {
    if (filtroSelect.value == "all") {
      mostrarProductos(arrayDetalles);
    } else {
      let arrayFiltrado = arrayDetalles.filter(
        (prod) => prod.categoria.toLowerCase() == filtroSelect.value
      );
      console.log(arrayFiltrado);
      mostrarProductos(arrayFiltrado);
    }
  });
}

const mostrarProductos = (array) => {
  if (contenedor) {
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
  }
};

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
  let cantidad = obtenerCantidadProduct();
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
  document.getElementById("label").innerHTML = "";
  document.getElementById("carrito").innerHTML = "";
  document.getElementById("total").innerHTML = "";
  let sumTotal = 0;
  let mos_arreglo = localStorage.getItem("vect_product");
  let pantallacarrito = document.getElementById("carrito");
  pantallacarrito.innerHTML = "";
  mos_arreglo = JSON.parse(mos_arreglo);
  for (let i of mos_arreglo) {
    sumTotal += parseFloat(i.total);
    pantallacarrito.innerHTML += `
    </br>
        <table>
            <tr>
                <th>NOMBRE DEL PRODUCTO</th>
                <th>CANTIDAD </th>
                <th>PRECIO </th>
            </tr>
            <tr>
                    <td>${i.nombre}</td>
                    <td> ${i.cantidad}</td>
                    <td>$ ${i.total}</td>
                    <td> <button  class="btn-success btn_eliminar" type="button">  Eliminar </button></td>
            </tr>
        </table>`;
  }

  let btn_borrar = document.querySelectorAll(".btn_eliminar");
  console.log(btn_borrar);
  for (let btn of btn_borrar) {
    btn.addEventListener("click", borrar_producto);
  }
  if (sumTotal > 0) {
    document.getElementById("total").innerHTML += `
        <div >
        <h1>TOTAL A PAGAR:    $ ${parseFloat(sumTotal)}</h1>
        <a href="file:///C:/Users/Usuario/Documents/Coderhouse/CoderHouse-Integratorio/compra.html">
        <button  class="btn-success" type="button"> Finalizar Compra </button> 
        </a>
        </div>
        `;
  }
};

// pantalla de compra 
let inicio = document.getElementById("Inicio");
if (inicio) {
  let mos_arreglo = localStorage.getItem("vect_product");
  mos_arreglo = JSON.parse(mos_arreglo);
  console.log(mos_arreglo);
  inicio.innerHTML = `
  </br>
  <div class="row">
    <div class="column">
      <form class="form2" >
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
          <div class="mostcarrito">
          </br>
          <label class="letra" for="Cuotas">Seleccione cantidad de cuotas: </label>
          <select class="mostcarrito" name="cuotas" id="cuotas">
          <option id="vacio" value="0" selected>--------</option>
          <option id="select1" value="1">1 Cuota</option>
          <option id="select3" value="3">3 Cuotas</option>
          <option id="select6" value="6">6 Cuotas</option>
          <option id="select12" value="12">12 Cuotas</option>
          </select>
          </div>
          </br>
          <li class="button">
            <button class="btn-success" type="submit">Finalizar Compra</button>
          </li>
        </ul>
      </form> 
      </div>
    </div>
        </br> 
        `;
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
