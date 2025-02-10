import { Statut } from '../../../Model/Statut';

export interface InfoJeuStockDto {
  nom: string;
  editeur: string;
  description: string;
  statut : Statut;
  idJeuUnitaire: number;
  prix: number;
}