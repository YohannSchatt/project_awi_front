import { InfoJeuUnitaireDisponibleDto } from "../../jeu/dto/info-jeu-unitaire-disponible.dto";

export interface EnregistrerRetraitJeuDto {
    idVendeur: number;
    idJeu: number[];
    argent: boolean
}

