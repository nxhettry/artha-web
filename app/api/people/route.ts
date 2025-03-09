import connectDb from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Person from "@/models/person.model";

export async function GET() {
  try {
    await connectDb();

    const people = await Person.find().select("name");

    if (!people) {
      return NextResponse.json(
        { message: "No people found in records", data: [] },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Peoples fetched succesfully",
        data: people,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error occured while fetching people", error);
    return NextResponse.json(
      { message: "Failed to fetch People", data: [] },
      { status: 500 }
    );
  }
}
