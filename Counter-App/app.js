

/**
 * Date : Feb 08 2025.
 * Title : Counter App.
 * Description : This is a simple counter app where users can easily increase or decrease the number.
 * Author : M H R Habib.
 */


// Globals variable
const reset = document.querySelector('.reset');

let counter = Number(localStorage.getItem('countNum')) || 0;



//Onload handler ====================

window.onload = () => {

    main();
    updateCounterValue();
}

function main(){
    // DOM reference 
    const decrease = document.querySelector('.decrease');
    const increase = document.querySelector('.increase');
    

    // Event Listener
    decrease.addEventListener('click', decreaseHandler);
    increase.addEventListener('click', increaseHandler) ;
    reset.addEventListener('click', resetHandler);

    //Keyboard Listener
    document.addEventListener('keydown', (event) => {
        if(event.key === 'ArrowRight'){
            increaseHandler();
        }else if(event.key === 'ArrowLeft'){
            decreaseHandler();
        }
        else if(event.key === ' '){
            resetHandler();
        }
    })
};


//Event handler ====================

function decreaseHandler(){
    counter --;
    if(counter < -5) counter = 0;
    updateCounterValue();
};

function increaseHandler(){
    counter ++;
    if(counter > 5) counter = 0;
    updateCounterValue();
};

function resetHandler(){
    counter = 0;
    updateCounterValue();
};

//DOM function ====================

function updateCounterValue(){
    updateLocalStorage();
    resetButtonStatus();
    document.querySelector('.display').textContent = counter; 
};

function resetButtonStatus(){
    reset.classList.toggle('disable', counter === 0);
};

//Utils function ====================

function updateLocalStorage(){
    localStorage.setItem('countNum', counter);
};