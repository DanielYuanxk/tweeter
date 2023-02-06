/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// rendering new tweet object for data at /tweeter
const createTweetElement = function (tweetObj) {
  const $tweet = $(`<article>
            <header>
              <div>
                <img src=${tweetObj.user.avatars}>
                <span>${tweetObj.user.name}</span>
              </div>
              <div><span>${tweetObj.user.handle}</span></div>
            </header>
          
           <div class="tweetText">
           ${$("<p>").text(tweetObj.content.text).html()}
             </div>
            
             <footer>
              <span>${timeago.format(tweetObj.created_at)}</span>
              <div class="logos">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`);
  return $tweet;
};
//generating new tweets after they are successfully posted to the /tweeter page
const renderTweets = function (tweetArray) {
  for (let tweet of tweetArray) {
    const newTweet = createTweetElement(tweet);

    $("#tweetPost").append(newTweet);
  }
};

$(() => {
  //load the rendered tweets
  const loadTweets = function () {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  };
  loadTweets();
  // fetching tweets
  const refatchTweets = function () {
    $.get("/tweets", function (data) {
      const newTweet = createTweetElement(data[data.length - 1]);
      $("#tweetPost").prepend(newTweet);
    });
  };
  //events to occur on submit
  $("#tweet-box").submit(function (event) {
    //check for errors and give warnig when tweet characters exceed 140
    //and when no characters at all.
    if ($("#tweet-text").val().length > 140) {
      $("#warning").slideDown();
      event.preventDefault();
    } else if (
      !$("#tweet-text").val() ||
      $("#tweet-text").val() === "" ||
      $("#tweet-text").val() === null
    ) {
      $("#warning2").slideDown();
      event.preventDefault();
    } else {
      event.preventDefault();
      $("#warning").slideUp();
      $("#warning2").slideUp();
      //converts text into javascript string
      const serialData = $("#tweet-text").serialize();
      // posting user input to /tweets
      $.post("/tweets", serialData, function (data) {
        //reseting text-box to new
        $("#tweet-text").val("");
        //reseting character counter to 140
        $("#counter").text("140");
        refatchTweets();
      });
    }
  });
  $("#warning").hide();
  $("#warning2").hide();
}); // to
