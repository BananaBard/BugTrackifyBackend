import supabase from "../../infra/supabaseClient"

const checkUserExistService = async(email: string) => {
    const { data, error } = await supabase.from('users').select().match({ email: email });

    if (error) {
        throw new Error(error.message);
    }

    return data.length !== 0;
}

export {checkUserExistService}