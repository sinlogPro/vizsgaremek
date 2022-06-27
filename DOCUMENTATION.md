## Eszközleltár Applikáció - Eszközök nyilvántartását segítő alkalmazás

## **1. Az alkalmazás célja**

- Az alkalmazás feladata, hogy segítséget nyújtson az eszközök nyilvántartásában.


----------------------------------------
## **2. Az alkalmazás telepítése**


- Előfeltételek: Chrome böngésző, Angular keretrendszer, NodeJS futtató-környezet, Git verziókezelő, Docker Desktop konténer-management alkalmazás.
- Forkolni szükséges ennek a GitHub repository-nak a tartalmát: https://github.com/sinlogPro/vizsgaremek   
- A célgépre le kell klónozni ugyanezt a repository-t a VSCode terminál ablakában a kívánt mappában állva:
  ```
  git clone https://github.com/sinlogPro/vizsgaremek.git
  ```
- Telepíteni kell az alkalmazások függőségeit:
  * backend: (terminálban a /backend mappában állva)
    ```
    npm i
    ```
  * frontend: (terminálban a /frontend mappában állva)
    ```
    npm i
    ```
- Amennyiben még nincsen telepítve a célgépre az Angular keretrendszer, terminál ablakban ki kell adni:
    ```
    npm i -g @angular/cli
    ```
- Amennyiben nem az alap konfigurációval szeretné futtatni az alkalmazást, végezze el a konfigurálást a 3.sz pont alapján.

- A /frontend mappában állva a terminálban ki kell adni:
    ```
    ng build
    ```   
- A '/frontend/dist/leltar' mappa teljes tartalmát be kell másolni a /backend/public mappába (amennyiben nincsenek még ott ezek a file-ok a klónozás után)

- A külön mellékelt file-okat be kell másolni:
  - .env file-t a /backend mappába
  - default.json és test.json file-okat a /backend/config almappába

Az alkalmazás indításra kész.


----------------------------------------
## **3. Az alkalmazás konfigurálása**

- A /frontend/environments mappában be  lehet állítani az API-végpont elérési útvonalát: (alapértékek)
  - _environment.ts_ állomány: http://localhost:3115/  
  - _environment.prod.ts_ állomány: http://localhost:3115/
- A /backend/.env file-ban megadható az API portszáma.


----------------------------------------
## **4. Az alkalmazás indítása**

A file-okban konfigurált Docker konténer indítása és inicializálása:
- El kell indítani a Docker Desktop alkalmazást (előzőleg telepítendő) és megvárni, amíg a motor futásra kész állapotba kerül.
- A /backend mappába belépve a terminálban ki kell adni:
  ```
  npm run deploy
  ```
- A Docker Desktop-ban láthatónak kell lenni a konténernek és futó állapotúnak kell lennie.
  Ekkor az alkalmazás a http://localhost:3115/ url-en érhető el alapértékű konfiguráció esetén.


- Ha Docker Desktop nélkül szeretné indítani az alkalmazást:
  (előfeltétel, hogy az ng build már lefutott és a /frontend/dist/leltar mappa tartalma bemásolva a fentiek alapján)

  - /backend mappába belépve terminálban:
    ```
    npm run server
    ```
    _vagy nodemon nélkül:_
    ```
    npm start
    ```
  - ekkor az alkalmazás a http://localhost:3115/ url-en érhető el a böngészőben.


_Megjegyzés_:  
A belépéshez egy érvényes felhasználó név és jelszó páros (példa):  

E-mail | Jelszó
------------ | -------------
testelo | cDv5BLObTers655rtTRZNYNhEsdf4UkITwl2


----------------------------------------
## **5. A végpontok dokumentációja**

- Swagger UI:
  - Az alábbi URL-en érhető el a böngészőben: https://localhost:3115/api-docs
  


----------------------------------------
## **Linkek:**  

- Az alkalmazás a következő User Story alapján készült :https://github.com/sinlogPro/vizsgaremek/blob/main/README.md
