$(document).foundation();//initializes foundation
var apiKeyTMDB = "8b0814d7463c28b76f719e9285aecbd7";
var urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKeyTMDB + "&language=en";//links to an array of TMDB genres categorized by id
var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en";//links to top rated TMDB movies
var urlPoster = "https://image.tmdb.org/t/p/original";//url for posters. Image location should be added on.
var sortedGenre = [];
var movies = [];
var genres = [];

var topRated = function () {
	for (let i = 0; i < 55; i++) {
		var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en&page=" + Math.random() * 200;//randomizing pages to display
		fetch(urlTopRated).then(function (response) {
			if (response.ok) {
				response.json().then(async function (data) {
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
	}
}

var sortGenre = function (event) {
	var genreID = event.target.id;
	sortedGenre = [];
	document.getElementById("media").classList.add("hide");
	$(".accordion-item").remove();
	console.log(genreID);
	for (let i = 0; i < movies.length; i++) {
		for (let j = 0; j < movies[i].genre.length; j++) {
			if (genreID == movies[i].genre[j]) {
				sortedGenre.push(movies[i]);
			}
		}
	}
	displaySorted();
	console.log(sortedGenre);
}

//utelly settings to pass url
var utelly = function (event) {
	var movieID = event.target.id;
	console.log(event.target);

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
			console.log(data.collection.locations);
			for (var i = 0; i < data.collection.locations.length; i++) {
				var service = document.createElement("a");
				service.setAttribute("href", data.collection.locations[i].url);
				service.setAttribute("target", "_blank");
				service.className = "stream-badge";
				var icon = document.createElement("img");
				icon.setAttribute("src", data.collection.locations[i].icon);
				service.appendChild(icon);
				event.target.append(service);
			}
		})
		.catch(function (err) {
			console.error(err);
			event.target.append("Not available for streaming.")
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
	}, 500);
}

var displaySorted = function () {
	for (var i = 0; i < sortedGenre.length; i++) {
		//accordian for movies.
		var list = $("<li>").addClass("accordion-item").attr("data-accordion-item", "");
		var moviePanel = $("<a>").addClass("accordion-title").attr("id", sortedGenre[i].imdb);
		var poster = $("<img>").attr("src", urlPoster + sortedGenre[i].poster).addClass("movie-poster");
		var title = $("<h3>").text(sortedGenre[i].title);
		var overview = $("<p>").text(sortedGenre[i].overview);
		var release = $("<p>").text(sortedGenre[i].release);
		var expand = $("<h4>").text("Click on the plus icon to see streaming services!").addClass("plus");

		list.one("click", utelly);

		moviePanel.append(poster);
		moviePanel.append(title);
		moviePanel.append(overview);
		moviePanel.append(release);
		moviePanel.append(expand);
		list.append(moviePanel);
		$("#movies-display").append(list);
	}
}

$("#28").on("click", sortGenre);
$("#12").on("click", sortGenre);
$("#16").on("click", sortGenre);
$("#35").on("click", sortGenre);
$("#80").on("click", sortGenre);
$("#99").on("click", sortGenre);
$("#18").on("click", sortGenre);
$("#10751").on("click", sortGenre);
$("#14").on("click", sortGenre);
$("#36").on("click", sortGenre);
$("#27").on("click", sortGenre);
$("#10402").on("click", sortGenre);
$("#9648").on("click", sortGenre);
$("#10749").on("click", sortGenre);
$("#878").on("click", sortGenre);
$("#10770").on("click", sortGenre);
$("#53").on("click", sortGenre);
$("#10752").on("click", sortGenre);
$("#37").on("click", sortGenre);




getGenreArray();
topRated();
getExternalID();
