import mongoose from 'mongoose'
import { Language } from '../types'

export type Text = {
  title: string
  content: string
  language: Language
}

export type TextDocument = mongoose.Document & Text

export type TextDocumentUpdate = {
  _id: string
  title?: string
  content?: string
  language?: Language
}

const textSchema = new mongoose.Schema<TextDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    language: { type: String, required: true, enum: ['ar', 'fr', 'en'] },
  },
  { timestamps: true }
)

export const TextModel = mongoose.model<TextDocument>('Text', textSchema)
