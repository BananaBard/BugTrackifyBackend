import { NextFunction, Request, Response, Router } from "express";
import { signUpWithEmailController } from "../controllers/signUp.controller";
import { loginWithEmailController } from "../controllers/loginWithEmail.controller";
import { authStatusController } from "../controllers/authStatus.controller";

const authRoutes = Router()

authRoutes.post('/signup', signUpWithEmailController);
authRoutes.post('/login', loginWithEmailController);
authRoutes.post('/status', authStatusController)
authRoutes.post('/signout', (_req: Request, res: Response, _next: NextFunction) => {
    return res.clearCookie('access_token').json({ message: 'Sign out successfully.' })
});

export default authRoutes;