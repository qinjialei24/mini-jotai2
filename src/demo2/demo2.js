import React from 'react';
import {atom, useAtom} from "./jotai2";

const countAtom = atom(0)
const ageAtom = atom(0)

function Comp1() {
    const [count] = useAtom(countAtom)
    const [age,setAge] = useAtom(ageAtom)

    return <div>
        <h1>Comp1</h1>
        <h2>count:{count}</h2>
        <h2>age:{age}</h2>

        <button onClick={() => {
            setAge(age+1)
        }}>
            increase age
        </button>
    </div>
}

function Comp2() {
    console.log('Comp2 render!')
    const [xxx2] = useAtom(countAtom)
    return <h1>Comp2: {xxx2}</h1>
}

function Demo2() {
    const [count, setCount] = useAtom(countAtom)

    return (
        <div className="App">
            <Comp1></Comp1>
            <Comp2></Comp2>
            <button onClick={() => {
                setCount(count+1)
            }}>
                increase count
            </button>


        </div>
    );
}

export default Demo2;
