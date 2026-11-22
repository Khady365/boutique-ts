
import type { LignePanier, Produit } from "./types.ts";

// 1. Ajouter un produit au panier
export function ajouterAuPanier(
  panier: LignePanier[],
  produit: Produit
): LignePanier[] {
  const existe = panier.some(
    ligne => ligne.produit.id === produit.id
  );

  if (!existe) {
    return [...panier, { produit, quantite: 1 }];
  }

  return panier.map(ligne =>
    ligne.produit.id === produit.id
      ? { ...ligne, quantite: ligne.quantite + 1 }
      : ligne
  );
}

// 2. Retirer un produit du panier
export function retirerDuPanier(
  panier: LignePanier[],
  id: number
): LignePanier[] {
  return panier.filter(ligne => ligne.produit.id !== id);
}

// 3. Calculer le nombre total d'articles
export function nombreArticles(panier: LignePanier[]): number {
  return panier.reduce(
    (total, ligne) => total + ligne.quantite,
    0
  );
}

// 4. Calculer le prix total du panier
export function totalPanier(panier: LignePanier[]): number {
  return panier.reduce(
    (total, ligne) => total + ligne.produit.prix * ligne.quantite,
    0
  );
}



