import 'reflect-metadata';

import {
  Connection,
  ConnectionManager,
  getConnectionManager,
  createConnection,
  ConnectionOptions
} from 'serverless-typeorm';

export class Database {
  private connectionManager: ConnectionManager;
  constructor() {
    this.connectionManager = getConnectionManager();
  }
  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`;
    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.info(`Database.getConnection()-using existing connection ...`);

      connection = this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      console.info(`Database.getConnection()-creating connection ...`);
      console.info(`DB host::: ${process.env.DB_HOST}`);

      const connectionOptions: ConnectionOptions = {
        name: `default`,
        type: `postgres`,
        port: 5432,
        synchronize: true,
        logging: true,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        entities: ['src/entity/**/*.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber'
        }
      };

      try {
        connection = await createConnection(connectionOptions);
      } catch (error) {
        console.error('Error in establishing connection ', error);
      }
    }

    return connection;
  }
}
