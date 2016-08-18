(function(window) {
    'use strict';

    var GameScreen = function() {

        Screen.apply(this);
    };

    GameScreen.prototype = Object.create(Screen.prototype);

    GameScreen.prototype.constructor = GameScreen;

    GameScreen.prototype.onCreate = function() {

        this.gl = this.game.application.gl;

        this.keyboard = this.game.application.keyboard;

        this.player = new Player();

        this.keyboard.addListener(this.player);
        
        //  Load the raw text

        var vertexShaderSource = window.loadedShaders["BasicVert"];

        var fragmentShaderSource = window.loadedShaders["BasicFrag"];

        var meshPassVert = window.loadedShaders["MeshPassVert"];

        var meshPassFrag = window.loadedShaders["MeshPassFrag"];

        this.deferredMeshPassProgram = new ShaderProgram(this.gl, meshPassVert, meshPassFrag);
        
        this.shaderProgram1 = new ShaderProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        this.usingShaderProgram = this.shaderProgram1;
        
        this.projectionMatrix = mat4.create();

        var testBuilder = new GeometryBuilder();
        testBuilder.createComponent(0, 3);
        testBuilder.createComponent(1, 3);
        testBuilder.createComponent(2, 2);
        testBuilder.setDataAtComponent(0, window.loadedMeshes["Sibenik"].vertices);
        testBuilder.setDataAtComponent(1, window.loadedMeshes["Sibenik"].vertexNormals);
        testBuilder.setDataAtComponent(2, window.loadedMeshes["Sibenik"].textures);
        testBuilder.setIndices(window.loadedMeshes["Sibenik"].indices);
        var teapot1 = testBuilder.build();
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
        this.quadMesh = new Mesh(this.gl);
        this.testMeshFamily = new MeshFamily(this.gl);
        this.testMeshFamily.addToFamily(teapot1, this.teapotList[0]);
        this.testMeshFamily.addToFamily(quad, this.quadMesh);

        this.testMeshFamily.addAttribute(0, 3);
        this.testMeshFamily.addAttribute(1, 3);
        this.testMeshFamily.addAttribute(2, 2);
        this.testMeshFamily.createFamily();
        
        this.testMeshFamily.bind();

        this.renderer = new Renderer(this.gl, this.quadMesh, this.usingShaderProgram);

        mat4.perspective(this.projectionMatrix, 45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0);


        
        this.testScene = new Scene();

        this.testMaterial = new Material(this.gl, this.deferredMeshPassProgram, "uModelMatrix", "uProjectionMatrix", "uViewMatrix", "uSampler", "uNormalMatrix");
        this.testMaterial.addTexture(window.textures);

        this.testSceneObject = new SceneObject(this.gl, this.teapotList[0], this.testMaterial);
      //  this.testSceneObject.setScale(0.1, 0.1, 0.1);
        this.testSceneObject.translateBy(-2, 0, -7);

        this.testSceneObject2 = new SceneObject(this.gl, this.quadMesh, this.testMaterial);
        //this.testSceneObject2.setScale(0.01, 0.01, 0.01);
        this.testSceneObject2.translateBy(2, 0, -7);

        this.testScene.addSceneObject(this.testSceneObject);

        this.testScene.addSceneObject(this.testSceneObject2);


    };

    GameScreen.prototype.onUpdate = function(delta) {

        this.player.update();
    };

    GameScreen.prototype.onRender = function(delta) {
        
        this.renderer.render(this.testScene, this.player.getView(), this.projectionMatrix);
    };

    GameScreen.prototype.onPause = function( ) {

    };

    GameScreen.prototype.onLeave = function( ) {

    };

    GameScreen.prototype.onResume = function( ) {

    };

    window.GameScreen = GameScreen;
    
})(window);

