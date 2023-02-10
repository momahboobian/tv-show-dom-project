//You can edit ALL of the code here
let allShows;
// function setup() {
//   allShows = getAllShows();
//   makePageForShows(allShows);
//   allShows.forEach((show) => {
//     selectInput.add(createOption(show));
//   });
// }

async function setup() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    allShows = await response.json();
    makePageForShows(allShows);
    allShows.forEach((show) => {
      selectInput.add(createOption(show));
    });
  } catch (error) {}
}

// Level 100
const sideHeader = document.getElementById("side-header");
const showsContainer = document.querySelector(".tv-container");

const sideTitle = document.createElement("h1");
const sideCounter = document.createElement("p");

function makePageForShows(showList) {
  sideTitle.innerText = "TV Shows";
  sideHeader.appendChild(sideTitle);

  //Show or Shows
  const showOrShows =
    showList.length !== 0 && showList.length !== 1 ? "shows" : "show";

  sideCounter.innerText = `${showList.length} ${showOrShows} out of ${allShows.length}`;
  sideHeader.appendChild(sideCounter);

  showsContainer.innerHTML = "";

  // showList.map((episode) => renderShowContainer(episode));
  const episodeMarkUp = showList.map(renderShowContainer).join("");

  showsContainer.innerHTML = episodeMarkUp;

  showsContainer.classList.remove("ep-container");
  showsContainer.classList.add("tv-container");
}
// Render Show Div
function renderShowContainer(show) {
  const showYear = show.premiered.slice(0, 4);
  const showElement = `
    <div class="show" id="${show.id}">
       <img id="show-art" src="${show.image ? show.image.medium : ""}" alt="${
    show.name
  }">
       <div class="show-container">

        <div class="title">
          <h4>${show.runtime} people watching</h4>
          <h3>${show.name}</h3><span>${showYear}</span>
          
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

  return showElement;
}

// Level 200
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (e) => {
  showsContainer.classList.remove("ep-container");
  showsContainer.classList.add("tv-container");
  const searchTerm = e.target.value.toLowerCase();
  let searchResults = allShows.filter((show) => {
    return (
      show.name.toLowerCase().includes(searchTerm) ||
      show.summary.toLowerCase().includes(searchTerm)
    );
  });
  makePageForShows(searchResults);
});

// Level 300
const selectInput = document.getElementById("episode-selector");
const allOption = document.createElement("option");

allOption.value = "all";
allOption.text = "All shows";
selectInput.appendChild(allOption);

function createOption(show) {
  const option = document.createElement("option");
  const showYear = show.premiered.slice(0, 4);

  option.value = show.id;
  option.text = `${show.name} - ${showYear}`;
  return option;
}

// Display selected show by select option
selectInput.addEventListener("change", function () {
  showsContainer.classList.remove("ep-container");
  showsContainer.classList.add("tv-container");
  const selectedOption = this.value;

  if (selectedOption === "all") {
    makePageForShows(allShows);
  } else {
    let selectResults = allShows.filter((episode) => {
      return `${episode.id}` === selectedOption;
    });
    makePageForShows(selectResults);
  }
});

// side-filter

const filterTrending = document.getElementById("trending");
const filterPopular = document.getElementById("popular");
const filterRuntime = document.getElementById("runtime");
const filterTvrage = document.getElementById("tvrage");

filterTrending.addEventListener("click", () => {
  const sortedShows = allShows.sort((a, b) => b.weight - a.weight);
  makePageForShows(sortedShows);
});

filterPopular.addEventListener("click", () => {
  const sortedShows = allShows.sort(
    (a, b) => b.rating.average - a.rating.average
  );
  makePageForShows(sortedShows);
});

filterRuntime.addEventListener("click", () => {
  const sortedShows = allShows.sort((a, b) => b.runtime - a.runtime);
  makePageForShows(sortedShows);
});

filterTvrage.addEventListener("click", () => {
  const sortedShows = allShows.sort(
    (a, b) => b.externals.tvrage - a.externals.tvrage
  );
  makePageForShows(sortedShows);
});

// open show episodes in new tab
showsContainer.addEventListener("click", async (event) => {
  showsContainer.classList.remove("tv-container");
  showsContainer.classList.add("ep-container");
  const showId = event.target.parentElement.id;
  if (!showId) return;

  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`
    );
    const episodes = await response.json();
    showEpisodesInSameWindow(episodes);
  } catch (error) {
    console.error(error);
  }
});

function showEpisodesInSameWindow(episodes) {
  const episodeMarkUp = episodes.map(renderEpisode).join("");

  showsContainer.innerHTML = `
      ${episodeMarkUp}

  `;
}

function renderEpisode(episode) {
  const episodeCode = `S${("0" + episode.season).slice(-2)}E${(
    "0" + episode.number
  ).slice(-2)}`;
  const episodeElement = `
    <div class="episode">
      <img class="ep-art" src="${episode.image.original}" alt="${episode.name}">
      <div class="episode-container">
       
       <div class="ep-title">
          <h4>${episodeCode}</h4>
          <h3>${episode.name} <span>Air: ${episode.airdate}</span></h3>
          
        </div>
        
      </div>
      <div class="summary-container">
        <div class="summary">
        ${episode.summary}
        </div>
      </div>
    </div>
  `;
  return episodeElement;
}

window.onload = setup;
