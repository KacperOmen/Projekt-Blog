Projekt Blog - aplikacji MERN

Opis aplikacji:

Aplikacja Blogowa to pełny projekt typu MERN (MongoDB, Express, React, Node.js), który pozwala użytkownikom na publikowanie artykułów oraz prowadzenie dyskusji w komentarzach i odpowiedziach.
System posiada logowanie, autoryzację przez tokeny, relacje między dokumentami oraz obsługę komentarzy zagnieżdżonych.

---

Główne funkcjonalności:

Użytkownicy:

    -Rejestracja
    -Logowanie
    -Przechowywanie sesji za pomocą httpOnly cookies
    -Sprawdzanie sesji (endpoint /me)

Artykuły:

    -Wyświetlanie listy artykułów
    -Wyświetlanie pełnego artykułu
    -Dodawanie artykułu (tylko dla zalogowanych)

Komentarze:

    -Dodawanie komentarzy pod artykułem
    -Dodawanie odpowiedzi na komentarz (komentarze zagnieżdżone)
    -Pobieranie komentarzy z odpowiedziami

---

Technologie użyte w projekcie:

MongoDB, Express, React, Node JS, TailwindCSS

---

Instrukcja uruchomienia lokalnie:

    1. Upewnić się, że na urządzeniu jest zainstalowany Node JS (jeśli nie, to należy pobrać i zainstalować https://nodejs.org/en/download)
    2. Pobrać pliki z repozytorium
    3. Rozpakować
    4. Uruchomić Visual Studio Code
    5. Kliknąć u góry "File" -> "Open Folder" i wybrać rozpakowany folder pobrany z Githuba
    6. Wejść w folder backend, a następnie w plik .env.example
    7. Skopiować zawartość pliku
    8. Stworzyć w folderze backend plik .env i wkleić tam zawartość pliku .env.example
    9. Uzupełnić plik .env stosując się do instrukcji z pliku .env.example
    10. Powtórzyć punkty od 6 do 9 dla folderu frontend
    11. Otworzyć terminal (View -> Terminal)
    12. Przejść do folderu backend (cd backend) oraz wpisać "npm install", a następnie npm run dev
    13. Otworzyć nowy terminal (ikonka + u góry terminala)
    14. Przejść do folderu frontend (cd backend) oraz wpisać "npm install", a następnie npm run dev
    15. Jeżeli wszystko zostało wykonane poprawnie, to pod adresem http://localhost:5173 będzie dostępny frontend aplikacji
---

Hosting:

https://projekt-blog-kacper-omen.onrender.com

---

Link do GitHub Pages: https://kacperomen.github.io/Projekt-Blog

Link do prezentacji: https://drive.google.com/file/d/1_j596LDa0T4Y-cGQXPRnnzkbOygHckS-/view?usp=sharing

Link do nagrania wideo: https://drive.google.com/file/d/1OgM3qXXos3dm2Rpaln2tQoM-lUhqwZfQ/view?usp=sharing

---

Architektura:

Aplikacja podzielona jest na trzy warstwy:

Frontend (React + React Router + TailwindCSS)

    -Wyświetla listę artykułów, widok pojedynczego artykułu oraz sekcję komentarzy.
    -Obsługuje logowanie, rejestrację, dodawanie nowych artykułów, komentarzy i odpowiedzi.
    -Komunikuje się z backendem przez REST API.

Backend (Node + Express):

    -Przyjmuje żądania od frontendu i obsługuje logikę aplikacji.
    -Zarządza autoryzacją użytkowników za pomocą JWT.
    -Obsługuje upload zdjęć artykułów, zapisując je lokalnie lub w chmurze (Cloudinary w produkcji).

Baza danych (MongoDB Atlas)

    -Przechowuje informacje o użytkownikach, artykułach i komentarzach.
    -Relacje: artykuły mają autora, komentarze mają autora, są powiązane z konkretnym artykułem i mogą mieć odpowiedzi.

---

Lista endpointów API:

AUTH:

    POST /api/auth/register - Rejestracja użytkownika   
    POST /api/auth/login - Logowanie użytkownika
    POST /api/auth/logout - Wylogowanie użytkownika
    GET /api/auth/me - Zwraca dane zalogowanego użytkownika (jeśli token poprawny)

ARTICLE:

    POST /api/article/post - Dodawanie artykułu (wymaga logowania)
    GET /api/article/post - Lista artykułów
    GET /api/article.post/:id - Pojedynczy artykuł

COMMENT:

    POST /api/comment/:postId - Dodanie komentarza (także odpowiedzi na komentarz)
    GET /api/comment/:postId - Pobranie komentarzy

---

Opis modelu danych:

users:

    _id,
    username,
    email,
    password - hasło jest szyfrowane

posts:

    _id,
    title,
    summary,
    content,
    cover,
    author - referencja do użytkownika,
    createdAt,

comments:

    _id,
    content,
    author - referencja do użytkownika,
    post - referencja do artykułu,
    parentComment - referencja do komentarza nadrzędnego (umożliwia odpowiedzi),
    createdAt,

---

Opis dostępnych widoków

Na każdej stronie widoczny jest Header z przyciskami: "Blog" - przekierowywuje na stronę główną, "Zaloguj się" - przekierowywuje do /login, "Zarejestruj się" - przekierowywuje do /register. Zalogowani użytkownicy zamiast przycisków do logowania i rejestracji widzą przycisk "Wyloguj się" i "Stwórz artykuł", który przekierowywuje do /create

Strona główna:

Pod Headerem są widoczne opublikowane artykuły, które składają się z: tytułu, autora, daty dodania, streszczenie i zdjęcia

Widok pojedynczego artykułu:

Tytuł, autor, data dodania, zdjęcie, główna treść. Na dole są komentarze oraz formularz do dodania komentarza (dla zalogowanych)

Logowanie/Rejestracja:

Formularz z polami do wypełnienia, przyciskiem "Zarejestruj się" lub "Zaloguj się" oraz "Masz już konto? Zaloguj się?" lub "Nie masz konta? Zarejestruj się", które przekierowywują do odpowiednich podstron

Panel dodawania artykułu (dostępny tylko dla zalogowanych):

Formularz z polami: Tytuł, Streszczenie, Wybierz zdjęcie, edytor treści oraz przycisk "Stwórz artykuł"

---

Scenariusze użytkownika:

Rejestracja:

    1. Użytkownik klika przycisk "Zarejestruj się"
    2. Użytkownik wypełnia pola formularza
    3. Użytkownik klika przycisk "Zarejestruj się"
    4. Jeżeli rejestracja przebiegła pomyślnie, to użytkownik zostaje przekierowany do strony logownia, jeśli nie, to wyświetli się informacja, co zostało źle zrobione

Logowanie:

    1. Użytkownik klika przycisk "Zaloguj się"
    2. Użytkownik wypełnia pola formularza
    3. Użytkownik klika przycisk "Zaloguj się"
    4. Jeżeli logowanie przebiegło pomyślnie, to użytkownik zostaje przekierowany na stronę główną, jeśli nie, to wyświetli się informacja, co zostało źle zrobione

Dodanie artykułu (zalogowany uzytkownik):

    1. Użytkownik loguje się
    2. Klika przycisk "Stwórz artykuł”
    3. Wpisuje tytuł, streszczenie, treść
    4. Dodaje zdjęcie
    5. Klika "Stwórz artykuł"
    6. Zostaje przekierowany na stronę główną, a artykuł pojawia się na liście

Przeglądanie artykułów

    1. Użytkownik otwiera stronę główną
    2. Wybiera artykuł
    3. Czyta pełną treść

Dodanie komentarza (zalogowany użytkownik)

    1. Na stronie artykułu wpisuje treść komentarza i klika "Dodaj komentarz"
    2. Komentarz pojawia się na liście komentarzy

Dodanie odpowiedzi na komentarz (zalogowany użytkownik)

    1. Na stronie artykułu użytkownik klika "Odpowiedz" przy komentarzu
    2. Wpisuje treść komentarza i klika "Dodaj komentarz"
    3. Odpowiedź pojawia się jako zagnieżdżony komentarz