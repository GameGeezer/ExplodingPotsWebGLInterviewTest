(function (window)
{
    'use strict';

    var Key = function ()
    {
        this.isPressed = false;
    };

    Key.prototype = {

        constructor : Key,

        press : function ()
        {
            this.isPressed = true;
        },

        release : function ()
        {
            this.isPressed = false;
        }
    };

    window.MouseButton = MouseButton;

    var KeyboardManager = function ()
    {

    };

    KeyboardManager.keyMap = [];

    //The mouse button standard values
    KeyboardManager.KEY_CODE_LEFT = 37;
    KeyboardManager.KEY_CODE_RIGHT = 39;
    KeyboardManager.KEY_CODE_UP = 38;
    KeyboardManager.KEY_CODE_DOWN = 40;
    KeyboardManager.KEY_CODE_W = 87;
    KeyboardManager.KEY_CODE_A = 65;
    KeyboardManager.KEY_CODE_S = 83;
    KeyboardManager.KEY_CODE_D = 68;
    KeyboardManager.KEY_CODE_Q = 81;
    KeyboardManager.KEY_CODE_E = 69;

    KeyboardManager.onKeyDown = function (event)
    {
        if (!KeyboardManager.keyMap.hasOwnProperty(event.keyCode))
        {
            KeyboardManager.keyMap[event.keyCode] = new Key();
        }

        KeyboardManager.keyMap[event.keyCode].press();
    };

    KeyboardManager.onKeyUp = function (event)
    {
        if (!KeyboardManager.keyMap.hasOwnProperty(event.keyCode))
        {
            KeyboardManager.keyMap[event.keyCode] = new Key();
        }

        KeyboardManager.keyMap[event.keyCode].release();
    };

    KeyboardManager.isKeyPressed = function (keyCode)
    {
        return KeyboardManager.keyMap[keyCode] != undefined && KeyboardManager.keyMap[keyCode].isPressed;
    };

    window.KeyboardManager = KeyboardManager;

})(window);