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

// Function to call the Funny Voice API
async function getFunnyVoice(msg) {
    try {
        const response = await fetch('https://api.example.com/funny-voice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
            },
            body: JSON.stringify({ text: msg })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Audio URL:', data.audioUrl); // Debugging line
        return data.audioUrl;
    } catch (error) {
        console.error('Error fetching funny voice:', error);

        // Additional error details
        try {
            const errorDetails = await error.response.json();
            console.error('Error details:', errorDetails);
        } catch (jsonError) {
            console.error('Error parsing error details:', jsonError);
        }

        alert('Failed to fetch funny voice. Please try again.');
    }
}

// Voice Fun - Listen and Repeat in Funny Voice
async function startVoiceFun() {
    const msg = prompt("🎙️ Say something fun!");
    if (msg) {
        const audioUrl = await getFunnyVoice(msg);
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    }
}

// The Adventure of Harshu: The Guardian of Mystica
function startStory() {
    document.getElementById('game-area').innerHTML = `
           <h2>🌟 <b>The Adventure of Harshu: The Guardian of Mystica</b> 🌟</h2>
    <p>Once upon a time, in the small town of <b>Hassan</b>, lived a brave and kind-hearted boy named <b>Harshu</b>. He was young boy, full of energy, and loved exploring places no one dared to go. Harshu wasn’t like other kids—he was always curious, asking questions about the world, and dreaming of exciting adventures.</p>

    <h3>🏡 <b>A Strange Discovery</b></h3>
    <p>One sunny afternoon, Harshu was playing near the old banyan tree at the edge of the town. While digging in the sand, he felt something hard.</p>
    <p><i>"What’s this?"</i> he wondered, pulling out a <b>shiny, golden key</b>. The key had strange symbols engraved on it, and it shimmered in the sunlight.</p>
    <p>Harshu’s eyes lit up with excitement.</p>
    <p><i>"This must be something magical!"</i> he whispered to himself.</p>
    <p>Curious to know where the key led, Harshu decided to explore <b>the ancient ruins</b> near his town. His sister Meghu had once told him that the ruins were mysterious, and no one dared to go near them. But Harshu was fearless.</p>

    <h3>🕵️‍♂️ <b>The Hidden Portal</b></h3>
    <p>As Harshu reached the ruins, he noticed an old <b>stone door</b> covered in vines and moss. His heart pounded with excitement as he inserted the golden key into the lock.</p>
    <p><i>Click!</i></p>
    <p>The door creaked open, revealing a <b>glowing portal</b> swirling with blue and purple lights.</p>
    <p><i>"Whoa! This is amazing!"</i> Harshu gasped.</p>
    <p>Without a second thought, he stepped into the portal—and in the blink of an eye, he was transported to a magical world called <b>Mystica</b>.</p>

    <h3>🏞️ <b>The World of Mystica</b></h3>
    <p>Mystica was unlike anything Harshu had ever seen. The sky was filled with sparkling stars, even though it was daytime. There were <b>talking animals, floating islands, and magical rivers</b> that glowed in different colors.</p>
    <p>As Harshu stood in awe, a tiny <b>fairy</b> with golden wings flew towards him.</p>
    <p><i>"Welcome, brave one! I am Zara, the guardian of Mystica,"</i> she said with a smile.</p>
    <p><i>"Why am I here?"</i> Harshu asked, confused but excited.</p>
    <p>Zara’s face turned serious.</p>
    <p><i>"Mystica is in danger. The evil sorcerer, <b>Zorak</b>, has stolen the <b>Heart of Mystica</b>, the source of all magic. Without it, our world will collapse. Only a hero can retrieve it… and that hero is <b>YOU, Harshu!</b>"</i></p>

    <h3>⚔️ <b>The Quest Begins</b></h3>
    <p>Harshu’s eyes widened. <i>"Me? A hero?"</i> he asked, unsure.</p>
    <p>Zara nodded. <i>"You are brave, kind, and smart. Mystica needs you. Will you help us?"</i></p>
    <p>Harshu didn’t hesitate. <i>"I’ll do it!"</i> he said with determination.</p>
    <p>Zara handed him a <b>magic sword</b> that gleamed with power. <i>"This sword will guide you. But be careful—Zorak’s army is dangerous."</i></p>

    <h3>🐉 <b>The Journey Through Danger</b></h3>
    <p>Harshu’s journey began. He traveled through <b>enchanted forests</b>, crossed <b>raging rivers</b>, and climbed <b>snowy mountains</b>. Along the way, he met some amazing friends:</p>
    <ul>
        <li><b>Rocky the Talking Tiger</b> 🐅 – A fierce protector with a heart of gold.</li>
        <li><b>Tina the Clever Owl</b> 🦉 – She gave Harshu clues and wisdom whenever he was confused.</li>
        <li><b>Bobby the Jolly Dwarf</b> 🧝‍♂️ – Who made him laugh even in tough situations.</li>
    </ul>
    <p>Together, they faced dangerous <b>shadow beasts, tricky puzzles</b>, and <b>deadly traps</b> set by Zorak. But Harshu never gave up.</p>

    <h3>🏰 <b>Battle at the Dark Fortress</b></h3>
    <p>After many challenges, Harshu and his friends finally reached <b>Zorak’s Dark Fortress</b>. The sky was dark, and lightning crackled as they stood before the massive iron gates.</p>
    <p><i>"This is it,"</i> Harshu whispered, gripping his sword tightly.</p>
    <p>Inside, Zorak waited with his <b>army of shadows</b>.</p>
    <p><i>"You’ll never take the Heart of Mystica!"</i> Zorak roared, his eyes glowing red.</p>
    <p>A fierce battle began. Harshu fought bravely, dodging spells and swinging his sword with all his might. His friends stood by his side, helping him defeat the shadow army.</p>
    <p>But Zorak was powerful. He summoned a giant <b>Shadow Dragon</b> that roared with fury.</p>

    <h3>💖 <b>The Power of Courage</b></h3>
    <p>Harshu closed his eyes and remembered his family—his loving sister Meghu and all the people who believed in him. His heart filled with <b>courage and love</b>.</p>
    <p><i>"I won’t let you destroy Mystica!"</i> Harshu shouted.</p>
    <p>With one final blow, Harshu’s sword <b>glowed with pure light</b> and struck the Shadow Dragon. The beast let out a deafening roar and vanished into thin air.</p>
    <p>Zorak screamed in anger as the <b>Heart of Mystica</b> returned to its place, filling the land with magic once more.</p>

    <h3>🌟 <b>A Hero Returns</b></h3>
    <p>Mystica was saved. The people cheered, and Zara smiled proudly at Harshu.</p>
    <p><i>"You did it, Harshu. You are truly a hero,"</i> she said.</p>
    <p>As a reward, Zara gifted Harshu a <b>magical amulet</b> that would protect him wherever he went.</p>
    <p>But it was time to go home. Harshu stepped back into the portal, and in a flash, he was back near the banyan tree.</p>

    <h3>🎉 <b>A New Beginning</b></h3>
    <p>Harshu looked at the amulet in his hand and smiled.</p>
    <p><i>"What an adventure!"</i> he whispered.</p>
    <p>From that day on, Harshu knew he was destined for greatness. Though he was back in his town, he always kept his <b>spirit of adventure alive</b>, ready for the next call of destiny.</p>

    <p><b>**The End.** 🌟✨</b></p>
    `;
}
