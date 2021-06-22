import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Colors{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    color:string;

}
