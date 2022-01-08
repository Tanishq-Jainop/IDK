song=" "
function preload(){
    song=loadSound("music.mp3");
    }
srw=0;
slw=0;
rwx=0;
rwy=0;
lwx=0;
lwy=0;
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,ModelLoaded);
    posenet.on("pose",gotPoses)    
}
function ModelLoaded(){
    console.log("Model Has Loaded")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        srw=results[0].pose.keypoints[10].score;
        slw=results[0].pose.keypoints[9].score;

        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;
        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
    }

}
function draw(){
    image(video,0,0,500,400);
    fill("#ff0000");
    stroke("#ff0000");
    if (srw>0.2){
        circle(rwx,rwy,20);
        if(rwy>0 && rwy<=100){
            document.getElementById("speed").innerHTML="Speed: 0.5x";
            song.rate(0.5);

        }
        else if(rwy>100 && rwy<=200){
            document.getElementById("speed").innerHTML="Speed: 1x";
            song.rate(1);
            
        }
        else if(rwy>200 && rwy<=300){
            document.getElementById("speed").innerHTML="Speed: 1.5x";
            song.rate(1.5);
            
        }
        else if(rwy>300 && rwy<=400){
            document.getElementById("speed").innerHTML="Speed: 2x";
            song.rate(2);
            
        }
        else{
            document.getElementById("speed").innerHTML="speed:2.5x";
            song.rate(2.5)
        }
    }
    if(slw>0.2){
        circle(lwx,lwy,20);
        InNumberlwy = Number(lwy);
        remove_decimals=floor(InNumeberlwy);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }
    
}
function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
    
}