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
    memoryCards = [
        "🍎", "🍌", "🍇", "🍉", "🍒", 
        "🍓", "🍋", "🥝", "🍑", "🍍", 
        "🍐", "🍏", "🍈", "🍊", "🍍",
        "🥥", "🍇", "🍉", "🍒", "🍓",
        "🍋", "🥝", "🍑", "🍐", "🍏"
    ];
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
        { question: "The more of this you take, the more you leave behind. What is it?", answer: "footsteps" },
        { question: "I’m not alive, but I can grow. I don’t have lungs, but I need air. What am I?", answer: "fire" },
        { question: "What has a heart but no other organs?", answer: "deck of cards" },
        { question: "I have keys but no locks. I have space but no room. You can enter, but you can’t go outside. What am I?", answer: "keyboard" },
        { question: "The more you take, the more you leave behind. What are they?", answer: "footsteps" },
        { question: "I’m light as a feather, yet the strongest person can’t hold me for much longer. What am I?", answer: "breath" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
        { question: "What has a head, a tail, but no body?", answer: "coin" },
        { question: "I am an odd number. Take away one letter, and I become even. What am I?", answer: "seven" },
        { question: "What begins with T, ends with T, and has T in it?", answer: "teapot" },
        { question: "What can travel around the world while staying in the same spot?", answer: "stamp" },
        { question: "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I?", answer: "echo" },
        { question: "The more you take away, the bigger I become. What am I?", answer: "hole" },
        { question: "I have branches, but no fruit, trunk, or leaves. What am I?", answer: "bank" },
        { question: "The more you have of me, the less you see. What am I?", answer: "darkness" },
        { question: "What has to be broken before you can use it?", answer: "egg" },
        { question: "What has an eye but cannot see?", answer: "needle" },
        { question: "What has one head, one foot, and four legs?", answer: "bed" },
        { question: "What has many needles, but doesn’t sew?", answer: "pine tree" },
        { question: "What has words, but never speaks?", answer: "book" },
        { question: "What comes down but never goes up?", answer: "rain" },
        { question: "What gets wetter as it dries?", answer: "towel" },
        { question: "What has a neck but no head?", answer: "bottle" },
        { question: "What is so fragile that saying its name breaks it?", answer: "silence" },
        { question: "What has a thumb and four fingers but is not alive?", answer: "glove" },
        { question: "What has ears but cannot hear?", answer: "corn" },
        { question: "The more of me you take, the more you leave behind. What am I?", answer: "footsteps" },
        { question: "Forward, I’m heavy. But backward, I’m not. What am I?", answer: "ton" },
        { question: "What is full of holes but still holds water?", answer: "sponge" },
        { question: "What goes up but never comes down?", answer: "age" },
        { question: "The more you take away, the bigger I get. What am I?", answer: "hole" },
        { question: "What has four legs in the morning, two in the afternoon, and three in the evening?", answer: "man" },
        { question: "What can you catch but not throw?", answer: "cold" },
        { question: "I can be cracked, made, told, and played. What am I?", answer: "joke" },
        { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "map" },
        { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps" },
        { question: "What is always in front of you but can’t be seen?", answer: "future" },
        { question: "What has 13 hearts, but no other organs?", answer: "deck of cards" },
        { question: "If two’s company, and three’s a crowd, what are four and five?", answer: "nine" },
        { question: "I’m not alive, but I can die. What am I?", answer: "battery" },
        { question: "The more of me you take, the more you leave behind. What am I?", answer: "footsteps" },
        { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" },
        { question: "What is so light, even the strongest person can’t hold me for long?", answer: "breath" },
        { question: "I can fill a room, but I take up no space. What am I?", answer: "light" },
        { question: "The more you take, the more I leave behind. What am I?", answer: "footsteps" },
        { question: "What has to be broken before you can use it?", answer: "egg" },
        { question: "I go up, but I never come down. What am I?", answer: "age" },
        { question: "What begins with an E but only contains one letter?", answer: "envelope" },
        { question: "What can you keep after giving it to someone?", answer: "your word" },
        { question: "What has hands but can’t clap?", answer: "clock" },
        { question: "I’m found in the sea and on land but I don’t walk or swim. What am I?", answer: "sand" },
        { question: "What has 88 keys but can’t open a single door?", answer: "piano" },
        { question: "I’m always running but have no legs. What am I?", answer: "water" },
        { question: "What has a bottom at the top?", answer: "leg" },
        { question: "What kind of band never plays music?", answer: "rubber band" },
        { question: "I have a head and a tail but no body. What am I?", answer: "coin" },
        { question: "What is easy to lift but hard to throw?", answer: "feather" },
        { question: "I am always hungry, I must always be fed. What am I?", answer: "fire" }
    ];
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
    }
    loadRandomPuzzle(JSON.parse(puzzles.replace(/&quot;/g, '"')));
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
    const options = shuffle([...randomQuestion.options]);
    document.getElementById('game-area').innerHTML = `
        <h2>📚 Quick Quiz</h2>
        <p>${randomQuestion.question}</p>
        ${options.map(option => `<button onclick="checkQuiz('${option}', '${randomQuestion.answer}', '${JSON.stringify(questions).replace(/"/g, '&quot;')}')">${option}</button>`).join('')}
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
