import { Router } from "express";
const router = Router();

import { __dirname } from "../path.js";

import ProductManager from "../managers/product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

import {productValidator} from '../middlewares/productValidator.js'

router.get('/', async(req, res) => {
    try {
      
        const { limit } = req.query;

        const products = await productManager.getProducts(limit);

        res.status(200).json(products);

    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
});

router.get("/:pid", async (req, res) => {
    try {

      const { pid } = req.params;
      const product = await productManager.getProductById(pid);

      if (!product) res.status(404).json({ msg: "product not found" });

      else res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });


router.post('/', productValidator, async (req, res)=>{
    try {
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const prodUpd = await productManager.updateProduct(req.body, pid);
      if (!prodUpd) res.status(404).json({ msg: "Error updating prod" });
      res.status(200).json(prodUpd);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const delProd = await productManager.deleteProduct(pid);
      if(!delProd) res.status(404).json({ msg: "Error delete product" });
      else res.status(200).json({msg : `product id: ${pid} deleted successfully`})
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.delete('/', async(req, res)=>{
    try {
        await productManager.deleteFile();
        res.send('products deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

export default router;









