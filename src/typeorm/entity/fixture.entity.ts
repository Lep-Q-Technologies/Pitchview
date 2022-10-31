import { Score } from './score.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { Team } from '.';
import { FixtureStatus } from '../enums/fixture-status.enum';

@Entity()
export class Fixture extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'fixture_id' })
  id: number;

  @Column({
    name: 'home_team_id',
    type: 'int',
    nullable: false
  })
  @JoinColumn({ name: 'team_id' })
  homeTeamId: Team;

  @Column({
    name: 'away_team_id',
    type: 'int',
    nullable: false
  })
  @JoinColumn({ name: 'team_id' })
  awayTeamId: Team;

  @Column({
    name: 'home_team_score',
    type: 'int',
    nullable: true
  })
  @JoinColumn({ name: 'total_score' })
  @ManyToOne(() => Score, (score: Score) => score.id)
  homeTeamScore: Score;

  @Column({
    name: 'away_team_score',
    type: 'int',
    nullable: true
  })
  @JoinTable({ name: 'total_score' })
  @ManyToOne(() => Score, (score: Score) => score.id)
  awayTeamScore: Score;

  @Column({
    name: 'first_half_start_date',
    type: 'timestamp',
    nullable: false
  })
  firstHalfStartDate: Date;

  @Column({
    name: 'second_half_start_date',
    type: 'timestamp',
    nullable: false
  })
  secondHalfStartDate: Date;

  @Column({
    name: 'fixture_status',
    type: 'enum',
    enum: FixtureStatus,
    nullable: false
  })
  fixtureStatus: string;

  @Column({
    name: 'time_elapsed',
    type: 'int',
    nullable: false
  })
  timeElapsed: number;
}
