/**
 * Date: 18-04-2025.
 * Description: 
 * Author M H R Habib.
 */

// Global Variables
const billAmount = document.getElementById("billAmount");
const numOfPeoples = document.getElementById("numOfPeoples");
const tipsPercentage = document.getElementById("tipsPercentage");
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
    billAmount.addEventListener("keyup", () => handleBillAmount(billAmount));
    numOfPeoples.addEventListener("keyup", () => handleNumOfPeoples(numOfPeoples));
    tipsPercentage.addEventListener("keyup", () => handleTipsPercentage(tipsPercentage));
    resetBtn.addEventListener("click", () => {
        resetAllValue()
    })
    payBtn.addEventListener("click", () => {
        alert("Payment Successfully Complete!")
        resetAllValue();
    })
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })

}

// Event Handler ==================

function handleBillAmount(inputElement){
    const value = inputElement.value;
    const correctValue = isValidNumber(value);
    errDisplay(inputElement, correctValue);
    if(correctValue){
        bill = Number(value);
        updateAllValue();
    }
}
function handleNumOfPeoples(inputElement){
    const value = inputElement.value;
    const correctValue = isValidNumber(value);
    errDisplay(inputElement, correctValue);
    if(correctValue){
        people = Number(value);
        updateAllValue();
    }
}
function handleTipsPercentage(inputElement){
    const value = inputElement.value;
    const correctValue = isValidNumber(value);
    errDisplay(inputElement, correctValue);
    if(correctValue){
        tips = Number(value);
        updateAllValue();
    }
}
function resetAllValue(){
    bill = 0;
    people = 1;
    tips = 0;
    billAmount.value = "";
    numOfPeoples.value = "";
    tipsPercentage.value = "";
    updateAllValue();
}

//DOM function ==================
function updateAllValue(){
    const {perPerson, tipsAmount, total} = calculate(bill, people, tips);
    document.getElementById("AmountPerPerson").value = `${perPerson}`;
    document.getElementById("tipsAmount").value = `${tipsAmount}`;
    document.getElementById("totalAmount").value = `${total}`;
}

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
    const perPerson = bill / people;
    const tipsAmount = (tips / 100) * bill;
    const total = bill + tips;
    return {perPerson, tipsAmount, total};
}
