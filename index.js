const moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovies"));
const form = document.getElementById("form-id");
const main = document.getElementById("main-id");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearPage();
  renderMovies();
});
function clearPage() {
  main.innerHTML = "";
}
function renderMovies() {
  const searchedText = document.getElementById("searched-text").value;
  console.log("the value of the input is:", searchedText);

  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.setAttribute("id", "loading-id");
  main.append(loading);

  fetch(`https://www.omdbapi.com/?apikey=9118960c&s=${searchedText}`)
    .then((response) => response.json())
    .then((data) => {
      const searchedMovies = data.Search;
      if (!searchedMovies) {
        renderNotFoundMoviesPage();
        return;
      }
      console.log("searched movies", searchedMovies);
      for (let movie of searchedMovies) {
        fetch(`http://www.omdbapi.com/?apikey=9118960c&i=${movie.imdbID}`)
          .then((response) => response.json())
          .then((data) => {
            loading.remove();

            const movieContentEl = document.createElement("div");
            movieContentEl.classList.add("movie-content");
            movieContentEl.innerHTML = `
              <img class="movie-image" src=${movie.Poster} />
              <div class="movie-text">
                <div class="movie-header">
                  <p class="movie-title">${movie.Title}</p>
                  <div class="rating">
                    <img src="images/star-icon-svg.svg" class="star-icon" />
                    <p class="rating-p">${data.imdbRating}</p>
                  </div>
                </div>
      
                <div class="movie-type">
                  <p class="movie-length">${data.Runtime}</p>
                  <p class="movie-genre">${data.Genre}</p>
      
                  
                </div>
                <div class="movie-info">
                 ${data.Plot}
                </div>
              </div>`;
            const watchlistButton = document.createElement("div");
            watchlistButton.classList.add("add-movie-form");
            watchlistButton.innerHTML = `
              <img src="images/add-icon-svg.svg" class="icon" />
              <p class="remove-p">Watchlist</p>`;

            watchlistButton.addEventListener("click", function () {
              addMovieToWatchlist(data);
            });

            const movieType = movieContentEl.querySelector(".movie-type");
            movieType.append(watchlistButton);
            main.append(movieContentEl);
          });
      }
    });
}
function renderNotFoundMoviesPage() {
  main.innerHTML = `
     <div class="empty-watchlist">
        <p>
        Unable to find what you’re looking for. Please try another search.
        </p>
    </div>`;
}

function addMovieToWatchlist(movie) {
  moviesFromLocalStorage.push(movie);
  localStorage.setItem("myMovies", JSON.stringify(moviesFromLocalStorage));
}
