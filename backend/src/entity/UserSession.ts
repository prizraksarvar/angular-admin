import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../core/orm/BaseEntity";
import {User} from "./User";

@Entity()
export class UserSession extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({default: null})
    data: string;

    @ManyToOne(type => User, user => user.sessions)
    user: User;
}
