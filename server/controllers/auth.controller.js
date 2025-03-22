import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import config from './../../config/config.js';

const signin = async (req, res) => {
    try {
        console.log("Signin attempt for username:", req.body.username);

        // Find the user by username
        let user = await User.findOne({ username: req.body.username });

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ error: "User not found" });
        }

        console.log("User found, attempting password authentication");
        const isAuthenticated = await user.authenticate(req.body.password);

        if (!isAuthenticated) {
            console.log("Password authentication failed");
            return res.status(401).json({ error: "Email and password don't match." });
        }

        console.log("Authentication successful");
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        res.cookie('t', token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 3600000) // 1 hour
        });

        return res.json({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Signin error:", err);
        return res.status(401).json({ error: "Could not sign in" });
    }
};

const signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({ message: "signed out" });
};

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" });
    }
    next();
};

export default { signin, signout, requireSignin, hasAuthorization };
