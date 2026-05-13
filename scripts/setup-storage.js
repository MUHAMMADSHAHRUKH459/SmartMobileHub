const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Loading credentials...');
console.log('URL:', supabaseUrl ? 'loaded' : 'missing');
console.log('Key:', supabaseKey ? 'loaded' : 'missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    console.log('Setting up Supabase storage buckets...\n');

    // Create products bucket
    console.log('Creating "products" bucket...');
    const { data: productsBucket, error: productsError } = await supabase.storage.createBucket('products', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    });

    if (productsError) {
      if (productsError.message.includes('already exists')) {
        console.log('✓ "products" bucket already exists\n');
      } else {
        console.error('✗ Error creating "products" bucket:', productsError.message, '\n');
      }
    } else {
      console.log('✓ "products" bucket created successfully\n');
    }

    // Create accessories bucket
    console.log('Creating "accessories" bucket...');
    const { data: accessoriesBucket, error: accessoriesError } = await supabase.storage.createBucket('accessories', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    });

    if (accessoriesError) {
      if (accessoriesError.message.includes('already exists')) {
        console.log('✓ "accessories" bucket already exists\n');
      } else {
        console.error('✗ Error creating "accessories" bucket:', accessoriesError.message, '\n');
      }
    } else {
      console.log('✓ "accessories" bucket created successfully\n');
    }

    console.log('✓ Storage setup complete!');
  } catch (error) {
    console.error('Setup error:', error.message);
    process.exit(1);
  }
}

setupStorage();
