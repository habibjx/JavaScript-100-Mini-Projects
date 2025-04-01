/**
 * Date: 01:04:2025.
 * description: This JavaScript-powered digital clock updates every second, supports both 12-hour and 24-hour formats, and displays the current date.
 * Author: M H R Habib.
 */
//Global Variable

// let timeSessionHalf = JSON.parse(localStorage.getItem('sessionTime')) || true;
let timeSessionHalf = JSON.parse(localStorage.getItem('sessionTime') ?? 'true');

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

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const {hours, minutes, seconds, day, month,year} = getTimeAndDate();
    if(timeSessionHalf){
        const {hour, session} = halfSessionTime();
        document.getElementById('hours').textContent = String(hour).padStart(2, '0');
        document.getElementById('ampm').textContent = session;
        document.querySelector('.time-mood').style.display = 'grid';
        document.getElementById('timeMood').textContent = '12H';
    }else{
        document.getElementById('hours').textContent = hours;
        document.querySelector('.time-mood').style.display = 'none';
        document.getElementById('timeMood').textContent = '24H';
    }
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('days').textContent =  days[day];
    document.getElementById('months').textContent = months[month];
    document.getElementById('years').textContent = year;
}

function handleSwitchButton(){
    timeSessionHalf = !timeSessionHalf;
    timeUpdate();
}

//Unities function ===================================

function getTimeAndDate(){
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const day = time.getDay();
    const month = time.getMonth();
    const year = time.getFullYear();
    return {hours, minutes, seconds, day, month,year};
}

function halfSessionTime(){
    const {hours} = getTimeAndDate();
    let hour = Number(hours)
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
    }else {
        switchCircle.style.left = '2px';
    }
}
