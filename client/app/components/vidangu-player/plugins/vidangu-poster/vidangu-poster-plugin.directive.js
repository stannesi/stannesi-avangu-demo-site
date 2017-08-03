'use strict'

/* Vidangu Controls Plugin  */
app.directive("vidanguPoster", [function() {
    
    return {
        restrict: "E",
        require: "^vidanguPlayer",
        templateUrl: "app/components/vidangu-player/plugins/vidangu-poster/vidangu-poster-plugin.view.html",
        
        scope: {
            url: "=?"
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
        link: function(scope, elem, attrs, $API) {
            var player = $API;
            
            // set video element boolean attributes
            scope.setPoster = function(value) {
               player.videoElement.poster = value;
            }

            
            if (player.isConfig) {
                
            }
            
            console.log(".::: Vidangu Poster Plugins directive DONE! :::.");
        }
    }
}]);
