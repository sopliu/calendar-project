import client from "@/lib/mongodb/config";

export async function POST(req: Request) {
  try {
    const db = client.db("calmeet_dev");

    const user = await req.json();
    console.log(user);

    const res = await db.collection("users").insertOne(user);
    return Response.json(res);
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}
