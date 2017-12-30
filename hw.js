
 var nbaTeams = ["Denver Nuggets", "Los Angeles Lakers", "Golden State Warriors", "Cleveland Cavaliers", "Washington Wizards", "Orlando Magic", "Los Angeles Clippers", "Minnesota Timberwolves", "Oklahoma City Thunder"]

function renderButtons() {
$("#nba-buttons").empty();
 for (i=0; i < nbaTeams.length; i++) {
 	$("#nba-buttons").append("<button>" + nbaTeams[i] + "</button>")
	}
}

renderButtons()

function click() {
 $("button").on("click", function() {
 	var click = $(this).text()
 	console.log(click)
 	var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&q=" + click + "&api_key=LZuQ8uXvFI8FW7gkSeoAiB7ijBWxTjEm";
 	console.log(queryURL)

 $.ajax({
 	url: queryURL,
 	method: "GET"
 	}).done(function(response){
 	console.log(response)
 	var results = response.data
 	$("#nbaTeams").empty()

 	for (j = 0; j < results.length; j++) {
 		var gifDiv = $("<div class='item'>");
 		var rating = results[j].rating
 		var p = $("<p>").text("Rating: " + rating);
 		var Image = $("<img id='gif'>");
 		Image.attr("src", results[j].images.fixed_height_still.url);
 		Image.attr("data-state", "still");
 		Image.attr("data-animate", results[j].images.fixed_height.url);
 		Image.attr("data-still", results[j].images.fixed_height_still.url)
 		console.log(Image)
 		gifDiv.append(p);
 		gifDiv.append(Image);
 		$("#nbaTeams").prepend(gifDiv);

 		$("#gif").on("click", function(event){
 			var state = $(this).attr("data-state");
 			if (state === "still") {
 			$(this).attr("src", $(this).attr("data-animate"))
 			$(this).attr("data-state", "animate")
 			} else {
        	$(this).attr("src", $(this).attr("data-still"))
       		$(this).attr("data-state", "still")
      				}
 				})
 			}
		})
	})
}

click()

 $("#addTeam").on("click", function(event) {
        event.preventDefault();
        var team = $("#nba-input").val().trim();
        nbaTeams.push(team);
        console.log(nbaTeams)
        renderButtons()
        click()
 })
