import multer from 'multer';
import path from 'path'
import FileValidationError from '../errors/fileValidationError'

export default multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`
      callback(null, fileName)
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png']
    const [, fileExt] = file.originalname.split('.')
    const allowed = allowedExtensions.find(ext => ext === fileExt)
    if (allowed) {
      cb(null, true)
      return
    }
    cb(null, false)
    cb(new FileValidationError('File extension not accepted!'))
  },
});
