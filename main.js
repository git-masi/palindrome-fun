// const buttonOne = document.getElementById('btn1');
// buttonOne.addEventListener('click',()=>{
// 	document.querySelector('[data-panel="1"]').style.display = 'block';
// 	document.querySelector('[data-panel="1"]').classList.add('animate');
// 	document.querySelector('.panel > .wrapper').classList.add('fade-in');
// });

const wordListDisplay = document.getElementById('word-list');
const panelTwoButton = document.getElementById('show-word-list');

panelTwoButton.addEventListener('click', ()=> {
	for (let i = 0; i < 1000; i++){
		wordListDisplay.textContent += wordsMasterArr[i]+'\n';
	};
	panelTwoButton.disabled = 'true';
});

const letterInput = document.querySelector('#panel-2 > section > div.panel-display > div > div:nth-child(1) > div > input[type="text"]');
const sortButton = document.getElementById('sort');

sortButton.addEventListener('click', ()=> {
  wordListDisplay.textContent = '';
  let letter = letterInput.value;
  let filteredArr = filterArrByChar(letter, wordsMasterArr);
  filteredArr.forEach(word => wordListDisplay.textContent += word + '\n');
});

function filterArrByChar(char = 'a', arr){
	return arr.filter(word => word[0] == char);
}