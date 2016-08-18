(function (window)
{
    'use strict';

    var KeyboardCallback = function ()
    {
        this.listeners = [];
    };

    KeyboardCallback.prototype = {

        constructor : KeyboardCallback,

        onKeyDown : function (event)
        {
            var keyCode = event.keyCode;

            for(var listenerId in this.listeners)
            {
                this.listeners[listenerId].onKeyDown(keyCode)
            }
        },

        onKeyUp : function (event)
        {
            var keyCode = event.keyCode;

            for(var listenerId in this.listeners)
            {
                this.listeners[listenerId].onKeyUp(keyCode)
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

    window.KeyboardCallback = KeyboardCallback;

})(window);