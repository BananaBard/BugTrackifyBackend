import { Router } from "express";
import { signUpWithEmailController } from "../controllers/signUp.controller";

const authRoutes = Router()

authRoutes.post('/signup', signUpWithEmailController);

export default authRoutes;