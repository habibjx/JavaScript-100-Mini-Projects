/**
 * Date: 21-04-2025
 * Description:
 * Author: M H R Habib.
 */

// Global Variable
let upperCase = "true";
let lowerCase = "true";
let numbers = "true";
let symbols = "true";

window.onload = () => {
    main();

    passwordGenerator();
}

function main(){
    // DOM Reference
    const passwordRange = document.getElementById("passwordRange");
    const selector = document.getElementById("selector");
    const passTypeSwitch = document.querySelectorAll(".pass-type-switch");
    const increase = document.getElementById("increase");
    const decrease = document.getElementById("decrease");
    const password = document.getElementById("password");
    const copy = document.getElementById("copy");
    const copyText = document.getElementById("copyText");
    const reGeneratePass = document.getElementById("reGeneratePass");

    // Event Listener
    passwordRange.addEventListener("input", (e) => updateInputRange(e.target.value, selector));

    passTypeSwitch.forEach((element) => {
        handlePassTypeSwitch(element);
    })
    increase.addEventListener("click", () => handleIncreaseDecrease(passwordRange, selector, 1));
    decrease.addEventListener("click", () => handleIncreaseDecrease(passwordRange,selector, -1));
    copy.addEventListener("click", () => handleCopy(password, copyText));
}

//Event Handler

function handlePassTypeSwitch(element){
    const identity = element.dataset.identity;
    element.addEventListener("click", () => {
        if(identity === "ABC"){
            passTypeSwitch(element);
            upperCase = passCharTrueFalse(element);
            passwordGenerator();
        }
        else if(identity === "abc"){
            passTypeSwitch(element);
            lowerCase = passCharTrueFalse(element);
            passwordGenerator();
        }
        else if(identity === "123"){
            passTypeSwitch(element);
            numbers = passCharTrueFalse(element);
            passwordGenerator();
        }
        else if(identity === "$#&"){
            passTypeSwitch(element);
            symbols = passCharTrueFalse(element);
            passwordGenerator();
        }
    })
}


function handleIncreaseDecrease(range, selector, inDe){
    range.value = Number(range.value) + (inDe);
    let value = Number(range.value);
    updateInputRange(value, selector);
}

function handleCopy(input, copyText){
    input.select();
    try{
        navigator.clipboard.writeText(input.value);
        copyText.textContent = "Copied!"
        if(copyText.dataset.open === "true"){
            copyText.dataset.open = "false";
            setTimeout(() => {
                copyText.textContent = "";
                copyText.dataset.open = "true";
            }, 2000)
        }   
    }
    catch(err){
        alert("Don't support copy your device", err);
    }
}


// DOM function

function passTypeSwitch(element){
    
    element.classList.toggle("passType-bg")
    const switchPoint = element.querySelector(".pass-switch-point");
    if(element.classList.contains("passType-bg")){
        switchPoint.style.left = `calc(100% - 15px)`;
        element.dataset.on = "true";
    }
    else{
        switchPoint.style.left = "3px";
        element.dataset.on = "false";
    }
    
}

function  passTypeSwitchOnOff(element){
    console.log(element)
}

/**
 * smoothly update input range 
 * @param {Number} value 
 * @param {HTMLCollection} selector 
 */
function updateInputRange(value, selector){
    document.getElementById("rangeValueDisplay").textContent = value;
    const parent = selector.parentElement;
    const parentWidth = parent.offsetWidth;
    const childWidth = selector.offsetWidth;
  
    // Calculate max left position so that the right side doesn't go outside
    const maxLeft = parentWidth - childWidth;
  
    // Calculate position based on percentage
    const leftPx = (value / 100) * maxLeft;
    selector.style.left = `${leftPx}px`;
}

// Utilities function

function passCharTrueFalse(element){
    return element.dataset.on;
}

function passwordGenerator(length){
    let passLength = length  || 8;
    const passInput = document.getElementById("password");
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const DecimalNumbers = "0123456789";
    const symbol = "!@#$%^&*()_+[]{}|;:,.<>?";
    const password = [];
    
    if(upperCase === "true") password.push(...upperCaseLetters);   
    if(lowerCase === "true") password.push(...lowerCaseLetters);
    if(numbers === "true") password.push(...DecimalNumbers);
    if(symbols === "true") password.push(...symbol);
    passInput.value = "";

    if(password && password.length >= 8){
        for(let i = 0; i < passLength; i++){
            const random = Math.floor(Math.random() * password.length);
            passInput.value += password[random];
        }
    }
}

