
import "./style.css";


import type { LignePanier, Produit } from "./types.ts";
import { formatPrix } from "./outils.ts";
import { catalogue } from "./catalogue.ts";

import {
  ajouterAuPanier,
  retirerDuPanier,
  nombreArticles,
  totalPanier
} from "./panier.ts";

// État du panier
let panier: LignePanier[] = [];

// Récupérer les éléments HTML
function trouver<T extends HTMLElement>(selecteur: string): T {
  const element = document.querySelector<T>(selecteur);

  if (!element) {
    throw new Error(
      `Élément ${selecteur} introuvable : vérifiez index.html`
    );
  }

  return element;
}

const zoneCatalogue = trouver<HTMLDivElement>("#catalogue");
const listePanier = trouver<HTMLUListElement>("#lignes-panier");
const zoneTotal = trouver<HTMLElement>("#total");
const compteur = trouver<HTMLSpanElement>("#compteur");
const champRecherche = trouver<HTMLInputElement>("#recherche");
const filtreCategorie = trouver<HTMLSelectElement>("#filtre-categorie");

// Créer une carte produit
function creerCarte(produit: Produit): HTMLElement {
  const carte = document.createElement("div");
  carte.className = "carte";

  const titre = document.createElement("h3");
  titre.textContent = produit.nom;

  const prix = document.createElement("p");
  prix.className = "prix";
  prix.textContent = formatPrix(produit.prix);

  const bouton = document.createElement("button");

  if (produit.stock === 0) {
    bouton.textContent = "Épuisé";
    bouton.disabled = true;
  } else {
    bouton.textContent = "Ajouter au panier";

    bouton.addEventListener("click", () => {
      panier = ajouterAuPanier(panier, produit);
      afficherPanier();
    });
  }

  carte.append(titre, prix, bouton);

  return carte;
}

// Filtrer les produits selon la recherche et la catégorie
function produitsAffiches(): Produit[] {
  const recherche = champRecherche.value.trim().toLowerCase();
  const categorie = filtreCategorie.value;

  return catalogue.filter((produit) => {
    const correspondCategorie =
      categorie === "toutes" || produit.categorie === categorie;

    const correspondRecherche =
      produit.nom.toLowerCase().includes(recherche);

    return correspondCategorie && correspondRecherche;
  });
}

// Afficher le catalogue filtré
function afficherCatalogue(): void {
  const produits = produitsAffiches();

  if (produits.length === 0) {
    zoneCatalogue.textContent =
      "Aucun produit ne correspond à votre recherche.";
    return;
  }

  zoneCatalogue.replaceChildren(...produits.map(creerCarte));
}

// Créer une ligne du panier
function creerLignePanier(ligne: LignePanier): HTMLLIElement {
  const element = document.createElement("li");

  element.textContent =
    `${ligne.quantite} x ${ligne.produit.nom} : ${formatPrix(
      ligne.produit.prix
    )}`;

  const bouton = document.createElement("button");
  bouton.textContent = "Retirer";

  bouton.addEventListener("click", () => {
    panier = retirerDuPanier(panier, ligne.produit.id);
    afficherPanier();
  });

  element.append(bouton);

  return element;
}

// Afficher le panier
function afficherPanier(): void {
  listePanier.replaceChildren(...panier.map(creerLignePanier));

  zoneTotal.textContent = formatPrix(totalPanier(panier));

  compteur.textContent = String(nombreArticles(panier));
}

// Événements de recherche et de catégorie
champRecherche.addEventListener("input", afficherCatalogue);

filtreCategorie.addEventListener("change", afficherCatalogue);

// Affichage initial
afficherCatalogue();
afficherPanier();
