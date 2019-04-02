const canvas = document.getElementById('spaceCanvas');
const c = canvas.getContext('2d');
const flame = document.getElementById('tail');
const flame2 = document.getElementById('tail2');

const innerWidth = window.innerWidth,
    innerHeight = window.innerHeight,
    radius = 1,
    numStars = 800,
    starX_dir = 0,
		starY_dir = 0,
    TWO_PI = Math.PI*2;
    
let 
  starsIndex = 0,
	centerX = innerWidth*70/100,
	centerY = innerHeight/2,
	focalLength = 200;
	starRadius = null,
	starX = null,
	starY = null,
  stars = [];  
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	tColor = 90;

// Zoom in/out into the Space on mouse scroll
canvas.addEventListener('mousewheel', function(e){
	 
		if(e.deltaY < 0){
		 focalLength *= 1.1;
		 tColor += 2;
		 if(tColor >= 90){
			tColor = 90;
		}
   }else{
		 focalLength /= 1.1;
		 tColor -= 2;
		 if(tColor <= 10){
			 tColor = 10;
		 }
	 }

	 if(focalLength <=150){
		flame.style.borderColor = "#ffffff transparent transparent transparent"
		flame2.style.borderColor = "#ffffff transparent transparent transparent"
	 }else{
		flame.style.borderColor = "#e9e789 transparent transparent transparent"
		flame2.style.borderColor = "#e9e789 transparent transparent transparent"
	 }

   if(focalLength >= innerWidth){
     focalLength = innerWidth - 20;
   }else if(focalLength < 100){
     focalLength = 100;
   }   
}, false);

// Function for create new start
function star(x,y,z){
  this.x = x;
	this.y = y;
	this.z = z;
	this.radius = radius;
	this.color = "#fff";
	starsIndex++;
	stars[starsIndex] = this;
	this.id = starsIndex;
	
	// Animate Stars
	this.update = function(){
	  starX = (this.x - centerX) * (focalLength / this.z);
	  starX += centerX;
	  
	  starY = (this.y - centerY) * (focalLength / this.z);
	  starY += centerY;
	  
	  starRadius = radius * (focalLength / this.z);
	  
	  starX += starX_dir;
	  starY += starY_dir;
	  
	  this.z += -10;
	  
	  if(this.z <= 0){
	     this.z = parseInt(innerWidth);
	  }
	  
	  this.draw();
	}
	
	// Function for draw star (circle)
	this.draw = function(){
		c.beginPath();
		c.arc(starX,starY,starRadius, TWO_PI, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
}	

// X,Y,Z values
for(let s = 0; s < numStars; s++){
	x = Math.random() * innerWidth;
	y = Math.random() * innerHeight;
	z = Math.random() * innerWidth;
	new star(x,y,z);
}

// Function for animate canvas objects
function animate(){
    requestAnimationFrame(animate);
	 c.fillStyle=`#000000${tColor}`;
	 c.fillRect(0,0,innerWidth,innerHeight);
	
	for(let i in stars){
	  stars[i].update();
	}

}
animate();