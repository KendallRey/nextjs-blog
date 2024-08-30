// pages/api/insert.ts
import clientPromise from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const client = await clientPromise
  try {
    const db = client.db("sample"); // Replace with your database name
    const collection = db.collection('test'); // Replace with your collection name

    const data = await request.json(); // Parse the request body
    const result = await collection.insertOne(data); // Insert data into MongoDB

    return NextResponse.json({ message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  } finally {
    await client.close();
  }
}