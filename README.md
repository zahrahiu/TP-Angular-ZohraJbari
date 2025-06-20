# 🌸 Parfums Luxe – Boutique de parfums en ligne
# Zohra JBARI DCC0020/24.
Parfums Luxe est une application Angular qui permet de visualiser un catalogue de parfums (liste, détails) et de gérer un panier. Elle utilise une API Express qui fournit les données au format JSON, ainsi qu’un serveur Node (server.js) pour héberger le projet ou pour un déploiement en production.
# Instalation
 ## Installer les dépendances du workspace  
 ```bash
 npm install
 ```
## jsPDF  
 ```bash
$ npm install jspdf  
$ npm install jspdf html2canvas
 ```
#  Lancement
A-Pour lancer Api-server  
  
1-Ouvrez terminal  
2-  
![image](https://github.com/user-attachments/assets/0b848ac8-94af-4ce3-9d24-5927ac3473c2)  
3-Lancer avec commande npm start  
![image](https://github.com/user-attachments/assets/77e664eb-cc1d-4288-a457-8fd8eda03efc)  
B-Lancer le serveur Angular  
1- Dans un autre terminal  
2-  Lancer avec commande "node server.js"
![image](https://github.com/user-attachments/assets/372c186c-fdce-4f83-a1dc-d1b61b8f2b23)  
C-Lancer le projet  
1 - Dans un autre terminal  
2 - Lancer avec commande "ng serve"  

# page d'Accueil  
La page d’accueil de l’application PARFUMS LUXE affiche un design élégant et structuré autour d’un menu simple (ABOUT, COLLECTIONS, SHOP, CONTACT). Elle met en valeur la philosophie de la marque via un slogan évocateur et présente trois univers de parfums (Floraux, Boisés, Orientaux), chacun associé à une ambiance et à un bouton “DÉCOUVRIR”. Une section dédiée souligne la qualité artisanale et l’authenticité des parfums, dans une atmosphère raffinée et immersive. 
  
![image](https://github.com/user-attachments/assets/9adcc9f1-276f-4743-a5d3-8aacd0ad0e42)
![image](https://github.com/user-attachments/assets/580b0c37-06cb-48e7-8cd6-71043495b4e8)
![image](https://github.com/user-attachments/assets/7bcce635-c910-488c-b888-ff37bdba499f)
![image](https://github.com/user-attachments/assets/04e1d8f3-875a-4b83-be1c-33d34369a170)

# page d'Accueil en anglais
![image](https://github.com/user-attachments/assets/b6f4d67b-ceef-4363-a837-b6ae5e9b205e)
![image](https://github.com/user-attachments/assets/0627fc51-b8ab-490b-8880-d4998a041e4e)
![image](https://github.com/user-attachments/assets/b73e1a56-fac3-4e3c-bb35-c9720abc234f)
![image](https://github.com/user-attachments/assets/c9c660fc-79c7-4284-ab77-8facd4a6c312)


# Page de connexion
![image](https://github.com/user-attachments/assets/04b45f74-75ef-4995-b9c9-9260ff4acced)  
. Une validation côté client garantit que les champs obligatoires (email et mot de passe) sont remplis avant envoi, avec des messages d’erreur contextuels.  
![image](https://github.com/user-attachments/assets/451f0bd4-4145-42d7-8cb6-59f3e837cfbd)  
Si le mot de passe n'est pas confirmé, un message d'erreur s'affichera  
![image](https://github.com/user-attachments/assets/682d8838-3fb7-4765-8afe-750297e68c72)  


# Page des listes des produits 
la réduction appliquée, un timer indiquant le temps restant de l’offre, une note en étoiles, et des boutons pour voir les détails ou ajouter le produit aux favoris. Des filtres permettent aussi de trier les parfums par catégorie (Promo, Homme, Femme, Enfants).  

![image](https://github.com/user-attachments/assets/b9eaae2a-c9ff-4bf2-8629-2c6461b53f25)  
l’utilisateur peut rechercher un parfum par nom via une barre dédiée.  

![image](https://github.com/user-attachments/assets/5655f6b7-86ea-4734-9c4f-b6f9e724b598)


# Affiichage de choix de language
![image](https://github.com/user-attachments/assets/f2691be4-1ae5-4e32-8ef6-d805e327272e)

# Page de produits favoris

Cette interface interactive permet à l'utilisateur de consulter et gérer sa liste de parfums favoris pour sauvegarder ses préférences  
![image](https://github.com/user-attachments/assets/9161629a-a67e-4892-9dea-6f0ee6a11726)



# détails des produits,affichage de la quantité
La page de détails d’un parfum sur la plateforme PARFUMS LUXE permet à l’utilisateur de consulter toutes les informations essentielles sur un produit. Elle affiche l’image du flacon, le prix actuel avec éventuelle promotion, la quantité disponible, ainsi qu’un compte à rebours indiquant la fin de la réduction.  

![image](https://github.com/user-attachments/assets/6511bcdf-7cf5-44e0-9372-a64186cdb985)

 L’utilisateur peut lire une description complète du parfum, connaître ses ingrédients (comme le poivre rose, le jasmin ou le musc blanc), noter le produit, l’ajouter aux favoris ou au panier.    
   
![image](https://github.com/user-attachments/assets/d7e5ef10-f84b-4422-8d4d-b43128fafa71)

La page recommande d'autres parfums de la même marque ou au style similaire, enrichissant ainsi l’expérience de navigation et d’achat.  
  
 ![image](https://github.com/user-attachments/assets/ada7ac8c-7776-4976-9a15-87c58ca26084)
![image](https://github.com/user-attachments/assets/6d01e19f-7b01-4439-a2e8-cdc39e0e41a4)



# Page de panier 
Cette page permet à l’utilisateur de voir tous les produits ajoutés à son panier, avec l’image, le nom, le format sélectionné, le prix unitaire et la quantité. Il peut modifier la quantité avec des boutons +/− ou supprimer un article. Le sous-total de chaque produit et le total général s’affichent automatiquement. Un bouton en bas permet de passer à la page de commande.  
 
![image](https://github.com/user-attachments/assets/43b84e3f-33c5-409b-b3b1-2854cfb98fab)  

Lorsque la quantité sélectionnée dépasse le stock disponible, le système affiche immédiatement un message d'erreur rouge 'Stock insuffisant' pour prévenir l'utilisateur et empêcher l'ajout au panier.  

![image](https://github.com/user-attachments/assets/903184e2-afd8-4850-a892-820be614ffd8)

Sur cette page, l’utilisateur saisit ses informations personnelles : nom, numéro de téléphone et adresse de livraison. Il choisit le mode de paiement (en espèces ou par carte) et peut sélectionner un emballage cadeau avec image et prix. Le bouton final permet de confirmer la commande avec le montant total clairement affiché. 

![image](https://github.com/user-attachments/assets/94036714-370f-470d-83be-20d411927d7d)

Formulaire de paiement par cart   

![image](https://github.com/user-attachments/assets/49e9ecfe-a2e9-42b4-b0af-f24a473a422d)  

L'utilisateur peut sélectionner un seul emballage parmi les options proposées, chacune affichant clairement son nom et son prix supplémentaire.  
![image](https://github.com/user-attachments/assets/b749a626-ae71-45c0-88b2-ad792fa39660)

  
# Page de Suivi des commandes
 Cette page permet à l’utilisateur de suivre l’état de sa commande une fois celle-ci confirmée. Elle affiche de manière claire les produits achetés, le montant total payé ainsi que le mode de paiement sélectionné.  
   
 ![image](https://github.com/user-attachments/assets/d68f4638-68e8-4103-95cf-91cafb81d750)

![image](https://github.com/user-attachments/assets/5550217a-7e46-4972-ac72-899c33176787)

Sur le côté droit de la page, une timeline verticale permet à l’utilisateur de suivre l’avancement de sa commande. Elle affiche les différentes étapes du traitement : "En cours", "Expédiée", et "Livrée", avec un indicateur visuel sur l’étape atteinte. Lorsque la commande est livrée, cette dernière étape est mise en surbrillance avec une icône entourée d’un cercle vert.

![image](https://github.com/user-attachments/assets/0115dab4-f68c-4407-a90f-7ff15473c342)


un message de remerciement apparaît en bas de page pour informer le client que sa commande est bien arrivée  
![image](https://github.com/user-attachments/assets/66922999-99b5-4e6d-9505-d8209963d0af)

Il est également possible pour l’utilisateur de télécharger la facture au format PDF ou d’imprimer directement les détails de la commande grâce à des boutons prévus à cet effet  



![image](https://github.com/user-attachments/assets/0bacf220-0173-4ebd-a44a-1030798e7a59)



This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
