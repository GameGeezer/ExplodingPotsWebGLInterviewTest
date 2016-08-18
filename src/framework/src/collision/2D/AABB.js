(function (window)
{
    'use strict';

    var AABB = function (x, y, width, height)
    {
        this.lower = vec2.create();

        vec2.set(this.lower, x, y);

        this.upper = vec2.create();

        vec2.set(this.upper, x + width, y + height);
    };

    AABB.prototype = {

        constructor : AABB,

        containsPoint : function (x, y)
        {
            return MathUtil.isWithinRange(x, this.lower.x, this.upper.x) && MathUtil.isWithinRange(y, this.lower.y, this.upper.y);
        },

        /**
         * This method does not ensure that the point is within the bounding box.
         * Call "containsPoint" as well if that needs to be the case.
         * @param halfRange
         * @param x
         */
        xWithRangeOfLeft : function (halfRange, x)
        {
            return MathUtil.isWithinRange(x, this.lower.x - halfRange, this.lower.x + halfRange);
        },

        /**
         * This method does not ensure that the point is within the bounding box.
         * Call "containsPoint" as well if that needs to be the case.
         * @param halfRange
         * @param x
         */
        xWithRangeOfRight : function (halfRange, x)
        {
            return MathUtil.isWithinRange(x, this.upper.x - halfRange, this.upper.x + halfRange);
        },

        /**
         * This method does not ensure that the point is within the bounding box.
         * Call "containsPoint" as well if that needs to be the case.
         * @param halfRange
         * @param y
         */
        yWithRangeOfTop : function (halfRange, y)
        {
            return MathUtil.isWithinRange(y, this.upper.y - halfRange, this.upper.y + halfRange);
        },

        /**
         * This method does not ensure that the point is within the bounding box.
         * Call "containsPoint" as well if that needs to be the case.
         * @param halfRange
         * @param y
         */
        yWithRangeOfBottom : function (halfRange, y)
        {
            return MathUtil.isWithinRange(y, this.upper.y - halfRange, this.upper.y + halfRange);
        }
    };

    window.AABB = AABB;

})(window);