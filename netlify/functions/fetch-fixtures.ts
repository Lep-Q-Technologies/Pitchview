import { Handler } from '@netlify/functions';

import { Database } from '../../src/typeorm/connection';

export const handler: Handler = async () => {
  const database = new Database();

  try {
    console.log('Connecting to database...');
    const connection = await database.connect();
    const fixtures = await connection.query('SELECT * FROM fixture');
    console.log('Connection Established - Fixtures here:', fixtures);
  } catch (error) {
    console.error('Error in connection:', error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello Fixtures!'
    })
  };
};
