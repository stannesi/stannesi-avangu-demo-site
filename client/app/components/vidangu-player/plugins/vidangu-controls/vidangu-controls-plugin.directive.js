'use strict'

/* Vidangu Controls Plugin  */
app.directive("vidanguControls", [function() {
    
    return {    
        restrict: "E",
        require: "^vidanguPlayer",
        templateUrl: "app/components/vidangu-player/plugins/vidangu-controls/vidangu-controls-plugin.view.html",
        
        scope: {
            autohide: "=?",
            autoHideTime: "=?"
        },

       /**
         * angular directive link method
         *
         * @method link
         * @param {object} scope
         * @param {object} elem
         * @param {object} attrs
         * @param {object} $API
         * @return {void}
         */
        link:  {
            pre: function(scope, elem, attrs, $API) {
                // cache the video element
                console.log(".::: Vidangu Poster Plugins directive DONE! :::.");
            }
        }
    }
}]);
