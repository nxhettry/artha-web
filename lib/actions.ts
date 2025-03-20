"use server";

import { revalidatePath } from "next/cache";
import connectDb from "@/lib/mongodb";
import Transaction from "@/models/transaction.model";
import Person from "@/models/person.model";

export interface TransactionData {
  title: string;
  amount: number;
  category: string;
  description: string;
  person?: string;
  createdAt?: Date;
  _id?: string;
}

export interface PersonData {
  name: string;
  _id?: string;
}

export async function createTransaction(
  data: TransactionData
): Promise<boolean> {
  console.log(data);

  try {
    await connectDb();

    // If person is provided and doesn't exist, create it
    if (data.person) {
      const existingPerson = await Person.findOne({ name: data.person });
      if (!existingPerson) {
        console.log("Person not found, creating new person:", data.person);
        await Person.create({ name: data.person });
      }
    }

    // Create the transaction
    await Transaction.create(data);

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/transactions");
    revalidatePath("/reports/categories");

    return true;
  } catch (error) {
    console.error("Error creating transaction:", error);
    return false;
  }
}

export async function deleteTransaction(id: string) {
  try {
    const response = await fetch(`/api/transactions`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.log('Failed to delete transaction')
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return false;
  }
}
