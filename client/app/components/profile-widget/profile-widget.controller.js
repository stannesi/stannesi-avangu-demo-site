'use strict';

/* Profile Widget Controller */

app.controller('ProfileWidgetCtrl', ['$scope', function ($scope, $element, $attrs, $transclude) {
    // menu items
    $scope.info = {
        name: "Stanley Ilukhor",
        username: "stannesi",
        title: "Programmer/Animator/3D & Graphic Artist",
        email: "stannesi@gmail.com",
        social:
        [{
            name: "github",
            url: "http://twitter.com/github",
        },{
            name: "twitter",
            url: "http://twitter.com/stannesi",
        },{
            name: "instagram",
            url: "http://instagram.com/stannesi",
        },{
            name: "facebook",
            url: "http://facebook.com/stannesi",
        },{
            name: "linkedin",
            url: "http://linkedin.com/in/stannesi",
        },{
            name: "google-plus",
            url: "http://plus.google.com/+stannesi",
        },{
            name: "youtube",
            url: "http://youtube.com/stannesi",
        },{
            name: "vimeo",
            url: "http://vimeo.com/stannesi",
        }]
    };
}]);
