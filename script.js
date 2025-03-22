// Tic-Tac-Toe Game with Restart and Win Check
function playTicTacToe() {
    document.getElementById('game-area').innerHTML = `
        <h2>🔲 Tic-Tac-Toe</h2>
        <div id="tic-tac-toe-board" class="board"></div>
        <p id="tic-tac-toe-status"></p>
        <button onclick="startTicTacToe()">Restart Game</button>
    `;
    startTicTacToe();
}

let board, currentPlayer;

function startTicTacToe() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    updateBoard();
}

function updateBoard() {
    const boardHTML = board.map((cell, i) => `
        <div class="cell" onclick="makeMove(${i})">${cell}</div>
    `).join('');
    document.getElementById('tic-tac-toe-board').innerHTML = boardHTML;
    checkWinner();
}

function makeMove(index) {
    if (board[index] === "" && !checkWinner()) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateBoard();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('tic-tac-toe-status').innerText = `${board[a]} Wins!`;
            return true;
        }
    }
    if (!board.includes("")) {
        document.getElementById('tic-tac-toe-status').innerText = "It's a Draw!";
        return true;
    }
    return false;
}

// Memory Game with Restart
function playMemoryGame() {
    document.getElementById('game-area').innerHTML = `
        <h2>🧠 Memory Game</h2>
        <div id="memory-game-board" class="board"></div>
        <p id="memory-game-status"></p>
        <button onclick="startMemoryGame()">Restart Game</button>
    `;
    startMemoryGame();
}

let memoryCards, flippedCards, matchedCards;

function startMemoryGame() {
    memoryCards = ["🍎", "🍌", "🍎", "🍌", "🍇", "🍇"];
    memoryCards = shuffle(memoryCards);
    flippedCards = [];
    matchedCards = [];
    updateMemoryBoard();
}

function updateMemoryBoard() {
    const boardHTML = memoryCards.map((card, i) => `
        <div class="cell memory" onclick="flipCard(${i})">${flippedCards.includes(i) || matchedCards.includes(i) ? card : "❓"}</div>
    `).join('');
    document.getElementById('memory-game-board').innerHTML = boardHTML;
}

function flipCard(index) {
    if (!flippedCards.includes(index) && flippedCards.length < 2) {
        flippedCards.push(index);
        updateMemoryBoard();
        if (flippedCards.length === 2) {
            setTimeout(checkMemoryMatch, 500);
        }
    }
}

function checkMemoryMatch() {
    const [first, second] = flippedCards;
    if (memoryCards[first] === memoryCards[second]) {
        matchedCards.push(first, second);
        if (matchedCards.length === memoryCards.length) {
            document.getElementById('memory-game-status').innerText = "🎉 You matched all pairs!";
        }
    }
    flippedCards = [];
    updateMemoryBoard();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Puzzle Game with 100 puzzles and retry on wrong answer
function startPuzzle() {
    const puzzles = generatePuzzles();
    loadRandomPuzzle(puzzles);
}

function generatePuzzles() {
    const basePuzzles = [
        { question: "What has to be broken before you can use it?", answer: "egg" },
        { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" },
        { question: "The more of this you take, the more you leave behind. What is it?", answer: "footsteps" }
    ];
    while (basePuzzles.length < 100) {
        basePuzzles.push({ question: `Puzzle #${basePuzzles.length + 1}: What is 5 + 5?`, answer: "10" });
    }
    return basePuzzles;
}

function loadRandomPuzzle(puzzles) {
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    document.getElementById('game-area').innerHTML = `
        <h2>🧩 Solve This!</h2>
        <p>${randomPuzzle.question}</p>
        <input id="puzzle-answer" type="text" placeholder="Your answer">
        <button onclick="checkPuzzle('${randomPuzzle.answer}', '${JSON.stringify(puzzles).replace(/"/g, '&quot;')}')">Submit</button>
    `;
}

function checkPuzzle(correctAnswer, puzzles) {
    const answer = document.getElementById('puzzle-answer').value.toLowerCase();
    if (answer === correctAnswer) {
        alert('🎁 Congrats! You unlocked a surprise!');
    } else {
        alert('❌ Oops! Try again!');
        loadRandomPuzzle(JSON.parse(puzzles.replace(/&quot;/g, '"')));
    }
}

// Quiz Time with 100 questions and options
function startQuiz() {
    const questions = generateQuizQuestions();
    loadRandomQuiz(questions);
}

function generateQuizQuestions() {
    const questions = [];
    for (let i = 1; i <= 100; i++) {
        questions.push({
            question: `Quiz #${i}: What is ${i} + ${i + 1}?`,
            options: ["10", "20", `${i + i + 1}`, "30"],
            answer: `${i + i + 1}`
        });
    }
    return questions;
}

function loadRandomQuiz(questions) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById('game-area').innerHTML = `
        <h2>📚 Quick Quiz</h2>
        <p>${randomQuestion.question}</p>
        ${randomQuestion.options.map(option => `<button onclick="checkQuiz('${option}', '${randomQuestion.answer}', '${JSON.stringify(questions).replace(/"/g, '&quot;')}')">${option}</button>`).join('')}
    `;
}

function checkQuiz(answer, correctAnswer, questions) {
    if (answer === correctAnswer) {
        alert('🎉 Correct! You are smart!');
    } else {
        alert('❌ Wrong! Try again!');
    }
    loadRandomQuiz(JSON.parse(questions.replace(/&quot;/g, '"')));
}

// Voice Fun - Listen and Repeat in Funny Voice
function startVoiceFun() {
    const msg = prompt("🎙️ Say something fun!");
    if (msg) {
        const speech = new SpeechSynthesisUtterance(msg);
        speech.pitch = 2; // Make it sound funny
        window.speechSynthesis.speak(speech);
    }
}

// Adventure Story with restart
function startStory() {
    document.getElementById('game-area').innerHTML = `
        <h2>🚀 Adventure Begins</h2>
        <p>You find a treasure chest. Do you open it?</p>
        <button onclick="continueStory('yes')">Yes</button>
        <button onclick="continueStory('no')">No</button>
    `;
}

function continueStory(choice) {
    if (choice === 'yes') {
        alert('💎 You found gold!');
    } else {
        alert('🚪 You walked away safely!');
    }
}
