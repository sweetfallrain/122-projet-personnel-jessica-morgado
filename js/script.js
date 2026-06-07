"use strict";

const DEFAULT_IMAGE = "https://placehold.co/400x300/171624/f7f1f5?text=Pas+d%27image";

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
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>`;

let data = [
    {
        id: 1,
        name: "The Mentalist",
        category: "Action",
        platform: "Netflix",
        rating: 10,
        year: 2008,
        image: "img/the-mentalist.jpg"
    },
    {
        id: 2,
        name: "The Vampire Diaries",
        category: "Science-fiction",
        platform: "Netflix",
        rating: 10,
        year: 2009,
        image: "img/the-vampire-diaries.jpg"
    },
    {
        id: 3,
        name: "The Boys",
        category: "Comedy",
        platform: "Prime Video",
        rating: 8,
        year: 2019,
        image: "img/the-boys.jpg"
    },
    {
        id: 4,
        name: "One Tree Hill",
        category: "Drama",
        platform: "Netflix",
        rating: 9,
        year: 2003,
        image: "img/one-tree-hill.jpeg"
    },
    {
        id: 5,
        name: "Stranger Things",
        category: "Science-fiction",
        platform: "Netflix",
        rating: 9,
        year: 2016,
        image: "img/stranger-things.jpg"
    },
    {
        id: 6,
        name: "Peaky Blinders",
        category: "Action",
        platform: "Netflix",
        rating: 9,
        year: 2013,
        image: "img/peaky-blinders.jpg"
    },
    {
        id: 7,
        name: "Friends",
        category: "Comedy",
        platform: "Netflix",
        rating: 9,
        year: 2004,
        image: "img/serie-friends.jpg"
    },
    {
        id: 8,
        name: "Supernatural",
        category: "Science-fiction",
        platform: "Prime Video",
        rating: 10,
        year: 2005,
        image: "img/serie-supernatural.jpg"
    },
    {
        id: 9,
        name: "Dexter",
        category: "Thriller",
        platform: "Prime Video",
        rating: 8,
        year: 2006,
        image: "img/dexter.jpeg"
    },
    {
        id: 10,
        name: "Sherlock",
        category: "Action",
        platform: "BBC iPlayer",
        rating: 9,
        year: 2010,
        image: "img/serie-sherlock.jpg"
    }
];

const btnSort = document.getElementById("btn-sort");
const searchInput = document.getElementById("search");
const form = document.getElementById("form-add");
const inputName = document.getElementById("input-name");
const inputCategory = document.getElementById("input-category");
const inputPlatform = document.getElementById("input-platform");
const inputYear = document.getElementById("input-year");
const inputRating = document.getElementById("input-rating");
const sortCriteria = document.getElementById("sort-criteria");

let sortAsc = false;

function refresh() {
    const query = searchInput.value.toLowerCase();
    const criteria = sortCriteria.value;

    let result = data.filter(serie =>
        serie.name.toLowerCase().includes(query)
    );

    result = [...result].sort((a, b) => {

        if (criteria === "name") {

            if (sortAsc) {
                return a.name.localeCompare(b.name);
            }

            return b.name.localeCompare(a.name);
        }

        if (criteria === "year") {

            if (sortAsc) {
                return a.year - b.year;
            }

            return b.year - a.year;
        }

        if (sortAsc) {
            return a.rating - b.rating;
        }

        return b.rating - a.rating;
    });

    afficherSeries(result);
}

btnSort.addEventListener("click", function () {
    sortAsc = !sortAsc;
    btnSort.textContent = sortAsc ? "Trier ↑ (ASC)" : "Trier ↓ (DESC)";
    refresh();
});

searchInput.addEventListener("input", refresh);
sortCriteria.addEventListener("change", refresh);

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
        image: DEFAULT_IMAGE
    };

    data.push(nouvelleSerie);
    refresh();
    form.reset();
});

document.getElementById("list").addEventListener("click", function (event) {
    const btn = event.target.closest(".btn-delete");
    if (!btn) return;

    const card = btn.closest(".card");
    const id = Number(card.dataset.id);

    if (!confirm("Supprimer cette série ?")) return;

    data = data.filter(serie => serie.id !== id);
    refresh();
});

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
                ${escapeHtml(serie.category)}
                -
                ${serie.year}
                -
                ${escapeHtml(serie.platform)}
              </p>
                    
                    <div class="card-footer">
                        <span class="rating">★ ${serie.rating}/10</span>
                        
                        <button class="btn-delete" type="button"
                                title="Supprimer ${escapeHtml(serie.name)}"
                                aria-label="Supprimer">
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