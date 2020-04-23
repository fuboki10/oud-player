var counter = 0;
let token = `Bearer ${localStorage.getItem("token")}`;
let player;
let queue;

axios.defaults.headers.common['authorization'] = token;

const addToQueue = (track) => {
  const ul = $("#queue").find("#queue-list")[0];
  const li = document.createElement("li");
  axios.get(`https://oud-zerobase.me/api/v1/tracks/${track}`)
    .then(res => {
      console.log(res);
      const track = res.data;
      console.log(track);
      li.appendChild(document.createTextNode(track.name));
      ul.appendChild(li);
      queue.push(track);
    })
    .catch(err => console.log(err.response));
};

const getQueue = () => {
  axios.get('https://oud-zerobase.me/api/v1/me/queue')
    .then(res => {
      console.log(res);
      const tracks = res.data.tracks;
      queue = [];
      const ul = $("#queue").find("#queue-list")[0];
      console.log(ul);
      for (let i = 0; i < tracks.length; i++) {
        addToQueue(tracks[i]);
      }

    })
    .catch(err => console.log(err.response));
};

const getPlayer = () => {
  axios.get('https://oud-zerobase.me/api/v1/me/player')
    .then(res => {
      if (res.status === 200) {
        player = res.data.player;
        console.log(player);
        if (player.item && player.item.audioUrl) {
          $("#player")[0].src = player.item.audioUrl;
          $("#player")[0].load();
          $("#song-name").html(`${player.item.name}`);
          $("#song-img").attr("src", `https://oud-zerobase.me/api/${player.item.album.image}`);
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
          $("#player")[0].src = player.item.audioUrl;
          $("#player")[0].load();
          $("#song-name").html(`${player.item.name}`);
          $("#song-img").attr("src", `https://oud-zerobase.me/api/${player.item.album.image}`);
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
  getQueue();

  $("#play-btn").click(() => $("#player")[0].play());
  $("#pause-btn").click(() => $("#player")[0].pause());

  $("#next-btn").click(() => goNext());
  $("#previous-btn").click(() => goPrevious());

});