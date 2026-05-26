document.addEventListener("DOMContentLoaded", () => {
  // 1. SCROLL REVEAL INTERSECTION CONTROLLER
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    },
  );
  reveals.forEach((el) => observer.observe(el));

  // 2. INTERACTIVE HEADER BACKGROUND MATRIX ENGINE
  const navCanvas = document.getElementById("header-canvas");
  if (navCanvas) {
    const ctx = navCanvas.getContext("2d");
    let points = [];
    const maxPoints = 45;
    let mouse = { x: null, y: null };

    const resizeNav = () => {
      navCanvas.width = navCanvas.offsetWidth;
      navCanvas.height = navCanvas.offsetHeight;
    };
    resizeNav();
    window.addEventListener("resize", resizeNav);

    document.querySelector("nav").addEventListener("mousemove", (e) => {
      const rect = navCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    document.querySelector("nav").addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class GridPoint {
      constructor() {
        this.x = Math.random() * navCanvas.width;
        this.y = Math.random() * navCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.baseSize = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > navCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > navCanvas.height) this.vy *= -1;

        if (mouse.x != null && mouse.y != null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            let force = (60 - dist) / 60;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 230, 153, 0.4)";
        ctx.fill();
      }
    }

    for (let i = 0; i < maxPoints; i++) points.push(new GridPoint());

    const animateHeader = () => {
      ctx.clearRect(0, 0, navCanvas.width, navCanvas.height);
      for (let i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw();
        for (let j = i + 1; j < points.length; j++) {
          let dx = points[i].x - points[j].x;
          let dy = points[i].y - points[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.09 * (1 - dist / 75)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateHeader);
    };
    animateHeader();
  }

  // 3. MOUSE-FOLLOWING DYNAMIC AURA LIGHTING FOR PREMIUM CARDS
  document.querySelectorAll(".premium-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = card.querySelector(".card-glow-layer");
      if (glow) {
        glow.style.opacity = "0.15";
        glow.style.filter = "blur(25px)";
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--accent-neon) 0%, transparent 60%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      const glow = card.querySelector(".card-glow-layer");
      if (glow) {
        glow.style.opacity = "0";
      }
    });
  });

  // 4. MOBILE HAMBURGER MENU INTERACTION CONTROLLER
  const hamburger = document.getElementById("hamburger-menu");
  const navLinks = document.getElementById("nav-links");
  // FIX: Added the missing dot '.' to look for the class wrapper
  const menuLinks = document.querySelectorAll(".nav-links a");

  // Toggle active class on click
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Automatically collapse the overlay menu when clicking any view link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
});
