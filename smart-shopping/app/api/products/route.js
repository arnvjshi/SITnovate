import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inventory"); // Make sure this matches your database name
    
    // Fetch products from your collection
    const products = await db.collection("items").find({}).toArray();
    
    // Transform MongoDB documents to match frontend expected structure
    const transformedProducts = products.map(product => ({
      id: product._id.toString(),
      item_name: product.name || product.item_name,
      manufacture_date: product.manufacture_date,
      expiry_date: product.expiry_date,
      quantity: product.quantity,
      price: product.price,
      category: product.category || "Uncategorized",
      rating: product.rating || 0,
      image: product.image || "/placeholder.svg",
      description: product.description || "No description available",
    }));
    
    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}