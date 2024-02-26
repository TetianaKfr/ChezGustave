import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Rating {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int8")
  rating: number

  @Column()
  comment: string
}
