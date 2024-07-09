import { NextFunction, Request, Response, Router } from "express";
import { signUpWithEmailController } from "../controllers/signUp.controller";
import { loginWithEmail } from "../controllers/loginWithEmail.controller";

const authRoutes = Router()

authRoutes.post('/signup', signUpWithEmailController);
authRoutes.post('/login', loginWithEmail);
authRoutes.post('/signout', (_req: Request, res: Response, _next: NextFunction) => {
    return res.clearCookie('access_token').json({message: 'Sign out successfully.'})
});

export default authRoutes;