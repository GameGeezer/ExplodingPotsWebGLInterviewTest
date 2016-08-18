(function (window)
{
    'use strict';

    var Application = function (game, canvas)
    {
        this.isAlive = true;

        this.gl = initWebGL(canvas);
        
        this.keyboard = initKeyInput();

        this.game = game;
        this.game.application = this;
        this.game.create();

        //  Prevent the first frame delta from being massive
        this.previousTime = Date.now();

        //  Used to gauge efficiency and memory usage
        this.stats = new Stats();

        this.stats.showPanel(1);

        document.body.appendChild(this.stats.dom);
    };

    Application.prototype = {

        constructor : Application,

        performGameLoop : function ()
        {
            this.stats.begin();

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

            this.stats.end();

            //  If a close hasn't been requested then perform another loop
            if (this.isAlive)
            {
                requestAnimationFrame(this.performGameLoop.bind(this));
            }
        },

        close : function ()
        {
            this.isAlive = false;
        }
    };

    var initWebGL = function(canvas)
    {
        // Initialize WebGL
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        // Assert that the context has been created
        if (!gl)
        {
            throw new Exception("Unable to initialize WebGL. Your browser may not support it.");
        }

        gl.getExtension('OES_element_index_uint');

        window.drawBuffersExt = gl.getExtension( 'WEBGL_draw_buffers' ) || gl.getExtension( "GL_EXT_draw_buffers" ) || gl.getExtension( "EXT_draw_buffers" );

        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        // Set clear color to black, fully opaque
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Enable depth testing
        gl.enable(gl.DEPTH_TEST);
        // Near things obscure far things
        gl.depthFunc(gl.LEQUAL);

        return gl;
    };

    var initKeyInput = function()
    {
        var keyboard = new KeyboardCallback();
        
        document.addEventListener('keydown', function (event)
        {
            keyboard.onKeyDown(event);
        });

        document.addEventListener('keyup', function (event)
        {
            keyboard.onKeyUp(event);
        });
        
        return keyboard;
    };

    window.Application = Application;

})(window);