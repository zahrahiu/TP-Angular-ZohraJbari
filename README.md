# 🌸 Parfums Luxe – Boutique de parfums en ligne
# Zohra JBARI DCC0020/24.
Parfums Luxe est une application Angular qui permet de visualiser un catalogue de parfums (liste, détails) et de gérer un panier. Elle utilise une API Express qui fournit les données au format JSON, ainsi qu’un serveur Node (server.js) pour héberger le projet ou pour un déploiement en production.
# Instalation
 ## Installer les dépendances du workspace  
$ npm install  
## jsPDF  
$ npm install jspdf  
$ npm install jspdf html2canvas  
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
![image](https://github.com/user-attachments/assets/b9eaae2a-c9ff-4bf2-8629-2c6461b53f25)

# Affiichage de choix de language
![image](https://github.com/user-attachments/assets/f2691be4-1ae5-4e32-8ef6-d805e327272e)



# détails des produits,affichage de la quantité

![image](https://github.com/user-attachments/assets/6511bcdf-7cf5-44e0-9372-a64186cdb985)
![image](https://github.com/user-attachments/assets/d7e5ef10-f84b-4422-8d4d-b43128fafa71)


# Page de panier
![image](https://github.com/user-attachments/assets/f7f5e01e-d0fc-44f7-a796-7fae883983ae)






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
