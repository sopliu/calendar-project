import client from "@/lib/mongodb/config";
import { NextApiRequest, NextApiResponse } from "next";

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = client.db("calmeet_dev");

    const user = req.body;

    await db.collection("users").insertOne(user);
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
  }
}
