(function(window) {

    var FileUtil = function( ) {

    };

    FileUtil.loadTextFromId = function(id)
    {
        var shaderScript = document.getElementById(id);
        
        if (!shaderScript)
        {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while(k)
        {
            if (k.nodeType == 3)
            {
                str += k.textContent;
            }
                
            k = k.nextSibling;
        }

        return str;
    };

    window.FileUtil = FileUtil;
    
})(window);