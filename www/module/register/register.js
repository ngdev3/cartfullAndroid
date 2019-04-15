app.controller('user_register', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    }

    $rootScope.referral_code = '';
    $rootScope.referral_id = '';
    $scope.codeapplied = 0;

    $scope.terms = function () {
        var regdata = {
            fname:$scope.fname,
            mob_number:$scope.mob_number,
            email:$scope.email,
            conditions:$scope.term_conditions,
            referral_code : $rootScope.referral_code,
            referral_id : $rootScope.referral_id
        }
        $cookieStore.put('regdata',regdata)

        $location.path('/terms');
    }

    if($cookieStore.get('regdata')){
        $scope.fname = $cookieStore.get('regdata').fname
        $scope.mob_number = $cookieStore.get('regdata').mob_number
        $scope.email = $cookieStore.get('regdata').email
        $scope.term_conditions = $cookieStore.get('regdata').conditions
        $rootScope.referral_code = $cookieStore.get('regdata').referral_code
        $rootScope.referral_id = $cookieStore.get('regdata').referral_id
        }

       
        if($rootScope.referral_id != ''){
            $scope.codeapplied = 1;
        }

    if ($cookieStore.get('newregister') != '' || $cookieStore.get('newregister') != undefined) {
        if ($cookieStore.get('newregister')) {
            //console.log($cookieStore.get('newregister').mobile)
            $scope.mob_number = $cookieStore.get('newregister').mobile;
        }
    }

    // check referral code (valid/invalid) hit by sajal goyal
    // Dated : 01/03/2019 2:45 PM on valid button

    
    $scope.checkrefferal = function(referral_code){
       
        if(referral_code == '' || referral_code == undefined){
            alert('Please enter a Referral Code');
            return false;
        }

        $rootScope.referral_code = referral_code;

        var args = $.param({
            referral_code: referral_code,
            
        });
        loading.active();
            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/loginapi/verifyrefcode',
                data: args //forms user object

            }).then(function (response) {

                res = response;

                if (res.data.status == 'invalid') {
                    $scope.codeapplied = 0;
                    alert('Invalid Referral Code');
                } else {
                   $rootScope.referral_id = res.data.referral_codes;
                   $scope.codeapplied = 1;
                   $('#referral').attr('disabled',true);
                }
            }).finally(function () {
                loading.deactive();
            })
    }

    // register user (user signup) by Sajal Goyal

    $scope.user_registers = function (form) {

        let ipAddress;
        var getIPAddress = function () {
            $.getJSON("https://jsonip.com?callback=?", function (data) {
                ipAddress = data.ip
            });
        }
        getIPAddress();
        var error_str = '';
        if ($scope[form].$error) {

            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "Full Name, ";
            }

            if ($scope[form].email.$error.required !== undefined || $scope[form].email.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].mob_number.$error.required !== undefined) {
                error_str += "Mobile Number, ";
            }

            if ($scope[form].password.$error.required !== undefined) {
                error_str += "Password, ";
            }
            if ($scope[form].confirm_password.$error.required !== undefined) {
                error_str += "Confirm Password, ";
            }

            if ($scope[form].term_conditions.$error.required !== undefined) {
                error_str += "Terms & Conditions, ";
            }

        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                return false;
            }
        }, 100);

        if($scope[form].$valid){
            var reg1 = /.{6,}$/;
            var reg2 = /.{6,}$/;
            var reg3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            var reg7 = /^[0-9]{10}$/;

            if (reg3.test($scope.email) == false) {
                error_str = " Please enter proper Email-ID ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg1.test($scope.password) == false) {
                error_str = " Password length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg7.test($scope.mob_number) == false) {
                error_str = "Mobile Number should contain Numbers Only & Length should be 10";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg2.test($scope.confirm_password) == false) {
                error_str = " Confirm Password length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if ($scope.confirm_password != $scope.password)
            {
                error_str += "Password and Confirm Password does not match.";
                alert(error_str);
                return false;
            }           
        }

        if (error_str == '') {
            var args = $.param({
                user_name: $scope.fname,
                user_email: $scope.email,
                user_mob: $scope.mob_number,
                user_password: $scope.password,
                user_ip: ipAddress,
                login_type: device_type,
                referral_id : $rootScope.referral_id
            });
            loading.active();
            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/loginapi',
                data: args //forms user object

            }).then(function (response) {

                res = response;

                console.log("response from the server ")
                console.log(response)

                if (res.data.status == 'success') {
                    $cookieStore.remove('regdata')
                    var setOTPCookies = {
                        'mobile': $scope.mob_number,
                        'uid': res.data.uid,
                        'status':res.data.status,
                        'referral_id' : $rootScope.referral_id,
                        'from': 'register'
                    }
                    $cookieStore.put('otpverification', setOTPCookies);
                    if ($cookieStore.get('userid')) {
                        $cookieStore.remove('userid');
                    }
                    $location.path('/otp');
                    $cookieStore.remove('newregister');
                    model.show('Info', 'Registered Successfully');
                } else {
                    
                    if(res.data.mob_status == 'exist'){

                        alert('Mobile No. Already Exists')
                    }
                    else if(res.data.email_status == 'exist'){

                        alert('Email-id Already Exists')
                    }
                    else{

                        alert('Mobile number or Email-id already Exists')
                    }
                    //model.show('Alert', res.data.responseMessage);
                    $location.path('/register');
                }
            }).finally(function () {
                loading.deactive();
            })
        }

    }
});