const plusCursor = document.createElement("div");
plusCursor.className = "plus-cursor";
document.body.appendChild(plusCursor);
document.querySelectorAll(".result-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    plusCursor.style.display = "block";
  });

  card.addEventListener("mouseleave", () => {
    plusCursor.style.display = "none";
  });

});

document.addEventListener("mousemove", (e) => {
  plusCursor.style.left = e.clientX + "px";
  plusCursor.style.top = e.clientY + "px";
});


/* POPUP SYSTEM */
function setupPopup(openId, popupId, closeId) {
  const open = document.getElementById(openId);
  const popup = document.getElementById(popupId);
  const close = document.getElementById(closeId);

  if (!open || !popup || !close) {
    console.warn('Missing popup:', openId, popupId, closeId);
    return;
  }

  open.addEventListener('click', () => {
    popup.style.display = 'flex';
  });

  close.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
}


/* ALL POPUPS */
const popupList = [
  ['openPopup', 'popup', 'closePopup'],
  ['openPopupOpuntia', 'popupOpuntia', 'closePopupOpuntia'],
  ['openPopupFlup', 'popupFlup', 'closePopupFlup'],
  ['openPopupCalcite', 'popupCalcite', 'closePopupCalcite'],
  ['openPopupNebula', 'popupNebula', 'closePopupNebula'],
  ['openPopupBacteria', 'popupBacteria', 'closePopupBacteria'],
  ['openPopupLove', 'popupLove', 'closePopupLove'],
  ['openPopupAnt', 'popupAnt', 'closePopupAnt'],
  ['openPopupHuman', 'popupHuman', 'closePopupHuman'],
  ['openPopupAlien', 'popupAlien', 'closePopupAlien'],
  ['openPopupAngel', 'popupAngel', 'closePopupAngel'],
  ['openPopupDragon', 'popupDragon', 'closePopupDragon'],
  ['openPopupHirsch', 'popupHirsch', 'closePopupHirsch'],
  ['openPopupMoon', 'popupMoon', 'closePopupMoon'],
  ['openPopupStars', 'popupStars', 'closePopupStars'],
  ['openPopupTwins', 'popupTwins', 'closePopupTwins'],

  // ADD THIS IF YOU CREATE THE CAVE POPUP:
  ['openPopupCave', 'popupCave', 'closePopupCave']
];

popupList.forEach(p => setupPopup(...p));


/* SEARCH */

const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.result-card');

function runSearch() {

  const value = searchInput.value.toLowerCase().trim();

  cards.forEach(card => {

    // searches all visible text inside the card
    const fullText = card.innerText.toLowerCase();

    card.style.display =
      fullText.includes(value) || value === ""
        ? ""
        : "none";

  });

}

searchInput.addEventListener('input', runSearch);


/* RANDOMIZE GRID */
const archiveGrid = document.querySelector('.archive-results-grid');
const cardsArray = Array.from(archiveGrid.children);

cardsArray.sort(() => Math.random() - 0.5);

cardsArray.forEach(card => {
  archiveGrid.appendChild(card);
});


