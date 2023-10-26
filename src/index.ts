import cors from "cors";
import express from "express";
import { routes } from "./routes";
import { config } from "dotenv";

config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} - http://localhost:${port}`);
});
