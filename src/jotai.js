import {useEffect, useState} from "react";

const listeners = new Set();

let globalState ={
    count:0
}

export const useGlobalState = () => {
    const [state,setState] = useState(globalState);

    useEffect(() => {
        const listener = () => {
            setState(globalState);
        };
        listeners.add(listener);
        listener(); // in case it's already changed
        return () => listeners.delete(listener); // cleanup
    }, []);

    const setGlobalState = (nextGlobalState) => {
        globalState = nextGlobalState
        listeners.forEach(listener => listener());
    }

    return [state,setGlobalState]
};
