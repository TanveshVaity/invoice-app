import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { sql } from "drizzle-orm"
import { db } from "@/db";

export default async function New() {
    const result  = await db.execute(sql`SELECT current_database()`);
    return (
        <main className="flex flex-col justify-center text-left gap-6 max-w-5xl mx-auto my-12">
            <div className="flex justify-between  w-full">
                <h1 className="text-3xl font-semibold">
                    Create Invoices
                </h1>
            </div>

            <p>{JSON.stringify(result)}</p>

            <form className="grid gap-6 max-w-xs">
                <div>
                    <Label htmlFor="name" className="block font-semibold text-small mb-2 ">Billing Name</Label>
                    <Input id="name" name="name" type="text" />
                </div>
                <div>
                    <Label htmlFor="email" className="block font-semibold text-small mb-2">Billing Email</Label>
                    <Input id="email" name="email" type="email" />
                </div>
                <div>
                    <Label htmlFor="value" className="block font-semibold text-small mb-2">Value</Label>
                    <Input id="value" name="value" type="text" />
                </div>
                <div>
                    <Label htmlFor="description" className="block font-semibold text-small mb-2">Description</Label>
                    <Textarea id="description" name="description"/>
                </div>
                <div>
                    <Button className="w-full font-semibold" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </main>
    );
}