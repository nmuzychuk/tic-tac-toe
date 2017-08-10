var Message = (function () {
    return {
        setMessage: function (message) {
            document.getElementById("message").innerText = message;
        }
    }
})();

var Opponent = (function () {
    this.type = "ai";

    return {
        getType: function () {
            return type;
        },

        setType: function (type) {
            parent.type = type;
        }
    }
})();

var GameConfig = (function () {
    return {
        hideOptions: function () {
            var options = document.getElementById("options");
            options.style.visibility = "hidden";
        }
    }
})();

var GameMenu = (function () {
    return {
        restartGame: function () {
            location.reload();
        }
    }
})();

function Player(name) {
    this.name = name;

    this.getName = function () {
        return this.name;
    }
}

var GameHelper = (function () {
    var PlayerX = new Player("X");
    var PlayerO = new Player("O");
    var currentPlayer = PlayerX;

    return {
        startGame: function () {
            Message.setMessage("Game started. Current player is " + currentPlayer.getName());
        },

        endGame: function (elements, winner) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    elements[i].children[j].onclick = null;
                }
            }

            if (winner) {
                Message.setMessage("The winner is " + winner.getName());
                document.getElementById("message").style.backgroundColor = "lime";
            } else {
                Message.setMessage("Draw");
                document.getElementById("message").style.backgroundColor = "yellow";
            }
        },

        isWin: function (elements) {
            for (var i = 0; i < 3; i++) {
                // Check rows
                if (elements[i].children[0].innerText &&
                    elements[i].children[1].innerText &&
                    elements[i].children[2].innerText) {
                    if (elements[i].children[0].innerText === elements[i].children[1].innerText &&
                        elements[i].children[0].innerText === elements[i].children[2].innerText) {
                        return true;
                    }
                }

                // Check columns
                if (elements[0].children[i].innerText &&
                    elements[1].children[i].innerText &&
                    elements[2].children[i].innerText) {
                    if (elements[0].children[i].innerText === elements[1].children[i].innerText &&
                        elements[0].children[i].innerText === elements[2].children[i].innerText) {
                        return true;
                    }
                }
            }

            // Check diagonal forward
            if (elements[0].children[0].innerText &&
                elements[1].children[1].innerText &&
                elements[2].children[2].innerText) {
                if (elements[0].children[0].innerText === elements[1].children[1].innerText &&
                    elements[0].children[0].innerText === elements[2].children[2].innerText) {
                    return true;
                }
            }

            // Check diagonal reverse
            if (elements[0].children[2].innerText &&
                elements[1].children[1].innerText &&
                elements[2].children[0].innerText) {
                if (elements[0].children[2].innerText === elements[1].children[1].innerText &&
                    elements[0].children[2].innerText === elements[2].children[0].innerText) {
                    return true;
                }
            }

            return false;
        },

        isFull: function (elements) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (!elements[i].children[j].innerText) {
                        return false;
                    }
                }
            }

            return true;
        },

        isEnd: function () {
            var elements = document.getElementsByTagName("tr");

            if (this.isWin(elements)) {
                this.endGame(elements, currentPlayer);

                return true;
            }

            if (this.isFull(elements)) {
                this.endGame(elements, null);

                return true;
            }

            return false;
        },

        makeMoverAI: function () {
            var positions = [];

            for (var i = 1; i < 10; i++) {
                positions.push(i);
            }

            this.shuffle(positions);

            for (var j = 0; j < positions.length; j++) {
                var element = document.getElementById("pos" + positions[j]);

                if (!element.innerText) {
                    element.onclick = null;
                    element.innerText = currentPlayer.getName();

                    if (this.isEnd()) {
                        return;
                    }

                    this.switchPlayer();
                    break;
                }
            }
        },

        makeMoveHuman: function (element) {
            element.onclick = null;
            element.innerText = currentPlayer.getName();

            GameConfig.hideOptions();

            if (this.isEnd()) {
                return;
            }

            this.switchPlayer();

            if (Opponent.getType() === "ai") {
                this.makeMoverAI();
            }
        },

        shuffle: function (array) {
            var counter = array.length;

            while (counter > 0) {
                var i = Math.floor(Math.random() * counter);
                counter--;

                var temp = array[counter];
                array[counter] = array[i];
                array[i] = temp;
            }

            return array;
        },

        switchPlayer: function () {
            if (currentPlayer === PlayerX) {
                currentPlayer = PlayerO;
            } else {
                currentPlayer = PlayerX;
            }

            Message.setMessage("Current player is " + currentPlayer.getName());
        }

    };

})();

GameHelper.startGame();
