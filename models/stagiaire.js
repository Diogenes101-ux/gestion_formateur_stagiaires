class Stagiaire extends Personne {
    constructor(nom, prenom, age, numInscript, filiere, groupe) {
        super(nom, prenom, age); 
        this.numInscript = numInscript;
        this.filiere = filiere;
        this.groupe = groupe;
    }
}