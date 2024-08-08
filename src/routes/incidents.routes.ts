import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { incidentSchema } from "../zod_schemas/schemas";
import { createIncidentController } from "../controllers/incidents/createIncident.controller";

const incidentRoutes = Router();

incidentRoutes.post('/new', validate(incidentSchema), createIncidentController);


export {incidentRoutes}