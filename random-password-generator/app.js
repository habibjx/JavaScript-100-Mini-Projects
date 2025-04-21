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
    
    

    // Event Listener
    passwordRange.addEventListener("input", (e) => handlePasswordRand(e, selector));

    passTypeSwitch.forEach((element) => {
        handlePassTypeSwitch(element);
    })

}

//Event Handler
function handlePasswordRand(e, selector){
    let value = e.target.value;
    if(value <= 50){
        selector.style.left = value + "%";
    }
    else if(value > 50){
        selector.style.left = `calc(${value}% - 30px)`
    }
}

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

// Utilities function

