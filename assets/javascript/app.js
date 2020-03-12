// start with the array of gifs

var gifs = ["cat", "sloth","Sheldon","Rebel Wilson", "coding", "dolphin","unicorn"];
console.log(gifs);

//function to have the information display in the html

function displayGifInfo() {
    var gif = $ (this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=jElcC4ePU4jqFQ0rAN841qASEfZJ9BGt&q=" + gif;

    // the function to call the APi through AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

//create a div for the incoming searched gifs
        for (var i=0; i<response.data.length; i++){

       
        var GifDiv = $("<div class = 'gif'>");

//storing the image path and data;

        var imageAnim = response.data[i].images.fixed_height.url;
        var imageStill= response.data[i].images.fixed_height_still.url;

        //give the url an image attribute in the html - add the still and animated attr as well

        var image = $("<img class= 'gif'>");
        image.attr("src", imageStill);
        image.attr("data-state", "still")
        image.attr("data-still", imageStill);
        image.attr("data-animated", imageAnim);
      

        //append that new img attribute with the data to the new Div

        GifDiv.append(image);

        //repeat the same steps for the rating. Main difference we are creating a paragraph on the html
        //not an image attr.

        var rating = response.data[i].rating;
        console.log(rating);

        var pOne = $("<p>").text("Rating:"+ " "+ rating);

        GifDiv.append(pOne);

        //once all the new divs are created, prepend it on the original div created in the html
        //the prepend will allow for the new gifs to be added to the top of the container
        //not the bottom. 

        $("#gif-view").prepend(GifDiv);
    }


      });
};

function ShowButtons(){
    $("#button-view").empty();

    for (var i=0; i<gifs.length; i++){

        var newButton = $("<button class = 'gif-btn'>");

        newButton.attr("data-name", gifs[i]);

        newButton.text(gifs[i]);

        $("#button-view").append(newButton);
    
    }
}

$("#search-btn").on("click", function(event){
    event.preventDefault();

    var newgif = $("#search-input").val().trim();

    gifs.push(newgif);

    ShowButtons();
})

$(document).on("click", ".gif-btn", displayGifInfo)
 
$(".gif").on("click", function(displayGifInfo){
    var state = $(this).attr("data-state");
displayGifInfo();
    if(state === "still"){
   $(this).attr("src", $(this).attr("data-animate"));
   $(this).attr("data-state", "animate");
 
     } else{
   $(this).attr("src", $(this).attr("data-still"));
   $(this).attr("data-state", "still");
   
     }    


});



ShowButtons();