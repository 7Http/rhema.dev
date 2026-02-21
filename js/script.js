// 1. On crée une boîte vide pour stocker nos versets une fois chargés
let baseDeDonnees = {};

// 2. Fonction pour aller lire le fichier JSON au démarrage
async function chargerVersets() {
    // "fetch" va chercher le fichier. "await" dit au code d'attendre qu'il ait fini.
    const reponse = await fetch('data/versets_fr.json');
    baseDeDonnees = await reponse.json();
    console.log("Les versets sont bien chargés dans le système !");
}

// On lance le chargement tout de suite
chargerVersets();

// 3. On sélectionne TOUS les boutons qui ont la classe 'btn-emotion'
const tousLesBoutons = document.querySelectorAll('.btn-emotion');

// 4. On donne un ordre à chaque bouton
tousLesBoutons.forEach(bouton => {

    // On "écoute" le clic
    bouton.addEventListener('click', () => {

        // On regarde quelle émotion est écrite dans le 'data-category' du HTML
        const categorie = bouton.getAttribute('data-category');

        // On vérifie si cette catégorie existe bien dans notre JSON
        if (baseDeDonnees[categorie]) {

            // On récupère la liste des versets de cette catégorie (Amour ou Peur)
            const listeVersets = baseDeDonnees[categorie];

            // On tire un chiffre au hasard entre 0 et la taille de la liste
            const indexAleatoire = Math.floor(Math.random() * listeVersets.length);

            // On pioche le verset qui correspond à ce chiffre
            const versetChoisi = listeVersets[indexAleatoire];

            // On affiche le résultat discrètement dans la console
            console.log(`Tu as cliqué sur ${categorie} :`, versetChoisi);
        }
    });
});