import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'matches' })
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  left_company_id: number;

  @Column()
  right_company_id: number;
}
