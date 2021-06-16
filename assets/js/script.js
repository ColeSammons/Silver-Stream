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
var testCounter = 0;

var genres = [];

var movie="";

var topRated = function () {
	var pageCount = 1;
	var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en&page=" + pageCount;

	for (var i = 0; i < 10; i++) {
		fetch(urlTopRated).then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					// console.log(data);
					for (var j = 0; j < data.results.length; j++) {
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
		pageCount++;
	}
}

// 40 items in Sorted Genre
var sortGenre = function(event){
	event.preventDefault();

	console.log(event.target);
	var genreID = event.target.id;

	sortedGenre = [];

	//console.log(genreID);
	fetch(urlTopRated).then(function(response){
		return response.json();
	})
	.then(function(data){
		for (var i=0; i < data.results.length; i++){
			
			for (var j=0; j <data.results[i].genre_ids.length;j++){
				console.log(data.results[i].genre_ids[j]);
				if (genreID == data.results[i].genre_ids[j]){
					sortedGenre.push(data.results[i].title)
					genresPic.push(data.results[i].poster_path)
				}
			}
			
		 }
		 console.log(sortedGenre);
		 for (var i=0; i < 5; i++){
			 var movieTitle = document.querySelector("#mov" + i);
			 movieTitle.innerHTML = "<img src='"+ urlPoster+genresPic[i] + "' height='200px' width='200px'> <br> Movie Title: " + sortedGenre[i];
			 
		 }
		 
	});
	
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
		.catch(function(err) {
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

//Function to log movie rating
// var getRating = function (movieID) {
// 	var urlMovieRating = "https://api.themoviedb.org/3/movie/" + movieID + "/release_dates?api_key=" + apiKeyTMDB + "&language=en";
// 	fetch(urlMovieRating).then(function(response) {
// 		return response.json();
// 	}).then(function(data) {
// 		console.log("List of regions released");
// 		console.log(data.results);
// 			for (var i = 0; i < data.results.length; i++) {
// 				if (data.results[i].iso_3166_1 === "US") {
// 					rating = data.results[i].release_dates[data.results[i].release_dates.length - 1].certification;
// 					console.log("Rating of Jaws");
// 					console.log(rating);
// 					showRating(rating);
// 				}
// 			}
// 	})
// };


// var showRating = function(rating) {
// 	var displayRating = $("<p>").text(rating);
// 	$(".movie-box").append(displayRating);
// }


//sortGenre("35");
comedyEl.addEventListener("click", sortGenre);
dramaEl.addEventListener("click", sortGenre);
crimeEl.addEventListener("click", sortGenre);
romanceEl.addEventListener("click", sortGenre);
fantasyEl.addEventListener("click", sortGenre);

