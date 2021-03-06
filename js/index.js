function Timer(Element, Time, Name){
	var element =	Element, time = Time, originalTime = Time, name = Name;
        // Sound notification, buffers automatically
    var sound = new Audio("./assets/alarm.wav");

	var interval	=	setInterval(timeCallBack, 1000);
	var isPaused	=	false;
	element.addEventListener("click", onClick);
	setName(name);
	timeCallBack();

	function getTimeElement(){
		return element.getElementsByClassName("time")[0];
	}

	function getNameElement(){
		return element.getElementsByClassName("name")[0];
	}

	function setName(name){
		getNameElement().textContent	=	name;
	}

	function timeCallBack(){
		if(time === 0){
			onEnd();
		}

		var minutes 	=	Math.floor(time/60);
		var seconds 	=	time % 60;

		if(seconds < 10){
			seconds	=	"0" + seconds;
		}

		getTimeElement().textContent	=	minutes + ":" + seconds;
		time 	-=	1;
	}

	function onClick(event){
		if(isPaused){
			interval 	=	setInterval(timeCallBack, 1000);
		}else{
			clearInterval(interval);
		}

		isPaused	=	!isPaused;
	}

    // when timer ends
	function onEnd(){
    // Play Sound Notification
        sound.play();
    // Pop-Up Prompt to Alert     
        window.alert(name + " Ready");
    // resets clock
		clearInterval(interval);
		isPaused	=	true;
    // resets to original time
		time 		=	originalTime;
	}
}

function Timers(Element){
	var timers 	=	[], element 	=	Element;


	this.addTimer	=	function(){
		var name 	=	prompt("Timer Name ");
		var time 	=	prompt("Timer Length (In Minutes)");

		name 		=	name || "Timer " + (timers.length + 1);

		if(isNaN(parseFloat(time))){
			time 	=	10;
		}

		time 		=	Math.floor(time * 60) || 10;

		var timerElement	=	document.createElement("div");
		timerElement.classList.add("timer");

		var nameElement 	=	document.createElement("div");
		nameElement.classList.add("name");
		timerElement.appendChild(nameElement);

		var timeElement 	=	document.createElement("div");
		timeElement.classList.add("time");
		timerElement.appendChild(timeElement);

		element.appendChild(timerElement);

		timers.push(new Timer(timerElement, time, name));
	}

	element.getElementsByClassName("add-timer")[0].addEventListener("click", this.addTimer);
}

var timers 	=	new Timers(document.getElementsByClassName("timer-container")[0]);