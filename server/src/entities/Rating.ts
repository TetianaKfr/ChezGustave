import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Housing from "./Housing";

@Entity()
export default class Rating {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int8")
  rating: number

  @Column()
  comment: string

  @ManyToOne(() => Housing, housing => housing.ratings)
  housing: Housing
}
