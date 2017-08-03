'use strict';

/* Profile Widget Directive */

app.directive('profileWidget', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/profile-widget/profile-widget.view.html',
        transclude: true,
        replace: false,
        scope: {},
        controller: 'ProfileWidgetCtrl',
        link: function(scope, element, attrs, controller, transcludeFn) {

        }
    }
})