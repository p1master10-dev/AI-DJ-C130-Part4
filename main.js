var song1 = "";
var song2 = "";
var song1_status = '';
var song2_status = '';
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var score_LeftWristY = 0;
var score_RightWristY = 0;

function preload(){
    song1 = loadSound("Harry Potter.mp3");
    song2 = loadSound("Dream Song.mp3");
}

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded('PoseNet is Now ready to run!'));
    poseNet.on('pose' , gotPoses);
}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

    if(score_RightWristY > 0.2){
        circle(rightWristX , rightWristY , 20);

        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById('song-playing').innerHTML = "Playing - Harry Potter Theme Music";
        }
    }

    if (score_LeftWristY > 0.2) {
        circle(leftWristX, leftWristY, 20);

        song1.stop();

        if (song2_status == false) {
            song2.play();
            document.getElementById('song-playing').innerHTML = "Playing - Dream Speedrun Music";
        }
    }
}

function modelLoaded(text){
    console.log(text);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        score_RightWristY = results[0].pose.keypoints[10].score;
        score_LeftWristY = results[0].pose.keypoints[9].score;
        console.log('SCORE LEFT = ' + score_LeftWristY + "   SCORE RIGHT = " + score_RightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log('rightWrist X and Y = ' + rightWristX + ',' + rightWristY);
        console.log('leftWrist X and Y = ' + leftWristX + ',' + leftWristY);
    }
}

function playSong(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);

    song2.setVolume(1);
    song2.setVolume(1);
}