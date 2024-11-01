export class Session {

    public lieu : string;

    public dateDebut : Date;

    public dateFin : Date;

    public titre : string;

    constructor(lieu: string, dateDebut: Date, dateFin: Date, titre: string) {
        this.lieu = lieu;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.titre = titre;
    }

    public getLieu(): string {
        return this.lieu;
    }

    public setLieu(lieu: string): void {
        this.lieu = lieu;
    }

    public getDateDebut(): Date {
        return this.dateDebut;
    }

    public setDateDebut(dateDebut: Date): void {
        this.dateDebut = dateDebut;
    }

    public getDateFin(): Date {
        return this.dateFin;
    }

    public setDateFin(dateFin: Date): void {
        this.dateFin = dateFin;
    }

    public getTitre(): string {
        return this.titre;
    }

    public setTitre(titre: string): void {
        this.titre = titre;
    }
}