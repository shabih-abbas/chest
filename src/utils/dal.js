import { cookies } from "next/headers";
import { verifyToken } from "./token";
import db from "../index";
import {users, entry, thoughts} from "../db/schema";
import { eq, and, gte, lt } from "drizzle-orm";
import { cache } from "react";

export const getUser = cache(async ()=> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    if(token){
        const verified = await verifyToken(token.value)
        if (verified){
            const results = await db.select().from(users).where(eq(users.id, verified.user))
            return results[0]
        } 
    }
    return null
})
export const getEntries = async (userId, month, year) =>{
    const from = new Date(year, month, 1)
    const to = new Date(from)
    to.setMonth(to.getMonth()+1)
    const results = await db.select().from(entry).where(
        and(
            eq(entry.userId, userId),
            gte(entry.date, from),
            lt(entry.date, to),
        )
    )
    return results;    
}

export const getThoughts = async (entryId) =>{
    const results = await db.select().from(thoughts).where(eq(thoughts.entryId, entryId))
    return results;
}
export const createEntry= async (user, date) =>{
    const entryDate = new Date(date);
    entryDate.setHours(0,0,0,0)
    const results = await db.select().from(entry).where(and(eq(entry.userId, user.id),eq(entry.date, entryDate)))
    
    if(results.length > 0) return results[0]
    const newEntry = await db.insert(entry).values({
        date: entryDate,
        userId: user.id,
    }).returning();
    return newEntry;
}
export const createThought= async (entryId, content, date) => {
    await db.insert(thoughts).values({
        content: content,
        entryId: entryId,
        time: date,
    })
}