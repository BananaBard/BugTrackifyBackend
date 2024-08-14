import { Request, Response } from "express";
import { getProjectIncidents } from "../../services/incidents/getProjectIncidents.service";
import getErrorMessage from "../../utils/getErrorMessage";

const getProjectIncidentsController = async(req: Request, res: Response) => {
    const {projectId} = req.params;
    try {
        const data = await getProjectIncidents(projectId);
        if (data) {
            return res.status(201).json({
                incidents: data
            })
        }
    } catch (error) {
        return res.status(400).json({ message: getErrorMessage(error) })
    }
}

export {getProjectIncidentsController}