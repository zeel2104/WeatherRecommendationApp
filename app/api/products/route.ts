import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tempParam = searchParams.get('temperature');

  if (!tempParam) {
    return NextResponse.json({ error: 'Temperature is required' }, { status: 400 });
  }

  const temperature = parseFloat(tempParam);
  if (isNaN(temperature)) {
    return NextResponse.json({ error: 'Invalid temperature' }, { status: 400 });
  }

  try {
    const products = await prisma.$queryRaw`
      SELECT * FROM "Product"
      WHERE 
        (temperature_range->>'min')::float <= ${temperature}
        AND
        (temperature_range->>'max')::float >= ${temperature};
    `;

    return NextResponse.json(products);
  } catch (err) {
    console.error('DB error:', err);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}
