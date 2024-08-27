import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { incidentSchema } from "../zod_schemas/schemas";
import { createIncidentController } from "../controllers/incidents/createIncident.controller";
import { getProjectIncidentsController } from "../controllers/incidents/getProjectIncidents.controller";
import { updateIncidentController } from "../controllers/incidents/updateIncident.controller";
import { deleteIncidentController } from "../controllers/incidents/deleteIncident.controller";

const incidentRoutes = Router();

incidentRoutes.post('/new', validate(incidentSchema), createIncidentController);
incidentRoutes.get('/byProject/:projectId', getProjectIncidentsController)
incidentRoutes.put('/update', updateIncidentController)
incidentRoutes.delete('/:incidentId', deleteIncidentController)

export {incidentRoutes}