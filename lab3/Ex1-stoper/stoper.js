const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const timeMinutes = document.getElementById('time-min');

const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const reset = document.querySelector(".reset");

let currentTime = 0;
let interval =null;

function measureTime(){
    const min = Math.floor(currentTime/60);
    const sec = currentTime%60;

    minutes.textContent=min;
    seconds.textContent=sec;

    if(min>0){
        timeMinutes.classList.remove('hidden');
    }else{
        timeMinutes.classList.add('hidden');
    }
}

measureTime();

start.addEventListener('click',()=>{
    if (!interval){
        interval=setInterval(()=>{
            currentTime++;
            measureTime();
        },1000);
    }
});

stop.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
});

reset.addEventListener('click',() =>{
    if(interval){
        clearInterval(interval);
        interval=null;
    }
    currentTime =0;
    measureTime();
});
