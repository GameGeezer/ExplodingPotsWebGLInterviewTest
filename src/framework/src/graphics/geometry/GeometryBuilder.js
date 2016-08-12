(function (window)
{
    'use strict';

    /**
     *
     * @constructor
     */
    var GeometryBuilder = function ()
    {
        this.reset();
    };

    GeometryBuilder.prototype = {

        constructor : GeometryBuilder,

        build : function ()
        {
            //  If there are no components then there is no geometry
            if (this.componentIds.length === 0)
            {
                return [];
            }

            //  If the mesh is valid 'numberOfElementsInComponent' should be identical for each component.
            //  Call 'validate' to make sure that this is the case.
            var numberOfElementsInComponent = this.componentElementMap[0].length / this.componentSizeMap[0];

            //  Stores the offset traveled into the component
            var offsetsIntoComponents = [];

            for (var id in this.componentIds)
            {
                offsetsIntoComponents[id] = 0;
            }

            //  The component data will be interleaved and stored in this array
            var geometry = new Geometry();

            //  For each element
            for (var i = 0; i < numberOfElementsInComponent; ++i)
            {
                //  Loop through each component
                for (var id in this.componentIds)
                {
                    //  And add the individual elements to the array (which will be float values)
                    for (var j = 0; j < this.componentSizeMap[id]; ++j)
                    {
                        geometry.addVertexData(this.componentElementMap[id][offsetsIntoComponents[id] + j]);
                    }

                    //  Increment the offset traveled into the component by its size
                    offsetsIntoComponents[id] += this.componentSizeMap[id];
                }
            }

            geometry.indices = this.indices;

            return geometry;
        },

        validate : function ()
        {
            var elementsToExpect = undefined;

            for (var id in this.componentIds)
            {
                //  If a component's count is not divisible by the element's size
                //  then the mesh is invalid
                if (this.componentElementMap[id].length % this.componentSizeMap[id] != 0)
                {
                    return false;
                }

                var numberOfElementsInComponent = this.componentElementMap[id].length / this.componentSizeMap[id];

                //  The first time passing through this loop elementsToExpect will be undefined
                //  and it only needs to be set once.
                if (elementsToExpect === undefined)
                {
                    elementsToExpect = numberOfElementsInComponent;

                    continue;
                }

                //  If two components do not contain the same number of elements then the mesh is invalid
                if (elementsToExpect !== numberOfElementsInComponent)
                {
                    return false;
                }
            }

            return true;
        },

        createComponent : function (componentId, size)
        {
            //  Store the component id
            this.componentIds.push(componentId);

            //  Store the sie of the component's individual elements
            this.componentSizeMap[componentId] = size;

            //  The component data consists of a list of floats
            this.componentElementMap[componentId] = [];
        },

        setDataAtComponent : function (componentId, data)
        {
            this.componentElementMap[componentId] = data;
        },

        setIndices : function (indices)
        {
            this.indices = indices;
        },

        reset : function ()
        {
            this.componentIds = [];

            this.componentSizeMap = [];

            this.componentElementMap = [];

            this.indices = [];
        }
    };

    window.GeometryBuilder = GeometryBuilder;

})(window);