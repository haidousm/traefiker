import { CallbackError } from "mongoose";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User, UserModel } from "../models/User";
import { validatePassword } from "../utils/password";

const setupPassport = (passport: PassportStatic) => {
    passport.serializeUser((user: UserModel, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        User.findById(id, (err: CallbackError, user: UserModel) => {
            done(err, user);
        });
    });

    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            async (username: string, password: string, done) => {
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, {
                        message: "Incorrect username.",
                    });
                }
                if (!validatePassword(password, user.hash, user.salt)) {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
                return done(null, user);
            }
        )
    );
};

export default setupPassport;
