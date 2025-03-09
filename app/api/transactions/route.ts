import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Transaction from "@/models/transaction.model";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { id } = await request.json();
  
  try {
    await connectDb();

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { message: "Error deleting transaction" },
      { status: 500 }
    );
  }
}
