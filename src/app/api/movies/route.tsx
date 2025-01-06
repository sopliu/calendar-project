import client from "@/lib/mongodb/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json(movies);
  } catch (e) {
    console.error("Error fetching documents:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
