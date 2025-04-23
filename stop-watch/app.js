/**
 * Date: 23-04-2025.
 * Description:
 * Author: M H R Habib.
 */

// Global Variables
const display = document.getElementById("display");
const start = document.getElementById("start");
let isTimeRunning = false;
let isStartButton = true;
let timeControl = null;
let ms = 0;
let s = 0;
let m = 0;

window.onload = () =>{
    main();
}
function main(){
    // DOM References
    const reset = document.getElementById("reset");
    

    //Event Listener
    start.addEventListener("click", () => handleStartButton());
    reset.addEventListener("click", () => handleResetButton());

}

// Event Handler

function handleStartButton(){
    if(isStartButton){
        if(!isTimeRunning){
            isTimeRunning = true;
            timeControl = setInterval(timeUpdate, 10);
        }
        isStartButton = false;
        start.textContent = "Pause";
    }
    else{
        isStartButton = true;
        isTimeRunning = false;
        start.textContent = "Start";
        clearInterval(timeControl);
    }
}

function handleResetButton(){
    isTimeRunning = false;
    clearInterval(timeControl);
    start.textContent = "Start";
    isStartButton = true;
    m = s = hr = 0;
    display.textContent = '00:00:00';
}

// DOM function
function timeUpdate(){
    ms++;
    if(ms == 100){
        ms = 0;
        s++;
        if(s == 60){
            s = 0;
            m++;
        }
    }

    let milliSecond = ms < 10 ? "0" + ms : ms;
    let second = s < 10 ? "0" + s : s;
    let minutes = m < 10 ? "0" + m : m;

    display.textContent = `${minutes}:${second}:${milliSecond}`;
}



