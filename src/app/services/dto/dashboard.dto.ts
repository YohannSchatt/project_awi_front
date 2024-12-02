import { Decimal } from 'decimal.js';
import { VenteDto } from './vente.dto';
export class DashboardDto {
    ArgentARendreSession: Decimal = new Decimal(0);
    ArgentGagneSession: Decimal = new Decimal(0);
    ArgentComission: Decimal =  new Decimal(0);
    ArgentTotal: Decimal = new Decimal(0);
    sommeDue: Decimal = new Decimal(0);
    sommeRetire: Decimal = new Decimal(0);
    DetailVentes: VenteDto[] = [];
}