$(document).foundation();//initializes foundation
var apiKeyTMDB = "8b0814d7463c28b76f719e9285aecbd7";
var urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKeyTMDB + "&language=en";//links to an array of TMDB genres categorized by id
var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en";//links to top rated TMDB movies
var urlPoster = "https://image.tmdb.org/t/p/original";//url for posters. Image location should be added on.


//Grabbing Buttons to add Event Listeners
var crimeEl = document.getElementById("80");
var comedyEl = document.getElementById("35");
var romanceEl = document.getElementById("10749");
var fantasyEl = document.getElementById("14");
var dramaEl = document.getElementById("18")
var genresPic = [];
var sortedGenre = [];

var movies = [];
var genres = [];

var topRated = function () {
	// var pageCount = 1;
	

	for (let i = 0; i < 40; i++) {
		var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en&page=" + Math.random() * 150;
		fetch(urlTopRated).then(function (response) {
			if (response.ok) {
				response.json().then(async function (data) {
					console.log(data);
					for (let j = 0; j < data.results.length; j++) {
						if (data.results[j].original_language === "en") {
							var movie = {
								'genre': data.results[j].genre_ids,
								'id': data.results[j].id,
								'overview': data.results[j].overview,
								'poster': data.results[j].poster_path,
								'release': data.results[j].release_date,
								'title': data.results[j].title
							}
							movies.push(movie)
						}
					}
				})
			}

		})
		// pageCount++;
	}
}

var sortGenre = function (genreID) {
		for (let i = 0; i < movies.length; i++) {
			for (let j = 0; j < movies[i].genre.length; j++) {
				if (genreID === movies[i].genre[j]) {
					console.log(movies[i].genre[j]);
					sortedGenre.push(movies[i]);
				}
			}
		}
		// 	var movieTitle = document.querySelector("#mov" + i);
		// 	movieTitle.innerHTML = "<img src='" + urlPoster + genresPic[i] + "' height='200px' width='200px'> <br> Movie Title: " + sortedGenre[i];
}

//utelly settings to pass url
var utelly = function (movieID) {
	fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + movieID + "&source=imdb&country=us", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "69b980341fmsh2b7d3a3dc6d32b3p1f8da7jsn0c865af8dcf9",
			"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
		}
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log("Utelly response");
			console.log(data);
		})
		.catch(function (err) {
			console.error(err);
			console.log("Error accessing utelly streams");
		});
}

//Filling the genres array with genre objects that have a name and id available
var getGenreArray = function () {
	fetch(urlGenre).then(function (response) {
		return response.json();
	}).then(function (data) {
		for (var i = 0; i < data.genres.length; i++) {
			var genreData = {
				name: data.genres[i].name,
				id: data.genres[i].id
			};
			genres.push(genreData);
		}
	})
	console.log("Array of genres");
	console.log(genres);
}

var getExternalID = function () {
	setTimeout(function () {
		for (let i = 0; i < movies.length; i++) {
			// console.log(movies[i]);
			var externalIDURL = "https://api.themoviedb.org/3/movie/" + movies[i].id + "?api_key=" + apiKeyTMDB;
			fetch(externalIDURL).then(async function (response) {
				if (response.ok) {
					return response.json()
						.then((data) => {
							movies[i].imdb = data.imdb_id;
						})
				}
			})
		}
	}, 1000);
}

var displaySorted = function() {
	for(var i =0; i < 100; i++) {
		//accordian for movies.
		var list = $("<li>").addClass("accordion-item").attr("data-accordion-item","");
		var moviePanel = $("<a>").attr("href", "#").addClass("accordion-title").attr("value", movies[i].imdb);
		var poster = $("<img>").attr("src", urlPoster + movies[i].poster).attr("id", "movie-poster");
		var title = $("<h3>").text(movies[i].title);
		var overview = $("<p>").text(movies[i].overview);
		var release = $("<p>").text(movies[i].release);
		moviePanel.append(poster);
		moviePanel.append(title);
		moviePanel.append(overview);
		moviePanel.append(release);
		list.append(moviePanel);
		$("#movies-display").append(list);

		//drop down accordian
		var div = $("<div>").addClass("accordion-content").attr("data-tab-content","");
		var stream = $("<p>").text("Currently streaming at: ");
		div.append(stream);
		list.append(div);
	}
}

// comedyEl.addEventListener("click", topGenre);
// dramaEl.addEventListener("click", topGenre);
// crimeEl.addEventListener("click", topGenre);
// romanceEl.addEventListener("click", topGenre);
// fantasyEl.addEventListener("click", topGenre);

getGenreArray();
topRated();
getExternalID();
//Using setTimeout for now until we hook up the event listeners
setTimeout(function() {
	sortGenre(18);
	console.log(sortedGenre);
	displaySorted();
}, 1000);



