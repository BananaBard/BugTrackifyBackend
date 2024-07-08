import supabase from "../../infra/supabaseClient";

interface LoginInWithEmailArgs {
    email: string;
    password: string;
}


const LoginInWithEmail = ({email, password}: LoginInWithEmailArgs) => {
    try {
        const data = supabase.auth.signInWithPassword({email, password})
        return data;
    } catch(error) {
        throw new Error('Could not log in...')
    }
}