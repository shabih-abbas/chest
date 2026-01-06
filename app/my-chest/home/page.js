import Link from "next/link"
import { getUser } from "@/src/utils/dal";
import Entries from "@/src/components/Entries";
import EntryFilters from "@/src/components/EntryFilters";
import { Suspense } from "react";
import Loader from "@/src/components/Loader";

export default async function HomePage({searchParams}){
    const user = await getUser();
    const params = await searchParams;
    const defaultMonth = params.month || new Date().getMonth();
    const defaultYear = params.year || new Date().getFullYear();
    
    const userJoined = new Date(user.joined);
    const startYear = userJoined.getFullYear();
    return (
        <div className="">
            <Link href="/my-chest/new" className="bg-primary py-2 px-4 text-2xl font-bold rounded mx-auto w-fit block my-10 ">Have a new Thought</Link>            
            <h2 className="my-5 text-center text-primary text-2xl font-bold">Your Thoughts</h2>
            <div className="flex justify-center">
                <EntryFilters startYear={startYear} defaultYear={defaultYear} defaultMonth={defaultMonth} />
            </div>
            <div className="mt-8">
                <Suspense fallback={
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                }>
                    <Entries userId={user.id} month={defaultMonth} year={defaultYear} />
                </Suspense>
            </div>
            
        </div>
    )
}