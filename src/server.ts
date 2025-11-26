import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("DB conectado!");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Servidor rodando!");
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar DB:", err);
    });