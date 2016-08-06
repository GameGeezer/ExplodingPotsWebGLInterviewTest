(function(window) {
    'use strict';

    var GameScreen = function() {

        Screen.apply(this);
    };

    GameScreen.prototype = Object.create(Screen.prototype);

    GameScreen.prototype.constructor = GameScreen;

    GameScreen.prototype.onCreate = function() {

        this.player = new Player();
        this.contextGL = this.game.application.contextGL;
        this.currentShader = window.currentShader;
        this.shaderProgram1 = new ShaderProgram(this.contextGL, "shader-vs", "shader-fs");
        this.shaderProgram2 = new ShaderProgram(this.contextGL, "shader-vs-2", "shader-fs");
        this.usingShaderProgram = this.shaderProgram1;


        this.projectionMatrix = mat4.create();

        this.teapotResolutions = [];

        for(var i = 1; i < 6; ++i) {

            var renderMesh = new RenderMesh(this.contextGL,  window.loadedMeshes["teapot" + i], this.usingShaderProgram, "uModelMatrix", "aVertexPosition", "aVertexNormal");
            renderMesh.setScale(0.01, 0.01, 0.01);
            this.teapotResolutions[i] = renderMesh;
        }

        this.cubeMesh = new RenderMesh(this.contextGL,  window.loadedMeshes["cubeObj"], this.usingShaderProgram, "uModelMatrix", "aVertexPosition", "aVertexNormal");
        this.collisionSphere = new CollisionSphere([0,0,0], 1);
        this.explodingMesh = new ExplodingMesh(this.contextGL,this.teapotResolutions[5], this.cubeMesh);
        this.timeSinceExplosion = 0;
        this.dontRenderIndex = -1;
    };

    GameScreen.prototype.onUpdate = function(delta) {

        if(this.currentShader != window.currentShader)
        {

            this.setShader();
        }
        this.currentShader = window.currentShader;
        this.player.update();
        this.explodingMesh.update();

        if(this.exploded) {
            this.explodingMesh.expand();
            this.timeSinceExplosion += delta;

            if(this.timeSinceExplosion > 1000) {
                this.timeSinceExplosion = 0;
                this.exploded = false;
                this.explodingMesh.reset();
                this.dontRenderIndex = -1;
            }
        }


        var downX = 0;// -(MouseManager.leftButton.pressedX - 400) / 400;
        var downY = 0// -(MouseManager.leftButton.pressedY - 450) / 450;
        var testIntersectPosition = [-this.player.camera.position[0] + downX, -this.player.camera.position[1] + downY, this.player.camera.position[2]];
        console.log(downX);

        var teapotCount = $('#numberOfTeapots').val();
        for(var i = 0; i < teapotCount; ++i)
        {
            
            var x = i % 7;
            var y = Math.floor(i / 7);
            this.collisionSphere.center = [-5 + 1.5 * x, -5 + (1.5 * y), -10.0];

            if(MouseManager.leftButton.isPressed && !this.exploded && this.collisionSphere.intersectsRay(testIntersectPosition, [0, 0, -1])) {
                this.exploded = true;
                this.explodingMesh.setTranslation(-5 + 1.5 * x, -5 + (1.5 * y), -10.0);
                this.explodingMesh.explode();
                this.dontRenderIndex = i;
            }
        }
        

    };

    GameScreen.prototype.onRender = function(delta) {

        mat4.perspective(this.projectionMatrix, 45, this.contextGL.viewportWidth / this.contextGL.viewportHeight, 0.1, 100.0);

        this.usingShaderProgram.bind(this.contextGL);

        var projectionMatrixUniform = this.usingShaderProgram.getUniformLocation(this.contextGL, "uProjectionMatrix");
        var viewMatrixUniform = this.usingShaderProgram.getUniformLocation(this.contextGL, "uViewMatrix");
        this.contextGL.uniformMatrix4fv(projectionMatrixUniform, false, this.projectionMatrix);
        this.contextGL.uniformMatrix4fv(viewMatrixUniform, false, this.player.getView());

        //mat4.translate(this.mvMatrix, this.mvMatrix, [3.0, 0.0, 0.0]);

        var teapotCount = $('#numberOfTeapots').val();
        var teapotRes = $('#teapotResolution').val();
        this.teapotResolutions[teapotRes].bind(this.contextGL);
        for(var i = 0; i < teapotCount; ++i)
        {
            if(this.dontRenderIndex == i) {
                continue;
            }
            var x = i % 7;
            var y = Math.floor(i / 7)
            this.teapotResolutions[teapotRes].setTranslation(-5 + 1.5 * x, -5 + (1.5 * y), -10.0);
            this.teapotResolutions[teapotRes].render(this.contextGL);
        }
        if(this.exploded) {
            this.explodingMesh.render();
        }

        this.usingShaderProgram.unbind(this.contextGL);
    };

    GameScreen.prototype.onPause = function( ) {

    };

    GameScreen.prototype.onLeave = function( ) {

    };

    GameScreen.prototype.onResume = function( ) {

    };

    GameScreen.prototype.setShader = function( ) {
        if(window.currentShader == 0) {
            this.usingShaderProgram = this.shaderProgram1;
        }
        else {
            this.usingShaderProgram = this.shaderProgram2;
        }
        this.cubeMesh.setShader(this.contextGL, this.usingShaderProgram, "uModelMatrix", "aVertexPosition", "aVertexNormal");
        for(var i = 1; i < this.teapotResolutions.length - 1; ++ i)
        {
            this.teapotResolutions[i].setShader(this.contextGL, this.usingShaderProgram, "uModelMatrix", "aVertexPosition", "aVertexNormal");

        }

    };

    window.GameScreen = GameScreen;
})(window);