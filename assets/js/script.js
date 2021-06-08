$(document).foundation();//initializes foundation
var apiKeyTMDB = "8b0814d7463c28b76f719e9285aecbd7";
var urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKeyTMDB + "&language=en";//links to an array of TMDB genres categorized by id
var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en";//links to top rated TMDB movies
var urlPoster = "https://image.tmdb.org/t/p/original";

//asynchronous function to log the genre ids TMDB
$.ajax({
	method: 'GET',
	url: urlGenre,
	success: function (data) {
		console.log(data);
	}
})
//asynchronous function to log top rated movies. Can access poster and diaply on screen
$.ajax({
	method: 'GET',
	url: urlTopRated,
	success: function (data) {
		console.log(data.results[0]);
		var poster = data.results[0].poster_path;
		var img = $("<img>").attr("src", urlPoster + poster).attr("id", "movie-poster").addClass("cell large-4");
		$(".movie-box").append(img);
	}
})

var movieID = "tt0073195"//code for Jaws from imbd
//utelly settings to pass url
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
	console.log(response);
});