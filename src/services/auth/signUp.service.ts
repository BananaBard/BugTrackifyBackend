import supabase, { supabaseAdmin } from "../../infra/supabaseClient"
import getErrorMessage from "../../utils/getErrorMessage";
import getUserByEmailService from "../users/getUserByEmail.service";

interface SignUpWithEmailServiceArgs {
    email: string;
    password: string;
}

const signUpWithEmailService = async ({email, password}: SignUpWithEmailServiceArgs) => {
    try {

        const isUserAlready = await getUserByEmailService(email);
        if (isUserAlready) {
            throw new Error('Email already in use!')
        }

        const {data, error} = await supabaseAdmin.auth.signUp({
            email: email,
            password: password
        });
        if (data) {
            const user = await supabaseAdmin.from('users').insert([{
                id: data.user?.id!,
                email: data.user?.email!,
            }])
            .select()
            return data
        }
        if (error) {
            throw new Error(getErrorMessage(error));
        }
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export {signUpWithEmailService}