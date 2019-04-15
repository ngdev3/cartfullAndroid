app.controller('wallet', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid; //UID used for getting data from http request
    $scope.usedata = $cookieStore.get('userinfo');
    console.log($scope.usedata);

    $scope.my_wallet_data = function () {
        
        loading.active();
        var args = $.param({
            'uid': GlobalUID,
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'itemcartapi/my_wallet_data',
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            /* console.log('sdffdgjkdfhg')
            console.log(res.data.wallet_balance) */
            if (res.data.status == 'success') {
                $scope.getdata = res.data;
                $scope.wallet_history = res.data.wallet_history;
                //console.log($scope.wallet_history);
            } else {
                //  alert("Sorry..No Address Found!");
            }
        })

    }


    $scope.update_profile = function (form) {

        var error_str = '';
        if ($scope[form].$error) {

            if ($scope[form].amount.$error.required !== undefined || $scope[form].amount.$error.number) {
                error_str += "Enter Amount, ";
            }

            if ($scope[form].creditpay.$error.required !== undefined) { 
                alert('Please Select Payment Method')
            }
            
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                return false;
            }
        }
        if ($scope[form].$valid) {
            var reg1 = /^[0-9]*$/;
            
            if (reg1.test($scope.amount) == false) {
                error_str = "Please Enter Positive integers";
                alert(error_str);
                return false;
            }

        if (error_str == '') {
            loading.active();
            var args = $.param({
                uid: GlobalUID,
                payment_mode: 'ccAvenue',
                amount: $scope.amount,

            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'itemcartapi/makepayment',
                data: args //forms user object

            }).then(function (response) {
                loading.deactive();
                res = response;
                console.log(res)
                //  alert("response from the server ");
                if (res.data.status == 'fail') {
                    alert(res.data.error_msg);
                } else {
                    alert('Amount Successfully Added Into Wallet')
                    $scope.my_wallet_data();
                    $scope.amount="";
                    $scope.creditpay= "";
                }
                // console.log(response);

            }).finally(function () {
                //loading.deactive();
            })
        }
    }
    }
 
});