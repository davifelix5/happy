import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup'

import FileValidationError from './fileValidationError'

interface ValidationErrors {
  [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error)

  if (error instanceof FileValidationError) {
    return res.status(400).json({
      data: error.message,
      message: 'You have sent invalid data',
      status: 400
    })
  }

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {}
    error.inner.forEach(err => {
      errors[err.path] = err.errors
    })
    return res.status(400).json({
      data: errors,
      message: 'You have sent invalid data',
      status: 400,
    })
  }

  return res.status(500).json({
    message: 'Internal server error',
    status: 500
  })
};

export default errorHandler;
