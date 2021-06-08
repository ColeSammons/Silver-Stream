// 7af753d8       //API key!!!!
var apikey = "7af753d8";
var url = "http://www.omdbapi.com/?apikey=" + apikey;
var movie = "Cruella";

//omdb api call poster test
$.ajax({
    method:'GET',
    url:url + "&t=" + movie,
    success:function(data) {
        console.log(data);
        console.log(data.Poster);
        var img = $("img").attr("src", data.Poster);
        $(".img-poster").append("<img src=" + data.Poster + "></img>");
    }
})
//utelly settings to pass url
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=tt0073195&source=imdb&country=us",
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