import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {BaseEntity} from "../core/orm/BaseEntity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;
}
