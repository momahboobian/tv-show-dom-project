//You can edit ALL of the code here
let allEpisodes;
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

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

// Level 100
const episodesCounter = document.getElementById("search-count");
const episodesContainer = document.getElementById("episodes-container");

function makePageForEpisodes(episodeList) {
  episodesCounter.innerHTML = `${episodeList.length}  episodes out of ${allEpisodes.length}`;
  console.log(allEpisodes.length);
  episodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    renderEpisodeContainer(episode);
  });
}

// Render Episodes

function renderEpisodeContainer(episode) {
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

  //Episode or Episodes
  const episodeOrEpisodes =
    searchResults.length !== 0 && searchResults.length !== 1
      ? "episodes"
      : "episode";
  searchCount.innerHTML = `${searchResults.length} ${episodeOrEpisodes} out of ${allEpisodes.length}`;
});

// Level 300
const selectInput = document.getElementById("episode-selector");
const allOption = document.createElement("option");

allOption.value = "all";
allOption.text = "All episodes";
selectInput.appendChild(allOption);

function createOption(episode) {
  const option = document.createElement("option");
  const episodeCode = `S${("0" + episode.season).slice(-2)}E${(
    "0" + episode.number
  ).slice(-2)}`;

  option.innerHTML = episode.id;
  option.text = `${episodeCode} - ${episode.name}`;

  return option;
}
const episodeList = getAllEpisodes();
episodeList.forEach((episode) => {
  selectInput.add(createOption(episode));
});

/////////
selectInput.addEventListener("change", function () {
  const selectedOption = this.value;
  const episodeDetails = document.getElementById("episode-details");

  if (selectedOption === "all") {
    episodeList.forEach((episode) => {
      renderEpisodeContainer(episode);
    });
  } else {
    // episodeDetails.innerHTML = "";
    const selectedEpisode = episodeList.find(
      (episode) => episode.id === selectedOption
    );
    episodeDetails.appendChild(createOption(selectedEpisode));
  }
});

// Display only the selected episode
// selectInput.addEventListener("change", (e) => {
//   const selectedEpisodeId = e.target.value;

//   if (selectedEpisodeId === "All") {
//     makePageForEpisodes(episodeList);
//     return;
//   }

//   const selectedEpisode = episodeList.find(
//     (episode) => episode.id === parseInt(selectedEpisodeId)
//   );
//   if (selectedEpisode) {
//     makePageForEpisodes([selectedEpisode]);
//   } else {
//     console.error(`No episode found with id: ${selectedEpisodeId}`);
//   }
// });

/////////////////
window.onload = setup;
