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
    const hexBox = document.getElementById("hexBox");
    const colorDisplay = document.getElementById("colorDisplay");

    //Event Listener
    randomButton.addEventListener("click", () => handleRandomButton(rgbBox, hexBox, colorDisplay));

}

//Event handler
function handleRandomButton(rgbBox, hexBox, colorDisplay){
    DOMColorUpdate(rgbBox, hexBox, colorDisplay);
    
}

//DOM function
function DOMColorUpdate(rgbBox, hexBox, colorDisplay){
    const {r, g, b} = generateRGBColor();
    const {rh, gh, bh} = rgbToHexColor({r, g, b});
    rgbBox.value = `${r}, ${g}, ${b}`;
    hexBox.value = `${rh}${gh}${bh}`;
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    colorDisplay.style.background = rgbColor;
}

//Utilities Function

function generateRGBColor(){
    const r = Math.floor(Math.random() *  255);
    const g = Math.floor(Math.random() *  255);
    const b = Math.floor(Math.random() *  255);
    return{r, g, b};
}

function rgbToHexColor(rgb){
    const {r, g, b} = rgb;
    let rh = r.toString(16).padStart(2, "0");
    let gh = g.toString(16).padStart(2, "0");
    let bh = b.toString(16).padStart(2, "0");
    return {rh, gh, bh};
}