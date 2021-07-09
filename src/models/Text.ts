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

export type TextDocumentUpdate = {
  _id: string
  ar?: Text
  fr?: Text
  en?: Text
}

const textSchema = new mongoose.Schema<TextDocument>(
  {
    ar: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
    fr: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
    en: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
  },
  { timestamps: true }
)

textSchema.index(
  {
    'ar.title': 'text',
    'fr.title': 'text',
    'en.title': 'text',
    'ar.content': 'text',
    'fr.content': 'text',
    'en.content': 'text',
  },
  { name: 'textSearch' }
)

export const TextModel = mongoose.model<TextDocument>('Text', textSchema)
