'use strict';

/* Contact Widget Directive */

app.directive('contactWidget', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/contact-widget/contact-widget.view.html',
        transclude: true,
        replace: false,
        scope: {},
        controller: 'ContactWidgetCtrl',
        link: function(scope, element, attrs, controller, transcludeFn) {

        }
    }
})