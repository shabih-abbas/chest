"use client"
import { logout } from "../actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
export default function MyChestLayout({children}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    return (
        <div>
            <button onClick={()=> startTransition(async ()=> {
                await logout();
                router.push('/')
                })} disabled={isPending} className="border-2 border-border lg:px-4 lg:py-2 px-2 py-1 rounded cursor-pointer font-bold text-xl fixed top-5 right-5 disabled:bg-muted text-foreground">Logout</button>
            {children}
        </div>
    )
}