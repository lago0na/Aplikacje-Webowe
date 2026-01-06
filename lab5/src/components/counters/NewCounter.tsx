import {useState} from "react";
import IncreaseButton from "./IncreaseButton.tsx";

const Counter = () => {
    const [counter, increaseCounter] = useState(0);

    const handleIncrease = () => {
        increaseCounter(counter + 1);
    };

    return (
        <div>
            <div>{counter}</div>
            <IncreaseButton click={handleIncrease}/>
        </div>
    );
};

export default Counter;