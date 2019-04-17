app.controller('fetch', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {

    //this cookieStore will check if user is logged in or not 
    
    /* if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    } */

    $scope.backToHome = function () {
        $location.path('/dashboard/home');
    }

    if($cookieStore.get("storeinfo")){
        $scope.pickup_location = $cookieStore.get("storeinfo").address;
    }


    /* var address = place.formatted_address;
        var words = address.split(",");

        if(words.length < 5){
            alert("Please provide proper address");
            return false;
        } */

    /**
     * created on : 24/10/2018
     * created by : Nitin kumar
     * function name : getStore
     * this function will get the store id based on user's selected location 
     * if store is available then id & name is stored in the cookie else alert msg will be shown to the user to select other location
     */

    if($cookieStore.get("storeinfo")){
        var addressinfo = $cookieStore.get("storeinfo").address;
    }else{
        var addressinfo = "";
    }


    $scope.getStore = function (form) {
               
        // console.log($scope.pickup_location);return;
        // loading.active();
        /* if(lat !== undefined || lng !== undefined){
            alert("Please Select Proper Location");
        } */

        if ($scope[form].$error) {
            var error_str = '';

            if ($scope[form].pickup_location.$error.required !== undefined) {
                error_str += "Location";
                alert("Location Field must have valid information");
            }
        }


        if($scope.pickup_location == addressinfo){
            $scope.pickup_location = addressinfo;

        }else if($scope[form].pickup_location.$dirty){
            
            var words = components.split(",");    
            if(words.length < 4){
                alert("Please provide full address");
                $scope.pickup_location = "";
                return false;
            }else{
                $scope.pickup_location = components;                
                // alert($scope.pickup_location);return;
            }
        }

        if (error_str == '') {
            loading.active();
            
            var args = $.param({
                'latitude': lat,
                'longitude': lng
            });

            
            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/itemcartapi/getlocationapi',
                data: args

            }).then(function (response) {

                res = response;
                //console.log(res); return; 
                // alert($scope.pickup_location);return;  
             //   alert('1');
                if($scope.pickup_location == addressinfo){
                        // console.log("--------------");
                      //  alert('11'); 
                        $location.path("/dashboard/home");
                    }else{
                      //  alert('111');
                        // console.log("aaaaaaaaaaaaaaaaaaaaaaa");return ;
                        if (res.data.status == 'pass') {
        
                            var storeinfo = {
                                'store_id': res.data.store_id,
                                'store_name': res.data.store_name,
                                'address': $scope.pickup_location,
                                'store_distance': res.data.store_distance,
                                'store_city' : res.data.store_city,
                                'store_state' : res.data.state_name,
                                'lat': lat,
                                'lng': lng,
                            }
                            $cookieStore.put('storeinfo', storeinfo);
                            console.log($cookieStore.get('storeinfo'));
                            lat = "";
                            lng = "";
                            $location.path('/dashboard/home');
        
                        } else {
                            alert("Sorry..We Don't serve in this location");
                            lat = "";
                            lng = "";
                            return false;
                        }
                    }        

            }).finally(function () {
                loading.deactive();
            });
        }
    }
    //End of Function

});