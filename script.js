function handleSliderClicks(sliders) {
    sliders.forEach(slider => {
        const sliderImages = slider.querySelectorAll('.image-container');

        sliderImages.forEach(image => {
            image.addEventListener("click", () => {
                if (!image.classList.contains('active')) {
                // Get the selected image.
                const selectedImage = slider.querySelector('.active');

                // If there is a selected image, remove the active and square classes,
                // add the oblong class, and show the overlay.
                if (selectedImage) {
                    selectedImage.classList.remove('active', 'square');
                    selectedImage.classList.add('oblong');
                    selectedImage.querySelector('.image-overlay').style.opacity = 1;
                    selectedImage.querySelector('.overlay-logo').style.display = 'block';
                    selectedImage.querySelector('.overlay-text').style.display = 'block';
                    selectedImage.querySelector('.image-original').style.visibility = 'hidden';
                }

                // Add the active and square classes, and hide the overlay.
                image.classList.remove('oblong');
                image.classList.add('active', 'square');
                image.querySelector('.image-overlay').style.opacity = 0;
                image.querySelector('.overlay-text').style.display = 'block';
                image.querySelector('.overlay-logo').style.display = 'block';
                image.querySelector('.image-original').style.visibility = 'visible';
                }
            });
        });
    });
}

    // Get all of the sliders.
const sliders = document.querySelectorAll('.slider');

    // Call the handleSliderClicks function with the sliders.
handleSliderClicks(sliders);

//section gallery nav

const projectCategories = [
    {
        navButtonsSelector: ".project-categ-1 .client-nav-container a",
        sectionSelector: "#section-gallery-1, #section-gallery-2, #section-gallery-3",
        activeClass: "active",
    },
    {
        navButtonsSelector: ".project-categ-2 .client-nav-container a",
        sectionSelector: "#section-gallery-4, #section-gallery-5, #section-gallery-6",
        activeClass: "active",
    },
    {
        navButtonsSelector: ".project-categ-3 .client-nav-container a",
        sectionSelector: "#section-gallery-7, #section-gallery-8, #section-gallery-9",
        activeClass: "active",
    },
];

createNavGalleries(projectCategories);

function createNavGalleries(projectCategories) {
    projectCategories.forEach((category) => {
        const navButtonsSelector = category.navButtonsSelector;
        const sectionSelector = category.sectionSelector;
        const activeClass = category.activeClass;

        const navButtons = document.querySelectorAll(navButtonsSelector);
        const sections = document.querySelectorAll(sectionSelector);

        navButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Hide all of the sections.
            sections.forEach((section) => {
            section.classList.remove("section-visible");
            });

            // Show the active section.
            sections[index].classList.add("section-visible");

            // Add the active class to the active button.
            navButtons.forEach((otherButton) => {
            otherButton.classList.remove(activeClass);
            });

            button.classList.add(activeClass);
        });
        });
    });
}

// parallax

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        el.style.transform = `translateX(calc(-50% - ${xValue * speedx}px)) translateY(calc(-50% - ${yValue * speedy}px))`;
    })
})

function sendEmail(emailAddress) {
    window.location.href = 'mailto:' + emailAddress;
}

// function smoothScroll(target) {
//     var targetAnchor = document.querySelector(target);
//     if (targetAnchor) {

//       // Get the offset of the target anchor element.
//         var targetOffset = targetAnchor.getBoundingClientRect().top;

//       // Scroll to the target anchor element smoothly.
//         window.scrollTo({
//         top: targetOffset,
//         behavior: 'smooth',
//         duration: 8000
//         });
//     }
// }