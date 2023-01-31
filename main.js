
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
const realizarCompra = () => {
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