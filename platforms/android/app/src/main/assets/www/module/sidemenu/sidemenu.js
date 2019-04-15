app.controller('sidemenu', function ($scope, $http, $location, $interval, $cookieStore, $window, model, loading, $rootScope) {

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
         return false;
    }
    
    $rootScope.initOneSignal();
    loading.deactive();


    if ($cookieStore.get('userinfo')) {
        $scope.type = $cookieStore.get('userinfo').user_type;
    }

    $scope.TokenEmpty = function () {

        loading.active();
        var args = $.param({
            api_key: api_key,
            user_id: $cookieStore.get('userinfo').id,
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'webservices/unset_user_token',
            data: args //forms user object

        }).then(function (response) {

            loading.deactive();

            res = response;

            if (res.data.responseCode == '200') {

                $location.path('/login');
            } else {
                //Throw error if not logged in              
                model.show('Alert', res.data.responseMessage);
            }
        }).finally(function () {
            loading.deactive();
            $location.path('/login');
        });
    }


    $scope.logout = function () {

        $scope.TokenEmpty();
        $cookieStore.remove("upload_ads_type");
        $cookieStore.remove("uploads_ads_detail");
        $cookieStore.remove("interestids_cookies");
        $cookieStore.remove("register_step1");
        $cookieStore.remove('userinfo');
        $cookieStore.remove('is_splash');
        $cookieStore.remove('userinfo');
        $cookieStore.remove('userinfo');
        $cookieStore.remove('HoldAccessParent');
        $rootScope.RemoveFile();
    };

    $scope.changepassword = function () {
        $location.path('/changepassword');

    };
    $scope.advertizer_account = function () {
        $location.path('/advertiser_home');

    };
    $scope.user_account = function () {
        $location.path('/userhome');

    };
    $scope.refer_earn = function () {
        $location.path('/refer_earn');

    };
    $scope.update_advertize = function () {
        $location.path('/advertiser_home/advertise_up');

    };
    $scope.update_user = function () {
        $location.path('/userupdate');

    };
 
    $scope.change_user_interest = function () {

        $location.path('/user_interest');
    }

    $scope.ads_list_ad = function () {

        $location.path('/ads_list');
    }




});