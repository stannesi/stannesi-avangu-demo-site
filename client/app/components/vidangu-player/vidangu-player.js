'use strict'
/*

(function($angular) {
    var app = $angular.module("vidangu", []);
});
*/

// CONSTANTS
app.constant("$VGU_STATES", {
    "PLAY": "play",
    "PAUSE": "pause",
    "STOP": "stop"
})
.constant("$VGU_VOLUME_KEY", "vidanguVolume")    
.constant("$VGU_EVENTS", {
    "LOAD": "load"
});

   /* video source
    $scope.source = [
        {
            "src": "assets/videos/demo-1.mp4",
            "type": "video/mp4"
        },{
            "src": "assets/videos/demo-1.webm",
            "type": "video/webm"
        },{
            "src": "assets/videos/demo-1.ogg",
            "type": "video/ogg"
        }
    ]
    
    // config
    /*
    $scope.config = {
        "controls": false,
        "loop": false,
        "autoplay": false,
        "preload": "auto",
        "mute": false,
        "theme": "",
        "source": [
            {
                "src": "assets/videos/demo-1.mp4",
                "type": "video/mp4"
            },{
                "src": "assets/videos/demo-1.webm",
                "type": "video/webm"
            },{
                "src": "assets/videos/demo-1.ogg",
                "type": "video/ogg"
            }
        ],
        
        "tracks": [
            {
                
            }
        ],
        
        "poster" : {
            "url": "assets/images/video-poster.jpg"
        },
        
        "plugins": {
            /*  -- plugins --
                controls
                playlist
                fullscreen
                poster
                ads
                analytics
                cuepoints
            *//*
        }
    }*/
/*  -- plugins --
    controls
    playlist
    fullscreen
    poster
    ads
    analytics
    cuepoints
*/