var project = app.project;

function randomizeFrames(framesPerCut) {
           
        var theClip = project.activeSequence.getSelection();
        theClip[0].projectItem.setOutPoint(framesToSeconds(1), 4);
        
        // Construct an ordered array of frames
        var frameArray = [];
        var numFrames = secondsToFrames(theClip[0].duration.seconds);
        
        for (i = 0; i < numFrames; i += framesPerCut) {
            var inTime = framesToSeconds(i) + theClip[0].inPoint.seconds;
            var outTime = framesToSeconds(i + framesPerCut) + theClip[0].inPoint.seconds;
            
            // Ensures that the duration stays the same if numFrames is not divisible by framesPerCut
            // Note: one segment might be fewer than framesPerCut frames long
             if (outTime > theClip[0].outPoint.seconds) {
                outTime = theClip[0].outPoint.seconds;
             }
            
            frameArray.push(new Frame(inTime, outTime));
        }
    
        // Insert a random frame and remove the frame from frameArray to prevent duplicates
        
        //project.createNewSequenceFromClips("Name", theClip[0].projectItem);
        
        const length = frameArray.length
        for (i = 0; i < length; i++) {
            var randIndex = Math.ceil( (length - i) * Math.random()) - 1;
            
            var inTime =  frameArray[randIndex].inTime;
            theClip[0].projectItem.setInPoint(inTime, 4);        
            
            var outTime =  frameArray[randIndex].outTime;
            theClip[0].projectItem.setOutPoint(outTime, 4);       

            project.activeSequence.videoTracks[0].overwriteClip(theClip[0].projectItem, theClip[0].start);
            theClip[0].projectItem.clearInPoint();
            theClip[0].projectItem.clearOutPoint();
            frameArray.splice(randIndex, 1); // <--- Removes the frame from frameArray
        }
}

// Frame object that holds the start and end time of a frame in seconds
function Frame(theInTime, theOutTime) {
    this.inTime = theInTime;
    this.outTime = theOutTime;
};

function secondsToFrames(seconds) {
    const FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3);  
    var frames = seconds * FRAME_RATE;
    return Math.round(frames);
}

function framesToSeconds(frames) {
    const FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3);  
    var seconds = frames / FRAME_RATE;
    return  seconds;
}