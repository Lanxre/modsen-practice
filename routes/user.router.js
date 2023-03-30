import { Router } from "express";

import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();


router.post('/register',
            userController.registerUser.bind(userController));

router.post('/login',
            userController.loginUser.bind(userController));

router.post('/refresh-token',
            userController.refreshToken.bind(userController));

export default router;