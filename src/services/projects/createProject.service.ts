import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";

interface CreateProjectServiceArgs {
    title: string;
    description: string;
    leader: string;
}

const createProjectService = async ({ title, description, leader }: CreateProjectServiceArgs) => {
    try {
        const { data, error } = await supabase.from('Projects')
            .insert({
                title: title,
                description: description,
                leader: leader
            });
            console.log(error)
            if (error) {
                throw new Error(getErrorMessage(error));
            }
        return data;

    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export {createProjectService};