app.controller('terms', function ($scope, $http, $location, $cookieStore, model, loading,$rootScope) {

    /* if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    } */
    
    var ID = 5; //global Id for Terms & condition

    $rootScope.initOneSignal();
    loading.deactive();

    $scope.home = function() {
        //$location.path('/home');
        window.history.back();
    }


    $scope.tandc = function (form) {
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
            $location.path('/terms');
            $scope.terms   = res.data.data;
            $scope.terms.description = $($scope.terms.description).text();
            //console.log($scope.terms.description)
        } else {
            
            //Throw error if not logged in
            //model.show('Alert', res.data.responseMessage);
            alert(res.data.status);
        }  

    }).finally(function () {    
        loading.deactive();
    }); 


    };
});