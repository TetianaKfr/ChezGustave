import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string
  
  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  phone_number: string

  @Column({ unique: true, nullable: true })
  session_token: string

  @Column({ nullable: true })
  admin: boolean
}
