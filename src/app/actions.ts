"use server";

import { redirect } from "next/navigation";
import { db } from "@/db/index";
import { Customers, Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq , and, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createAction = async(formData: FormData) =>{
    const { userId, redirectToSignIn, orgId } = await auth();
    if (!userId) return redirectToSignIn();

    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('description') as string ;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string; 

    const [ customer ] = await db.insert(Customers).values({
        name,
        email,
        userId,
        organizationID: orgId || null,
    }).returning({
        id : Customers.id,
    })

    const result = await db.insert(Invoices).values({
        value,
        description,
        userId,
        customerId: customer.id,
        status: "open",
        organizationID: orgId || null,
    })
    .returning({
        id : Invoices.id,
    })

    redirect(`/invoices/${result[0].id}`);
}

export const handleStatus = async (formData : FormData) => {
    const { userId, redirectToSignIn, orgId} = await auth()
    if (!userId) return redirectToSignIn();

    const id  = formData.get('id') as string;
    const status = formData.get('status') as string;

    let result;
    if(orgId){
        result = await db.update(Invoices)
        .set({
            status
        })
        .where(
            and(
                eq(Invoices.id, Number(id)),
                eq(Invoices.organizationID, orgId),
            )
        )
    }
    else{
        result = await db.update(Invoices)
        .set({
            status
        })
        .where(
            and(
                eq(Invoices.id, Number(id)),
                eq(Invoices.userId, userId),
                isNull(Invoices.organizationID)
            )
        )
    }

    revalidatePath(`/invoices/${id}`, "page");
    // redirect(`/invoices/${id}`);
}

export const deleteInvoice = async (formData : FormData) => {
    const id = formData.get('id') as string;
    const { userId, redirectToSignIn, orgId } = await auth(); 
    if (!userId) return redirectToSignIn();

    let result;
    if(orgId){
        result = await db.delete(Invoices)
        .where(
            and(
                eq(Invoices.id, Number(id)),
                eq(Invoices.organizationID, orgId),
            )
        )
    }
    else{
        result = await db.delete(Invoices)
        .where(
            and(
                eq(Invoices.id, Number(id)),
                eq(Invoices.userId, userId),
                isNull(Invoices.organizationID)
            )
        )
    }

    redirect(`/dashboard`);

}
