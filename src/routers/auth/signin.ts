import { Router } from "express";
import type { Request, Response, NextFunction } from 'express';
import User from "../../models/user.js";
import { authenticationService } from "../../../common/index.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/signin", async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('email and password are required') as CustomError;
        error.status = 400;
        return next(error);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        const error = new Error('User not found') as CustomError;
        error.status = 404;
        return next(error);
    }

    const isEqual = await authenticationService.pwdCompare(user.password, password);
    if (!isEqual) return next(new Error('Wrong credentials'));

    const jwtToken = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY!, { expiresIn: '10h' });

    req.session = { jwt: jwtToken };

    res.status(200).send(user);
});

export { router as signinRouter }