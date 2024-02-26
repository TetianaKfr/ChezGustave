import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Equipment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
