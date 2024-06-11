//Selezione degli elementi del DOM
const responceForm = document.querySelector('.formResponce');
const inputContainer = document.querySelector('.inputContainer');
const inputEmail = document.querySelector('.inputEmail');
const responceMessage = document.querySelector('.responceMessage');
const btnQuestion = document.querySelectorAll('.btnQuestion');

//Funzione per la verifica dell'inserimento di un indirizzo email valido
const validateEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|it)$/i.test(email);


// Costante per la classe onFocus
const ON_FOCUS_CLASS = 'onFocus';

//Funzione per la gestione dell'evento di focus sugli input email
/*Questa funzione gestisce l'evento di focus sugli input email utilizzando il metodo toggle per 
aggiungere o rimuovere la classe ON_FOCUS_CLASS in base all'evento di focus.*/
const handleInputFocus = (e) => {
	const { target: { value }, type } = e;

	//NOTA: al posto di utilizzare i metodi add e remove potrei usare toggle che mi gestisce entrambi
	//inputContainer.classList.toggle(ON_FOCUS_CLASS, type === 'focusin');
	if (type === 'focusin') {
		inputContainer.classList.add(ON_FOCUS_CLASS);
	} else if (type === 'focusout') {
		inputContainer.classList.remove(ON_FOCUS_CLASS);
	} else {
		return false;
	}
}

//Funzione per gestire l'invio del modulo
/*Questa funzione gestisce l'evento di invio del modulo. Verifica se l'indirizzo email è valido, 
mostra un messaggio di risposta e, dopo 3 secondi, svuota il messaggio. */
const handleSubmit = (e) => {
	e.preventDefault()

	const { value } = inputEmail;
	const validEmail = validateEmail(value);

	if (validEmail) {
		responceMessage.innerText = 'Richiesta inviata. Presto verrai contattato!';
		inputEmail.value = '';
		inputContainer.classList.remove(ON_FOCUS_CLASS);
	} else {
		responceMessage.innerText = 'Per favore inserisci un indirizzo email valido!';
	}
	setTimeout(() => {
		responceMessage.innerText = '';
	}, 3000);
}

//Aggiunta degli ascoltatori di eventi:
inputEmail.addEventListener('focusin', handleInputFocus);
inputEmail.addEventListener('focusout', handleInputFocus);
responceForm.addEventListener('submit', handleSubmit);

//Gestione del clic sui pulsanti delle domande
/*Aggiungiamo un ascoltatore di eventi a ciascun pulsante delle domande. 
Quando un pulsante viene cliccato, la sua classe genitore viene alternata tra 'active' e non 'active'. */
btnQuestion.forEach((element) => {
	const handlerQuestion = (e) => {
		const parent = e.target.parentElement;
		parent.classList.toggle('active');
	}
	element.addEventListener('click', handlerQuestion);
});
