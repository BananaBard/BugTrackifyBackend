import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";

interface CreateProjectServiceArgs {
    title: string;
    description: string;
    leader: string;
    status: string;
}

const createProjectService = async ({ title, description, leader, status }: CreateProjectServiceArgs) => {
    try {
        const { data, error } = await supabase.from('projects')
            .insert({
                title: title,
                description: description,
                leader: leader,
                status: status
            }).select();
            if (error) {
                throw new Error(getErrorMessage(error));
            }
        return data;

    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export {createProjectService};