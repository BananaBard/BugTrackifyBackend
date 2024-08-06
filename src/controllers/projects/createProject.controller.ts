import { Request, Response } from "express";
import { createProjectService } from "../../services/projects/createProject.service";
import getErrorMessage from "../../utils/getErrorMessage";

const createProjectController = async (req: Request, res: Response) => {
    const { title, description, leader, status } = req.body;

    try {
        const data = await createProjectService({ title, description, leader, status });
        if (data) {
            return res.status(201).json({
                project: data
            })
        }
    } catch (error) {
        return res.status(400).json({ message: getErrorMessage(error) })
    }
}

export { createProjectController };