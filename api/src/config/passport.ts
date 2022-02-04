import fs from "fs";
import { PassportStatic } from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { User } from "../models/User";

const PUB_KEY = fs.readFileSync(`${__dirname}/keys/public.pem`);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

const setupPassport = (passport: PassportStatic) => {
    passport.use(
        new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.sub);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};

export default setupPassport;
