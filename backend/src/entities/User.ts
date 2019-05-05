import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {BaseEntity} from "../core/orm/BaseEntity";
import {UserSession} from "./UserSession";

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

    @OneToMany(type => UserSession, session => session.user)
    sessions: UserSession[];

    public getFullName() {
        return this.firstName+' '+this.lastName;
    }
}
