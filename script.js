/* =========================
   CHIP SLIDER
========================= */

const track = document.getElementById("chipTrack");
const strip = document.getElementById("chipStrip");
const leftBtn = document.getElementById("chipLeft");
const rightBtn = document.getElementById("chipRight");

const PER_PAGE = 7;
let page = 0;

function totalChips() {
  return track.querySelectorAll(".chip").length;
}

function maxPage() {
  return Math.ceil(totalChips() / PER_PAGE) - 1;
}

function fitSevenChips() {
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const viewport = strip.clientWidth;
  const chipW = Math.floor((viewport - gap * (PER_PAGE - 1)) / PER_PAGE);
  document.documentElement.style.setProperty("--chip-w", `${Math.max(110, chipW)}px`);
}

function getStepPx() {
  const first = track.querySelector(".chip");
  const chipW = first.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return (chipW + gap) * PER_PAGE;
}

function update() {
  fitSevenChips();
  track.style.transform = `translateX(-${page * getStepPx()}px)`;
  leftBtn.disabled = page <= 0;
  rightBtn.disabled = page >= maxPage();
}

rightBtn.addEventListener("click", () => {
  if (page < maxPage()) {
    page++;
    update();
  }
});

leftBtn.addEventListener("click", () => {
  if (page > 0) {
    page--;
    update();
  }
});

update();
window.addEventListener("resize", update);


/* =========================
   TYPEWRITER
========================= */

const text = "ALIA’S ARTWORKS";
const typeTarget = document.getElementById("typeText");

let i = 0;
let isDeleting = false;

function typeLoop() {
  if (!typeTarget) return;

  if (!isDeleting) {
    typeTarget.textContent = text.substring(0, i + 1);
    i++;

    if (i === text.length) {
      setTimeout(() => isDeleting = true, 1200);
    }
  } else {
    typeTarget.textContent = text.substring(0, i - 1);
    i--;

    if (i === 0) {
      isDeleting = false;
    }
  }

  setTimeout(typeLoop, isDeleting ? 50 : 90);
}

typeLoop();


/* =========================
   FILTER SYSTEM
========================= */

let currentCategory = "all";
let currentColor = "all";
let currentSearch = "";

function applyFilters() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector(".cap")?.textContent.toLowerCase() || "";
    const category = card.dataset.category?.toLowerCase() || "";
    const color = card.dataset.color?.toLowerCase() || "";

    const matchCategory =
      currentCategory === "all" || category.includes(currentCategory);

    const matchColor =
      currentColor === "all" || color.includes(currentColor);

    const matchSearch =
      currentSearch === "" ||
      title.includes(currentSearch) ||
      category.includes(currentSearch) ||
      color.includes(currentSearch);

    if (matchCategory && matchColor && matchSearch) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}



function filterArtwork(category) {
  currentCategory = category;
  currentColor = "all";

  document.querySelectorAll(".color-option").forEach(btn => {
    btn.classList.remove("active");
  });

  const allColorBtn = document.querySelector('.color-option[data-color="all"]');
  if (allColorBtn) allColorBtn.classList.add("active");

  applyFilters();
}





function showAll() {
  currentCategory = "all";
  currentColor = "all";
  currentSearch = "";

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll(".chip").forEach(chip => chip.classList.remove("active"));
  document.querySelector(".chip")?.classList.add("active");

  document.querySelectorAll("#colorPanel button").forEach(btn => btn.classList.remove("active"));

  applyFilters();
}


/* =========================
   CHIP ACTIVE STATE
========================= */

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


/* =========================
   SEARCH
========================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    currentSearch = this.value.toLowerCase().trim();
    applyFilters();
  });
}




document.querySelectorAll(".color-option").forEach(btn => {
  btn.addEventListener("click", function () {
    currentColor = this.dataset.color;
    currentCategory = "all";

    document.querySelectorAll(".chip").forEach(chip => {
      chip.classList.remove("active");
    });

    const firstChip = document.querySelector(".chip");
    if (firstChip) firstChip.classList.add("active");

    document.querySelectorAll(".color-option").forEach(b => {
      b.classList.remove("active");
    });

    this.classList.add("active");

    applyFilters();
  });
});






/* =========================
   MODAL
========================= */

function openModal(img) {
  document.getElementById("imageModal").style.display = "flex";
  document.getElementById("modalImage").src = img.src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}


function openPDFModal(pdfPath) {
  window.open(pdfPath, "_blank");
}


function closePDFModal() {
  document.getElementById("pdfModal").style.display = "none";
  document.getElementById("pdfFrame").src = "";
}

window.onclick = function(event) {
  const modal = document.getElementById("pdfModal");
  if (event.target === modal) {
    closePDFModal();
  }
};



const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const filterOverlay = document.getElementById("filterOverlay");
const closeFilter = document.getElementById("closeFilter");

filterBtn.addEventListener("click", () => {
  filterPanel.classList.add("show");
  filterOverlay.classList.add("show");
});

closeFilter.addEventListener("click", () => {
  filterPanel.classList.remove("show");
  filterOverlay.classList.remove("show");
});

filterOverlay.addEventListener("click", () => {
  filterPanel.classList.remove("show");
  filterOverlay.classList.remove("show");
});





document.querySelectorAll(".color-option").forEach(btn => {

  btn.addEventListener("click", function () {

    document.querySelectorAll(".color-option")
      .forEach(b => b.classList.remove("active"));

    this.classList.add("active");

  });

});