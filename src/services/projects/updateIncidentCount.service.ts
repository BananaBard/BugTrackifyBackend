import supabase from "../../infra/supabaseClient"
import getErrorMessage from "../../utils/getErrorMessage"

const incrementIncidentCountService = async(projectId: string) => {
    const {error} = await supabase.rpc("increment_incident_count", {
        projectid: projectId
    })

    if (error) {
        console.log(error)
        throw new Error(getErrorMessage(error));
      }
}

const decreaceIncidentCountService = async(projectId: string) => {
    const {error} = await supabase.rpc("decreace_incident_count", {
        projectid: projectId
    })

    if (error) {
        console.log(error)
        throw new Error(getErrorMessage(error));
      }
}

export {incrementIncidentCountService, decreaceIncidentCountService}