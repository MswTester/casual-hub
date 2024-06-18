'use client'
import { useEffect, useState } from "react"
import '@/styles/os-sized.css'
import BackBtn from "../comp/back"

type Point = [number, number]

export default function Index(){
    const [once, setOnce] = useState(false)
    const [mode, setMode] = useState("remove")
    const [selected, setSelected] = useState<Point|null>(null)
    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(20)
    const [except, setExcept] = useState<number[]>([])
    const [row, setRow] = useState(5)
    const [col, setCol] = useState(5)
    const [table, setTable] = useState<number[][]>([])
    const [removes, setRemoves] = useState<Point[]>([])

    useEffect(() => setOnce(true), [])
    useEffect(() => {
    }, [once])

    useEffect(() => {
        setTable(Array.from({length: row}).map((_, i) => Array.from({length: col}).map((_, j) => 0)))
        setRemoves([])
        setSelected(null)
    }, [row, col])

    function gen(){
        let tb = Array.from({length: row}).map((_, i) => Array.from({length: col}).map((_, j) => 0))
        const nums = shuffle(Array.from({length: row * col}).map((_, i) => i + 1).filter(v => v >= from && v <= to && !except.includes(v)))
        let idx = 0
        for(let i = 0; i < Math.min(nums.length + removes.length, row*col); i++){
            if(removes.find(v => v[0] == Math.floor(i / col) && v[1] == i % col)) {
                if(idx != 0) idx--
                continue
            }
            tb[Math.floor(i / col)][i % col] = nums[idx]
            idx++
        }
        setTable([...tb])
    }

    function shuffle(arr:any[]){
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            const tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
        return arr
    }

    return once && <main className="w-full h-full flex flex-col justify-start p-3 items-center overflow-y-auto">
        <BackBtn />
        <table>
            {Array.from({length: row}).map((_, i) => <tr key={i}>
                {Array.from({length: col}).map((_, j) => {
                    return <td key={j} className={`border border-neutral-300 text-center select-none w-12 h-12
                        ${selected && (selected as Point)[0] == i && (selected as Point)[1] == j ? 'bg-sky-400' : ''}`}
                    onClick={e => {
                        if(mode == 'remove'){
                            if (removes.find(v => v[0] == i && v[1] == j)) {
                                setRemoves(removes.filter(v => v[0] != i || v[1] != j))
                            } else {
                                setRemoves([...removes, [i, j]])
                            }
                        } else {
                            if(selected){
                                const [si, sj] = selected
                                const tmp = table[si][sj]
                                table[si][sj] = table[i][j]
                                table[i][j] = tmp
                                setTable([...table])
                                setSelected(null)
                            } else {
                                setSelected([i, j])
                            }
                        }
                    }}>{removes.find(v => v[0] == i && v[1] == j) ? "X" : ((table[i] || [])[j] || '') || ""}</td>
                })}
            </tr>)}
        </table>
        <br />
        <input type="number" name="" id="rowcount" placeholder="가로" value={row} onChange={e => setRow(+e.target.value)} />
        <input type="number" name="" id="colcount" placeholder="세로" value={col} onChange={e => setCol(+e.target.value)} />
        <br />
        <input type="text" name="" id="from" placeholder="번부터" value={from} onChange={e => setFrom(+e.target.value)}/>
        <input type="text" name="" id="to" placeholder="번까지" value={to} onChange={e => setTo(+e.target.value)}/><br />
        <input type="text" name="" id="except" placeholder="번 제외 (,로 구분)" value={except.join(',')} onChange={e => setExcept(e.target.value.split(',').map(v => +v))} />
        <br />
        <button id="btn" onClick={e => gen()}>Generate</button>
        <br />
        <div id="displayMode">Mode : {mode}</div>
        <div id="selected">Selected : {selected ? selected.map(v => v+1).join(', ') : "None"}</div>
        <button onClick={e => setMode(mode == 'remove' ? 'move' : 'remove')}>Change Mode</button>
    </main>
}