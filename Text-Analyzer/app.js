/**
 * Date: 14-04-2025,
 * Description:
 * Author: M H R Habib.
 */

const userText = document.getElementById("textarea");
const analysisButton = document.getElementById("analysisButton");
const wordDisplay = document.getElementById("wordDisplay");
const charDisplay = document.getElementById("charDisplay");
const longWordDisplay = document.getElementById("longWordDisplay");
const mostFrequentWordDisplay = document.getElementById("mostFrequentWordDisplay");



analysisButton.addEventListener("click", () =>{
    const sentence = userText.value.trim();
    if(sentence === "") return alert("Please type some text");
    const wordsArr = sentence.split(/\s+/); // Regex: /.../ regex range, \s -whitespace like space ( ), tal \t, newline \n, Carriage Return (\r), Form feed ( \f ), + -multiple whitespace.
    const char = sentence.length;
    const words = wordsArr.length;
    const longWord = longestWord(wordsArr);
    const {frequentWord, maxCount} = mostFrequentWord(wordsArr);
    
    wordDisplay.textContent = words;
    charDisplay.textContent = char;
    longWordDisplay.textContent = longWord;
    mostFrequentWordDisplay.textContent = `${frequentWord} (${maxCount})`;
})

function longestWord(wordsArr){
    const lgWord = wordsArr.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
        
    }, "")
    return lgWord;
}

function mostFrequentWord(wordsArr){
    console.log(wordsArr)
    const wordObj = {}; 
    let frequentWord = "";
    let maxCount = 0;
    for(let word of wordsArr){
        if(wordObj[word]){
            wordObj[word] = wordObj[word] + 1;
        }else{
            wordObj[word] = 1;
        }

        if(wordObj[word] > maxCount){
            maxCount = wordObj[word];
            frequentWord = word;
        }   
    }
    return {frequentWord, maxCount};
}