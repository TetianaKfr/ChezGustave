import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExampleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'Example' })
    text: string;
}