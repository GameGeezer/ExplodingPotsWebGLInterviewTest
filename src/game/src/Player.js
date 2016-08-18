(function(window) {
    'use strict';

    var Player = function() {

        this.camera = new Camera();
        this.lastMousePosition = vec2.create();
    };

    Player.prototype = {

        constructor: Player,

        update: function() {

            if (this.wPresed)
                this.camera.moveForward(0.04);
            if (this.aPresed)
                this.camera.moveLeft(0.04);
            if (this.sPresed)
                this.camera.moveBackward(0.04);
            if (this.dPresed)
                this.camera.moveRight(0.04);
            if (this.qPresed)
                this.camera.moveUp(0.04);
            if (this.ePresed)
                this.camera.moveDown(0.04);

            if(MouseManager.leftButton.isPressed) {

              //  this.camera.rotateLocalX(0.01 * (this.lastMousePosition[1] - MouseManager.leftButton.pressedY));
                //this.lastMousePosition = [MouseManager.leftButton.pressedX, MouseManager.leftButton.pressedY];
            }
        },

        onKeyDown : function(keyCode)
        {
            if (keyCode == Keyboard.KEY_CODE_W)
                this.wPresed = true;
            if (keyCode == Keyboard.KEY_CODE_A)
                this.aPresed = true;
            if (keyCode == Keyboard.KEY_CODE_S)
                this.sPresed = true;
            if (keyCode == Keyboard.KEY_CODE_D)
                this.dPresed = true;
            if (keyCode == Keyboard.KEY_CODE_Q)
                this.qPresed = true;
            if (keyCode == Keyboard.KEY_CODE_E)
                this.ePresed = true;
        },

        onKeyUp : function(keyCode)
        {
            if (keyCode == Keyboard.KEY_CODE_W)
                this.wPresed = false;
            if (keyCode == Keyboard.KEY_CODE_A)
                this.aPresed = false;
            if (keyCode == Keyboard.KEY_CODE_S)
                this.sPresed = false;
            if (keyCode == Keyboard.KEY_CODE_D)
                this.dPresed = false;
            if (keyCode == Keyboard.KEY_CODE_Q)
                this.qPresed = false;
            if (keyCode == Keyboard.KEY_CODE_E)
                this.ePresed = false;
        },

        getView: function() {
            return this.camera.view;
        }
    };

    window.Player = Player;

})(window);