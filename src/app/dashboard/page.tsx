import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import Link from "next/link";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
    const {userId, redirectToSignIn} = await auth();
    if (!userId) return redirectToSignIn();

    const invoices = await db.select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.userId, userId));

    const invoice = invoices?.map(({invoices, customers}) => {
        return {
            ...invoices,
            customer: customers
        }
    });

    return (
        <main className="h-full">
            <Container>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl font-semibold">
                        Invoices
                    </h1>
                    <p>
                        <Button className="inline-flex gap-2" variant="ghost" asChild>
                            <Link href="/invoices/new">
                                <CirclePlus className="h-4 w-4"/>Create Invoice
                            </Link>
                        </Button>
                    </p>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] p-4">
                                Date
                            </TableHead>
                            <TableHead className="p-4">
                                Customer
                            </TableHead>
                            <TableHead className="p-4">
                                Email
                            </TableHead>
                            <TableHead className="text-center p-4">
                                Status
                            </TableHead>
                            <TableHead className="text-right p-4">
                                Value
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoice.map(invoice =>{
                            return (
                                <TableRow key={invoice.id}>
                                    <TableCell className="text-left p-0">
                                        <Link href={`invoices/${invoice.id}`} className="p-4 block font-semibold">
                                            {new Date(invoice.createTs).toLocaleDateString()}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left p-0">
                                        <Link href={`invoices/${invoice.id}`} className="p-4 block font-semibold">
                                            {invoice.customer.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left p-0">
                                        <Link href={`invoices/${invoice.id}`} className="p-4 block">
                                            {invoice.customer.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center p-0">
                                        <Link href={`invoices/${invoice.id}`} className="p-4 block">
                                            <Badge className={cn(
                                                "rounded-full capitalize",
                                                invoice.status === "open" && "bg-blue-500 text-white",
                                                invoice.status === "paid" && "bg-green-600 text-white",
                                                invoice.status === "void" && "bg-zinc-700 text-white",
                                                invoice.status === "uncollectible" && "bg-red-500 text-white",
                                            )}>
                                                {invoice.status}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right p-0">
                                        <Link href={`invoices/${invoice.id}`} className="p-4 block">
                                            Rs.{invoice.value / 100}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {/*  <TableRow>
                            <TableCell className="text-left p-4">
                                <span className="font-semibold">10/31/2024</span>
                            </TableCell>
                            <TableCell className="text-left p-4">
                                <span className="font-semibold">tan</span>
                            </TableCell>
                            <TableCell className="text-left p-4">
                                <span>tan@planetexpress.com</span>
                            </TableCell>
                            <TableCell className="text-center p-4">
                                <Badge className="rounded-full bg-slate-600">Open</Badge>
                            </TableCell>
                            <TableCell className="text-right p-4">
                                <span>$250.00</span>
                            </TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </Container>
        </main>
    );
}