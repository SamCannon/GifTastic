/******************************************************************
*******************************************************************
**********           Week 6 GifTastic Homework           **********
*******************************************************************
******************************************************************/

$(document).ready(function() {

////////////////////
//element array for gif calls
///////////////////

	var animals = [ "tiger", "black mamba", "giraffe", "horse", "eagle", "polar bear", "elephant", "cheetah", "red panda", "racoon", "moose", "squirrel"];

	var whichButton = $(this).attr("id");

///////////////////
//create buttons from array
//////////////////

	createButtons();

///////////////////
//register click event to render new button
//////////////////

	$("#submit").click(function(event) {

		var newEntry = $("#newEntry").val().trim();

		event.preventDefault();

		if(newEntry == "") {

			alert("You must enter text before submitting your GIF request.")

		} else {

			$("#buttons").empty();

			animals.push(newEntry);

			createButtons();

		};

	});


////////////////////
//function to render buttons
///////////////////

	function createButtons() {

		$(animals).each(function(i) {			

			var create = $("<button>");

			create.text(animals[i]);

			create.attr("id", animals[i]);

			create.addClass("gifButtons");

			$("#buttons").append(create);

		});

	};

///////////////////
//event to grab gifs
///////////////////

	$(".gifButtons").click(function(event) {

		$("#gifArea").empty();

		var id = event.target.id;

		stillGifGenerator(id);

	});

///////////////////
//event handler to animate gifs
///////////////////

	$("#gifArea").click(function(event) {

		var gifID = event.target.id;

		var gifTerm = $event.target.val();

		console.log(gifID);

		animateGif(gifID, gifTerm); 

	});

//////////////////
//function to display still gif
//////////////////

	function stillGifGenerator(id) {

		var giphyCall = "http://api.giphy.com/v1/gifs/search?q="+id+"&limit=10&api_key=dc6zaTOxFJmzC";

	    $.ajax({
	      url: giphyCall,
	      method: "GET"
	    }).done(function(response) {

	    	var gifArray = response.data;

	    	$(gifArray).each(function(i) {

		    	var gif = response.data[i].images.fixed_height_still.url;

		    	var img = $('<img id="'+i+'" src="'+gif+'" />');

		    	img.addClass("stillGif");

		    	$("#gifArea").append(img);

	    	});
	    	
	    });

	};

/////////////////
//function to call animated gif
////////////////

	function animateGif(id, search) {

		var giphyCall = "http://api.giphy.com/v1/gifs/search?q="+id+"&limit=10&api_key=dc6zaTOxFJmzC";

		$.ajax({
	      url: giphyCall,
	      method: "GET"
	    }).done(function(response) {

	    	var gif = response.data[id].images.fixed_height.url;

	    	var img = $('<img id="'+search+'" src="'+gif+'" />');

	    	console.log(gif);

	    	img.addClass("aniGif");

	    	$("#"+id).html(img);
	    	
	    });

	};

});