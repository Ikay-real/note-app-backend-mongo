import express, { Request, Response } from 'express';

import noteRoutes from './routes/noteRoutes';
import apiKeyMiddleware from './middleware/apiKeyMiddleware';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const greeting = 'Hello, World!';  // Check for correct quotation marks and line endings

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use(express.json());
//app.use(apiKeyMiddleware);

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/notes', noteRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send(greeting);  // Ensure variables or template literals are correctly used
});

app.listen(PORT, () => {

  console.log(`Server is running on port http://localhost:${PORT}`);
});
