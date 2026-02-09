// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Hide loading bar
  setTimeout(() => {
    document.getElementById("loadingBar").style.display = "none";
  }, 800);

  // Hero app showcase swiper
  const heroShowcaseSwiper = new Swiper(".hero-showcase-swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 700,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });

  // Initialize gallery Swiper
  const gallerySwiper = new Swiper(".gallery-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
    },
  });

  // Thumbnail swiper
  const galleryThumbs = new Swiper(".gallery-thumbs", {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: false,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      640: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
    },
  });

  // Connect swipers
  gallerySwiper.controller.control = galleryThumbs;
  galleryThumbs.controller.control = gallerySwiper;

  // Click on thumbnail to slide to it
  document
    .querySelectorAll(".gallery-thumbs .swiper-slide")
    .forEach((slide, index) => {
      slide.addEventListener("click", () => {
        gallerySwiper.slideToLoop(index);
      });
    });

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      mobileMenu.style.display = "block";
      menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Back to top button
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove("opacity-0", "scale-0");
      backToTop.classList.add("opacity-100", "scale-100");
    } else {
      backToTop.classList.remove("opacity-100", "scale-100");
      backToTop.classList.add("opacity-0", "scale-0");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // FAQ toggle
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", function () {
      const answer = this.querySelector(".faq-answer");
      const icon = this.querySelector("i");

      if (answer.classList.contains("hidden")) {
        answer.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
      } else {
        answer.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu.style.display === "block") {
          mobileMenu.style.display = "none";
          menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    observer.observe(card);
  });

  // Add ripple effect to buttons
  document.querySelectorAll(".btn-primary").forEach((button) => {
    button.addEventListener("click", function (e) {
      // Remove any existing ripple
      const existingRipple = this.querySelector(".ripple");
      if (existingRipple) {
        existingRipple.remove();
      }

      // Create ripple
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.classList.add("ripple");
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)";

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple
  const style = document.createElement("style");
  style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(style);
});
