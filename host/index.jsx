var project = app.project;

function randomizeFrames(framesPerCut, labelColour) {

    var FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3); 
    var theClip = project.activeSequence.getSelection();
    var clipInFrame = secondsToFrames(theClip[0].inPoint.seconds, FRAME_RATE);
    var framesBin = project.rootItem.createBin("Temp");
    var usedFramesBin = project.rootItem.createBin(theClip[0].name + " Frames"); 
    var numFrames = secondsToFrames(theClip[0].duration.seconds, FRAME_RATE);
    var numChunks = numFrames / framesPerCut;
    
    // Creates subclipsc 
    for(i = 0; i < numChunks; i++) {
        startTime = framesToSeconds(i * framesPerCut + clipInFrame, FRAME_RATE);
        endTime = framesToSeconds (i * framesPerCut + clipInFrame + framesPerCut, FRAME_RATE);
        clipFrame = theClip[0].projectItem.createSubClip(i + " " + theClip[0].name, startTime, endTime , 0);
        clipFrame.setColorLabel(labelColour);
        clipFrame.moveBin(framesBin);
    }
    
    // Insert subclips onto timeline
    maxFrameCount = numChunks;
    for (i = 0; i < maxFrameCount; i++) {
        randIndex = Math.round(Math.random() * numChunks) - 1;
        if (randIndex < 0) randIndex = 0; 

        project.activeSequence.videoTracks[0].insertClip(framesBin.children[randIndex], theClip[0].start);
    
        framesBin.children[randIndex].moveBin(usedFramesBin);
        numChunks--;
    }
    
    for (i = 0; i < theClip.length; i++) {
        if (i < theClip.length - 1) {
            theClip[i].remove(0 , 0);
        }
        else {
            theClip[i].remove(1 , 0);
        }
    }
    framesBin.deleteBin();
}


function Frame(theInTime, theOutTime) {
    this.inTime = theInTime;
    this.outTime = theOutTime;
};

function test() {
        var FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3);     
    
        var theClip = project.activeSequence.getSelection();
        theClip[0].projectItem.setOutPoint(framesToSeconds(1, FRAME_RATE), 4);
        
        // Construct an ordered array of frames
        var frameArray = [];
        var numFrames = secondsToFrames(theClip[0].duration.seconds, FRAME_RATE);

        for (i = 0; i < numFrames; i++) {
            var inTime = framesToSeconds(i, FRAME_RATE) + theClip[0].inPoint.seconds;
            var outTime = framesToSeconds(i + 1, FRAME_RATE) + theClip[0].inPoint.seconds;
            frameArray.push(new Frame(inTime, outTime));
        }
    
        for (i = 0; i < numFrames; i++) {
            var randIndex = Math.ceil( (numFrames - i) * Math.random()) - 1;
            
            
            // Insert a random frame and remove the frame from frameArray to prevent duplicates
            var inTime =  frameArray[randIndex].inTime;
            theClip[0].projectItem.setInPoint(inTime, 4);        
            
            var outTime =  frameArray[randIndex].outTime;
            theClip[0].projectItem.setOutPoint(outTime, 4);       
            
            project.activeSequence.videoTracks[0].insertClip(theClip[0].projectItem, 0);  
            
            frameArray.splice(randIndex, 1);
            
        }
    
        
}
test()


/*
    theClip[0].projectItem.setInPoint(framesToSeconds(i, FRAME_RATE) + theClip[0].inPoint.seconds, 4);
            theClip[0].projectItem.setOutPoint(framesToSeconds(i + 1, FRAME_RATE) + theClip[0].inPoint.seconds, 4);
            
            project.activeSequence.videoTracks[0].insertClip(theClip[0].projectItem, 0);  
*/

function secondsToFrames(seconds, frameRate) {
    frames = seconds * frameRate;
    return Math.round(frames);
}

function framesToSeconds(frames, frameRate) {
        seconds = frames / frameRate;
        return  seconds;
}