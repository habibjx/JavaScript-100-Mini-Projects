const emojis = [
    "./emoji/1.png",
    "./emoji/2.png",
    "./emoji/3.png",
    "./emoji/4.png",
    "./emoji/5.png",
    "./emoji/6.png",
    "./emoji/7.png",
    "./emoji/8.png",
    "./emoji/9.png",
]
const emojiBox = document.getElementById("emoji");
const jokeBox = document.getElementById("jokeBox");
const jokeGenerate = document.getElementById("jokeGenerate");


jokeGenerate.addEventListener("click", getJokes)
document.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        getJokes();
    }
})
window.onload = () => {
    getJokes();
}

async function getJokes(){
    jokeGenerate.disabled = true;
    const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist,sexist&type=single";
    try{
        const response = await fetch(url)
        if(!response.ok) throw new Error(`HTTP error! ${response.status}`)
        const data = await response.json()
        updateJoke(data.joke)
    }
    catch(err){
        console.error(err.message);
        alert("Can't find any joke try again");
    }
}

function updateJoke(joke){
    jokeGenerate.disabled = false;
    const random = Math.floor(Math.random() * emojis.length);
    emojiBox.src = emojis[random];
    jokeBox.textContent = joke;
}

