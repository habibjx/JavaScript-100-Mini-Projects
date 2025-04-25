/**
 * Date: 24-04-2025.
 * Description:
 * Author: M H R Habib.
 */
// Global Variables
const days = [
    "Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", 
    "Saturday"
];
const months = [
    "Jan", "Feb", "Mar", "Apr", 
    "May", "Jun", "Jul", "Aug", 
    "Sep", "Oct", "Nov", "Dec"
];

window.onload = () => {
    main();

    // auto call 
    timeUpdate();
}

function main(){
    // Dom References
    const search = document.getElementById("search");
    const searchButton = document.getElementById("searchButton");
    const temperature = document.getElementById("temperature");

    // Event Listener
    searchButton.addEventListener("click", () => {
        const value = search.value;
        console.log(value)
    })
    search.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            console.log("enter");
        }
    })

}

// Event handle

//dom function

function timeUpdate(){
    let currentTime = new Date();
    const day = days[currentTime.getDay()];
    const date = currentTime.getDate();
    const mon = months[currentTime.getMonth()];
    document.getElementById("fullDate").textContent = `${day}, ${date} ${mon}`;
}


//utilities function
