import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// ⚠️ எச்சரிக்கை: এই কোডে কোনো নিরাপত্তা নেই
export async function POST(request) {
  // ❌ টোকেন ভেরিফিকেশন অংশটি মুছে ফেলা হয়েছে

  const body = await request.json();
  const tag = body.tag;

  if (!tag) {
    return NextResponse.json({ message: 'Tag is required' }, { status: 400 });
  }

  try {
    revalidateTag(tag);
    console.log(`✅ Revalidated tag (unsecured): ${tag}`);
    return NextResponse.json({ revalidated: true, tag: tag });
  } catch (error) {
    console.error('Error revalidating tag:', error);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}