// ==========================================
// 1. TEMA & ACCENT COLOR SWITCHER LOGIC
// ==========================================
const themes = {
  indigo: {
    primary: "#6366f1",
    bgClass: "bg-indigo-600",
    textClass: "text-indigo-400",
    borderClass: "border-indigo-400",
  },
  emerald: {
    primary: "#10b981",
    bgClass: "bg-emerald-600",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-400",
  },
  cyan: {
    primary: "#06b6d4",
    bgClass: "bg-cyan-500",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-400",
  },
  rose: {
    primary: "#f43f5e",
    bgClass: "bg-rose-600",
    textClass: "text-rose-400",
    borderClass: "border-rose-400",
  },
};

let currentTheme = "indigo";

function changeAccent(colorName) {
  if (!themes[colorName]) return;

  const oldT = themes[currentTheme];
  const newT = themes[colorName];

  // 1. Ganti Class Teks Aksen
  document.querySelectorAll("." + oldT.textClass).forEach((el) => {
    el.classList.remove(oldT.textClass);
    el.classList.add(newT.textClass);
  });

  // 2. Ganti Class Background Aksen
  document.querySelectorAll("." + oldT.bgClass).forEach((el) => {
    el.classList.remove(oldT.bgClass);
    el.classList.add(newT.bgClass);
  });

  // 3. Ganti Class Border Aksen
  document.querySelectorAll("." + oldT.borderClass).forEach((el) => {
    el.classList.remove(oldT.borderClass);
    el.classList.add(newT.borderClass);
  });

  currentTheme = colorName;
}

// ==========================================
// 2. SKILL FILTER LOGIC
// ==========================================
function filterSkills(category, e) {
  const items = document.querySelectorAll(".skill-item");
  const buttons = document.querySelectorAll(".skill-btn");
  const activeBg = themes[currentTheme].bgClass;

  // Reset style semua tombol filter
  buttons.forEach((btn) => {
    Object.values(themes).forEach((t) => btn.classList.remove(t.bgClass));
    btn.classList.remove("text-white", "active");
    btn.classList.add("bg-zinc-900", "border", "border-zinc-800", "text-zinc-400");
  });

  // Highlight tombol yang diklik
  if (e && e.currentTarget) {
    const currentBtn = e.currentTarget;
    currentBtn.classList.remove("bg-zinc-900", "border-zinc-800", "text-zinc-400");
    currentBtn.classList.add(activeBg, "text-white", "active");
  }

  // Animasi & Filtering Item
  items.forEach((item) => {
    const itemCat = item.getAttribute("data-category");
    if (category === "all" || itemCat === category) {
      item.style.display = "inline-block";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, 10);
    } else {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";
      setTimeout(() => {
        item.style.display = "none";
      }, 200);
    }
  });
}

// ==========================================
// 3. KALKULATOR PRANK & MODAL LOGIC
// ==========================================
const wrongAnswers = ["404_LOGIC", "PEE_KAA_BOO", "ERROR_PRO", "PIRATED!", "ERROR_PAID_US", "OX_GAMES", "WHEN_YAH", "WKWKWK", "LEL.", "WHAT_?!", "DO_IT_LATER", "TOO_PRETTY", "NOPE", "TRY_AGAIN"];

function resetCalcDisplay() {
  const display = document.getElementById("calcDisplay");
  if (display) {
    display.value = "";
    display.style.color = themes[currentTheme].primary;
  }
}

function openCalcModal() {
  const modal = document.getElementById("calcModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    resetCalcDisplay();
  }
}

function closeCalcModal() {
  const modal = document.getElementById("calcModal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}

// Fungsi memasukkan angka/operator biasa ke layar
function appendCalcValue(val) {
  const display = document.getElementById("calcDisplay");
  if (display) {
    // Jika layar berisi teks error prank, bersihkan dulu saat mengetik angka baru
    if (wrongAnswers.includes(display.value)) {
      display.value = "";
      display.style.color = themes[currentTheme].primary;
    }
    display.value += val;
  }
}

// Fungsi prank saat menekan tombol Sama Dengan (=)
function calculateResult() {
  showFakePay(); // Pemicu bayar hanya dipanggil di tombol "="
}

function sabotageCalc() {
  const display = document.getElementById("calcDisplay");
  if (display) {
    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
    display.value = wrongAnswers[randomIndex];
    display.style.color = "#fb7185"; // Rose-400 untuk error
  }
}

function showFakePay() {
  const payModal = document.getElementById("fakePayModal");
  if (payModal) {
    payModal.classList.remove("hidden");
    payModal.classList.add("flex");
  }
}

function closeFakePay() {
  const payModal = document.getElementById("fakePayModal");
  if (payModal) {
    payModal.classList.remove("flex");
    payModal.classList.add("hidden");
    sabotageCalc();
  }
}

// Shortcut keyboard Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFakePay();
    closeCalcModal();
    closeEbookModal();
  }
});

// ==========================================
// 4. EBOOK PREVIEW MODAL LOGIC
// ==========================================
function openEbookModal() {
  const ebookModal = document.getElementById("ebookModal");
  if (ebookModal) {
    ebookModal.classList.remove("hidden");
    ebookModal.classList.add("flex");
  }
}

function closeEbookModal() {
  const ebookModal = document.getElementById("ebookModal");
  if (ebookModal) {
    ebookModal.classList.add("hidden");
    ebookModal.classList.remove("flex");
  }
}

// ==========================================
// 5. BUY ME A COFFEE TOGGLE
// ==========================================
function toggleCoffee() {
  const box = document.getElementById("coffeeBox");
  if (box) {
    box.classList.toggle("hidden");
  }
}

// ==========================================
// 6. TYPING EFFECT LOGIC
// ==========================================
const words = ["Front-End Developer", "UI/UX Enthusiast", "Graphic Designer", "Web Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const targetEl = document.getElementById("typing-text");
  if (!targetEl) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    targetEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    targetEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Menutup menu saat link diklik
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Memaksa browser ke atas saat halaman dimuat
window.history.scrollRestoration = "manual"; // Mencegah browser scroll otomatis ke posisi terakhir
window.onload = () => {
  window.scrollTo(0, 0);
};
