 import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

 @Entity()
 export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;
        
 }