
// 1. Les catégories possibles
export type Categorie =| "vetements"| "chaussures"| "accessoires"| "maison";
  
// 2. La structure d'un produit
export type Produit = {
  readonly id: number;
  nom: string;
  prix: number;
  categorie: Categorie;
  stock: number;
};
// 3. La structure d'une ligne du panier
export type LignePanier = {
  produit: Produit;
  quantite: number;
};
