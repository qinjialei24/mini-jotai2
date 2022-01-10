import React from 'react';
import {useGlobalState} from "./jotai";


function Comp1() {
    const [xxx1] = useGlobalState()
    return <h1>Comp1: {xxx1.count}</h1>
}

function Comp2() {
    const [xxx2] = useGlobalState()
    return <h1>Comp1: {xxx2.count}</h1>
}

function App() {
    const [globalState, update] = useGlobalState()

    return (
        <div className="App">
            <Comp1></Comp1>
            <Comp2></Comp2>
            <button onClick={() => {
                update({
                    ...globalState,
                    count: globalState.count + 1
                })
            }}>
                increase
            </button>
        </div>
    );
}

export default App;
