import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";

export default async function InvoicePage({ params } : {params: {invoiceId : string}}) {
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
        <Invoice invoice={invoice} />
    );
}