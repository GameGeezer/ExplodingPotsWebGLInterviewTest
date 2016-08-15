(function (window)
{
    var Renderer = function (gl, squareMesh, toScreenShader)
    {
        this.gl = gl;


        this.toScreenShader = toScreenShader;
        
        this.fbo = new FBO(this.gl, 1024, 1024);
        this.rbo = new RBO(this.gl, 1024, 1024);

        this.colorTexture = new Texture2D(this.gl);
        this.colorTexture.initializeFromDimensions(this.gl.RGBA, this.gl.UNSIGNED_BYTE, 1024, 1024);

        this.normalTexture = new Texture2D(this.gl);
        this.normalTexture.initializeFromDimensions(this.gl.RGBA, this.gl.UNSIGNED_BYTE, 1024, 1024);

        var textureArray = [this.colorTexture, this.normalTexture];

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.normalTexture.bind();
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.colorTexture.bind();
        this.rbo.bind();
        this.fbo.bind();

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, textureArray[0].handle, 0);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT1, this.gl.TEXTURE_2D, textureArray[1].handle, 0);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.rbo.handle);

        window.drawBuffersExt.drawBuffersWEBGL([
            window.drawBuffersExt.COLOR_ATTACHMENT0_WEBGL,
            window.drawBuffersExt.COLOR_ATTACHMENT1_WEBGL
        ]);

        this.normalTexture.unbind();
        this.colorTexture.unbind();
        this.rbo.unbind();
        this.fbo.unbind();

        this.deferredMaterial = new Material(this.gl, this.toScreenShader, this.colorTexture, "uModelMatrix", "uProjectionMatrix", "uViewMatrix", "uSampler");

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
            this.fbo.bind();
            this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);


            scene.render(view, projection);


            this.fbo.unbind();



            this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            this.deferredMaterial.use(this.defferedViewMatrix, this.defferedProjectionMatrix);
        //    this.gl.activeTexture(this.gl.TEXTURE1);
            this.quadObject.render();

            this.deferredMaterial.unbind()
        }
    };

    window.Renderer = Renderer;

})(window);