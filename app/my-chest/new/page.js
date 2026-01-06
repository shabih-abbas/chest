"use client"
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { newThought } from "@/app/actions";
export default function New(){
    const router = useRouter();
    const [formState, formAction, isPending] = useActionState(async (currentState, formData) => {
        const result = await newThought(formData)
        if(result.success) router.push('/my-chest/home');
        return result
    }, {
        isError: false,
        success: false,
        message: ""
    });
    const currentDate = new Date()
    return (
        <div>
            <h3 className="text-center text-primary text-xl font-bold my-5">{currentDate.toLocaleDateString("en-US",{
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })}</h3>
            <form action={formAction} className="w-1/2 h-2/3 min-w-75 bg-card p-5 mx-auto">
                <input name="date" readOnly type="text" value={currentDate.toJSON()} hidden/>
                <textarea resize="none" className="resize-none w-full h-[60vh] min-h-80 outline-none p-4" name="content" id="content" required placeholder="What do you have in mind?"></textarea>
                <button disabled={isPending} className="w-full px-4 py-2 my-4 bg-primary text-xl font-bold rounded cursor-pointer disabled:bg-muted" type="submit">Store in My Chest</button>
                {formState.isError && <p className="text-red-500">{formState.message}</p>}
            </form>
        </div>
    )
}