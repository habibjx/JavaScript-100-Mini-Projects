/**
 * Data: 07-04-2025.
 * Description:
 * Author: M H R Habib.
 */

// Global Variables
const calculateDisplay = document.getElementById("calculate");
const resultDisplay = document.getElementById("resultDisplay");
let calculateData = "";

window.onload = () => {
    main();
}
function main(){
    // DOM References
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            calculation(e.target.dataset.value);
        })
    })

    // Event Listener

}
//Event Handler

//DOM function
function calculation(data){
    if(data === "del"){
        calculateData.slice(0, -1);
        return
    }
    console.log(data)
    calculateData += data;
    calculateDisplay.textContent = calculateData;
}

//Unities Function

