import { Decimal } from 'decimal.js';

export class VenteDto {
    prix: Decimal = new Decimal(0);
    nomVendeur: string = "";
    nomJeu: string = "";
    nomSession: string = "";
    dateAchat: Date = new Date(Date.UTC(0, 0, 0, 0, 0, 0, 0));
}