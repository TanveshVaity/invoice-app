"use client";

import { Customers, Invoices } from "@/db/schema";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { AvailableStatus } from "@/data/status";
import { deleteInvoice, handleStatus } from "@/app/actions";
import { ChevronDown, Ellipsis, Trash2 } from 'lucide-react';
import { useOptimistic } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  

interface InvoiceProps {
    invoice: typeof Invoices.$inferSelect &{
        customer: typeof Customers.$inferSelect
    }
}

export default function Invoice({invoice} : InvoiceProps) {
    const [currentStatus, setCurrentStatus] = useOptimistic(
        invoice.status, (state, newStatus) => {
        return String(newStatus);
    });

    const handleUpdateStatus = async(formData: FormData) => {
        const originalCurrentStatus = currentStatus;
        setCurrentStatus(formData.get('status') as string);
        try {
            await handleStatus(formData);
        } catch (error) {
            setCurrentStatus(originalCurrentStatus);
        }
    }

    return (
        <main className="h-full w-full">
            <Container>
                <div className="flex justify-between  w-full mb-8">
                    <h1 className="flex items-center gap-4 text-3xl  font-semibold">
                        Invoices #{invoice.id}
                        <Badge className={cn(
                            "rounded-full capitalize",
                            currentStatus === "open" && "bg-blue-500 text-white",
                            currentStatus === "paid" && "bg-green-600 text-white",
                            currentStatus === "void" && "bg-zinc-700 text-white",
                            currentStatus === "uncollectible" && "bg-red-500 text-white",
                        )}>
                            {currentStatus}
                        </Badge>
                    </h1>
                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center" variant="outline">
                                    Change Status 
                                    <ChevronDown className="w-4 h-auto "/> 
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {AvailableStatus.map((status) => (
                                    <DropdownMenuItem key={status.id}>
                                        <form action={handleUpdateStatus}>
                                            <input type="hidden" name="id" value={invoice.id} />
                                            <input type="hidden" name="status" value={status.id} />
                                            <button>
                                                {status.label}
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center" variant="outline">
                                        <span className="sr-only">More Options</span>
                                        <Ellipsis className="w-4 h-auto "/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <DialogTrigger asChild>
                                            <button className="flex items-center gap-2">
                                                <Trash2 className="w-4 h-auto"/>
                                                Delete Invoice
                                            </button>
                                        </DialogTrigger>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                                <DialogHeader className="gap-4">
                                    <DialogTitle className="text-2xl">Delete Invoice?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your invoice
                                    </DialogDescription>
                                    <DialogFooter>
                                        <form className="flex justify-center w-full" action={deleteInvoice}>
                                            <input type="hidden" name="id" value={invoice.id} />
                                            <Button variant="destructive" className="flex items-center gap-2">
                                                <Trash2 className="w-4 h-auto"/>
                                                Delete Invoice
                                            </Button>
                                        </form>
                                    </DialogFooter>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                        <span>{invoice.id}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
                        <span> {new Date(invoice.createTs).toLocaleDateString()} </span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
                        <span>{invoice.customer.name}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Email</strong>
                        <span>{invoice.customer.email}</span>
                    </li>
                </ul>
            </Container>
        </main>
    );
}