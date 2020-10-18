import crypto from 'crypto'
import { Request, Response } from 'express'
import User from '../models/User'
import userView from '../views/user_view'
import userSchema from '../validation/schemas/userSchema'
import { getRepository } from 'typeorm'
import mailer from '../modules/mailer'

export default {

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userRepository = getRepository(User)

    const existingUser = await userRepository.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({
        message: 'User with that email already exists',
        status: 400
      })
    }

    const newUserData = { name, email, password }

    await userSchema.validate(newUserData, {
      abortEarly: false
    })

    try {
      const newUser = userRepository.create(newUserData)
      await newUser.hashPassword(password)
      await userRepository.save(newUser)
      return res.status(201).json({
        message: 'User registered successfully',
        data: { token: await newUser.generateToken() },
        status: 201
      })
    } catch (err) {
      return res.status(400).json({
        message: 'User registration failed',
        status: 400,
      })
    }

  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    const userRepository = getRepository(User)

    try {
      const user = await userRepository.findOne({ where: { email } })

      if (!user) {
        return res.status(404).json({
          message: 'User not found!',
          status: 400
        })
      }

      const rightPassword = await user.comparePassword(password)
      if (!rightPassword) {
        return res.status(400).json({
          message: 'Invalid credentials!',
          status: 400
        })
      }

      return res.status(200).json({
        message: 'User logged successfully!',
        status: 200,
        data: {
          token: await user.generateToken()
        }
      })

    } catch (err) {
      return res.status(400).json({
        message: 'User authentication failed!',
        status: 400,
      })
    }
  },

  async show(req: Request, res: Response) {
    const { userId } = req
    try {
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({ where: { id: userId } })

      if (!user) {
        return res.status(404).json({
          message: 'This user does not exist',
          status: 404,
        })
      }

      return res.status(200).json({
        message: 'User found successfully',
        data: userView.render(user)
      })

    } catch (err) {
      return res.status(400).json({
        message: 'Could not find the user requestes',
        status: 400,
      })
    }
  },

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body
    const userRepository = getRepository(User)

    try {

      const user = await userRepository.findOne({ where: { email } })

      if (!user) {
        return res.status(400).json({
          message: 'There is no user with such email',
          status: 400
        })
      }

      const [firstName] = user.name.split(' ')
      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      user.resetPasswordToken = token
      user.resetTokenExpiration = now

      await userRepository.save(user)

      const mailOptions = {
        to: email,
        from: 'happyapplication@gmail.com',
        subject: 'Esqueceu sua senha?',
        template: 'auth/forgot-password',
        context: { token, name: firstName }
      }

      function sendMailCallback(err: Error | null) {
        if (err) {
          return res.status(400).json({
            message: 'There has been an error while sending the email',
            status: 400
          })
        }
        return res.status(200).json({
          message: 'Email sent successfully',
          status: 200
        })
      }

      mailer.sendMail(mailOptions, sendMailCallback)

    } catch (err) {
      res.status(400).json({
        message: 'There has been an error while reseting password',
        status: 400,
      })

    }
  },

  async resetPassword(req: Request, res: Response) {
    const { email, token, newPassword } = req.body
    const userRepository = getRepository(User)

    try {

      const user = await userRepository.findOne({ where: { email } })

      if (!user) {
        return res.status(400).json({
          message: 'There is no user with such email',
          status: 400
        })
      }

      const expirationTime = user.resetTokenExpiration
      const isExpirated = (expiration: Date) => new Date() >= expiration

      if (user.resetPasswordToken !== token || isExpirated(expirationTime)) {
        return res.status(400).json({
          message: 'Invalid credentials. Try again!',
          status: 400
        })
      }

      await user.hashPassword(newPassword)
      user.resetTokenExpiration = new Date()
      await userRepository.save(user)

      return res.status(200).json({
        message: 'Password updated successfully',
        status: 200
      })

    } catch (err) {

      return res.status(400).json({
        message: 'There has been an error reseting the password',
        status: 400
      })

    }
  }
}