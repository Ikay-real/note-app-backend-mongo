import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import initDB from './db/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
  
});

app.listen(PORT, () => {
  initDB()
  console.log(`Server is running on port http://localhost:${PORT}`);
});
