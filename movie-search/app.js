/**
 * Data: 06-05-2025.
 * Author: M H R Habib.
 */

// Title: http://www.omdbapi.com/?s=<movie name here>&apikey=6af6e47a
// Details: http://www.omdbapi.com/?i=tt3896198&apikey=6af6e47a

// Global variables
const movieSearch = document.getElementById("movieSearch");
const moviesSuggestion = document.getElementById('moviesSuggestion');

window.onload = () => {
    main();

}

function main() {
    // DOM Reference 
    const close = document.getElementById('close');
    const resultContainer = document.querySelector('.result-container');
    

    // Event listener 
    movieSearch.addEventListener("keyup", handleMovieSearch);
    window.addEventListener('click', (e) => handleListItemsClose(e));
    close.addEventListener('click', handleClose);
    moviesSuggestion.addEventListener('click', (event) => handleMovieSuggestion(event, resultContainer))
}

// Event Handler 
async function handleMovieSearch(){
    const data = await getMovieData(`http://www.omdbapi.com/?s=${movieSearch.value}&apikey=6af6e47a`);
    data.Search.forEach((movie) => {
        moviesSuggestionContainer(movie);
    })
}

function handleClose(){
    if(movieSearch !== '') movieSearch.value = '';
    moviesSuggestion.innerHTML = "";
}
async function handleMovieSuggestion(event, parent){
    const li = event.target.closest('li');
    if(li && li.className === 'list-box'){
        const data = await getMovieData(`http://www.omdbapi.com/?i=${li.dataset.id}&apikey=6af6e47a`)
        movieDisplayContainer(data, parent);
    }
}

function handleListItemsClose(e) {
    if(e.target.className != 'movie-suggestion'){
        moviesSuggestion.style.display = 'none';
        moviesSuggestion.innerHTML = "";
    }
}


// DOM Function 

function moviesSuggestionContainer(movie){

    moviesSuggestion.style.display = "block";
    const { Poster, Title, Year, imdbID } = movie;

    const li = document.createElement('li');
    li.dataset.id = imdbID;
    li.className = 'list-box';

    const img = document.createElement('img');

    img.src = (!Poster || Poster == 'N/A') ? './img/image_not_found.png' : Poster; 
    img.alt = Title;

    const h4 = document.createElement('h4');
    h4.textContent = `${Title} (${Year})`;

    li.append(img, h4);
    moviesSuggestion.appendChild(li);
}

function movieDisplayContainer(data, parent){
    console.log(data)
    const {Actors, Country, Director, Genre, Language, Plot, Poster, Ratings, Released, Runtime, Title, Writer, Year} = data;
    const ratingValue = Ratings[0].value;
    parent.innerHTML = `

        <div class="movie-img">
                <img src="${Poster}" alt="${Title}">
                <span>${Runtime}</span>
        </div>
        <div class="movie-description">
            <h2>${Title}</h2>
            <div class="des1">
                <span>Year${Year}</span>
                <span>Released${Released}</span>
                <span>Rating${ratingValue}</span>
            </div>
            <div class="des2">
                <div class="Genre">
                    <h4>Genre</h4>
                    <p>${Genre}</p>
                </div>
                <div class="actors">
                    <h4>Actors</h4>
                    <p>${Actors}</p>
                </div>
                <div class="writer">
                    <h4>Writer</h4>
                    <p>${Writer}</p>
                </div>
            </div>
            <div class="plot">
                <h4>Plot:</h4>
                <p>${Plot}</p>
            </div>
            <div class="des4">
                <span>Country:${Country}</span>
                <span>Language: ${Language}</span>
                <span> Director: ${Director}</span>
            </div>
        </div>
    `
}

// utilities function 

async function getMovieData(url){
    try{
        const response = await fetch(url)
        if(!response.ok) throw Error(`HTTP error ${response.status}`)
        return data = await response.json()
    }
    catch(err){
        console.error(err.message);
    }
}
