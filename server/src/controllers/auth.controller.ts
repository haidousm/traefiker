import { Request, Response } from "express";
import { findUser } from "../services/user.service";
import { issueJWT, validatePassword } from "../utils/password";

export const loginUserHandler = async (req: Request, res: Response) => {
    const user = await findUser({ username: req.body.username });
    if (!user) {
        return res.sendStatus(400);
    }
    if (validatePassword(req.body.password, user.hash, user.salt)) {
        const token = issueJWT(user);
        return res
            .status(200)
            .json({ token: token.token, expires: token.expires });
    }
    return res.sendStatus(400);
};
