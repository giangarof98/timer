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
            this.onStart();
        }
        this.tick();
        this.interval = setInterval(this.tick, 1000);
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
            this.getTime = this.getTime - 1;
            if(this.onTick){
                this.onTick();
            }
        }
    }

    get getTime(){
        return parseFloat(this.durationInput.value);
    }

    set getTime(time){
        this.durationInput.value = time;
    }


}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(){
        console.log('started');
    },
    onTick(){
        console.log('ticked down');
    },
    onComplete(){
        console.log('Completed!');
    }
})
