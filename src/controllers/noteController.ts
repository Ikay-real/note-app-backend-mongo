import { Request, Response } from 'express';
import Note, { INote } from '../models/note';

interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export const getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const notes: INote[] = await Note.find();
        res.status(200).json({
            status: 'success',
            message: 'Notes fetched successfully',
            data: notes
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (isErrorWithMessage(error)) {
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: errorMessage
        });
    }
};

export const getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const note: INote | null = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({ status: 'error', message: 'Note not found' });
            return;
        }
        res.status(200).json({
            status: 'success',
            message: 'Note fetched successfully',
            data: note
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (isErrorWithMessage(error)) {
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: errorMessage
        });
    }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content } = req.body;
        const newNote: INote = new Note({
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newNote.save();
        res.status(201).json({
            status: 'success',
            message: 'Note created successfully',
            data: newNote
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (isErrorWithMessage(error)) {
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: errorMessage
        });
    }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content } = req.body;
        const note: INote | null = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, updatedAt: new Date() },
            { new: true }
        );
        if (!note) {
            res.status(404).json({ status: 'error', message: 'Note not found' });
            return;
        }
        res.status(200).json({
            status: 'success',
            message: 'Note updated successfully',
            data: note
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (isErrorWithMessage(error)) {
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: errorMessage
        });
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const note: INote | null = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            res.status(404).json({ status: 'error', message: 'Note not found' });
            return;
        }
        res.status(204).json({
            status: 'success',
            message: 'Note deleted successfully'
        });
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (isErrorWithMessage(error)) {
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: errorMessage
        });
    }
};