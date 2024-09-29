import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { routerv1 } from './routes';
import { NotFound, Welcome } from './controllers/app.controller';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// route version 1
app.get('/', Welcome);
app.use('/api/v1/', routerv1());
app.use('*', NotFound);


export default app;
