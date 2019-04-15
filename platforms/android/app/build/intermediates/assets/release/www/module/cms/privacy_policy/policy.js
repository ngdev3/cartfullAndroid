app.controller('policy', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    /* if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
    } */

    var ID = 4; //global Id for privacy policy

    $rootScope.initOneSignal();
    loading.deactive();

    $scope.home = function() {
        //$location.path('/home');
        window.history.back();
    }

    /**
     * Funtion privacyinit from policy.html on nginit
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:15pm
     * Get the privacy policy by sending the http request
     */


    $scope.privacyinit =   function(){

        loading.active();

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'cmsapi?id='+ID
            //data: args 

        }).then(function (response) {
            
            res = response;
            
            if (res.data.status == 'success') {
                //console.log(res.data);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
                $location.path('/policy');
                $scope.policy   = res.data.data;
                $scope.policy.description = $($scope.policy.description).text();

            } else {
                
                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.status);
            }  

        }).finally(function () {    
            loading.deactive();
        }); 


    }

});