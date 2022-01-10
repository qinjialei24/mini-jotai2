import {useEffect, useState} from "react";

const globalState ={}
const listeners = new Set()

export const atom =(opts)=>{
    const {key,value} =opts
    globalState[key]=value


    // const config ={}
    // config.write = () => {
    //
    // }
    //
    // config.read = () => {
    //
    // }

    return {
        key
    }
}

export const useAtom = (atom) => {
    console.log("-> globalState", globalState);

    const valueFromGlobalState = globalState[atom.key]

    const [state,setState] = useState(valueFromGlobalState)

    const updateAtomValue = (nextAtomValue) => {

        console.log("-> nextAtomValue", nextAtomValue);
        console.log("-> globalState", globalState);

        globalState[atom.key] = nextAtomValue
        listeners.forEach(listener => listener());
    }

    useEffect(() => {
        const listener = () => {
            setState(valueFromGlobalState);
        };

        listener(); // in case it's already changed
        listeners.add(listener)
        return () =>listeners.delete(listener)
    },[])

    return [state,updateAtomValue]

}


atom({key:'count',value:0})
