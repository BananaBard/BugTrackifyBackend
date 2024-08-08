// src/index.js
import express, { Express, NextFunction, Request, Response, request } from "express";
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes";
import { configDotenv } from "dotenv";
import {projectsRoutes} from "./routes/projects.routes";
import { incidentRoutes } from "./routes/incidents.routes";

configDotenv()

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/projects', projectsRoutes);
app.use('/incidents', incidentRoutes);

// Middleware de manejo de errores
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});