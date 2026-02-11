import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export async function GET(request: Request) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const result = await sql`
      SELECT 
        id,
        name,
        description,
        image_url as "imageUrl",
        category,
        price,
        created_at,
        updated_at
      FROM menu_items
      ORDER BY created_at DESC
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      description,
      imageUrl,
      category,
      price
    } = body;

    const result = await sql`
      INSERT INTO menu_items (
        name, 
        description, 
        image_url, 
        category, 
        price
      ) VALUES (
        ${name}, 
        ${description}, 
        ${imageUrl}, 
        ${category}, 
        ${price}
      ) RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
} 