import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { featuredDishes } from '@/data/sample-menu';

export async function GET() {
  try {
    // Try to get database items
    let dbItems: any[] = [];
    try {
      const { rows: menuItems } = await db.sql`SELECT * FROM menu_items ORDER BY category, name`;
      dbItems = menuItems;
    } catch (dbError) {
      console.error('Database error:', dbError);
    }

    // Get featured dishes
    const staticItems = featuredDishes;

    // Check for specific items
    const ofadaSauce = staticItems.find(item => item.id === 'ofada-sauce');
    const pepperedSoftChicken = staticItems.find(item => item.id === 'peppered-soft-chicken');
    const pepperedHakeFish = staticItems.find(item => item.id === 'peppered-hake-fish');

    return NextResponse.json({
      database: {
        itemCount: dbItems.length,
        sampleItems: dbItems.slice(0, 3).map(item => ({
          id: item.id,
          name: item.name,
          category: item.category
        }))
      },
      static: {
        itemCount: staticItems.length,
        sampleItems: staticItems.slice(0, 3).map(item => ({
          id: item.id,
          name: item.name,
          category: item.category
        })),
        specificItems: {
          ofadaSauce: ofadaSauce ? { id: ofadaSauce.id, name: ofadaSauce.name } : null,
          pepperedSoftChicken: pepperedSoftChicken ? { id: pepperedSoftChicken.id, name: pepperedSoftChicken.name } : null,
          pepperedHakeFish: pepperedHakeFish ? { id: pepperedHakeFish.id, name: pepperedHakeFish.name } : null
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}