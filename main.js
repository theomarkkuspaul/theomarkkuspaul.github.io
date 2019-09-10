const LAST_IMAGE_ID = 101;

(() => {
  setHomepageImage();
  handleRefreshButtonClick();
})();

function handleRefreshButtonClick () {
  document.getElementById('refresh-button').addEventListener('click', event => {
    // Refresh the page
    window.location.reload();
  });
}

function setHomepageImage () {
  const urlParams = new URLSearchParams(window.location.search);

  let imageId;
  if (hasImageId(urlParams)) {
    imageId = fetchImageId(urlParams);

    // randomise image id
    // if image id in params
    // is greater than the last image id
    if (imageId > LAST_IMAGE_ID)
      imageId = randomiseImageId();
  } else
    imageId = randomiseImageId();

  const imagePath = `assets/images/${imageId}.jpg`;
  console.log('setting image:', imagePath);
}

function hasImageId (query) {
  return query.has('imageId');
}

function fetchImageId (query) {
  return query.get('imageId');
}

function randomiseImageId () {
  return Math.floor(Math.random() * LAST_IMAGE_ID) + 1;
}