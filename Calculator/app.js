/**
 * Data: 07-04-2025.
 * Description: Simple calculator using HTML, CSS & JavaScript.Used eval() for basic expression evaluation (for learning only).
 * Author: M H R Habib.
 */

// Global Variables
const calculateDisplay = document.getElementById("calculate");
const resultDisplay = document.getElementById("resultDisplay");
let inputData = "";

window.onload = () => {
    main();
}
function main(){

    // DOM References
    const buttons = document.querySelectorAll('.button');
    handleInputValue(buttons);
   

    // Event Listener

}
//Event Handler ===================

function handleInputValue(buttons){
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            calculation(e.target.dataset.value);
        })
    })
}

//DOM function
function calculation(value){
    // console.log(value);
    if(value === "ac"){
        inputData = "";
        calculateDisplay.textContent = "00";
    }else if(value === 'del'){
        inputData = inputData.toString().slice(0, -1);  
        if(inputData === "") inputData = "0";
        calculateDisplay.textContent = inputData;
    }else if(value === '='){
        if(inputData === '') return;
        const result = eval(inputData);
        inputData = "";
        resultDisplay.textContent = result;
    }else if(value === "") {
        return;
    }
    else{
        inputData += value;
        calculateDisplay.textContent = inputData;
    }
}

//Unities Function

