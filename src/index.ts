import express, { Request, Response } from 'express';
import noteRoutes from './routes/noteRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/notes', noteRoutes);

const greeting: string = 'Hello, World!'; // Specify string type for greeting

app.get('/', (req: Request, res: Response) => {
  res.send(greeting); // Use greeting variable with correct type
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
