import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function ensureBucketExists(bucketName: string) {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === bucketName);

    if (!bucketExists) {
      // Create bucket if it doesn't exist
      const { error } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
      });
      if (error) {
        console.error(`Failed to create bucket ${bucketName}:`, error);
        throw error;
      }
      console.log(`Bucket ${bucketName} created successfully`);
    }
  } catch (error) {
    console.error(`Error checking/creating bucket ${bucketName}:`, error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure bucket exists
    await ensureBucketExists(bucket);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filename);

    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}