//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

window.onload = setup;

function makePageForEpisodes(episodeList) {
const episodesContainer = document.getElementById("episodes-container");
episodesContainer.innerHTML = "";

episodeList.forEach((episode) => {
  const episodeCode = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`;
  const episodeElement = `
    <div class="episode">
      <img class="ep-art" src="${episode.image.medium}" alt="${episode.name}">
      <div class="episode-container">
      ${episode.summary}
        <div class="title">
          <h4>${episodeCode}</h4>
          <h3>${episode.name}</h3>
        </div>
      </div>

      <div class="quick-icons">
        <div class="actions">
        <a href=""><i class="fa fa-check" aria-hidden="true"></i></a>
        <a href=""><i class="fa fa-archive" aria-hidden="true"></i></a>
        <a href=""><i class="fa fa-align-left" aria-hidden="true"></i></a>
        <a href=""><i class="fa fa-bolt" aria-hidden="true"></i></a>
        <a href=""><i class="fa fa-play" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>

  `;
  episodesContainer.innerHTML += episodeElement;
});

const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count")
searchCount.innerHTML = `${episodeList.length}  episodes match the current search`
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let searchResults = episodeList.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchTerm) || episode.summary.toLowerCase().includes(searchTerm)
    );
  });
    makePageForEpisodes(searchResults);
    console.log(searchResults)
    // const episodeOrEpisodes = searchResults.length !== 1 ? "episodes" : "episode";
    searchCount.innerHTML = `${searchResults.length}  episodes match the current search`;
})
};








/*
let allEpisodes;
function setup() {
  fetch("http://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    });
}

  */