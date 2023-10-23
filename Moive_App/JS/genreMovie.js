//MOVIE FETCHING BY GENRE NAME
const genreList = document.querySelector(".genre-list");

genreList.addEventListener(
	"click",
	async (e) => {
		const genreAPI = `https://api.themoviedb.org/3/discover/movie?api_key=f02887f0a810237e3e7fad0213050302&with_genres=${e.target.id}`
		const response = await fetch(genreAPI);
		const data = await response.json();

		showSpecificGenreMovies(data.results, e.target.textContent, e.target.id);
	});



//SHOW MOVIES OF SAME GENRE
const allMoviesContainer = document.querySelector(".movies-container");

function showSpecificGenreMovies(movies, genreName, genreID) {
	allMoviesContainer.innerHTML = `<h1>List of ${genreName} movies</h1>`;
	const element = document.createElement("div");
	element.classList.add("genre-movies-container");
	allMoviesContainer.appendChild(element);

	movies.map((value) => {
		element.innerHTML += cardMaker(value);
	})


	//CREAING THE VIEW MORE BUTTON
	element.appendChild(viewMore(genreID));


	//ADDING THE EVENT ON THE GENRE MOVIE CONTAINER
	let page = 1;
	const genreMovieContainer = document.querySelector(".genre-movies-container");
	genreMovieContainer.addEventListener("click", function (e) {
		if (e.target.classList.value == "movieCard") {
			showMovieDetails()
		}else if(e.target.classList.value == "view-more"){
            page++
            fetchingMoreGenreMovies(e, genreMovieContainer,page);
        }
         else {
            e.preventDefault();
            console.log("default prevented");
		}
	})
}


//FETCHING MORE MOVIES
async function fetchingMoreGenreMovies(e,genreMovieContainer,pageNumber) {
	const genreAPI = `https://api.themoviedb.org/3/discover/movie?api_key=f02887f0a810237e3e7fad0213050302&with_genres=${e.target.id}&page=${pageNumber}`
	const response = await fetch(genreAPI);
	const data = await response.json();
	showMoreMovies(e, genreMovieContainer, data.results)
}


//ADD MORE MOVIES
function showMoreMovies(e, genreMovieContainer, movieData) {
	e.target.parentElement.remove();

	movieData.forEach((value)=>{
		
		genreMovieContainer.innerHTML += cardMaker(value)
	})

	
	genreMovieContainer.appendChild(viewMore(e.target.id));

}

//SHOW MOVIE DETAILS
function showMovieDetails() {
	console.log("movie details")
}