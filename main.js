//smooth scroll

const scrollTime = 1000;

function smoothScroll(target, duration) {
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset || window.scrollY;
  let startTime = null;
  
  function loop(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(loop);
  }
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(loop);
}

//Back button controls

const backButton = document.querySelector('.back-button');
let backPanelTracker = 0;
backButton.addEventListener('click',()=>{
  let toPanel = document.querySelector(`#panel-${backPanelTracker}`);
  backPanelTracker -= 1;
  smoothScroll(toPanel, scrollTime);
});

// all panels

const panel1 = document.querySelector('#panel-1');
const panel2 = document.querySelector('#panel-2');
const panel3 = document.querySelector('#panel-3');
const panel4 = document.querySelector('#panel-4');
const panel5 = document.querySelector('#panel-5');

const panel1Display = document.querySelector('#panel-1 .panel .panel-display');
const panel2Display = document.querySelector('#panel-2 .panel .panel-display');
const panel3Display = document.querySelector('#panel-3 .panel .panel-display');
const panel4Display = document.querySelector('#panel-4 .panel .panel-display');
const panel5Display = document.querySelector('#panel-5 .panel .panel-display');


// panel 1

const letsGoButton = document.querySelector('#panel-1 > section > div.panel-buttons > a');
const waitWhatButton = document.querySelector('#panel-1 > section > div.panel-buttons > button');

letsGoButton.addEventListener('click', ()=>{
  backPanelTracker += 1;
  smoothScroll(panel2, scrollTime);
});

waitWhatButton.addEventListener('click', ()=>{
  panel1Display.classList.add('show');
});

// panel 2

const wordListDisplay = document.getElementById('word-list');
const showWordListButton = document.getElementById('show-word-list');
const cantBeButton = document.querySelector('#panel-2 > section > div.panel-buttons > button');

function filterArrByChar(char = 'a', arr){
  return arr.filter(word => word[0] == char);
}

showWordListButton.addEventListener('click', ()=> {
  panel2Display.classList.add('show');
  setTimeout(()=>{
    let initialListDisplay = filterArrByChar('a', wordsMasterArr);
    initialListDisplay.forEach(word => wordListDisplay.textContent += word + '\n');
  }, 100);
	showWordListButton.disabled = 'true';
});

const letterInput = document.querySelector('#panel-2 > section > div.panel-display > div > div:nth-child(1) > div > input[type="text"]');
const sortButton = document.getElementById('sort');

sortButton.addEventListener('click', ()=> {
  wordListDisplay.textContent = '';
  let letter = letterInput.value;
  let filteredArr = filterArrByChar(letter, wordsMasterArr);
  filteredArr.forEach(word => wordListDisplay.textContent += word + '\n');
});

const nowWhatButton = document.querySelector('#panel-2 > section > div.panel-buttons > a');
nowWhatButton.addEventListener('click', ()=>{
  backPanelTracker += 1;
  smoothScroll(panel3, scrollTime);
});

// panel 3

const guessForm = document.querySelector('#panel-3 > section > div.panel-display > div > div');
const guessNumberInput = document.querySelector('#panel-3 > section > div.panel-display > div > div > input[type="number"]');
const tellMeButton = document.querySelector('#panel-3 > section > div.panel-buttons > button');
const submitGuessButton = document.querySelector('#panel-3 > section > div.panel-buttons > a');
let guessAmount = 0;

window.addEventListener('scroll', () => {
  let displayTop = panel3.getBoundingClientRect().top;
  setTimeout(()=>{
    if (displayTop >= 0 && displayTop < 1){
      panel3Display.classList.add('show');
    };
  }, 1000);
});

guessNumberInput.addEventListener('keypress', (e)=> {
  let key = e.which || e.keyCode;
  if (key === 13) {
    guessAmount = Number(guessNumberInput.value);
    submitGuessButton.click();
  }
  
});

tellMeButton.addEventListener('click', ()=> {
  document.querySelector('.tell-me-display').textContent = 'Where\'s the fun in that?'
  tellMeButton.style.display = 'none';
});

submitGuessButton.addEventListener('click', ()=> {
  guessAmount = Number(guessNumberInput.value);
  if (guessNumberInput.value == ''){
    submitGuessButton.href = 'javascript:void(0)';
  } else {
    backPanelTracker += 1;
    smoothScroll(panel4, scrollTime);
  };
});


// panel 4

window.addEventListener('scroll', () => {
  let displayTop = panel4.getBoundingClientRect().top;
  setTimeout(()=>{
    if (displayTop >= 0 && displayTop < 1){
      panel4Display.classList.add('show');
    };
  }, 1000);
});

function palindromeCheck(arr){
  return arr.filter(word => word == word.split('').reverse().join(''));
}

const guessStats = document.querySelector('#panel-4 > section > div.panel-display > div.display-wrapper.p-2 > p');
const finalPalindromeList = palindromeCheck(wordsMasterArr);
const palindromeTotal = finalPalindromeList.length;
const palindromeListDisplay = document.querySelector('#palindrome-list');
const neatButton = document.querySelector('#panel-4 > section > div.panel-buttons > a');

let checkGuess = ()=>{
  let num = Math.abs(Number(guessAmount - palindromeTotal)).toString();
  switch (true) {
    case (num == 0):
      return `Amazing, ${palindromeTotal} is right on!`;
    case (num < palindromeTotal):
      return `Wow, that's pretty close! You were only off by ${num}, the actual number is ${palindromeTotal}.`
    case (num > palindromeTotal && num < palindromeTotal * 2):
      return `Wow, that's pretty close! You were only off by ${num}, the actual number is ${palindromeTotal}.`
    case (num >= palindromeTotal * 2):
      return `Good guess, though you were off by ${num}. The actual number of palindromes is ${palindromeTotal}.`
  }
};

window.addEventListener('scroll', () => {
  let displayTop = panel4.getBoundingClientRect().top; 
  if (displayTop >= 0 && displayTop < 1){
    guessStats.textContent = `${checkGuess()}`
    finalPalindromeList.forEach(word => palindromeListDisplay.textContent += word + '\n');
  } else {
    palindromeListDisplay.textContent = '';
  };
});

neatButton.addEventListener('click', ()=>{
  backPanelTracker += 1;
  smoothScroll(panel5, scrollTime);
});

// panel 5

window.addEventListener('scroll', () => {
  let displayTop = panel5.getBoundingClientRect().top;
  setTimeout(()=>{
    if (displayTop >= 0 && displayTop < 1){
      panel5Display.classList.add('show');
    };
  }, 1000);
});