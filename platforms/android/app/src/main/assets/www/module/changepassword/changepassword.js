app.controller('changepassword', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation,$rootScope) {
    
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

   $rootScope.initOneSignal();
    loading.deactive();

  /*  if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
    } */

    // function for back button on my account page created by sajal
    $scope.my_account = function(){
        $location.path("myaccount/account");
    }

   /*  $scope.home = function() {
        //$location.path('/home');
        window.history.back();
    } */

    /**
     * Funtion: pwd_change from changepassword.html
     * Name: Sajal Goyal
     * Created-on: 12/10/2018 at 02:00pm
     * Change the password by sending the http request
     */

    $scope.pwd_change = function (form) {
        
        var res = '';
        //if fields are invalid
        if ($scope[form].$error) {
            var error_str = '';

            if ($scope[form].old_pwd.$error.required !== undefined)
            {
                error_str += "Old Password, ";
            }
            if ($scope[form].new_pwd.$error.required !== undefined)
            {
                error_str += "New Password, ";
            }
            if ($scope[form].conf_pwd.$error.required !== undefined)
            {
                error_str += "Confirm Password, ";
            }
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));

            if (error_str !== '')
            {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span> <br/> " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
            }
        }
       
       if ($scope[form].$valid) {
                var reg =  /.{6,}$/;
                var reg2 =  /.{6,}$/;
                var reg3 = /[0-9]/;
                if (reg2.test($scope.new_pwd) == false) {
                    error_str = " Password length should be 6 minimum! ";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                }
                if (reg2.test($scope.conf_pwd) == false) {
                    error_str = "Confirm Password length should be 6 minimum! ";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                }
                /* if (reg3.test($scope.new_pwd) == false) {
                    error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                    // model.show('Alert', error_str);
                    alert(error_str);
                    return false;
                } */
        }
        
        
        if ($scope[form].$valid) {
            if ($scope.conf_pwd != $scope.new_pwd)
            {
                error_str += "Password and Confirm Password does not match.";
            }

            if (error_str !== '')
            {
                //error_str = " ollowing fields must have valid information " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            
            
             loading.active();
             //console.log($scope.old_pwd)
            //store cookie if check box for remember me is checked and codition goes true only otherwise none
            var args = $.param({
                'uid'  : $cookieStore.get('userinfo').uid,
                'oldpassword'   :   $scope.old_pwd,
                'newpassword'   :    $scope.new_pwd
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/profileapi/changePassword',
                data: args //forms user object

            }).then(function (response) {
               
                res = response;
                //console.log(response);
                if (res.data.status == 'pass') {
                    //put cookie and redirect it    
                    
                    // $cookieStore.remove("upload_ads_type");
                    // $cookieStore.remove("uploads_ads_detail");
                    // $cookieStore.remove("interestids_cookies");
                    // $cookieStore.remove("register_step1");
                    // $cookieStore.remove('userinfo');
                    // model.show('Alert', res.data.responseMessage);
                    alert("Password Changed Successfully")
                    $location.path('/login');

                } else {
                   
                    //Throw error if not logged in
                     //model.show('Alert', res.data.responseMessage);
                     alert("Old Password Is Incorrect");
                }


            }).finally(function () {
                loading.deactive();
            }); 
        }

    };

   /*  $scope.reg = function () {
        $location.path('/register_step1');
    } */
   /*  $scope.forgot = function () {

        $location.path('/forgot');
    } */



});