$(document).ready(function () {

     var favoritesArray = [];
     init();

     function init(){
          if (localStorage.getItem("favorites")){
               favoritesArray = localStorage.getItem("favorites").split(",");;
          }  
     }
     
     $("#searchBtn").on("click", function () {
          event.preventDefault();
          var searchInput = $("#searchInput").val();
          if (searchInput !== "") {
               sessionStorage.setItem("search", searchInput);
               window.location = "./searchResult.html";
          }
     });

     $(".addFavorite").on("click", function(){
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
     })

     $("#getRandomBeverage").on("click", function (event) {
          var randomBeverage = $("#randomBeverageCard");
          randomBeverage.addClass("randomSelect");
          $("#getRandomBeverage").text("Try again!");
          var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`;
          $.ajax({
               url: queryURL,
               method: "GET"
          }).then(function (response) {
               var randomNumber = Math.floor(Math.random() * response.drinks.length);
               var id = response.drinks[randomNumber].idDrink;
               //var containerDetail = document.querySelector(".containerDetail");
               //containerDetail.style.display = "block";
               //containerDetail.style.cssText = "display:block; color:red"; 
               //containerDetail.setAttribute("style", "display:block; color:red");
               $(".containerDetail").attr("style", "display:block");
               var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
               $.ajax({
                    url: queryURL,
                    method: "GET"
               }).then(function (response) {
                    $(".image2").attr("src", response.drinks[0].strDrinkThumb);;
                    $(".drinkName").text(response.drinks[0].strDrink);
                    if (favoritesArray.includes(response.drinks[0].idDrink)){
                         $(".addFavorite").attr({"src":"./assets/img/heartMinus.png",
                                         "data-name": response.drinks[0].idDrink,
                                         "data-icon": "minus"});
                    }else{
                         $(".addFavorite").attr({"src":"./assets/img/heartPlus.png",
                                         "data-name": response.drinks[0].idDrink,
                                         "data-icon": "plus"});
                    }; 
                    //adding drink's details to variable details...
                    var details = "<b>" + response.drinks[0].strDrink + "</b>" + "<br>"; 
                    details += "<b>Category: </b>" + response.drinks[0].strCategory + "<br>"; 
                    details += "<b>Drink type: </b>" + response.drinks[0].strAlcoholic + "<br>";
                    details += "<b>Instructions: </b>" + response.drinks[0].strInstructions + "<br>";
                    details += "<b>Ingredients: </b>" + "<br>";
                    if (response.drinks[0].strIngredient1 !== null) {
                         details += response.drinks[0].strIngredient1 + " ";
                         if(response.drinks[0].strMeasure1 !== null) {
                              details += response.drinks[0].strMeasure1 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[0].strIngredient2 !== null) {
                         details += response.drinks[0].strIngredient2 + " ";
                         if(response.drinks[0].strMeasure2 !== null) {
                              details += response.drinks[0].strMeasure2 + "<br>";
                         }else{details += "<br>"}    
                    };
                    if (response.drinks[0].strIngredient3 !== null) {
                         details += response.drinks[0].strIngredient3 + " ";
                         if(response.drinks[0].strMeasure3 !== null) {
                              details += response.drinks[0].strMeasure3 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[0].strIngredient4 !== null) {
                         details += response.drinks[0].strIngredient4 + " ";
                         if(response.drinks[0].strMeasure4 !== null) {
                              details += response.drinks[0].strMeasure4 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[0].strIngredient5 !== null) {
                         details += response.drinks[0].strIngredient5 + " ";
                         if(response.drinks[0].strMeasure5 !== null) {
                              details += response.drinks[0].strMeasure5 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[0].strIngredient6 !== null) {
                         details += response.drinks[0].strIngredient6 + " ";
                         if(response.drinks[0].strMeasure6 !== null) {
                              details += response.drinks[0].strMeasure6 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[0].strIngredient7 !== null) {
                         details += response.drinks[0].strIngredient7 + " ";
                         if(response.drinks[0].strMeasure7 !== null) {
                              details += response.drinks[0].strMeasure7 + "<br>";
                         }else{details += "<br>"}
                    };
                    if (response.drinks[0].strIngredient8 !== null) {
                         details += response.drinks[0].strIngredient8 + " ";
                         if(response.drinks[0].strMeasure8 !== null) {
                              details += response.drinks[0].strMeasure8 + "<br>";
                         }else{details += "<br>"}
                    };
                    //add details in paragraph id="text2"
                    $(".text2").html(details);
               });
          });
     });
});


