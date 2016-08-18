(function (window)
{
    var Renderer = function (gl, squareMesh, toScreenShader)
    {
        this.gl = gl;


        this.toScreenShader = toScreenShader;
        
        this.fbo = new FBO(this.gl, 900, 800);
        this.rbo = new RBO(this.gl, 900, 800);

        this.colorTexture = new Texture2D(this.gl);
        this.colorTexture.initializeFromDimensions(this.gl.RGBA, this.gl.UNSIGNED_BYTE, 900, 800);

        this.normalTexture = new Texture2D(this.gl);
        this.normalTexture.initializeFromDimensions(this.gl.RGBA, this.gl.UNSIGNED_BYTE, 900, 800);

        this.depthTexture = new Texture2D(this.gl);
        this.depthTexture.initializeFromDimensions(this.gl.RGBA, this.gl.UNSIGNED_BYTE, 900, 800);

        var textureArray = [this.colorTexture, this.normalTexture];


        this.colorTexture.bind();
        this.normalTexture.bind();

        this.rbo.bind();
        this.fbo.bind();

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, window.drawBuffersExt.COLOR_ATTACHMENT0_WEBGL, this.gl.TEXTURE_2D, textureArray[0].handle, 0);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, window.drawBuffersExt.COLOR_ATTACHMENT1_WEBGL, this.gl.TEXTURE_2D, textureArray[1].handle, 0);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, window.drawBuffersExt.COLOR_ATTACHMENT2_WEBGL, this.gl.TEXTURE_2D, this.depthTexture.handle, 0);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.rbo.handle);

        window.drawBuffersExt.drawBuffersWEBGL([
            window.drawBuffersExt.COLOR_ATTACHMENT0_WEBGL,
            window.drawBuffersExt.COLOR_ATTACHMENT1_WEBGL,
            window.drawBuffersExt.COLOR_ATTACHMENT2_WEBGL
        ]);

        this.normalTexture.unbind();
        this.colorTexture.unbind();
        this.rbo.unbind();
        this.fbo.unbind();

        this.deferredMaterial = new Material(this.gl, this.toScreenShader, "uModelMatrix", "uProjectionMatrix", "uViewMatrix", "uSampler", "uNormalMatrix");

        this.deferredMaterial.addTexture(this.colorTexture);

        this.deferredMaterial.addTexture(this.depthTexture);

        this.deferredMaterial.addTexture(this.normalTexture);

        this.quadObject = new SceneObject(this.gl, squareMesh, this.deferredMaterial);

        this.defferedViewMatrix = mat4.create();
        mat4.identity(this.defferedViewMatrix);

        this.defferedProjectionMatrix = mat4.create();
        mat4.ortho(this.defferedProjectionMatrix, -1, 1, -1, 1, 0, 10);
    };

    Renderer.prototype = {

        constructor : Renderer,

        render : function (scene, view, projection)
        {
            
            //  Geometry pass
            this.fbo.bind();

            this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            
            scene.render(view, projection);

            this.fbo.unbind();


            //  LightPass
            this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            this.deferredMaterial.use(this.defferedViewMatrix, this.defferedProjectionMatrix);

            this.quadObject.render();

            this.deferredMaterial.unbind()
        }
    };

    var geometryPass = function()
    {

    };

    window.Renderer = Renderer;

})(window);