//You can edit ALL of the code here
let allEpisodes;
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const episodesCounter = document.getElementById("search-count");

function makePageForEpisodes(episodeList) {
  episodesCounter.innerHTML = `${episodeList.length}  episodes match the current search`;

  const episodesContainer = document.getElementById("episodes-container");
  episodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeCode = `S${("0" + episode.season).slice(-2)}E${(
      "0" + episode.number
    ).slice(-2)}`;
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
}

// Level 200
const searchInput = document.getElementById("search-input");
const searchCount = document.getElementById("search-count");
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let searchResults = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });
  makePageForEpisodes(searchResults);

  const episodeOrEpisodes = searchResults.length !== 1 ? "episodes" : "episode";
  searchCount.innerHTML = `${searchResults.length} ${episodeOrEpisodes} match the current search`;
});

// Level 300
function createOption(episode) {
  const episodeCode = `S${("0" + episode.season).slice(-2)}E${(
    "0" + episode.number
  ).slice(-2)}`;
  const option = document.createElement("option");
  option.value = episode.id;
  // option.value = "all";
  // option.innerHTML = "All episodes";

  option.text = `${episodeCode} - ${episode.name}`;

  return option;
}

const selectInput = document.getElementById("episode-selector");

selectInput.addEventListener("change", (e) => {
  const selectedEpisodeId = e.target.value;
  const selectedEpisode = episodeList.find(
    (episode) => episode.id === selectedEpisodeId
  );
  // displaySelectedEpisode(selectedEpisode);
  console.log(selectedEpisode);
});

const episodeList = getAllEpisodes();
episodeList.forEach((episode) => {
  selectInput.add(createOption(episode));
});

// makePageForEpisodes(episodeList);

/////////////////
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
