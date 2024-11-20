export class CreateVendeurDto {
    prenom: string;
    nom: string;
    email: string;
    numero: string;

    constructor(){
        this.prenom = "";
        this.nom = "";
        this.email = "";
        this.numero = "";
    }
  }