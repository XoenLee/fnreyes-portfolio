document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarLinks = document.getElementById('navbar-links');

    toggleButton.addEventListener('click', function () {
        navbarLinks.style.display = navbarLinks.style.display === 'none' || navbarLinks.style.display === '' ? 'flex' : 'none';
    });
});

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active

        // Reset the interval timer
        clearInterval(intervalId);
        autoPlay();
    })
})

function autoPlay() {
    const slidesContainer = document.querySelector("[data-carousel] [data-slides]")

    intervalId = setInterval(() => {
        const activeSlide = slidesContainer.querySelector("[data-active]")
        const newIndex = [...slidesContainer.children].indexOf(activeSlide) + 1

        if (newIndex < slidesContainer.children.length) {
            slidesContainer.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active
        } else {
            slidesContainer.children[0].dataset.active = true
            delete activeSlide.dataset.active
        }
    }, 5000); // Change the interval as needed (currently set to 5000 milliseconds or 5 seconds)
}

autoPlay();

// countdown
//

// Set the date we're counting down to
const countDownDate = new Date("Feb 23, 2024 23:59:59").getTime();

// Update the countdown every 1 second
const x = setInterval(function() {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time
  const distance = countDownDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the HTML elements with the calculated values
  document.querySelector('.clock-day').innerHTML = days;
  document.querySelector('.clock-hours').innerHTML = hours;
  document.querySelector('.clock-minutes').innerHTML = minutes;
  document.querySelector('.clock-seconds').innerHTML = seconds;

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(x);
    document.querySelector('.clock-container').innerHTML = "EXPIRED";
  }
}, 1000);