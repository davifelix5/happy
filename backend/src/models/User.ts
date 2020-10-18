import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, AfterUpdate } from 'typeorm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

@Entity('users')
export default class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'password_reset_token' })
  resetPasswordToken: string

  @Column({ name: 'password_reset_token_expiration' })
  resetTokenExpiration: Date


  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 8)
    this.password = hashedPassword
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password)
  }

  async generateToken() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET as string, {
      expiresIn: 86400
    })
    return token
  }
}