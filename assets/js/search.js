

var urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMDB + "&query="; //Search Title link
var titleSearch = document.getElementById("title");

var searchTitle = function(event){
	event.preventDefault();

	//console.log(event);
	console.log(document.getElementById("title").value)
	fetch(urlSearch+titleSearch.value).then(function(response){
		//console.log(response.json());
		return response.json();
	})
}