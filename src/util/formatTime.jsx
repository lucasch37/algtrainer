const formatTime = (time) => {
    let minutes = Math.floor(time / 6000);
    let remainingMiliseconds = time % 6000;
    let seconds = Math.floor(remainingMiliseconds / 100);
    let miliseconds = remainingMiliseconds % 100;

    if (minutes >= 1 && seconds < 10) seconds = "0" + seconds;
    if (miliseconds < 10) miliseconds = "0" + miliseconds;
    if (minutes <= 0) return seconds + "." + miliseconds;
    return minutes + ":" + seconds + "." + miliseconds;
};

export default formatTime;
