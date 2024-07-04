// src/index.js
import express, { Errback, ErrorRequestHandler, Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Rutas
app.get('/api/example', (req, res) => {
  res.send('GET request to the homepage');
});

app.post('/api/example', (req, res) => {
  res.json({ message: 'POST request to the homepage' });
});

app.put('/api/example/:id', (req, res) => {
  res.json({ message: `PUT request to update item with id ${req.params.id}` });
});

app.delete('/api/example/:id', (req, res) => {
  res.json({ message: `DELETE request to delete item with id ${req.params.id}` });
});

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});