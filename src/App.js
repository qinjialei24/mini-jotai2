import React, {useEffect, useState} from 'react';

const listeners = new Set();

let globalState ={
  count:0
}

const useGlobalState = () => {
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


function Comp1() {
   const [xxx1] = useGlobalState()
  return <h1>Comp1: {xxx1.count}</h1>
}

function Comp2() {
   const [xxx2] = useGlobalState()
  return <h1>Comp1: {xxx2.count}</h1>
}


function App() {
  const [,update] = useGlobalState()

  return (
    <div className="App">
      <Comp1></Comp1>
      <Comp2></Comp2>
      <button onClick={() =>{
        update({
          ...globalState,
          count:globalState.count+1
        })
      }}>increase</button>
    </div>
  );
}

export default App;
