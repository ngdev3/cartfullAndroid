app.controller('myaccount', function ($scope, $http, $location, $interval, $rootScope, $cookieStore, model, $locale, loading) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }


    $scope.abg = 'po';
    /* Upload adds link */

    $scope.upload_ad = function () {

        $location.path('/upload_ads');

    }

    $scope.dashboard = function () {
        $location.path('/dashboard/home');
    }

    $scope.myrewards = function () {
        $location.path('/myrewards')
    }

    
    $scope.my_profile = function () {
        $cookieStore.put('from','list');
        $location.path('/myaccount/profile');

    }

    $scope.my_orders = function () {
        $location.path('/order/myorder');

    }

    $scope.my_address = function () {
        $location.path('/address');

    }
    $scope.mywallet = function () {
        $location.path('/wallet');

    }

    $scope.change_password = function () {
        $location.path('/changepassword');

    }
    $scope.logout = function () {
        $rootScope.DeleteData();
        $cookieStore.remove("userinfo");
        $cookieStore.remove("storeinfo");
        $location.path('/login');

    }
    /* End Upload adds link  Here*/

    /* Update Profile of advertiser Link Form */
    $scope.update_advertise_info = function () {

        $location.path('myaccount/advertise_up');

    }

    /* End Update Profile of advertiser Link Form */


    /* Change Password  for advertiser Link Form */
    $scope.changepassword_advertise = function () {

        $location.path('/changepassword');

    }

    /* ENd Change Password  for advertiser Link Form */

});