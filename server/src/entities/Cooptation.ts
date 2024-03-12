import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Cooptation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  phone_number: string
}


