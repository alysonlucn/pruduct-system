import express from "express";
import "express-async-errors";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(productRoutes);
app.use(cartRoutes);

export default app;