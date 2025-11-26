import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./CartItem";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column("decimal", { precision: 10, scale: 2 })
    stock: number;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems!: CartItem[];

    constructor(id: number, name: string, price: number, stock: number, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description || '';
    }
}