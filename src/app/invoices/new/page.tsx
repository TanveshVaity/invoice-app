"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";
import Form from "next/form";

import { createAction } from "@/app/actions";
import { SyntheticEvent, useState } from "react";
import Container from "@/components/Container";


export default function New() {
    const [state, setState] = useState("ready");
    const handleSubmit = async (event : SyntheticEvent) => {
        if(state === "pending"){
            event.preventDefault();
            return;
        } 
        setState("pending");
    }

    return (
        <main className="h-full">
            <Container>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl font-semibold">
                        Create Invoice
                    </h1>
                </div>

                <Form action={createAction} onSubmit={handleSubmit} className="grid gap-6 max-w-xs">
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
                        <SubmitButton />
                    </div>
                </Form>
            </Container>
        </main>
    );
}