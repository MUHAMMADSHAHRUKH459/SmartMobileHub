const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config({ path: '.env.local' });

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    await client.query(`ALTER TABLE "OrderItem" ADD COLUMN IF NOT EXISTS "name" text NOT NULL DEFAULT 'Unnamed';`);
    console.log('Added OrderItem.name column successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
