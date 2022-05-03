import { Request, Response } from "express";
import { findUser } from "../services/user";
import { issueJWT, validatePassword } from "../utils/password";

export const loginUserHandler = async (req: Request, res: Response) => {
    const user = await findUser({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    if (validatePassword(req.body.password, user.hash, user.salt)) {
        const token = issueJWT(user);
        return res.status(200).json({ token });
    }
    return res.status(400).json({ message: "Invalid credentials" });
};
