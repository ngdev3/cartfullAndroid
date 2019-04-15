app.controller('otp', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope) {


    if (!$cookieStore.get('otpverification')) {
        $location.path('/login');
        return false;
    }


    $scope.sendAt = $cookieStore.get('otpverification').mobile
    console.log($cookieStore.get('otpverification'))

    $('#first').keyup(function(){
    //    console.log(Number.isInteger($scope.first));
       if(Number.isInteger($scope.first)){
        $("#second").focus();  
       }else{
        $scope.first ='';
           alert("Please Enter Valid Otp")
       }
    })

    $('#second').keyup(function(){
    //    console.log(Number.isInteger($scope.first));
       if(Number.isInteger($scope.second)){
        $("#third").focus();  
       }else{
           alert("Please Enter Valid Otp")
       }
    })

    $scope.thirdpay = function (id) {
        //  console.log(id.toString().length)

        if (id.toString().length >= 5) {
            alert('OTP must be 4 Digits allowed')
            return false;
        }


    }

    $scope.otpVerification = function (form) {
        if ($scope[form].$error) {
            var error_str = '';
            
            if ($scope[form].first.$error.required !== undefined || $scope[form].second.$error.required !== undefined || $scope[form].third.$error.required !== undefined || $scope[form].fourth.$error.required !== undefined) { 
                error_str += "OTP is Required ";
                alert(error_str);
                return false;
            }
            if($scope[form].first.$error.number || $scope[form].second.$error.number || $scope[form].third.$error.number ||$scope[form].fourth.$error.number){
                error_str += "Please Enter Valid Otp";
                alert(error_str);
                return false;
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                alert(error_str);
                // alert(error_str)
                return false;
            }
        };
        if ($scope[form].$valid) {

            if ($scope.first.toString().length > 1 || $scope.second.toString().length > 1 || $scope.third.toString().length > 1 || $scope.fourth.toString().length > 1) {
                alert('OTP must be 1 Digits allowed in every box')
                return false;
            }
/* 
            if (!jQuery.isEmptyObject($scope.third)) {
                error_str += "OTP Number";
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                alert(error_str);
                // alert(error_str)
                return false;
            }
 */
            // return false;
            $scope.otpcode = ($scope.first) + "" + ($scope.second) + "" + ($scope.third) + "" + ($scope.fourth);
            console.log($scope.otpcode);
            loading.active();


            var args = $.param({
                uid: $cookieStore.get('otpverification').uid,
                referral_id: $cookieStore.get('otpverification').referral_id,
                otp: $scope.otpcode,
            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'profileapi/verifyPasswordotp',
                data: args //forms user object

            }).then(function (response) {

                if (response.data.status !== 'invalid') {

                    alert('Otp Verified Successfully');
                    $cookieStore.remove('otpverification');

                    if ($cookieStore.get('userid')) {
                        $location.path('/newpassword');
                    } else {
                        $location.path('/login');
                    }


                } else {
                    $scope.first = '';
                    $scope.second = '';
                    $scope.third = '';
                    $scope.fourth = '';
                    alert('Please Enter Valid Otp')
                }

            }).finally(function () {
                loading.deactive();
            });

        }
    }


    $scope.resendOtps = function () {
        var args = $.param({
            user_id: $cookieStore.get('otpverification').uid,
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'loginapi/resendotp',
            data: args //forms user object

        }).then(function (response) {

            console.log(response);

            if (response.data.status == 'pass') {

                model.show('Alert', 'OTP Sent Successfully!');
            } else {
                model.show('Alert', response.data.error_msg);
            }

        }).finally(function () {
            loading.deactive();
        });
    }



});