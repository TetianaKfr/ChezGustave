import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

import Equipment from "./Equipment";
import Rating from "./Rating";

@Entity()
export default class Housing {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  /**
   * Json array of the images urls
   */
  @Column("json")
  images_urls: string[]


  /**
   * Housing area, usually a city
   */
  @Column()
  area: string

  @Column()
  description: string

  /**
   * Price during the low season
   */
  @Column("money")
  low_price: number

  /**
   * Price during the medium season
   */
  @Column("money")
  medium_price: number

  /**
   * Price during the high season
   */
  @Column("money")
  high_price: number

  /**
   * Surface in m²
   */
  @Column("int4")
  surface: number

  @Column("int2")
  bedroom_count: number

  @Column("int2")
  bathroom_count: number

  @Column()
  chef: string

  /**
   * Catory of the housing e.g Ville, Montage, Campagne, Bord de mer
   */
  @Column()
  category: string

  /**
   * Type of the housing e.g Villa, Maison, Manoir, Chalet, Atypique
   */
  @Column()
  type: string

  @ManyToMany(() => Equipment)
  @JoinTable()
  equipments: Equipment[]

  @OneToMany(() => Rating, rating => rating.housing)
  ratings: Rating[]
}
