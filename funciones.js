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