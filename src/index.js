import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
dotenv.config();

const app=express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo')
});
    
app.use('/users', usersRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en https://localhost:${process.env.PORT || 3000}`);
});
