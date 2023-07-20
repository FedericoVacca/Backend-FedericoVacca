import { engine } from "express-handlebars";
import express from "express";
import cartsRouter from "./src/router/carts.router.js";
import products from "./src/router/products.router.js";
import viewsRoute from "./src/router/views.router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { create } from "domain";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

// routes 
app.use("/api/carts", cartsRouter);
app.use("/api/products", products);
app.use("/", viewsRoute);

const httpServer = app.listen(PORT, () => {
  console.log("listening at " + PORT);
});

export const io = new Server(httpServer);