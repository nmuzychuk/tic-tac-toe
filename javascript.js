var board = [0, 1, 'X', 3, 4, 5, 'O', 7, 8];

var getTable = function (board) {
    table = document.createElement('table');
    table.id = 'grid';

    tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (var i = 0; i < 9; i++) {
        if (i % 3 == 0) {
            tr = document.createElement('tr');
            tbody.appendChild(tr);
        }

        var td = document.createElement('td');
        td.onclick = function () {
            console.log(this);
        };

        if (board[i] == 'X' || board[i] == 'O') {
            td.innerText = board[i];
        }

        tr.appendChild(td);
    }

    return table;
};

var PlayerX = 'X';
var PlayerO = 'O';
var currentPlayer = PlayerX;
var opponent = 'ai';

var winner = '';

var startGame = function () {
    setMessage('Current player is ' + currentPlayer);
};

var setMessage = function (message) {
    document.getElementById('message').innerText = message;
};

var makeMoveHuman = function (element) {
    element.onclick = null;
    element.innerText = currentPlayer;

    hideOptions();

    if (isEnd()) { return; }

    switchPlayer();

    if (opponent == 'ai') {
        makeMoverAI();
    };
};

var makeMoverAI = function () {
    var attempt = 0;
    var positions = [];

    for (var i = 1; i < 10; i++) {
        positions.push(i);
    }

    shuffle(positions);

    for (var i = 0; i < positions.length; i++) {
        element = document.getElementById('pos' + positions[i]);

        if (!element.innerText) {
            element.onclick = null;
            element.innerText = currentPlayer;

            if (isEnd()) { return; }

            switchPlayer();
            break;
        }
    }
};

function shuffle(array) {
    var counter = array.length;

    while (counter > 0) {
        var i = Math.floor(Math.random() * counter);
        counter--;

        var temp = array[counter];
        array[counter] = array[i];
        array[i] = temp;
    }

    return array;
}

var isEnd = function () {
    var elements = document.getElementsByTagName('tr');

    if (isWin(elements)) {
        winner = currentPlayer;
        endGame(elements);

        return true;
    }

    if (isFull(elements)) {
        endGame(elements);

        return true;
    }

    return false;
};

var isWin = function (elements) {

    for (var i = 0; i < 3; i++) {
        // Check rows
        if (elements[i].children[0].innerText &&
            elements[i].children[1].innerText &&
            elements[i].children[2].innerText) {
            if (elements[i].children[0].innerText == elements[i].children[1].innerText &&
                elements[i].children[0].innerText == elements[i].children[2].innerText) {
                return true;
            }
        };

        // Check columns
        if (elements[0].children[i].innerText &&
            elements[1].children[i].innerText &&
            elements[2].children[i].innerText) {
            if (elements[0].children[i].innerText == elements[1].children[i].innerText &&
                elements[0].children[i].innerText == elements[2].children[i].innerText) {
                return true;
            }
        };
    }

    // Check diagonal forward
    if (elements[0].children[0].innerText &&
        elements[1].children[1].innerText &&
        elements[2].children[2].innerText) {
        if (elements[0].children[0].innerText == elements[1].children[1].innerText &&
            elements[0].children[0].innerText == elements[2].children[2].innerText) {
            return true;
        }
    };

    // Check diagonal reverse
    if (elements[0].children[2].innerText &&
        elements[1].children[1].innerText &&
        elements[2].children[0].innerText) {
        if (elements[0].children[2].innerText == elements[1].children[1].innerText &&
            elements[0].children[2].innerText == elements[2].children[0].innerText) {
            return true;
        }
    };

    return false;
};

var isFull = function (elements) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (!elements[i].children[j].innerText) {
                return false;
            }
        }
    }

    return true;
};

var hideOptions = function () {
    var options = document.getElementById('options');
    options.style.visibility = 'hidden';
};

var switchPlayer = function () {
    if (currentPlayer == PlayerX) {
        currentPlayer = PlayerO;
    } else {
        currentPlayer = PlayerX;
    }

    setMessage('Current player is ' + currentPlayer);
};

var setOpponent = function (selectObject) {
    opponent = selectObject.value;
};

var endGame = function (elements) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            elements[i].children[j].onclick = null;
        }
    }

    if (winner) {
        setMessage('The winner is ' + winner);
        document.getElementById('message').style.backgroundColor = "lime";
    } else {
        setMessage('Draw');
        document.getElementById('message').style.backgroundColor = "yellow";
    }
};

var restartGame = function () {
    location.reload();
};

(function () {
    startGame();
})();
