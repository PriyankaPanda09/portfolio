/* =====================================================
   PRIYANKA PANDA — PORTFOLIO JAVASCRIPT
   ===================================================== */

// ========== BOOT SCREEN ==========
const bootLines = [
  "INITIALIZING SYSTEM...",
  "LOADING PLAYER PROFILE: PRIYANKA PANDA",
  "STACK DETECTED: REACT · NODE · PYTHON · AWS",
  "AI MODULES: TENSORFLOW · OPENCV · KERAS ✓",
  "CERTIFICATIONS VERIFIED ✓",
  "CGPA: 8.93 — EXCELLENT ✓",
  "BOOT COMPLETE. WELCOME.",
];

let lineIdx = 0;
let charIdx = 0;
let bootInterval;
const bootTextEl = document.getElementById("boot-text");
const bootBar = document.getElementById("boot-bar");
const bootScreen = document.getElementById("boot-screen");
const mainContent = document.getElementById("main-content");
const hudBar = document.getElementById("hud-bar");

function typeBoot() {
  if (lineIdx >= bootLines.length) {
    clearInterval(bootInterval);
    setTimeout(finishBoot, 500);
    return;
  }
  const line = bootLines[lineIdx];
  if (charIdx < line.length) {
    bootTextEl.textContent = line.substring(0, charIdx + 1) + "█";
    charIdx++;
  } else {
    bootTextEl.textContent = line;
    lineIdx++;
    charIdx = 0;
    const pct = Math.round((lineIdx / bootLines.length) * 100);
    bootBar.style.width = pct + "%";
  }
}

function finishBoot() {
  bootScreen.classList.add("hide");
  mainContent.style.display = "block";
  setTimeout(() => {
    bootScreen.style.display = "none";
    initPortfolio();
  }, 700);
}

function startBoot() {
  mainContent.style.display = "none";
  bootInterval = setInterval(typeBoot, 40);
}

// Skip on keypress or click
document.addEventListener("keydown", () => {
  if (!bootScreen.classList.contains("hide")) {
    clearInterval(bootInterval);
    finishBoot();
  }
});
bootScreen.addEventListener("click", () => {
  if (!bootScreen.classList.contains("hide")) {
    clearInterval(bootInterval);
    finishBoot();
  }
});

startBoot();

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById("cursor");
const trail = document.getElementById("cursor-trail");
let trailX = 0, trailY = 0;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

function animateTrail() {
  trailX += (parseFloat(cursor.style.left || 0) - trailX) * 0.12;
  trailY += (parseFloat(cursor.style.top || 0) - trailY) * 0.12;
  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.addEventListener("mousedown", () => cursor.style.transform = "translate(-50%,-50%) scale(0.6)");
document.addEventListener("mouseup", () => cursor.style.transform = "translate(-50%,-50%) scale(1)");

// ========== INIT PORTFOLIO ==========
function initPortfolio() {
  initScrollReveal();
  initSkillBars();
  initCGPABar();
  initHUDNav();
  initXPSystem();
  initContactForm();
}

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
  // Add reveal class to all sections
  const targets = document.querySelectorAll(
    ".about-card, .skill-category, .project-card, .xp-item, .cert-card, .contact-info, .contact-form"
  );
  targets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 0.1 + "s";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

// ========== SKILL BARS ==========
function initSkillBars() {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll(".skill-fill");
          fills.forEach((fill) => {
            const w = fill.style.getPropertyValue("--w");
            fill.style.width = w;
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".skill-category").forEach((el) => skillObserver.observe(el));
}

// ========== CGPA BAR ==========
function initCGPABar() {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".cgpa-bar");
          if (bar) bar.style.width = "89.3%"; // 8.93 / 10
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".xp-card").forEach((el) => barObserver.observe(el));
}

// ========== HUD ACTIVE NAV ==========
function initHUDNav() {
  const sections = ["about", "skills", "projects", "experience", "contact"];
  const navLinks = document.querySelectorAll(".hud-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

// ========== XP SYSTEM ==========
let currentXP = 750;
let currentLevel = 12;
const XP_PER_LEVEL = 100;

function initXPSystem() {
  updateHUDXP();

  // Award XP on section enter
  const xpSections = {
    about: 30,
    skills: 50,
    projects: 80,
    experience: 60,
    contact: 40,
  };

  const visited = new Set();

  const xpObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting && !visited.has(id) && xpSections[id]) {
          visited.add(id);
          awardXP(xpSections[id]);
        }
      });
    },
    { threshold: 0.3 }
  );

  Object.keys(xpSections).forEach((id) => {
    const el = document.getElementById(id);
    if (el) xpObserver.observe(el);
  });

  // Award XP on project card hover
  document.querySelectorAll(".project-card:not(.project-locked)").forEach((card) => {
    let hovered = false;
    card.addEventListener("mouseenter", () => {
      if (!hovered) { hovered = true; awardXP(25); }
    });
  });
}

function awardXP(amount) {
  currentXP += amount;
  if (currentXP >= (currentLevel + 1) * XP_PER_LEVEL) {
    currentLevel++;
    document.getElementById("player-level").textContent = currentLevel;
    showXPPopup("LEVEL UP! +" + amount + " XP");
  } else {
    showXPPopup("+" + amount + " XP");
  }
  updateHUDXP();
}

function updateHUDXP() {
  const bar = document.getElementById("hud-xp-bar");
  const levelXP = currentXP % XP_PER_LEVEL;
  bar.style.width = Math.min((levelXP / XP_PER_LEVEL) * 100, 100) + "%";
}

function showXPPopup(text) {
  const popup = document.getElementById("xp-popup");
  popup.textContent = text;
  popup.classList.remove("show");
  void popup.offsetWidth; // reflow
  popup.classList.add("show");
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("send-btn");
  const success = document.getElementById("form-success");

  if (!form) {
    setTimeout(initContactForm, 500);
    return;
  }

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    btn.textContent = "▶ SENDING...";
    btn.disabled = true;

    const from_name = document.getElementById("from_name").value;
    const from_email = document.getElementById("from_email").value;
    const message = document.getElementById("message").value;

    if (!from_name || !from_email || !message) {
      success.style.display = "block";
      success.textContent = "✗ Please fill all fields!";
      success.style.color = "#ef4444";
      btn.textContent = "▶ SEND MESSAGE";
      btn.disabled = false;
      return;
    }

    const data = {
      service_id: "service_ayp9b89",
      template_id: "template_dgxkbxv",
      user_id: "eStI2E9JkaVAn1GhG",
      template_params: { from_name, from_email, message }
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        success.style.display = "block";
        success.textContent = "✓ MESSAGE SENT! I'll respond soon.";
        success.style.color = "var(--accent)";
        btn.textContent = "✓ SENT!";
        awardXP(100);
        document.getElementById("from_name").value = "";
        document.getElementById("from_email").value = "";
        document.getElementById("message").value = "";
        setTimeout(() => {
          btn.textContent = "▶ SEND MESSAGE";
          btn.disabled = false;
          success.style.display = "none";
        }, 5000);
      } else {
        const errText = await response.text();
        throw new Error(errText);
      }
    } catch (err) {
      console.log("Error:", err.message);
      success.style.display = "block";
      success.textContent = "✗ Error: " + err.message;
      success.style.color = "#ef4444";
      btn.textContent = "▶ SEND MESSAGE";
      btn.disabled = false;
    }
  });
}