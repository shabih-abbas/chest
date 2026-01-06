"use client"
import { useTheme } from "next-themes";
import {useState, useEffect} from "react";
export default function ThemeBtn(){
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme, resolvedTheme} = useTheme();
    useEffect(() => setMounted(true), [])
    if(!mounted) return null
    const isDark = resolvedTheme === 'dark'
    return (
        <button className="cursor-pointer font-bold text-lg text-foreground dark:text-dark-foreground px-4 py-2 border-2 rounded border-border dark:border-dark-border" onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? "Light": "Dark"}</button>
    )
}