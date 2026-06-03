const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DATABASE_URL });
const tableName = process.argv[2] || 'Order';

(async () => {
  try {
    await client.connect();
    const result = await client.query(
      'SELECT column_name FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position',
      [tableName]
    );
    console.log({ tableName, columns: result.rows.map(r => r.column_name) });
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
})();
