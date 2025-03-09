import type { Metadata } from "next";
import { getCategoryReport } from "@/lib/data";
import CategoryReport from "@/components/category-report";

export const metadata: Metadata = {
  title: "Category Report",
  description: "View your transactions by category",
};

export default async function CategoryReportPage() {
  const report = await getCategoryReport();

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Category Report</h1>
      <CategoryReport data={report} />
    </main>
  );
}
