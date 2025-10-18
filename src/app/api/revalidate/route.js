import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const TOKEN = process.env.REVALIDATE_TOKEN;

// Optional: simple allowlist to avoid arbitrary tag flush
const ALLOWED_TAGS = new Set([
  "layout-header",
  "layout-footer",
  "home",
  "about",
  "doctor",
  "department",
  "blogs",
  "reviews",
]);

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!TOKEN || token !== TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { tag } = await req.json();
    if (!tag) {
      return NextResponse.json({ message: "Tag is required" }, { status: 400 });
    }
    if (!ALLOWED_TAGS.has(tag) && !/^((doctor|department|blog)-.+)$/.test(tag)) {
      return NextResponse.json({ message: "Tag not allowed" }, { status: 400 });
    }

    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag });
  } catch (err) {
    console.error("Revalidate error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
