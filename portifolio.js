document.addEventListener("DOMContentLoaded", function() {
    // Cache de elementos DOM para melhor performance
    const carouselEl = document.getElementById("portfolioCarousel");
    const carouselImages = document.querySelectorAll("#portfolioCarousel .carousel-item img");
    const expandedImage = document.getElementById("imagemExpandida");
    const modalEl = document.getElementById("imagemModal");
    const imagemModal = new bootstrap.Modal(modalEl);
    const prevBtn = document.getElementById("prevImg");
    const nextBtn = document.getElementById("nextImg");
    const thumbnails = document.querySelectorAll(".thumbnail");
    
    // Armazena o índice atual e todos os caminhos de imagem
    let currentIndex = 0;
    const imagesSrc = Array.from(carouselImages).map(img => img.src);

    // Função para atualizar a imagem modal
    function updateModalImage(index) {
        currentIndex = index;
        expandedImage.src = imagesSrc[index];
    }
    
    // Configurar imagens do carrossel
    carouselImages.forEach((img, index) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function() {
            updateModalImage(index);
            imagemModal.show();
        });
    });
    
    // Navegação no modal com botões
    prevBtn.addEventListener("click", function() {
        updateModalImage((currentIndex - 1 + imagesSrc.length) % imagesSrc.length);
    });
    
    nextBtn.addEventListener("click", function() {
        updateModalImage((currentIndex + 1) % imagesSrc.length);
    });
    
    // Navegação com teclado para acessibilidade
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
    
    // Função para atualizar thumbnails ativas
    function updateActiveThumbnail(index) {
        thumbnails.forEach(t => t.classList.remove("active"));
        thumbnails[index].classList.add("active");
    }
    
    // Controle das thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function() {
            updateActiveThumbnail(index);
            const carousel = bootstrap.Carousel.getInstance(carouselEl);
            carousel.to(index);
        });
    });
    
    // Sincronizar thumbnail ativa com carrossel
    carouselEl.addEventListener("slide.bs.carousel", function(event) {
        updateActiveThumbnail(event.to);
    });
});