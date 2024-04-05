const words = ["игра", "снег", "вода", "стол", "стул", "рука", "нога", "глаз", "буря", "небо", "план"];
//const words = ["rule", "note", "love", "bird", "dark", "life"];

const canves = document.querySelector('#canves');
const restart = canves.querySelector('.restart');
const tower = canves.querySelector('.tower');
const count = document.querySelector('#count');


let holding = [];

var main_word = [];
var test_word = [];

function clearTowers () {;
   const towers = document.querySelectorAll('.tower');
   towers.forEach((tower) => {
       tower.innerHTML = '';
   })
} 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initialTower (towers, word) {
    for (let i = 0; i < word.length; i++) {
        const li = document.createElement("li");
        li.classList.add('disk');
        li.dataset.value = word[i];
        li.textContent = word[i];
        towers[i].prepend(li);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function initGame() {
   clearTowers();
   holding = [];
   var index = getRandomInt(words.length);
   main_word = words[index].split('');

   var shuffledWord = words[index].split('');
   shuffleArray(shuffledWord);
   initialTower(towers, shuffledWord);
   console.log(main_word);
}

const towers = document.querySelectorAll('.tower');
initGame();

towers.forEach((tower) => tower.addEventListener('click', onTowerClick));

function countMoves() {
    if (main_word.every((value, index) => value === test_word[index])) {
        endGame();
    }
    
    else if (test_word.length === 4 && test_word.every(value => value !== undefined && value.length === 1)) {
        count.innerHTML = `Что-то не так`;
    }
}
var beforeValue;

function onTowerClick(e) {
   e.preventDefault();
   const currentTower = e.currentTarget;
   const topDisk = currentTower.querySelector(':last-child');
       
   const value = topDisk?.dataset.value;
   const holdingDisk = canves.querySelector('.hold');

   if (holdingDisk) {
       if (value === holding[0]) {
           holdingDisk.classList.remove('hold');
       } else if (value === undefined) {
            const emptyTower = currentTower;
            if (emptyTower) {
                const li = document.createElement("li");
                li.classList.add('disk');
                li.classList.add(`disk-${holding[0]}`);
                li.dataset.value = holding[0];
                li.textContent = holding[0];
                emptyTower.appendChild(li);
                
                holding[0] = undefined;
                var numTower = (emptyTower.id).split('-').at(-1)-5;

                if (numTower>=0 && numTower <4){
                    test_word[numTower] = li.dataset.value;
                }
                else if (numTower<0 && beforeValue<0){
                }
                else{
                    test_word[beforeValue] = '';
                }

                if(beforeValue>=0){
                    test_word[beforeValue] = '';
                }
                countMoves();
                console.log(test_word);
                holdingDisk.remove();
            }
       }
   } else if (topDisk) {
       topDisk.classList.add('hold');
       holding[0] = value;
       beforeValue = (currentTower.id).split('-').at(-1)-5;
       console.log(beforeValue);
   }
}

function endGame() {
   count.innerHTML = `Готово`;
   let score = 100;

   setTimeout(() => {
    let result = +localStorage.getItem("result");
    result += score;
    localStorage.setItem("result", result);

    const redirect = localStorage.getItem("redirect");
    window.location.href = redirect;
}, 1000)
}
