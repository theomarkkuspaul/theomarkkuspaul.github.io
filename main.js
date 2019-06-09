
(() => {
  setHomepageImage();
})();


function setHomepageImage () {
  const LAST_IMAGE_ID = 20;

  const imageId = Math.floor(Math.random() * LAST_IMAGE_ID) + 1
  const imagePath = `assets/images/${imageId}.jpg`;
  console.log('setting image:', imagePath);
  document.getElementsByTagName('html')[0].style.background = `linear-gradient(rgba(0,227,183, 0.15), rgba(0,227,183, 0.15)), url("${imagePath}") no-repeat center fixed`; 
}