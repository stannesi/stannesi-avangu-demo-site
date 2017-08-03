'use strict';

/* Fly Nav Menu Directive */

app.directive('flyNavMenu', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/fly-nav-menu/fly-nav-menu.view.html',
        transclude: true,
        replace: false,
        scope: {},
        controller: 'FlyNavMenuCtrl',
        
        link: function(scope, element, attrs, controller, transcludeFn) {}
    }
})