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
        this.currentShader = window.currentShader;
        //  Load the raw text
        var vertexShaderSource = FileUtil.loadTextFromId("shader-vs");

        var vertexShader2Source = FileUtil.loadTextFromId("shader-vs-2");

        var fragmentShaderSource = FileUtil.loadTextFromId("shader-fs");

        this.shaderProgram1 = new ShaderProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        this.shaderProgram2 = new ShaderProgram(this.gl, vertexShader2Source, fragmentShaderSource);
        this.usingShaderProgram = this.shaderProgram1;


        this.projectionMatrix = mat4.create();

        this.teapotResolutions = [];


        var testBuilder = new GeometryBuilder();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot1"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot1"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot1"].indices);
        var teapot1 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot2"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot2"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot2"].indices);
        var teapot2 = testBuilder.build();
        var testBuilder = new GeometryBuilder();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot1"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot1"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot1"].indices);
        var teapot1 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot2"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot2"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot2"].indices);
        var teapot2 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot3"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot3"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot3"].indices);
        var teapot3 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot4"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot4"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot4"].indices);
        var teapot4 = testBuilder.build();
        testBuilder.reset();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["teapot5"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["teapot5"].vertexNormals);
        testBuilder.setIndices(window.loadedMeshes["teapot5"].indices);
        var teapot5 = testBuilder.build();

        this.teapotList = [];
        this.teapotList[0] = new Mesh();
        this.teapotList[1] = new Mesh();
        this.teapotList[2] = new Mesh();
        this.teapotList[3] = new Mesh();
        this.teapotList[4] = new Mesh();
        this.testMeshFamily = new MeshFamily(this.gl);
        this.testMeshFamily.addToFamily(teapot1, this.teapotList[0]);
        this.testMeshFamily.addToFamily(teapot2, this.teapotList[1]);
        this.testMeshFamily.addToFamily(teapot3, this.teapotList[2]);
        this.testMeshFamily.addToFamily(teapot4, this.teapotList[3]);
        this.testMeshFamily.addToFamily(teapot5, this.teapotList[4]);


        this.testMeshFamily.addAttribute(0, 3);
        this.testMeshFamily.addAttribute(1, 3);
        this.testMeshFamily.createFamily();

        for(var i = 1; i < 6; ++i) {

            var renderMesh = new RenderMesh(this.gl, window.loadedMeshes["teapot" + i].vertices, window.loadedMeshes["teapot" + i].vertexNormals, window.loadedMeshes["teapot" + i].indices, this.usingShaderProgram, "uModelMatrix", "aVertexPosition", "aVertexNormal");
            renderMesh.setScale(0.01, 0.01, 0.01);
            this.teapotResolutions[i] = renderMesh;
        }
    };

    GameScreen.prototype.onUpdate = function(delta) {

        if(this.currentShader != window.currentShader)
        {

            this.setShader();
        }
        this.currentShader = window.currentShader;
        this.player.update();
    };

    GameScreen.prototype.onRender = function(delta) {

        mat4.perspective(this.projectionMatrix, 45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0);

        this.usingShaderProgram.bind();

        var modelMatrixUniform = this.usingShaderProgram.getUniformLocation("uModelMatrix");
        var projectionMatrixUniform = this.usingShaderProgram.getUniformLocation("uProjectionMatrix");
        var viewMatrixUniform = this.usingShaderProgram.getUniformLocation("uViewMatrix");
        this.gl.uniformMatrix4fv(projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(viewMatrixUniform, false, this.player.getView());

        var tm = mat4.create();

        this.testMeshFamily.bind();
        mat4.identity(tm);
        mat4.translate(tm, tm, [0, 0, -10]);
        mat4.scale(tm, tm, [0.01, 0.01, 0.01]);
        this.gl.uniformMatrix4fv(modelMatrixUniform, false, tm);
        this.teapotList[0].render(this.gl)
        mat4.identity(tm);
        mat4.translate(tm, tm, [5, 0, -10]);
        mat4.scale(tm, tm, [0.01, 0.01, 0.01]);
        this.gl.uniformMatrix4fv(modelMatrixUniform, false, tm);
        this.teapotList[1].render(this.gl)
        //mat4.translate(this.mvMatrix, this.mvMatrix, [3.0, 0.0, 0.0]);

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
            this.gl.uniformMatrix4fv(modelMatrixUniform, false, tm);
            this.teapotList[teapotRes].render(this.gl)
          //  this.teapotResolutions[teapotRes].setTranslation(-5 + 1.5 * x, -5 + (1.5 * y), -10.0);
           // this.teapotResolutions[teapotRes].render(this.gl);
        }
       // this.usingShaderProgram.unbind(this.gl);
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
        for(var i = 1; i < this.teapotResolutions.length - 1; ++ i)
        {
            this.teapotResolutions[i].setShader(this.gl, this.usingShaderProgram, "uModelMatrix", "aVertexPosition", "aVertexNormal");

        }

    };

    window.GameScreen = GameScreen;
})(window);

/*

 this.teapotResolutions = [];



 this.cubeMesh = new Mesh();
 this.teapotResolutions[0] = new Mesh();
 this.teapotResolutions[1] = new Mesh();
 this.teapotResolutions[2] = new Mesh();
 this.teapotResolutions[3] = new Mesh();
 this.teapotResolutions[4] = new Mesh();
 this.testMeshFamily = new MeshFamily(this.gl);
 this.testMeshFamily.addToFamily(teapot1, this.teapotResolutions[0]);
 this.testMeshFamily.addToFamily(teapot2, this.teapotResolutions[1]);
 this.testMeshFamily.addToFamily(teapot3, this.teapotResolutions[2]);
 this.testMeshFamily.addToFamily(teapot4, this.teapotResolutions[3]);
 this.testMeshFamily.addToFamily(teapot5, this.teapotResolutions[4]);


 this.testMeshFamily.addAttribute(0, 3);
 this.testMeshFamily.addAttribute(1, 3);
 this.testMeshFamily.createFamily();
 */