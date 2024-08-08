import supabase from "../../infra/supabaseClient";
import getErrorMessage from "../../utils/getErrorMessage";
import {Tables} from '../../supabase';
import { incrementIncidentCountService } from "../projects/updateIncidentCount.service";


const createIncidentService = async ({ title, description, created_by, project_id, priority, severity, status, steps_to_reproduce, actual_result, expected_result }: Tables<'incidents'>) => {
    try {
        const {data, error} = await supabase.from('incidents').insert({
            title,
            description,
            created_by,
            project_id,
            priority,
            severity,
            status,
            steps_to_reproduce,
            actual_result,
            expected_result
        }).select()

        if (error) {
            throw new Error(getErrorMessage(error))
        };

        if (data) {
            await incrementIncidentCountService(project_id);
        }

        return data;

    } catch (error) {
        console.log(error)
        throw new Error(getErrorMessage(error));
    }
}

export {createIncidentService};