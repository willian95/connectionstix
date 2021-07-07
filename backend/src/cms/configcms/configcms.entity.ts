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
  
    @Column({
      nullable: true,
    })
    color: string;
  
    @Column({
      nullable: true,
    })
    logo: string;

    @Column({
      nullable: true,
    })
    secondaryLogo: string;

    @Column({
      nullable: true,
    })
    footerLogo: string;

    @Column({
      nullable: true,
    })
    hero: string;

    @Column({ type: 'boolean', default: true})
    overlay: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

  }