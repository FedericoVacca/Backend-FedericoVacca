import express from "express";
import cartsRouter from "./src/router/carts.router.js"
import products from "./src/router/products.router.js"
// product manager 

const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", 'application/json')
    
  const status = error.status || 400
  response.status(status).send(error.message)
}
// express init
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use("/api/carts", cartsRouter)
app.use("/api/products", products)
app.use(express.static("public"))

app.listen(PORT, () => {
  console.log("listening at " + PORT);
});