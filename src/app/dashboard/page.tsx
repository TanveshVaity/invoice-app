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

export default function Dashboard() {
    return (
        <main className="flex flex-col items-center justify-center text-center gap-6 max-w-5xl mx-auto my-12">
            <div className="flex justify-between  w-full">
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
                    <TableRow>
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
                    </TableRow>
                </TableBody>
            </Table>
        </main>
    );
}