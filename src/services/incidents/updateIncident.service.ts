import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";
import {Tables} from '../../supabase';

interface UpdateIncidentArgs {
    fieldsToUpdate: Partial<Tables<'incidents'>>;
    incident_id: string;
}

const updateIncidentService = async ({incident_id, fieldsToUpdate}: UpdateIncidentArgs) => {
    try {
        const incidentNewData = Object.fromEntries(
            Object.entries(fieldsToUpdate).filter(([_key, value]) => value != undefined)
        )
        const {error} = await supabase.from('incidents').update({
            ...incidentNewData,
        })
        .eq("id", incident_id)

        if (error) {
            throw new Error(getErrorMessage(error))
        };

    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export {updateIncidentService};