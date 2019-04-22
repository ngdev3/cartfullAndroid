app.controller('login', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    }

    if($cookieStore.get('regdata')){
        $cookieStore.remove('regdata');
    }

    $scope.skiptostore = function(){
        $location.path('/store');
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    $scope.varified_status = '';
    
    function onDeviceReady() {
        uuid = device.uuid;
        device_type = device.platform;
        // alert(uuid)
    }

    //create table at local database to store the data of users information at time of login
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo (id INTEGER PRIMARY KEY AUTOINCREMENT, uid, phone_no, email_address, username, date_added)');

    });

    $rootScope.initOneSignal();
    loading.deactive();


    $scope.toForgot = function () {
        $location.path('/forgot');
        //window.history.back();
    }

    // $scope.mobile_no = '8299334781';
    $scope.phoneVerifiedStatus = false;
    $scope.loginuser = function (form) {
        var res = '';

        if (!$scope.phoneVerifiedStatus) {
            // console.log($scope.phoneVerifiedStatus);
            //if fields are invalid
            if ($scope[form].$error) {
                //  alert("Error");
                var error_str = '';
                if ($scope[form].mobile_no.$error.required !== undefined) {
                    error_str += "Mobile No ";
                }
                if (error_str !== '') {
                    error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                    model.show('Alert', error_str);
                    // alert(error_str)
                    // return false;
                }
            };
            if ($scope[form].$valid) {
                var reg1 = /^[0-9]{10}$/; // for limiting mobile no to 10 digits only.

                if (reg1.test($scope.mobile_no) == false) {
                    error_str = "Mobile Number Length should be of 10 digits";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                }
                loading.active();

                var args = $.param({
                    user_uid: $scope.mobile_no,
                });

                $http({
                    headers: {
                        //'token': '40d3dfd36e217abcade403b73789d732',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: app_url + '/validateuser/checkuser',
                    data: args //forms user object

                }).then(function (response) {

                    console.log(response.data.status);

                    if (response.data.status == 'verified') {
                        $scope.varified_status = response.data.status
                        $scope.phoneVerifiedStatus = true;

                    } else if (response.data.status == 'notverified') {
                        //enable OTP Screen
                        var setOTPCookies = {
                            'mobile': response.data.mobile,
                            'uid': response.data.uid,
                            'status': response.data.status,
                            'from': 'login'
                        }
                        $cookieStore.put('otpverification', setOTPCookies);
                        $location.path('/otp');

                    } else {
                        var setOTPCookies = {
                            'mobile': $scope.mobile_no,

                        }
                        $cookieStore.put('newregister', setOTPCookies);
                        model.show('Info', 'This number is not registered with us!');
                        //new user redirect to register screen
                        $location.path('/register');
                    }

                }).finally(function () {
                    loading.deactive();
                });
            }
        }

        if ($scope.phoneVerifiedStatus) {
            //if fields are invalid
            console.log($scope.userpassword);
            if ($scope[form].$error) {
                //  alert("Error");
                var error_str = '';
                if ($scope[form].mobile_no.$error.required !== undefined || $scope[form].mobile_no.$error.number) {
                    error_str += "Mobile No ";
                }

                if (error_str !== '') {
                    error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                    model.show('Alert', error_str);
                    // alert(error_str)
                    // return false;
                }
            };
            if ($scope[form].$valid) {

                if ($scope[form].$error) {
                    //  alert("Error");
                    var error_str = '';
                    if ($scope[form].mobile_no.$error.required !== undefined || $scope[form].mobile_no.$error.number) {
                        error_str += "Mobile No ";
                    }
                    if (error_str !== '') {
                        error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                        model.show('Alert', error_str);
                        // alert(error_str)
                        // return false;
                    }
                };
                if ($scope[form].$valid) {
                    var reg1 = /^[0-9]{10}$/; // for limiting mobile no to 10 digits only.
    
                    if (reg1.test($scope.mobile_no) == false) {
                        error_str = "Mobile Number Length should be of 10 digits";
                        // model.show('Alert', error_str);
                        alert(error_str);
                        return false;
                    }
                    loading.active();
    
                    var args = $.param({
                        user_uid: $scope.mobile_no,
                    });
    
                    $http({
                        headers: {
                            //'token': '40d3dfd36e217abcade403b73789d732',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        url: app_url + '/validateuser/checkuser',
                        data: args //forms user object
    
                    }).then(function (response) {
    
                        console.log(response.data.status);
    
                        if (response.data.status == 'verified') {
                            $scope.varified_status = response.data.status
                            $scope.phoneVerifiedStatus = true;
    
                        } else if (response.data.status == 'notverified') {
                            //enable OTP Screen
                            var setOTPCookies = {
                                'mobile': response.data.mobile,
                                'uid': response.data.uid,
                                'status': response.data.status,
                                'from': 'login'
                            }
                            $cookieStore.put('otpverification', setOTPCookies);
                            $location.path('/otp');
    
                        } else {
                            var setOTPCookies = {
                                'mobile': $scope.mobile_no,
    
                            }
                            console.log(setOTPCookies)
                            $cookieStore.put('newregister', setOTPCookies);
                            model.show('Info', 'This number is not registered with us!');
                            //new user redirect to register screen
                            $location.path('/register');
                        }
    
                    }).finally(function () {
                        loading.deactive();
                    });
                }

                if (jQuery.isEmptyObject($scope.userpassword)) {
                    error_str += "Password";
                    error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                    model.show('Alert', error_str);
                    // alert(error_str)
                    return false;
                }

                loading.active();

                var args = $.param({
                    user_uid: $scope.mobile_no,
                    user_password: $scope.userpassword,
                    mid: uuid,
                    store_id: '5',
                    device_type: device_type,
                });

                $http({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: app_url + '/validateuser',
                    data: args //forms user object

                }).then(function (response) {
                    console.log("---------------");
                    console.log(response.data);

                    if (!response.data.error) {

                        db.transaction(function (tx) {
                            tx.executeSql('INSERT INTO userinfo ( uid, phone_no, email_address, username, date_added) VALUES ("' + response.data.uid + '","' + response.data.phone_no + '","' + response.data.email_address + '","' + response.data.username + '","' + response.data.date_added + '")');
                        });
                        var userinfo = {
                            'uid': response.data.uid,
                            'phone_no': response.data.phone_no,
                            'email_address': response.data.email_address,
                            'username': response.data.username,
                            'location': response.data.location,
                            'image': response.data.image,
                        }
                        $cookieStore.put('userinfo', userinfo);
                        $location.path('/dashboard/home');

                    } else {
                        model.show('Alert', response.data.error_msg);
                    }

                }).finally(function () {
                    loading.deactive();
                });

            }
        }
    };

});