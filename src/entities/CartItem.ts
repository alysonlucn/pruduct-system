import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Entity()
export class CartItem {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal: number;

    @ManyToMany(() => Product, (product) => product.cartItems)
    product: Product;

    @ManyToMany(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
    cart: Cart;

    constructor(id: number, quantity: number, subtotal: number, product: Product, cart: Cart) {
        this.id = id;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.product = product;
        this.cart = cart;
    }
}