
var gameWords =[], randWord, guessWord = [], wordArray =[];
var missedLetters =[];
var wins = 0;
var enable = true;
var messagecount =0;
var correctaudio = new Audio('assets/soundclip/correct.mp3');
var wrongaudio = new Audio('assets/soundclip/wrong.mp3');
var lostaudio = new Audio('assets/soundclip/lost.mp3');


//==========================================
//              Game Start
//==========================================


function messagebox(id) {
	if(messagecount < 1){
    	id.innerHTML = "Starting Game!";
  		// timedelay(id);
   		setTimeout(function(){wordgenerator()}, 1000)
   		messagecount++;
	}else{
		return;
	}
}


//=======time delay=========
function timedelay(id){
 setTimeout(function(){
    	id.innerHTML = "";
    }, 2000)
}

//===========================================
//     Random Word Generator Function
//===========================================


function wordgenerator(){

	// console.log("Please enter your guess 1 key at a time");
	document.getElementById("message").innerHTML = "Guess the Make of the Car!";


	//Array of words game will choose
	gameWords = ["porsche", "nissan", "mclaren" , "lamborghini"];
	//Choosing random word from Words Array with index
	var randIndex = Math.floor(Math.random() * gameWords.length);
	randWord = gameWords[randIndex];

	//Breaking random word's letters into array.
	for(var i = 0 ; i < randWord.length ; i++){
		wordArray.push(randWord[i]);
	}

	//Creating empty guessing array
	for(var i = 0 ; i < randWord.length ; i++){
		if( randWord[i] != " "){
		guessWord[i] = "-";
		}else{
			guessWord[i] = " ";
		}	
	}

	console.log("this is random word:" + randWord);

	//displaying blank fill info and wrong letters on screen
	document.getElementById("blankfill").innerHTML = guessWord;
	document.getElementById("wrongletters").innerHTML = missedLetters;
}

//============================================
//          Input Letters Function
//============================================


// Function to collect letter input

var count = 1 ; 
console.log(randWord);

function myFunction(event){
	if(enable == true){				// enable is filter for repeated letters
		var guessLetter = event.key; // key assigned

		if(letterscan(guessLetter,missedLetters) || letterscan(guessLetter,guessWord)){ // skips repeated keys
			console.log("try again!");
			document.getElementById("message").innerHTML = "You have already chosen that key! Please try another Key.";
		}else{

			// if key is correct letter is entered into guessed array
			if(letterscan(guessLetter, randWord)){ 
				console.log("You're RIGHT");
				document.getElementById("message").innerHTML = "Correct Letter!";
				letterReplace(guessLetter, randWord);
				
				document.getElementById("blankfill").innerHTML = guessWord;
				correctaudio.play();
				

			// if key is incorrect. counter is increased to indicate number of incorrect attempts.
			}else{
				console.log("You're WRONG");
				document.getElementById("message").innerHTML = "Nope, not a letter in the word. Try again!";
				wrongaudio.play();
			
				count++;
				var displaycount = 7 - count;
				document.getElementById("countdown").innerHTML = displaycount;

				console.log("count:"+ count);
				missedLetters.push(guessLetter);
				document.getElementById("wrongletters").innerHTML = missedLetters;
			}
		}
		gamestatus();	
	}else{
		return;
	}
}

//letter scan Function

function letterscan(letter, word){
	var guess = false;
	for( var i = 0 ; i < word.length ; i++){
		if(letter === word[i]){
			
			guess = true; 
		}
	}
return guess;
}

//letter replacement

function letterReplace(letter, wordarray){
	for( var i = 0 ; i < wordarray.length ; i++){
		if(letter === wordarray[i]){
			guessWord[i] = letter;

			console.log(guessWord);
		}
	}
}

//=============================================
//      loop to measure is game has been won
//=============================================


function gamestatus(){
	var blanks = 0;

	// adding "-" to see if word is completed
	for( var i = 0 ; i < guessWord.length ; i++){
		if(guessWord[i] === "-"){
			blanks++;
			console.log("blanks");
		}
	}

	// if no "-" are found, game is won
	if(blanks === 0){
		count = 0; 
		document.getElementById("message").innerHTML = " You Win!";
		wins++;
		
		// display correct image when won
		displayimg();

		//sound associated to car
		playsound();

		document.getElementById("numwins").innerHTML = wins;
		missedLetters =[];
		guessWord = [];
		enable = false ;
		setTimeout(function(){enable = true}, 13000);
		setTimeout(function(){wordgenerator()}, 13000)
		setTimeout(function(){clearimg()}, 13000);
		setTimeout(function(){clearsound()}, 14000);
		document.getElementById("countdown").innerHTML = "7";
		
		// wordgenerator();
	}	
	if(count > 6){
		console.log("YOU LOSE THE GAME; try again");
		document.getElementById("message").innerHTML = "YOU LOSE!";
		lostaudio.play();
		count = 0;
		missedLetters =[];
		guessWord = [];
		enable = false;
		setTimeout(function(){enable = true}, 4000);
		setTimeout(function(){wordgenerator()}, 4000);
		document.getElementById("countdown").innerHTML = "7";
	}
}

// Display photo when win function
function displayimg(){
	if(randWord ==="mclaren"){
		document.getElementById("photo").innerHTML = "<img src='assets/img/p1.jpg'>";
	}else if( randWord === "nissan"){
		document.getElementById("photo").innerHTML = "<img src='assets/img/skyline.jpg'>";
	}else if (randWord === "porsche"){
		document.getElementById("photo").innerHTML = "<img src='assets/img/gt3.jpg'>";
	}else if (randWord === "lamborghini"){
		document.getElementById("photo").innerHTML = "<img src='assets/img/lambo.jpg'>";
	}
}

//Clear photo from page
function clearimg(){
	document.getElementById("photo").innerHTML = "<img src='assets/img/question.jpg'>";
}

//=====================================================
// ============= SOUND FUNCTIONS ======================
//=====================================================

//Play sound clip
function playsound(){
	if(randWord ==="mclaren"){
		document.getElementById("soundclip").innerHTML = "<audio autoplay><source src='assets/soundclip/p1.mp3' type='audio/mpeg'></audio>";
	}else if( randWord === "nissan"){
		document.getElementById("soundclip").innerHTML = "<audio autoplay><source src='assets/soundclip/skyline.mp3' type='audio/mpeg'></audio>";
	}else if (randWord === "porsche"){
		document.getElementById("soundclip").innerHTML = "<audio autoplay><source src='assets/soundclip/porsche.mp3' type='audio/mpeg'></audio>";
	}else if (randWord === "lamborghini"){
		document.getElementById("soundclip").innerHTML = "<audio autoplay><source src='assets/soundclip/lambo.mp3' type='audio/mpeg'></audio>";
	}
}

//clear sound clip
function clearsound(){
	document.getElementById("soundclip").innerHTML = "";
}