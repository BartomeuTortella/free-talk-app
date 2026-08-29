import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

import { currentUser } from '../../../common/index.js';

const router = Router();

router.get('/current-user', currentUser, async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ currentUser: req.currentUser });
})

export { router as currentUserRouter }