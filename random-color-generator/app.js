/**
 * Date: 10-4-2025
 * Author: M H R Habib.
 * Description: 
 */

// Global Variable

const preColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700", "#800080", "#00FFFF", "#FF4500", "#008000", "#0000FF", "#FF0000", "#FFFF00", "#00FF00", "#808080", "#99516a", "#FFFFFF"];

  
let isCopyTextHidden = true;

window.onload = () => {
    main()
}

function main(){
    //DOM References
    const randomButton = document.getElementById("randomButton");
    const rgbBox = document.getElementById("rgbBox");
    const hexBox = document.getElementById("hexBox");
    const colorDisplay = document.getElementById("colorDisplay");
    const colorBoxes = document.querySelector(".color-boxes");
    const preColorCopyMsg = document.getElementById("preColorCopyMsg");

    //Event Listener
    randomButton.addEventListener("click", () => handleRandomButton(rgbBox, hexBox, colorDisplay));

    rgbBox.addEventListener("click", () => rgbColorCodeCopy(rgbBox));
    hexBox.addEventListener("click", () => hexColorCodeCopy(hexBox));
    colorBoxes.addEventListener("click", (e) => preColorCodeCopy(e, preColorCopyMsg));

    preColorUpdate(colorBoxes);
}

//Event handler
function handleRandomButton(rgbBox, hexBox, colorDisplay){
    DOMColorUpdate(rgbBox, hexBox, colorDisplay);
    
}
function rgbColorCodeCopy(rgb){
    rgb.select();
    navigator.clipboard.writeText(`rgb(${rgb.value})`);
    CopyTestAlert(rgb);
}
function hexColorCodeCopy(hex){
    hex.select();
    navigator.clipboard.writeText(`#${hex.value}`);
    CopyTestAlert(hex);
}
function preColorCodeCopy(e, copyMsg){
    const target = e.target;
    if(target.className === "pre-color-box"){
        navigator.clipboard.writeText(target.dataset.color);
        if(isCopyTextHidden){
            isCopyTextHidden = false;
            copyMsg.style.display = "block";
            setTimeout(() => {
                copyMsg.style.display = "none"
                isCopyTextHidden = true;
            }, 2000);
        }
    }
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

function CopyTestAlert(parent){
    const span = parent.nextElementSibling;
    if(isCopyTextHidden){
        isCopyTextHidden = false
        span.style.display = "block";
        setTimeout(() => {
            span.style.display = "none";
            isCopyTextHidden = true;
        }, 2000)
    }
}
function preColorUpdate(parent){
    for( let preColor of preColors ){
        const div = document.createElement("div");
        div.className = "pre-color-box";
        div.dataset.color = preColor;
        div.style.background = preColor;
        parent.appendChild(div);
    }
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