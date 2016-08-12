(function (window)
{
    'use strict';

    var Scene = function ()
    {
        this.meshFamilies = [];

        this.meshFamilyMembers = [];

        this.materials = [];

        this.boundFamily = undefined;
    };

    Scene.prototype = {

        constructor : Scene,
        
        render : function ()
        {
            for(var familyId in this.meshFamilies)
            {
                if(this.boundFamily !== familyId)
                {
                    this.meshFamilies[familyId].bind();

                    this.boundFamily = familyId;
                }

                var familyDividedByMaterial = this.meshFamilyMembers[familyId];

                for(var materialId in familyDividedByMaterial)
                {
                    for(var meshId in familyDividedByMaterial[materialId])
                    {
                        familyDividedByMaterial[materialId][meshId].render();
                    }
                }
            }
        },

        addSceneObject : function (sceneObject)
        {
            var meshFamilyId = sceneObject.mesh.family.uniqueId;

            if(!this.meshFamilyMembers.hasOwnProperty(meshFamilyId))
            {
                this.meshFamilies.push(sceneObject.mesh.family);

                this.meshFamilyMembers[meshFamilyId] = [];
            }

            var familyDividedByMaterial = this.meshFamilyMembers[meshFamilyId];

            var material = sceneObject.material;

            if(!familyDividedByMaterial.hasOwnProperty(material.uniqueId))
            {
                familyDividedByMaterial[material.uniqueId] = [];
            }

            familyDividedByMaterial[material.uniqueId].push(sceneObject);

            this.materials[material.uniqueId] = material;
        }
    };

    window.Scene = Scene;

})(window);