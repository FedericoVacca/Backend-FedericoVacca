
const express = require('express');
const { ProductManager } = require('./ProductManager');
const app = express();
const port = 8080;
const productManager = new ProductManager('./products.json');


app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) { 
      res.json(products.slice(0, limit));
    } else { 
      res.json(products);
    }
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor activo en el puerto ${port}`);
});