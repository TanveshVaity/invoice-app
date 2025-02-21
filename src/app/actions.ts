"use server";

import { redirect } from "next/navigation";
import { db } from "@/db/index";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq , and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createAction = async(formData: FormData) =>{
    const { userId, redirectToSignIn } = await auth()
    if (!userId) return redirectToSignIn();

    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('description') as string ;

    const result = await db.insert(Invoices).values({
        value,
        description,
        userId,
        status: "open",
    })
    .returning({
        id : Invoices.id,
    })

    redirect(`/invoices/${result[0].id}`);
}

export const handleStatus = async (formData : FormData) => {
    const { userId, redirectToSignIn } = await auth()
    if (!userId) return redirectToSignIn();

    const id  = formData.get('id') as string;
    const status = formData.get('status') as string;

    const result = await db.update(Invoices)
    .set({
        status
    })
    .where(
        and(
            eq(Invoices.id, Number(id)),
            eq(Invoices.userId, userId),
        )
    )

    revalidatePath(`/invoices/${id}`, "page");
    // redirect(`/invoices/${id}`);
}
