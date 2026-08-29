import { Router } from "express";
import type { Request, Response, NextFunction } from 'express';
import User from "../../models/user.js";
import { authenticationService, BadRequestError } from "../../../common/index.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/signin", async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) return next(new BadRequestError("email and password are required"));


    const user = await User.findOne({ email: email });

    if (!user) return next(new BadRequestError('Wrong credentials'));

    const isEqual = await authenticationService.pwdCompare(user.password, password);
    if (!isEqual) return next(new BadRequestError('Wrong credentials'));

    const jwtToken = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY!, { expiresIn: '10h' });

    req.session = { jwt: jwtToken };

    res.status(200).send(user);
});

export { router as signinRouter }