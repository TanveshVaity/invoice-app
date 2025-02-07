"use server";

import { redirect } from "next/navigation";
import { db } from "@/db/index";
import { Invoices } from "@/db/schema";

export const createAction = async(formData: FormData) =>{
    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('description') as string ;

    const result = await db.insert(Invoices).values({
        value,
        description,
        status: "open",
    })
    .returning({
        id : Invoices.id,
    })

    redirect(`/invoices/${result[0].id}`);
}

