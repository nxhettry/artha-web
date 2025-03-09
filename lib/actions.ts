"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Transaction, Person } from "@/lib/models";

export async function createTransaction(data) {
  await connectToDatabase();

  // If person is provided and doesn't exist, create it
  if (data.person) {
    const existingPerson = await Person.findOne({ name: data.person });
    if (!existingPerson) {
      await Person.create({ name: data.person });
    }
  }

  // Create the transaction
  const transaction = await Transaction.create(data);

  // Revalidate relevant paths
  revalidatePath("/");
  revalidatePath("/transactions");
  revalidatePath("/reports/categories");

  return transaction;
}
