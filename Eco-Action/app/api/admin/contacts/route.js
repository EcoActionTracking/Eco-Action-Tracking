// pages/api/contacts.js
import dbConnect from "@/lib/mongodb"; // Import your db connection utility
import Contact from "@/models/Contact"; // Adjust the import path according to your project structure

// API route to get all contacts
export async function GET(req) {
  await dbConnect(); // Connect to the database

  try {
    const contacts = await Contact.find(); // Fetch all contacts
    return new Response(JSON.stringify({ success: true, data: contacts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
