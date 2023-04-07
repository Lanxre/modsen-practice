import { Router } from "express";

import container from "../di-container/container.js";

const router = Router();
const userController = container.resolve('userController')


router.post('/register',
            userController.registerUser.bind(userController));

router.post('/login',
            userController.loginUser.bind(userController));

router.post('/refresh-token',
            userController.refreshToken.bind(userController));

export default router;