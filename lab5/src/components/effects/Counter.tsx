import {useEffect, useState} from "react";

const Counter = () => {
    const [counter, increaseCounter] = useState(0);

    useEffect(()=>{
        console.log("Hello World");
    },[]);

    useEffect(()=>{
        console.log({counter});
        },[counter]);


    const handleIncrease = () => {
        increaseCounter(counter + 1);
    };

    return (
        <div>
            <div>{counter}</div>
            <button onClick={handleIncrease}>Increase</button>
        </div>
    );
};

export default Counter;