/* =============================================
   RED-FRONTED MACAW DONATION PAGE SCRIPTS
   Vanilla JavaScript - No external libraries
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive components
  initGalleryCarousel()
  initHideCarousel()
  initImpactCardsCarousel()
  initSmoothScroll()
  initScrollAnimations()
  initStatsCounter()
})

/* =============================================
   DONATION FORM FUNCTIONALITY
   ============================================= */
// Donation form functionality removed

/* =============================================
   GALLERY CAROUSEL FUNCTIONALITY
   ============================================= */
function initGalleryCarousel() {
  const carousels = document.querySelectorAll(".rfm-gallery-carousel")

  if (!carousels.length) return

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".rfm-gallery-track")
    const slides = carousel.querySelectorAll(".rfm-gallery-slide")
    const prevBtn = carousel.querySelector(".rfm-gallery-prev")
    const nextBtn = carousel.querySelector(".rfm-gallery-next")
    const dotsContainer = carousel.querySelector(".rfm-gallery-dots")

    if (!track || slides.length === 0 || !dotsContainer) return

    let currentSlide = 0
    const totalSlides = slides.length
    const dots = []

    slides.forEach((_, index) => {
      const dot = document.createElement("button")
      dot.classList.add("rfm-gallery-dot")
      if (index === 0) dot.classList.add("rfm-gallery-dot-active")
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`)
      dot.addEventListener("click", () => goToSlide(index))
      dotsContainer.appendChild(dot)
      dots.push(dot)
    })

    const goToSlide = (index) => {
      currentSlide = index
      track.style.transform = `translateX(-${currentSlide * 100}%)`
      updateDots()
    }

    const updateDots = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("rfm-gallery-dot-active", index === currentSlide)
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        goToSlide(currentSlide)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides
        goToSlide(currentSlide)
      })
    }

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

    const handleSwipe = () => {
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

    let autoplayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      goToSlide(currentSlide)
    }, 5000)

    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    carousel.addEventListener("mouseleave", () => {
      autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides
        goToSlide(currentSlide)
      }, 5000)
    })
  })
}

/* =============================================
   HIDE CAROUSEL FUNCTIONALITY
   ============================================= */
function initHideCarousel() {
  const carouselWrapper = document.querySelector(".rfm-hide-carousel-wrapper")
  if (!carouselWrapper) return

  const track = carouselWrapper.querySelector(".rfm-hide-carousel-track")
  const slides = carouselWrapper.querySelectorAll(".rfm-hide-carousel-slide")
  const prevBtn = carouselWrapper.querySelector(".rfm-hide-carousel-prev")
  const nextBtn = carouselWrapper.querySelector(".rfm-hide-carousel-next")
  const dotsContainer = carouselWrapper.querySelector(".rfm-hide-carousel-dots")

  if (!track || slides.length === 0) return

  let currentSlide = 0
  const totalSlides = slides.length
  const dots = []

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement("button")
      dot.classList.add("rfm-hide-carousel-dot")
      if (index === 0) dot.classList.add("rfm-hide-carousel-dot-active")
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`)
      dot.addEventListener("click", () => goToSlide(index))
      dotsContainer.appendChild(dot)
      dots.push(dot)
    })
  }

  const goToSlide = (index) => {
    currentSlide = index
    track.style.transform = `translateX(-${currentSlide * 100}%)`
    
    // Active slide effect
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add("active")
      } else {
        slide.classList.remove("active")
      }
    })

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("rfm-hide-carousel-dot-active", i === currentSlide)
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      goToSlide(currentSlide)
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides
      goToSlide(currentSlide)
    })
  }

  // Touch/swipe support
  let touchStartX = 0
  let touchEndX = 0

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    { passive: true }
  )

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    { passive: true }
  )

  const handleSwipe = () => {
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

  // Initialize first slide
  goToSlide(0)

  // Auto-play (optional)
  let autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides
    goToSlide(currentSlide)
  }, 6000)

  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval)
  })

  carouselWrapper.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      goToSlide(currentSlide)
    }, 6000)
  })
}

/* =============================================
   IMPACT CARDS CAROUSEL FUNCTIONALITY
   ============================================= */
function initImpactCardsCarousel() {
  const cardsWrapper = document.querySelector(".rfm-impact-cards-wrapper")
  if (!cardsWrapper) return

  const track = cardsWrapper.querySelector(".rfm-impact-cards-track")
  const cards = track.querySelectorAll(".rfm-impact-card-glass")
  
  if (!track || cards.length === 0) return
  
  // Only enable carousel on mobile/tablet
  if (window.innerWidth >= 1025) {
    return
  }

  let currentCard = 0
  const totalCards = cards.length

  const goToCard = (index) => {
    currentCard = index
    if (window.innerWidth < 1025) {
      const wrapperWidth = cardsWrapper.offsetWidth
      track.style.transform = `translateX(-${currentCard * wrapperWidth}px)`
    }
  }

  // Auto-play (slow)
  let autoplayInterval = setInterval(() => {
    currentCard = (currentCard + 1) % totalCards
    goToCard(currentCard)
  }, 6000) // 6 seconds - not too fast

  cardsWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval)
  })

  cardsWrapper.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(() => {
      currentCard = (currentCard + 1) % totalCards
      goToCard(currentCard)
    }, 6000)
  })

  // Touch/swipe support
  let touchStartX = 0
  let touchEndX = 0

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    { passive: true }
  )

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    { passive: true }
  )

  const handleSwipe = () => {
    const swipeThreshold = 50
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        currentCard = (currentCard + 1) % totalCards
      } else {
        currentCard = (currentCard - 1 + totalCards) % totalCards
      }
      goToCard(currentCard)
    }
  }

  // Initialize first card
  goToCard(0)
  
  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1025) {
      clearInterval(autoplayInterval)
      track.style.transform = "none"
    } else {
      goToCard(currentCard)
      autoplayInterval = setInterval(() => {
        currentCard = (currentCard + 1) % totalCards
        goToCard(currentCard)
      }, 6000)
    }
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

/* =============================================
   STATS COUNTER ANIMATION
   ============================================= */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".rfm-stat-number[data-target]")
  
  if (statNumbers.length === 0) return

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.hasAttribute("data-animated")) {
        entry.target.setAttribute("data-animated", "true")
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((statNumber) => {
    observer.observe(statNumber)
  })
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"))
  const prefix = element.getAttribute("data-prefix") || ""
  const suffix = element.getAttribute("data-suffix") || ""
  const format = element.getAttribute("data-format")
  
  const duration = 2000 // 2 seconds
  const startTime = performance.now()
  const startValue = 0

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    const currentValue = Math.floor(startValue + (target - startValue) * easeOut)
    
    let displayValue = currentValue
    
    if (format === "currency") {
      displayValue = currentValue.toLocaleString()
    } else {
      displayValue = currentValue.toLocaleString()
    }
    
    element.textContent = prefix + displayValue + suffix
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Ensure final value is exact
      let finalValue = target
      if (format === "currency") {
        finalValue = target.toLocaleString()
      } else {
        finalValue = target.toLocaleString()
      }
      element.textContent = prefix + finalValue + suffix
    }
  }
  
  requestAnimationFrame(animate)
}
