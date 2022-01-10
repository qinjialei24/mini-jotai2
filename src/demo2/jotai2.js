import {useEffect, useState} from "react";

const globalState ={}
const listeners = new Set()

export const atom =(opts)=>{
    const {key,value} =opts
    globalState[key]=value

    return {
        key
    }
}

export const useAtom = (atom) => {

    const valueFromGlobalState = globalState[atom.key]

    const [state,setState] = useState(valueFromGlobalState)

    const updateAtomValue = (nextAtomValue) => {
        globalState[atom.key] = nextAtomValue
        listeners.forEach(listener => listener());
    }

    useEffect(() => {
        const listener = () => {
            setState(globalState[atom.key]);
        };

        listener(); // in case it's already changed
        listeners.add(listener)
        return () =>listeners.delete(listener)
    },[])

    return [state,updateAtomValue]
}


