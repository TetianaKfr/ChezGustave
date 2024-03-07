import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

import Housing from "./Housing";
import User from "./User";
import Rating from "./Rating";

@Entity()
export default class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  start: Date

  @Column()
  end: Date

  @Column()
  chef_available: boolean

  @Column({ nullable: true })
  visit_date: Date

  @ManyToOne(() => Housing)
  housing: Housing

  @ManyToOne(() => User, (user) => user.bookings)
  user: User
}
