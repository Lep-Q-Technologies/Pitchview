import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixtureScoreStatisticTeamUserMigration1667233525411
  implements MigrationInterface
{
  name = 'FixtureScoreStatisticTeamUserMigration1667233525411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."fixture_fixture_status_enum" AS ENUM('SCHEDULED', 'LIVE', 'PAUSED', 'FINISHED', 'POSTPONED', 'SUSPENDED', 'CANCELED', 'FIRST_HALF', 'SECOND_HALF', 'FIRST_HALF_EXTRA_TIME', 'SECOND_HALF_EXTRA_TIME', 'PENALTIES')`
    );
    await queryRunner.query(
      `CREATE TABLE "fixture" ("fixture_id" SERIAL NOT NULL, "home_team_id" integer NOT NULL, "away_team_id" integer NOT NULL, "home_team_score" integer, "away_team_score" integer, "first_half_start_date" TIMESTAMP NOT NULL, "second_half_start_date" TIMESTAMP NOT NULL, "fixture_status" "public"."fixture_fixture_status_enum" NOT NULL, "time_elapsed" integer NOT NULL, "total_score" integer, "awayTeamScoreId" integer, CONSTRAINT "PK_1dabbb4991f5deb6ed943cdaa05" PRIMARY KEY ("fixture_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "statistic" ("id" SERIAL NOT NULL, "team_id" integer NOT NULL, "shots_on_goal" integer, "shots_off_goal" integer, "total_shots" integer, "blocked_shots" integer, "shots_inside_box" integer, "shots_outside_box" integer, "fouls" integer, "corner_kicks" integer, "offsides" integer, "ball_possession" integer, "yellow_cards" integer, "red_cards" integer, "goalkeeper_saves" integer, "total_passes" integer, "passes_accurate" integer, "passes_accuracy" integer, "fixture_id" integer, CONSTRAINT "PK_e3e6fd496e1988019d8a46749ae" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("team_id" SERIAL NOT NULL, "team_name" character varying NOT NULL, "team_logo" character varying, "fixture_id" integer NOT NULL, "fixture_statistics" json, "fixtureIdId" integer, "fixtureStatisticsId" integer, CONSTRAINT "PK_a35a345d4436b82adf6bb76f3ce" PRIMARY KEY ("team_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "score" ("id" SERIAL NOT NULL, "fixture_id" integer NOT NULL, "team_id" integer NOT NULL, "half_time_score" integer NOT NULL, "full_time_score" integer NOT NULL, "extra_time_score" integer, "penalties_score" integer, "total_score" integer NOT NULL, "winner" boolean NOT NULL, "draw" boolean NOT NULL, "loser" boolean NOT NULL, "fixtureIdId" integer, "teamIdId" integer, CONSTRAINT "PK_1770f42c61451103f5514134078" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "fixture" ADD CONSTRAINT "FK_96a1861ca38e3ae37912415ad48" FOREIGN KEY ("total_score") REFERENCES "score"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "fixture" ADD CONSTRAINT "FK_58ae591e9ed3cddbe8cec8c5b5b" FOREIGN KEY ("awayTeamScoreId") REFERENCES "score"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "statistic" ADD CONSTRAINT "FK_d223181a131d94f0ca72264d36b" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "statistic" ADD CONSTRAINT "FK_5a26ac269a8267429e5ac807cb2" FOREIGN KEY ("fixture_id") REFERENCES "fixture"("fixture_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_eae64f26d114eb7904b583e626c" FOREIGN KEY ("fixtureIdId") REFERENCES "fixture"("fixture_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_dd96293088cf58572f9dae428dd" FOREIGN KEY ("fixtureStatisticsId") REFERENCES "statistic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_b3e425e5881ac6676ccc7bb395b" FOREIGN KEY ("fixtureIdId") REFERENCES "fixture"("fixture_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_97ab67da9cec71f18d4b8342d01" FOREIGN KEY ("teamIdId") REFERENCES "team"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_97ab67da9cec71f18d4b8342d01"`
    );
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_b3e425e5881ac6676ccc7bb395b"`
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_dd96293088cf58572f9dae428dd"`
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_eae64f26d114eb7904b583e626c"`
    );
    await queryRunner.query(
      `ALTER TABLE "statistic" DROP CONSTRAINT "FK_5a26ac269a8267429e5ac807cb2"`
    );
    await queryRunner.query(
      `ALTER TABLE "statistic" DROP CONSTRAINT "FK_d223181a131d94f0ca72264d36b"`
    );
    await queryRunner.query(
      `ALTER TABLE "fixture" DROP CONSTRAINT "FK_58ae591e9ed3cddbe8cec8c5b5b"`
    );
    await queryRunner.query(
      `ALTER TABLE "fixture" DROP CONSTRAINT "FK_96a1861ca38e3ae37912415ad48"`
    );
    await queryRunner.query(`DROP TABLE "score"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "statistic"`);
    await queryRunner.query(`DROP TABLE "fixture"`);
    await queryRunner.query(`DROP TYPE "public"."fixture_fixture_status_enum"`);
  }
}
