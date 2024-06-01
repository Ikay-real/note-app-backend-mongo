import { Request, Response } from 'express';
import { User, createUserDB, getUsersDB, getUserByIdDB, updateUserDB, deleteUserDB, deleteAllUsersDB } from '../db/users';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: User = req.body;
    //console.log("new user", req);
    
    const createdUser = await createUserDB(newUser);
    res.status(201).json(createdUser);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    //console.log("req-> ",_req);
    const users = await getUsersDB();
    
    
    res.status(200).json(users);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserByIdDB(Number(id));
    if (!user) {
      console.log("id",id);
      
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedUser: User = req.body;
    const user = await updateUserDB(Number(id), updatedUser);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserDB(Number(id));
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    await deleteAllUsersDB();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
