import { TextModel, TextDocument, TextDocumentUpdate } from '../models/Text'
import { Language } from '../types'

export const getAllTexts = async (): Promise<TextDocument[]> => {
  return TextModel.find().exec()
}

export const getTextByID = async (textId: string): Promise<TextDocument> => {
  return TextModel.findById(textId).exec()
}

export const storeText = async (text: Text): Promise<TextDocument> => {
  const newText = new TextModel(text)

  return newText.save()
}

export const updateText = async (
  text: TextDocumentUpdate
): Promise<TextDocument> => {
  return TextModel.findOneAndUpdate(text).exec()
}

export const wordsCount = async (language: Language): Promise<number> => {
  if (language) return 10
}
