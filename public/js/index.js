const socket = io();
const addData = (data) => {
  let log = document.getElementById("products");
  let element = "";
  data.products.forEach((products) => {
    element += `  
    <div class="card col col-3 m-2"> 
    <div class="card-body ">
    <p>Codigo: ${products.code}</p>
    <p>Nombre: ${products.title}</p>
    <p>Descripcion: ${products.description}</p>
    <p>Precio: ${products.price}</p>
    <p>Stock: ${products.stock}</p>
    <p>Categoria: ${products.category}</p>
  </div>
  </div>`;
  });
  log.innerHTML = element;
};
socket.emit("message", "Hello world, index");
socket.emit("connection", "cliente conectado");
socket.on("connection", (data) => {
  console.
  addData(data);
});
socket.on("message", (data) => {
  addData(data);
});