'use strict'

/*
* Vidangu Player Service
*/

/* Loading config service */
app.service("$VguConfigService", ["$http", "$q", "$sce", function ($http, $q, $sce) {
    
    this.load = function (url) {
        var deferred = $q.defer();
        
        $http({
            method: "GET",
            url: url
        }).success(function(response) {
            console.log (".::: config loaded successfully :::.", response);
            var result = response;
                
            for (var i = 0, l = result.source.length; i < l; i++) {
                result.source[i].src = $sce.trustAsResourceUrl(result.source[i].src);
            }

            deferred.resolve(result);
            
        }).error(function() {
            deferred.reject(".::: Error:: config loading :::."); 
            console.log (".::: config loading failed :::.");
        })
        
        return deferred.promise;
    }
}])

/* native fullscreen service */
.service("$VguFullscreen", [function () {
    
    var element, browser = null,
        browsers = {
            w: {
                enabled: "fullscreenEnabled",
                element: "fullscreenElement",
                request: "requestFullscreen",
                exit: "exitFullscreen",
                onchange: "fullscreenchange",
                onerror: "fullscreenerror"
            },
           webkit: {
                enabled: "webkitFullscreenEnabled",
                element: "webkitFullscreenElement",
                request: "webkitRequestFullscreen",
                exit: "webkitExitFullscreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            },
           oldWebkit: {
                enabled: "webkitIsFullScreen",
                element: "webkitCurrentFullScreenElement",
                request: "webkitRequestFullScreen",
                exit: "webkitCancelFullScreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            },
            moz: {
                enabled: "mozFullScreen",
                element: "mozFullScreenElement",
                request: "mozRequestFullScreen",
                exit: "mozCancelFullScreen",
                onchange: "mozfullscreenchange",
                onerror: "mozfullscreenerror"
            },
            ms: {
                enabled: "msFullscreenEnabled",
                element: "msFullscreenElement",
                request: "msRequestFullscreen",
                exit: "msExitFullscreen",
                onchange: "MSFullscreenChange",
                onerror: "MSFullscreenError"
            },
            ios: {
                enabled: "webkitFullscreenEnabled",
                element: "webkitFullscreenElement",
                request: "webkitEnterFullscreen",
                exit: "webkitExitFullscreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            }
        }

    function getBrowsers() {
       for (var key in browsers) {
           if (browsers[key].enabled in document) {
               browser = browsers[key];
               break;
           }
        }
        
        console.log(".::: FULLSCREEN:::: Check broswers :::.", browser);
    }
    
    // get browser [webkit, moz, ms, ios]
    getBrowsers();

    this.isAvailable = function() {
        return !!(browser);
        
        console.log(".::: FULLSCREEN:::: is available :::.", browser);
    }
    
    if (browser) {
        this.isFullscreen = function() {
            return !!(document[browser.element] != null || document.webkitIsFullScreen);
            
            console.log(".::: FULLSCREEN:::: is in fullscreen :::.", browser);
        }
        
        this.requestFullscreen = function(elem) {
            element = elem;
            element[browser.request]();
            
            console.log(".::: FULLSCREEN:::: REQUEST fullscreen :::.", browser);
        }

        this.exitFullscreen = function() {
            document[browser.exit]();
            
            console.log(".::: FULLSCREEN:::: EXIT fullscreen :::.", browser);
        }
    }
}]);