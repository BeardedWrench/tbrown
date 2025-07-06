import { handleCategoryApi } from '@/lib/api/categoryHandler';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  return handleCategoryApi('tutorial', req);
}
export function POST(req: NextRequest) {
  return handleCategoryApi('tutorial', req);
}
export function PUT(req: NextRequest) {
  return handleCategoryApi('tutorial', req);
}
export function DELETE(req: NextRequest) {
  return handleCategoryApi('tutorial', req);
}
