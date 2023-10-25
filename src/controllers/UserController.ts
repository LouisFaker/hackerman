import { Request, Response } from "express";
import iniciarConexao from "../database/database";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";

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

        const encryptedPassword = await bcrypt.hash(senha, 8);

        const connection = await iniciarConexao;
        await connection.execute(
            "INSERT INTO usuarios (email, senha, nome, categoria) VALUES (?, ?, ?, ?)",
            [email, encryptedPassword, nome, categoria]
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

        const encryptedPassword = await bcrypt.hash(senha, 8);

        if (email) fieldsToUpdate.email = email;
        if (encryptedPassword) fieldsToUpdate.senha = encryptedPassword;
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

export { indexUser, createUser, updateUser, deleteUser };
