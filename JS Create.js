// Sets up the canvas
var canvas = document.querySelector('canvas');
// Changes the width and height to the width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

/** 
*	First function that is called upon when the page opens
*	Parameters: none
*	Return Value: none
*/ 
function onOpen(){
	// Sets up the font type and size of the text
	c.font = "50px 'Times New Roman'"
	c.textAlign = "center"
	
	// Inserts text onto the canvas
	c.fillText("Circle Animation", canvas.width/2, canvas.height/2);
	
	// Sets up the font type and size of the text
	c.font = "30px 'Times New Roman'"
	
	// Inserts text onto the canvas
	c.fillText("Press Enter to Begin", canvas.width/2, canvas.height/2 + 100);
	
	// Code citation:
	// 		Author: Bijan
	//		Accessed: 4/12/2018
	//		URL: https://stackoverflow.com/questions/14542062/eventlistener-enter-key?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
	// 		Purpose: Listens for when the enter key is pressed
	window.addEventListener('keypress', function (e) {
		var key = e.which || e.keyCode;
		if (key === 13){
			mainEvent();
		}
	});
}

/** 
*	This function interacts with the user. This function leads to the animation of the play() function
*	Parameters: none
*	Return Value: none
*/ 
function mainEvent(){
	alert("Hello! Hover over the circles to see a nice animation.");
	function prompter(){
		// Creates a variable that holds onto what the user inputs into the prompt
		var person = prompt("Are you ready for this?");
		if (person == "No" || person == "no"){
			alert("Too bad! Welcome to the Circle World!");
			
			// Starts up the play() function
			window.requestAnimationFrame(play);
		}
		else if (person == "" || person == " "){
			prompter();
			
		}
		else if (person == "Yes" || person == "yes"){
			alert("Welcome!");
			
			// Starts up the play() function
			window.requestAnimationFrame(play);
		}
		else{
			prompter();
		}
	}
	prompter();
}

// Sets a default value to the number of circles
var numCircles = 100;

/**
*	This function asks for the number of circles that the user wants to see in the animation
*	Parameters: none
*	Return Value: none
*/
function askNumberCircles(){
	numCircles = prompt("How many circles? (1-1000)");
	
		// makes sure that the user inputs a number between 1-1000
		if (numCircles < 0 || numCircles == 0){
			askNumberCircles();
		}
		else if (numCircles > 0 && numCircles < 1001){ 
			numCircles = numCircles
		}
		else{
			askNumberCircles();
		}
}


/**
*	This function creates the circles and then animates them onto the webpage
*	Parameters: none
*	Return Value: none
*/
function play(){
	
	askNumberCircles();
	var n = numCircles;
	
	// sets the mouse coordinates so that they can change
	var mouse = {
		x: undefined,
		y: undefined
	}
	
	// Sets a hard max radius
	var maxRadius = 40;
	
	// Creates an array of colors to randomly choose from
	var colorArray = [
		'#00FF00','#FFFF00','#FF7F00','#FF0000','#0000FF', '#9400D3'
	]
	
	// Event lister that updates the coordinates of the mouse pointer whenever it moves across the page
	window.addEventListener('mousemove', function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	});
	
	// Makes sure that the canvas height and width will update when the webpage changes sizes
	window.addEventListener('resize', function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
	});
	
	/** 
	*	Function creates a circle that can have random spawn points, sizes, and velocities
	*	Parameters: x - x coordinates; y - y coordinates; dx - x velocity; dy - y velocity, radius - radius of the circle
	*	Return Value: none
	*/
	
	function Circle(x, y, dx, dy, radius){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		
		// Grabs onto a random color from the color array
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
		
		this.draw = function(){
			// Draws the circle with random sizes
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			
			// Fills the circle with a color
			c.strokeStyle = this.color;
			c.stroke();
			c.fillStyle = this.color;
			c.fill();
		}
		
		this.update = function() {
			if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
				this.dx = -this.dx
			}
			
			if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
				this.dy = -this.dy
			}
			
			this.x += this.dx;
			this.y += this.dy;
			
			if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
				if(this.radius < maxRadius){
					this.radius += 1;
				}
			}
			
			else if(this.radius > this.minRadius){
				this.radius -=1;
			}
			this.draw();
		}
	}
	
	var circleArray = [];
	function init(){
		
		circleArray = [];
		
		// Repeats for the number of circles that was inputed by the user
		for(var i = 0; i < n; i++){
			
			// Creates the random sizes, x, y, and velocities
			var radius = Math.random() * 3 + 1;
			var x = Math.random() * (innerWidth - radius * 2) + radius;
			var y = Math.random() * (innerHeight - radius * 2) + radius;
			var dx = (Math.random() - 0.5) * 8;
			var dy = (Math.random() - 0.5) * 8;
			
			// Puts the generated circle into the circle array
			circleArray.push(new Circle(x,y,dx,dy,radius))
		}
		
	}
	
	
	function animate(){
		// Makes sure the animation keeps looping over and over until the user stops the program
		requestAnimationFrame(animate);
		
		// Resets the page every time the circles move so the circles do not "smear" the page
		c.clearRect(0,0,innerWidth,innerHeight);
		
		// Puts the circle onto the page
		for(var i = 0; i < circleArray.length; i++){
			circleArray[i].update();
		}
	}
	animate();
	init();
	
}



onOpen();
