var project = app.project;
mainBin = project.rootItem.createBin("Randomized Frames");

function randomizeFrames(framesPerCut, labelColour) {

    FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3); 
    theClip = project.activeSequence.getSelection();
    clipInFrame = secondsToFrames(theClip[0].inPoint.seconds, FRAME_RATE);
    framesBin = mainBin.createBin("Temp");
    usedFramesBin = mainBin.createBin(theClip[0].name + " Frames"); 
    numFrames = secondsToFrames(theClip[0].duration.seconds, FRAME_RATE);
    numChunks = numFrames / framesPerCut;
    
    // Creates subclips
    for(i = 0; i < numChunks; i++) {
        startTime = framesToSeconds(i * framesPerCut + clipInFrame, FRAME_RATE);
        endTime = framesToSeconds (i * framesPerCut + clipInFrame + framesPerCut, FRAME_RATE);
        clipFrame = theClip[0].projectItem.createSubClip(i + " " + theClip[0].name, startTime, endTime , 0);
        clipFrame.setColorLabel(labelColour);
        clipFrame.moveBin(framesBin);
    }
    
    maxFrameCount = numChunks;
    for(i = 0; i < maxFrameCount; i++) {
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

function secondsToFrames(seconds, frameRate) {
    frames = seconds * frameRate;
    return Math.round(frames);
}

function framesToSeconds(frames, frameRate) {
        seconds = frames / frameRate;
        return  seconds;
}