import { TextModel, TextDocument, TextDocumentUpdate } from '../models/Text'
import { Language } from '../types'

export const getAllTexts = async (): Promise<TextDocument[]> => {
  return TextModel.find().exec()
}

export const getTextById = async (textId: string): Promise<TextDocument> => {
  return TextModel.findById(textId).exec()
}

export const storeText = async (text: Text): Promise<TextDocument> => {
  const newText = new TextModel(text)

  return newText.save()
}

export const updateText = async (text: TextDocumentUpdate): Promise<any> => {
  const { _id, ...updates } = text
  return TextModel.updateOne({ _id }, updates, {
    runValidators: true,
  }).exec()
}

export const wordsCount = async (
  textId: string,
  language: Language | string
): Promise<number> => {
  const text = await getTextById(textId)

  //@ts-ignore
  if (language) return text[language]?.content?.match(/\S+/g).length

  return (
    text.ar.content.match(/\S+/g).length +
    text.fr.content.match(/\S+/g).length +
    text.en.content.match(/\S+/g).length
  )
}

export const textSearch = async (query: any): Promise<TextDocument[]> => {
  return TextModel.find({
    $text: {
      $search: query,
    },
  })
}

export const getMostOccurentWord = async (): Promise<any> => {
  const cursor = TextModel.find().cursor()
  const count: { [key: string]: number } = {}

  cursor.on('data', doc => {
    const words = (
      doc.ar.title +
      ' ' +
      doc.ar.content +
      ' ' +
      doc.fr.title +
      ' ' +
      doc.fr.content +
      ' ' +
      doc.en.title +
      ' ' +
      doc.en.content
    ).split(' ')

    words.forEach(word => {
      count[word] = (count[word] || 0) + 1
    })
  })

  return new Promise((resolve, reject) => {
    cursor.on('end', () => {
      const maxOccurence = Math.max(...Object.values<number>(count))
      const result: { [key: string]: number } = {}

      for (const word in count) {
        if (count[word] === maxOccurence) result[word] = maxOccurence
      }

      resolve(result)
    })
    cursor.on('error', error => reject(error))
  })
}
