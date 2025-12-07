import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { Product } from "../entities/Product";

const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);
const productRepository = AppDataSource.getRepository(Product);

export class CartController {
    static async create(req: Request, res: Response) {
        const cart = new Cart(0, new Date(), new Date());
        const result = await cartRepository.save(cart);
        return res.status(201).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const carts = await cartRepository.find({
            relations: ["cartItems", "cartItems.product"],
        });
        return res.json(carts);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const cart = await cartRepository.findOne({
            where: { id: Number(id) },
            relations: ["cartItems", "cartItems.product"],
        });

        if (!cart) {
            return res.status(404).json({ error: "Carrinho não encontrado" });
        }

        return res.json(cart);
    }

    static async addItem(req: Request, res: Response) {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ error: "productId e quantity são obrigatórios" });
        }

        const cart = await cartRepository.findOne({
            where: { id: Number(cartId) },
        });

        if (!cart) {
            return res.status(404).json({ error: "Carrinho não encontrado" });
        }

        const product = await productRepository.findOne({
            where: { id: Number(productId) },
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Estoque insuficiente" });
        }

        const subtotal = product.price * quantity;
        const cartItem = new CartItem(0, quantity, subtotal);
        cartItem.product = product;
        cartItem.cart = cart;

        const result = await cartItemRepository.save(cartItem);
        return res.status(201).json(result);
    }

    static async removeItem(req: Request, res: Response) {
        const { itemId } = req.params;

        const cartItem = await cartItemRepository.findOne({
            where: { id: Number(itemId) },
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Item do carrinho não encontrado" });
        }

        await cartItemRepository.remove(cartItem);
        return res.status(204).send();
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        const cart = await cartRepository.findOne({
            where: { id: Number(id) },
        });

        if (!cart) {
            return res.status(404).json({ error: "Carrinho não encontrado" });
        }

        await cartRepository.remove(cart);
        return res.status(204).send();
    }
}
