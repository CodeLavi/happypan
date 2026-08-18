const recipeCards = [...document.querySelectorAll(".recipe-card")];
const searchInput = document.querySelector("#recipe-search");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const emptyState = document.querySelector("#empty-state");
let activeFilter = "For you";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let shown = 0;
  recipeCards.forEach((card) => {
    const content = `${card.dataset.title} ${card.dataset.tags}`.toLowerCase();
    const matchesTag = activeFilter === "For you" || content.includes(activeFilter.toLowerCase());
    const visible = matchesTag && content.includes(query);
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  emptyState.hidden = shown !== 0;
}

filterButtons.forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  applyFilters();
}));
searchInput.addEventListener("input", applyFilters);

const saved = new Set(JSON.parse(localStorage.getItem("happy-pan-saved") || '["Creamy lemon pasta"]'));
const savedCount = document.querySelector("#saved-count");
function updateSavedCount() { savedCount.textContent = String(saved.size); }

document.querySelectorAll("[data-save]").forEach((button) => {
  const title = button.dataset.save;
  const isSaved = saved.has(title);
  button.classList.toggle("saved", isSaved);
  button.textContent = isSaved ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(isSaved));
  button.setAttribute("aria-label", `${isSaved ? "Remove" : "Save"} ${title}`);
  button.addEventListener("click", () => {
    saved.has(title) ? saved.delete(title) : saved.add(title);
    const active = saved.has(title);
    button.classList.toggle("saved", active);
    button.textContent = active ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", `${active ? "Remove" : "Save"} ${title}`);
    localStorage.setItem("happy-pan-saved", JSON.stringify([...saved]));
    updateSavedCount();
  });
});
updateSavedCount();

const recommendations = [
  { title:"Creamy lemon pasta", meta:"20 min · weeknight", image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85" },
  { title:"Green goddess grain bowl", meta:"30 min · make ahead", image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85" },
  { title:"Golden paneer flatbreads", meta:"35 min · shareable", image:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=85" },
  { title:"Crispy chilli egg toast", meta:"12 min · breakfast", image:"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=85" }
];
let recommendationIndex = 0;
let selectedTime = "20 min";
function showRecommendation() {
  const item = recommendations[recommendationIndex % recommendations.length];
  document.querySelector("#tonight-image").style.backgroundImage = `url('${item.image}')`;
  document.querySelector("#tonight-title").textContent = item.title;
  document.querySelector("#tonight-meta").textContent = item.meta;
  document.querySelector("#tonight-match").textContent = `A happy match · ${selectedTime}`;
}

document.querySelectorAll("[data-choice]").forEach((group) => {
  group.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    group.querySelectorAll("button").forEach((item) => item.classList.toggle("selected", item === button));
    if (group.dataset.choice === "time") selectedTime = button.textContent;
    if (group.dataset.choice === "mood") recommendationIndex = button.textContent === "Fresh" ? 1 : button.textContent === "Adventurous" ? 2 : 0;
    showRecommendation();
  }));
});
document.querySelector("#surprise-button").addEventListener("click", () => { recommendationIndex += 1; showRecommendation(); });
showRecommendation();

document.querySelector("#signup-form form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#signup-form").hidden = true;
  document.querySelector("#joined-message").hidden = false;
});
