"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useActionState } from "react"
import { login } from "../actions"
export default function LoginPage(){
    const router = useRouter();
    
    const [formState, formAction, isPending] = useActionState(async (currentState, formData) => {
        const result = await login(formData)
        if (result.success) router.push('/my-chest/home')
        return result
    }, {
        isError: false,
        success: false,
        message: ""
    })
    return (
        <div className="w-1/2 min-w-75 mx-auto mt-15">
            <form action={formAction} className="bg-card w-full space-y-8 p-5">
                <div className="flex gap-2 items-center">
                    <label className="w-20 font-semibold font-mono text-foreground" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className="rounded p-1 flex-1 border border-border user-invalid:border-red-500 text-foreground outline-none" />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="w-20 font-semibold font-mono text-foreground" htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" minLength={5} required className="rounded p-1 flex-1 border border-border user-invalid:border-red-500 text-foreground outline-none" />
                </div>
                <button disabled={isPending} type="submit" className="cursor-pointer focus-visible:outline-2 outline-foreground bg-primary font-bold text-lg py-2 px-4 disabled:bg-muted w-full rounded">Login</button>
            </form>
            {formState.isError && <p className="text-red-500">{formState.message}</p>}
            <Link href="/register" className="text-foreground hover:underline italic">Don't have an account, Create one here</Link>
            
        </div>
        
    )
}