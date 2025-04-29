let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

let Section = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

let pr4 = document.getElementById("pr-4");
let pr5 = document.getElementById("pr-5");
let pr6 = document.getElementById("pr-6");
let pr7 = document.getElementById("pr-7");
let hide = document.getElementById("pr-button");

window.onscroll = () => {
  Section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    navLinks.forEach((links) => {
      links.classList.remove("active");
    });

    this.classList.add("active");

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    navbar.classList.remove("active");
  });
});

const contactForm = document.querySelector(".contact-form");
const thankYouPopup = document.getElementById("thankYouPopup");
const loadingPopup = document.getElementById("loadingPopup");
const popupCloseBtn = document.querySelector(".popup-close");
const submitBtn = contactForm.querySelector(".btn");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  loadingPopup.classList.add("active");
  contactForm.classList.add("loading");
  submitBtn.classList.add("loading");

  const formData = new FormData(this);

  fetch(this.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      loadingPopup.classList.remove("active");
      contactForm.classList.remove("loading");
      submitBtn.classList.remove("loading");

      thankYouPopup.classList.add("active");
      contactForm.reset();
    })
    .catch((error) => {
      loadingPopup.classList.remove("active");
      contactForm.classList.remove("loading");
      submitBtn.classList.remove("loading");

      console.error("Error:", error);
    });
});

popupCloseBtn.addEventListener("click", () => {
  thankYouPopup.classList.remove("active");
});

thankYouPopup.addEventListener("click", (e) => {
  if (e.target === thankYouPopup) {
    thankYouPopup.classList.remove("active");
  }
});

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

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "all 0.5s ease";
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

document.getElementById("current-year").textContent = new Date().getFullYear();

function showProjects() {
  if (pr4.classList.contains("hide")) {
    pr4.style.opacity = "0";
    pr5.style.opacity = "0";
    pr6.style.opacity = "0";
    pr7.style.opacity = "0";
    setTimeout(() => {
      pr4.classList.remove("hide");
      pr5.classList.remove("hide");
      pr6.classList.remove("hide");
      pr7.classList.remove("hide");
    }, 300);
  } else {
    pr4.classList.add("hide");
    pr5.classList.add("hide");
    pr6.classList.add("hide");
    pr7.classList.add("hide");
    setTimeout(() => {
      pr4.style.opacity = "1";
    }, 10);
  }
  hide.style.display = "none";
}
