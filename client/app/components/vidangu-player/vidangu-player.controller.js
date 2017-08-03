'use strict';

/*
* vidangu player controller
*/
app.controller("VidanguPlayerCtrl", ["$scope", "$window", "$VguConfigService", "$VguFullscreen", "$VGU_STATES", function ($scope, $window, $VguConfigService, $VguFullscreen, $VGU_STATES) {

   /**
     * public video element
     *
     * @method link
     * @type {object}
     * @default null
     */
    this.videoElement = null;
     
    /**
     * play video
     *
     * @method play
     * @return {void}
     */
    this.play = function() {
        var player = this;
        
        player.videoElement.play();
        player.setState($VGU_STATES.PLAY);
        player.isPaused = false;
        player.isPlaying = true
    }

    /**
     * pause video
     *
     * @method pause
     * @return {void}
     */
    this.pause = function() {
        var player = this;
        
        player.videoElement.pause();
        player.setState($VGU_STATES.PAUSE);
        player.isPaused = true;
        player.isPlaying = false;
    }

    /**
     * toggle video between play and pause
     *
     * @method playPause
     * @return {void}
     */
   this.playPause = function() {
       var player = this;
       
       if (player.videoElement.paused) {
           player.play();
       } else {
           player.pause(); 
       }
    }

    /**
     * stop video
     *
     * @method stop
     * @return {void}
     */
    this.stop = function() {
        var player = this;
        
        try {
            player.videoElement.pause();
            player.videoElement.currentTime = 0;
            player.currentTime = 0;
            player.buffered = [];
            player.setState($VGU_STATES.STOP);
            player.isPaused = true;
            player.isPlaying = false;
        } catch (e) {
            return e;
        }
    }

    /**
     * restart video
     *
     * @method restart
     * @return {void}
     */
    this.restart = function() {
        var player = this;
        
        player.setTime(0);
    }

    /**
     * skip video
     *
     * @method skip
     * @param {int} value
     * @return {void}
     */
    this.skip = function(value) {
        var player = this;
        
        player.setTime(value);
    }
    
    /**
     * mute
     *
     * @method mute
     * @return {void}
     */
    this.mute = function() {
        var player = this;
        
        player.videoElement.muted = true;
        player.mute = true;
    }

    /**
     * unmute
     *
     * @method unmute
     * @return {void}
     */
    this.unmute = function() {
        var player = this;
        
        player.videoElement.muted = false;
        player.mute = false;
    }
    
   /**
     * toggle mute
     *
     * @method togglemute
     * @return {void}
     */
   this.toogleMute = function() {
       var player = this;
       
       if (player.videoElement.muted) {
            player.mute(); 
       } else {
           player.unmute();
       }
    }

   /**
     * clear video source
     *
     * @method clearVideo
     * @return {void}
     */
    this.clearSource = function () {
        var player = this;
        
        player.videoElement.src = "";
    };
    
    /**
     * set video source
     *
     * @method setSource
     * @param {object} value
     * @return {void}
     *//*
    this.onChangeSource = function(source) {
        $scope.onChangeSource({$source: source});
        
       // $scope.setSource(source);
        console.log(".::: setting Source :::.", source);
    }
    */

    
    /**
     * Set player state - play, pause or stop
     *
     * @method setState
     * @param {string} value
     * @return {void}
     */
    this.setState = function(value) {
        var player = this;
        
        if (value && value != player.state ) {
            player.state = value;
        }
    }

    /**
     * set time (0 - 1)
     *
     * @method setVolume
     * @param {int} value
     * @return {void}
     */
    this.setTime = function(value) {
        var player = this;
        
        try {
            if (value == 0) {
                player.videoElement.currentTime = value;
            } else {
                player.videoElement.currentTime += value;
                player.currentTime += value;
            }
        } catch (e) {
            console.log(".::: Error: setting time :::.", e);
        }
        
        player.currentTime = player.videoElement.currentTime;
    }
    
    /**
     * set volume range(0 - 1) based on incoming value
     *
     * @method setVolume
     * @param {int} value
     * @return {void}
     */
    this.setVolume = function(value) {
        var player,
            volume = this.videoElement.volume;
        
        volume += value;
        // test for range 0 - 1 to avoid exceptions
        if (vol >= 0 && vol <= 1) {
            // if valid value, use it
            player.videoElement.volume = volume;
        } else {
             // otherwise substitute a 0 or 1
            player.videoElement.volume = (volume < 0) ? 0 : 1;           
        }
    }

    /**
     * set playback
     *
     * @method setPlayback
     * @param {int} value
     * @return {void}
     */
    this.setPlayback = function(value) {
        var player = this;
        
        player.videoElement.playbackRate = value;
        player.playback = value;
    }

    /**
     * Set autoplay
     *
     * @method setAutoplay
     * @param {bool} value
     * @return {void}
     */
    this.setAutoplay = function(bool) {
        var player = this;
        
        player.videoElement.autoplay = !!bool;
        player.autoplay = !!bool;
    }

    /**
     * Set autoplay
     *
     * @method setAutoplay
     * @param {bool} value
     * @return {void}
     */
    this.setLoop = function(bool) {
        var player = this;
        
        player.videoElement.loop = !!bool;
        player.loop = !!bool;
    }

    /**
     * toggle fullscreen
     *
     * @method toggleFullscreen
     * @param {object} value
     * @return {void}
     */
    this.toggleFullscreen = function(value) {
        var player = this;
        
        if (player.isFullscreenAvailable) {
            
            if (player.isFullscreen) {
                $VguFullscreen.exitFullscreen();
            } else {
                $VguFullscreen.requestFullscreen(player.videoElement);
            }   
        }
    }

    /**
     * on complete
     *
     * @method onComplete
     * @return {void}
     */
    this.onComplete = function() {
        var player = this;
        
        $scope.onComplete();  
        
        player.setState($VGU_STATES.STOP);
        player.isCompleted = true;
        
        $scope.$apply();
    }

    /**
     * on error
     *
     * @method onError
     * @return {void}
     */
    this.onError = function(evt) {
        $scope.onError({$event: evt});
    }

    /**
     * on can be play
     *
     * @method onCanBeplay
     * @param {object} evt
     * @return {void}
     */
    this.onCanBePlay = function(evt) {
        this.buffering = false;
        $scope.$apply($scope.onCanPlay({$event: evt}));
        
        console.log(".::: EVENT::: Can-play :::. ", evt);
    }

    /**
     * on play
     *
     * @method onPlay
     * @return {void}
     */
    this.onPlay = function() {
        var player = this;
        
        player.setState($VGU_STATES.PLAY);
        $scope.$apply();
        
        console.log(".::: EVENT::: PLAY :::.", player.state);
    }

    /**
     * on pause
     *
     * @method onPause
     * @return {void}
     */
    this.onPause = function() {
        var player = this;
        
        if(player.videoElement.currentTime == 0) {
            player.setState($VGU_STATES.PLAY);
        } else {
            player.setState($VGU_STATES.PLAY);   
        }
        
        $scope.$apply();
        console.log(".::: EVENT::: PAUSE :::.");
    }

    /**
     * on volume change
     *
     * @method onVolumeChange
     * @return {void}
     */
    this.onVolumeChange = function() {
        var player = this;
        
        player.volume = player.videoElement.volume;
        $scope.$apply();
        
        console.log(".::: EVENT::: VOLUME CHANGE :::.");
    }

    /**
     * on playback change
     *
     * @method onPlackbackChange
     * @return {void}
     */
    this.onPlaybackChange = function() {
        var player = this;
        
        player.playback = player.videoElement.playback;
        $scope.$apply();
        
        console.log(".::: EVENT::: PLAYBACK CHANGE :::.");
    }

    /**
     * on seeking
     *
     * @method onSeeking
     * @return {void}
     */
    this.onSeeking = function() {
        
    }

    /**
     * on ready
     *
     * @method onReady
     * @return {void}
     */
    this.ready = function() {
        var player = this;
        
        player.isReady = true;
        player.autoplay = $scope.autoplay || false;
        player.loop = $scope.loop || false;
        player.mute = $scope.mute || false;
        player.nativeControls = $scope.nativeControls || false;
        player.fullscreen = $scope.fullscreen || true;

        // this.playsInline = $scope.vgPlaysInline;
        // this.cuePoints = $scope.vgCuePoints;
        // this.clearMediaOnNavigate = $scope.vgClearMediaOnNavigate || true;
        
        player.state = player.setState($VGU_STATES.STOP);

        // loading config
        if (player.isConfig) {
            $VguConfigService.load($scope.configUrl).then (
                player.onConfigLoad.bind(this)
            );
        } else {
            $scope.onPlayerReady({$API: this});
        }
        
        console.log(".::: vidangu player is ready :::.");
    }
    
    /**
     * create event listeners
     *
     * @method createListeners
     * @return {void}
     */
    this.createListeners = function() {
        var player = this;
        
        player.videoElement.addEventListener("can-be-played", player.onCanBePlay.bind(this), false);
    
        player.videoElement.addEventListener("play", player.onPlay.bind(this), false);
        player.videoElement.addEventListener("pause", player.onPause.bind(this), false);

        player.videoElement.addEventListener("volume-change", player.onVolumeChange.bind(this), false);
        player.videoElement.addEventListener("playback-change", player.onPlaybackChange.bind(this), false);

        player.videoElement.addEventListener("seeking", player.onSeeking.bind(this), false);
        // player.videoElement.addEventListener("seeked", this.onSeeked.bind(this), false);
        
        player.videoElement.addEventListener("error", player.onError.bind(this), false);
       
        console.log(".::: creating vidangu event Listeners :::.");
    }

    /**
     * initialize default
     *
     * @method init
     * @param {object} config
     * @return {void}
     */
    this.init = function() {
        var player = this;
        
        player.isReady = false;
        player.isComplete = false;
        
        player.isPaused = true;
        player.isPlaying = false;
        
        player.isFullscreen = !!$VguFullscreen.isFullscreen();
        player.isFullscreenAvailable = !!$VguFullscreen.isAvailable();
        
        player.isConfig = ($scope.configUrl != undefined);
        
        player.buffered = [];
        player.bufferedEnd = 0;
        
        player.currentTime = 0;
        player.totalTime = 0;
        
        player.volume = 0;

        player.state = "";
        
        player.playback = 1;

        
        $scope.onPlayerReady({$API: this});
    
        console.log(".::: initializing vidangu player :::.");
    }

    /**
     * load config
     *
     * @method onConfigLoad
     * @param {object} config
     * @return {void}
     */
    this.onConfigLoad = function(config) {
        var player = this;
        
        player.config = config;
        
        for (var key in config) {
            if (!$scope.hasOwnProperty(key)) {
                player[key] = config[key];
            }
        }
        
        console.log(config);
        console.log($scope);
        console.log(this);
        
        console.log(".::: Config Loaded :::.");
    }
    
    // initialize vidangu player
    this.init();
}]);
