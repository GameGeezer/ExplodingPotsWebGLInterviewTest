(function (window)
{
    'use strict';

    var LoadingScreen = function ()
    {
        Screen.apply(this);

        this.singleton = {Value: 3};
    };

    LoadingScreen.prototype = Object.create(Screen.prototype);

    LoadingScreen.prototype.constructor = LoadingScreen;

    LoadingScreen.prototype.onCreate = function ()
    {
        this.gl = this.game.application.gl;

        loadMeshes(this.singleton);

        loadShaders(this.singleton);

        loadTextures(this.singleton, this.gl, this.gl.RGBA, this.gl.UNSIGNED_BYTE, 'res/textures/Brick1.jpg');
    };

    LoadingScreen.prototype.onUpdate = function (delta)
    {
        if(this.singleton.Value == 0)
        {
            this.game.changeScreens(2);
        }
    };

    LoadingScreen.prototype.onRender = function (delta)
    {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    };

    LoadingScreen.prototype.onPause = function ()
    {

    };

    LoadingScreen.prototype.onLeave = function ()
    {

    };

    LoadingScreen.prototype.onResume = function ()
    {

    };

    window.loadedMeshes = {};
    var loadMeshes = function (singleton)
    {
        OBJ.downloadMeshes({
            'cubeObj' : 'res/models/cube.obj',
            'teapot1' : 'res/models/MeshRes1.obj',
            'Quad' : 'res/models/Quad.obj',
            'Sibenik' : 'res/models/sibenik/sibenik.obj',
        }, function (meshes)
        {
            window.loadedMeshes = meshes;

            singleton.Value = singleton.Value - 1;
        });
    };

    window.textures = {};

    var loadTextures = function (singleton, gl, format, dataType, urlLocation)
    {
        TextureLoader.loadFromURL(gl, format, dataType, urlLocation, function (texture)
        {
            window.textures = texture;
            singleton.Value = singleton.Value - 1;
        });
    };


    window.loadedShaders = {};
    var loadShaders = function (singleton)
    {
        FileUtil.loadTextFromUrl({
            'BasicVert' : 'res/shaders/BasicShader.vert',
            'BasicFrag' : 'res/shaders/BasicShader.frag',
            'BasicTexturedVert' : 'res/shaders/BasicTextured.vert',
            'BasicTexturedFrag' : 'res/shaders/BasicTextured.frag',
            'MeshPassVert' : 'res/shaders/MeshPass.vert',
            'MeshPassFrag' : 'res/shaders/MeshPass.frag',
        }, function (shaders)
        {
            window.loadedShaders = shaders;
            singleton.Value = singleton.Value - 1;
        });
    };

    window.LoadingScreen = LoadingScreen;

})(window);