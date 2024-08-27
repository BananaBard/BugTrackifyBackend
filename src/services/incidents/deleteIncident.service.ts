import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";
import { decreaceIncidentCountService } from "../projects/updateIncidentCount.service";


const deleteIncidentService = async (incidentId: string) => {
    try {
        const {data, error} = await supabase.from('incidents').delete().eq('id', incidentId).select()

        if (error) {
            throw new Error(getErrorMessage(error))
        };

        if (data) {
            await decreaceIncidentCountService(data[0].project_id);
        }
        return data;

    } catch (error) {
        console.log(error)
        throw new Error(getErrorMessage(error));
    }
}

export {deleteIncidentService};