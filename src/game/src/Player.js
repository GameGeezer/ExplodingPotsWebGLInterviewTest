(function(window) {
    'use strict';

    var Player = function() {

        this.camera = new Camera();
        this.lastMousePosition = vec2.create();
    };

    Player.prototype = {

        constructor: Player,

        update: function() {

            if (KeyboardManager.isKeyPressed(KeyboardManager.KEY_CODE_W))
                this.camera.moveForward(0.04);
            if (KeyboardManager.isKeyPressed(KeyboardManager.KEY_CODE_A))
                this.camera.moveLeft(0.04);
            if (KeyboardManager.isKeyPressed(KeyboardManager.KEY_CODE_S))
                this.camera.moveBackward(0.04);
            if (KeyboardManager.isKeyPressed(KeyboardManager.KEY_CODE_D))
                this.camera.moveRight(0.04);
            if (KeyboardManager.isKeyPressed(KeyboardManager.KEY_CODE_Q))
                this.camera.moveUp(0.04);
            if (KeyboardManager.isKeyPressed(KeyboardManager.KEY_CODE_E))
                this.camera.moveDown(0.04);

            if(MouseManager.leftButton.isPressed) {

              //  this.camera.rotateLocalX(0.01 * (this.lastMousePosition[1] - MouseManager.leftButton.pressedY));
                //this.lastMousePosition = [MouseManager.leftButton.pressedX, MouseManager.leftButton.pressedY];
            }
        },
        getView: function() {
            return this.camera.view;
        }
    };

    window.Player = Player;

})(window);