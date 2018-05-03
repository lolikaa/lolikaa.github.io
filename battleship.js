//var randomLoc = Math.floor(Math.random() * 5);
//var location1 = randomLoc; // lokalizacja okretu 1
//var location2 = location1 + 1; // lokalizacja okretu 2
//var location3 = location1 + 2; // lokalizacja okretu 3
//
//var guess;          // komorka wskazana przez uzytkownika
//var hits = 0;       // liczba trafień
//var guesses = 0;    // liczba prób
//var liczby = [];
//
//var isSunk = false; // czy okret został zatopiony?
//
//
//while (isSunk == false) {
//    
//    guess = prompt("Gotów, cel,pal! (podaj liczbę z zakresu od 0-6:");
//    
//    if ( guess < 0 || guess > 6) {
//     alert("proszę podać prawidłowy numer komórki!");   
//     
//        
//    } else {
//     guesses = guesses + 1;   
//     liczby.push(guess);   
//    alert(liczby[0]);
//        if (guess == location1 || guess == location2 || guess == location3) {
//            
//            alert("TRAFIONY!");
//            hits = hits + 1;
//         
//           
//        
//            if (hits == 3){
//            isSunk = true;
//            alert("TY JEBAŃCU! Zatopiłeś mój okręt");
//        } 
//    } else {
//        alert("PUDŁO!");
//        
//    }
// 
//        
//    }
//
// }  
//    
//
//
//var stats = "Potrzebowałeś " + guesses + " prób, by zatopić mój okręt, czyli Twoja efektywność wynosi: " + 3/guesses + ".";
//alert(stats);





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>tu zaawansowana aplikacja webowa :) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





//  >>>>>>>>>>>>>>> IMPLEMENTACJA OBIEKTU MODELU <<<<<<<<<<<<<<<<<<<<<<<<<<<

var model = {           // model jest obiektem
    boardSize: 7,       // wielkosc siatki tworzacej plansze gry
    numShips: 3,        // liczba okretow bioracych udzial w grze
    shipLenght: 3,      // liczba komorek planszy zajmowanych przez jeden okret
    shipsSunk: 0,       
    
    /* WŁAŚCIWOŚĆ SHIPS jest tablicą obiektów ship, z ktorych kazdy przechowywuje informacje o położeniu oraz trafieniach danego okrętu. (zmieniliśmy ships ze zmiennej, której używaliśmy wcześniej, na właściwość obiektu model) */
    
   ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],
       
    /* >> METODA FIRE << 
     1) sprawdzenie kazdego okrętu i okreslenie czy zajmuje on podane pole planszy
         a)  jeśli zajmuje, oznacza to, że mamy trafienie i nalezy wpisac wartosc "hit" w odpowiednie pole tablicy hits (i jednoczesnie poinformowac widok o trafieniu). Oprocz tego trzeba zwrocic true jako wartosc wynikowa metody, informujac tym samym o trafieniu

         b) jeśli żaden z okretow nie zajmuje podanego pola planszy, oznacza to, ze strzal okazal sie niecelny. Musimy poinformowac o tym widok i zakonczyc dzialanie metody, zwracajac wartosc false
    2) dodatkowo metoda powinna okreslac czy okret zostal jedynie trafiony czy jes juz zatopiony*/   
    fire: function(guess) {                             // metoda pobiera współrzędne podane przez użytkownika
        for (var i = 0; i < this.numShips; i++) {         // w petli przegladamy kazdy element tablicy ships, analizujac kolejno kazdy z zapisanych w niej okretow
            var ship = this.ships[i];                   // spr czy pole wybrane przez gracza jest jednym z pol zajmowanych przez okret
          /*  var locations = ship.locations;             // pobralismy tablice pol zajmowanych przez dany okret.
            
            /* metoda indexOf przegląda tablicę, poszukując w niej wartości odpowiadającej podanemu argumentowi, a jesli taka znajdzie, zwraca jej infeks.
            jesli wartosci nie uda sie znalezc, metoda zwraca wartość -1 */
            
          /*  var index = locations.indexOf(guess);       // jesli guess znajduje sie w tablicy locations = trafienie */
            
            var index = ship.locations.indexOf(guess);  // dwa wiersze w powyzszego (zakomentowanego) kodu zmienilam w jeden
            
            if (index >= 0) {
                ship.hits[index] = "hit";                   // Mamy tafienie!
                view.displayHit(guess);                     // poinformuj widok, że w polu guess mamy trafienie
                view.displayMessage("TRAFIONY");            // wyświetlenie komunikatu "TRAFIONY"
                if (this.isSunk(ship)) {                    // sprawdzenie warunku czy okręt został zatopiony. 
                    view.displayMessage("Zatopiłeś mój okręt"); // info o tym, że strzał doprowadził do zatopienia okrętu
                    this.shipsSunk++;                       // jeśli zatopiony powiększamy o 1 liczbę zatopionych okrętów w shipsSunk
                }
                return true;                                   // musimy zwrocic true, bo mamy trafienie
        }
    }
        view.displayMiss(guess);                    // poinformuj widok, że w polu o współrzędnych zapisanych w par. guess mamy pudło
        view.displayMessage("Spudłowałeś");         // wyświetl komunikat "spudłowałeś"
        return false;       // jesli nie ma trafienia zwroc false
  },
    
      
    /* >> METODA isSunk <<  
     jej zdaniam będzie sprawdzenie okretu i zwrocenie wartosci true, jesli został zatopiony, oraz wartosci false, jesli jeszcze jakos unosi się na wodzie. Metoda pobiera obiekt okretu i przeglada kazde z zajomowanych przez niego pól sprawdzajac czy zostało trafione czy nie. */   
    isSunk: function(ship) {                          
        for (var i = 0; i < this.shipLenght; i++) {
            if (ship.hits[i] !== "hit") {           // jesli metoda znajdzie pole, ktore jeszcze nie zostalo trafione = wciaz plywa
                return false;                       // dlatego zwraca wartosc false
        }    
      } 
        return true;     // w przeciwnym razie okret został zatopiony i zwracamy wartosc true
    },
    
    

    /* metoda generateShipLocations */  
    generateShipLocations: function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) { // dla każdego okrętu generujemy zajmowane przez niego pola planszy
            do { // używamy tu pętli while
                locations = this.generateShip(); // generujemy nowy zestaw współrzędnych
            } while (this.collision(locations)); // po czym sprawdzamy, czy nie pokrywają się one z polami zajmowanymi przez któryś z już istniejących okrętów. Jeśli pokrywają się, musimy ponownie wygenerować nowy zestaw pól. A zatem generujemy zestawy pól tak długo, jak długo będą występować kolizje.
            this.ships[i].locations = locations; // zapisujemy zestaw pól w tablicy locations obiektu okrętu, w tablicy model.ships
        }
        console.log("Tablica okrętów: ");
		console.log(this.ships);
    },
    
    
     /* metoda generateShip */  
    generateShip: function() {
        var direction = Math.floor(Math.random() *2);   
        var row, col;
        
        if (direction === 1) { // przyjmujemy, że jeśli zmienna direction ma wartość 1 to okręt rozmieszczony będzie w poziomie
            
            row = Math.floor(Math.random() * this.boardSize); // to jest kod służący do wygenerowania współrzędnych początkowego pola zajmowanego przez okręt          
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            
        } else { // a jeśli wartość 0 to w układzie pionowym
            
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));     
            col = Math.floor(Math.random() * this.boardSize);
        }
        
        var newShipLocations = [];
        
        for (var i = 0; i < this.shipLength; i++) { // liczba iteracji pętli odpowiada długości okrętu
            if (direction === 1) { //a podczas każdej z nich podajemy do tablicy newShipLocations współrzędne jednego pola. Także tutaj musimy zastosować nieco odmienny kod, zależnie do kierunku, w jakim okręt będzie rozmieszczany
                
                newShipLocations.push(row + "" + (col + i)); 
                //nowe współrzędne dodajemy do tablicy newShipLocations. Współrzędne są łańcuchem znaków składającym się z wiersza oraz wartości kolumny powiększonej o wartość zmiennej i. Podczas pierwszej iteracji i wynosi 0, zatem jest to tylko numer początkowej kolumny. Podczas kolejnej iteracji będzie to następna kolumna, a podczas trzeciej - jeszcze następna. A zatem w tablicy zostaną zapisane takie współrzędne jak "01", "02, oraz "03".
            } else {
                newShipLocations.push((row + i) + "" + col);
                // To samo robimy tutaj, z tym że dla okrętu rozmieszczanego pionowo. Zatem modyfikujemy numer wiersza, a nie kolumny, dodając do niego w każdej iteracji wartość zmiennej i.
                // W przypadku kiedy dodajemy łańcuch znaków i liczbę, operator + oznacza KONKATENACJĘ, a nie dodawanie, dlatego też uzyskamy wynik będący łańcuchem znaków. 
                // W przypadku okrętu rozmieszczanego pionowo uzyskamy współrzędne takie jak "31", "41", "51"
            }
        }
        return newShipLocations; // po wygenerowaniu wszystkich pół zwracamy tablicę
    },
    

    
  
    
    /* metoda COLLISION */   
    collision: function(locations) { // locations to tablica współrzędnych pól zajmowanych przez nowy okręt, który chcielibyśmy umieścić na planszy
        
        for (var i = 0; i < this.numShips; i++) { // dla każdego okrętu już umieszczonego na planszy...
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) { // ..sprawdzamy, czy którekolwiek z pól zajmowanych przez nowy okręt nie występuje w tablicy locations już istniejącego okrętu.
                
                if (ship.locations.indexOf(locations[j]) >=0) { // w Celu sprawdzenia, czy współrzędne już istnieją, używamy metody indexOf, jeśli zatem zwrócony indeks będzie większy lub równy 0, będzie to sygnałem, że współrzędne zostały użyte; w takim przypadku zwracamy wartość true (oznaczającą wystąpienie kolizji).
                    
                    return true; // wykonanie instrukcji return wewnątrz zagnieżdżonych pętli zatrzymuje iteracje wszystkich tych pętli oraz powoduje natychmiastowe zakończenie wykonywania metody i zwrócenie wartości.
                }
            }
        }
        return false; // Jeśli realizacja metody dotarła do tego miejsca, oznacza to, że nie udało się odnaleźć pary dwóch identycznych współrzędnych, a zatem zwracamy wartośc false (oznaczającą brak kolizji).
    },  
};


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> koniec implementacji obiektu modelu <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// 3 METODY: HIT, MISS, MESSAGE
var view = { 
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPLEMENTACJA KONTROLERA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

var controller = {           // tutaj definiujemy obiekt kontrolera
    guesses: 0,
    
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++; // powiększenie liczby prób o jeden   
            var hit = model.fire(location); // przekazujemy numery wiersza i kolumny zapisane w formie łańcucha znaków do metody fire modelu. Metoda zwraca true, jeśli okręt został zatopion    
            if (hit && model.shipSunk === model.numShips) { // jeśli próba zakończyła się trafieniem okrętu i liczba zatopionych okrętów jest równa liczbie okrętów biorących udział w grze, wyświetlamy komunikat o zatopieniu wszystkich okrętów
                
                view.displayMessage("Zatopiłeś wszystkie moje okręty, w " + this.guesses + " próbach."); // wyświetlamy komunikat 
            }      
        }       
    }
};

    // Funkcja pomocnicza przetwarzająca współrzędne wpisane 
// przez użytkownika.
    
        function parseGuess(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"]; // tablica poprawnych współrz.
            
        
        if (guess == null || guess.length !== 2) {   // sprawdzamy poprawność wprowadzenia
            alert("Ups, proszę wpisać literę i cyfrę");
        } else {
            var firstChar = guess.charAt(0); // pobieramy pierwszy znak przekazanego łańcucha
            var row = alphabet.indexOf(firstChar); // następnie wywołując metodę indexOf, uzyskujemy liczbę z zakresu od zera do sześciu, odpowiadającą konwertownej literze.
            var column = guess.charAt(1);
            
            if (isNaN(row) || isNaN(column)) { // używając funkcji isNan, sprawdzamy czy wiersz i kolumna są prawidłowymi liczbami
                alert("Ups, to nie są współrzędne!");
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Ups, pole poza planszą!");
                //konwersja typów - column jest łańcuchem znaków, a zatek kiedy sprawdzamy, czy jego wartość mieści się w zakresie 0-6, bazujemy na konwersji, która na czas porównania przekształci łańcuch na liczbę
             } else {
                return row + column; // zwracamy współrzędne wiersza i kolumny 
            }
        }
        return null; // jeśli gdzieś po drodze wykryto nieprawidłowości to zwracamy null.
 }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> koniec implementacji kontrolera<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> POBIERANIE WARTOŚCI Z FORMULARZA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) { // jeśli naciśniesz klawisz Enter, we właściwości keyCode obiektu zdarzdenia zostanie zapisana wartość 13. W takim przypadku chcemy, by przycisk Ognia! zachował się tak, jak byśmy go kliknęli. W tym celu wystarczy wywołać metodę click elementu fireButton ( co sprawi, że przycisk uzna, że został kliknięty)
        fireButton.click();
        return false; // zwracamy false by formularz nie robił już nic więcej (szczególnie, by nie próbował gdzieś wysyłać danych)
    }
}

// funkcja będzie wykonywana po każdym kliknięciu przycisku Ognia!

function handleFireButton() {
    var guessInput = document.getElementById("guessInput"); // pobieramy referencje
    var guess = guessInput.value.toUpperCase();
    
    
    controller.processGuess(guess); // przekazujemy współrzędne podane przez użytkownika do kontrolera i od tego momentu cała reszta magicznie powinna wydarzyć się sama
    
    guessInput.value =""; // wiersz kodu, który czyści pole tekstowe formularza,. zapisując w nim pusty string.

    
}


// Funkcja init - wywoływana po zakończeniu wczytywania strony.

window.onload = init; // przeglądarka wykona funkcje init bezpośrednio po zakończeniu wczytywania strony

function init() {
	// Procedura obsługi przycisku Ognia!
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// Obsługa naciśnięcia klawisza "Enter".
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// Umieszczamy okręty na planszy.
	model.generateShipLocations(); // metodę model.generateShipLocations wywołujemy w funkcji init, dzięki czemu zostanie wykonana bezpośrednio po wczytaniu gry, zanim jeszcze użytkownik zacznie zabawę. To właśnie dlatego, kiedy zaczniesz grać, wszystkie okręty będą już rozmieszczone na planszy.
}

















// testy 
//console.log(parseGuess("A0"));
//console.log(parseGuess("B6"));
//console.log(parseGuess("G3"));
//console.log(parseGuess("H0"));
//console.log(parseGuess("A7"));

//controller.processGuess("A0");
//
//controller.processGuess("A6");
//controller.processGuess("B6");
//controller.processGuess("C6");
//
//controller.processGuess("C4");
//controller.processGuess("D4");
//controller.processGuess("E4");
//
//controller.processGuess("B0");
//controller.processGuess("B1");
//controller.processGuess("B2");











