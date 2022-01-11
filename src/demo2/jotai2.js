import {useEffect, useState} from "react";

let atomId = 0
const globalState ={}
const listeners = new Map()

export const atom =(value)=>{
    atomId ++
    globalState[atomId]=value
    return {
       id: atomId
    }
}

export const useAtom = (atom) => {

    const valueFromGlobalState = globalState[atom.id]

    const [state,setState] = useState(valueFromGlobalState)

    const updateAtomValue = (nextAtomValue) => {
        globalState[atom.id] = nextAtomValue
        listeners.get(atom.id).forEach(listener => listener());
    }

    useEffect(() => {
        const listener = () => {
            setState(globalState[atom.id]);
        };
        listener(); // in case it's already changed

        const prevListeners = listeners.get(atom.id) || new Set()
        listeners.set(atom.id,prevListeners.add(listener))

        return () =>listeners.get(atom.id).delete(listener)
    },[atom.id])

    return [state,updateAtomValue]
}


