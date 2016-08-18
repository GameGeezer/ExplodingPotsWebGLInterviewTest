(function (window)
{
    'use strict';

    var MouseClickCallback = function ()
    {
        this.listeners = [];
    };

    MouseClickCallback.prototype = {

        constructor : MouseClickCallback,

        onMouseMove : function (event)
        {

        },

        addListener : function (listener)
        {

        },

        removeListener : function (listener)
        {

        },

        clearListeners : function ()
        {

        }
    };

    window.MouseClickCallback = MouseClickCallback;

})(window);