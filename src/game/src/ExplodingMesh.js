(function(window) {
    'use strict';

    var ExplodingMesh = function(contextGl, coveringMesh, renderMesh) {

        this.position = vec3.create();
        this.contextGL = contextGl;
        this.renderMesh = renderMesh;
        renderMesh.setScale(0.02, 0.02, 0.02);
        this.particleData = [];
        this.vertices = coveringMesh.mesh.vertices;
        for(var i = 0; i < this.vertices.length; i+=3) {
            this.particleData.push([this.vertices[i] * 0.01, this.vertices[i + 1] * 0.01, this.vertices[i + 2] * 0.01, 0, 0, 0])
        }
    };

    ExplodingMesh.prototype = {

        constructor: ExplodingMesh,

        render: function() {
            this.renderMesh.bind(this.contextGL);
            for(var i = 0; i < this.particleData.length; ++i) {
                this.renderParticle(i);
            }
        },
        update: function() {
            for(var i = 0; i < this.particleData.length; ++i) {
                this.updateParticle(i);
            }
        },
        reset: function() {
            for(var i = 0; i < this.particleData.length; ++i) {
                this.particleData[i] = [this.vertices[i] * 0.01, this.vertices[i + 1] * 0.01, this.vertices[i + 2] * 0.01, 0, 0, 0];
            }
        },
        expand: function() {
            for(var i = 0; i < this.particleData.length; ++i) {
                this.expandParticle(i);
            }
        },
        explode: function() {
            for(var i = 0; i < this.particleData.length; ++i) {
                this.particleData[i][3] = 0.04 * (Math.random() * 2 - 1);
                this.particleData[i][4] = 0.04 * (Math.random() * 2 - 1);
                this.particleData[i][5] = 0.04 * (Math.random() * 2 - 1);
            }
        },
        updateParticle: function(offset) {
            this.particleData[offset][0] += this.particleData[offset][3];
            this.particleData[offset][1] += this.particleData[offset][4];
            this.particleData[offset][2] += this.particleData[offset][5];
        },
        expandParticle: function(offset) {
            var sign = this.particleData[offset][3] && this.particleData[offset][3] / Math.abs(this.particleData[offset][3]);
            this.particleData[offset][3] -= 0.0001 * sign;
            sign = this.particleData[offset][4] && this.particleData[offset][4] / Math.abs(this.particleData[offset][4]);
            this.particleData[offset][4] -= (0.0001 * sign) + 0.005;
            sign = this.particleData[offset][5] && this.particleData[offset][5] / Math.abs(this.particleData[offset][5]);
            this.particleData[offset][5] -= 0.0001 * sign;
        },
        renderParticle: function(offset) {
            this.renderMesh.setTranslation(this.particleData[offset][0] + this.position[0], this.particleData[offset][1] + this.position[1], this.particleData[offset][2] + this.position[2]);
            this.renderMesh.render(this.contextGL);
        },
        translate: function(x, y, z) {
            vec3.add(this.position, this.position, [x, y, z]);
        },
        setTranslation: function(x, y, z) {
            this.position = [x, y, z];
        }
    };

    window.ExplodingMesh = ExplodingMesh;

})(window);