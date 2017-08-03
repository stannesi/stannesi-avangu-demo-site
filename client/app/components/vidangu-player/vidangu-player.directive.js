'use strict';

/* Vidangu Player Directive */
app.directive("vianguPlayer", ["$timeout", "$VGU_STATES", function($timeout, $VGU_STATES) {
    
    return {    
        restrict: "EA",
        transclude: true,
        // replace: false,
        templateUrl: "app/components/vidangu-player/vidangu-player.view.html",
        controller: "VidanguPlayerCtrl",
        controllerAs: "$API",
        
        scope: {
            configUrl: "@",
            autoplay: "=?",
            source: "=?",
            loop: "=?",
            preload: "=?",
            mute: "=?",
            nativeControls: "=?",
            fullscreen: "=?",
            
            
            updateTime: "&",
            updateState: "&",
            updateVolume: "&",
            updatePlayback: "&",
            
            // callbacks
            onCanBePlay: "&",
            onPlayerReady: "&",
            
            onPlaying: "&",
            onPause: "&",
            onStop: "&",
            onComplete: "&",
            
            onPlaybackUpdate: "&",
            onVolumeChange: "&",
            
            onFullScreen: "&",
            onChangeSource: "&",
            
            onSeeking: "&",
            onSeeked: "&",
            onError: "&"
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
        link: {
            pre: function(scope, elem, attrs, $API) {
                var player = $API;

                scope.onChangeSource = function (newSource, oldSource) {

                    if ((newSource != oldSource) && newSource ) {
                        
                        if (player.state != $VGU_STATES.PLAY) {
                            player.state = $VGU_STATES.STOP;
                        }
                        
                        player.source = newSource;
                        scope.setSource(newSource);
                    }
                    
                    console.log(".::: EVENT ON Changing SOurce Source Set :::.", newSource);
                }                
                
                scope.setSource = function (source) {
                    var canplay = "";

                    if (source) {
                        if (player.videoElement.canPlayType) {
                            for (var i = 0, len = source.length; i < len; i++) {
                                canplay = player.videoElement.canPlayType(source[i].type);

                                if (canplay == "maybe" || canplay == "probably") {
                                    // set Video element source and type attribute 
                                    scope.setAttrText("src", source[i].src);
                                    scope.setAttrText("type", source[i].src);

                                    // trigger onChangeSource API callback in the controller
                                    scope.onChangeSource(source[i]);
                                    
                                    break;
                                }
                            }
                        }
                    }
                    
                    /*
                        $timeout(function() {
                            if (player.autoplay) {
                                player.play();
                            }
                        })
                    */
                    
                    if (canplay == "") { 
                        player.onError();
                    }
                    
                    console.log(".::: Video Source Set :::.", source);
                }
        
                // set video element boolean attributes
                scope.setAttrBool = function(attr, bool) {
                   player.videoElement[attr] = !!bool;
                }

                // set video element text attributes
                scope.setAttrText = function(attr, text) {
                   player.videoElement[attr] = text;
                }

                // cache the video element
                player.videoElement = elem.find("video")[0];
                // source
                player.source = scope.source;    
                // create listeners for callback 
                player.createListeners();
                // Initialize vidangu player
                player.ready();
                
                // watchers
                scope.$watch("source", scope.onChangeSource);
                
                scope.$watch(
                    function() {
                        return player.source;
                    },
                    scope.setSource
                )
                
                if (player.isConfig) {
                    scope.$watch(
                        function() {
                            return player.config;
                        },
                        function() {
                            if (player.config) {
                                scope.source = player.source;
                                scope.setAttrBool("autoplay", player.autoplay);
                                scope.setAttrBool("loop", player.loop);
                                scope.setAttrBool("muted", player.mute);
                                scope.setAttrBool("controls", player.nativeControls);
                            }
                        }
                    )
                } else {
                    scope.$watch("autoplay", scope.setAttrBool("autoplay", player.autoplay));
                    scope.$watch("loop", scope.setAttrBool("loop", player.loop));
                    scope.$watch("mute", scope.setAttrBool("muted", player.mute));
                    scope.$watch("nativeControls", scope.setAttrBool("controls", player.nativeControls));
                }
                
                console.log(".::: Vidangu Player directive DONE! :::.");
            }
        }
    }
}]);