import { Statistic } from './statistic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity
} from 'typeorm';
import { Fixture } from '.';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'team_id' })
  id: number;

  @Column({
    name: 'team_name',
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    name: 'team_logo',
    type: 'varchar',
    nullable: true
  })
  logo: string;

  @Column({
    name: 'fixture_id',
    type: 'int',
    nullable: false
  })
  @ManyToOne(() => Fixture, (fixture: Fixture) => fixture.id)
  fixtureId: Fixture;

  @Column({
    name: 'fixture_statistics',
    type: 'json',
    nullable: true
  })
  @ManyToOne(() => Statistic, (statistic: Statistic) => statistic.id)
  fixtureStatistics: Statistic;
}
