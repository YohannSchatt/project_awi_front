export class Session {

    public id : number;

    public static numberOfSession : number = 0;

    public lieu : string;

    public dateDebut : Date;

    public dateFin : Date;

    public titre : string;

    public  description : string;

    public comission : number;

    constructor(lieu: string, dateDebut: Date, dateFin: Date, titre: string, description: string, id : number = Session.numberOfSession, comission : number = 0) {
        this.lieu = lieu;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.titre = titre;
        this.description = description;
        this.id = id
        this.comission = comission;
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

    public getId(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getComission(): number {
        return this.comission;
    }

    public setComission(comission: number): void {
        this.comission = comission;
    }
}