import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from 'next/server'


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("mydatabase");
        const collection = db.collection("all-tasks");

        const items = await collection.find({}).toArray();

        return new Response(JSON.stringify({
            message: "Items Found and fetched successfully",
            tasks: items,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return new Response(JSON.stringify({ error: "Error fetching items" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("mydatabase");
        const collection = db.collection("all-tasks");
      

        const { task } = await req.json();
        if (!task) {
            
            return NextResponse.json({ error: 'Task is required' }, { status: 500 })
        }

        const newItem = await collection.insertOne({ task });

        return NextResponse.json({  message: "Item added successfully" }, { status: 201 })
    } catch (error) {
        console.error("Error adding task:", error);

        return NextResponse.json({ error: 'Error adding item' }, { status: 500 })
    }
}
