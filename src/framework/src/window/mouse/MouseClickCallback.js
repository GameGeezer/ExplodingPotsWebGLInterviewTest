(function (window)
{
    'use strict';

    var MouseClickCallback = function ()
    {
        this.listeners = [];
    };

    MouseClickCallback.prototype = {

        constructor : MouseClickCallback,

        onMouseDown : function (event)
        {
            var button = event.button;

            var screenX = event.originalEvent.touches[0].screenX;

            var screenY = event.originalEvent.touches[0].screenY;

            for(var listener in this.listeners)
            {
                listener.onMouseDown(button, screenX, screenY)
            }
        },

        onMouseUp : function (event)
        {
            var button = event.button;

            var screenX = event.originalEvent.touches[0].screenX;

            var screenY = event.originalEvent.touches[0].screenY;

            for(var listener in this.listeners)
            {
                listener.onMouseUp(button, screenX, screenY)
            }
        },

        addListener : function (listener)
        {
            this.listeners.push(listener);
        },

        removeListener : function (listener)
        {
            var index = this.listeners.indexOf(listener);

            if (index > -1)
            {
                this.listeners.splice(index, 1);
            }
        },

        clearListeners : function ()
        {
            this.listeners.clear();
        }
    };

    window.MouseClickCallback = MouseClickCallback;

})(window);