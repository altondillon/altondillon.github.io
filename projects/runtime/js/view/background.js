(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var backgroundBox;
        var lines = [];
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            var lineSpace = 100;
            var lineNumber = 5;
            var lineHeight = lineSpace * lineNumber;
            var line;

            background.removeAllChildren();

            // TODO: 3 - YOUR DRAW CODE GOES HERE
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game

            
             for(var i = 0; i < canvasWidth; i++) {
                 var line = draw.line(lineSpace * i, 0, lineSpace * i, lineHeight, "LightBlue", 2);
                 background.addChild(line);
                 lines.push(line);
             }
             for(var i = 0; i < lineNumber; i++) {
                 var shape = draw.line(0, lineSpace * i, canvasWidth, lineSpace * i, "LightBlue", 2);
                 background.addChild(shape);
             }
             
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            backgroundBox.x -= 1;
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                line.x = line.x - 5;
                if(line.x < -100) {
                    line.x > canvasWidth;
                }
            }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        backgroundBox = draw.rect(100,100,'Blue');
        backgroundBox.x = 300;
        backgroundBox.y = 380;
        //background.addChild(backgroundBox);
        return background;
    };
}(window));