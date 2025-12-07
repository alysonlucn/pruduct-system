import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Product } from "../entities/Product";

const productRepository = AppDataSource.getRepository(Product);

export class ProductController {
    static async create(req: Request, res: Response) {
        const { name, price, stock, description } = req.body;

        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({ error: "Nome, preço e estoque são obrigatórios" });
        }

        const product = new Product(0, name, price, stock, description);
        const result = await productRepository.save(product);

        return res.status(201).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const products = await productRepository.find({
            relations: ["cartItems"],
        });
        return res.json(products);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const product = await productRepository.findOne({
            where: { id: Number(id) },
            relations: ["cartItems"],
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        return res.json(product);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price, stock, description } = req.body;

        const product = await productRepository.findOne({
            where: { id: Number(id) },
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        if (name) product.name = name;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (description !== undefined) product.description = description;

        const result = await productRepository.save(product);
        return res.json(result);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        const product = await productRepository.findOne({
            where: { id: Number(id) },
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        await productRepository.remove(product);
        return res.status(204).send();
    }
}
