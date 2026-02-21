let baseDeDonnees = {};
// NOUVEAU : La mémoire de la modale
let categorieActuelle = ""; 

async function chargerVersets() {
    const reponse = await fetch('data/versets_fr.json');
    baseDeDonnees = await reponse.json();
    console.log("Les versets sont bien chargés !");
}

chargerVersets();

const fenetreModal = document.getElementById('fenetreModal');
const affichageTexte = document.getElementById('texteVerset');
const affichageReference = document.getElementById('referenceVerset');
const boutonFermer = document.getElementById('btnFermerCroix');
const boutonCopier = document.getElementById('btnCopier');
// NOUVEAU : On attrape le bouton Relancer
const boutonRelancer = document.getElementById('btnRelancer');

const tousLesBoutons = document.querySelectorAll('.btn-emotion');

// --- NOUVEAU : La fonction réutilisable ---
// Au lieu de réécrire le code, on l'isole ici. 
// On lui donne une catégorie (ex: "amour"), et elle fait tout le travail.
function afficherUnVerset(categorie) {
    if (baseDeDonnees[categorie]) {
        const listeVersets = baseDeDonnees[categorie];
        const indexAleatoire = Math.floor(Math.random() * listeVersets.length);
        const versetChoisi = listeVersets[indexAleatoire];
        
        // On met à jour le texte
        affichageTexte.textContent = `"${versetChoisi.texte}"`;
        affichageReference.textContent = `- ${versetChoisi.reference}`;
        
        // On sauvegarde la catégorie dans la mémoire globale pour que le bouton "Relancer" la connaisse
        categorieActuelle = categorie;
        
        // On remet le texte du bouton copier à zéro (utile si on relance juste après avoir copié)
        boutonCopier.textContent = "Copier";
        
        fenetreModal.className = 'modal-visible';
    }
}

// L'ordre pour les boutons du menu principal
tousLesBoutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
        const categorieCible = bouton.getAttribute('data-category');
        // On appelle notre super-fonction
        afficherUnVerset(categorieCible);
    });
});

// --- NOUVEAU : L'ordre pour le bouton Relancer ---
boutonRelancer.addEventListener('click', () => {
    // Il utilise la même fonction, mais avec la catégorie mémorisée !
    afficherUnVerset(categorieActuelle);
});

// L'ordre pour la croix
boutonFermer.addEventListener('click', () => {
    fenetreModal.className = 'modal-cachee';
});

// L'ordre pour le bouton Copier
boutonCopier.addEventListener('click', () => {
    const texteACopier = `${affichageTexte.textContent} ${affichageReference.textContent}`;
    
    navigator.clipboard.writeText(texteACopier).then(() => {
        boutonCopier.textContent = "Copié !";
    });
});