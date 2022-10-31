import 'reflect-metadata';

import { DataSource } from 'typeorm';
import datasource = require('../../ormconfig');

export class Database {
  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.runMigrations = this.runMigrations.bind(this);
    this.undoLastMigration = this.undoLastMigration.bind(this);
  }

  public async connect(): Promise<DataSource> {
    return await datasource.default.initialize();
  }

  public async disconnect(): Promise<void> {
    await datasource.default.destroy();
  }

  public async runMigrations(): Promise<void> {
    const connection = await this.connect();

    await connection.runMigrations({
      transaction: 'all'
    });

    await this.disconnect();
  }

  public async undoLastMigration(): Promise<void> {
    const manager = await this.connect();

    await manager.undoLastMigration({
      transaction: 'all'
    });

    await this.disconnect();
  }
}
