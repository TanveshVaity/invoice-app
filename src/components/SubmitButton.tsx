"use client"

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from 'lucide-react';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    console.log("penging", pending);

    return (
        <Button className="w-full font-semibold relative" type="submit">
            <span className={pending ? "text-transparent" : ""}>Submit</span>
            {pending && 
                <span className="flex justify-center items-center w-full h-full absolute text-gray-400">
                    <LoaderCircle className="animate-spin" size={20} />
                </span>
            }
        </Button>
    )
}

export default SubmitButton;