"use strict";

// Tableau de données — à générer avec Copilot / une IA
const data = [
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

/**
 * Affiche les séries dans la page
 * @param {Array} tabSeries - Tableau d'objets à afficher
 */
function afficherSeries(tabSeries) {
    // Récupère la liste #list
    const ulList = document.getElementById("list");

//Vide, réinitialise la liste
    ulList.innerHTML = "";

//Parcours la liste et crée un li par série
    tabSeries.forEach(serie => {
        ulList.innerHTML += `
        <article class="card">
            <img src="${serie.image}" alt="${serie.name}">
            <div class="card-body">
                <h2>${serie.name}</h2>
                <p>${serie.category} - ${serie.year}</p>
                <span class="rating">${serie.rating}</span>
            </div>
        </article>
    `;
    });
}

// Appel au chargement de la page
afficherSeries(data);