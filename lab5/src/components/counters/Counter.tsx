import {useState} from "react";

const Counter = () => {
    const [counter, increaseCounter] = useState(0);

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