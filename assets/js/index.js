$(document).ready(function () {

     $("#searchBtn").on("click", function (){
          event.preventDefault();
          var searchInput = $("#searchInput").val();
          sessionStorage.setItem("search", searchInput);
          window.location = "./searchResult.html";
      });    

});