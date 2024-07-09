import { Request, Response } from "express";
import { signUpWithEmailService } from "../services/auth/signUp.service";
import getErrorMessage from "../utils/getErrorMessage";

const signUpWithEmailController = async(req: Request, res: Response) => {
    const {email, password, fullname, role} = req.body;

    try {
        const data = await signUpWithEmailService({email, password, fullname, role});
        const token = data?.token;
        return res
        .status(201)
        .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PRODUCTION',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60,
        })
        .json({
            token: token,
            user: data?.user
        });
        
    } catch(error) {
        return res.status(400).json({message: getErrorMessage(error)})
    }
}

export {signUpWithEmailController}