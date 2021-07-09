import { Request, Response, NextFunction } from 'express'
import { TextDocument, TextDocumentUpdate } from '../models/Text'

import * as textService from '../services/textService'

export const getAllTexts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<TextDocument[]>> => {
  try {
    const textsList = await textService.getAllTexts()

    return res.status(200).json(textsList)
  } catch (error) {
    next(error)
  }
}

export const getTextById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<TextDocument[]>> => {
  try {
    const texId: string = req.params.texId
    const text = await textService.getTextById(texId)

    return res.status(200).json(text)
  } catch (error) {
    next(error)
  }
}

export const storeText = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<TextDocument>> => {
  try {
    const payload: Text = req.body
    const result = await textService.storeText(payload)

    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const updateText = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const payload: TextDocumentUpdate = req.body
    const { nModified } = await textService.updateText(payload)
    const result = {
      status: nModified ? 200 : 400,
      message: nModified ? 'Document updated' : 'No document updated',
    }

    return res.status(result.status).send(result.message)
  } catch (error) {
    next(error)
  }
}

export const getWordsCount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<number>> => {
  try {
    const { textId, language } = req.params
    const count = await textService.wordsCount(textId, language)

    return res.status(200).json(count)
  } catch (error) {
    next(error)
  }
}

export const searchText = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<string[]>> => {
  try {
    const result = await textService.textSearch(req.query.q)

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const mostOccurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<{ [key: string]: number }>> => {
  try {
    const result = await textService.getMostOccurentWord()

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
