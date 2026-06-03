const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config({ path: '.env.local' });
const client = new Client({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    await client.connect();
    const result = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'Order' ORDER BY ordinal_position"
    );
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
})();
