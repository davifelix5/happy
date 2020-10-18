import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/resources/mail/')
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}))

export default transport
