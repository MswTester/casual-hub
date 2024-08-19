'use client'
import { useEffect, useState } from "react"
import BackBtn from "../comp/back"
// import styles from '@/styles/your-style.css'

export default function Index(){
    const [once, setOnce] = useState(false)

    useEffect(() => setOnce(true), [])
    useEffect(() => {
        // script here
    }, [once])

    return once && <main>
        <BackBtn />
        {/* tags here */}
    </main>
}