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

var movieID = "";//Initializing variable that will be passed into getRating() and utelly().Use "tt0073195" to test getRating with imdb id for Jaws

//Function to grab topRated genre
var topRated = function() {
	fetch(urlTopRated).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
		var poster = data.results[0].poster_path;
		var title = data.results[0].title;
		var displayPoster = $("<img>").attr("src", urlPoster + poster).attr("id", "movie-poster").addClass("cell large-4");
		var displayTitle = $("<h3>").addClass("cell large-8").text(title);
		$(".movie-box").append(displayPoster);
		$(".movie-box").append(displayTitle);
	})
}

var topRatingTest = function(){
	fetch(urlTopRated).then(function(response){
		return response.json();
	})
	.then(function(data){
		console.log(data);
		for (var i = 0; i < 5; i++){
			var poster = data.results[i].poster_path;
			var title = data.results[i].title;
			var displayTitle = $("<h3>").addClass("cell large-8").text(title);
			//$(".movie-box").append(displayPoster);
			$(".movie-box").append(displayTitle);


		}
	})
}

var topGenre = function(event){
	event.preventDefault();
	console.log(event.target);
	var genreID = event.target.id;

	sortedGenre = [];
	genresPic = [];

	//console.log(genreID);
	fetch(urlTopRated).then(function(response){
		return response.json();
	})
	.then(function(data){
		//console.log(data);
		//console.log(data.results[1].genre_ids);
		//console.log(data.results[1].genre_ids.includes(genreID)); //Returns BOOLEAN if genre ID is inside that genre Array
		//console.log(data.results.length);
		for (var i=0; i < data.results.length; i++){
			//console.log(data.results[i].genre_ids);
			//var bool = data.results[i].genre_ids.includes(genreID);
			//console.log(bool);
			for (var j=0; j <data.results[i].genre_ids.length;j++){
				console.log(data.results[i].genre_ids[j]);
				if (genreID == data.results[i].genre_ids[j]){
					//console.log("true");
					//console.log(j);
					//var movieTitle = document.getElementById("0");
					//movieTitle.innerHTML += "Movie Title " + data.results[i].title;
					sortedGenre.push(data.results[i].title)
					genresPic.push(data.results[i].poster_path)
				}
			}
			//console.log(sortedGenre)
			// if (data.results[i].genre_ids.includes(genreID)){
			// 	console.log(data.results[i].genre_ids);
			//sortedGenre.push(data.results[i].genre_ids);
			// 	testCounter++;
			// } else{
			// 	continue;
			 //}
		 }
		 console.log(sortedGenre);
		 for (var i=0; i < 5; i++){
			 var movieTitle = document.querySelector("#mov" + i);
			 //console.log("Movie" + i);
			 movieTitle.innerHTML = "<img src='"+ urlPoster+genresPic[i] + "' height='200px' width='200px'> <br> Movie Title: " + sortedGenre[i];
			 //testCounter++;
		 }
		 //console.log(sortedGenre);
		 //console.log(testCounter)
	});
	
}

//utelly settings to pass url
var utelly = function(movieID) {
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + movieID + "&source=imdb&country=us",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "69b980341fmsh2b7d3a3dc6d32b3p1f8da7jsn0c865af8dcf9",
			"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
		}
	};
	//utelly api call
	$.ajax(settings).done(function (response) {
		console.log("Utelly response");
		console.log(response);
	});
}

//Filling the genres array with genre objects that have a name and id available
var getGenreArray = function () {
	$.ajax({
		method: 'GET',
		url: urlGenre,
		success: function (data) {
			for (var i = 0; i < data.genres.length; i++) {
				var genreData = {
					name: data.genres[i].name,
					id: data.genres[i].id
				};
				genres.push(genreData);
			}

		}
	})
	console.log(genres);
}

//Function to log movie rating
var getRating = function (movieID) {
	var urlMovieRating = "https://api.themoviedb.org/3/movie/" + movieID + "/release_dates?api_key=" + apiKeyTMDB + "&language=en";
	$.ajax({
		method: 'GET',
		url: urlMovieRating,
		success: function (data) {
			console.log(data.results);
			for (var i = 0; i < data.results.length; i++) {
				if(data.results[i].iso_3166_1 === "US") {
					var rating = data.results[i].release_dates[data.results[i].release_dates.length - 1].certification;
					console.log(rating);
				}
			}
			
		}
	})
}

//topGenre("35");
comedyEl.addEventListener("click", topGenre);
dramaEl.addEventListener("click", topGenre);
crimeEl.addEventListener("click", topGenre);
romanceEl.addEventListener("click", topGenre);
fantasyEl.addEventListener("click", topGenre);
// utelly("tt0073195");//Getting streaming info for Jaws using imdb ID
// getRating("tt0073195");
// getGenreArray();//Filling genres array