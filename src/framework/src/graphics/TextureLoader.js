(function (window)
{
    'use strict';

    var TextureLoader = function ()
    {

    };

    TextureLoader.loadFromURL = function (gl, format, dataType, urlLocation, callback)
    {
        var texture = new Texture2D(gl);

        var image = new Image();

        image.onload = function ()
        {
            onImageLoaded(image, texture, format, dataType, callback);
        }

        image.src = urlLocation;
    };

    function onImageLoaded(image, texture, format, dataType, callback)
    {
        texture.initializeFromImage(format, dataType, image)

        callback(texture);
    }

    window.TextureLoader = TextureLoader;

})(window);