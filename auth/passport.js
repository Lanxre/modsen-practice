import passport from "passport";
import pjw from 'passport-jwt';
import * as dotenv from 'dotenv';

import UserService from "../services/user.service.js";

dotenv.config();

const JwtStrategy = pjw.Strategy;
const ExtractJwt = pjw.ExtractJwt;
const service = new UserService();

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret
};

passport.use(new JwtStrategy(jwtOpts, async function(jwt_payload, done) {
    const user = await service.findUserByToken(jwt_payload);
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

async function requireAdmin(req, res, next) {
    if (req.user.role_id !== 1) {
        return res.status(403).json({ message: 'Access denied. Only admins can access this resource.' });
    }
    
    next();
}

const requireAuth = passport.authenticate('jwt', { session: false });

export {passport, requireAuth, requireAdmin}