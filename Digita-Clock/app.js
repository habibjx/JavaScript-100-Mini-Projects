
//Global Variable
let timeSessionHalf = true;


window.onload = () =>{
    main()
}

function main(){
    //DOM Reference
    const switchbtn = document.getElementById('switch');
    
    
   

    //Event listener
    switchbtn.addEventListener('click', () => {
        timeSessionHalf = !timeSessionHalf;
        timeUpdate();
    })

    timeUpdate();
}

//Event handler

//DOM function
function timeUpdate(){
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
        console.log(hours)
        document.querySelector('.time-mood').style.display = 'none';
        document.getElementById('timeMood').textContent = '24H';
    }
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;



    document.getElementById('days').textContent =  days[day];
    document.getElementById('months').textContent = months[month];
    document.getElementById('years').textContent = year;
    // const days = document.getElementById('days');
    // const months = document.getElementById('months');
    // const years = document.getElementById('years');
    

}
setInterval(timeUpdate, 1000)
//Unities function

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

