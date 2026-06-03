const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config({ path: '.env.local' });
const sql = process.argv.slice(2).join(' ');
if (!sql) {
  console.error('Please pass a SQL statement as command line arguments.');
  process.exit(1);
}

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    const result = await client.query(sql);
    console.log('SQL executed successfully');
    if (result.rows) console.log(result.rows);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
