import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Invoice({ params } : {params: {invoiceId : string}}) {
    const { userId } = await auth();
    const { invoiceId } = await params;

    if(!userId){
        return new Error("Unauthorized");
    }

    const [ invoice ]= await db.select()
    .from(Invoices)
    .where(
        and(eq(Invoices.id, Number(invoiceId)), eq(Invoices.userId, userId))
    )
    .limit(1);

    if(isNaN(Number(invoiceId))){
        return new Error("Invalid Invoice ID");
    }

    if (!invoice) {
        return notFound();
    }
    return (
        <main className=" max-w-5xl mx-auto my-12">
            <div className="flex justify-between  w-full mb-8">
                <h1 className="flex items-center gap-4 text-3xl  font-semibold">
                    Invoices #{invoiceId}
                    <Badge className={cn(
                        "rounded-full capitalize",
                        invoice.status === "open" && "bg-blue-500 text-white",
                        invoice.status === "paid" && "bg-green-600 text-white",
                        invoice.status === "void" && "bg-zinc-700 text-white",
                        invoice.status === "uncollectible" && "bg-red-500 text-white",
                    )}>
                        {invoice.status}
                    </Badge>
                </h1>
            </div>

            <p className="text-3xl mb-3">
                Rs.{invoice.value / 100}
            </p>

            <p className="text-lg mb-8">
                {invoice.description}
            </p>

            <h2 className="fonnt-bold text-lg mb-4">
                Billing Details
            </h2>

            <ul className="grid gap-2">
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
                    <span>{invoiceId    }</span>
                </li>
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
                    <span> {new Date(invoice.createTs).toLocaleDateString()} </span>
                </li>
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
                    <span></span>
                </li>
                <li className="flex gap-4">
                    <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Email</strong>
                    <span></span>
                </li>
            </ul>
        </main>
    );
}