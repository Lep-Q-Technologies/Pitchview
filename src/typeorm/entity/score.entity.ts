import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity
} from 'typeorm';
import { Fixture, Team } from '.';

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'fixture_id',
    type: 'int',
    nullable: false
  })
  @ManyToOne(() => Fixture, (fixture: Fixture) => fixture.id)
  fixtureId: number;

  @Column({
    name: 'team_id',
    type: 'int',
    nullable: false
  })
  @ManyToOne(() => Team, (team: Team) => team.id)
  teamId: number;

  @Column({
    name: 'half_time_score',
    type: 'int',
    nullable: false
  })
  halfTimeScore: number;

  @Column({
    name: 'full_time_score',
    type: 'int',
    nullable: false
  })
  fullTimeScore: number;

  @Column({
    name: 'extra_time_score',
    type: 'int',
    nullable: true
  })
  extraTimeScore: number;

  @Column({
    name: 'penalties_score',
    type: 'int',
    nullable: true
  })
  penaltiesScore: number;

  @Column({
    name: 'total_score',
    type: 'int',
    nullable: false
  })
  totalScore: number;

  @Column({
    name: 'winner',
    type: 'boolean',
    nullable: false
  })
  winner: boolean;

  @Column({
    name: 'draw',
    type: 'boolean',
    nullable: false
  })
  draw: boolean;

  @Column({
    name: 'loser',
    type: 'boolean',
    nullable: false
  })
  loser: boolean;
}
