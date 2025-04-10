/**
 * Date: 10-4-2025
 * Author: M H R Habib.
 * Description: 
 */

// Global Variable

window.onload = () => {
    main()
}

function main(){
    //DOM References
    const randomButton = document.getElementById("randomButton");
    const rgbBox = document.getElementById("rgbBox");
    const hslBox = document.getElementById("hslBox");
    const hexBox = document.getElementById("hexBox");
    const colorDisplay = document.getElementById("colorDisplay");

    //Event Listener
    randomButton.addEventListener("click", handleRandomButton);

}

//Event handler
function handleRandomButton(){
    console.log("ok random")
}

//DOM function

//Utilities Function