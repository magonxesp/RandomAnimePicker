var blackList;
var animeList;
var timeoutms = 0;
var requestCount = 0;

// html elements
var _animeImg = document.getElementById("anime-img");
var _animeTitle = document.getElementById("anime-title");
var _animeTitleJp = document.getElementById("anime-title-jp");
var _synopsis = document.getElementById("synopsis");
var _loadingContainer = document.getElementById("loading-container");
var _animeContainer = document.getElementsByClassName("anime-container")[0];
var _ButtonsContainer = document.getElementsByClassName("buttons-container")[0];
var _episodes = document.getElementById("episodes");
var _duration = document.getElementById("duration");
var _premiered = document.getElementById("premiered");
var _status = document.getElementById("status");
var _score = document.getElementById("score");
var _genre = document.getElementById("genre");
var _MalButton = document.getElementById("myanimelistlink");

function getRandomId() {
  var id = 0;

  do {
    id = Math.floor(Math.random() * 33993 + 1);
  }while(blackList.includes(id));

  return id;
}

function showLoadAnimation() {
  _animeContainer.style.display = "none";
  _ButtonsContainer.style.display = "none";
  _loadingContainer.style.display = "flex";
}

function showAnime(anime) {
  // load anime data to html elements
  _animeImg.src = anime.image_url;
  _animeTitle.innerHTML = anime.title;
  _animeTitleJp.innerHTML = anime.title_japanese;
  _synopsis.innerHTML = anime.synopsis;
  _episodes.innerHTML = anime.episodes;
  _duration.innerHTML = anime.duration;
  _premiered.innerHTML = anime.premiered;
  _status.innerHTML = anime.status;
  _score.innerHTML = anime.score;

  var genresList = "";
  for(var i = 0; i < anime.genre.length; i++) {
    genresList += anime.genre[i].name + ', ';
  }

  // erase last ',' of this string
  genresList = genresList.substring(0, genresList.length - 2);
  _genre.innerHTML = genresList;

  _MalButton.href = anime.link_canonical;

  // change container and hide load animation
  _loadingContainer.style.display = "none";
  _animeContainer.style.display = "flex";
  _MalButton.style.display = "block";
  _ButtonsContainer.style.display = "flex";

  // set to 0 requestCount and timeoutms after show found anime
  requestCount = 0;
  timeoutms = 0;
}

function getRandomLocalAnime() {
  var index = 0;

  if(animeList.length > 0) {
    do {
      index = Math.floor(Math.random() * animeList.length);
    }while(index < 0 && index > animeList.length);

    showAnime(animeList[index]);
    return true;
  }

  return false;
}

function saveAnime(animeData) {
  animeList.push(animeData);
  localStorage.setItem("animelist", JSON.stringify(animeList));
}

function inAnimeList(id) {
  for(var i = 0; i < animeList.length; i++) {
    if(animeList[i].mal_id == id) {
      return animeList[i];
    }
  }

  return false;
}

function toBlackList(animeId) {
  blackList.push(animeId);
  localStorage.setItem("blacklist", JSON.stringify(blackList));
}

function catchAnime(animeData) {
  if(animeData.type == "TV") {
    saveAnime(animeData);
    showAnime(animeData);
  } else {
    toBlackList(animeData.mal_id);
    getRandomAnime();
  }
}

function fetchAnime(animeId) {
  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == 4) {
      catchAnime(this.response);
    }
    else if(this.status == 404 && this.readyState == 4) {
      toBlackList(animeId);

      if(requestCount > 10) {
        if(getRandomLocalAnime()) {
          return false;
        }
      }
      if(requestCount > 5) {
        timeoutms += 500;
      }

      setTimeout(getRandomAnime, timeoutms);
      requestCount++;
    }
    else if(this.status == 429 && this.readyState == 4) {
      getRandomLocalAnime();
    }
  }

  ajax.responseType = "json";
  ajax.open("GET", "https://api.jikan.me/anime/" + animeId, true);
  ajax.send();
}

function getRandomAnime() {
  showLoadAnimation();
  var id = getRandomId();
  var animeData;

  if((animeData = inAnimeList(id)) != false) {
    showAnime(animeData);
    return false;
  }

  fetchAnime(id);
}

window.onload = function() {
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
}

var _pickRandomAnimeButton = document.getElementById("pickRandomAnimeBtn");

_pickRandomAnimeButton.onclick = getRandomAnime;
