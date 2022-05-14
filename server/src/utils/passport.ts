import fs from "fs";
import { JwtPayload } from "jsonwebtoken";
import { PassportStatic } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { findUser } from "../services/user.service";

const PUB_KEY = fs.readFileSync(`${__dirname}/../../config/keys/public.pem`);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

// istanbul ignore next
const configurePassport = (passport: PassportStatic) => {
    passport.use(
        new Strategy(jwtOptions, async (jwtPayload: JwtPayload, done) => {
            try {
                const user = await findUser({ id: jwtPayload.sub });
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

export default configurePassport;
