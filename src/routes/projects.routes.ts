import { Router } from "express";
import { createProjectController } from "../controllers/projects/createProject.controller";

const projectsRoutes = Router()

projectsRoutes.post('/new', createProjectController);

export {projectsRoutes};