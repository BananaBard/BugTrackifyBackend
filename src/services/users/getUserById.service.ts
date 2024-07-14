import supabase from "../../infra/supabaseClient"

const getUserByIdService = async(id: string) => {
    const { data, error } = await supabase.from('users').select().match({ id: id });

    if (error) {
        throw new Error(error.message);
    }

    return data.length !== 0;
}

export {getUserByIdService}