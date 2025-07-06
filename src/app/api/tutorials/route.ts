import { NextRequest, NextResponse } from 'next/server';
import { getTutorials } from '@/lib/tutorials/data';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  try {
    const tutorials = await getTutorials({
      search: q,
      category,
    });

    return NextResponse.json({ data: tutorials });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch tutorials' },
      { status: 500 }
    );
  }
}
