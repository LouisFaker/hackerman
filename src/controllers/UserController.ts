import { Request, Response } from "express";
import iniciarConexao from "../database/database";
import { ResultSetHeader } from "mysql2";
import jwt from "jsonwebtoken";

async function indexUser(req: Request, res: Response) {
    try {
        const connection = await iniciarConexao;
        const [rows] = await connection.execute("SELECT * FROM usuarios");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function createUser(req: Request, res: Response) {
    try {
        const { email, senha, nome, categoria } = req.body;

        if (!email || !senha || !nome || !categoria) {
            return res
                .status(400)
                .json({ message: "Todos os campos são obrigatórios." });
        }

        const connection = await iniciarConexao;
        await connection.execute(
            "INSERT INTO usuarios (email, senha, nome, categoria) VALUES (?, ?, ?, ?)",
            [email, senha, nome, categoria]
        );

        res.status(201).json({ message: "usuario criada com sucesso." });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { email, senha, nome, categoria } = req.body;

        const connection = await iniciarConexao;

        const [checkResult] = await connection.execute(
            "SELECT id FROM usuarios WHERE id = ?",
            [id]
        );

        if (
            !checkResult ||
            (checkResult instanceof Array && checkResult.length === 0)
        ) {
            return res
                .status(404)
                .json({ message: `usuario com ID ${id} não encontrado.` });
        }

        const fieldsToUpdate: { [key: string]: unknown } = {};

        if (email) fieldsToUpdate.email = email;
        if (senha) fieldsToUpdate.senha = senha;
        if (nome) fieldsToUpdate.nome = nome;
        if (categoria) fieldsToUpdate.categoria = categoria;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({
                message:
                    "Pelo menos um campo deve ser fornecido para atualização.",
            });
        }

        const fieldNames = Object.keys(fieldsToUpdate);
        const fieldValues = fieldNames.map(
            (fieldName) => fieldsToUpdate[fieldName]
        );

        const updateQuery = `UPDATE usuarios SET ${fieldNames
            .map((fieldName) => `${fieldName} = ?`)
            .join(", ")} WHERE id = ?`;
        const sqlParams = [...fieldValues, id];

        await connection.execute(updateQuery, sqlParams);

        res.status(200).json({
            message: `usuario com ID ${id} atualizado com sucesso.`,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const connection = await iniciarConexao;

        const result = await connection.execute(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );

        if ((result[0] as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({
                message: `usuario com ID ${id} deletado com sucesso.`,
            });
        } else {
            res.status(404).json({
                message: `usuario com ID ${id} não encontrado.`,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function loginUser(req: Request, res: Response) {
    const { email, senha, hasConnect } = req.body;

    interface IUser {
        id: number;
        email: string;
        senha: string;
        nome: string;
        categoria: string;
    }

    if (!email || !senha) {
        return res.status(400).json({ error: "data is missing" });
    }

    function stepTwo(user: IUser) {
        let dateTokenExpires: string | number;
        let dateCookieExpires: number;

        if (hasConnect) {
            dateTokenExpires = "2d";
            dateCookieExpires = 172800000;
        } else {
            dateTokenExpires = 600;
            dateCookieExpires = 600000;
        }

        const token = jwt.sign({ id: user.id }, `${process.env.SECRET}`, {
            expiresIn: dateTokenExpires,
        });

        res.cookie("token", `Bearer ${token}`, {
            maxAge: dateCookieExpires,
        });

        return res.status(200).json({
            error: false,
            message: "Login realizado com sucesso!",
            token: `Bearer ${token}`,
        });
    }

    try {
        const connection = await iniciarConexao;
        const [rows] = await connection.execute(
            `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'` // SQL Injection
        );

        if (Array.isArray(rows) && rows.length < 1) {
            return res.status(400).json({ error: "Email ou senha incorretos" });
        }

        if (Array.isArray(rows) && rows.length > 0) {
            stepTwo(rows[0] as IUser);
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

export { indexUser, createUser, updateUser, deleteUser, loginUser };
