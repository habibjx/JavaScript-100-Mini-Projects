/**
 * Date: 01:04:2025.
 * description: This JavaScript-powered digital clock updates every second, supports both 12-hour and 24-hour formats, and displays the current date.
 * Author: M H R Habib.
 */

//Global Variable
// let timeSessionHalf = JSON.parse(localStorage.getItem('sessionTime')) || true;
let timeSessionHalf = JSON.parse(localStorage.getItem('sessionTime') ?? 'true');
const seconds = document.getElementById('seconds');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const days = document.getElementById('days');
const months = document.getElementById('months');
const years = document.getElementById('years');
const amPm = document.getElementById('ampm');
const timeMood = document.querySelector('.time-mood');
const timeMood2 = document.getElementById('timeMood');
const timeDivider = document.getElementById('timeDivider');

const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


window.onload = () =>{
    main()
}

function main(){
    //DOM Reference
    const switchButton = document.getElementById('switch');

    //Event listener
    switchButton.addEventListener('click', () => handleSwitchButton());

    setInterval(timeUpdate, 1000);
}

//DOM function ====================================
function timeUpdate(){
    localStorage.setItem('sessionTime', JSON.stringify(timeSessionHalf)); 
    switchOnOff()

    const {hrs, mins, snd, dys, mons, yrs} = getTimeAndDate();
    if(timeSessionHalf){
        const {hour, session} = halfSessionTime();
        hours.textContent = String(hour).padStart(2, '0');
        amPm.textContent = session;
        timeMood.style.display = 'grid';
        timeMood2.textContent ='12H';
    }
    else{
        hours.textContent = hrs;
        timeMood.style.display = 'none';
        timeMood2.textContent = '24H';
    }
    minutes.textContent = mins;
    seconds.textContent = snd;
    days.textContent = dayList[dys];
    months.textContent = monthList[mons];
    years.textContent = yrs;
}

function handleSwitchButton(){
    timeSessionHalf = !timeSessionHalf;
    timeUpdate();
}

//Unities function ===================================

function getTimeAndDate(){
    const time = new Date();
    return {
        hrs : String(time.getHours()).padStart(2, '0'),
        mins : String(time.getMinutes()).padStart(2, '0'),
        snd : String(time.getSeconds()).padStart(2, '0'),
        dys : time.getDay(),
        mons : time.getMonth(),
        yrs : time.getFullYear()
    };
}

function halfSessionTime(){
    const { hrs } = getTimeAndDate();
    let hour = Number(hrs)
    let session = 'AM';
    if(hour >= 12){
        session = 'PM';
        if(hour > 12){
            hour -= 12;
        } 
    }
    if(hour === 0){
        hour = 12;
    }
    return {hour, session};
}
function switchOnOff(){
    const switchCircle = document.querySelector('.switch-circle'); 
    if(timeSessionHalf){
        switchCircle.style.left = 'calc(100% - 57px)';
        if(timeDivider.classList.contains('colon-dot')){
            timeDivider.classList.remove('colon-dot');
        }
    }else {
        switchCircle.style.left = '2px';
        if(!timeDivider.classList.contains('colon-dot')){
            timeDivider.classList.add('colon-dot');
        }
    }
}
