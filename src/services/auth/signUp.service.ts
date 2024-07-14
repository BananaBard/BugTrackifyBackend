import { supabaseAdmin } from "../../infra/supabaseClient"
import getErrorMessage from "../../utils/getErrorMessage";
import {checkUserExistService} from "../users/checkUserExist.service";

interface SignUpWithEmailServiceArgs {
    email: string;
    password: string;
    fullname: string;
    role: 'Developer' | 'Tester' | 'Project Leader'
}

const signUpWithEmailService = async ({ email, password, fullname, role }: SignUpWithEmailServiceArgs) => {
    try {
        const isUserAlready = await checkUserExistService(email);
        if (isUserAlready) {
            throw new Error('Email already in use!')
        }

        const { data, error } = await supabaseAdmin.auth.signUp({
            email: email,
            password: password
        });
        if (data) {
            await supabaseAdmin.from('users').insert([{
                id: data.user?.id!,
                email: data.user?.email!,
                fullname: fullname,
                role: role
            }])
                .select()
            const uid = data?.user?.id
            const createdUser = await supabaseAdmin.from('users').select().eq('id', uid!)
            let userData = createdUser?.data

        return {
            token: data.session?.access_token,
            user: userData
        }

        }
        if (error) {
            throw new Error(getErrorMessage(error));
        }
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export { signUpWithEmailService }