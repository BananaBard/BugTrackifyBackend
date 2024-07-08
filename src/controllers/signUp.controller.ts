import { Request, Response } from "express";
import { signUpWithEmailService } from "../services/auth/signUp.service";
import getErrorMessage from "../utils/getErrorMessage";

const signUpWithEmailController = async(req: Request, res: Response) => {
    const {email, password, fullname, role} = req.body;

    try {
        const data = await signUpWithEmailService({email, password, fullname, role});
        res.status(201).json(data);
        
    } catch(error) {
        res.status(400).json({message: getErrorMessage(error)})
    }
}

export {signUpWithEmailController}