"use client"
export default function DateTimeString({date, mode}){
    if(mode == 'time') 
        return date.toLocaleTimeString("en-US",{
            hour: "numeric",
            minute: "numeric",
            hour12: true
        })
    
    return date.toLocaleDateString("en-US",{
            year: "numeric",
            month: "long",
            day: "numeric"
        })
}