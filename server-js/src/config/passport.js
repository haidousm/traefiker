const fs = require("fs");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

const PUB_KEY = fs.readFileSync(`${__dirname}/keys/public.pem`);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

const setupPassport = (passport) => {
    passport.use(
        new Strategy(jwtOptions, async (jwt_payload, done) => {
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

module.exports = setupPassport;
