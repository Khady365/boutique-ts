import "./style.css";
console.log("La boutique démarre");
import type { LignePanier, Produit } from "./types.ts";
import { formatPrix } from "./outils.ts";
import { catalogue } from "./catalogue.ts";
import {ajouterAuPanier, retirerDuPanier, nombreArticles, totalPanier} from "./panier.ts";



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

  bouton.addEventListener("click", () => {
    panier = ajouterAuPanier(panier, produit);
    afficherPanier();
  });
}

  // Ajouter les éléments dans la carte
  carte.append(titre, prix, bouton);

  return carte;
}

function afficherCatalogue(): void {
  zoneCatalogue.replaceChildren(...catalogue.map(creerCarte));
}
afficherCatalogue();

let panier: LignePanier[] = [];

function creerLignePanier(ligne: LignePanier): HTMLLIElement {
  const element = document.createElement("li");

  element.textContent =
    `${ligne.quantite} x ${ligne.produit.nom} : ${formatPrix(ligne.produit.prix)}`;

  const bouton = document.createElement("button");
  bouton.textContent = "Retirer";

  bouton.addEventListener("click", () => {
    panier = retirerDuPanier(panier, ligne.produit.id);
    afficherPanier();
  });

  element.append(bouton);

  return element;
}


function afficherPanier(): void {
  listePanier.replaceChildren(...panier.map(creerLignePanier));

  zoneTotal.textContent = formatPrix(totalPanier(panier));

  compteur.textContent = String(nombreArticles(panier));
}
afficherCatalogue();
afficherPanier();