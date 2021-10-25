var festival = new Festival();

var createMovieButton = document.querySelector("#create-movie"),
  createProgramButton = document.querySelector("#create-program"),
  addMovieToProgramButton = document.querySelector("#add-movie"),
  inputTitleElement = document.querySelector("#title"),
  inputLengthElement = document.querySelector("#length"),
  selectGenreElement = document.querySelector("#genre"),
  movieErrorElement = document.querySelector("#movie-error"),
  movieSelectElement = document.querySelector("#movie-select"),
  ulMovieListElement = document.querySelector("#movie-list"),
  inputDateElement = document.querySelector("#date"),
  programErrorElement = document.querySelector("#program-error"),
  ulProgramListElement = document.querySelector("#program-list"),
  programSelectElement = document.querySelector("#program-select"),
  selectMovieElement = document.querySelector("#movie-select"),
  selectProgramElement = document.querySelector("#program-select");

function addMovie() {
  var titleValue = inputTitleElement.value;
  var lengthValue = inputLengthElement.value;
  var genreValue = selectGenreElement.value;

  if (!titleValue) {
    movieErrorElement.textContent = "Title is required!";
    return;
  }
  if (!genreValue) {
    movieErrorElement.textContent = "Genre is required!";
    return;
  }
  if (!lengthValue) {
    movieErrorElement.textContent = "Length is required!";
    return;
  }

  movieErrorElement.textContent = "";

  var movie = new Movie(titleValue, lengthValue, genreValue);
  var index = festival.listOfAllMovies.push(movie) - 1;
  console.log(index);

  var movieDataLi = document.createElement("li");
  movieDataLi.textContent = movie.getData();
  ulMovieListElement.appendChild(movieDataLi);

  var movieOption = document.createElement("option");
  movieOption.textContent = movie.title;
  movieOption.setAttribute("value", index);
  movieSelectElement.appendChild(movieOption);

  inputTitleElement.value = "";
  inputLengthElement.value = "";
  selectGenreElement.value = "";
}

function addProgram() {
  if (!inputDateElement.value) {
    programErrorElement.textContent = "Date required!";
    return;
  }
  var date = new Date(inputDateElement.value);

  if (date.getTime() < Date.now()) {
    programErrorElement.textContent = "Invalid date!";
    return;
  }
  hasProgramWithSameDate = festival.listOfPrograms.some(function (program) {
    return date.getTime() === program.date.getTime();
  });

  if (hasProgramWithSameDate) {
    programErrorElement.textContent = "Program for same date already exists";
    return;
  }
  programErrorElement.textContent = "";

  var program = new Program(date);
  var index = festival.listOfPrograms.push(program) - 1;

  var li = document.createElement("li");
  li.textContent = program.getData();
  ulProgramListElement.appendChild(li);

  var option = document.createElement("option");
  option.setAttribute("value", index);
  option.textContent = program.getData();
  programSelectElement.appendChild(option);
}

function addMovieToProgram() {
  var programListElements = document.querySelectorAll("#program-list li");
  var programSelectOptions = document.querySelectorAll(
    "#program-select option"
  );

  var movieValue = selectMovieElement.value;
  var programValue = selectProgramElement.value;

  var movie = festival.listOfAllMovies[movieValue];
  var program = festival.listOfPrograms[programValue];
  var oldProgramData = program.getData();

  program.addMovie(movie);

  programListElements.forEach(function (li) {
    if (li.textContent === oldProgramData) {
      li.textContent = program.getData();
    }
  });

  programSelectOptions.forEach(function (option) {
    if (option.textContent === oldProgramData) {
      option.textContent = program.getData();
    }
  });
}

createMovieButton.addEventListener("click", addMovie);
createProgramButton.addEventListener("click", addProgram);
addMovieToProgramButton.addEventListener("click", addMovieToProgram);
