import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Configcms extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    color: string;
  
    @Column()
    logo: string;

    @Column()
    hero: string;

    @Column()
    overlay: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

  }