//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function makePageForEpisodes(episodeList) {
const episodesContainer = document.getElementById("episodes-container");

episodeList.forEach((episode) => {
  const episodeCode = `S${("0" + episode.season).slice(-2)}E${("0" + episode.number).slice(-2)}`;
  const episodeElement = `
    <div class="episode">
      <h2>${episode.name}</h2>
      <div>${episodeCode}</div>
      <img src="${episode.image.medium}" alt="${episode.name}">
      <p>${episode.summary}</p>
      <a href="${episode.url}">More information from TVMaze</a>
    </div>
  `;
  episodesContainer.innerHTML += episodeElement;
});
};

window.onload = setup;

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