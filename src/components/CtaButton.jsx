import Link from "next/link"
import { verifyToken } from "../utils/token";
import { cookies } from "next/headers"
export default async function CtaButton(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    if(token){
        const verified = await verifyToken(token.value)
    
        if (verified) return (
            <Link href="/my-chest/home" className="bg-primary dark:bg-dark-primary py-2 px-4 text-xl font-bold rounded">Your Chest</Link>
        )
    }
    
    return (
        <Link href="/login" className="bg-primary dark:bg-dark-primary py-2 px-4 text-xl font-bold rounded">Login</Link>
    )
}