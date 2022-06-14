# vizsgaremek
Junior Fullstack API képzés - vizsgaremek

---
## Eszközleltár
---
## _**1. Nyító oldal**_

**1. agilis felhasználói történet:**
> _Röviden leírja az alkalmazás célját. Felhívja a figylemet, hogy csak bejelentkezés után használható az alkalmazás._

Mobilbarát megjelenítés. A menüpontok és más elemek nem látszanak. Csak a bejelentkező oldara lehet innen továbblépni.

## _**2. Bejelentkező oldal**_

**1. agilis felhasználói történet:**
> _Az alkalmazást kizárólag bejelentkezést követően lehet használni_

**Elfogadási kritérium:** 
Felhasználónév és jelszó megadásával lehet bejelentkezni. Regisztrációra itt nincs
lehetőség. (Új felhasználót egy másik helyen, egy megfelelő jogosultsággal rendelkező felhasználó vehet csak fel.)

## _**3. Főoldal**_

**1. agilis felhasználói történet:**
> _A főoldalról elérhetőek az alkalmazás szolgáltatásai._

**Elfogadási kritérium:**  
- A főoldal megjelenése és menüpontok választhatósága a felhasználó authorizációjától fűgg.
 - A navigációs sávban minden elérhető menüpont látszik, de csak megfelelő  jogosultsággal lehet használni őket.
Pl. annak, akinek 'leltárfelvételi ív' kitöltéséhez van kizárólag jogosultsága, nem tekítnthet be az eszközkészlet
teljes nyilvántartásába.


## _**4. Eszközkészlet**_

**1. agilis felhasználói történet:**
> _Az 'eszközkészlet' megjelenítése_

**Elfogadási kritérium:**  
- Az eszközlkészlet megtekíntéséhez megfelelő felhasználói jogosultság szükséges.
- A megjelenítés táblázatos formában történik.
- A táblázat adati szűrhetőek, rendezhetőek.

**2. agilis felhasználói történet:**
> _Új eszköz felvitele az eszközkészlet adatbázisba_

**Elfogadási kritérium:**  
- Új eszköz adatainak beviteléhez megfelelő jogosultság szükséges.
- Az adatok bevitele űrlapon történik.
- A kötelezően megadandó adatok mezőinek kitöltése nélkül nem menthetőek az adatbeviteli űrlap adatai.
- A beírt adatok válidálása nélkül nem menthetőek az adatok.
- Sikeres mentés után az adatbeviteli oldal visszanavigál az eszközök táblázatos megjelenítésének oldalára.

**3. agilis felhasználói történet:**
> _Meglévő eszköz adatainak módosítása_

**Elfogadási kritérium:**  
- Meglévő eszköz adatainak módosításához megfelelő jogosultság szükséges.
- Az adatok módosítása űrlapon történik.
- A kötelezően megadandó adatok mezőinek kitöltése nélkül nem menthetőek az űrlap adatai.
- A beírt adatok válidálása nélkül nem menthetőek az adatok.
- Sikeres mentés után az adatbeviteli oldal visszanavigál az eszközök táblázatos megjelenítésének oldalára.

**4. agilis felhasználói történet:**
> _Meglévő eszköz törlése_

**Elfogadási kritérium:**  
- Meglévő eszköz nyilvántartásból törénő törléséhez megfelelő jogosultság szükséges.
- A eszközkészlet adattáblázatában lévő törlés gombra kattintva egy, a törlési szándékot megerősítű üzenetet tartalmazó 
ablaknak kell megjelennie. Itt lehetőség van a törlés elfogadására vagy annak visszautasítására, vagyis annak jelzésére,
hogy mégsem kívánjuk törölni az adott adatállományt.
- Sieres törlés vagy a törlés visszautasítása után az eszközök táblázatos megjelenítését mutató oldalon maradunk.


## _**5. Leltár**_
.
.// Ez az oldal felel a leltár készítéséért




















