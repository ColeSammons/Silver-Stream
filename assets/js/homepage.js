

$(document).foundation();//initializes foundation
var apiKeyTMDB = "8b0814d7463c28b76f719e9285aecbd7";
var urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKeyTMDB + "&language=en";//links to an array of TMDB genres categorized by id
var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en";//links to top rated TMDB movies
var urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMDB + "&query="; //Search Title link
var searchEl = document.getElementById("searchBtn");
var titleSearch = document.getElementById("title");
var movies = [];
var genres = [];
var savedMovies = [];
var searched = [];

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

//Gets an array of top rated movies
var topRated = function () {
	for (let i = 0; i < 55; i++) {
		var urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKeyTMDB + "&language=en&page=" + Math.random() * 200;//randomizing pages to display
		fetch(urlTopRated).then(function (response) {
			if (response.ok) {
				response.json()
                .then(async function (data) {
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

//Gets imdb ID
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


var saveLocal = function() {
    setTimeout(function() {
        window.localStorage.removeItem("movies");
        console.log("saved");
        window.localStorage.setItem("movies", JSON.stringify(movies));
    },1500)
}

var searchTitle = function(event){
	event.preventDefault();

	fetch(urlSearch+titleSearch.value).then(function(response){
		//console.log(response.json())
		if (response.ok){
			response.json()
			.then(function(data){
				for (var i = 0; i < data.results.length; i++){
					var searchInfo = {
						
							'genre': data.results[i].genre_ids,
							'id': data.results[i].id,
							'overview': data.results[i].overview,
							'poster': data.results[i].poster_path,
							'release': data.results[i].release_date,
							'title': data.results[i].title
					}
					searched.push(searchInfo)

					
				}
			})
		}
		
	})
	
	//Saves search array into local search
	
	setTimeout(function(){
		localStorage.setItem("search", JSON.stringify(searched));
		location.replace("./search.html");
	}, 1000);
	


}




getGenreArray();
topRated();
getExternalID();
saveLocal();

searchEl.onclick = searchTitle;

