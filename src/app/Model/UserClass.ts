import { UserInterface } from './UserInterface';

export class User implements UserInterface {
    public prenom: string;
    
    public nom: string;
    
    public email: string;
    
    public role: string;
    
    constructor() {
        this.prenom = '';
        this.nom = '';
        this.email = '';
        this.role = '';
    }
}