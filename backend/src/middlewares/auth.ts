import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()

interface DecodedTokenData {
  id: number
}

export default function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided!',
      status: 401
    })
  }

  const [, token] = authHeader.split(' ')

  try {

    const decoded = <DecodedTokenData>jwt.verify(token, process.env.JWT_SECRET as string)

    req.userId = decoded.id

    return next()

  } catch (err) {

    return res.status(401).json({
      message: 'Invalid token!',
      status: 401
    })

  }

}