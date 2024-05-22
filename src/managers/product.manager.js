import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        let productList = JSON.parse(products);
        
        if (limit) {
          productList = productList.slice(0, limit);
        }
  
        return productList;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createProduct(obj) {
    try {
      const product = {
        id: uuidv4(),
        status: true,
        ...obj,
      };
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) { // Note: I switched the order of parameters for clarity
    try {
      const products = await this.getProducts();
      let productExist = await this.getProductById(id);
      if (!productExist) return null;
      productExist = { ...productExist, ...obj };
      const newArray = products.map((u) => u.id === id ? productExist : u);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2));
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      if (products.length > 0) {
        const productExist = await this.getProductById(id);
        if (productExist) {
          const newArray = products.filter((u) => u.id !== id);
          await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2));
          return productExist;
        } 
      } else return null;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("archivo eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
