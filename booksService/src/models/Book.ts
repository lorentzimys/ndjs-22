import mongoose, { Schema } from "mongoose";

export interface IBook {
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}

export const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  authors: [String],
  favorite: String,
  fileCover: String,
  fileName: String,
  // fileBook: String,
});

export const BookModel = mongoose.model<IBook>("Book", BookSchema);