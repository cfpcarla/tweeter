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

// Some common checks are that data is not empty ("", or null), and in the case of Tweeter, you can also validate the maximum message length.