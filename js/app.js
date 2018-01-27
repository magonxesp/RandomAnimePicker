var blackList;
var animeList;
var timeoutms = 0;
var requestCount = 0;
// html elements
var _animeImg;
var _animeTitle;
var _animeTitleJp;
var _synopsis;
var _loadingContainer;
var _animeContainer;
var _buttonsContainer;
var _episodes;
var _duration;
var _premiered;
var _status;
var _score;
var _genre;
var _ButtonsContainer;
var _MalButton;

function getRandomId() {
  var id = 0;

  do {
    id = Math.floor(Math.random() * 33993 + 1);
  }while($.inArray(id, blackList) != -1);

  return id;
}

function showLoadAnimation() {
  _animeContainer.hide();
  _loadingContainer.show();
  _ButtonsContainer.hide();
}

function showAnime(anime) {
  // load anime data to html elements
  _animeImg.attr("src", anime.image_url);
  _animeTitle.text(anime.title);
  _animeTitleJp.text(anime.title_japanese);
  _synopsis.html(anime.synopsis);
  _episodes.text(anime.episodes);
  _duration.text(anime.duration);
  _premiered.text(anime.premiered);
  _status.text(anime.status);
  _score.text(anime.score);

  var genresList = "";
  for(var i = 0; i < anime.genre.length; i++) {
    genresList += anime.genre[i].name + ', ';
  }

  // erase last ',' of this string
  genresList = genresList.substring(0, genresList.length - 2);
  _genre.text(genresList);

  _MalButton.attr('href', anime.link_canonical);

  // change container
  _loadingContainer.hide();
  _animeContainer.show();
  _MalButton.show();
  _ButtonsContainer.show();
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
  _animeContainer = $('.anime-container');
  _loadingContainer = $('#loading-container');
  _buttonsContainer = $('.buttons-container');
  _synopsis = $('#synopsis');
  _animeTitleJp = $('#anime-title-jp');
  _animeTitle = $('#anime-title');
  _animeImg = $('#anime-img');
  _episodes = $('#episodes');
  _duration = $('#duration');
  _premiered = $('#premiered');
  _status = $('#status');
  _score = $('#score');
  _genre = $('#genre');
  _MalButton = $('#myanimelistlink');
  _ButtonsContainer = $('.buttons-container');

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

  _loadingContainer.hide();
  _animeContainer.hide();
  _MalButton.hide();

  $('#pickRandomAnimeBtn').on('click', getRandomAnime);
});
