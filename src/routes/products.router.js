import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import { __dirname } from "../utils/path.js";
import { productValidator } from '../middlewares/productValidator.js';

const router = Router();
const productManager = new ProductManager(`${__dirname}/../dataBase/products.json`);

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit ? parseInt(limit) : undefined);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post('/', productValidator, async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.createProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productManager.updateProduct(pid, req.body);
    if (!updatedProduct) return res.status(404).json({ msg: "Error updating product" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);
    if (!deletedProduct) return res.status(404).json({ msg: "Error deleting product" });
    res.status(200).json({ msg: `Product id: ${pid} deleted successfully` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    await productManager.deleteFile();
    res.send('Products deleted successfully');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
