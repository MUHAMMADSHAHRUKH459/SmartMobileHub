import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    console.log("Setting up Supabase storage buckets...");

    // Create products bucket
    console.log("Creating 'products' bucket...");
    const { data: productsBucket, error: productsError } =
      await supabase.storage.createBucket("products", {
        public: true,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      });

    if (productsError && productsError.message.includes("already exists")) {
      console.log("✓ 'products' bucket already exists");
    } else if (productsError) {
      console.error("✗ Error creating 'products' bucket:", productsError);
    } else {
      console.log("✓ 'products' bucket created successfully");
    }

    // Create accessories bucket
    console.log("Creating 'accessories' bucket...");
    const { data: accessoriesBucket, error: accessoriesError } =
      await supabase.storage.createBucket("accessories", {
        public: true,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      });

    if (
      accessoriesError &&
      accessoriesError.message.includes("already exists")
    ) {
      console.log("✓ 'accessories' bucket already exists");
    } else if (accessoriesError) {
      console.error("✗ Error creating 'accessories' bucket:", accessoriesError);
    } else {
      console.log("✓ 'accessories' bucket created successfully");
    }

    console.log("\n✓ Storage setup complete!");
  } catch (error) {
    console.error("Setup error:", error);
    process.exit(1);
  }
}

setupStorage();
