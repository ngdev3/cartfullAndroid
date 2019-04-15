app.controller('splash', function ($scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {


    $scope.redirect = function () {
        $location.path('/login');
    }

    setTimeout(function () {
        $scope.redirect();
    }, 1000)


});