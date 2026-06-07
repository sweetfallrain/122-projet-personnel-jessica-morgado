"use strict";

const DEFAULT_IMAGE = "https://placehold.co/400x300/cccccc/333333?text=Pas+d%27image";

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
const TRASH_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
       fill="none" =none stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>`;

// Tableau de données — à générer avec Copilot / une IA
let data = [
  {
    id: 1,
    name: "The Mentalist",
    category: "action",
    platform: "Netflix",
    rating: 10,
    year: 2008,
    image: "https://placehold.co/400x300/4a90d9/white?text=The+Mentalist"
  },
  {
    id: 2,
    name: "Breaking Bad",
    category: "drama",
    platform: "Netflix",
    rating: 10,
    year: 2008,
    image: "https://placehold.co/400x300/e74c3c/white?text=Breaking+Bad"
  },
  {
    id: 3,
    name: "The Office",
    category: "comedy",
    platform: "Netflix",
    rating: 9,
    year: 2005,
    image: "https://placehold.co/400x300/f39c12/white?text=The+Office"
  },
  {
    id: 4,
    name: "Mindhunter",
    category: "thriller",
    platform: "Netflix",
    rating: 9,
    year: 2017,
    image: "https://placehold.co/400x300/9b59b6/white?text=Mindhunter"
  },
  {
    id: 5,
    name: "Stranger Things",
    category: "science-fiction",
    platform: "Netflix",
    rating: 9,
    year: 2016,
    image: "https://placehold.co/400x300/1abc9c/white?text=Stranger+Things"
  },
  {
    id: 6,
    name: "The Crown",
    category: "drama",
    platform: "Netflix",
    rating: 8,
    year: 2016,
    image: "https://placehold.co/400x300/e74c3c/white?text=The+Crown"
  },
  {
    id: 7,
    name: "Brooklyn Nine-Nine",
    category: "comedy",
    platform: "Netflix",
    rating: 9,
    year: 2013,
    image: "https://placehold.co/400x300/f39c12/white?text=Brooklyn+Nine-Nine"
  },
  {
    id: 8,
    name: "Dark",
    category: "science-fiction",
    platform: "Netflix",
    rating: 9,
    year: 2017,
    image: "https://placehold.co/400x300/1abc9c/white?text=Dark"
  },
  {
    id: 9,
    name: "Dexter",
    category: "thriller",
    platform: "Prime Video",
    rating: 8,
    year: 2006,
    image: "https://placehold.co/400x300/9b59b6/white?text=Dexter"
  },
  {
    id: 10,
    name: "Sherlock",
    category: "action",
    platform: "BBC iPlayer",
    rating: 9,
    year: 2010,
    image: "https://placehold.co/400x300/4a90d9/white?text=Sherlock"
  }
];

// Éléments du DOM
const btnSort = document.getElementById("btn-sort");
const searchInput = document.getElementById("search");
const form = document.getElementById("form-add");
const inputName = document.getElementById("input-name");
const inputCategory = document.getElementById("input-category");
const inputPlatform = document.getElementById("input-platform");
const inputYear = document.getElementById("input-year");
const inputRating = document.getElementById("input-rating");

// Sens du tri : false = DESC (notes élevées en premier)
let sortAsc = false;

/**
 * Rafraîchit l'affichage en combinant filtre + tri
 */
function refresh() {
    const query = searchInput.value.toLowerCase();

    // 1. Filtrer selon le champ de recherche
    let result = data.filter(serie =>
        serie.name.toLowerCase().includes(query)
    );

    // 2. Trier selon l'état du bouton
    result = [...result].sort((a, b) =>
        sortAsc ? a.rating - b.rating : b.rating - a.rating
    );

    // 3. Afficher
    afficherSeries(result);
}

// Tri : inverser l'état, mettre à jour le bouton, rafraîchir
btnSort.addEventListener("click", function () {
    sortAsc = !sortAsc;
    btnSort.textContent = sortAsc ? "Trier par note ↑ (ASC)" : "Trier par note ↓ (DESC)";
    refresh();
});

// Recherche : à chaque frappe, rafraîchir
searchInput.addEventListener("input", refresh);

// Formulaire : ajouter une série
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = inputName.value.trim();
    if (nom === "") return;

    const nouvelleSerie = {
        id: Date.now(),
        name: nom,
        category: inputCategory.value,
        platform: inputPlatform.value,
        year: Number(inputYear.value) || new Date().getFullYear(),
        rating: Number(inputRating.value) || 0,
        image: `https://placehold.co/400x300/4a90d9/white?text=${encodeURIComponent(nom)}`
    };

    data.push(nouvelleSerie);
    refresh();
    form.reset();
});

// Suppression : délégation sur le conteneur #list
document.getElementById("list").addEventListener("click", function (event) {
    const btn = event.target.closest(".btn-delete");
    if (!btn) return;

    const card = btn.closest(".card");
    const id = Number(card.dataset.id);

    if (!confirm("Supprimer cette série ?")) return;

    data = data.filter(serie=> serie.id !== id);
    refresh();
});

/**
 * Affiche les séries dans la page
 * @param {Array} tabSeries - Tableau d'objets à afficher
 */
function afficherSeries(tabSeries) {
    const ulList = document.getElementById("list");
    let html = "";

    tabSeries.forEach(serie => {
        const image = serie.image || DEFAULT_IMAGE;
        html += `
        <li class="card" data-id="${serie.id}">
            <img src="${image}" alt="${escapeHtml(serie.name)}">
            <div class="card-body">
                <h2>${escapeHtml(serie.name)}</h2>
                <p class="card-meta">
                    ${escapeHtml(serie.category)} · ${serie.year} · ${escapeHtml(serie.platform)}
                </p>
                <div class="card-footer">
                    <span class="rating">★ ${serie.rating}/10</span>
                    <button class="btn-delete" type="button"
                            title="Supprimer ${escapeHtml(serie.name)}" aria-label="Supprimer">
                        ${TRASH_ICON}
                    </button>
                </div>
            </div>
        </li>

    `;
    });

    ulList.innerHTML = html;
}

refresh();
