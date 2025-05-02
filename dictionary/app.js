/**
 * Date: 01-05-2025
 * Author: M H R Habib.
 */

// Global variables
let audio;
const statusDisplay = document.getElementById("statusDisplay");
const container = document.querySelector(".container");
const input = document.getElementById("input");

window.onload = () => {
    main();

}

function main(){
    // DOM Reference
    
    const closeIcon = document.getElementById("closeIcon");
    const volume = document.getElementById("volume");

    //Event Listener
    input.addEventListener("keydown", e => handleInput(e));
    closeIcon.addEventListener("click", () => handleCloseIcon(input));
    volume.addEventListener("click", handleAudio);

}

// Event Handler
function handleInput(e){
    if(e.key === "Enter") searchProcess(input.value.trim());
}

function handleCloseIcon(input){
    input.value = "";
    input.focus();
}

function handleAudio(){
    audio.play();
}

// Dom function

function wordDefinition(wordData){
    container.style.display = "block"
    statusDisplay.style.display = "none"

    let definitions = wordData.meanings[0].definitions;
    const partOfSpeech = wordData.meanings[0].partOfSpeech
    const phonetic = wordData.phonetics[0].text || "";
    const synonyms = wordData.meanings[0].synonyms;
    audio = new Audio(wordData.phonetics[0].audio);

    container.querySelector("#word").textContent = wordData.word;
    container.querySelector("#wordDefinition").textContent = `${partOfSpeech} / ${phonetic}`;
    container.querySelector("#meaning").textContent = definitions[0].definition;
    if(definitions[3]) container.querySelector("#example").textContent = definitions[3].example;
    
    const synonymsContainer = container.querySelector("#synonyms");
    synonymsContainer.innerHTML = "";
    if(synonyms && synonyms.length > 0){
        for(let i = 0; i < synonyms.length; i++){
            if(i < 5) synonymsContainer.innerHTML += `<span onclick=findSynonymWord('${synonyms[i]}')>${synonyms[i]}</span> / `;     
        }
    }
}

function findSynonymWord(word){
    searchProcess(word);
    input.value = word;
}

// Utilities function

async function getWordFromDictionary(word) {
    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if(!response.ok) throw new Error(`HTTP error ${response.status}`)
        const data = await response.json()
        return data;
    }
    catch(err){
        throw err;
    }
}

function wordValidation(word){
    const regex = /^[A-Za-z]+$/;
    return regex.test(word);
}

async function searchProcess(word){
    const validWord =  wordValidation(word); 
    if(validWord){
        statusDisplay.innerHTML = `Search the meaning of <span> "${word}"</span>`;
        try{
            const wordData = await getWordFromDictionary(word);
            wordDefinition(wordData[0]);
        }
        catch(err){
            console.error(err.message)
            statusDisplay.innerHTML = `Can't find the meaning of <span> "${word}"</span>`;
        }
    }
    else{
        alert("Please Enter valid word");
    }
}