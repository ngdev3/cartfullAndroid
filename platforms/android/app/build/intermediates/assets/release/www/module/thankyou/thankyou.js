app.controller('thankyou', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
    // alert();

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }
    if (!$cookieStore.get('thankyou')) {
        $location.path('/dashboard/home');
        return false;
    }


    $scope.goToHome = function () {
        $location.path("/dashboard/home");
    }
    $scope.seeOrders = function () {
        $cookieStore.remove('thankyou');
        $location.path("/order/myorder");
    }

    /**
     * Funtion: thanks from thankyou.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 25/10/2018 at 11:15am
     * Get the order id by cookie store
     */

    $scope.thanks = function () {
        $cookieStore.remove('thankyou');
        $scope.orderid = $cookieStore.get('orderid');
        $cookieStore.remove('aid');
        $cookieStore.remove('orderid');
        $cookieStore.remove('promocodeData');
        $cookieStore.remove('deliverydaytime');
    }



});