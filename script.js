const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "serbia",
  "brazil",
  "zoran",
  "azra",
  "ferari",
  "redbull",
  "lakers",
  "miami",
  "tramp",
  "putin",
  "chicago",
  "zurich",
  "banana",
  "apple",
  "strawbery",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();

// Kratko objasnjenje:
// Da bih dobio rec na ekranu, uzimam selektovanu rec i prvo je splitujem, da svaki element bude zaseban, pa onda koristim map i pravim novi niz
// Onda preko map pravim span, sa klasom letter kojoj proveravam da li to slovo postoji u tacnim recima, u tom nizu, ako postoji vratiti slovo, a ako ne, vratiti prazan string
// Na kraju koristim join metodu da spojim sve te elemente u jednu rec. Parametar je isti onaj po kom sam ih razdvojio, a to je u ovom slucaju ""
// Da bih imao slova u jednoj liniji, a ne jedno ispod drugog, menjam /\n/g, koji je globalni, sa praznim stringom
// Proveravam da li je ta rec koju kucam jednaka trazenoj reci, ako jeste pravim ispis neki i stavljam popup da mi se pojavi
// a je 65, a z je 90. To stavljam da mi je moguce uneti, a brojeve ne. Tome sluzi event.keyCode
// U keydown event listeneru, proveravam da li je uneta slovo postoji u trazenoj reci. Ako ne postoji dodajem ga u niz, a ako postoji, ispisujem ga na ekranu. To isto radim i sa pogresnim slovima
// F-ja showNotification() mi samo dodaje show klasu ako to slovo vec postoji tj. ako je uneto, a posle toga ga brise, posle par sekundi, tj. onoliko sekundi koliko sam definisao u setTimeout() metodi
