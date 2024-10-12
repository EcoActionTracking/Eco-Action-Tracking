import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Contact from "../../../models/Contact";

export async function POST(request) {
  await dbConnect();
  const body = await request.json();

  try {
    const newContact = new Contact(body);
    await newContact.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save contact." },
      { status: 500 }
    );
  }
}
