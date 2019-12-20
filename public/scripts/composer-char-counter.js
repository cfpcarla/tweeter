$(document).ready(function() {
  let maximumCharacters = 140;
  $('textarea').keyup(function() {
    const length = $(this).val().length;
    const result = (maximumCharacters - length);
    $('#counter').text(result);
    console.log(result);
    if (result < 0) {
      $('#counter').css("color", "red");
    } else {
      $('#counter').css("color", "black");
    }
  });
});