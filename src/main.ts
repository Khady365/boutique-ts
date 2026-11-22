import "./style.css";
console.log("La boutique démarre");
import type { Produit } from "./types.ts";
import { formatPrix } from "./outils.ts";
import { catalogue } from "./catalogue.ts";


function trouver<T extends HTMLElement>(selecteur: string): T {
  const element = document.querySelector<T>(selecteur);

  if (!element) {
    throw new Error(`Élément ${selecteur} introuvable : vérifiez index.html`);
  }

  return element;
}

const zoneCatalogue = trouver<HTMLDivElement>("#catalogue");
const listePanier = trouver<HTMLUListElement>("#lignes-panier");
const zoneTotal = trouver<HTMLElement>("#total");
const compteur = trouver<HTMLSpanElement>("#compteur");
const champRecherche = trouver<HTMLInputElement>("#recherche");
const filtreCategorie = trouver<HTMLSelectElement>("#filtre-categorie");


function creerCarte(produit: Produit): HTMLElement {
  // Créer la carte
  const carte = document.createElement("div");
  carte.className = "carte";

  // Créer le titre avec le nom du produit
  const titre = document.createElement("h3");
  titre.textContent = produit.nom;

  // Créer le prix
  const prix = document.createElement("p");
  prix.className = "prix";
  prix.textContent = formatPrix(produit.prix);

  // Créer le bouton
  const bouton = document.createElement("button");

  if (produit.stock === 0) {
    bouton.textContent = "Épuisé";
    bouton.disabled = true;
  } else {
    bouton.textContent = "Ajouter au panier";
  }

  // Ajouter les éléments dans la carte
  carte.append(titre, prix, bouton);

  return carte;
}

function afficherCatalogue(): void {
  zoneCatalogue.replaceChildren(...catalogue.map(creerCarte));
}
afficherCatalogue();