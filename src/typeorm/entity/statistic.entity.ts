import { Fixture } from './fixture.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Team } from '.';

@Entity()
export class Statistic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'team_id',
    type: 'int',
    nullable: false
  })
  @JoinColumn({ name: 'team_id' })
  @ManyToOne(() => Team, (team: Team) => team.id)
  team_id: string;

  @Column({
    name: 'shots_on_goal',
    type: 'int',
    nullable: true
  })
  shotsOnGoal: string;

  @Column({
    name: 'shots_off_goal',
    type: 'int',
    nullable: true
  })
  shotsOffGoal: string;

  @Column({
    name: 'total_shots',
    type: 'int',
    nullable: true
  })
  totalShots: string;

  @Column({
    name: 'blocked_shots',
    type: 'int',
    nullable: true
  })
  blockedShots: string;

  @Column({
    name: 'shots_inside_box',
    type: 'int',
    nullable: true
  })
  shotsInsideBox: string;

  @Column({
    name: 'shots_outside_box',
    type: 'int',
    nullable: true
  })
  shotsOutsideBox: string;

  @Column({
    name: 'fouls',
    type: 'int',
    nullable: true
  })
  fouls: string;

  @Column({
    name: 'corner_kicks',
    type: 'int',
    nullable: true
  })
  cornerKicks: string;

  @Column({
    name: 'offsides',
    type: 'int',
    nullable: true
  })
  offsides: string;

  @Column({
    name: 'ball_possession',
    type: 'int',
    nullable: true
  })
  ballPossession: string;

  @Column({
    name: 'yellow_cards',
    type: 'int',
    nullable: true
  })
  yellowCards: string;

  @Column({
    name: 'red_cards',
    type: 'int',
    nullable: true
  })
  redCards: string;

  @Column({
    name: 'goalkeeper_saves',
    type: 'int',
    nullable: true
  })
  goalkeeperSaves: string;

  @Column({
    name: 'total_passes',
    type: 'int',
    nullable: true
  })
  totalPasses: string;

  @Column({
    name: 'passes_accurate',
    type: 'int',
    nullable: true
  })
  passesAccurate: string;

  @Column({
    name: 'passes_accuracy',
    type: 'int',
    nullable: true
  })
  passesAccuracy: string;

  @Column({
    name: 'fixture_id',
    type: 'int',
    nullable: true
  })
  @ManyToOne(() => Fixture, (fixture) => fixture.id)
  @JoinColumn({ name: 'fixture_id' })
  fixtureId: Fixture;
}
