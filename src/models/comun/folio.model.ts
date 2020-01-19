import {Document, model, Schema} from "mongoose";

const schema = new Schema({
    titulo: String,
});

export interface IFolio extends Document
{
    titulo: string;
}

export default model<IFolio>('folio', schema);
