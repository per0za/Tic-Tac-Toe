import themeSwitcher from "./themeSwitch.js";
import "./style/style.css";

// options array
const ticTacToeWin = [
  ["topLeft", "top", "topRight"],
  ["left", "middle", "right"],
  ["bottomLeft", "bottom", "bottomRight"],
  ["topLeft", "left", "bottomLeft"],
  ["top", "middle", "bottom"],
  ["topRight", "right", "bottomRight"],
  ["topLeft", "middle", "bottomRight"],
  ["topRight", "middle", "bottomLeft"],
];

const startBtn = document.getElementById("startButton");
const startBtnDiv = document.getElementById("startButtonDiv");
const playerOptions = document.querySelectorAll(".chosenPlace");
const optionButtons = document.querySelectorAll(".optionBtns");
const chooseContainer = document.getElementById("chooseContainer");
const playerNameChoose = document.getElementById("playerNameChoose");
const showPlayerName = document.getElementById("showCurrentPlayer");
const restartBtnContainer = document.getElementById("btnContainer");
const restartBtn = document.getElementById("restartButton");
const showWinner = document.getElementById("showWinner");

// controls where the the person wants the X or the circle
const playerOnePoints = [];
const playerTwoPoints = [];

let moveCount = 0;
let isThereAWinner = false;

let firstPlayer;
const playerOne = {};
const playerTwo = {};

const startGame = () => {
  const playerOneName = document.getElementById("player1").value.trim();
  const playerTwoName = document.getElementById("player2").value.trim();

  const players = [playerOneName, playerTwoName];

  playerOne.name = playerOneName;
  playerTwo.name = playerTwoName;

  // Checks if the name is an empty string
  if (playerOneName === "" || playerTwoName === "") {
    alert("Player names can't be empty!");
    return;
  } else if (playerOneName === playerTwoName) {
    alert("Players names can't be the same!");
    return;
  }

  // gets the name of the first player randomly
  firstPlayer = players[Math.floor(Math.random() * players.length)];

  playerNameChoose.innerText = firstPlayer;

  // hides the start button and lets the player choose between x or circle
  startBtnDiv.style.display = "none";
  chooseContainer.style.display = "block";
};

startBtn.addEventListener("click", startGame);
optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedOpt = button.dataset.option;

    if (firstPlayer === playerOne.name && selectedOpt === "X") {
      playerOne.option = selectedOpt;
      playerTwo.option = "circle";
    } else if (firstPlayer === playerOne.name && selectedOpt === "circle") {
      playerOne.option = selectedOpt;
      playerTwo.option = "X";
    } else if (firstPlayer === playerTwo.name && selectedOpt === "X") {
      playerTwo.option = selectedOpt;
      playerOne.option = "circle";
    } else if (firstPlayer === playerTwo.name && selectedOpt === "circle") {
      playerTwo.option = selectedOpt;
      playerOne.option = "X";
    }

    chooseContainer.style.display = "none";
    showPlayerName.style.display = "block";
    showPlayerName.innerText = firstPlayer + " 's turn";
  });
});

playerOptions.forEach((option) => {
  option.addEventListener("click", (optionEvent) => {
    if (option.dataset.status === "disabled") return;

    moveCount++;

    // create the x and the circle
    const x = document.createElement("div");
    const circle = document.createElement("div");

    x.classList.add("xForm");
    circle.classList.add("circle");

    if (showPlayerName.innerText.slice(0, showPlayerName.innerText.length - 8) === playerOne.name && playerOne.option === "X") {
      // checks the choices and determines where the symbols will go
      option.append(x);
      playerOnePoints.push(option.dataset.position);
      showPlayerName.innerText = playerTwo.name + " 's turn";
    } else if (showPlayerName.innerText.slice(0, showPlayerName.innerText.length - 8) === playerOne.name && playerOne.option === "circle") {
      option.append(circle);
      playerOnePoints.push(option.dataset.position);
      showPlayerName.innerText = playerTwo.name + " 's turn";
    } else if (showPlayerName.innerText.slice(0, showPlayerName.innerText.length - 8) === playerTwo.name && playerTwo.option === "X") {
      option.append(x);
      playerTwoPoints.push(option.dataset.position);
      showPlayerName.innerText = playerOne.name + " 's turn";
    } else if (showPlayerName.innerText.slice(0, showPlayerName.innerText.length - 8)) {
      option.append(circle);
      playerTwoPoints.push(option.dataset.position);
      showPlayerName.innerText = playerOne.name + " 's turn";
    }

    for (let i = 0; i < ticTacToeWin.length; i++) {
      let countOne = 0;
      let countTwo = 0;
      for (let j = 0; j < playerOnePoints.length; j++) {
        if (ticTacToeWin[i].includes(playerOnePoints[j]) === true) {
          countOne++;
          if (countOne === 3) {
            isThereAWinner = true;
            showPlayerName.style.display = "none";
            showWinner.style.display = "block";
            restartBtnContainer.style.display = "flex";
            showWinner.innerText = "Winner: " + playerOne.name;
            playerOptions.forEach((opt) => {
              if (ticTacToeWin[i].includes(opt.dataset.position)) {
                opt.classList.add("win");
              }
              return (opt.dataset.status = "disabled");
            });
            return;
          }
        }
      }

      for (let j = 0; j < playerTwoPoints.length; j++) {
        if (ticTacToeWin[i].includes(playerTwoPoints[j]) === true) {
          countTwo++;
          if (countTwo === 3) {
            isThereAWinner = true;
            showPlayerName.style.display = "none";
            showWinner.style.display = "block";
            restartBtnContainer.style.display = "flex";
            showWinner.innerText = "Winner: " + playerTwo.name;
            playerOptions.forEach((opt) => {
              if (ticTacToeWin[i].includes(opt.dataset.position)) {
                opt.classList.add("win");
              }
              return (opt.dataset.status = "disabled");
            });
            return;
          }
        }
      }
    }
    if (moveCount === 9 && isThereAWinner === false) {
      showPlayerName.style.display = "none";
      showWinner.style.display = "block";
      restartBtnContainer.style.display = "flex";
      showWinner.innerText = "Draw";
      playerOptions.forEach((opt) => {
        return (opt.dataset.status = "disabled");
      });
      return;
    }
    // disabled the square that has been chosen
    option.dataset.status = "disabled";
  });
});

// restarts the game
restartBtn.addEventListener("click", () => {
  location.reload();
});

// dark/light mode
document.getElementById("themeSwitcher").addEventListener("click", themeSwitcher);
