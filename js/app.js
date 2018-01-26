var blackList;
var animeList;
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

function getRandomLocalAnime() {
  var index = 0;

  do {
    index = Math.floor(Math.random() * animeList.length);
  }while(index < 0 && index > animeList.length);

  return animeList[index];
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
        animeList.push(data);
        localStorage.setItem("animelist", JSON.stringify(animeList));
      } else {
        blackList.push(id);
        localStorage.setItem("blacklist", JSON.stringify(blackList));
        getRandomAnime();
      }
    },
    error: function(response) {
      if(response.status == 429) {
        var data = getRandomLocalAnime();
        showAnime(data);
        console.log("Anime local escogido");
        return false;
      }

      if(response.status == 404) {
        requestCount++;

        if(requestCount >= 15) {
          timeoutms += 1000;
        }
      }

      blackList.push(id);
      localStorage.setItem("blacklist", JSON.stringify(blackList));
      setTimeout(getRandomAnime, timeoutms);
    }
  });
}

$(document).ready(function(){
  var localBlackListData = localStorage.getItem("blacklist");
  var localAnimeData = localStorage.getItem("animelist");

  if(localBlackListData != null) {
    blackList = JSON.parse(localBlackListData);
  } else {
    blackList = [];
  }

  if(localAnimeData != null) {
    animeList = JSON.parse(localAnimeData);
  } else {
    animeList = [];
  }

  $('#loading-container').hide();
  $('#anime-container').hide();

  $('#pickRandomAnimeBtn').on('click', getRandomAnime);
});
