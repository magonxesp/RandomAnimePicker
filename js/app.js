var blackList;
var timeoutms = 0;
var requestCount = 0;

function getRandomId() {
  var id = 0;

  do {
    id = Math.floor(Math.random() * 33993 + 1);
  }while($.inArray(id, blackList) != -1);

  return id;
}

function showLoadAnimation() {
  $('#anime-container').hide();
  $('#pickRandomAnimeBtn').hide();
  $('#loading-container').show();
}

function showAnime(anime) {
  $('#anime-img').attr("src", anime.image_url);
  $('#anime-title').text(anime.title);
  $('#anime-title-jp').text(anime.title_japanese);
  $('#synopsis').html(anime.synopsis);
  $('#loading-container').hide();
  $('#anime-container').show();
  $('#pickRandomAnimeBtn').show();
}

function getRandomAnime() {
  var id = getRandomId();

  $.ajax({
    url: 'https://api.jikan.me/anime/' + id,
    method: 'GET',
    dataType: 'JSON',
    beforeSend: function() {
      showLoadAnimation();
    },
    success: function(data) {
      if(data.type == "TV") {
        showAnime(data);
        timeoutms = 0;
        requestCount = 0;
      } else {
        blackList.push(id);
        localStorage.setItem("blacklist", JSON.stringify(blackList));
        getRandomAnime();
      }
    },
    error: function(response) {
      if(response.status == 429) {
        timeoutms += 1000;
      }

      if(response.status == 404) {
        requestCount++;

        if(requestCount >= 15) {
          timeoutms += 1000;

          if(timeoutms >= 30000) {
            timeoutms = 0;
          }
        }
      }

      blackList.push(id);
      localStorage.setItem("blacklist", JSON.stringify(blackList));
      setTimeout(getRandomAnime, timeoutms);
    }
  });
}

$(document).ready(function(){
  var localData = localStorage.getItem("blacklist");

  if(localData != null) {
    blackList = JSON.parse(localData);
  } else {
    blackList = [];
  }

  $('#loading-container').hide();
  $('#anime-container').hide();

  $('#pickRandomAnimeBtn').on('click', getRandomAnime);
});
