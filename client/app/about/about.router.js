'use strict';

// home.router.js
app.config(function($stateProvider) {
    $stateProvider
    // router for the about page
    .state('about', {
        url: '/about',
        views: {
            'viewMain': {
                templateUrl: 'app/about/about.view.html',
                controller: 'AboutCtrl'
            }
        }    
    });
});

