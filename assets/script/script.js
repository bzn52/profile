let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

let Section = document.querySelectorAll("section");
let Navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  Section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150; // Add offset to account for header
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      Navlinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all links
    Navlinks.forEach((links) => {
      links.classList.remove("active");
    });

    // Add active class to clicked link
    this.classList.add("active");

    // Get the target section
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Scroll to the section
    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu if open
    navbar.classList.remove("active");
  });
});

// Get form and popup elements
const contactForm = document.querySelector(".contact-form");
const thankYouPopup = document.getElementById("thankYouPopup");
const loadingPopup = document.getElementById("loadingPopup");
const popupCloseBtn = document.querySelector(".popup-close");
const submitBtn = contactForm.querySelector(".btn");

// Handle form submission
contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Show loading state
  loadingPopup.classList.add("active");
  contactForm.classList.add("loading");
  submitBtn.classList.add("loading");

  // Get form data
  const formData = new FormData(this);

  // Send form data to FormSubmit
  fetch(this.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Hide loading popup
      loadingPopup.classList.remove("active");
      contactForm.classList.remove("loading");
      submitBtn.classList.remove("loading");

      // Show success popup
      thankYouPopup.classList.add("active");
      // Reset form
      contactForm.reset();
    })
    .catch((error) => {
      // Hide loading popup
      loadingPopup.classList.remove("active");
      contactForm.classList.remove("loading");
      submitBtn.classList.remove("loading");

      console.error("Error:", error);
      // You could add error handling here
    });
});

// Close popup when close button is clicked
popupCloseBtn.addEventListener("click", () => {
  thankYouPopup.classList.remove("active");
});

// Close popup when clicking outside
thankYouPopup.addEventListener("click", (e) => {
  if (e.target === thankYouPopup) {
    thankYouPopup.classList.remove("active");
  }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll(
  ".skill-box, .edu-box, .project-box"
);
const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initial styles for reveal animation
revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "all 0.5s ease";
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
