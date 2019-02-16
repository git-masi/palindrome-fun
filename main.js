const buttonOne = document.getElementById('btn1');
buttonOne.addEventListener('click',()=>{
	document.querySelector('[data-panel="1"]').style.display = 'block';
	document.querySelector('[data-panel="1"]').classList.add('animate');
	document.querySelector('.panel > .wrapper').classList.add('fade-in');
});