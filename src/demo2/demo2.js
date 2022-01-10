import React from 'react';
import {atom, useAtom} from "./jotai2";

const countAtom = atom({key: 'count', value: 0})

function Comp1() {
    const [xxx1] = useAtom(countAtom)
    return <h1>Comp1: {xxx1}</h1>
}

function Comp2() {
    const [xxx2] = useAtom(countAtom)
    return <h1>Comp1: {xxx2}</h1>
}

function Demo2() {
    const [count, update] = useAtom(countAtom)

    return (
        <div className="App">
            <Comp1></Comp1>
            <Comp2></Comp2>
            <button onClick={() => {
                update(count+1)
            }}>
                increase
            </button>
        </div>
    );
}

export default Demo2;
