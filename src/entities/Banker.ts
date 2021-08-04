import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Client } from "./Client";
import { Person } from "./utils/Person";

@Entity('banker')
export class Banker extends Person {

    @Column({
        unique: true,
        length: 10
    })
    employeeNumber: string

    @ManyToMany(
        () => Client,
        {
            cascade: false
        }
    )
    @JoinTable({
        name: "bankers_clients",
        joinColumn: {
            name: "banker",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "client",
            referencedColumnName: 'id'
        }
    })
    clients: Client[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

