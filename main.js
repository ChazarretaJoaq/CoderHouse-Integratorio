function calcularIva(valor) {
    return valor + (valor * 0.21)
}
function calcularVentaIva(valor) {
    return valor * 1.25
}
function calcularCuotas(valor, cuotas) {
    let total;
    if (cuotas == 1) {
        total = valor;
    }
    else if (cuotas == 3) {
        total = valor * 1.15;
    } else if (cuotas == 6) {
        total = valor * 1.20;
    } else if (cuotas == 12) {
        total = valor * 1.25;
    }
    console.log("total con intereses: " + total);
    return {
        total: (total / cuotas),
        interes: (total - valor),

    };
}
const getValueInput = () => {
    let valor1 = document.getElementById("Productos").value;
    console.log("camisetas: " + valor1);

    let iva = calcularIva(parseFloat(valor1));
    //(parseFloat(valor1));
    console.log(iva);
    // let ivaVenta = calcularVentaIva(parseFloat(inputValue2))
    // console.log("segunda funcion: " + ivaVenta);
    let cuotas = document.getElementById("cuotas").value;
    console.log("cuotas: " + cuotas);

    if (iva > 0 && cuotas != 0) {
        let { total, interes } = calcularCuotas(iva, cuotas);
        console.log("total obj: " + total);
        console.log("interes obj: " + interes);
        console.log(iva + interes);
        if (confirm(`El precio final del producto es: ${(iva + interes).toFixed(2)}$
Valor de Cuota: ${total.toFixed(2)} $. En ${cuotas} cuotas.
Con un interes de ${interes.toFixed(2)}$.`)) {
            document.getElementById('label').innerHTML = "CONFIRMO PAGO";
        } else {
            document.getElementById('label').innerHTML = "CANCELO EL PAGO";
        }
        // document.getElementById('texto1').innerHTML = `El precio final del producto es: ${(iva + interes).toFixed(2)}$`;
        // document.getElementById('label').innerHTML = `Valor de Cuota: ${total.toFixed(2)} $. En ${cuotas} cuotas.`;
        // document.getElementById('interes').innerHTML = `Con un interes de ${interes.toFixed(2)}$.`;
    }
    else if ((cuotas == 0 || valor1 == 0 || iva == 0) || (valor1 != 0)) {
        alert("Seleccione un producto / cuotas a pagar");
    }
}