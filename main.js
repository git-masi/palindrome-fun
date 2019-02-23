// const buttonOne = document.getElementById('btn1');
// buttonOne.addEventListener('click',()=>{
// 	document.querySelector('[data-panel="1"]').style.display = 'block';
// 	document.querySelector('[data-panel="1"]').classList.add('animate');
// 	document.querySelector('.panel > .wrapper').classList.add('fade-in');
// });


// panel 2 buttons and display

const wordListDisplay = document.getElementById('word-list');
const showWordListButton = document.getElementById('show-word-list');

function filterArrByChar(char = 'a', arr){
  return arr.filter(word => word[0] == char);
}

showWordListButton.addEventListener('click', ()=> {
  let initialListDisplay = filterArrByChar('a', wordsMasterArr);
  initialListDisplay.forEach(word => wordListDisplay.textContent += word + '\n');
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

// panel 3 guess 

const guessForm = document.querySelector('#panel-3 > section > div.panel-display > div > div');
const guessNumberInput = document.querySelector('#panel-3 > section > div.panel-display > div > div > input[type="number"]');
const tellMeButton = document.querySelector('#panel-3 > section > div.panel-buttons > button');
const submitGuessButton = document.querySelector('#panel-3 > section > div.panel-buttons > a');
let guessAmount = 0;

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
    submitGuessButton.href = '#panel-4'
  };
});


// panel 4

function palindromeCheck(arr){
  return arr.filter(word => word == word.split('').reverse().join(''));
}

const panel4 = document.querySelector('#panel-4');
const guessStats = document.querySelector('#panel-4 > section > div.panel-display > div.display-wrapper.p-2 > p');
const finalPalindromeList = palindromeCheck(wordsMasterArr);
const palindromeTotal = finalPalindromeList.length;
const palindromeListDisplay = document.querySelector('#palindrome-list');

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
  if (panel4.getBoundingClientRect().top == 0){
    guessStats.textContent = `${checkGuess()}`
    finalPalindromeList.forEach(word => palindromeListDisplay.textContent += word + '\n');
  } else {
    palindromeListDisplay.textContent = '';
  };
});
