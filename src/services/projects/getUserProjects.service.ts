import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";


const getUserProjectsService = async ( userId: string) => {
    try {
        const { data, error } = await supabase.from('Projects')
            .select('*, leader(fullname)')
            .eq('leader', userId)
        console.log(data)
        if (data) return data;
        if (error) throw new Error(getErrorMessage(error));
        
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export {getUserProjectsService};