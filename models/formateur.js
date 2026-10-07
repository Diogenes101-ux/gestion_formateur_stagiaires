class Formateur extends Personne {
    constructor(nom, prenom, age, matricule, specialite, email) {
        super(nom, prenom, age);
        this.matricule = matricule;
        this.specialite = specialite;
        this.email = email;
    }
}