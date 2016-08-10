(function(window) {
    'use strict';

    var Application = function(game, width, height, canvas)
    {
        this.isAlive = true;

        this.previousTime = Date.now();

        // Initialize WebGL
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        // Assert that the context has been created
        if (!this.gl) {
            throw new Exception("Unable to initialize WebGL. Your browser may not support it.");
        }

        this.gl.getExtension('OES_element_index_uint');

        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;

        // Set clear color to black, fully opaque
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Enable depth testing
        this.gl.enable(this.gl.DEPTH_TEST);
        // Near things obscure far things
        this.gl.depthFunc(this.gl.LEQUAL);

        this.game = game;

        this.game.application = this;

        this.game.create();
    };

    Application.prototype = {

        constructor: Application,

        performGameLoop: function()
        {
            this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
            
            //  Clear the color and depth buffers
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            
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
        },

        close: function()
        {
            this.isAlive = false;
        }
    };

    window.Application = Application;

})(window);