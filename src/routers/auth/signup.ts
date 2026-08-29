import { Router } from "express";
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../../models/user.js";
import { BadRequestError } from "../../../common/index.js";

const router = Router();

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) return next(new BadRequestError("email and password are required"));


    const user = await User.findOne({ email: email });

    if (user) return next(new BadRequestError("Email already in use"));

    const newUser = User.build({ email, password });

    await newUser.save();

    req.session = {
        jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!, { expiresIn: '10h' })
    }

    res.status(201).send(newUser);

});

export { router as signupRouter }