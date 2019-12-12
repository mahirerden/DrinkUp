$(document).ready(function () {

     var favoritesArray = [];
     init();

     function init(){
          if (localStorage.getItem("favorites")){
               favoritesArray = localStorage.getItem("favorites").split(",");
          };
     }

    $(document).on("click", ".addFavorite2", toAddFavorites);

     function toAddFavorites(){
          var addingFavorite = $(this).attr("data-name");
          var iconType = $(this).attr("data-icon");
          if (iconType === "plus"){
               if (!favoritesArray.includes(addingFavorite)){
                    favoritesArray.push(addingFavorite);
                    localStorage.setItem("favorites", favoritesArray);
                    $(this).attr({"src": "./assets/img/heartMinus.png",
                                   "data-icon": "minus"});
                    alert("The drink with id: " + addingFavorite + " has been added to your favorites.");              
               };  
          } else if (iconType === "minus"){
               if (favoritesArray.includes(addingFavorite)){
                    console.log(favoritesArray.indexOf(addingFavorite));
                    favoritesArray.splice( favoritesArray.indexOf(addingFavorite), 1 );
                    console.log("saved array : " + favoritesArray);
                    localStorage.setItem("favorites", favoritesArray);
                    $(this).attr({"src": "./assets/img/heartPlus.png",
                                    "data-icon": "plus"});
                    alert("The drink with id: " + addingFavorite + " has been removed from your favorites.");
               };
          };
     };
     
     var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

     for (var i = 0; i < letters.length; i++) {
          var letterBtn = $("<button>");
          letterBtn.addClass("letter-button letter letter-button-color");
          letterBtn.attr("data-letter", letters[i]);
          letterBtn.text(letters[i]);
          $("#buttons").append(letterBtn);
     }

     $(".letter-button").on("click", function () {
          var selectedLetter = $(this).attr("data-letter");
          console.log(selectedLetter);
          var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selectedLetter}`;
          $.ajax({
               url: queryURL,
               method: "GET"
          }).then(function (response) {
               console.log(response);
                $("#searchDiv").empty();
               for (var i = 0; i < response.drinks.length; i++) {
                    var a = $("<div>");
                    a.addClass("container-drink d-inline-block");
                    a.attr("data-name2", response.drinks[i].idDrink);
                    var b = $("<img>");
                    b.addClass("image");
                    b.attr("src", response.drinks[i].strDrinkThumb);
                    var c = $("<div>");
                    c.addClass("overlay");
                    var d = $("<div>");
                    d.addClass("text");
                    var heart = $("<input>");
                    heart.addClass("addFavorite2");
                    if (favoritesArray.includes(response.drinks[i].idDrink)){
                         heart.attr({"src":"./assets/img/heartMinus.png", "type":"image"});
                         heart.attr({"data-name": response.drinks[i].idDrink, "data-icon": "minus"});
                    }else{
                         heart.attr({"src":"./assets/img/heartPlus.png", "type":"image"});
                         heart.attr({"data-name": response.drinks[i].idDrink, "data-icon": "plus"});
                    } 
                    var details = "<b>" + response.drinks[i].strDrink + "</b>" + "<br>"; 
                    details += "<b>Category: </b>" + response.drinks[i].strCategory + "<br>"; 
                    details += "<b>Drink type: </b>" + response.drinks[i].strAlcoholic + "<br>";
                    details += "<b>Instructions: </b>" + response.drinks[i].strInstructions + "<br>";
                    details += "<b>Ingredients: </b>" + "<br>";
                    if (response.drinks[i].strIngredient1 !== null) {
                         details += response.drinks[i].strIngredient1 + " ";
                         if(response.drinks[i].strMeasure1 !== null) {
                              details += response.drinks[i].strMeasure1 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[i].strIngredient2 !== null) {
                         details += response.drinks[i].strIngredient2 + " ";
                         if(response.drinks[i].strMeasure2 !== null) {
                              details += response.drinks[i].strMeasure2 + "<br>";
                         }else{details += "<br>"}    
                    };
                    if (response.drinks[i].strIngredient3 !== null) {
                         details += response.drinks[i].strIngredient3 + " ";
                         if(response.drinks[i].strMeasure3 !== null) {
                              details += response.drinks[i].strMeasure3 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[i].strIngredient4 !== null) {
                         details += response.drinks[i].strIngredient4 + " ";
                         if(response.drinks[i].strMeasure4 !== null) {
                              details += response.drinks[i].strMeasure4 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[i].strIngredient5 !== null) {
                         details += response.drinks[i].strIngredient5 + " ";
                         if(response.drinks[i].strMeasure5 !== null) {
                              details += response.drinks[i].strMeasure5 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[i].strIngredient6 !== null) {
                         details += response.drinks[i].strIngredient6 + " ";
                         if(response.drinks[i].strMeasure6 !== null) {
                              details += response.drinks[i].strMeasure6 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[i].strIngredient7 !== null) {
                         details += response.drinks[i].strIngredient7 + " ";
                         if(response.drinks[i].strMeasure7 !== null) {
                              details += response.drinks[i].strMeasure7 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[i].strIngredient8 !== null) {
                         details += response.drinks[i].strIngredient8 + " ";
                         if(response.drinks[i].strMeasure8 !== null) {
                              details += response.drinks[i].strMeasure8 + "<br>";
                         }else{details += "<br>"}
                    };

                    d.html(details);
                    a.append(b);
                    c.append(heart);
                    c.append(d);
                    a.append(c);
                    $("#searchDiv").append(a);
               }
          });
     });

     $("#searchBtn").on("click", function () {
          event.preventDefault();
          var searchInput = $("#searchInput").val();
          if (searchInput !== "") {
               sessionStorage.setItem("search", searchInput);
               window.location = "./searchResult.html";
          }
     });

     // $(document).on("click", ".container-drink", displayDrinkInfo);

     // function displayDrinkInfo() {
     //      var selectedDrink = $(this).attr("data-name2");
     //      alert(selectedDrink);
     // }
});