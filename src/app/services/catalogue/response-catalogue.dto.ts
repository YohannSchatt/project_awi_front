export class CatalogueDto {
  jeux: InfoJeuUnitaireDto[] = [];
}

export class InfoJeuUnitaireDto {
  id: number = 0;
  nom: string = '';
  description: string = '';
  editeur: string = '';
  prix: number = 0;
  prenomVendeur: string = '';
  nomVendeur: string = '';
  image: string = ''; // Add the image attribute
  etat: string = ''; // Add the statut attribute

  // Add other properties as needed
}
