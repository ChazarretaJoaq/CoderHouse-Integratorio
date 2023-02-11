
class Product {
    constructor(nombre, precio, detalle, id, categoria, total) {
        this.nombre = nombre;
        this.precio = precio;
        this.detalle = detalle;
        this.id = id;
        this.categoria = categoria;
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
    { id: 1, nombre: "Camiseta Titular Seleccion", categoria: "Camiseta", detalle: "Camiseta Titular Seleccion con las 3 estrellas", precio: 19000 },
    { id: 2, nombre: "Camiseta Alternativa Seleccion", categoria: "Camiseta", detalle: "Camiseta Aleternativa Seleccion color violeta con detalles", precio: 17000 },
    { id: 3, nombre: "Short Titular Seleccion", categoria: "Short", detalle: "Short Titular Seleccion color negro", precio: 15000 },
    { id: 4, nombre: "Short Alternativo Seleccion", categoria: "Short", detalle: "Short Alternativa Seleccion color violeta", precio: 15000 },
    { id: 5, nombre: "Campera Seleccion", categoria: "Campera", detalle: "Campera Seleccion con capucha para lluvia", precio: 26000 },
    { id: 6, nombre: "Campera Seleccion Reversible", categoria: "Campera", detalle: "Campera Reversible Seleccion de un lado celeste y del otro violeta", precio: 32000 },
    { id: 7, nombre: "Medias Seleccion Argentina", categoria: "Medias", detalle: "Medias Seleccion, blancas titulares", precio: 12000 },
    { id: 8, nombre: "Botines Adidas", categoria: "Botines", detalle: "Botines Adidas, ultima generacion para futbol sala", precio: 35000 }
]

let vecProduct = [];

function calcularIva(valor) {
    return valor + (valor * 0.21)
}
function calcularCuotas(valor, cuotas) {
    let total;
    let int;
    if (cuotas == 1) {
        int = 0;
        total = valor;
    }
    else if (cuotas == 3) {
        int = 1.15;
        total = valor * int;
    } else if (cuotas == 6) {
        int = 1.20;
        total = valor * int;
    } else if (cuotas == 12) {
        int = 1.25;
        total = valor * int;
    }
    if (int > 0) {
        return {
            total: (total),
            interes: (valor * ((int - 1).toFixed(2))),
        };
    }
    else {
        return {
            total: total,
            interes: (valor)
        }
    }
}
function obtenerValorProduct() {
    return valor1 = document.getElementById("Productos").value;
}
function obtenerCantidadProduct() {
    return cantidad = document.getElementById("Cantidad").value;

}
function obtenerIvaProduct(valor, cantidad) {
    return iva = calcularIva(parseFloat(valor * cantidad));
}
function obtenerCuotas() {
    return cuotas = document.getElementById("cuotas").value;
}

const agregarCarrito = () => {
    let index = document.getElementById("Productos").selectedIndex;
    let descripcion = arrayDetalles.find(description => description.id === index)
    // obtener precios 
    let prodValue = obtenerValorProduct();
    let cantidad = obtenerCantidadProduct();
    let iva = obtenerIvaProduct(prodValue, cantidad);
    let cuotas = obtenerCuotas();
    let arcarritoTotal = [];
    if (iva > 0 && cuotas != 0) {
        arcarritoTotal = calcularCuotas(iva, cuotas);
    }
    vecProduct.push(new Product(descripcion.nombre, descripcion.precio, descripcion.detalle, descripcion.id, descripcion.categoria, arcarritoTotal.total.toFixed(2)))
}

const mostrarCarrito = () => {
    let total = [];
    let totalFin = 0;
    // mostrar en pantalla
    vecProduct.forEach(element => {
        total.push(element.total);
        document.getElementById("carrito").innerHTML += ` ${element.nombre}, $  ${element.total}    <br/>`
    })
    total.forEach(element => {
        totalFin += parseFloat(element);
    })
    if (totalFin > 0) {
        document.getElementById("total").innerHTML += `<br/> TOTAL A PAGAR:    $ ${parseFloat(totalFin)}`;
    }
}
const realizarCompra = () => {
    let index = document.getElementById("Productos").selectedIndex;
    let valor1 = document.getElementById("Productos").value;
    let cantidad = document.getElementById("Cantidad").value;
    let iva = calcularIva(parseFloat(valor1 * cantidad));
    let cuotas = document.getElementById("cuotas").value;
    if (iva > 0 && cuotas != 0) {
        let { total, interes } = calcularCuotas(iva, cuotas);
        if (confirm(`El precio final del producto es: ${(total).toFixed(2)}$
Valor de Cuota: ${(total / cuotas).toFixed(2)} $. En ${cuotas} cuotas.
Con un interes de ${interes.toFixed(2)}$.`)) {
            document.getElementById('label').innerHTML = "CONFIRMO PAGO";
        } else {
            document.getElementById('label').innerHTML = "CANCELO EL PAGO";
            document.getElementById("Productos").value = 0;
            document.getElementById("cuotas").value = 0;
        }
    }
    else if ((cuotas == 0 || valor1 == 0 || iva == 0) || (valor1 != 0)) {
        alert("Seleccione un producto / cuotas a pagar");
    }

}