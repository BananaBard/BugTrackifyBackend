import { Router } from "express";
import { createProjectController } from "../controllers/projects/createProject.controller";
import { getUserProjectsController } from "../controllers/projects/getUserProjects.controller";
import { validate } from "../middlewares/validate.middleware";
import { projectSchema } from "../zod_schemas/schemas";

const projectsRoutes = Router()

projectsRoutes.post('/new',validate(projectSchema),createProjectController);
projectsRoutes.get('/getByUserId/:uid', getUserProjectsController);

export {projectsRoutes};