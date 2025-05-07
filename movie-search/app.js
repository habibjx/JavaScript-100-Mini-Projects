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
    
    

    // Event listener 
    movieSearch.addEventListener("keyup", handleMovieSearch);
    window.addEventListener('click', e => {
        if(e.target.className != 'movie-suggestion'){
            moviesSuggestion.style.display = 'none';
        }
    })
}

// Event Handler 
async function handleMovieSearch(){
    const data = await getMovieData(`http://www.omdbapi.com/?s=${movieSearch.value}&apikey=6af6e47a`);
    data.Search.forEach((movie) => {
        moviesSuggestionContainer(movie);
    })
}


// DOM Function 

function moviesSuggestionContainer(movie){

    if(movieSearch.value === ""){
        moviesSuggestion.style.display = "none";
        console.log('ok')
    }

    moviesSuggestion.style.display = "block";
    const { Poster, Title, Year, imdbID } = movie;

    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = Poster || "./img/image_not_found.png"; 
    console.log(Poster)
    img.alt = Title;

    console.log(Year)
    const h4 = document.createElement('h4');
    h4.className = 'title';
    h4.textContent = `${Title} (${Year})`;

    li.append(img, h4);
    moviesSuggestion.appendChild(li);
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














// async function search() {
//     const res = await fetch("");
//     const data = await res.json()
//     console.log(data)
// }
// search()

