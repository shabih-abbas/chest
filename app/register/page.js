"use client"
import { useActionState } from "react"
import { register } from "../actions"
import Link from "next/link"
export default function RegisterPage(){
    const [formState, formAction, isPending] = useActionState(async (currentState, formData) => await register(formData), {
        isError: false,
        success: false,
        message: ""
    })
    return (
        <div className="w-1/2 min-w-75 mx-auto mt-15">
            <form action={formAction} className="bg-card w-full space-y-8 p-5">
                <div className="flex gap-2 items-center">
                    <label className="w-20 font-semibold font-mono text-foreground" htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required className="p-1 rounded flex-1 border border-border user-invalid:border-red-500 text-foreground outline-none" />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="w-20 font-semibold font-mono text-foreground" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className="p-1 rounded flex-1 border border-border user-invalid:border-red-500 text-foreground outline-none" />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="w-20 font-semibold font-mono text-foreground" htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" minLength={5} required className="rounded p-1 flex-1 border border-border user-invalid:border-red-500 text-foreground outline-none" />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="w-20 font-semibold font-mono text-foreground" htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password" name="confirm-password" type="password" minLength={5} required className="rounded p-1 flex-1 border border-border user-invalid:border-red-500 text-foreground outline-none" />
                </div>
                <button disabled={isPending} type="submit" className="cursor-pointer focus-visible:outline-2 outline-foreground bg-primary py-2 px-4 font-bold text-lg rounded w-full disabled:bg-muted ">Register</button>
            </form>
            {formState.isError && <p className="text-red-500">{formState.message}</p>}
            {formState.success && <p className="text-primary dark:text-dark-primary">{formState.message} <Link className="bg-primary px-2 py-1 rounded text-foreground" href='/login'>Please Login</Link> </p>}
        </div>
        
    )
}