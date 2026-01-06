"use client"
import {useRouter, usePathname, useSearchParams} from "next/navigation";

export default function EntryFilters({startYear, defaultYear, defaultMonth}){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const selectedMonth = searchParams.get("month") || defaultMonth;
    const selectedYear = searchParams.get("year") || defaultYear;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const months = [
        {
            name: "Jan",
            value: 0
        },
        {
            name: "Feb",
            value: 1
        },
        {
            name: "Mar",
            value: 2
        },
        {
            name: "Apr",
            value: 3
        },
        {
            name: "May",
            value: 4
        },
        {
            name: "Jun",
            value: 5
        },
        {
            name: "Jul",
            value: 6
        },
        {
            name: "Aug",
            value: 7
        },
        {
            name: "Sep",
            value: 8
        },
        {
            name: "Oct",
            value: 9
        },
        {
            name: "Nov",
            value: 10
        },
        {
            name: "Dec",
            value: 11
        }

    ]
    const handleFilters = (e) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(e.target.name, e.target.value)
        if(params.get("year")==currentYear && params.get("month") > currentMonth) params.set("month", currentMonth);
        router.push(`${pathname}?${params.toString()}`)
    }
    return (
        <div className="flex gap-5">
            <div className="space-x-3">
                <label className="font-semibold font-mono text-foreground" htmlFor="month">Month</label>
                <select className="bg-card p-1 rounded border-none focus-visible:outline-2 outline-border" name="month" id="month" onChange={handleFilters} value={selectedMonth}>
                    {months.map(month=>(
                        <option disabled={!(selectedYear < currentYear) && month.value > currentMonth} key={month.name} value={month.value}>{month.name}</option>
                    ))}
                </select>    
            </div>
            <div className="space-x-3">   
                <label className="font-semibold font-mono text-foreground" htmlFor="year">Year</label>
                <select className="bg-card p-1 rounded border-none focus-visible:outline-2 outline-border" name="year" id="year" onChange={handleFilters} value={selectedYear}>
                    {Array.from({length: currentYear - startYear + 1}, (_, i) => startYear + i)
                    .map(year=>(
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            
        </div>
    )
} 
