import utils from "../../utils.js";
class ProductManager {
  static producto;
  static products;
  static correlativoId = 0;
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct = async (producto) => {
    this.products = [];
    this.products = await this.getProducts();
    if (this.products?.some((el) => el.code === producto.code)) {
      let error = new Error("Ya existe un producto con ese código");
      error.statusCode = 400;
      throw error;
    }
    ProductManager.correlativoId = this.products.push({
      ...producto,
      id: this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 0,
    });
    utils.writeFile(this.path, this.products);
  };
  getProducts = async () => {
    try {
      let data = await utils.readFile(this.path);
      return data?.length > 0 ? data : [];
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    this.products = await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product === undefined) {
      let error = new Error("debe ingresar un id de producto existente");
      error.statusCode = 400;
      throw error;
    }
    return product;
  };

  deleteProduct = async (id) => {
    this.products = await this.getProducts();
    const productIndex = this.products.findIndex((el) => el.id === id);
    if (productIndex !== -1) {
      let product = this.products[productIndex];
      this.products.splice(productIndex, 1);
      await utils.writeFile(this.path, this.products);

      return { mensaje: "producto eliminado", producto: product };
    } else {
      let error = new Error("no existe el producto solicitado");
      error.statusCode = 400;
      throw error;
    }
  };

  updateProductById = async (id, data) => {
    this.products = await this.getProducts();
    this.products = this.products?.length > 0 ? this.products : [];

    let productIndex = this.products.findIndex((dato) => dato.id === id);

    console.log(id, productIndex, this.products)
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...data,
      };
      await utils.writeFile(this.path, this.products);
      return this.products[productIndex];
    } else {
      let error = new Error("Ya existe un producto con ese código");
      error.statusCode = 400;
      throw error;
    }
  };
}

export default ProductManager;