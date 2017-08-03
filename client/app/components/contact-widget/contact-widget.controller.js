'use strict';

/* Contact Widget Controller */

app.controller('ContactWidgetCtrl', ['$scope', function ($scope, $element, $attrs, $transclude) {
    // menu items
    $scope.info = {
        name: "Stanley Ilukhor",
        title: "Programmer/Graphic Artist",
        email: "stannesi@gmail.com"
    };
    
    $scope.bShowForm = false;

    // show form

    // menu item click function
    $scope.fnShowForm = function() {
        $scope.bShowForm = !$scope.bShowForm;
    }
    
    $scope.fnHideForm = function() {
        $scope.bShowForm = !$scope.bShowForm;
    }
}]);
