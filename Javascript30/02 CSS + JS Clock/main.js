
let secondHand = document.querySelector('.second-hand'),
    minuteHand = document.querySelector('.min-hand'),
    hourHand = document.querySelector('.hour-hand');


function CurrentTime() {
    this.time = new Date().toLocaleString().slice(11, 19).split(':');
    this.hour = this.time[0];
    this.minute = this.time[1];
    this.second = this.time[2];
}


function setDate(h, m, s) {
    hourHand.style.transform = `rotate(${h}deg)`;
    minuteHand.style.transform = `rotate(${m}deg)`;
    secondHand.style.transform = `rotate(${s}deg)`;
}

function updateTime() {
    let currentTime = new CurrentTime(),
        currentHour = currentTime.hour * 30 + 90,
        currentMinute = currentTime.minute * 6 + 90,
        currentSecond = currentTime.second * 6 + 90;
    setDate(currentHour, currentMinute, currentSecond);
}

setInterval(updateTime, 1000);
