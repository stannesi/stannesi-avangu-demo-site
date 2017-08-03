'use strict';

/* Home Router */

app.config(function($stateProvider) {
    $stateProvider
    // router for the home page
    .state('home', {
        url: '/home',
        views: {
            'viewMain': {
                templateUrl: 'app/home/home.view.html',
                controller: 'HomeCtrl'
            }
        }      
    });
});

