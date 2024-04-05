var words = ["шарики", "Летучая мышь", "книги", "календарь", "котик", "цветочек", "лиса", "ёжик", "конверт", "панда", 
"тыква", "кролик", "тучка", "снежинка", "звезда", "клубника", "солнце"]

var src = ["img/0.png", "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", 
"img/8.png", "img/9.png", "img/10.png", "img/11.png", "img/12.png", "img/13.png", "img/14.png", "img/15.png", "img/16.png"];

let winCount = 0
let loseCount = 0

let gamesNum = 0
const gamesTotal = 2

let blocked = false

let currentTime = 0

const gameTime = localStorage.getItem("gameTime")

const displayTimer = document.querySelector('#timer')

const intervalId = setInterval(() => {
    currentTime++
    
    if (currentTime >= gameTime) {   
     finishGame() 
    }
 
    const time = gameTime - currentTime
    const hours = Math.floor(time / 360000)
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100
    const timeToString = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`
 
    displayTimer.textContent = timeToString
   
 }, 10) 

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

const template_main = document.querySelector('.template_main')
const randomPuzzles = document.getElementById('random-puzzles')
var curr;

const getRandomFromMatrix = (matrix) => {
    const rowIndex = getRandomNumber(0, 7)
    var res1 = matrix[rowIndex].split('/').at(-1)
    return res1.substr(0,res1.length-4)
}

function clearGame() {
    randomPuzzles.innerText = ''
    template_main.innerText = ''
}

function restartGame() {
    gamesNum++
    
    if (gamesNum > gamesTotal) {
        finishGame()
        return
    }
    clearGame()

    currentTime = 0

    const random_matrix = shuffle(src);
    drawMatrix(random_matrix)

    const template = getRandomFromMatrix(random_matrix)
    template_main.innerHTML = words[template].toUpperCase();
    curr = template;
}

function drawMatrix(matrix) {
    var container = document.getElementById('random-puzzles');
    container.innerHTML = '';
    for (var i = 0; i < 8; i++) {
      var image = document.createElement('img');
      var li = document.createElement('li');
      image.src = matrix[i];

      var randomNumber = Math.floor(Math.random() * 3);
      if (randomNumber === 0) {
        image.classList.add('small');
      } else if (randomNumber === 1) {
        image.classList.add('big');
      } else {
        image.classList.add('rotate-el');
      }
      var t = image.src;
      var r1 = t.split('/').at(-1);
      image.alt = r1.substr(0, r1.length - 4);

      li.appendChild(image);
      container.appendChild(li);
  
      if (i == 3) {
        container.innerHTML += "<br>";
      }
      container.addEventListener('click', onPatternClick);
    }
  }

function onPatternClick (e) {
    e.preventDefault()

    if (blocked) return

    const currentPatternStr = e.target.alt

    if (currentPatternStr === curr) {
        winCount ++
    } else {
        loseCount ++
    }

    const winFrame = document.getElementById("winFrame")
    const loseFrame = document.getElementById("loseFrame")

    winFrame.innerText = winCount
    loseFrame.innerText = loseCount

    console.log (`wins: ${winCount}, lose: ${loseCount}`)
    restartGame()
}

function finishGame() {
   
    blocked = true

    let score = winCount * 50

    const timewatch = document.querySelector('.timewatch')
    timewatch.innerText = `Your score ${score}!`

    clearInterval(intervalId)

    setTimeout(() => {
        let result = +localStorage.getItem("result")
        result += score
        localStorage.setItem("result", result)

        const redirect = localStorage.getItem("redirect")
        window.location.href = redirect
    }, 2000)
}

initGame()

function initGame() {
    winCount = 0
    loseCount = 0
    gamesNum = 0
    blocked = false

    const winFrame = document.getElementById("winFrame")
    const loseFrame = document.getElementById("loseFrame")

    winFrame.innerText = 0
    loseFrame.innerText = 0    

    restartGame()
}