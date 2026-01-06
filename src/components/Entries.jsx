import { getEntries } from "../utils/dal";
import DateTimeString from "./DateTimeString";
import Link from "next/link";
export default async function Entries({userId, month, year}){
    const entries = await getEntries(userId, month, year)
    return (
        <div className="flex flex-wrap gap-3 justify-center my-5">
            
            {entries.map(entry=>(
                <Link className="bg-primary text-foreground rounded text-lg font-semibold px-3 py-5 lg:p-5 focus-visible:border-2 border-border" href={`/my-chest/${entry.id}`} key={entry.id}>
                    <DateTimeString date={entry.date} mode="date" />
                </Link>
            ))}
        </div>
    )
}