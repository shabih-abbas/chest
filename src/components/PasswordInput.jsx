"use client"
import {useState} from "react";
export default function PasswordInput(){
    const [show, setShow] = useState(false);
    return(
        <div className="min-w-10 flex rounded flex-1 border border-border has-user-invalid:border-red-500 text-foreground">
            <input className="min-w-7 p-1 flex-1 outline-none" type={show ? "text" : "password"} minLength={5} name="password" id="password" required />
            <span role="button" className="min-w-12 text-center cursor-pointer hover:bg-primary text-foreground p-1 rounded-br rounded-tr" onClick={()=>setShow(prev => !prev)}>{show ? "Hide": "Show"}</span>
        </div>
    )
}