import express from "express";
import { Router } from "express";
import ProductManager from "../models/ProductManager.js";
import { io } from "../../app.js";
const router = Router();
const productosManagerV1 = new ProductManager("./productos.json");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get("/", async (req, res) => {
  const limite = req.query.limit;
  try {
    let products = await productosManagerV1.getProducts();
    if (limite) {
      products = products.filter((el, index) => {
        return index < limite;
      });
    }

    res.send({
      status: "200 ok",
      message: products,
    });
  } catch (err) {
    res.json({});
  }
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  try {
    const producto = await productosManagerV1.getProductById(pid);

    res.send({
      status: "200 ok",
      message: producto ? producto : "no existe producto seleccionado",
    });
  } catch (err) {
    res.status(err.statusCode).send(` ${err}`);
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, code, stock, category, thumbnail } =
    req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(401).json({ message: "faltan datos" });
  }
  if (!thumbnail) {
    req.body.thumbnail = "";
  }
  try {
    await productosManagerV1.addProduct(req.body);
    res.json({
      status: "200 ok",
      message: "El producto se ha actualizado ok ",
    });
    const products = await productosManagerV1.getProducts();
    io.emit("message", {products });  
  } catch (err) {
    res.status(err.statusCode).send(` ${err}`);
  }

  
});
router.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  try {
    const producto = await productosManagerV1.deleteProduct(id);

    res.send({
      status: "200 ok",
      message: producto ? producto : "no existe producto seleccionado",
    });
  } catch (err) {
    res.status(err.statusCode).send(` ${err}`);
  }
});

router.put("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  let productToModify = req.body;
  if (productToModify.id) {
    delete productToModify.id;
  }

  try {
    const result = await productosManagerV1.updateProductById(
      id,
      productToModify
    );

    const mensaje = result
      ? "El producto ha sido actualizado"
      : "No se ha encontrado producto";

    res.json({ status: "200 ok", mensaje: mensaje });
  } catch (err) {
    res.status(err.statusCode).send(` ${err}`);
  }
});

export default router;