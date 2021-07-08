import mongoose from 'mongoose'

export type Text = {
  title: string
  content: string
}

export type TextDocument = mongoose.Document & {
  ar: Text
  fr: Text
  en: Text
}

const textSchema = new mongoose.Schema<TextDocument>(
  {
    ar: { title: String, content: String },
    fr: { title: String, content: String },
    en: { title: String, content: String },
  },
  { timestamps: true }
)

export const Text = mongoose.model<TextDocument>('Text', textSchema)
