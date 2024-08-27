import { Request, Response } from "express";
import { updateIncidentService } from "../../services/incidents/updateIncident.service";
import getErrorMessage from "../../utils/getErrorMessage";

const updateIncidentController = async (req: Request, res: Response) => {

    try {
        await updateIncidentService(req.body);
        return res.status(200).json({
            message: 'Ticket updated successfully'
        })

    } catch (error) {
        return res.status(400).json({ message: getErrorMessage(error) })
    }
}

export { updateIncidentController };