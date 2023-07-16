import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log(req);
    const data = { message: "ok" };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
