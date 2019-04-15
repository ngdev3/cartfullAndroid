app.controller('contactus', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {
    
    /* if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }  */ 
    var ID = 2; //global Id for about us

    $rootScope.initOneSignal();
    loading.deactive();

    $scope.home = function() {
        //$location.path('/home');
        window.history.back();
    }

    /**
     * Funtion contacttUsInit from contact_us.html on nginit
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:10pm
     * Get the about us by sending the http request
     */
    var GetDataFromApi; //what its use?

     $scope.contacttUsSubmit =   function(form){

        if ($scope.name == '' || $scope.name == undefined) {
            
            alert('Name is required');
            return false;
        }

        if ($scope.email == '' || $scope.email == undefined) {
            alert('Please enter valid Email-id');
            return false;
        }

        var reg3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (reg3.test($scope.email) == false) {
            error_str = " Please enter valid Email-ID ";
            alert(error_str);
            return false;
        }
        
        if ($scope.message == '' || $scope.message == undefined) {
            
            alert('Message is required');
            return false;
        }

       
        loading.active();

        var args = $.param({
                'name' : $scope.name,
                'email' : $scope.email,
                'message' : $scope.message
        })

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'cmsapi/send_contact_data',
            data: args 

        }).then(function (response) {
            
            res = response;
            
              if (res.data.status == 'success') {
                  console.log(res.data.status);

                  $scope.name = '';
                  $scope.email = '';
                  $scope.message = '';
                alert('Query has been submitted successfully')
                
            } else {
                
               alert('Error in contact');
            }  

        }).finally(function () {    
            loading.deactive();
        }); 

     }

});