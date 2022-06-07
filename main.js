song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modalloaded);
    posenet.on('pose', gotresult);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    circle(rightwristx, rightwristy, 20);

    if (rightwristy > 0 && rightwristy <= 100) {
        document.getElementById("speed").innerHTML = "speed=0.5x";
        song.rate(0.5);
    }
    else if (rightwristy > 100 && rightwristy <= 250) {
        document.getElementById("speed").innerHTML = "speed=1x";
        song.rate(1);
    }
    else if (rightwristy > 250 && rightwristy <= 350) {
        document.getElementById("speed").innerHTML = "speed=2x";
        song.rate(2);
    }
    else {
        document.getElementById("speed").innerHTML = "speed=2.5x";
        song.rate(2.5);
    }
    if (scoreleftwrist > 0.2) {
        circle(leftwristx, leftwristy, 10);
        numberleftwristy = floor(Number(leftwristy));
        console.log(numberleftwristy);
        volume = numberleftwristy / 500;
        document.getElementById("volume").innerHTML = "Volume= " + volume;
        song.setVolume(volume);
    }



}

function playsong() {
    song.play();
}
function modalloaded() {
    console.log("Posenet is Initialized")
}
function gotresult(results) {
    if (results.length > 0) {
        scoreleftwrist = results[0].pose.keypoints[9].score;

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("leftwristx=" + leftwristx + " leftwristy=" + leftwristy);
        console.log("rightwristx=" + rightwristx + " rightwristy=" + rightwristy);
    }
}