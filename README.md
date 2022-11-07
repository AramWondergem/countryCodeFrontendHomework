--------------- hoe project te starten ----------

1. Maak eerst HTML (index.html), css (styles.css) en javascript(main || app.js) bestand aan in de map scr
2. koppel de bestanden. link tag voor css en script tag met `<script defer type="module" src="main.js"></script>` voor javascript
3. npm init aanmaken --> entry point goed checken
4. npm install --save-dev parcel
5. npm install jest --save-dev 
6. scripts toevoegen: "test": "npx jest",
   "test:watch": "npx jest --watch",
   "start": "parcel scr/index.html",
   "build": "parcel build scr/index.html"
7. .gitignore file aanmaken : /.idea
   /node_modules
   /.parcel-cache
8. git init (bij nieuwe projecten)
9. applicatie kan je met "npm run start" starten

----------------- hoe te testen -------------


1. Maak een map genaamd `__test__` en stop daar jouw test bestand in (`index.test.js`)
2. Roep daarin een de `test`-functie aan en geef deze een beschrijving en anonieme functie mee 
3. test altijd eerst even of dit werkt met console log en voer test uit: `npm run test`. 
4. gebruik arrange, act, assert 
5. assert maakt gebruikt van de `expect` function 
6. exporteer alle functies die je wilt testen met `module.export = { name: functionName} `
7. De functies importen met require function in testbestand en gebruik hiervoor destructering `const {name} = require('../bestandsnaam)`


