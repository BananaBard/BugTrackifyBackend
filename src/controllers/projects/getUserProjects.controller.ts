import { Request, Response } from "express";
import getErrorMessage from "../../utils/getErrorMessage";
import { getUserProjectsService } from "../../services/projects/getUserProjects.service";

const getUserProjectsController = async (req: Request, res: Response) => {
    const { uid } = req.params;

    try {
        const data = await getUserProjectsService(uid);
        if (data) {
            return res.status(201).json({
                projects: data
            })
        }
    } catch (error) {
        return res.status(400).json({ message: getErrorMessage(error) })
    }
}

export { getUserProjectsController };