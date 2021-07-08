import { Request, Response, NextFunction } from 'express'

export const getAllTexts = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const getTextById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const storeText = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const updateText = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const getWordsCount = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const getWordsCountByLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const searchText = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}

export const mostOccurrent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {}
