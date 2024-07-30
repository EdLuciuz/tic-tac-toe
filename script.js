const { user1, user2 } = startGame()

function createUser(name, marker) {
    const userName = name;
    const userMarker = marker;
    let score = 0;

    let turn = 0;
    const getTurn = () => turn++;
    const loseTurn = () => turn--;
    const turnValue = () => turn;
    const resetTurn = () => turn = 0;

    return { userName, userMarker, score, getTurn, loseTurn, turnValue, resetTurn }
}

function startGame() {
    const user1 = createUser('Ed', 'O')
    const user2 = createUser('De', 'X')

    user1.getTurn()

    return { user1, user2 }
}

const gameBoard = (function () {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const grabBoard = () => board;

    const fill = (currentUser, y, x) => {
        board[y][x] = currentUser.userMarker
    }

    const clearBoard = () => {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                board[i][j] = ''
            }
        } 
    }

    return { grabBoard, fill , clearBoard }

})();

function findTurn() {
    const currentUser = user1.turnValue() == 1 ? user1 : user2
    const otherUser = currentUser == user1? user2 : user1

    currentUser.loseTurn()
    otherUser.getTurn()
    return [ currentUser, otherUser ]
}

function play(y, x) {
    console.log(user1.turnValue(), user2.turnValue())

    if (gameBoard.grabBoard()[y][x] != '') {
        console.log('That box is filled, please fill another one')
    } 

    else {
        let [ currentUser, otherUser ] = findTurn()
        gameBoard.fill(currentUser, y, x)
        console.log(gameBoard.grabBoard())
    
        checkGame(currentUser, otherUser)
    }
}

function checkGame(currentUser, otherUser) {
    let winCondition = currentUser.userMarker.repeat(3)
    const checkBoard = gameBoard.grabBoard()

    let status = check_condition(winCondition, checkBoard)
    
    if (status == 'win') {
        console.log(`${currentUser.userName} won. Game Ended`)
    }

    if (status == 'draw') {
        console.log('Draw. Game Ended')
    }

    if (status == 'none') {
        console.log('Now its',otherUser.userName, 's turn')// put in check game
    }
}

function check_condition(winCondition, checkBoard) {

    //Horizontal Check
    for (let i = 0; i < 3; i++) {

        let checkEach = '';

        for (let j = 0; j < 3; j++) {
            checkEach += checkBoard[i][j]
        }
    
        if (checkEach == winCondition) {
            console.log('bruh', checkEach)
            return 'win'
        }
    
        else {continue}
    } 

    //Vertical check
    for (let i = 0; i < 3; i++) {

        let checkEach = '';

        for (let j = 0; j < 3; j++) {
            checkEach += checkBoard[j][i]
        }
    
        if (checkEach == winCondition) {
            console.log(checkEach)
            return 'win'
        }
    
        else {continue}
    } 

    //Diagonal Check
    let checkEach = '';

    for (let i = 0; i < 3; i++) {
        checkEach += checkBoard[i][i]
    }

    if (checkEach == winCondition) {
        console.log(checkEach)
        return 'win'
    }

    //Diagonal 2 check
    checkEach = '';

    for (let i = 0; i < 3; i++) {
        checkEach += checkBoard[i][2-i]
    }

    if (checkEach == winCondition) {
        console.log(checkEach)
        return 'win'
    }

    //Nothing
    else {
        let checkDraw = check_draw(checkBoard)
        return checkDraw
    }
}

function check_draw(checkBoard) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (checkBoard[i][j] == '') {
                return 'none'
            }
            else {continue}
        }
    } 

    return 'draw'
}

function resetGame() {
    gameBoard.clearBoard()
    user1.resetTurn()
    user2.resetTurn()
    user1.getTurn()
}