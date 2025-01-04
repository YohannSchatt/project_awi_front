import { InfoJeuUnitaireDisponibleDto } from './info-jeu-unitaire-disponible.dto';

export interface InvoiceDto {
    date: Date;
    email: string;
    items : InfoJeuUnitaireDisponibleDto[];
}