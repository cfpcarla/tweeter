// const escape = function (str) {
//   let div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };
const createTweetElement = function (tweet) {
  let $tweet = $('<article>').addClass('tweet');

  $tweet.append(
    `<header>
      <img class= "image" src=${tweet.user.avatars}>
      <h5 class= "name">${tweet.user.name}</h5>
      <h5 class="handle">${tweet.user.handle}</h5>
      </header>
      <p class= "text">${tweet.content.text} </p>
      <footer class="footer">
      </footer></article>`
  );
  return $tweet.append();
};

const renderTweets = function (tweets) {
  tweets.sort((a, b) => a.created_at < b.created_at);
  let container = $(".tweets-container");
  for (let item of tweets) {
    let callTweetElement = createTweetElement(item);
    container.append(callTweetElement);
  }
};

$(document).ready(function () {
  let clicks = 0;
  $("#span-button").click(function() {
    if (clicks % 2 === 0) {
      $('.new-tweet').slideUp();
      clicks++;
    } else {
      $('.new-tweet').slideDown();
      $('#textarea').focus();
      clicks++;
    }
  });


  const loadTweets = function () {
    //Ajax Function to send a get request
    $.ajax({
      type: "GET",
      url: '/tweets',
      success: (response) => {
        console.log('response');
        renderTweets(response);
      },
    });
  };
  loadTweets();


  // Attach a submit handler to the form
  $("#form").submit(function (event) {
    // Stop form from submitting normally
    event.preventDefault();

    if ($('textarea').val().length === 0) {
      alert("Error.");
    } else if ($('textarea').val().length > 140) {
      alert("too long!");

    } else {
      // Send the data using post
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize(),
        success: function (response) {
          console.log('response', response);
          renderTweets([{
            user: {
              name: 'andrew',
              avatars: 'or something',
              handle: 'so good!'
            },
            content: {
              text: $('#textarea').val()
            }
          }]);
          $('#textarea').val('');
        },
      });
    }
  });
});







