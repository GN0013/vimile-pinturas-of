document.addEventListener("DOMContentLoaded", function() {
    const carouselEl = document.getElementById("portfolioCarousel");
    const carouselImages = document.querySelectorAll("#portfolioCarousel .carousel-item img");
    const expandedImage = document.getElementById("imagemExpandida");
    const modalEl = document.getElementById("imagemModal");
    const imagemModal = new bootstrap.Modal(modalEl);
    const prevBtn = document.getElementById("prevImg");
    const nextBtn = document.getElementById("nextImg");
    const thumbnails = document.querySelectorAll(".thumbnail");
    let currentIndex = 0;
    const imagesSrc = Array.from(carouselImages).map(img => img.src);
    function updateModalImage(index) {
        currentIndex = index;
        expandedImage.src = imagesSrc[index];
    }
    carouselImages.forEach((img, index) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function() {
            updateModalImage(index);
            imagemModal.show();
        });
    });
    prevBtn.addEventListener("click", function() {
        updateModalImage((currentIndex - 1 + imagesSrc.length) % imagesSrc.length);
    });
    nextBtn.addEventListener("click", function() {
        updateModalImage((currentIndex + 1) % imagesSrc.length);
    });
    document.addEventListener("keydown", function(event) {
        if (modalEl.classList.contains("show")) {
            if (event.key === "ArrowLeft") {
                prevBtn.click();
            } else if (event.key === "ArrowRight") {
                nextBtn.click();
            } else if (event.key === "Escape") {
                imagemModal.hide();
            }
        }
    });   
    function updateActiveThumbnail(index) {
        thumbnails.forEach(t => t.classList.remove("active"));
        thumbnails[index].classList.add("active");
    }
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function() {
            updateActiveThumbnail(index);
            const carousel = bootstrap.Carousel.getInstance(carouselEl);
            carousel.to(index);
        });
    }); 
    carouselEl.addEventListener("slide.bs.carousel", function(event) {
        updateActiveThumbnail(event.to);
    });
});
