//FUNCTION THAT MAKES THE MOVIE CARD
function cardMaker(value){

    let date = new Date(value.release_date)
	let releaseYear = date.getFullYear();

    let card = `
    <div class="movie-card">
        <div class="movie-poster">
            <img src="${value.poster_path ? IMGPATH + value.poster_path : "img-not-found.png"}" alt="" class="movieCard">
        </div>
        <div class="movie-details">
            <h4>${value.title}</h4>
            <div class="movie-stats">
                <span class="movie-rating">&#11088 ${value.vote_average}</span>
                <span class="movie-year">${releaseYear}</span>
            </div>
        </div>
    </div>`

    return card;
}


//FUNCTION THAT CREATE THE VIEW MORE CARD
function viewMore(id){
    const outerDiv = document.createElement("div");
	const innerDiv = document.createElement("div");
	innerDiv.classList.add("view-more");
	innerDiv.id = (`${id}`);
	innerDiv.textContent = "View More";
	outerDiv.appendChild(innerDiv);

    return outerDiv;
}
