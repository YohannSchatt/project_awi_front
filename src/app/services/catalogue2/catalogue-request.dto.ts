export class CatalogueRequestDto {

  nom?: string;

  editeur?: string;

  prixMin?: number;

  prixMax?: number;

  page: number = 1;
}
