import { Request, Response } from "express";
import { deleteIncidentService } from "../../services/incidents/deleteIncident.service";
import getErrorMessage from "../../utils/getErrorMessage";

const deleteIncidentController = async (req: Request, res: Response) => {
    const {incidentId} = req.params;
    try {
        await deleteIncidentService(incidentId);
        return res.status(200).json({
            message: 'Ticket deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({ message: getErrorMessage(error) })
    }
}

export { deleteIncidentController };