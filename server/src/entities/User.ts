import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Booking from "./Booking";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  password_hash: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  phone_number: string

  /**
   * Randomly generated base64 string
   */
  @Column({ nullable: true })
  session_token: string

  @Column({ nullable: true })
  session_token_expiration: Date

  @Column({ nullable: true })
  admin: boolean

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[]
}
