app.controller('new_pass', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope) {

if ($cookieStore.get('userinfo')) {
    $location.path('/dashboard/home');
}

$scope.forgot = function(form){

    
    //if fields are invalid
    if ($scope[form].$error) {
        var error_str = '';

        if ($scope[form].new_pwd.$error.required !== undefined)
            {
                error_str += "New Password, ";
            }
            if ($scope[form].conf_pwd.$error.required !== undefined)
            {
                error_str += "Confirm New Password, ";
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
            var reg2 = /[a-zA-Z]/;
            var reg3 = /.{6,}$/;
           // var reg3 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

            if (reg3.test($scope.new_pwd) == false) {
                error_str = " Password should contain length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            if (reg3.test($scope.conf_pwd) == false) {
                error_str = "Confirm Password should contain length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            
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

            var args = $.param({
                'uid': $cookieStore.get('userid'),
                'password' : $scope.new_pwd
            });
            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/profileapi/newPassword',
                data: args //forms user object

            }).then(function (response) {

                res = response;
                if (res.data.status == 'pass') {
                    //put cookie and redirect it    
                    //model.show('Alert', res.data.responseMessage);
                   alert('Password is successfully changed');
                   $cookieStore.remove('userid');
                   $location.path('/login');
                } else {

                    alert('Password not changed')
                }
            }).finally(function () {
                loading.deactive();
            });
        }


}
});    