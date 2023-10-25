import express from "express";
import {
    createUser,
    deleteUser,
    indexUser,
    updateUser,
} from "./controllers/UserController";

export const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("index");
});

routes.get("/user", indexUser);
routes.post("/user", createUser);
routes.put("/user/:id", updateUser);
routes.delete("/user/:id", deleteUser);
