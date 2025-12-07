import { Router } from "express";
import { CartController } from "../controllers/CartController";

const router = Router();

router.post("/carts", CartController.create);
router.get("/carts", CartController.getAll);
router.get("/carts/:id", CartController.getById);
router.post("/carts/:cartId/items", CartController.addItem);
router.delete("/carts/:id/items/:itemId", CartController.removeItem);
router.delete("/carts/:id", CartController.delete);

export default router;
