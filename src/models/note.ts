import { Schema, model, Document } from 'mongoose';

export interface INote extends Document {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Note = model<INote>('Note', noteSchema);

export default Note;
