import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

async function eAuth(req: Request, res: Response, next: NextFunction) {
    const SECRET_KEY: Secret = `${process.env.SECRET}`;

    try {
        const authHeader = req.cookies.token;

        if (!authHeader) {
            res.clearCookie("token");
            return res.status(400).json({
                message:
                    "Você não tem os privilégios necessários para acessar a página",
            });
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            res.clearCookie("token");
            return res.status(400).json({
                message:
                    "Você não tem os privilégios necessários para acessar a página",
            });
        }

        jwt.verify(token, SECRET_KEY);

        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(400).json({
            message:
                "Você não tem os privilégios necessários para acessar a página",
        });
    }
}

export { eAuth };
