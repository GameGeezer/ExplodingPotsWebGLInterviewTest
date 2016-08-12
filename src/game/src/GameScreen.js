(function(window) {
    'use strict';

    var GameScreen = function() {

        Screen.apply(this);
    };

    GameScreen.prototype = Object.create(Screen.prototype);

    GameScreen.prototype.constructor = GameScreen;

    GameScreen.prototype.onCreate = function() {

        this.player = new Player();
        this.gl = this.game.application.gl;
        //  Load the raw text

        var vertexShaderSource = window.loadedShaders["BasicVert"];

        var fragmentShaderSource = window.loadedShaders["BasicFrag"];

        this.shaderProgram1 = new ShaderProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        this.usingShaderProgram = this.shaderProgram1;
        
        this.projectionMatrix = mat4.create();

        var testBuilder = new GeometryBuilder();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot1"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot1"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["teapot1"].textures);
        testBuilder.setIndices(window.loadedMeshes["teapot1"].indices);
        var teapot1 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot2"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot2"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["teapot2"].textures);
        testBuilder.setIndices(window.loadedMeshes["teapot2"].indices);
        var teapot2 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot3"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot3"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["teapot3"].textures);
        testBuilder.setIndices(window.loadedMeshes["teapot3"].indices);
        var teapot3 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot4"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot4"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["teapot4"].textures);
        testBuilder.setIndices(window.loadedMeshes["teapot4"].indices);
        var teapot4 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot5"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot5"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["teapot5"].textures);
        testBuilder.setIndices(window.loadedMeshes["teapot5"].indices);
        var teapot5 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["Quad"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["Quad"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["Quad"].textures);
        testBuilder.setIndices(window.loadedMeshes["Quad"].indices);
        var quad = testBuilder.build();

        this.teapotList = [];
        this.teapotList[0] = new Mesh(this.gl);
        this.teapotList[1] = new Mesh(this.gl);
        this.teapotList[2] = new Mesh(this.gl);
        this.teapotList[3] = new Mesh(this.gl);
        this.teapotList[4] = new Mesh(this.gl);
        this.quadMesh = new Mesh(this.gl);
        this.testMeshFamily = new MeshFamily(this.gl);
        this.testMeshFamily.addToFamily(teapot1, this.teapotList[0]);
        this.testMeshFamily.addToFamily(teapot2, this.teapotList[1]);
        this.testMeshFamily.addToFamily(teapot3, this.teapotList[2]);
        this.testMeshFamily.addToFamily(teapot4, this.teapotList[3]);
        this.testMeshFamily.addToFamily(teapot5, this.teapotList[4]);
        this.testMeshFamily.addToFamily(quad, this.quadMesh);

        this.testMeshFamily.addAttribute(0, 3);
        this.testMeshFamily.addAttribute(1, 3);
        this.testMeshFamily.addAttribute(2, 2);
        this.testMeshFamily.createFamily();
        
        this.testMeshFamily.bind();
        this.usingShaderProgram.bind();

        this.modelMatrixUniform = this.usingShaderProgram.getUniformLocation("uModelMatrix");
        this.projectionMatrixUniform = this.usingShaderProgram.getUniformLocation("uProjectionMatrix");
        this.viewMatrixUniform = this.usingShaderProgram.getUniformLocation("uViewMatrix");

        mat4.perspective(this.projectionMatrix, 45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0);
        this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, this.projectionMatrix);

        this.gl.activeTexture(this.gl.TEXTURE0);
        window.textures.bind();
        this.gl.uniform1i(this.gl.getUniformLocation(this.usingShaderProgram.handle, "uSampler"), 0);
        
        this.testScene = new Scene();

        this.testMaterial = new Material();

        this.testSceneObject = new SceneObject(this.gl, this.teapotList[0], this.testMaterial, this.modelMatrixUniform);
        this.testSceneObject.setScale(0.01, 0.01, 0.01);
        this.testSceneObject.translateBy(-2, 0, -7);

        this.testSceneObject2 = new SceneObject(this.gl, this.quadMesh, this.testMaterial, this.modelMatrixUniform);
        //this.testSceneObject2.setScale(0.01, 0.01, 0.01);
        this.testSceneObject2.translateBy(2, 0, -7);

        this.testScene.addSceneObject(this.testSceneObject);
        this.testScene.addSceneObject(this.testSceneObject2);


        this.fbo = new FBO(this.gl, 1024, 1024);
        this.fbo.unbind();
        this.rbo = new RBO(this.gl, 1024, 1024);
        this.colorTexture = new Texture2D(this.gl);
        this.colorTexture.initializeFromDimensions(this.gl.RGBA, this.gl.UNSIGNED_BYTE, 1024, 1024);

        this.colorTexture.bind();
        this.rbo.bind();
        this.fbo.bind();
        this.fbo.attach(this.colorTexture.handle, this.rbo.handle);

        this.colorTexture.unbind();
        this.rbo.unbind();
        this.fbo.unbind();

    };

    GameScreen.prototype.onUpdate = function(delta) {

        this.player.update();
    };

    GameScreen.prototype.onRender = function(delta) {

        this.fbo.bind();
        window.textures.bind();
        this.gl.uniformMatrix4fv(this.viewMatrixUniform, false, this.player.getView());

        var tm = mat4.create();

        this.testScene.render();

        this.fbo.unbind();

        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        //Delete eventually

        var teapotCount = $('#numberOfTeapots').val();
        var teapotRes = $('#teapotResolution').val();
    //    this.teapotResolutions[teapotRes].bind(this.gl);
        for(var i = 0; i < teapotCount; ++i)
        {
            var x = i % 7;
            var y = Math.floor(i / 7)
            mat4.identity(tm);
            mat4.translate(tm, tm, [-5 + 1.5 * x, -5 + (1.5 * y), -10.0]);
            mat4.scale(tm, tm, [0.01, 0.01, 0.01]);
            this.gl.uniformMatrix4fv(this.modelMatrixUniform, false, tm);
            this.teapotList[teapotRes].render(this.gl)
          //  this.teapotResolutions[teapotRes].setTranslation(-5 + 1.5 * x, -5 + (1.5 * y), -10.0);
           // this.teapotResolutions[teapotRes].render(this.gl);
        }


        this.gl.activeTexture(this.gl.TEXTURE0);
        this.colorTexture.bind();
        this.gl.uniform1i(this.gl.getUniformLocation(this.usingShaderProgram.handle, "uSampler"), 0);
        this.testSceneObject2.render();
    };

    GameScreen.prototype.onPause = function( ) {

    };

    GameScreen.prototype.onLeave = function( ) {

    };

    GameScreen.prototype.onResume = function( ) {

    };

    window.GameScreen = GameScreen;
})(window);

