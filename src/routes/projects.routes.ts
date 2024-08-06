import { Router } from "express";
import { createProjectController } from "../controllers/projects/createProject.controller";
import { getUserProjectsController } from "../controllers/projects/getUserProjects.controller";

const projectsRoutes = Router()

projectsRoutes.post('/new', createProjectController);
projectsRoutes.get('/getByUserId/:uid', getUserProjectsController);

export {projectsRoutes};