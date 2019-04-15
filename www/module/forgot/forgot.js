app.controller('forgot', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    $rootScope.initOneSignal();
    loading.deactive();

    if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    }


    //alert();
    /*if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
    }*/

    // function for back button on login page created by sajal
    $scope.backToLogin = function () {
        $location.path('/login');
        //window.history.back();
    }

    /*  $scope.home = function() {
         //$location.path('/home');
         window.history.back();
     } */

    /**
     * Function Name : forgot_password
     * Created By : Sajal Goyal
     * Created Date : 10/10/2018 at 06:05pm
     * Post The mobile no send the OTP By http request
     */


    $scope.forgot_password = function (form) {
        var res = '';
        //if fields are invalid
        if ($scope[form].$error) {
            var error_str = '';
            if ($scope[form].mobile_no.$error.required !== undefined || $scope[form].mobile_no.$error.number) {
                error_str += "Mobile No ";
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/> " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
            }
        };
        if ($scope[form].$valid) {
            var reg1 = /^[0-9]{10}$/;  // for limiting mobile no to 10 digits only.

            if (reg1.test($scope.mobile_no) == false) {
                error_str = "Mobile Number Length should be of 10 digits";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            loading.active();

            var args = $.param({
                'mobile': $scope.mobile_no
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/profileapi/sendforgotOtp',
                data: args //forms user object

            }).then(function (response) {

                res = response;
                if (res.data.status == 'pass') {
                    //put cookie and redirect it    
                    //model.show('Alert', res.data.responseMessage);
                    $cookieStore.put('userid',res.data.uid);
                    var setOTPCookies = {
                        'mobile': $scope.mobile_no,
                        'uid': response.data.uid,
                        'status': response.data.status,
                        'from': 'login'
                    }
                    $cookieStore.put('otpverification', setOTPCookies);
                    alert('Otp has been sent successfully');
                    $location.path('/otp');
                    // return false;

                } else {

                    //Throw error if not logged in
                    //model.show('Alert', res.data.responseMessage);
                    alert("Invalid Mobile Number")
                }


            }).finally(function () {
                loading.deactive();
            });




        }

    };

    /*  $scope.login = function () {
         $location.path('/login');
     } */

});