let arrayDetalles = [];
async function cargaProd (){ fetch("productos.json")
  .then((response) => response.json())
  .then((data) => 
   {
    for ( let i of data )
    {
    arrayDetalles.push(i);
   }})
   .then(()=>mostrarProductos(arrayDetalles))
    .catch(e => {
      console.log(e);
  });;
}
