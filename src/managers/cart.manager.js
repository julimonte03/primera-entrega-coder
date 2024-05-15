import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import ProductManager from "./product.manager.js";
const productManager = new ProductManager(`${__dirname}/dataBase/products.json`);

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {

      const cart = {

        id: uuidv4(),
        products: [],
      }

      const carts = await this.getAllCarts();
      carts.push(cart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart(cid,pid){
    try {

      product = await productManager.getProductById(pid);

      if(!product) throw new Error('product not found!');

      carts = this.getAllCarts();

      cart = carts.find( id => id === cid);

      if(!cart) throw new Error('cart not found!');

      productFound = cart.products.find(prod => prod.product === pid);
      
      if(!productFound){

        addProd = {
          product : pid, 
          quantity : 1
        };

        cartFound.products.push(addProd);

      }else{

        for (const product of cart) {

          if(product.product === pid) product.quantity =+ 1;
          
        }

      }

      const updatedCarts = carts.map(c => {
        if(cart.id === cid){
          c = cart;
          return carts
        }else{
         return carts 
        }
      })

      await fs.promises.writeFile(this.path,JSON.stringify(updatedCarts));

    } catch (error) {
      console.log(error)
    }
  }
}