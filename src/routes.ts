import express from "express";
import {
    createUser,
    deleteUser,
    indexUser,
    loginUser,
    updateUser,
} from "./controllers/UserController";
import { eAuth } from "./middlewares/auth";

export const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("index");
});
routes.get("/home", eAuth, (req, res) => {
    res.render("home");
});

routes.get("/user", indexUser);
routes.post("/user", createUser);
routes.post("/login", loginUser);
routes.put("/user/:id", updateUser);
routes.delete("/user/:id", deleteUser);
