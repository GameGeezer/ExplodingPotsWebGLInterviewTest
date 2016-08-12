(function (window)
{
    'use strict';

    var Game = function (screen, id)
    {
        this.screenMap = [];

        this.created = false;

        this.addScreen(screen, id);

        this.currentScreen = screen;
    };

    Game.prototype = {

        constructor : Game,

        create : function ()
        {
            this.currentScreen .onCreate();

            this.currentScreen.created = true;

            this.created = true;

            this.currentScreen.onResume();
        },
        
        update : function (delta)
        {
            this.currentScreen.onUpdate(delta);
        },
        
        render : function (delta)
        {
            this.currentScreen.onRender(delta);
        },
        
        addScreen : function (screen, screenID)
        {
            screen.game = this;

            if (this.created)
            {
                screen.onCreate();
            }

            this.screenMap[screenID] = screen;
        },
        
        changeScreens : function (screenID)
        {
            if (!this.screenMap.hasOwnProperty(screenID))
            {
                throw new UndefinedReferenceException(screenID);
            }

            if(!this.screenMap[screenID].created)
            {
                this.screenMap[screenID].onCreate();

                this.screenMap[screenID].created = true;
            }

            this.currentScreen.onLeave();
            this.currentScreen = this.screenMap[screenID];
            this.currentScreen.onResume();
        }
    };

    window.Game = Game;

})(window);