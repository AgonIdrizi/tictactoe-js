const playerFactory = (playername, playersign) => {
	const name = playername;
    const sign = playersign;
	const putPiece = (move, array) => {
  	  if (array[move] == ''){
  	    array[move] = sign;
  	    return array;
  	    //DisplayController.render();
  	  } else {
  	    return false
  	  }
    };  
	return {name, sign, putPiece};
}

const GameboardFactory = (name1, name2) => {
  if (name1 == "") name1 = "Player one";
  if (name2 == "") name2 = "Player two";
  let gameArray = ["","","","","","","","",""]
  let player1 = playerFactory(name1, "x");
  let player2 = playerFactory(name2, "o");

  let currentPlayer = player1;
  let gameOver = false;
  const getBoard = () => {return array};

 
  
  const clearBoard = () => {
	gameArray = ["","","","","","","","",""]
  };

  const gameboard = document.querySelector('.gameboard');

  const gridSquares = gameboard.querySelectorAll('.grid')

  function drawGameBoard(gameArray, currentPlayer) {
  	gridSquares.forEach((x,i) => (x.textContent = gameArray[i]));
  	const currenPlayerDiv = document.querySelector("#current-player");
  	currenPlayerDiv.textContent =`current player: ${currentPlayer.name}`;
  }

  function showGameBoard() {
  	const gameboardDiv = document.querySelector(".gameboard");
  	gameboardDiv.classList.add("visible");
  }

  function renderGameOver(winner) {
  	const currenPlayerDiv = document.querySelector("#current-player");
  	currenPlayerDiv.textContent = ``;

    const gameOverModal = document.querySelector(".game-over-modal");
    const messageSpan = gameOverModal.querySelector("#message");
    if(winner.name) {
    	messageSpan.textContent =`${winner.name} is the winner!`;
    } else {
    	messageSpan.textContent =`it was a tie`;
    }
    gameOverModal.classList.toggle("visible");
    gameOverModal.querySelector("button").onclick = () => {
    	restart();
    	gameOverModal.classList.toggle("visible");
    };

  }

  function checkGameOver(gameArray){ //returns object {win: true, winner}
  	let win = false;
    let winner = "";
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(var i = 0; i<winConditions.length; i++) {
      if (checkWininCondition(winConditions[i], winner) == 'true'){
        console.log("inside where should return")
        console.log(winner);
      
        return { win: true , winner };
      }
    };

    if (!gameArray.includes("")) return { win: true, winner: "tie" };
    

    return {win: false, winner: null }

    function checkWininCondition(arr){
      const allEqual = arr => arr.every( v => v === arr[0] )
      let tempArr = [];
        
        for(var i = 0; i<arr.length; i++){
          tempArr.push(gameArray[arr[i]])
          if ( tempArr.length == 3 && allEqual(tempArr) && (tempArr.includes("x") || tempArr.includes("o")) ){
            winner = tempArr[0];
            return 'true'
          }
        }
        console.log(tempArr)
        console.log(allEqual(tempArr))
      
      return 'false'
    }
    
  }

  
  

  function removeGameStartDialog (){
  	const startDialog = document.querySelector(".game-start-dialog")
	startDialog.setAttribute('hidden', true);
  }

  function takeOneTurn(s, i) {
  	if (currentPlayer.putPiece(i, gameArray) && !gameOver) {
  		currentPlayer = currentPlayer == player1 ? player2 : player1;
  		drawGameBoard(gameArray, currentPlayer)
      console.log(gameArray)
  		if (checkGameOver(gameArray).win) {
        gameOver = true;
        const winnerMarker = checkGameOver(gameArray).winner;
  		  let winner = "tie"
        console.log(winnerMarker)
        if (winnerMarker == "x") {
          winner = player1;
        }else if (winnerMarker == "o") {
          winner = player2;
        }
        console.log(winner)
  		  renderGameOver(winner);
  		}
  	}
  }

  function restart() {
  	gameOver = false;
  	clearBoard();
  	currentPlayer = player1;
  	drawGameBoard(gameArray, currentPlayer);
  }

  function play(){
  	removeGameStartDialog ()
  	showGameBoard();
  	drawGameBoard(gameArray, currentPlayer);

  	

  	gridSquares.forEach((s, i) => {
  	  s.onclick = () => takeOneTurn(s, i);
  	});
  }

  return {play};
};

const DisplayController = () => {
	showGameBoard()
	renderGameOver()

}

const startGameForm = document.querySelector('#start-game');

startGameForm.onsubmit = function(e) {
	e.preventDefault();
	startGame(startGameForm.player1.value, startGameForm.player2.value);
	const startDialog = document.querySelector('.game-start-dialog');
	Object.assign(startDialog.style, {
	  opacity: "0",
	  trasform: 'transalte(-50%, -500px)'
	});
};


function startGame(player1, player2) {
	let game;
	game = GameboardFactory(startGameForm.player1.value, startGameForm.player2.value);
	game.play();

};