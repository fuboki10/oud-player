let token = `Bearer ${localStorage.getItem("token")}`;
let player;
let queue;

let song = new Audio();

axios.defaults.headers.common['authorization'] = token;

function playOrPauseSong() {
  if (song.paused) {
    song.play();
    $("#play img").attr("src", "Pause.png");
  } else {
    song.pause();
    $("#play img").attr("src", "Play.png");
  }
}

function next() {
  goNext();
};

function pre() {
  goPrevious();
};

function secondsToTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = ((seconds % 60)).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

song.addEventListener('timeupdate', function () {

  var position = song.currentTime / song.duration;

  $("#fill")[0].style.width = position * 100 + '%';
  $("#duration")[0].innerHTML = secondsToTime(song.currentTime);
});

song.addEventListener('canplaythrough', function () {
  $("#total-duration")[0].innerHTML = secondsToTime(song.duration);
});

const getPlayer = () => {
  axios.get('https://oud-zerobase.me/api/v1/me/player')
    .then(res => {
      if (res.status === 200) {
        player = res.data.player;
        console.log(player);
        if (player.item && player.item.audioUrl) {
          song.src = player.item.audioUrl;
          console.log($("#songTitle")[0].innerHTML);
          $("#songTitle")[0].innerHTML = player.item.name;
          $("#image img").attr("src", `https://oud-zerobase.me/api/${player.item.album.image}`);
          $("#bg img").attr("src", `https://oud-zerobase.me/api/${player.item.album.image}`);
        }
      }
    })
    .catch(err => console.log(err.response));
};

const getCurrentlyPlaying = () => {
  axios.get('https://oud-zerobase.me/api/v1/me/player/currently-playing')
    .then(res => {
      if (res.status === 200) {
        player.item = res.data.track;
        console.log(player);
        if (player.item && player.item.audioUrl) {
          song.src = player.item.audioUrl;
          song.play();
          $("#play img").attr("src", "Pause.png");
          $("#songTitle")[0].innerHTML = player.item.name;
          $("#image img").attr("src", `https://oud-zerobase.me/api/${player.item.album.image}`);
          $("#bg img").attr("src", `https://oud-zerobase.me/api/${player.item.album.image}`);
        }
      }
    })
    .catch(err => console.log(err.response));
};

const goNext = () => {
  axios.post('https://oud-zerobase.me/api/v1/me/player/next')
    .then(res => {
      getCurrentlyPlaying();
    })
    .catch(err => console.log(err.response));
};

const goPrevious = () => {
  axios.post('https://oud-zerobase.me/api/v1/me/player/previous')
    .then(res => {
      getCurrentlyPlaying();
    })
    .catch(err => console.log(err.response));
};


$(() => {

  getPlayer();
});


