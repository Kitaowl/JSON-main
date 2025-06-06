document
  .getElementById("jsonFile")
  .addEventListener("change", function (event) {
    // Pobiera pierwszy wybrany plik
    // event.target.files to FileList - lista plików wybranych przez użytkownika
    // files[0] to jedyny plik z listy
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // onload to zdarzenie wywoływane gdy plik zostanie wczytany
    // e.target.result zawiera zawartość pliku jako string
    reader.onload = function (e) {
      try {
        // JSON.parse() zamienia tekst JSON na obiekt JavaScript
        // W tym przypadku spodziewamy się tablicy obiektów z polami: tag, variant i text
        const data = JSON.parse(e.target.result);

        // Pobieramy kontener, do którego będziemy dodawać elementy
        const container = document.getElementById("output");

        // Czyścimy kontener przed dodaniem nowych elementów
        container.innerHTML = "";

        // Iterujemy przez każdy element w tablicy data
        // forEach wykonuje funkcję dla każdego elementu tablicy
        data.forEach((item) => {
          // Tworzenie nowego elementu HTML o tagu podanym w JSON
          const el = document.createElement(item.tag);

          // Ustawiamy klasę CSS w formacie "varX" gdzie X to numer wariantu
          // className ustawia atrybut 'class' elementu HTML
          el.className = `var${item.variant}`;

          el.textContent = item.text;

          // Dodajemy stworzony element do kontenera
          // appendChild() dodaje element jako ostatnie dziecko rodzica
          container.appendChild(el);
        });
      } catch (error) {
        // Łapiemy i wyświetlamy błędy parsowania JSON
        // try-catch pozwala przechwycić błędy bez zawieszania całego skryptu
        alert("Błąd w pliku JSON: " + error.message);
      }
    };

    // Rozpoczynamy czytanie pliku jako tekst
    // Wynik będzie dostępny w e.target.result w funkcji onload
    reader.readAsText(file);
  });
