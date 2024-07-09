import supabase from "../../infra/supabaseClient";

interface LoginWithEmailArgs {
    email: string;
    password: string;
}


const loginWithEmailService = async({email, password}: LoginWithEmailArgs) => {
    try {
        const data = supabase.auth.signInWithPassword({email, password})
        return data;
    } catch(error) {
        throw new Error('Could not log in...')
    }
}

export default loginWithEmailService