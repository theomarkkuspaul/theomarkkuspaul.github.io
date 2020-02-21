let recordPaused = true;
let recordHolding = false;
let currentRotation = 0;

let timerInterval;
let recordInterval;

const DELAY = 50;
// rotate record every 4.8 ms i.e. 45bpm
const RECORD_REPEAT_SPEED = 4.8;
const SONG_PATH = '/assets/audio/Deep\ &\ Rugged.m4a'

const song = new Howl({
  src: [SONG_PATH],
  html5: true,
  format: ['mp3', 'm4a']
});

function spinRecord () {
  recordInterval = setInterval(rotateRecord, RECORD_REPEAT_SPEED);
}

function handlePlayClick () {
  $('#play').click(function(e) {
    recordPaused = false;

    if (!song.playing())
      song.play();

    if (!recordInterval)
      spinRecord();

    timerInterval = setInterval(calculateTimer, DELAY)

    // toggle control button to prompt pause
    $(this).hide();
    $('#pause').show();
  });
}

function handlePauseClick () {
  $('#pause').click(function(e) {
    recordPaused = true;

    if (song.playing())
      song.pause();

    clearInterval(timerInterval);

    // toggle control button to prompt play
    $(this).hide();
    $('#play').show();
  });
}

function isSongLoaded () {
  return song.state() === 'loaded';
}

function calculateTimer () {
  const songPlayTime = typeof(song.seek()) === 'object' ? 0 : song.seek();
  let minutes = 0, seconds = Math.floor(songPlayTime);

  while (seconds >= 60) {
    minutes += 1;
    seconds -= 60;
  }

  if (minutes < 10)
    minutes = "0" + minutes;

  if (seconds < 10)
    seconds = "0" + seconds;

  const time = `${minutes}:${seconds}`;

  $('.timer').html(time);
}

function bindSongEvents () {
  song.on('load', () => {
    console.log("Song is loaded!");
  });

  song.on('end', songEvent => {
    clearInterval(timerInterval);
    clearInterval(recordInterval);
    timerInterval, recordInterval = false;
    $('#pause').hide();
    $('#play').show();
    $('.timer').html('fin.');
  });
}

function rotateRecord () {
  if (recordHolding)
    return;

  if (!isSongLoaded())
    return;

  if (!recordPaused) {
    currentRotation++;

    $('.record').css('transform','rotate(' + currentRotation + 'deg)');
  }
}

// Each 360 degree rotation represents aorund 0.85 - 1.5 seconds of song time
$(() => {
  spinRecord();
  bindSongEvents();
  handlePlayClick();
  handlePauseClick();
});