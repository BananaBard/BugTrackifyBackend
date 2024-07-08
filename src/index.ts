// src/index.js
import express, { Express, NextFunction, Request, Response, request } from "express";
import cors from 'cors';
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import { configDotenv } from "dotenv";
import { supabaseAdmin } from "./infra/supabaseClient";

configDotenv()

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/auth', authRoutes);

app.delete('/delete', async(req: Request, res: Response) => {
  const user = req.body.user
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user)
  res.status(200).json({data})
})

// Middleware de manejo de errores
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});