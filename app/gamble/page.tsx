'use client'
import { useEffect, useState } from "react"
import BackBtn from "../comp/back"
import '@/styles/scroll.css'
import '@/styles/os-sized.css'
// import styles from '@/styles/your-style.css'

export default function Index(){
    const [once, setOnce] = useState(false)
    const [state, setState] = useState('holjjak')
    const [cash, setCash] = useState(10000)

    useEffect(() => setOnce(true), [])
    useEffect(() => {
        // script here
        let _cash:number = parseInt(localStorage.getItem('cash') || "10000")
        setCash(_cash)
    }, [once])

    useEffect(() => {
        localStorage.setItem('cash', cash.toString())
    }, [cash])

    return once && <main className="flex w-full h-full">
        <BackBtn />
        <MoneyUI cash={cash} />
        <nav className="flex flex-col justify-start bg-neutral-200 p-2 gap-2 w-80">
            <button onClick={e => setState('holjjak')}>홀짝</button>
            <button onClick={e => setState('dice')}>주사위</button>
            <button onClick={e => setState('slot')}>슬롯</button>
            <button onClick={e => setState('coin')}>코인</button>
        </nav>
        <section className="flex flex-col justify-start bg-neutral-50 w-full">
            {state === 'holjjak' && <Holjjak cash={cash} setCash={setCash} />}
            {state === 'dice' && <Dice cash={cash} setCash={setCash} />}
            {state === 'slot' && <Slot cash={cash} setCash={setCash} />}
            {state === 'coin' && <Coin cash={cash} setCash={setCash} />}
        </section>
    </main>
}

function MoneyUI({cash}:{cash:number}){
    return <div className="absolute right-2 top-2 font-semibold text-xl">잔액: {cash}원</div>
}

function Holjjak(props:{
    cash:number
    setCash:React.Dispatch<React.SetStateAction<number>>
}){
    return <div>
        <h1>홀짝</h1>
    </div>
}

function Dice(props:{
    cash:number
    setCash:React.Dispatch<React.SetStateAction<number>>
}){
    return <div>
        <h1>주사위</h1>
    </div>
}

function Slot(props:{
    cash:number
    setCash:React.Dispatch<React.SetStateAction<number>>
}){
    return <div>
        <h1>슬롯</h1>
    </div>
}

function Coin(props:{
    cash:number
    setCash:React.Dispatch<React.SetStateAction<number>>
}){
    return <div>
        <h1>코인</h1>
    </div>
}