"use server"
import { cookies } from "next/headers"
import db from "@/src/index"
import {users} from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { verifyPassword, hashPassword } from "@/src/utils/hashing"
import { signToken } from "@/src/utils/token"
import { getUser, createThought, createEntry } from "@/src/utils/dal"

const tokenOptions = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
}

export const login = async (formData) => {
    const email = formData.get("email")
    const password = formData.get("password")
    try{
        const cookieStore = await cookies();
        const results = await db.select().from(users).where(eq(users.email, email))
        if (results.length == 0) return {
            isError: true,
            success: false,
            message: "User not found, Please register an account"
        }
        const user = results[0]
        const verified = await verifyPassword(password, user.passwordHash)
        if(verified){
            const token = await signToken({user: user.id})
            cookieStore.set("token", token, tokenOptions)
            return {
                isError: false,
                success: true,
                message: "Login Successful",
            }
        } 
            
        return {
            isError: true,
            success: false,
            message: "Invalid Credentials"
        }
    }catch(e){
        console.error(e)
        return {
            isError: true,
            success: false,
            message: "An internal Error Occured"
        }
    }
    
}

export const register = async (formData) => {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassowrd = formData.get("confirm-password")
    try{
        if (password !== confirmPassowrd) return {
            isError: true,
            success: false,
            message: "Passwords do not match"
        }
        const results = await db.select().from(users).where(eq(users.email, email))
        if (results.length > 0) return {
            isError: true,
            success: false,
            message: "You may already have an account, try logging in."
        }
        const hash = await hashPassword(password)
        await db.insert(users).values({
            name: name,
            email: email,
            passwordHash: hash
        })
        return {
            isError: false,
            success: true,
            message: "Registration Successful"
        }
    }catch(e){
        console.error(e)
        return {
            isError: true,
            success: false,
            message: "An internal Error occured"
        }
    }
}
export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("token", tokenOptions)
}
export const newThought = async (formData) =>{
    const user = await getUser()
    if(!user) return {
        isError: true,
        success: false,
        message: "Invalid or expired session, Please login."
    }
    const content = formData.get("content");
    const date = new Date(formData.get("date"));

    try{
        const entry = await createEntry(user, date)
        await createThought(entry.id, content, date)
        return {
            isError: false,
            success: true,
            message: "Thought Created"
        }
    }catch(e){
        console.error(e.message, e)
        return {
            isError: true,
            succes: false,
            message: "An internal error occured"
        }
    }

    
}
