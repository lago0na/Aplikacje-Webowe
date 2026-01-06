import {useEffect, useState} from "react";

const Countdown = () => {

    const [countdown,setCountdown] = useState(15.0);
    const [running,setRunning]=useState(false);

    useEffect(()=>{
        let interval: number | undefined;
        if( running && countdown >0){
            interval= setInterval(()=>{
                setCountdown((prev)=>{
                    if(prev <=0.1){
                        setRunning(false);
                        return 0;
                    }
                    return prev -0.1;
                });
            },100);
        }
        return()=> clearInterval(interval);
    },[running,countdown]);

    const toggleCountdown =()=>{
        setRunning(!running);
    };

    const buttonText = countdown === 0 ? "Odliczanie zakończone" : (running ? "STOP": "START");

    return(
        <div>
            <div>{countdown.toFixed(1)} sek</div>
            <button onClick={toggleCountdown} disabled={countdown=== 0}>{buttonText}</button>
        </div>
    );
};

export default Countdown;