import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
   return (
     <div className="flex flex-col items-center justify-center text-center ">
       <main className="flex flex-col gap-6 max-w-5xl mx-auto">
         <h1 className="text-5xl font-bold">Invoice App</h1>
         <p className="mt-4">
           <Button asChild>
             <Link href="/dashboard">Sign In</Link>
           </Button>
         </p>
       </main>
     </div>
   );
 }
