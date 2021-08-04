import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string

    @Column({
        unique: true,
        length: 16
    })
    cardNumber: string



}

