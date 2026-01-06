import {useEffect, useState} from "react";

const CounterSave = () => {
    const [counter, setCounter] = useState<number>(() => {
        const savedValue = localStorage.getItem("moj-licznik");

        if (savedValue) {
            return parseInt(savedValue);
        } else {
            return 0;
        }
    });

    useEffect(() => {
        localStorage.setItem("moj-licznik", counter.toString());
    }, [counter]);

    return (
        <div>
            <h2>Licznik z pamięcią</h2>
            <p>Wartość: {counter}</p>
            <button onClick={() => setCounter(counter + 1)}>+1</button>
            <button onClick={() => setCounter(counter - 1)}>-1</button>
        </div>
    );
};


export default CounterSave;