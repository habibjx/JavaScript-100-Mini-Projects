

/**
 * Date : Feb 08 2025
 * Title : Counter App
 * Description : This is a simple counter app where users can easily increase or decrease the number.
 * Author : M H R Habib.
 */


// Globals variable


let counter = Number(localStorage.getItem('countNum')) || 0;



//Onload handler ====================

window.onload = () => {

    main()
    updateCounterValue()
}

function main(){
    // DOM reference 
    const decrease = document.querySelector('.decrease');
    const increase = document.querySelector('.increase');
    const reset = document.querySelector('.reset');


    // Event Listener
    decrease.addEventListener('click', () => {
        counter --;
        updateCounterValue();
        displayCounterValue();
        reset.classList.remove('disable');
    });
    increase.addEventListener('click', () => {
        counter ++;
        updateCounterValue();
        displayCounterValue();
        reset.classList.remove('disable');
    })
    reset.addEventListener('click', () => {
        counter = 0;
        displayCounterValue()
        updateCounterValue();
        reset.classList.add('disable');
    })
}



//Event handler ====================

//DOM function ====================

function updateCounterValue(){
    document.querySelector('.display').textContent = counter; 
}


//Utils function ====================

function displayCounterValue(){
    localStorage.setItem('countNum', counter);
}