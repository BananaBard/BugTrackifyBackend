import supabase from "../../infra/supabaseClient"

const getUserByEmailService = async(email: string) => {
    const { data, error } = await supabase.from('users').select().match({ email: email });

    if (error) {
        throw new Error(error.message);
    }

    return data.length !== 0;
}

export default getUserByEmailService