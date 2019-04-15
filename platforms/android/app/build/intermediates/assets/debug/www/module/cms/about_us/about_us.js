app.controller('aboutus', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {
    
    /* if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }  */ 
    var ID = 1; //global Id for about us

    $rootScope.initOneSignal();
    loading.deactive();

    $scope.home = function() {
        //$location.path('/home');
        window.history.back();
    }

    /**
     * Funtion aboutUsInit from aboutus.html on nginit
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:10pm
     * Get the about us by sending the http request
     */
    var GetDataFromApi; //what its use?

     $scope.aboutUsInit =   function(){

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
                  //console.log(res.data.data);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
                $location.path('/about_us');
                $scope.about   = res.data.data;
                $scope.about.description = $($scope.about.description).text();

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