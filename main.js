// const buttonOne = document.getElementById('btn1');
// buttonOne.addEventListener('click',()=>{
// 	document.querySelector('[data-panel="1"]').style.display = 'block';
// 	document.querySelector('[data-panel="1"]').classList.add('animate');
// 	document.querySelector('.panel > .wrapper').classList.add('fade-in');
// });

const wordListDisplay = document.getElementById('word-list');
const panelTwoButton = document.querySelector('#panel-2 button');

panelTwoButton.addEventListener('click', ()=> {
	for (let i = 0; i < 1000; i++){
		wordListDisplay.textContent += wordsMasterArr[i]+'\n';
	};
	panelTwoButton.disabled = 'true';
});