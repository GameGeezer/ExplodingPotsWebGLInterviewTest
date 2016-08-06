(function(window) {
    'use strict';

    var Camera = function() {

        this.view = mat4.create();

        this.projection = mat4.create();

        this.position = vec3.create();

        this.direction = [0, 0, 1];

        this.up = vec3.create();

        this.dummy = vec3.create();

        this.updateViewMatrix();
    };

    Camera.prototype = {

        constructor: Camera,

        moveForward: function(amount) {

            vec3.mul(this.dummy, this.direction, [amount, amount, amount]);

            vec3.add(this.position, this.position, this.dummy);

            this.updateViewMatrix();
        },
        moveUp: function(amount) {

            vec3.mul(this.dummy, [0, -1, 0], [amount, amount, amount]);

            vec3.add(this.position, this.position, this.dummy);

            this.updateViewMatrix();
        },
        moveDown: function(amount) {

            vec3.mul(this.dummy, [0, -1, 0], [amount, amount, amount]);

            vec3.sub(this.position, this.position, this.dummy);

            this.updateViewMatrix();
        },
        moveBackward: function(amount) {

            vec3.mul(this.dummy, this.direction, [amount, amount, amount]);

            vec3.sub(this.position, this.position, this.dummy);

            this.updateViewMatrix();
        },
        moveLeft: function(amount) {
            vec3.cross(this.dummy, this.direction, [0, 1, 0]);

            vec3.mul(this.dummy, this.dummy, [amount, amount, amount]);

            vec3.sub(this.position, this.position, this.dummy);

            this.updateViewMatrix();
        },
        moveRight: function(amount) {
            vec3.cross(this.dummy, this.direction, [0, 1, 0]);

            vec3.mul(this.dummy, this.dummy, [amount, amount, amount]);

            vec3.add(this.position, this.position, this.dummy);

            this.updateViewMatrix();
        },
        rotateLocalX: function(amount) {
            vec3.rotateX(this.direction, this.direction, [0, 1, 0], amount)
        },
        rotateLocalY: function(amount) {
            vec3.rotateY(this.direction, this.direction, [0, 1, 0], amount)
        },
        rotateLocalZ: function(amount) {
            vec3.rotateZ(this.direction, this.direction, [0, 1, 0], amount)
        },
        updateViewMatrix: function() {

            mat4.lookAt(this.view, this.direction, [0,0,0], [0,1,0]);
            mat4.translate(this.view, this.view, this.position);
        }
    };

    window.Camera = Camera;

})(window);