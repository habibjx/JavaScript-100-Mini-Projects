/**
 * Date: 21-04-2025
 * Description:
 * Author: M H R Habib.
 */

// Global Variable

window.onload = () => {
    main();

}

function main(){
    // DOM Reference
    const passwordRange = document.getElementById("passwordRange");
    const selector = document.getElementById("selector");
    const passTypeSwitch = document.querySelectorAll(".pass-type-switch");
    const increase = document.getElementById("increase");
    const decrease = document.getElementById("decrease");
    

    // Event Listener
    passwordRange.addEventListener("input", (e) => updateInputRange(e.target.value, selector));

    passTypeSwitch.forEach((element) => {
        handlePassTypeSwitch(element);
    })
    increase.addEventListener("click", () => handleIncreaseDecrease(passwordRange, selector, 1));
    decrease.addEventListener("click", () => handleIncreaseDecrease(passwordRange,selector, -1));

}

//Event Handler

function handlePassTypeSwitch(element){
    const identity = element.dataset.identity;
    element.addEventListener("click", () => {
        if(identity === "ABC"){
            passTypeSwitch(element)
        }
        else if(identity === "abc"){
            passTypeSwitch(element)
        }
        else if(identity === "123"){
            passTypeSwitch(element)
        }
        else if(identity === "$#&"){
            passTypeSwitch(element)
        }
    })
}

function handleIncreaseDecrease(range, selector, inDe){
    let value = Number(range.value);
    range.value = range.value = value + (inDe);
    
    let newValue = Number(range.value);
    updateInputRange(newValue, selector);
    console.log(newValue)
}

// DOM function

function passTypeSwitch(element){
    element.classList.toggle("passType-bg")
    const switchPoint = element.querySelector(".pass-switch-point");
    if(element.classList.contains("passType-bg")){
        switchPoint.style.left = `calc(100% - 15px)`;
    }
    else{
        switchPoint.style.left = "3px";
    }
}

/**
 * smoothly update input range 
 * @param {Number} value 
 * @param {HTMLCollection} selector 
 */
function updateInputRange(value, selector){
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

