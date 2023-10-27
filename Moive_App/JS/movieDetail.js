async function fetchingMovieDetails(movieName) {
    const url = `https://api.themoviedb.org/3/search/movie?&api_key=f02887f0a810237e3e7fad0213050302&query=${movieName}`

    const response = await fetch(url);
    const data = await response.json();
    const movieData = data.results.slice(0, 1);

    const response1 = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=f02887f0a810237e3e7fad0213050302`)
    const data1 = await response1.json();

    showMovie(movieData, data1.genres);
}

function showMovie(movie, genreData) {
    //CONVERTING GENRE IDS INTO GENRE NAMES
    let genres = movie[0].genre_ids;
    let genreName = []
    genres.map((id) => {
        let jarvis = genreData.filter((item) => {
            return item.id === id
        });
        genreName.push(jarvis[0].name)
    });


    //CREATEING A NEW DIV AND APPEND IT TO THE ALL MOVIES CONTAINER
    allMoviesContainer.innerHTML = "";
    const divElement = document.createElement("div");
    divElement.classList.add("single-movie-detail");
    allMoviesContainer.appendChild(divElement)

    movie.map((value) => {

        let language = ""
        if (value.original_language == "en") {
            language = "English"
        } else if (value.original_language == "hi") {
            language = "hindi"
        }

        divElement.innerHTML += `
        <div class="single-movie-detail">
        <div class="backdrop-img">
            <img src="${value.backdrop_path ? IMGPATH + value.backdrop_path : "Image/img-not-found.png"}" alt="">
        </div>
        <div class="movie-overview">
            <div class="movie-image">
                <img src="${value.poster_path ? IMGPATH + value.poster_path : "Image/img-not-found.png"}" alt="">
            </div>
            <div class="about-movie">
                <h2 class="movie-name">${value.title}</h2>
                <p class="overview">
                    <span>overview :</span><br>
                    ${value.overview}
                </p>
                <div class="rating">&#11088 &#11088 &#11088 &#11088 &#11088</div>
                <div class="language">Language: <span>${language}</span></div>
                <div class="genre-name">
                </div>
            </div>   
        </div>
    </div>`
    })

    const genreNameContainer = document.querySelector(".genre-name");
    genreName.map((name)=>{
        genreNameContainer.innerHTML += `<span>${name}</span>`
    })

}