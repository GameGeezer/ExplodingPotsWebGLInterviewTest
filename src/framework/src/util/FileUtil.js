(function (window)
{

    var FileUtil = function ()
    {

    };

    FileUtil.loadTextFromId = function (id)
    {
        var shaderScript = document.getElementById(id);

        if (!shaderScript)
        {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k)
        {
            if (k.nodeType == 3)
            {
                str += k.textContent;
            }

            k = k.nextSibling;
        }

        return str;
    };

    FileUtil.loadTextFromUrl = function (nameAndURLs, completionCallback)
    {
        var semaphore = Object.keys(nameAndURLs).length;

        var textFile = {};

        for (var url in nameAndURLs)
        {
            $.get(nameAndURLs[url], (function (name)
            {
                return function (data, status)
                {
                    if (status === "success")
                    {
                        textFile[name] = data;
                    }
                    else
                    {
                        //  error = true;
                        //   console.error('An error has occurred and the mesh "' +
                        //       name + '" could not be downloaded.');
                    }

                    // the request has finished, decrement the counter
                    semaphore--;

                    if (semaphore === 0)
                    {
                        if (false)
                        { // error
                            // if an error has occurred, the user is notified here and the
                            // callback is not called
                            console.error('An error has occurred and one or meshes has not been ' +
                                'downloaded. The execution of the script has terminated.');
                            throw '';
                        }
                        // there haven't been any errors in retrieving the meshes
                        // call the callback
                        completionCallback(textFile);
                    }
                }
            })(url));
        }
    };

    window.FileUtil = FileUtil;

})(window);