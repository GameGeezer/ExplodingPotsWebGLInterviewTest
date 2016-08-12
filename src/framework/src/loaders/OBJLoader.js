(function (window)
{
    'use strict';

    var OBJLoader = function ()
    {

    };

    OBJLoader.regexp = {
        // v float float float
        vertex_pattern : /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // vn float float float
        normal_pattern : /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // vt float float
        uv_pattern : /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // f vertex vertex vertex
        face_vertex : /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
        // f vertex/uv vertex/uv vertex/uv
        face_vertex_uv : /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
        // f vertex/uv/normal vertex/uv/normal vertex/uv/normal
        face_vertex_uv_normal : /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
        // f vertex//normal vertex//normal vertex//normal
        face_vertex_normal : /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
        // o object_name | g group_name
        object_pattern : /^[og]\s*(.+)?/,
        // s boolean
        smoothing_pattern : /^s\s+(\d+|on|off)/,
        // mtllib file_reference
        material_library_pattern : /^mtllib /,
        // usemtl material_name
        material_use_pattern : /^usemtl /
    };

    OBJLoader.prototype = {

        constructor : OBJLoader,

        load : function (objText, outVertices, outNormals, outTexCoords)
        {
            //  Windows uses '\r\n' as a carriage return, replace with '\n' to make parsing easier
            objText.replace('\r\n', '\n');

            //  Split the file into an array of lines
            var lines = text.split('\n');

            //  TODO trim left

            var line = undefined, lineFirstTwoChars = undefined, result = [];

            for (var i = 0; i < lines.length; ++i)
            {
                line = lines[i];

                if (line.length === 0)
                {
                    continue;
                }

                lineFirstTwoChars = line.substr(0, 2);

                switch (lineFirstTwoChars)
                {
                    case '# ':

                        continue;

                    case 'v ':

                        addVertex(result, line, outVertices);

                        break;

                    case 'vn':

                        addNormal(result, line, outNormals);

                        break;

                    case 'vt':

                        addTexCoords(result, line, outTexCoords);

                        break;

                    case 'f ':
                        break;
                }
            }
        },

        loadInterleaved : function ()
        {

        }
    };

    var addVertex = function (result, line, outVertices)
    {
        if ((result = this.regexp.vertex_pattern.exec(line)) === null)
        {
            return;
        }

        outVertices.push(
            parseFloat(result[1]),
            parseFloat(result[2]),
            parseFloat(result[3])
        );
    };

    var addNormal = function (result, line, outNormals)
    {
        if ((result = this.regexp.normal_pattern.exec(line)) === null)
        {
            return;
        }

        outNormals.push(
            parseFloat(result[1]),
            parseFloat(result[2]),
            parseFloat(result[3])
        );
    };

    var addTexCoords = function (result, line, outTexCoords)
    {
        if ((result = this.regexp.uv_pattern.exec(line)) === null)
        {
            return;
        }

        outTexCoords.push(
            parseFloat(result[1]),
            parseFloat(result[2])
        );
    };

    var addFace = function (result, line)
    {
        if ((result = this.regexp.face_vertex_uv_normal.exec(line)) !== null)
        {

        }
        else if ((result = this.regexp.face_vertex_uv.exec(line)) !== null)
        {

        }
        else if ((result = this.regexp.face_vertex_normal.exec(line)) !== null)
        {

        }
        else if ((result = this.regexp.face_vertex.exec(line)) !== null)
        {

        }
    };

    window.OBJLoader = OBJLoader;

})(window);
