document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
// Hero Content Animation (Only if the .hero-content exists)
if (document.querySelector(".hero-content")) {
  gsap.from(".hero-content", {
    y: 50,               // Start 50px below
    duration: 2,         // Duration of the animation (2 seconds)
    ease: "power2.out",  // Smooth easing
    stagger: 0.1,        // Stagger effect for multiple elements
  });
}
// Second Section Animation (Images & Text Animate Separately)
if (document.querySelector(".image-box")) {
  gsap.from(".image-box", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".image-box",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}
if (document.querySelector(".section-heading, .section-text")) {
  gsap.from(".section-heading, .section-text", {
    opacity: 0,
    x: -50,
    duration: 1.2,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".section-heading",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}
// Third Section (Cards Animate Separately)
if (document.querySelector(".service-card")) {
  gsap.from(".service-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".service-card",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
}
// Call to Action Button (Pulse Effect)
if (document.querySelector(".cta-button")) {
  gsap.to(".cta-button", {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    duration: 0.8,
    ease: "power1.inOut"
  });
}
// Animate Pricing Cards on Scroll
if (document.querySelector(".pricing-card")) {
  gsap.from(".pricing-card", {
    opacity: 0,
    y: 50, // Move up from below
    duration: 1,
    stagger: 0.2, // Delay between cards
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".pricing-card",
      start: "top 85%", // Trigger when the card is in the viewport
      toggleActions: "play none none none",
    },
  });
}
// Animate List Items inside Pricing Cards
document.querySelectorAll(".pricing-card ul").forEach((ul) => {
  if (ul.children.length > 0) {
    gsap.from(ul.children, {
      opacity: 0,
      x: -30, // Slide from left
      duration: 0.6,
      stagger: 0.15, // Each list item appears one after another
      ease: "power2.out",
      scrollTrigger: {
        trigger: ul,
        start: "top 90%", // Trigger animation when list enters viewport
        toggleActions: "play none none none",
      },
    });
  }
});
// 🟢 Animate "Choose Plan" Buttons (Only if .choose-plan-btn exists)
if (document.querySelector(".choose-plan-btn")) {
  gsap.from(".choose-plan-btn", {
    opacity: 0,
    y: 20, // Slide-up effect
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".choose-plan-btn",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
  // 🟢 Smooth Hover Effect on Buttons
  document.querySelectorAll(".choose-plan-btn").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, { scale: 1.05, duration: 0.2, ease: "power2.out" });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
    });
  });
}
// 🟢 Fade-in effect for the entire section (Only if section exists)
if (document.querySelector("section")) {
  gsap.from("section", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "section",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}
// 🟢 Animate form fields (slide up effect)
if (document.querySelector("#contact-form")) {
  gsap.from("#contact-form div", {
    opacity: 0,
    y: 30, // Slide-up effect
    duration: 0.5,
    stagger: 0.2, // Each input appears one after another
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
}
// 🟢 Smooth hover animation for the submit button
const button = document.querySelector(".send-message-btn");
if (button) {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  });
  button.addEventListener("mouseleave", () => {
    gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
  });
}
// 🟢 Animate Section Titles (Only if .section-title exists)
if (document.querySelector(".section-title")) {
  gsap.from(".section-title", {
    opacity: 0,
    y: 50, // Slide-up effect
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".section-title",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}
// 🟢 Animate Paragraphs with Stagger
if (document.querySelector(".about-paragraph")) {
  gsap.from(".about-paragraph", {
    opacity: 0,
    y: 30, // Slide-up effect
    duration: 0.6,
    stagger: 0.2, // Delays between each paragraph
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-paragraph",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
}
// 🟢 Animate Image on Scroll
if (document.querySelector(".about-image")) {
  gsap.from(".about-image", {
    opacity: 0,
    x: 50, // Slide-in from right
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-image",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}
window.onload = function() {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function showSpinnerButton() {
  const sendBtn = document.getElementById('send-message-btn');
  const spinnerBtn = document.getElementById('spinner-btn');

  sendBtn.classList.add('opacity-0', 'pointer-events-none');
  sendBtn.classList.remove('opacity-100');

  spinnerBtn.classList.remove('opacity-0', 'pointer-events-none');
  spinnerBtn.classList.add('opacity-100');
}

function hideSpinnerButton() {
  const sendBtn = document.getElementById('send-message-btn');
  const spinnerBtn = document.getElementById('spinner-btn');

  spinnerBtn.classList.add('opacity-0', 'pointer-events-none');
  spinnerBtn.classList.remove('opacity-100');

  sendBtn.classList.remove('opacity-0', 'pointer-events-none');
  sendBtn.classList.add('opacity-100');

  setTimeout(() => {
    sendBtn.disabled = false;
  }, 1000);
}

function showToastModal(message) {
  const modal = document.getElementById('toast-modal');
  const toastMessage = document.getElementById('toast-message');
  if(toastMessage) {
    toastMessage.textContent = message;
  }
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');

  setTimeout(() => {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
  }, 5000);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const sendBtn = document.getElementById('send-message-btn');
    sendBtn.disabled = true;

    const formData = new FormData(this);
    showSpinnerButton();

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Your message has been sent successfully!') {
        showToastModal(data.message);
        contactForm.reset();
        if (window.grecaptcha) {
          grecaptcha.reset();
        }
      } else {
        showToastModal(data.message || 'Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showToastModal('An error occurred. Please try again later.');
    })
    .finally(() => {
      hideSpinnerButton();
    });
  });
}

const dynamicTextElement = document.getElementById('dynamic-text');
if (!dynamicTextElement) {
  return;
}  
const words = ['Creations', 'Services', 'Solutions', 'Products', 'Successes'];
function rotateWords() {
  const dynamicTextElement = document.getElementById('dynamic-text');
  const currentWord = dynamicTextElement.textContent.trim();
  const currentIndex = words.indexOf(currentWord);
  const nextIndex = (currentIndex + 1) % words.length;
  const nextWord = words[nextIndex];
  animateReverseTypewriter(currentWord, dynamicTextElement, currentWord.length, nextWord);
}
function animateReverseTypewriter(currentWord, element, index, nextWord) {
  let newWord = currentWord.substring(0, index);
  element.textContent = newWord;
  if (index > 0) {
    setTimeout(() => {
      animateReverseTypewriter(currentWord, element, index - 1, nextWord);
    }, 100); 
  } else {
    animateTransition(nextWord.split(''), element, 0);
  }
}
function animateTransition(nextWordChars, element, index) {
  let newWord = '';
  for (let i = 0; i <= index; i++) {
    newWord += nextWordChars[i];
  }
  element.textContent = newWord;
  if (index < nextWordChars.length - 1) {
    setTimeout(() => {
      animateTransition(nextWordChars, element, index + 1);
    }, 100);
  } else {
    setTimeout(() => {
      rotateWords();
    }, 2000);
  }
}
rotateWords();
});
document.getElementById('menu-button').addEventListener('click', function() {
    var navbar = document.getElementById('navbar-default');
    navbar.classList.toggle('hidden');
  });
  document.getElementById('menu-button').addEventListener('click', function() {
    var iconContainer = document.getElementById('icon-container');
    var lines = iconContainer.children;
    var isOpen = iconContainer.classList.contains('open');
    iconContainer.classList.toggle('open');
    if (isOpen) {
      lines[0].style.transform = 'none';
      lines[0].style.top = '25%';
      lines[1].style.opacity = '1';
      lines[1].style.transform = 'none';
      lines[2].style.transform = 'none';
      lines[2].style.top = '75%';
    } else {
      lines[0].style.transform = 'rotate(45deg) translate(-1px, -1px)';
      lines[0].style.top = '52%';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(-1px, 1px)';
      lines[2].style.top = '45%';
    }
  });
  window.addEventListener('resize', function() {
    var navbar = document.getElementById('navbar-default');
    var iconContainer = document.getElementById('icon-container');
    var lines = iconContainer.children;
    navbar.classList.add('hidden');
    iconContainer.classList.remove('open');
    lines[0].style.transform = 'none';
    lines[0].style.top = '25%';
    lines[1].style.opacity = '1';
    lines[1].style.transform = 'none';
    lines[2].style.transform = 'none';
    lines[2].style.top = '75%';
  });
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}
var themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', function() {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

