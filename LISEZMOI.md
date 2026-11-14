# In Vino - mise en route (15 minutes, une seule fois)

L'app est une web app installable (PWA) : un seul lien, qui marche sur iPhone et Android, s'installe sur l'écran d'accueil comme une vraie appli et fonctionne hors-ligne.

Aucun serveur à payer ni à maintenir :
- **L'app** est hébergée gratuitement par GitHub Pages.
- **Les données** (vins, notes, photos) sont stockées dans un dépôt GitHub **privé** qui t'appartient. Chaque modification y est enregistrée avec son historique complet : rien ne se perd, même une suppression peut être annulée.
- **Chaque téléphone** garde aussi une copie complète en local. On peut noter un vin sans réseau, la synchro se fait au retour du réseau.
- Le bouton **Exporter** (onglet Confrérie) crée en plus une archive complète dans un seul fichier, à garder où tu veux.

---

## 1. Créer un compte GitHub
Sur github.com, si tu n'en as pas déjà un. Gratuit.

## 2. Publier l'app (dépôt public)
1. Bouton **New repository**. Nom : `in-vino`. Visibilité : **Public**. Crée-le.
2. Sur la page du dépôt : **Add file > Upload files**, puis glisse **tout le contenu** de ce dossier (index.html, sw.js, manifest.webmanifest, et les dossiers `fonts` et `icons`). Valide avec **Commit changes**.
3. **Settings > Pages**. Dans « Branch », choisis `main` et `/ (root)`, puis **Save**.
4. Une à deux minutes plus tard, l'app est en ligne sur :
   `https://TON-PSEUDO.github.io/in-vino/`

Ce dépôt ne contient que le code de l'app, aucune donnée ni mot de passe.

## 3. Créer la cave (dépôt privé)
1. **New repository**. Nom : `in-vino-data`. Visibilité : **Private**.
2. Coche **Add a README file** (important : le dépôt ne doit pas être vide). Crée-le.

## 4. Créer la clé d'accès de la cave
1. Photo de profil > **Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token**.
2. Nom : `In Vino`. Expiration : **No expiration** si c'est proposé, sinon la durée la plus longue.
3. **Repository access** : *Only select repositories* > `in-vino-data` uniquement.
4. **Permissions > Repository permissions > Contents** : **Read and write**.
5. **Generate token** et copie la clé (`github_pat_...`). Elle ne s'affiche qu'une fois.

Cette clé ne peut toucher qu'à la cave, rien d'autre sur ton compte.

## 5. Relier l'app
1. Ouvre `https://TON-PSEUDO.github.io/in-vino/` sur ton téléphone.
2. Onglet **Confrérie** : ton prénom, puis dans « La cave partagée » : ton pseudo GitHub, `in-vino-data` et la clé. **Relier la cave**.
3. Le point en haut à droite passe au vert : c'est synchronisé.

## 6. Inviter les amis
Onglet **Confrérie > Inviter un ami** : ça génère un lien à envoyer dans le groupe. Ils l'ouvrent, tapent leur prénom, c'est tout. Pas de compte GitHub à créer pour eux.

Le lien contient la clé de la cave : à envoyer seulement aux amis. Si un jour il circule trop, tu supprimes la clé sur GitHub, tu en crées une nouvelle (étape 4), tu relies à nouveau et tu renvoies une invitation.

## 7. Installer sur l'écran d'accueil
- **iPhone** : dans Safari, bouton Partager puis « Sur l'écran d'accueil ».
- **Android** : dans Chrome, menu ⋮ puis « Installer l'application ».

---

## Bon à savoir
- **Retrouver un vin effacé** : dans le dépôt `in-vino-data`, ouvre `data/cave.json` puis « History » : chaque version de la cave y est.
- **Photos** : elles sont compressées (environ 200 Ko) et rangées dans `photos/`. Un dépôt GitHub supporte largement plusieurs milliers de photos.
- **Si le point devient rouge** : en général la clé a expiré ou a été supprimée. Refais l'étape 4, puis Confrérie > Déconnecter > Relier avec la nouvelle clé, et renvoie une invitation.
- **Mettre l'app à jour** : remplace `index.html` dans le dépôt `in-vino`. Les données ne bougent pas.
