(function (window)
{
    'use strict';

    var Window = function (x, y, width, height, clickMargin)
    {
        this.aabb = new AABB(x, y, width, height)

        this.clickMargin = clickMargin;
    };

    Window.prototype = {

        constructor : Window,

        resize : function ()
        {

        },

        close : function ()
        {

        },

        onMousePressed : function(x, y)
        {
            //  Exit early if the click event doesn't take place within the bounding box
            if(!this.aabb.containsPoint(x, y))
            {
                return;
            }


            //  Does the click event intersect with either vertical boundary
            if(this.aabb.xWithRangeOfLeft(this.clickMargin, x))
            {

            }
            else if(this.aabb.xWithRangeOfRight(this.clickMargin, x))
            {

            }

            //  Does the click event intersect with either horizontal boundary
            if(this.aabb.yWithRangeOfBottom(this.clickMargin, y))
            {

            }
            else if(this.aabb.yWithRangeOfTop(this.clickMargin, y))
            {

            }
        },

        onMouseReleased : function()
        {
            
        }
    };

    window.Window = Window;

})(window);