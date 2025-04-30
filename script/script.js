const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const contactForm = document.querySelector(".contact-form");
const thankYouPopup = document.getElementById("thankYouPopup");
const loadingPopup = document.getElementById("loadingPopup");
const popupCloseBtn = document.querySelector(".popup-close");
const submitBtn = contactForm.querySelector(".btn");
const revealElements = document.querySelectorAll(".skill-box, .project-box");
const currentYear = document.getElementById("current-year");
const showMoreBtn = document.getElementById("pr-button");
const projectElements = ["pr-4", "pr-5", "pr-6", "pr-7", "pr-8"].map((id) =>
  document.getElementById(id)
);
const preloader = document.getElementById("loader");
const content = document.getElementById("content");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("fade");
    setTimeout(() => {
      preloader.style.display = "none";
      content.classList.add("visible");
    }, 1000);
  }, 1000);
});

const removeClassFromElements = (elements, className) => {
  elements.forEach((el) => el.classList.remove(className));
};

const smoothScrollToTarget = (targetId) => {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
};

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const { offsetTop, offsetHeight } = section;
    const id = section.getAttribute("id");

    if (
      scrollY >= offsetTop - 150 &&
      scrollY < offsetTop + offsetHeight - 150
    ) {
      removeClassFromElements(navLinks, "active");
      const activeLink = document.querySelector(`header nav a[href*='${id}']`);
      activeLink?.classList.add("active");
    }
  });
});

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    removeClassFromElements(navLinks, "active");
    this.classList.add("active");

    smoothScrollToTarget(this.getAttribute("href"));
    navbar.classList.remove("active");
  });
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  loadingPopup.classList.add("active");
  contactForm.classList.add("loading");
  submitBtn.classList.add("loading");

  fetch(this.action, {
    method: "POST",
    body: new FormData(this),
  })
    .then(() => {
      loadingPopup.classList.remove("active");
      contactForm.classList.remove("loading");
      submitBtn.classList.remove("loading");

      thankYouPopup.classList.add("active");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      loadingPopup.classList.remove("active");
      contactForm.classList.remove("loading");
      submitBtn.classList.remove("loading");
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

const handleRevealOnScroll = () => {
  revealElements.forEach((el) => {
    if (el.classList.contains("no-reveal")) return; // Skip manually revealed elements

    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.5s ease";
});

window.addEventListener("scroll", handleRevealOnScroll);
window.addEventListener("load", handleRevealOnScroll);

currentYear.textContent = new Date().getFullYear();

function showProjects() {
  const hidden = projectElements[0].classList.contains("hide");

  if (hidden) {
    projectElements.forEach((el) => {
      el.classList.remove("hide");
      el.style.opacity = "0";
      el.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        el.style.opacity = "1";
      }, 10);
    });
  } else {
    projectElements.forEach((el) => {
      el.classList.add("hide");
      el.style.opacity = "0";
    });
  }

  showMoreBtn.style.display = "none";
}
