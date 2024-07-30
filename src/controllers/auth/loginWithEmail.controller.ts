import { Request, Response } from "express";
import { loginWithEmailService } from "../../services/auth/loginWithEmail.service";
import getErrorMessage from "../../utils/getErrorMessage";
import { supabaseAdmin } from "../../infra/supabaseClient";

const loginWithEmailController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const resp = await loginWithEmailService({ email, password });

        if (resp.error?.status === 400) return res.status(400).json({ message: 'No user with this email or wrong password, check your credentials again' });
        const token = resp.data.session?.access_token;
        const uid = resp.data.user?.id
        const user = await supabaseAdmin.from('users').select().eq('id', uid!)

        return res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'PRODUCTION',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            })
            .json({
                token: token,
                user: user?.data
            })

    } catch (error) {
        return res.status(401).json({ message: getErrorMessage(error) })
    }
}

export { loginWithEmailController }