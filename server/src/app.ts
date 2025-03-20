import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { userRouter } from './routes/user.routes';

const app = express();

// Validate required environment variables
if (!process.env.CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN environment variable is required');
}

// PRIMARY MIDDLEWARES
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(helmet());

// TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is running...' });
});

// ROUTES
app.use('/api/users', userRouter);

// Error Handling Middleware
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
export { app };