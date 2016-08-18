(function(window) {
    'use strict';

    var PointLight = function(sphereMesh) {

        Light.apply(this);
    };

    PointLight.prototype = Object.create(Light.prototype);

    PointLight.prototype.constructor = PointLight;

    window.PointLight = PointLight;

})(window);

