import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";

const getProjectIncidents = async(projectId: string) => {
    try {
        const { data, error } = await supabase.from('incidents')
            .select('*, created_by(fullname, id), assigned_to(fullname,id)')
            .eq('project_id', projectId)

            if (data) return data;
            if (error) throw new Error(getErrorMessage(error));

    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export {getProjectIncidents}