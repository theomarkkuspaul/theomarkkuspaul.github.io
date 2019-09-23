
(function () {
  const perPage = 400;
  const FLICKR_ENDPOINT = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=2851eb1530eb2b115c64c1577418dfa6&user_id=183854656%40N05&format=json&nojsoncallback=1&per_page=${perPage}`;

  fetch(FLICKR_ENDPOINT)
  .then(resp => {
    return resp.json()
  }).then(data => {
    const photoCount = parseInt(data.photos.total);

    const photo = data.photos.photo[randomisePhoto(photoCount)];

    const farmId = photo.farm;
    const serverId = photo.server;
    const photoId = photo.id;
    const secret = photo.secret;

    const photoEndpoint = constructPhotoFlickrEndpoint(farmId, serverId, photoId, secret);

    document.getElementsByTagName('html')[0].style.background = `url("${photoEndpoint}") no-repeat center fixed`;
  });
})();

function randomisePhoto (count) {
  return Math.floor(Math.random() * count);
}

function constructPhotoFlickrEndpoint (farmId, serverId, photoId, secret) {
  const photoSize = '_b' // large
  return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + photoId + '_' + secret + photoSize + '.jpg';
}