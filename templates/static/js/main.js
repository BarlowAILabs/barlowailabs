// Final version
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4QoAl_Lplbcg2vBiy2xWwSx1-7QtfZ-8",
  authDomain: "barlowailabs.firebaseapp.com",
  projectId: "barlowailabs",
  storageBucket: "barlowailabs.appspot.com",
  messagingSenderId: "453734132373",
  appId: "1:453734132373:web:9bf131539c91fe0514c99c",
  measurementId: "G-KVCPX3XE6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app, 'europe-west4'); // Specify the region

// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);

  // --- GSAP ANIMATIONS ---
  if (document.querySelector(".hero-content")) {
    gsap.from(".hero-content", { y: 50, duration: 2, ease: "power2.out", stagger: 0.1 });
  }
  if (document.querySelector(".image-box")) {
    gsap.from(".image-box", { opacity: 0, y: 50, duration: 1, stagger: 0.3, scrollTrigger: { trigger: ".image-box", start: "top 80%", toggleActions: "play none none none" } });
  }
  if (document.querySelector(".section-heading, .section-text")) {
    gsap.from(".section-heading, .section-text", { opacity: 0, x: -50, duration: 1.2, stagger: 0.2, scrollTrigger: { trigger: ".section-heading", start: "top 85%", toggleActions: "play none none none" } });
  }
  if (document.querySelector(".service-card")) {
    gsap.from(".service-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: ".service-card", start: "top 90%", toggleActions: "play none none none" } });
  }
  if (document.querySelector(".cta-button")) {
    gsap.to(".cta-button", { scale: 1.05, repeat: -1, yoyo: true, duration: 0.8, ease: "power1.inOut" });
  }
  if (document.querySelector(".pricing-card")) {
    gsap.from(".pricing-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".pricing-card", start: "top 85%", toggleActions: "play none none none" } });
  }
  document.querySelectorAll(".pricing-card ul").forEach((ul) => {
    if (ul.children.length > 0) {
      gsap.from(ul.children, { opacity: 0, x: -30, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ul, start: "top 90%", toggleActions: "play none none none" } });
    }
  });
  if (document.querySelector(".choose-plan-btn")) {
    gsap.from(".choose-plan-btn", { opacity: 0, y: 20, duration: 0.5, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".choose-plan-btn", start: "top 90%", toggleActions: "play none none none" } });
    document.querySelectorAll(".choose-plan-btn").forEach((button) => {
      button.addEventListener("mouseenter", () => { gsap.to(button, { scale: 1.05, duration: 0.2, ease: "power2.out" }); });
      button.addEventListener("mouseleave", () => { gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" }); });
    });
  }
  if (document.querySelector("section")) {
    gsap.from("section", { opacity: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: "section", start: "top 85%", toggleActions: "play none none none" } });
  }
  if (document.querySelector("#contact-form")) {
    gsap.from("#contact-form div", { opacity: 0, y: 30, duration: 0.5, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: "#contact-form", start: "top 90%", toggleActions: "play none none none" } });
  }
  const sendButton = document.querySelector(".send-message-btn");
  if (sendButton) {
    sendButton.addEventListener("mouseenter", () => { gsap.to(sendButton, { scale: 1.05, duration: 0.2, ease: "power2.out" }); });
    sendButton.addEventListener("mouseleave", () => { gsap.to(sendButton, { scale: 1, duration: 0.2, ease: "power2.out" }); });
  }
  if (document.querySelector(".section-title")) {
    gsap.from(".section-title", { opacity: 0, y: 50, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".section-title", start: "top 85%", toggleActions: "play none none none" } });
  }
  if (document.querySelector(".about-paragraph")) {
    gsap.from(".about-paragraph", { opacity: 0, y: 30, duration: 0.6, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".about-paragraph", start: "top 90%", toggleActions: "play none none none" } });
  }
  if (document.querySelector(".about-image")) {
    gsap.from(".about-image", { opacity: 0, x: 50, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".about-image", start: "top 80%", toggleActions: "play none none none" } });
  }

  // --- DYNAMIC TEXT ---
  const dynamicTextElement = document.getElementById('dynamic-text');
  if (dynamicTextElement) {
    const words = ['Creations', 'Services', 'Solutions', 'Products', 'Successes'];
    function rotateWords() {
      const dynamicTextElement = document.getElementById('dynamic-text');
      if (!dynamicTextElement) return;
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
        setTimeout(rotateWords, 2000);
      }
    }
    rotateWords();
  }

  // --- MENU/THEME LOGIC ---
  const menuButton = document.getElementById('menu-button');
  const navbar = document.getElementById('navbar-default');
  const iconContainer = document.getElementById('icon-container');

  if (menuButton && navbar && iconContainer) {
    menuButton.addEventListener('click', function() {
      navbar.classList.toggle('hidden');
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
  }

  var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  
  if (themeToggleDarkIcon && themeToggleLightIcon) {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }
  }

  var themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
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
  }

  // --- FORM HELPER FUNCTIONS ---
  const sendMessageBtn = document.getElementById('send-message-btn');
  const spinnerBtn = document.getElementById('spinner-btn');
  const toastModal = document.getElementById('toast-modal');

  function showSpinnerButton() {
    if (sendMessageBtn && spinnerBtn) {
      sendMessageBtn.classList.add('opacity-0', 'pointer-events-none');
      sendMessageBtn.classList.remove('opacity-100');
      spinnerBtn.classList.remove('opacity-0', 'pointer-events-none');
      spinnerBtn.classList.add('opacity-100');
    }
  }
  function hideSpinnerButton() {
    if (sendMessageBtn && spinnerBtn) {
      spinnerBtn.classList.add('opacity-0', 'pointer-events-none');
      spinnerBtn.classList.remove('opacity-100');
      sendMessageBtn.classList.remove('opacity-0', 'pointer-events-none');
      sendMessageBtn.classList.add('opacity-100');
      setTimeout(() => {
        if(sendMessageBtn) sendMessageBtn.disabled = false;
      }, 1000);
    }
  }
  function showToastModal(message) {
    const messageElement = document.querySelector('#toast-message h3');
    if (messageElement) {
      messageElement.textContent = message;
    }
    if (toastModal && window.flowbite) {
      // Use Flowbite's Modal class to show it
      const modal = new flowbite.Modal(toastModal);
      modal.show();
    } else if (toastModal) {
      // Fallback if flowbite isn't loaded
      toastModal.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        toastModal.classList.add('opacity-0', 'pointer-events-none');
      }, 5000);
    }
  }

  // --- *** NEW FIREBASE CONTACT FORM LOGIC *** ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop the form from reloading
      
      showSpinnerButton(); // Show the spinner

      // Get form data
      const name = contactForm.name.value;
      const email = contactForm.email.value;
      const subject = contactForm.subject.value;
      const message = contactForm.message.value;
      const recaptchaToken = grecaptcha.getResponse(); // Get reCAPTCHA token

      if (!recaptchaToken) {
        alert('Please complete the reCAPTCHA.');
        hideSpinnerButton();
        return;
      }

      // Get a reference to the function
      const sendContactEmail = httpsCallable(functions, 'sendContactEmail');

      try {
        // Call the function with the form data
        const result = await sendContactEmail({
          name,
          email,
          subject,
          message,
          recaptchaToken
        });

        // The function returns a data object, get the message from it
        const resultMessage = result.data.message;

        // Success! Show the toast message
        showToastModal(resultMessage);
        contactForm.reset(); // Clear the form
        grecaptcha.reset(); // Reset the reCAPTCHA

      } catch (error) {
        // Handle errors
        console.error("Error sending email:", error);
        showToastModal(`Error: ${error.message}`); // Show error in toast
      } finally {
        // Always hide spinner
        hideSpinnerButton();
      }
    });
  }
});