$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").keyup(function () {
    var value = 140 - $(this).val().length;

    $(this).parent().find("#counter").val(value);
    if (value < 0) {
      $(this).parent().find("#counter").css("color", "red");
    }
    if (value >= 0) {
      $(this).parent().find("#counter").css("color", "#545149");
    }
  });
});
