//You can edit ALL of the code here
let allEpisodes;
// function setup() {
//   allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
//   allEpisodes.forEach((episode) => {
//     selectInput.add(createOption(episode));
//   });
// }

async function setup() {
  try {
    const response = await fetch("http://api.tvmaze.com/shows/82/episodes");
    allEpisodes = await response.json();
    makePageForEpisodes(allEpisodes);
    allEpisodes.forEach((episode) => {
      selectInput.add(createOption(episode));
    });
  } catch (error) {}
}

// Level 100
const episodesCounter = document.getElementById("search-count");
const episodesContainer = document.getElementById("episodes-container");

function makePageForEpisodes(episodeList) {
  //Episode or Episodes
  const episodeOrEpisodes =
    episodeList.length !== 0 && episodeList.length !== 1
      ? "episodes"
      : "episode";
  episodesCounter.innerHTML = `${episodeList.length} ${episodeOrEpisodes} out of ${allEpisodes.length}`;

  episodesContainer.innerHTML = "";

  // episodeList.map((episode) => renderEpisodeContainer(episode));
  const episodeMarkUp = episodeList.map(renderEpisodeContainer).join("");
  episodesContainer.innerHTML = episodeMarkUp;
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
  return episodeElement;
}

// Level 200
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let searchResults = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });
  makePageForEpisodes(searchResults);
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

  option.value = episode.id;
  option.text = `${episodeCode} - ${episode.name}`;
  return option;
}

// Display selected episode by select option
selectInput.addEventListener("change", function () {
  const selectedOption = this.value;

  if (selectedOption === "all") {
    makePageForEpisodes(allEpisodes);
  } else {
    let selectResults = allEpisodes.filter((episode) => {
      return `${episode.id}` === selectedOption;
    });
    makePageForEpisodes(selectResults);
  }
});

window.onload = setup;
