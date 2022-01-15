const videoEl = document.querySelector(".player__video");
const playButtonEl = document.querySelector(".player__button");
const volumeEl = document.querySelector('[name="volume"]');
const playbackRateEl = document.querySelector('[name="playbackRate"]');
const progressBarEl = document.querySelector(".progress__filled");
const progressEl = document.querySelector(".progress");
const skip10BackEl = document.querySelector('[data-skip="-10"]');
const skip25ForwardEl = document.querySelector('[data-skip="25"]');

volumeEl.addEventListener("input", handleVolumeChange);
playbackRateEl.addEventListener("input", handlePlaybackRateChange);
skip10BackEl.addEventListener("click", handleSkip);
skip25ForwardEl.addEventListener("click", handleSkip);
playButtonEl.addEventListener("click", handlePlay);
videoEl.addEventListener("click", handlePlay);
videoEl.addEventListener("timeupdate", handleTimeUpdate);
videoEl.addEventListener("loadeddata", handleVideoLoaded);

let isDragging = false;
progressEl.addEventListener("click", handleProgressClick);
progressEl.addEventListener("mousemove", (e) => {
  if (isDragging) handleProgressClick(e);
});
progressEl.addEventListener("mousedown", () => (isDragging = true));
progressEl.addEventListener("mouseup", () => (isDragging = false));

let duration;

function handleVideoLoaded(e) {
  duration = Number(videoEl.duration);
  progressBarEl.style.flexBasis = "0%";
  videoEl.volume = volumeEl.value;
  videoEl.playbackRate = playbackRateEl.value;
}

function handlePlay() {
  if (videoEl.paused) {
    videoEl.play();
  } else {
    videoEl.pause();
  }
}

function handleProgressClick(e) {
  console.log("scrub");
  const percent = e.offsetX / e.currentTarget.clientWidth;
  videoEl.currentTime = duration * percent;
  if (!videoEl.paused) {
    videoEl.play();
  }
}

function handleVolumeChange(e) {
  const volume = e.currentTarget.value;
  videoEl.volume = volume;
}

function handlePlaybackRateChange(e) {
  const playbackRate = e.currentTarget.value;
  videoEl.playbackRate = playbackRate;
}

function handleSkip(e) {
  const amount = Number(e.currentTarget.dataset.skip);
  videoEl.currentTime = videoEl.currentTime + amount;
}

function handleTimeUpdate(e) {
  const time = e.currentTarget.currentTime;
  const progress = Math.round((time / duration + Number.EPSILON) * 100);
  progressBarEl.style.flexBasis = `${progress}%`;
}
