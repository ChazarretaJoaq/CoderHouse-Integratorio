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
  let columnaSeg = document.getElementById("segC");
  let columnaTer = document.getElementById("terC");

  inicio.innerHTML = `
  <h3 class="letra">Identificacion</h3>
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
          <label class="letra" for="name">Fecha de Nacimiento:</label>
          <input type="date" id="FechaNac" name="FechaNac">
          </li> 
          <li>
            <label  class="letra" for="mail">Correo electrónico:</label>
            <input type="email" id="mail" name="user_mail">
          </li>
          <li>
          <label  class="letra" for="telefono">Telefono:</label>
          <input type="text" id="telefono" name="telefono">          
          </li>
               </form>
              
        `;
  columnaSeg.innerHTML = `
        <h3 class="letra">Domicilio de Entrega</h3>
        <form>
        <ul>
            <li>
              <label class="letra" for="name">Dirrecion:</label>
              <input type="text" id="direccion" name="direccion">
            </li>   
            <li>
              <label  class="letra" for="mail">Codigo Postal:</label>
              <input type="email" id="mail" name="user_mail">
            </li>
            <li>
            <label  class="letra" for="mail">Localidad:</label>
            <input type="email" id="mail" name="user_mail">
            </li>
          </ul>
        </form>
        `;
  columnaTer.innerHTML = `
        <h3 class="letra">Pago</h3>
        <form> 
        <ul>
          <li>
            <label class="letra">Numero de tarjeta</label>
            <input type="text" id="direccion" name="direccion" autocomplete="cc-number" inputmode="numeric" maxlength="50" pattern="[\d ]{10,30}" required>
          </li>       
          <li>
            <label class="letra" for="cc-name">Nombre en la tarjeta</label>
            <input type="text"id="cc-name" name="cc-name" autocomplete="cc-name" maxlength="50" pattern="[\p{L} \-\.]+" required>
          </li>
          <li>
            <label class="letra">Fecha de Vencimiento</label>
            <select class="fechaV" id="cc-exp-month" name="cc-exp-month" autocomplete="cc-exp-month" placeholder="MM">
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
            <select class="fechaV" id="cc-exp-year" name="cc-exp-year" autocomplete="cc-exp-year" placeholder="YY">
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
            <label class="letra"for="cc-csc">Codigo de seguridad</label>
            <input  type="text" id="cc-csc" name="cc-csc" inputmode="numeric" maxlength="3" required>
            <label class="letra">los ultimos 3 numeros del dorso de su tarjeta</label> 
          </li>
        </ul>
            
            </form>
        `;
  // SEGUNDO DIV

  let pantallacarrito = document.getElementById("tbody");
  let total = document.getElementById("total");
  total.innerHTML = "";
  let sumTotal = 0;
  pantallacarrito.innerHTML = "";
  let pos=[];
  for (let i of mos_arreglo) {
    sumTotal += parseFloat(i.total);
    pantallacarrito.innerHTML += `
                  <tr>
                          <td>${i.nombre}</td>
                          <td>
                          <input for="Cantidad" id="Cantidad" type="number" value="1" min="1" max="5"> 
                          </td>
                          <td>$ ${i.total}</td>
                          <td> <button  class="btn-danger btn_eliminar" type="button">  Eliminar </button></td>
                  
                  </tr>
            `;

  }
  total.innerHTML = `PRECIO TOTAL: $${sumTotal}`;
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
