/**
 * Date: 18-04-2025.
 * Description: A simple tips calculator to split bills with tip percentage, showing per person cost, error alerts, reset, and payment confirmation.
 * Author M H R Habib.
 */

// Global Variables

let bill = 0;
let people = 1;
let tips = 0;



window.onload = function(){
    main();

}

function main(){
    //DOM Reference
    const billAmount = document.getElementById("billAmount");
    const numOfPeoples = document.getElementById("numOfPeoples");
    const tipsPercentage = document.getElementById("tipsPercentage");
    const resetBtn = document.getElementById("resetBtn");
    const form = document.getElementById("form");
    const payBtn = document.getElementById("payBtn");


    //Event Listener
    billAmount.addEventListener("keyup", () => handleInput(billAmount));
    numOfPeoples.addEventListener("keyup", () => handleInput(numOfPeoples));
    tipsPercentage.addEventListener("keyup", () => handleInput(tipsPercentage));
    resetBtn.addEventListener("click", () => resetAllValue(billAmount, numOfPeoples, tipsPercentage))
    payBtn.addEventListener("click", () => payComplete(billAmount, numOfPeoples, tipsPercentage))

    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })

}

// Event Handler ==================

function handleInput(input){
    const value = Number(input.value);
    const identity = input.dataset.identity;
    const correctValue = isValidNumber(value);
    errDisplay(input, correctValue);

    if(identity === "billAmount"){
        if(correctValue){
            bill = value;
            updateAllValue();
        }

    } 
    else if(identity === "people"){
        if(correctValue){
            people = value === 0 ? value + 1 : value;
            updateAllValue();
        }
    }
    else if(identity === "tipsAmount"){
        if(correctValue){
            tips = value;  
            updateAllValue();
        }
    }
}
function resetAllValue(b, p, t){
    bill = 0,  people = 1, tips = 0;
    updateAllValue();
    b.value = "", p.value = "", t.value = "";
}
function payComplete(b, p, t){
    if(b.value === "" || p.value === ""){
        alert("Please Complete Task");
        return;
    }
    alert("payment complete");
    resetAllValue(b, p, t);
}

//DOM function ==================
function updateAllValue(){
    const {perPerson, tipsAmount, total} = calculate(bill, people, tips);
    document.getElementById("AmountPerPerson").value = `${perPerson}`;
    document.getElementById("tipsAmount").value = `${tipsAmount}`;
    document.getElementById("totalAmount").value = `${total}`;
}

/**
 * If the input is not a number (or invalid), adds an error class.
 * @param {HTMLElement} element 
 * @param {boolean} correctValue 
 */
function errDisplay(element, correctValue){
    if(correctValue){
        if(element.className === "borderErr") element.classList.remove("borderErr");
    }
    else{
        element.classList.add("borderErr");
    }
}
function preValuePercent(value){
    tips = Number(value);
    document.getElementById("tipsPercentage").value = value;
    updateAllValue();
}

//Utilities function ==================
function isValidNumber(num){
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(num);
}
function calculate(bill, people, tips){
    const tipsAmount = Number(( (tips / 100) * bill).toFixed(2));
    const total = Number((bill + tipsAmount).toFixed(2));
    const perPerson = Number((total / people).toFixed(2));
    return {perPerson, tipsAmount, total};
}
