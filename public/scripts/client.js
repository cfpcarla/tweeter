const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  let $tweet = $('<article>').addClass('tweet');
  let daysAgo = new Date();
  let today = daysAgo.getTime();
  let result = Math.round((today - tweet.created_at) / 86400000);

  $tweet.append(
    `<header>
      <img class="profile" src=${escape(tweet.user.avatars)}>
      <h5 class= "name">${(tweet.user.name)}</h5>
      <h5 class="handle">${(tweet.user.handle)}</h5>
      </header>
      <p class= "text">${escape(tweet.content.text)} </p>
      <footer id="footer">
      <span>${(result)}Days ago</span>
      <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </div>
      </footer></article>`
  );
  return $tweet.append();
};

const renderTweets = function(tweets) {
  tweets.sort((a, b) => a.created_at < b.created_at);
  let container = $(".tweets-container");
  for (let item of tweets) {
    let callTweetElement = createTweetElement(item);
    container.prepend(callTweetElement);
  }
};

$(document).ready(function() {
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

  const loadTweets = function() {
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
      $('#form-error #content').text("Write somenthing.");
      $("#form-error").slideDown();
    } else if ($('textarea').val().length > 140) {
      $('#form-error #content').text("Tweet too long.");
      $("#form-error").slideDown();
    } else {
      $("#form-error").slideUp();
      // Send the data using post
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize(),
        success: function (response) {
          console.log('response', response);
          loadTweets();
          $('#textarea').val('');
        },
      });
    }
  });
});
