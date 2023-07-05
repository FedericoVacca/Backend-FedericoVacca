const fs = require('fs'); 

class ProductManager { 
  constructor(path) { 
    this.path = path;
  }

  addProduct(product) { 
    const products = this.getProducts(); 
    const newProduct = { 
      id: products.length + 1, 
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };
    products.push(newProduct); 
    this.saveProducts(products); 
    return newProduct; 
  }

  getProducts() { 
    try { 
      const data = fs.readFileSync(this.path, 'utf-8'); 
      return JSON.parse(data);
    } catch (error) { 
      return []; 
    }
  }

  getProductById(id) { 
    const products = this.getProducts(); 
    return products.find((product) => product.id === id); 
    
  }

  updateProduct(id, updatedFields) { 
    const products = this.getProducts(); 
    const index = products.findIndex((product) => product.id === id); 
    if (index !== -1) { 
      const updatedProduct = { ...products[index], ...updatedFields, id }; 
      products[index] = updatedProduct;
      this.saveProducts(products); 
      return updatedProduct;
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = products[index];
      products.splice(index, 1);
      this.saveProducts(products);
      return deletedProduct;
    }
    return null; 
  }
  
  saveProducts(products) { 
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }

}

const path = './products.json'; 
const productManager = new ProductManager(path);

const newProduct = {
  title: 'Camiseta',
  description: 'Una camiseta de algodón',
  price: 19.99,
  thumbnail: 'ruta/imagen.jpg',
  code: 'CAM001',
  stock: 10
};

const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

const productId = 1;
const productById = productManager.getProductById(productId);
console.log('Producto por ID:', productById);

const productIdToUpdate = 1;
const updatedFields = { 
  title: 'Camiseta Modificada',
  price: 24.99
};

const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields); 
console.log('Producto actualizado:', updatedProduct);

module.exports = {
  ProductManager
};