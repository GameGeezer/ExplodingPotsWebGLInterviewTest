(function (window)
{
    'use strict';

    function HitTest(t, hit, normal)
    {
        this.t = arguments.length ? t : Number.MAX_VALUE;
        this.hit = hit;
        this.normal = normal;
    }

    var CollisionSphere = function (center, radius)
    {

        this.center = center;
        this.radius = radius;
    };

    CollisionSphere.prototype = {

        constructor : CollisionSphere,

        intersectsRay : function (origin, direction)
        {

            var offset = vec3.create();
            vec3.subtract(offset, origin, this.center);
            var a = vec3.dot(direction, direction);
            var b = 2 * vec3.dot(direction, offset);
            var c = vec3.dot(offset, offset) - this.radius * this.radius;
            var discriminant = b * b - 4 * a * c;

            if (discriminant > 0)
            {
                var t = (-b - Math.sqrt(discriminant)) / (2 * a);
                var hit = vec3.create();
                var scalar = vec3.create();
                vec3.scale(scalar, direction, t)
                vec3.add(hit, origin, scalar);
                var hit2 = vec3.create();
                vec3.subtract(hit2, hit, this.center);
                vec3.scale(hit2, hit2, 1 / this.radius);
                return new HitTest(t, hit, hit2);
            }

            return null;
        },

    };

    window.HitTest = HitTest;
    window.CollisionSphere = CollisionSphere;

})(window);