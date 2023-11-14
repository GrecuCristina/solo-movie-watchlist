const main = document.getElementById("main-id");

function renderWatchlist() {
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovies"));
  if (!moviesFromLocalStorage) {
    return 0;
  }
  for (let movie of moviesFromLocalStorage) {
    const movieContentEl = document.createElement("div");
    movieContentEl.classList.add("movie-content");
    movieContentEl.innerHTML = `
      <img class="movie-image" src=${movie.Poster} />
      <div class="movie-text">
        <div class="movie-header">
          <p class="movie-title">${movie.Title}</p>
          <div class="rating">
            <img src="images/star-icon-svg.svg" class="star-icon" />
            <p class="rating-p">${movie.imdbRating}</p>
          </div>
        </div>

        <div class="movie-type">
          <p class="movie-length">${movie.Runtime}</p>
          <p class="movie-genre">${movie.Genre}</p>

          
        </div>
        <div class="movie-info">
         ${movie.Plot}
        </div>
      </div>`;
    const removeButton = document.createElement("div");
    removeButton.classList.add("add-movie-form");
    removeButton.innerHTML = `
      <img src="images/delete-icon-svg.svg" class="icon" />
      <p class="remove-p">Remove</p>`;

    removeButton.addEventListener("click", function () {
      removeMovieFromWatchlist(movie);
    });

    const movieType = movieContentEl.querySelector(".movie-type");
    movieType.append(removeButton);
    main.append(movieContentEl);
  }
}
renderWatchlist();
function removeMovieFromWatchlist(movieToBeDeleted) {
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem("myMovies"));
  console.log(movieToBeDeleted);

  const movies = moviesFromLocalStorage.filter(
    (movie) => movie.imdbID !== movieToBeDeleted.imdbID
  );
  console.log(movies);
  localStorage.clear();

  localStorage.setItem("myMovies", JSON.stringify(movies));

  clearPage();
  renderWatchlist();
}
function clearPage() {
  main.innerHTML = "";
}
