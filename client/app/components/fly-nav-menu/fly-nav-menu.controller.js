'use strict';


/* Fly Nav Menu Controller */

app.controller('FlyNavMenuCtrl', ['$scope', function ($scope, $element, $attrs, $transclude) {
    // menu items
    $scope.menuItems = [{
        title: "Home",
        sref: "home",
        icon: "fa-home"
    }, {
        title: "Porfolio",
        sref: "porfolio",
        icon: "fa-briefcase"
    }, {
        title: "Blog",
        sref: "blog",
        icon: "fa-rss-square"
    }, {
        title: "About",
        sref: "about",
        icon: "fa-question-circle"
    }, {
        title: "Contact",
        sref: "contact",
        icon: "fa-envelope"
    }];

    $scope.sMenuItemsClass = "init fade";
    $scope.bBtnClass = false;

    $scope.bItemBtnClass = false;

    // menu button click function
    $scope.fnBtnClick = function() {
        
        // toogle buttion icon '+' or 'x'
        $scope.bBtnClass = !$scope.bBtnClass;
        
        // reset <a> clicked classes
        $(".fly-nav-menu-items").find("a").removeClass("clicked");

        if(!$scope.bBtnClass) { 
            $scope.sMenuItemsClass = "contract";
        } else {
            $scope.sMenuItemsClass = "expand";
        }
    }
    
    // menu item click function
    $scope.fnItemClick = function(e) {
        var el = e.target;
        $scope.bBtnClass = !$scope.bBtnClass;
        $scope.sMenuItemsClass = "fade";
        $(el).parent().addClass("clicked");
    }
}]);
