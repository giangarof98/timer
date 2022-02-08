class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);

        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
    }

    start = () => {
        if(this.onStart){
            this.onStart(this.getTime);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);
    }

    pause = () => {
        clearInterval(this.interval)
    }

    tick = () => {
        if(this.getTime <= 0){
            this.pause()
            if(this.onComplete){
                this.onComplete();
            }
        } else{
            this.getTime = this.getTime - .05;
            if(this.onTick){
                this.onTick(this.getTime);
            }
        }
    }

    get getTime(){
        return parseFloat(this.durationInput.value);
    }

    set getTime(time){
        this.durationInput.value = time.toFixed(2);
    }


}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;

circle.setAttribute('stroke-dasharray', perimeter)
let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(total){
        console.log('started');
        duration = total;
    },
    onTick(getTime){
        circle.setAttribute('stroke-dashoffset', 
        perimeter * getTime / duration - perimeter);
    },
    onComplete(){
        console.log('Completed!');
    }
})
