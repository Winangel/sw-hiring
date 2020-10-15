import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  postal_code: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
