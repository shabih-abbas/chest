import { getEntries } from "../utils/dal";
import Link from "next/link";
export default async function Entries({userId, month, year}){
    const entries = await getEntries(userId, month, year)
    return (
        <div className="flex gap-3 justify-center my-5">
            
            {entries.map(entry=>(
                <Link className="bg-primary text-foreground rounded text-lg font-semibold p-5 focus-visible:border-2 border-border" href={`/my-chest/${entry.id}`} key={entry.id}>{entry.date.toLocaleDateString("en-US",{
                year: "numeric",
                month: "long",
                day: "numeric"
            })}</Link>
            ))}
        </div>
    )
}