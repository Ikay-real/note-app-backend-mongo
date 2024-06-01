import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Define User type
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initDB = async (): Promise<void> => {
  db = await open({
    filename: './database/users.db',
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT,
      password TEXT
    )
  `);
};

export const createUserDB = async (user: User): Promise<User> => {
  const { username, email, password } = user;

  console.log("data ", user);

  const result = await db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    username,
    email,
    password
  );

  if (result && typeof result.lastID === 'number') {
    const lastInsertedId = result.lastID;
    const createdUser = await getUserByIdDB(lastInsertedId);

    // Check if createdUser is defined before returning
    if (createdUser) {
      return createdUser;
    } else {
      throw new Error('Error creating user. User not found after insertion.');
    }
  } else {
    throw new Error('Error creating user. Unable to get last inserted ID.');
  }
};



export const getUsersDB = async (): Promise<User[]> => {
  return db.all('SELECT * FROM users');
};

export const getUserByIdDB = async (id: number): Promise<User | undefined> => {
  return db.get('SELECT * FROM users WHERE id = ?', id);
};

export const updateUserDB = async (id: number, updatedUser: User): Promise<User | undefined> => {
  const { username, email, password } = updatedUser;
  await db.run('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', username, email, password, id);
  return getUserByIdDB(id);
};

export const deleteUserDB = async (id: number): Promise<User | undefined> => {
  const userToDelete = await getUserByIdDB(id);
  if (!userToDelete) return undefined;
  await db.run('DELETE FROM users WHERE id = ?', id);
  return userToDelete;
};

// ... (existing code)

// Function to delete all users from the database
export const deleteAllUsersDB = async (): Promise<void> => {
  await db.run('DELETE FROM users');
};


export default initDB;
