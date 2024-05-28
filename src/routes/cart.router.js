import { Router } from "express";
const router = Router();

import CartManager from "../managers/cart.manager.js";
import { __dirname } from "../path.js";
const cartManager = new CartManager(`${__dirname}/dataBase/carts.json`);

router.post("/:cid/product/:pid", async (req, res, next) => {
   try {

      const { cid } = req.params;
      const { pid } = req.params;

      const response = await cartManager.saveProductToCart(cid, pid);
      res.json(response);
   } catch (error) {
    next(error);
   }
});

router.post("/", async (req, res) => {
  try {
    res.json(await cartManager.createCart());
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const {cid} = req.params
    res.json(await cartManager.getCartById(cid))
  } catch (error) {
    console.log(error);
  }
});

export default router;
