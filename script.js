var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia-Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo Democratic Republic of", "Costa Rica", "Cote d Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts Nevis", "St Lucia", "St Vincent the Grenadines", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Yemen", "Zambia", "Zimbabwe"];  

// The chosenArr array records what country was already selected in the past rounds.  It helps in preventing duplication of flags.

var chosenArr = [], numCorrect = 0;

// This is the main function.

function randomize(){

	// Create an array to store six random numbers.  These numbers cannot repeat each other or repeat a previously selected country.

	var random6 = [];

	while (random6.length < 6) {
		randomNum = Math.floor(Math.random() * countries.length);
		if (checkUnique(randomNum, random6) && checkUnique(randomNum, chosenArr)){
			random6.push(randomNum);
		}
	}

	var randomNum = Math.floor(Math.random() * 5); 
	var correctAnswer = random6[randomNum];
	chosenArr.push(correctAnswer);

	// Render initial state to the DOM.
	
	applyClass("remove", "#message", "correct");
	applyClass("remove", "#message", "incorrect");
	renderDOM("#message", "");
	renderDOM("#countryName", "<span>click</span> <b>" + countries[correctAnswer] + "</b>");

	if (chosenArr.length < 2) {
		renderDOM("#scoring", "***Game lasts 20 rounds***");
	}

	// Remove any CSS classes applied previously.

	for (var i=0; i<6; i++){
		applyClass("remove", "#img" + i, "faded");
	}

	// Render the flag images to the DOM.
	
	postFlag(random6, randomNum);

	// Create click event handlers.

	clickEvents(randomNum);

}

// This function checks whether a given number is already in the array.

function checkUnique(theNum, theArray){
	for (var i=0; i<theArray.length; i++) {
		if (theNum == theArray[i]) {
			return false;
		}
	}
	return true;
}

// This function posts flag images onto the DOM.

function postFlag(theArray, correctAns){
	theArray.forEach(function(val,count){
		var countryName = countries[val];
		var flagFileName = "flags/flag-of-" + countryName.replace(/\s/g, "-") + ".png";
		var flag = document.querySelector("#img" + count);
		flag.setAttribute("src", flagFileName);
	});
}

// This function creates the click event handlers.

function clickEvents(correctAns){
	for (var i=0; i<6; i++){
		var x = (correctAns == i) ? "yes": "no";
		var z = "clickResponse('" + x + "', " + correctAns + ")";
		applyEvent(i, z);
	}
}

// This function runs the event handlers and manipulates the DOM.

function clickResponse(correct, correctAns){

	// Check if it's end of game (after 20 rounds).  If it is, do not render the "next" button.

	if (chosenArr.length < 20) {
		var buttonTag = " <button onclick='randomize()'>Next</button>";
	} else {
		var buttonTag = " - GAME OVER.  Refresh browser to play again.";
	}

	// Render the correct message.

	if (correct == "yes"){
		numCorrect++;
		renderDOM("#message", "CORRECT!" + buttonTag);
		applyClass("add", "#message", "correct");
	} else {
		renderDOM("#message", "WRONG!" +  buttonTag);
		applyClass("add", "#message", "incorrect");
	}

	renderDOM("#scoring", numCorrect + " correct out of " + chosenArr.length + " (20 rounds total)");

	// Fade the incorrect flags and remove the click event handlers.

	for (var i=0; i<6; i++){
		applyEvent(i, "");
		if (i !== correctAns){
			applyClass("add", "#img" + i, "faded");
		}
	}

}

// These three functions render text and events to the DOM, and applies CSS class attributes.

function renderDOM(id, text){
	document.querySelector(id).innerHTML = text;
}

function applyEvent(id, event){
	document.querySelector("#img" + id).setAttribute("onclick", event);
}

function applyClass(action, id, css){
	if (action == "add"){
		document.querySelector(id).classList.add(css);
	} else {
		document.querySelector(id).classList.remove(css);
	}
}

// Start the game...

randomize();