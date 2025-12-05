/* =============================================
   RED-FRONTED MACAW DONATION PAGE SCRIPTS
   Vanilla JavaScript - No external libraries
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive components
  initGalleryCarousel()
  initSmoothScroll()
  initScrollAnimations()
})

/* =============================================
   DONATION FORM FUNCTIONALITY
   ============================================= */
// Donation form functionality removed

/* =============================================
   GALLERY CAROUSEL FUNCTIONALITY
   ============================================= */
function initGalleryCarousel() {
  const track = document.querySelector(".rfm-gallery-track")
  const slides = document.querySelectorAll(".rfm-gallery-slide")
  const prevBtn = document.querySelector(".rfm-gallery-prev")
  const nextBtn = document.querySelector(".rfm-gallery-next")
  const dotsContainer = document.querySelector(".rfm-gallery-dots")

  if (!track || slides.length === 0) return

  let currentSlide = 0
  const totalSlides = slides.length

  // Create dot indicators
  slides.forEach((_, index) => {
    const dot = document.createElement("button")
    dot.classList.add("rfm-gallery-dot")
    if (index === 0) dot.classList.add("rfm-gallery-dot-active")
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`)
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })

  const dots = document.querySelectorAll(".rfm-gallery-dot")

  // Navigate to specific slide
  function goToSlide(index) {
    currentSlide = index
    track.style.transform = `translateX(-${currentSlide * 100}%)`
    updateDots()
  }

  // Update dot indicators
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("rfm-gallery-dot-active", index === currentSlide)
    })
  }

  // Previous slide button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      goToSlide(currentSlide)
    })
  }

  // Next slide button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides
      goToSlide(currentSlide)
    })
  }

  // Touch/swipe support for mobile
  let touchStartX = 0
  let touchEndX = 0

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    { passive: true },
  )

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    { passive: true },
  )

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        currentSlide = (currentSlide + 1) % totalSlides
      } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      }
      goToSlide(currentSlide)
    }
  }

  // Auto-advance carousel every 5 seconds
  let autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides
    goToSlide(currentSlide)
  }, 5000)

  // Pause autoplay on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval)
  })

  track.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      goToSlide(currentSlide)
    }, 5000)
  })
}

/* =============================================
   ACCORDION FUNCTIONALITY
   ============================================= */
// Accordion functionality removed

/* =============================================
   SMOOTH SCROLL FUNCTIONALITY
   ============================================= */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

/* =============================================
   SCROLL ANIMATIONS FUNCTIONALITY
   ============================================= */
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(
    ".rfm-content-card-glass, .rfm-stat-card-glass, .rfm-impact-card-glass, .rfm-tangible-impact-glass, .rfm-connect-link-glass",
  )

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Set initial state and observe elements
  animateElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(element)
  })
}
