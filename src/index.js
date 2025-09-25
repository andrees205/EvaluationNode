import express from 'express';
import dotenv from 'dotenv';
import librosRouter from './routes/libro.js';
import { errorHandler } from './middlewares/errorHandler.js';
dotenv.config();

const app=express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo')
});
    
app.use('/libros', librosRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en https://localhost:${process.env.PORT || 3000}`);
});
