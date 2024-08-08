import { Request, Response } from "express";
import { createIncidentService } from "../../services/incidents/createIncident.service";
import getErrorMessage from "../../utils/getErrorMessage";

const createIncidentController = async (req: Request, res: Response) => {

    try {
        const data = await createIncidentService(req.body);
        if (data) {
            return res.status(201).json({
                incident: data
            })
        }
    } catch (error) {
        return res.status(400).json({ message: getErrorMessage(error) })
    }
}

export { createIncidentController };