'use client'
import { useEffect, useState } from "react"
import BackBtn from "../comp/back"
import '@/styles/scroll.css'

export default function Index(){
    const [once, setOnce] = useState(false)
    const [keys, setKeys] = useState<{[key:string]:string}[]>([{"KeyQ":"Q","KeyW":"W","KeyE":"E","KeyR":"R","KeyT":"T","KeyY":"Y","KeyU":"U","KeyI":"I","KeyO":"O","KeyP":"P","BracketLeft":"[","BracketRight":"]"},{"KeyA":"A","KeyS":"S","KeyD":"D","KeyF":"F","KeyG":"G","KeyH":"H","KeyJ":"J","KeyK":"K","KeyL":"L","Semicolon":";","Quote":"'"},{"KeyZ":"Z","KeyX":"X","KeyC":"C","KeyV":"V","KeyB":"B","KeyN":"N","KeyM":"M","Comma":",","Period":".","Slash":"/"}])
    const [dbgMode, setDbgMode] = useState(false)
    const [idx, setIdx] = useState(0)
    const [pressed, setPressed] = useState<string[]>([])
    const [onStyle, setOnStyle] = useState(false)

    const [gap, setGap] = useState(10)
    const [transition, setTransition] = useState(0.2)

    const [width, setWidth] = useState(60)
    const [height, setHeight] = useState(60)
    const [textColor, setTextColor] = useState("#ffffff")
    const [fontSize, setFontSize] = useState(24)
    const [fontWeight, setFontWeight] = useState(600)
    const [bgColor, setBgColor] = useState("#ffffff00")
    const [borderWidth, setBorderWidth] = useState(2)
    const [borderColor, setBorderColor] = useState("#ffffff")
    const [borderRadius, setBorderRadius] = useState(10)
    const [boxShadow, setBoxShadow] = useState<string[]>([""])
    const [textShadow, setTextShadow] = useState<string[]>([""])

    const [pWidth, setPWidth] = useState(60)
    const [pHeight, setPHeight] = useState(60)
    const [pTextColor, setPTextColor] = useState("#000000")
    const [pFontSize, setPFontSize] = useState(24)
    const [pFontWeight, setPFontWeight] = useState(600)
    const [pBgColor, setPBgColor] = useState("#ffffffff")
    const [pBorderWidth, setPBorderWidth] = useState(2)
    const [pBorderColor, setPBorderColor] = useState("#ffffff")
    const [pBorderRadius, setPBorderRadius] = useState(10)
    const [pBoxShadow, setPBoxShadow] = useState<string[]>([""])
    const [pTextShadow, setPTextShadow] = useState<string[]>([""])

    useEffect(() => setOnce(true), [])
    useEffect(() => {
        if(!once) return
        const keydown = (e:KeyboardEvent) => {
            if(pressed.includes(e.code)) return
            setPressed([...pressed, e.code])
            if(dbgMode){
                console.log(e.code, e.key)
                if(e.code === "ArrowUp" && idx > 0){setIdx(idx - 1)}
                else if(e.code === "ArrowDown" && idx < keys.length - 1){setIdx(idx + 1)}
                else if(e.code === "Backspace"){
                    let nks = [...keys]
                    const oks = Object.keys(nks[idx])
                    delete nks[idx][oks[oks.length-1]!]
                    if(Object.keys(nks[idx]).length == 0) {
                        if(nks.length == 1) return
                        nks.splice(idx, 1)
                        setIdx(idx - 1 < 0 ? 0 : idx - 1)
                    }
                    setKeys(nks)
                }
                else if(e.code === "Enter"){
                    let nks = [...keys]
                    nks.splice(idx+1, 0, {})
                    setKeys(nks)
                    setIdx(idx+1)
                }
                else {
                    const newKeys = [...keys]
                    newKeys[idx][e.code] = e.key
                    setKeys(newKeys)
                }
            }
        }
        const keyup = (e:KeyboardEvent) => {
            setPressed(pressed.filter(p => p !== e.code))
        }
        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)
        return () => {
            document.removeEventListener('keydown', keydown)
            document.removeEventListener('keyup', keyup)
        }
    }, [once, dbgMode, pressed, idx, keys])

    return once && <main className="w-full h-full bg-black flex flex-col justify-center items-center">
        <BackBtn />
        <div className="flex flex-col justify-center items-center" style={{gap: `${gap}px`}}>
            {keys.map((row, i) => <div key={i} className={`flex flex-row justify-center items-center ${(dbgMode && i == idx) ? "bg-[#fff5] min-w-10 min-h-4" : ""}`} style={{gap: `${gap}px`}}>
                {Object.entries(row).map(([key, value]) =>
                <div key={key} style={{
                    width: pressed.includes(key) ? `${pWidth}px`: `${width}px`,
                    height: pressed.includes(key) ? `${pHeight}px`: `${height}px`,
                    color: pressed.includes(key) ? pTextColor : textColor,
                    fontSize: pressed.includes(key) ? `${pFontSize}px`: `${fontSize}px`,
                    fontWeight: pressed.includes(key) ? pFontWeight : fontWeight,
                    backgroundColor: pressed.includes(key) ? pBgColor : bgColor,
                    borderWidth: pressed.includes(key) ? `${pBorderWidth}px`: `${borderWidth}px`,
                    borderColor: pressed.includes(key) ? pBorderColor : borderColor,
                    borderRadius: pressed.includes(key) ? `${pBorderRadius}px`: `${borderRadius}px`,
                    boxShadow: pressed.includes(key) ? pBoxShadow.join(",") : boxShadow.join(","),
                    textShadow: pressed.includes(key) ? pTextShadow.join(",") : textShadow.join(","),
                    transition: `${transition}s`
                }}
                className={`flex justify-center items-center`}
                >{value.toUpperCase()}</div>)}
            </div>)}
        </div>
        <div className="absolute top-2 left-2 flex flex-col justify-start items-center border border-white p-2 rounded-md gap-2">
            <button className="w-full rounded border border-white text-white p-2" onClick={e => {
                setIdx(0)
                setKeys([{}])
            }}>Clear</button>
            <button className="w-full rounded border border-white text-white p-2" onClick={e => setDbgMode(!dbgMode)}>{dbgMode ? "Editor Off" : "Editor On"}</button>
            <button className="w-full rounded border border-white text-white p-2" onClick={e => setOnStyle(!onStyle)}>Edit Style</button>
        </div>
        {onStyle && <div className="absolute bg-[#000a] w-full h-full flex flex-col justify-center items-center text-white"
        onMouseDown={e => e.target === e.currentTarget && setOnStyle(false)}>
            <div className="border-2 border-neutral-400 rounded-lg flex flex-col justify-start items-center overflow-y-auto w-[80%] h-[80%] p-2 gap-2">
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Gap (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={gap} onChange={e => setGap(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={100} value={gap} onChange={e => setGap(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Transition (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={transition} onChange={e => setTransition(+e.target.value)} />s)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={10} value={transition} onChange={e => setTransition(+e.target.value)}/>
                </div>
                <h1 className="w-full text-center font-bold text-xl">Key Style</h1>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Width (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={width} onChange={e => setWidth(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={1000} value={width} onChange={e => setWidth(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Height (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={height} onChange={e => setHeight(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={1000} value={height} onChange={e => setHeight(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Text Color (<input className="bg-transparent border-0 outline-none focus:outline-none w-16" type="text" value={textColor} onChange={e => setTextColor(e.target.value)} />)</div>
                    <input className="flex-1" type="color" name="" id="" value={textColor} onChange={e => setTextColor(e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Font Size (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={fontSize} onChange={e => setFontSize(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={100} value={fontSize} onChange={e => setFontSize(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Font Weight (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={fontWeight} onChange={e => setFontWeight(+e.target.value)} />)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={1000} value={fontWeight} onChange={e => setFontWeight(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Background Color (<input className="bg-transparent border-0 outline-none focus:outline-none w-16" type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} />)</div>
                    <input className="flex-1" type="color" name="" id="" value={bgColor} onChange={e => setBgColor(e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Border Width (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={borderWidth} onChange={e => setBorderWidth(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={50} value={borderWidth} onChange={e => setBorderWidth(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Border Color (<input className="bg-transparent border-0 outline-none focus:outline-none w-16" type="text" value={borderColor} onChange={e => setBorderColor(e.target.value)} />)</div>
                    <input className="flex-1" type="color" name="" id="" value={borderColor} onChange={e => setBorderColor(e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Border Radius (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={borderRadius} onChange={e => setBorderRadius(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={100} value={borderRadius} onChange={e => setBorderRadius(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Box Shadow ({boxShadow.length})</div>
                    <input className="flex-1 border border-white rounded bg-transparent" type="text" name="" id="" value={boxShadow.join(",")} onChange={e => setBoxShadow(e.target.value.split(","))}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Text Shadow ({textShadow.length})</div>
                    <input className="flex-1 border border-white rounded bg-transparent" type="text" name="" id="" value={textShadow.join(",")} onChange={e => setTextShadow(e.target.value.split(","))}/>
                </div>
                <h1 className="w-full text-center font-bold text-xl">Pressed Style</h1>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Width (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={pWidth} onChange={e => setPWidth(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={1000} value={pWidth} onChange={e => setPWidth(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Height (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={pHeight} onChange={e => setPHeight(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={1000} value={pHeight} onChange={e => setPHeight(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Text Color (<input className="bg-transparent border-0 outline-none focus:outline-none w-16" type="text" value={pTextColor} onChange={e => setPTextColor(e.target.value)} />)</div>
                    <input className="flex-1" type="color" name="" id="" value={pTextColor} onChange={e => setPTextColor(e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Font Size (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={pFontSize} onChange={e => setPFontSize(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={100} value={pFontSize} onChange={e => setPFontSize(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Font Weight (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={pFontWeight} onChange={e => setPFontWeight(+e.target.value)} />)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={1000} value={pFontWeight} onChange={e => setPFontWeight(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Background Color (<input className="bg-transparent border-0 outline-none focus:outline-none w-16" type="text" value={pBgColor} onChange={e => setPBgColor(e.target.value)} />)</div>
                    <input className="flex-1" type="color" name="" id="" value={pBgColor} onChange={e => setPBgColor(e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Border Width (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={pBorderWidth} onChange={e => setPBorderWidth(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={50} value={pBorderWidth} onChange={e => setPBorderWidth(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Border Color (<input className="bg-transparent border-0 outline-none focus:outline-none w-16" type="text" value={pBorderColor} onChange={e => setPBorderColor(e.target.value)} />)</div>
                    <input className="flex-1" type="color" name="" id="" value={pBorderColor} onChange={e => setPBorderColor(e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Border Radius (<input className="bg-transparent border-0 outline-none focus:outline-none w-8" type="text" value={pBorderRadius} onChange={e => setPBorderRadius(+e.target.value)} />px)</div>
                    <input className="flex-1" type="range" name="" id="" min={0} max={100} value={pBorderRadius} onChange={e => setPBorderRadius(+e.target.value)}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Box Shadow ({pBoxShadow.length})</div>
                    <input className="flex-1 border border-white rounded bg-transparent" type="text" name="" id="" value={pBoxShadow.join(",")} onChange={e => setPBoxShadow(e.target.value.split(","))}/>
                </div>
                <div className="w-full flex flex-row justify-around items-center">
                    <div className="flex-1 text-center">Text Shadow ({pTextShadow.length})</div>
                    <input className="flex-1 border border-white rounded bg-transparent" type="text" name="" id="" value={pTextShadow.join(",")} onChange={e => setPTextShadow(e.target.value.split(","))}/>
                </div>
            </div>
        </div>}
    </main>
}