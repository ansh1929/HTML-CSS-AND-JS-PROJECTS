//FETCHING MOVIES DATA FROM API
(async function fetchingMoviesData() {
	const upcomingMovie = "https://api.themoviedb.org/3/movie/upcoming?api_key=f02887f0a810237e3e7fad0213050302";
	const response1 = await fetch(upcomingMovie);
	const data1 = await response1.json();

	const popularMovie = "https://api.themoviedb.org/3/movie/popular?api_key=f02887f0a810237e3e7fad0213050302";
	const response2 = await fetch(popularMovie);
	const data2 = await response2.json();

	const topRatedMovie = "https://api.themoviedb.org/3/movie/top_rated?api_key=f02887f0a810237e3e7fad0213050302";
	const response3 = await fetch(topRatedMovie);
	const data3 = await response3.json();

	const nowPlayingMovie = "https://api.themoviedb.org/3/movie/now_playing?api_key=f02887f0a810237e3e7fad0213050302&page=3";
	const response4 = await fetch(nowPlayingMovie);
	const data4 = await response4.json();

	// slider(data4.results)
	showMovies(data1.results, data2.results, data3.results)
})();

//FUNCTION THAT MAKES THE MOVIE CARD
function cardMaker(value){
    let date = new Date(value.release_date)
	let releaseYear = date.getFullYear();

    let card = `
    <div class="movie-card">
        <div class="movie-poster">
            <img src="${value.poster_path ? IMGPATH + value.poster_path : "Image/img-not-found.png"}" id="${value.title}">
        </div>
        <div class="movie-details">
            <h4>${value.title}</h4>
            <div>
                <span class="movie-rating">&#11088 ${value.vote_average.toFixed(1)}</span>
                <span class="movie-year">${releaseYear}</span>
            </div>
        </div>
    </div>`

    return card;
};


//FUNCTION THAT CREATE THE VIEW MORE BUTTON
function viewMore(id){
    const outerDiv = document.createElement("div");
	const innerDiv = document.createElement("div");
	innerDiv.classList.add("view-more");
	innerDiv.id = (`${id}`);
	innerDiv.textContent = "View More";
	outerDiv.appendChild(innerDiv);

    return outerDiv;
}



//SHOW MOVIES 
const movieList = document.querySelectorAll(".movies-list");
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function showMovies(upcomingMovieList, popularMovieList, topRatedMoiveList) {

	//LOOPING THE DATA OF UPCOMING MOVIES
	upcomingMovieList.map((value) => {
		movieList[0].innerHTML += cardMaker(value);
	});

	//LOOPING THE DATA OF POPULAR MOVIES
	popularMovieList.map((value) => {
		movieList[1].innerHTML += cardMaker(value)
	});

	//LOOPING THE DATA OF TOP RATED MOVIES
	topRatedMoiveList.map((value) => {
		movieList[2].innerHTML += cardMaker(value)
	})

	//ADDING THE VIEW MORE BUTTON TO THE MOVIES LIST
	movieList.forEach((element) => {
		element.appendChild(viewMore("view_more"));
	})

}

//ADDING THE EVENT ON VIEW MORE BUTTON TO FETCH MORE MOVIES
const homeMoviesContainer = document.querySelectorAll(".movies-list");
let page = 1;

homeMoviesContainer.forEach((element) => {
	element.addEventListener("click", function (e) {
		if (e.target.tagName == "IMG") {
			fetchingMovieDetails(e.target.id)
		} else if (e.target.classList.value == "view-more") {
			page++
			fetchingMoreHomeMovies(e, page);
		}
		else {
			e.preventDefault();
		}
	})
});

//FUNCTION THAT FETCH MORE MOVIES
async function fetchingMoreHomeMovies(e, pageNumber) {
	let grandParentId = e.target.parentElement.parentElement.id;

	const url = `https://api.themoviedb.org/3/movie/${grandParentId}?api_key=f02887f0a810237e3e7fad0213050302&page=${pageNumber}`;
	const response = await fetch(url);
	const data = await response.json();

	showHomeMovies(e,data.results)
}

//FUNCTION THAT SHOWS MORE MOVIES
function showHomeMovies(e,moviesData) {
	const grnParentElement = e.target.parentElement.parentElement;
	e.target.remove();
	grnParentElement.style.flexWrap = `wrap`;

	moviesData.map((value) => {
		grnParentElement.innerHTML += cardMaker(value)
	})

	//ADDING THE VIEW MORE BUTTON AGAIN
	grnParentElement.appendChild(viewMore("view_more"));
}


//SEARCH MOVIES BY ITS NAME
const searchBtn = document.querySelector("#search-btn");
const searchBox = document.querySelector("#search-box");

searchBtn.addEventListener(
	"click",
	function () {
		searchMovies(searchBox.value)
	}
)

async function searchMovies(moviename) {
	const url = `https://api.themoviedb.org/3/search/movie?&api_key=f02887f0a810237e3e7fad0213050302&query=${moviename}`

	const response = await fetch(url);
	const data = await response.json();
	const movieData = data.results;

	allMoviesContainer.innerHTML = "";

	//CREATEING A NEW DIV AND APPEND IT TO THE RIGHT BOX
	const divElement = document.createElement("div");
	divElement.classList.add("search-movies-container");
	allMoviesContainer.appendChild(divElement)

	movieData.map((value) => {
		divElement.innerHTML += cardMaker(value)
	})

}


//RELOAD THE WINDOW FUNCTION
const logo = document.querySelector(".logo");
logo.addEventListener(
	"click",
	function () {
		location.reload();
	}
)







