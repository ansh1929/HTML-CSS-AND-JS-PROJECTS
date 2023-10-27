//SHOW SLIDER IMAGES AND DATA
const slidesContainer = document.querySelector(".slides");
function slider(nowPlayingMovie) {
    let sortedMovieList = nowPlayingMovie.slice(10,17);

    //LOOPING THE MOVIE ARRAY
    sortedMovieList.forEach((value) => {
        let date = new Date(value.release_date)
        let releaseYear = date.getFullYear();
        slidesContainer.innerHTML += `
                    <div class="slide">
                        <img src="${value.backdrop_path ? IMGPATH + value.backdrop_path : "Image/img-not-found.png"}">
                        <div class="fade"></div>
                        <div class="movie-description">
                        <h2>${value.title}</h2>
                            <div>
                                <span id="rating">&#11088 ${value.vote_average}</span>
                                <span class="movie-year">${releaseYear}</span>
                            </div>
                            <button id="WatchBtn">Watch Now</button>
                        </div>
                    </div>`
    });

    //ALIGN THE SLIDES LEFT TO RIGHT
    const oneSlide = document.querySelectorAll(".slide");
    oneSlide.forEach((item, index) => {
        item.style.left = `${100 * index}%`;
    });

    //FUNCTIONALITY FOR THE AUTO SLIDER
    let slideNum = 0;
    let myInterval = setInterval(autoSlider,3000);
    function autoSlider () {
        slideNum = (slideNum+1)%oneSlide.length
        oneSlide.forEach((slide)=>{
            slide.style.transform = `translateX(-${100*slideNum}%)`
        });
    }

    //FUNCTION TO GO NEXT SLIDE
    const nextBtn = document.querySelector("#nextBtn");
    nextBtn.addEventListener("click",goNext)
    function goNext(){
        clearInterval(myInterval);
        slideNum = (slideNum+1)%oneSlide.length;
        oneSlide.forEach((slide)=>{
            slide.style.transform = `translateX(-${100*slideNum}%)`
        });

        //RESTART THE AUTO SLIDER
        setTimeout(function(){
            myInterval = setInterval(autoSlider,3000)
        },2000);

    }

    //FUNCTION TO GO PREVIOUS SLIDE
    const previousBtn = document.querySelector("#previousBtn");
    previousBtn.addEventListener("click",goPrevious)
    function goPrevious(){
        clearInterval(myInterval);
        slideNum = (slideNum - 1)%oneSlide.length;
        oneSlide.forEach((slide)=>{
            slide.style.transform = `translateX(-${100*slideNum}%)`
        });

        //RESTART THE AUTO SLIDER
        setTimeout(function(){
            myInterval = setInterval(autoSlider,3000)
        },2000);
    }
}


