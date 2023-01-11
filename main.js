var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;
var cardCount = 1;

function createDeck() {
  deck = new Array();
  for (var i = 0; i < values.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var weight = parseInt(values[i]);
      if (values[i] == "J") weight = 11;
      if (values[i] == "Q") weight = 12;
      if (values[i] == "K") weight = 13;
      if (values[i] == "A") weight = 14;
      var card = { Value: values[i], Suit: suits[x], Weight: weight };
      deck.push(card);
    }
  }
}

function createPlayers(num) {
  players = new Array();
  for (var i = 1; i <= num; i++) {
    var hand = new Array();
    var player = {
      Name: "Player " + i,
      ID: i,
      Points: 0,
      Hand: hand,
      Give: 0,
      Take: 0,
    };
    players.push(player);
  }
}

function createPlayersUI() {
  document.getElementById("players").innerHTML = "";

  for (var i = 0; i < players.length; i++) {
    var div_player = document.createElement("div");
    var div_playerid = document.createElement("div");
    var div_hand = document.createElement("div");
    var div_points = document.createElement("div");

    div_points.className = "points";

    div_player.id = "player_" + i;
    div_player.className = "player";
    div_hand.id = "hand_" + i;

    div_playerid.innerHTML = "Player " + players[i].ID;
    div_player.appendChild(div_playerid);
    div_player.appendChild(div_hand);

    document.getElementById("players").appendChild(div_player);
  }
}

function shuffle() {
  // for 1000 turns
  // switch the values of two random cards
  for (var i = 0; i < 1000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

function startIrishPoker() {
  if (document.getElementById("btnStart") != null) {
    document.getElementById("btnStart").remove();
  }

  if (document.getElementById("startOver") != null) {
    document.getElementById("startOver").remove();
  }

  let startOver = document.createElement("button");
  startOver.innerHTML = "Restart";
  startOver.className = "btn";
  startOver.id = "startOver";
  startOver.onclick = function () {
    startAgain();
  };
  document.getElementById("game-options").appendChild(startOver);

  document.getElementById("status").style.display = "none";

  // deal 2 cards to every player object
  currentPlayer = 0;
  createDeck();
  shuffle();
  createPlayers(1);
  createPlayersUI();

  document.getElementById("player_" + currentPlayer).classList.add("active");

  //red or black

  let btnRed = document.createElement("button");
  btnRed.innerHTML = "Red";
  btnRed.className = "btn";
  btnRed.id = "btnRed";
  btnRed.onclick = function () {
    red();
  };
  document.getElementById("game-options").appendChild(btnRed);

  let btnBlack = document.createElement("button");
  btnBlack.innerHTML = "Black";
  btnBlack.className = "btn";
  btnBlack.id = "btnBlack";
  btnBlack.onclick = function () {
    black();
  };
  document.getElementById("game-options").appendChild(btnBlack);
}

function startAgain() {
  while (document.getElementById("game-options").firstChild) {
    document
      .getElementById("game-options")
      .removeChild(document.getElementById("game-options").firstChild);
  }

  players[currentPlayer].Give == 0;
  players[currentPlayer].Take == 0;

  document.getElementById("givecount").innerHTML = players[currentPlayer].Give;
  document.getElementById("takecount").innerHTML = players[currentPlayer].Take;

  cardCount = 1;

  startIrishPoker();
}

function dealHands() {
  // alternate handing cards to each player
  // 2 cards each
  for (var i = 0; i < 1; i++) {
    for (var x = 0; x < players.length; x++) {
      var card = deck.pop();
      players[x].Hand.push(card);
      renderCard(card, x);
      updatePoints();
    }
  }

  updateDeck();
}

function red() {
  var card = deck.pop();
  if (card.Suit == "Diamonds" || card.Suit == "Hearts") {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    higherOrLower();
  } else {
    alert("Take One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    higherOrLower();
  }
}

function black() {
  var card = deck.pop();
  if (card.Suit == "Clubs" || card.Suit == "Spades") {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    higherOrLower();
  } else {
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    alert("Take One!");
    higherOrLower();
  }
}

function higherOrLower() {
  //higher or lower
  document.getElementById("btnRed").remove();
  document.getElementById("btnBlack").remove();

  let btnHigher = document.createElement("button");
  btnHigher.innerHTML = "Higher";
  btnHigher.className = "btn";
  btnHigher.id = "btnHigher";
  btnHigher.onclick = function () {
    higher();
  };
  document.getElementById("game-options").appendChild(btnHigher);

  let btnLower = document.createElement("button");
  btnLower.innerHTML = "Lower";
  btnLower.className = "btn";
  btnLower.id = "btnLower";
  btnLower.onclick = function () {
    lower();
  };

  document.getElementById("game-options").appendChild(btnLower);
}

function higher() {
  var card = deck.pop();
  if (players[currentPlayer].Hand[0].Weight < card.Weight) {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    insideOrOutside();
  } else {
    alert("Take One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    insideOrOutside();
  }
}

function lower() {
  var card = deck.pop();
  if (players[currentPlayer].Hand[0].Weight > card.Weight) {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    insideOrOutside();
  } else {
    alert("Take One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    insideOrOutside();
  }
}

function insideOrOutside() {
  //higher or lower
  document.getElementById("btnLower").remove();
  document.getElementById("btnHigher").remove();

  let btnHigher = document.createElement("button");
  btnHigher.innerHTML = "Inside";
  btnHigher.className = "btn";
  btnHigher.id = "btnInside";
  btnHigher.onclick = function () {
    inside();
  };
  document.getElementById("game-options").appendChild(btnHigher);

  let btnLower = document.createElement("button");
  btnLower.innerHTML = "Outside";
  btnLower.className = "btn";
  btnLower.id = "btnOutside";
  btnLower.onclick = function () {
    outside();
  };

  document.getElementById("game-options").appendChild(btnLower);
}

function inside() {
  var card = deck.pop();
  var card1 = players[currentPlayer].Hand[0].Weight;
  var card2 = players[currentPlayer].Hand[1].Weight;

  if (card.Weight.between(card1, card2)) {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    guessTheSuit();
  } else {
    alert("Take One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    guessTheSuit();
  }
}

function outside() {
  var card = deck.pop();
  var card1 = players[currentPlayer].Hand[0].Weight;
  var card2 = players[currentPlayer].Hand[1].Weight;

  if (!card.Weight.between(card1, card2)) {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    guessTheSuit();
  } else {
    alert("Take One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    guessTheSuit();
  }
}

Number.prototype.between = function (a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
};

function guessTheSuit() {
  //higher or lower
  document.getElementById("btnInside").remove();
  document.getElementById("btnOutside").remove();

  let btnSpades = document.createElement("button");
  btnSpades.innerHTML = "Spades";
  btnSpades.className = "btn";
  btnSpades.id = "btnSpades";
  btnSpades.onclick = function () {
    suit("Spades");
  };
  document.getElementById("game-options").appendChild(btnSpades);

  let btnHearts = document.createElement("button");
  btnHearts.innerHTML = "Hearts";
  btnHearts.className = "btn";
  btnHearts.id = "btnHearts";
  btnHearts.onclick = function () {
    suit("Hearts");
  };
  document.getElementById("game-options").appendChild(btnHearts);

  let btnDiamonds = document.createElement("button");
  btnDiamonds.innerHTML = "Diamonds";
  btnDiamonds.className = "btn";
  btnDiamonds.id = "btnDiamonds";
  btnDiamonds.onclick = function () {
    suit("Diamonds");
  };
  document.getElementById("game-options").appendChild(btnDiamonds);

  let btnClubs = document.createElement("button");
  btnClubs.innerHTML = "Clubs";
  btnClubs.className = "btn";
  btnClubs.id = "btnClubs";
  btnClubs.onclick = function () {
    suit("Clubs");
  };
  document.getElementById("game-options").appendChild(btnClubs);
}

function suit(suit) {
  var card = deck.pop();
  if (card.Suit == suit) {
    alert("Give One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Give++;
    updateDeck();
    check();
    finalRound();
  } else {
    alert("Take One!");
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    players[currentPlayer].Take++;
    updateDeck();
    check();
    finalRound();
  }
}

function finalRound() {
  document.getElementById("btnSpades").remove();
  document.getElementById("btnHearts").remove();
  document.getElementById("btnDiamonds").remove();
  document.getElementById("btnClubs").remove();

  let btnDraw = document.createElement("button");
  btnDraw.innerHTML = "Draw";
  btnDraw.className = "btn";
  btnDraw.id = "btnDraw";
  btnDraw.onclick = function () {
    drawCard();
  };
  document.getElementById("game-options").appendChild(btnDraw);
}

function drawCard() {
  var card = deck.pop();

  for (var j = 0; j < players[currentPlayer].Hand.length; j++) {

    if(cardCount == 10){
        alert("Game over man!")
        startAgain();
    }

    if (cardCount == 9 && card.Weight == players[currentPlayer].Hand[j].Weight){
        alert("You have the final card! Finish your drink! 8===>")
        break;
    }

    if (
      card.Weight == players[currentPlayer].Hand[j].Weight &&
      (cardCount + 1) % 2 == 0
    ) {
      players[currentPlayer].Give = players[currentPlayer].Give + calculateTurn(cardCount);
      updateDeck();
      alert("Give " + calculateTurn(cardCount))
      break;
    }

    if (
      card.Weight == players[currentPlayer].Hand[j].Weight &&
      (cardCount + 1) % 2 != 0
    ) {
      players[currentPlayer].Take = players[currentPlayer].Take + calculateTurn(cardCount);
      updateDeck();
      alert("Take " + calculateTurn(cardCount))
      break;
    }
  }


  document.getElementById("game-options").appendChild(getFinalCardUI(card, cardCount));
  cardCount++;
 
}

function calculateTurn(cardCount) {
  switch (cardCount) {
    case 1:
      return 1;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 2;
    case 5:
      return 3;
    case 6:
      return 3;
    case 7:
      return 4;
    case 8:
      return 4;
  }
}

function renderCard(card, player) {
  var hand = document.getElementById("hand_" + player);
  hand.appendChild(getCardUI(card));
}

function getCardUI(card) {
  var el = document.createElement("div");
  var icon = "";
  if (card.Suit == "Hearts") (icon = "&hearts;"), (el.style.color = "#FF0000");
  else if (card.Suit == "Spades") (icon = "&spades;"), (el.style.color = black);
  else if (card.Suit == "Diamonds")
    (icon = "&diams;"), (el.style.color = "#FF0000");
  else (icon = "&clubs;"), (el.style.color = black);

  el.className = "card";
  el.innerHTML = card.Value + "<br/>" + icon;
  return el;
}

function getFinalCardUI(card, cardCount) {
  var el = document.createElement("div");

  if (cardCount % 2){
    el.style.top=100
  } else {
    el.style.bottom=100
  }

  var icon = "";
  if (card.Suit == "Hearts") (icon = "&hearts;"), (el.style.color = "#FF0000");
  else if (card.Suit == "Spades") (icon = "&spades;"), (el.style.color = black);
  else if (card.Suit == "Diamonds")
    (icon = "&diams;"), (el.style.color = "#FF0000");
  else (icon = "&clubs;"), (el.style.color = black);

  el.className = "card";
  el.innerHTML = card.Value + "<br/>" + icon;
  return el;
}

// returns the number of points that a player has in hand
function getPoints(player) {
  var points = 0;
  for (var i = 0; i < players[player].Hand.length; i++) {
    points += players[player].Hand[i].Weight;
  }
  players[player].Points = points;
  return points;
}

function updatePoints() {
  for (var i = 0; i < players.length; i++) {
    getPoints(i);
    document.getElementById("points_" + i).innerHTML = players[i].Give;
    document.getElementById("points_" + i).innerHTML = players[i].Take;
  }
}

function hitMe() {
  // pop a card from the deck to the current player
  // check if current player new points are over 21
  var card = deck.pop();
  players[currentPlayer].Hand.push(card);
  renderCard(card, currentPlayer);
  updatePoints();
  updateDeck();
  check();
}

function stay() {
  // move on to next player, if any
  if (currentPlayer != players.length - 1) {
    document
      .getElementById("player_" + currentPlayer)
      .classList.remove("active");
    currentPlayer += 1;
    document.getElementById("player_" + currentPlayer).classList.add("active");
  } else {
    end();
  }
}

function end() {
  var winner = -1;
  var score = 0;

  for (var i = 0; i < players.length; i++) {
    if (players[i].Points > score && players[i].Points < 22) {
      winner = i;
    }

    score = players[i].Points;
  }

  document.getElementById("status").innerHTML =
    "Winner: Player " + players[winner].ID;
  document.getElementById("status").style.display = "inline-block";
}

function check() {
  if (players[currentPlayer].Points > 21) {
    document.getElementById("status").innerHTML =
      "Player: " + players[currentPlayer].ID + " LOST";
    document.getElementById("status").style.display = "inline-block";
    end();
  }
}

function updateDeck() {
  document.getElementById("givecount").innerHTML = players[currentPlayer].Give;

  document.getElementById("takecount").innerHTML = players[currentPlayer].Take;
}

window.addEventListener("load", function () {
  createDeck();
  shuffle();
  createPlayers(1);
});
