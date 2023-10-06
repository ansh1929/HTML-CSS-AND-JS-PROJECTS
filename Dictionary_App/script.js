const searchInput = document.querySelector("#input-search");
const searchBtn = document.querySelector("#search-btn");
const lowerSection = document.querySelector(".lower-section");
const sound = document.querySelector("#audio");

searchBtn.addEventListener("click", function () {
    getWord(searchInput.value)
})

//FETCHING DATA HERE
async function getWord(value) {
    lowerSection.innerHTML = `<h3>Fetching the data....</h3>`;
    searchInput.value = "";

    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    let data = await response.json();

    console.log(data)
    lowerSection.innerHTML = `
        <div id="word-description">
            <section>
                <h1 id="word">${value}</h1>
                <p id="phonetics"> ${data[0].meanings[0].partOfSpeech}</p>
                <p id="phonetics">phonetic ${data[0].phonetic}</p>
            </section>
            <section>
                <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </section>
        </div>
        <p id="meaning">${data[0].meanings[0].definitions[0].definition} </p>
        <p id="sentence">${data[0].meanings[0].definitions[0].example || "Not Found"}</p>
        <button class="read-more"><a href="${data[0].sourceUrls}" target="_blank">Read More...</a></button>`
    sound.setAttribute(`src`,`${data[0].phonetics[0].audio}`)
    } catch (error) {
        lowerSection.innerHTML = `<h2>Could'nt find the word  "${value}"</h2>`
    }
}

function playSound(){
    sound.play();
}
