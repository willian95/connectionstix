import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Hero{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    image:string;

}
