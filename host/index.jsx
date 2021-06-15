var project = app.project;

function randomizeFrames() {
           
        var theClip = project.activeSequence.getSelection();
        theClip[0].projectItem.setOutPoint(framesToSeconds(1), 4);
        
        // Construct an ordered array of frames
        var frameArray = [];
        var numFrames = secondsToFrames(theClip[0].duration.seconds);

        for (i = 0; i < numFrames; i++) {
            var inTime = framesToSeconds(i) + theClip[0].inPoint.seconds;
            var outTime = framesToSeconds(i + 1) + theClip[0].inPoint.seconds;
            frameArray.push(new Frame(inTime, outTime));
        }
    
        // Insert a random frame and remove the frame from frameArray to prevent duplicates
        for (i = 0; i < numFrames; i++) {
            var randIndex = Math.ceil( (numFrames - i) * Math.random()) - 1;
            
            var inTime =  frameArray[randIndex].inTime;
            theClip[0].projectItem.setInPoint(inTime, 4);        
            
            var outTime =  frameArray[randIndex].outTime;
            theClip[0].projectItem.setOutPoint(outTime, 4);       
            
            project.activeSequence.videoTracks[0].insertClip(theClip[0].projectItem, 0);  
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
    var FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3);  
    var frames = seconds * FRAME_RATE;
    return Math.round(frames);
}

function framesToSeconds(frames) {
    var FRAME_RATE = (1 / project.activeSequence.getSettings().videoFrameRate.seconds).toFixed(3);  
    var seconds = frames / FRAME_RATE;
    return  seconds;
}