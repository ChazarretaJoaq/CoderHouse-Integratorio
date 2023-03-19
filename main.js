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

if (filtroSelect) {
  filtroSelect.addEventListener("change", () => {
    if (filtroSelect.value == "all") {
      mostrarProductos(arrayDetalles);
    } else {
      let arrayFiltrado = arrayDetalles.filter(
        (prod) => prod.categoria.toLowerCase() == filtroSelect.value
      );
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
  console.log(prodValue);
  let cantidad = 1;
  // let totalIva = calcularIva(prodValue) * cantidad;
  // console.log(totalIva);
  if (cantidad > 0) {
    vecProduct.push(
      new Product(
        descripcion.nombre,
        descripcion.precio,
        descripcion.detalle,
        descripcion.id,
        descripcion.categoria,
        cantidad,
        prodValue
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
                    
            </tr>`;
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
let total = document.getElementById("total");
let sumTotal = 0;
if (inicio) {
  let mos_arreglo = localStorage.getItem("vect_product");
  mos_arreglo = JSON.parse(mos_arreglo);
  let columnaSeg = document.getElementById("segC");
  let columnaTer = document.getElementById("terC");
  if (mos_arreglo) {
    inicio.innerHTML = `
  <br>
  <h3 class="letra">Identificacion</h3>
    <form class="identificacion" id="identificacion">
        <ul>
          <li>
            <label class="letra" for="name">Nombre:</label>
            <input type="text" id="name" name="user_name"  placeholder="INGRESE SU NOMBRE" required>
          </li>   
          <li>
            <label class="letra" for="name">Apellido:</label>
            <input type="text" id="apellido" name="user_lastname" placeholder="INGRESE SU APELLIDO" required>
          </li>
          <li>
          <label class="letra" for="name">Fecha de Nacimiento:</label>
          <input type="date" id="FechaNac" name="FechaNac" required>
          </li> 
          <li>
            <label  class="letra" for="mail">Correo electrónico:</label>
            <input type="email" id="mail" name="user_mail" placeholder="INGRESE SU E-MAIL" required>
          </li>
          <li>
          <label  class="letra" for="telefono">Telefono:</label>
          <input type="text" id="telefono" name="telefono" placeholder="INGRESE SU TELEFONO" required>          
          </li>
               </form>
              
        `;
    columnaSeg.innerHTML = `
  <br>    
    <h3 class="letra">Domicilio de Entrega</h3>
        <form class="domicilio">
        <ul>
            <li>
              <label class="letra" for="name">Dirrecion:</label>
              <input type="text" id="direccion" name="direccion" placeholder="INGRESE SU DIRECCION">
            </li>   
            <li>
              <label  class="letra" for="mail">Codigo Postal:</label>
              <input type="text" id="codigo_postal" name="codigo_postal" placeholder="INGRESE SU CODIGO POSTAL">
            </li>
            <li>
            <label  class="letra" for="provincia">Provincia:</label>
            <input type="text" id="provincia" name="provincia" placeholder="INGRESE SU PROVINCIA">
            </li>
            <li>
            <label  class="letra" for="mail">Partido:</label>
            <input type="text" id="partido" name="partido" placeholder="INGRESE SU PARTIDO">
            </li>
            <li>
            <label  class="letra" for="mail">Localidad:</label>
            <input type="text" id="localidad" name="localidad" placeholder="INGRESE SU LOCALIDAD">
            </li>
          </ul>
        </form>
        `;
    columnaTer.innerHTML = `
  <br>  
    <h3 class="letra">Pago</h3>
        <form class="Tarjeta"> 
        <ul>
          <li>
            <label class="letra">Numero de tarjeta</label>
            <input id="numero_tarjeta" type="text" maxlength="50" pattern="[\d ]{10,30}" placeholder="INGRESE EL NUMERO DE SU TARJETA" required>
          </li>       
          <li>
            <label class="letra" for="cc-name">Nombre en la tarjeta</label>
            <input id="nombre_tarjeta" type="text" maxlength="50" pattern="[\p{L} \-\.]+" placeholder="INGRESE EL NOMBRE DE SU TARJETA" required>
          </li>
          <li>
            <label class="letra">Fecha de Vencimiento</label>
            <select id="mes_tarjeta" class="fechaV" placeholder="MM">
            <option value="">MM</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </select>
            <select id="anio_tarjeta" class="fechaV" placeholder="YY">
            <option value="">YY</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            </select>   
          </li>
          <li>
            <label class="letra">Codigo de seguridad</label>
            <input id="codigo_tarjeta"  type="text" inputmode="numeric" maxlength="3"  placeholder="INGRESE SU CODIGO DE SEGURIDAD" required>
            <label class="letra">los ultimos 3 numeros del dorso de su tarjeta</label> 
          </li>
        </ul>
            
            </form>
        `;
    // SEGUNDO DIV

    let pantallacarrito = document.getElementById("tbody");
    total.innerHTML = "";
    let valores = [];
    pantallacarrito.innerHTML = "";
    for (let i of mos_arreglo) {
      valores.push([i.nombre, i.total]);
      pantallacarrito.innerHTML += `
                  <tr>
                          <td class="nombre">${i.nombre}</td>
                          <td>
                          <input for="Cantidad" id="Cantidad" class="Cantidad" type="number" value="1" min="1" max="5"> 
                          </td>
                          <td  class="Total" id="Total">$ ${i.total}</td>
                          <td> <button  class="btn-danger btn_eliminar" type="button">  Eliminar </button></td>
                  </tr>
            `;

      const cantidades = document.querySelectorAll(".Cantidad");
      let nuevoTotal;
      let valorFijo;
      cantidades.forEach((cantidad) => {
        cantidad.addEventListener("change", (event) => {
          if ((event.target.tagName = "td")) {
            let fila = event.target.parentNode.parentNode;
            let precioFijo = fila.querySelector(".Total").innerHTML.slice(1);
            if (fila) {
              if (parseInt(event.target.value) === 1) {
                let nombre = fila.querySelector(".nombre").innerHTML;
                for (let i of valores) {
                  if (i[0] === nombre) {
                    valorFijo = i[1];
                  }
                }
                fila.querySelector(".Total").innerHTML = `$ ${valorFijo}`;
              } else {
                nuevoTotal = precioFijo * event.target.value;
                fila.querySelector(
                  ".Total"
                ).innerHTML = `$ ${nuevoTotal.toFixed(2)}`;
              }
            }
          }
        });
      });
      sumTotal += parseFloat(i.total);
    }
  } else {
    columnaSeg.innerHTML = `
  <h2 class="letra">
  Carrito Vacio
  </h2>
  <br>
  <a href="index.html">
  <button  class="btn-info" type="button"> Regrese a la Pagina Principal </button> 
  </a>
  `;
  }
  total.innerHTML = `<br>
  <label class="letra" id="precioTotal">
  PRECIO TOTAL: $${sumTotal.toFixed(2)} 
  </label>
  <div>
  <br>
    <button class="btn-success btn_Actualizar" type="button"> Actualizar Precio
    </button>
  </div>
  `;
}

let btn_Actualizar = document.querySelectorAll(".btn_Actualizar");
let sumaTotal = 0;
let sum = 0;

for (let btn of btn_Actualizar) {
  btn.addEventListener("click", (event) => {
    nodelist = document.querySelectorAll(".Total");
    let cant = 0;
    for (let i of nodelist) {
      sum += parseFloat(i.innerHTML.slice(2));
    }
    document.getElementById(
      "precioTotal"
    ).innerHTML = `PRECIO TOTAL: $ ${sum.toFixed(2)}`;
  });
}
let btn_vaciarCarrito = document.querySelectorAll(".btn_vaciarCarrito");
for (let btn of btn_vaciarCarrito) {
  btn.addEventListener("click", (event) => {
    localStorage.clear();
    location.reload();
  });
}

// const compra_producto = () => {
//   let formulario = document.getElementById("compra");
//   formulario.innerHTML = `<h1>LLEGO </h1>`;
// };

function borrar_producto(e) {
  let abuelo = e.target.parentNode.parentNode;
  let nombre_product = abuelo.querySelector(".nombre").innerHTML;
  console.log(nombre_product);
  console.log(abuelo);
  let mos_arreglo = localStorage.getItem("vect_product");
  mos_arreglo = JSON.parse(mos_arreglo);
  let carrito = [...mos_arreglo];
  console.log(carrito);

  function eliminar_producto(Product) {
    console.log(Product);
    return Product.nombre != nombre_product;
  }
  let resultado_filter = carrito.filter(eliminar_producto);

  carrito = resultado_filter;
  console.log(carrito);

  // mostrarCarrito();
  abuelo.remove();
}

let btn_terminar = document.querySelectorAll(".btn_terminar");
for (let btn of btn_terminar) {
  btn.addEventListener("click", (event) => {
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("apellido").value;
    let FechaNac = document.getElementById("FechaNac").value;
    let mail = document.getElementById("mail").value;
    let telefono = document.getElementById("telefono").value;
    let precioTotal = document.getElementById("precioTotal").innerHTML;
    let valorPantalla;
    if (sum > 0) {
      valorPantalla = sum;
    } else {
      valorPantalla = sumTotal;
    }
    let direccion = document.getElementById("direccion").value;
    let codigo_postal = document.getElementById("codigo_postal").value;
    let provincia = document.getElementById("provincia").value;
    let partido = document.getElementById("partido").value;
    let localidad = document.getElementById("localidad").value;

    let numero_tarjeta = document.getElementById("numero_tarjeta").value;
    let nombre_tarjeta = document.getElementById("nombre_tarjeta").value;
    let codigo_tarjeta = document.getElementById("codigo_tarjeta").value;
    let mes_tarjeta = document.getElementById("mes_tarjeta").value;
    let anio_tarjeta = document.getElementById("anio_tarjeta").value;

    let cuotas = obtenerCuotas();
    if (cuotas !== 0) {
      let { total, interes } = calcularCuotas(valorPantalla, cuotas);
      if (
        confirm(`El Precio total a pagar es: $ ${total.toFixed(2)}
    Valor de Cuota: ${(total / cuotas).toFixed(2)} $. En ${cuotas} cuotas.
    Con un interes de ${interes.toFixed(2)}$.
        `)
      ) {
      }
    }
  });
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
let btn_borrar = document.querySelectorAll(".btn_eliminar");
for (let btn of btn_borrar) {
  btn.addEventListener("click", borrar_producto);
}
