import { GestionnaireInterface } from './GestionnaireInterface';

export class Gestionnaire implements GestionnaireInterface {

    public nom: string;
    public prenom: string;
    public email: string;

    constructor(nom : string, prenom : string, email : string) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
    }

    public getNom() : string {
        return this.nom;
    }

    public getPrenom() : string {
        return this.prenom;
    }

    public getEmail() : string {
        return this.email;
    }

    public setNom(nom: string) : void {
        this.nom = nom;
    }

    public setPrenom(prenom: string) : void {
        this.prenom = prenom;
    }

    public setEmail(email: string) : void {
        this.email = email;
    }
}