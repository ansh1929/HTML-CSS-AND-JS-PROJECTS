

//OTHER API'S

const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";



//API KEY
f02887f0a810237e3e7fad0213050302



const movieGenre = {
	name:"anshul",
	"28":"Action",
	12:"Adventure",
	16:"Animation",
	35:"Comedy",
	80:"Crime",
	99:"Documentry",
	18:"Drama",
	10751:"Family",
	14:"Fantasy",
	36:"History",
	27:"Horror",
	10402:"Music",
	9648:"Mystery",
	10749:"Romance",
	878:"ScienceFiction",
	53:"Thriller",
	10752:"War",
	37:"Western"
}



console.log(upcomingMovieList)
	var newDiv = document.createElement("div");
newDiv.innerHTML = "This is a dynamically inserted div.";
newDiv.setAttribute("data-dynamic", "true");
document.getElementById("container").innerHTML =`<div data-dynamic='true' class="dy">This is ddynamicaly ${upcomingMovieList[0].title} div </div>` ;

// Access the div with the custom data attribute
var dynamicDiv = document.querySelector(".dy");
console.log(dynamicDiv);
if (dynamicDiv) {
    dynamicDiv.style.backgroundColor = "lightblue";
}



					<div class="slide">
                		<img src="${value.backdrop_path ? IMGPATH + value.backdrop_path : "img-not-found.png"}" alt="">
                        <div class="fade"></div>
                        <div class="poster-details">
						    <h1 class="movie-name">${value.title}</h1>
                    		<div>
                        		<span class="movie-rating">&#11088 ${value.vote_average}</span>
                        		<span class="movie-year">${releaseYear}</span>
                    		</div>
                    		<button class="watchNow-btn">Watch Now</button>
						</div>
                    </div>


		<div class="slide-box">
            <div class="slide">
                        <img src="nat.jpeg" alt="Slide 1">
                <div class="fade"></div>
                <div class="poster-details">
                    <h1 class="movie-name">${value.title}</h1>
                    <div>
                        <span class="movie-rating">&#11088 ${value.vote_average}</span>
                        <span class="movie-year">${releaseYear}</span>
                    </div>
                    <button class="watchNow-btn">Watch Now</button>
                </div>
            </div>
        </div>
