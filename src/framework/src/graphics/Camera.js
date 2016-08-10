(function(window) {
    'use strict';

    var Camera = function()
    {
        this.view = mat4.create();

        this.projection = mat4.create();

        this.position = vec3.create();

        this.direction = [0, 0, 1];

        this.up = vec3.create();

        this.dummyVec3 = vec3.create();

        updateViewMatrix(this);
    };

    Camera.prototype = {

        constructor: Camera,

        /**
         *
         * @param amount
         */
        moveForward: function(amount)
        {
            vec3.mul(this.dummyVec3, this.direction, [amount, amount, amount]);

            vec3.add(this.position, this.position, this.dummyVec3);

            updateViewMatrix(this);
        },

        /**
         *
         * @param amount
         */
        moveUp: function(amount)
        {
            vec3.mul(this.dummyVec3, [0, -1, 0], [amount, amount, amount]);

            vec3.add(this.position, this.position, this.dummyVec3);

            updateViewMatrix(this);
        },

        /**
         *
         * @param amount
         */
        moveDown: function(amount)
        {
            vec3.mul(this.dummyVec3, [0, -1, 0], [amount, amount, amount]);

            vec3.sub(this.position, this.position, this.dummyVec3);

            updateViewMatrix(this);
        },

        /**
         *
         * @param amount
         */
        moveBackward: function(amount)
        {
            vec3.mul(this.dummyVec3, this.direction, [amount, amount, amount]);

            vec3.sub(this.position, this.position, this.dummyVec3);

            updateViewMatrix(this);
        },

        /**
         *
         * @param amount
         */
        moveLeft: function(amount)
        {
            vec3.cross(this.dummyVec3, this.direction, [0, 1, 0]);

            vec3.mul(this.dummyVec3, this.dummyVec3, [amount, amount, amount]);

            vec3.sub(this.position, this.position, this.dummyVec3);

            updateViewMatrix(this);
        },

        /**
         *
         * @param amount
         */
        moveRight: function(amount)
        {
            vec3.cross(this.dummyVec3, this.direction, [0, 1, 0]);

            vec3.mul(this.dummyVec3, this.dummyVec3, [amount, amount, amount]);

            vec3.add(this.position, this.position, this.dummyVec3);

            updateViewMatrix(this);
        },

        /**
         *
         * @param amount
         */
        rotateLocalX: function(amount)
        {
            vec3.rotateX(this.direction, this.direction, [0, 1, 0], amount)
        },

        /**
         *
         * @param amount
         */
        rotateLocalY: function(amount)
        {
            vec3.rotateY(this.direction, this.direction, [0, 1, 0], amount)
        },

        /**
         *
         * @param amount
         */
        rotateLocalZ: function(amount) {
            vec3.rotateZ(this.direction, this.direction, [0, 1, 0], amount)
        }
    };

    /**
     *
     * @param camera
     */
    function updateViewMatrix(camera) {

        mat4.lookAt(camera.view, camera.direction, [0,0,0], [0,1,0]);
        mat4.translate(camera.view, camera.view, camera.position);
    }

    window.Camera = Camera;

})(window);