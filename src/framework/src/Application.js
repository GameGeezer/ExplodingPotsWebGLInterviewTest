(function(window) {
    'use strict';

    var Application = function(game, width, height, canvas) {


        this.isAlive = true;

        this.previousTime = Date.now();

        // Initialize WebGL
        this.contextGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        // Assert that the context has been created
        if (!this.contextGL) {
            alert("Unable to initialize WebGL. Your browser may not support it.");
        }

        this.contextGL.viewportWidth = canvas.width;
        this.contextGL.viewportHeight = canvas.height;

        // Set clear color to black, fully opaque
        this.contextGL.clearColor(0.0, 0.0, 0.0, 1.0);
        // Enable depth testing
        this.contextGL.enable(this.contextGL.DEPTH_TEST);
        // Near things obscure far things
        this.contextGL.depthFunc(this.contextGL.LEQUAL);

        this.game = game;

        this.game.application = this;

        this.game.create();
    };

    Application.prototype = {

        constructor: Application,

        performGameLoop: function() {
            this.contextGL.viewport(0, 0, this.contextGL.viewportWidth, this.contextGL.viewportHeight);
            //  Clear the color and depth buffers
            this.contextGL.clear(this.contextGL.COLOR_BUFFER_BIT | this.contextGL.DEPTH_BUFFER_BIT);
            //  Grab the current time
            var currentTime = Date.now();
            //  Find the frame delta
            var delta = currentTime - this.previousTime;
            //  Update the scene
            this.game.update(delta);
            //  Render the scene
            this.game.render(delta);
            //  The previous frame time is now the current
            this.previousTime = currentTime;
            //  If a close hasn't been requested then perform another loop
            if(this.isAlive)
            {
                requestAnimationFrame(this.performGameLoop.bind(this));
            }
        }
    };

    window.Application = Application;

})(window);