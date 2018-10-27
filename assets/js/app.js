 // Initial character array
 var marvelCharacters = ["Marvel", "Spiderman", "Iron Man", "Captian America", "Black Widow", "Deadpool", "Hulk", "Gamora", "Loki"];

 // Function for displaying character data
 function renderButtons() {

   // Deleting the character buttons prior to adding new character buttons
   // (this is necessary otherwise we will have repeat buttons)
   $("#characters-view").empty();

   // Looping through the array of characters
   for (var i = 0; i < marvelCharacters.length; i++) {

     // Then dynamicaly generating buttons for each character in the array.
     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
     var button = $("<button>");
     // Adding a class
     button.addClass("character");
     // Adding a data-attribute with a value of the movie at index i
     button.attr("data-name", marvelCharacters[i]);
    // Adding a data-attribute with a value of the movie at
     button.attr("data-state", "still");
     // Providing the button's text with a value of the movie at index i
     button.text(marvelCharacters[i]);
     // Adding the button to the HTML
     $("#characters-view").append(button);
     
   }
   gifAnimation();
 }

 // This function handles events where one button is clicked
 $("#add-character").on("click", function(event) {
   
    // event.preventDefault() prevents the form from trying to submit itself.
   // We're using a form so that the user can hit enter instead of clicking the button if they want
   event.preventDefault();

   // This line will grab the text from the input box
   var character = $("#character-input").val().trim();
   // The movie from the textbox is then added to our array
   marvelCharacters.push(character);

   // calling renderButtons which handles the processing of our movie array
   renderButtons();
 });
 
 
 


 ///////// CREATING BUTTON CLICK TO SHOW GIFS /////////
function gifAnimation() {
 $("button").on("click", function() {
 $("#gifs-appear-here").empty();
 var marvel = $(this).attr("data-name");
 

     // Constructing a queryURL using the marvel name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      marvel + "&api_key=9iODJBOTYB0FLOIyKVEsCbk8TWRfoEOz&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
       .then(function(response) {
         console.log(queryURL);

         console.log(response);
        // storing the data from the AJAX request in the results variable
         var results = response.data;
        
         for (var i = 0; i < results.length; i++) {

             // Creating and storing a div tag
             var characterDiv = $("<div>");

             // Creating a paragraph tag with the result item's rating
             var p = $("<p>").text("Rating: " + results[i].rating);

             // Creating and storing an image tag
             var characterImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            characterImage.attr("src", results[i].images.fixed_height_still.url);
            characterImage.attr("data-still", results[i].images.fixed_height_still.url);
            characterImage.attr("data-animate", results[i].images.fixed_height.url);
            characterImage.attr("data-state", "still");
            characterImage.attr("class", "gif");
            
             
            
             
             // Appending the paragraph and image tag to the animalDiv
            characterDiv.append(p);
            characterDiv.append(characterImage);

             // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
             $("#gifs-appear-here").prepend(characterDiv);

             

           }
           $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
         });

         

     });
    }

    renderButtons();
    
 // Calling the renderButtons function at least once to display the initial list of movies