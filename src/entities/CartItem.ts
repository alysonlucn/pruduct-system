import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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

    @ManyToOne(() => Product, (product) => product.cartItems)
    @JoinColumn({ name: "productId" })
    product!: Product;

    @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "cartId" })
    cart!: Cart;

    constructor(id: number, quantity: number, subtotal: number) {
        this.id = id;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}