import { Handler } from '@netlify/functions';

import { Database } from '../../src/database/typeorm';

export const handler: Handler = async (event, context) => {
  const database = new Database();

  const dbConn = await database.getConnection();

  console.log('DB CONN -> ', dbConn);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello Fixtures!'
    })
  };
};
