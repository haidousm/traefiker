import express from "express";
import { User } from "../models/User";
import { validatePassword, issueJWT } from "../utils/password";

const router = express.Router();

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (validatePassword(req.body.password, user.hash, user.salt)) {
        const token = issueJWT(user);
        return res.status(200).json({ token });
    }
    return res.status(400).json({ message: "Invalid credentials" });
});

export default router;
