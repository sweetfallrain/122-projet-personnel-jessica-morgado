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
    image: "img/the-mentalist.jpg",
  },
  {
    id: 2,
    name: "The Vampire Diaries",
    category: "science-fiction",
    platform: "Netflix",
    rating: 10,
    year: 2009,
    image: "img/the-vampire-diaries.jpg",
  },
  {
    id: 3,
    name: "The Boys",
    category: "comedy",
    platform: "Prime Video",
    rating: 8,
    year: 2019,
    image: "img/the-boys.jpg",
  },
  {
    id: 4,
    name: "One Tree Hill",
    category: "drama",
    platform: "Netflix",
    rating: 9,
    year: 2003,
    image: "img/one-tree-hill.jpeg",
  },
  {
    id: 5,
    name: "Stranger Things",
    category: "science-fiction",
    platform: "Netflix",
    rating: 6,
    year: 2016,
    image: "img/stranger-things.jpg",
  },
  {
    id: 6,
    name: "Peaky Blinders",
    category: "action",
    platform: "Netflix",
    rating: 9,
    year: 2013,
    image: "img/peaky-blinders.jpg",
  },
  {
    id: 7,
    name: "Friends",
    category: "comedy",
    platform: "Netflix",
    rating: 9,
    year: 2004,
    image: "img/friends.jpg",
  },
  {
    id: 8,
    name: "Supernatural",
    category: "science-fiction",
    platform: "Prime Video",
    rating: 10,
    year: 2005,
    image: "img/supernatural.jpg",
  },
  {
    id: 9,
    name: "Dexter",
    category: "thriller",
    platform: "Prime Video",
    rating: 8,
    year: 2006,
    image: "img/dexter.jpeg",
  },
  {
    id: 10,
    name: "Sherlock",
    category: "action",
    platform: "BBC iPlayer",
    rating: 9,
    year: 2010,
    image: "img/Sherlock.jpg",
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
