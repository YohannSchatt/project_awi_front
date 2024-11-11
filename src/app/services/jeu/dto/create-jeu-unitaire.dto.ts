export class CreerJeuUnitaire {
  prix: number;
  statut: 'DEPOSE' | 'DISPONIBLE' | 'VENDU' | 'RECUPERER';
  etat: 'NEUF' | 'BONNE_ETAT' | 'PIECE_MANQUANTES';
  idVendeur: number;
  idJeu: number;

  constructor(
    prix: number,
    statut: 'DEPOSE' | 'DISPONIBLE' | 'VENDU' | 'RECUPERER',
    etat: 'NEUF' | 'BONNE_ETAT' | 'PIECE_MANQUANTES',
    idVendeur: number,
    idJeu: number
  ) {
    this.prix = prix;
    this.statut = statut;
    this.etat = etat;
    this.idVendeur = idVendeur;
    this.idJeu = idJeu;
  }
}
