$(document).ready(function() {
  $("#show-search-btn").click(function() {
    $(".index-search-wrapper").css("display", "block");
    $("#show-search-btn").css("display", "none");
  });

  $("#hide-search-btn").click(function() {
    $(".index-search-wrapper").css("display", "none");
    $("#show-search-btn").css("display", "block");
  });
});
