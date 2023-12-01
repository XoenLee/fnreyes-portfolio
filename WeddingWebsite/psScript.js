let currentImageIndex = 2;
const images = ['photos/9.JPG', 'photos/11.JPG', 'photos/12.JPG', 'photos/13.JPG', 'photos/16.JPG'];

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  document.getElementById('mainImage').src = images[currentImageIndex];
  updateThumbnails();
}

function previousImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  document.getElementById('mainImage').src = images[currentImageIndex];
  updateThumbnails();
}

function changeImage(thumbnail) {
  document.getElementById('mainImage').src = thumbnail.src;
  currentImageIndex = images.indexOf(thumbnail.src);
  updateThumbnails();
}

function updateThumbnails() {
  let thumbnails = document.getElementById('thumbnails').children;
  let offset = currentImageIndex - 1;
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].style.transform = `translateY(${-offset * 110}px)`;
  }
}
