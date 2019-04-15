app.controller('address_edit', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope,$routeParams) {
     
    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
         return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid;  //UID used for getting data from http request
    
    

    $scope.backToAddress = function(){
        //$location.path("/address");
        window.history.back();
    }
    
/**
 * Created By Nitin Kumar
 * Dated on 08/10/2018
 * Start of Function
 * function name : address_edit_data
 * work on initialization and will fetch address based on id
 */
  $scope.address_edit_data = function(){
    loading.active();
    var paramid = $routeParams.id.split('=');
    // console.log("edit address init ");
     console.log($cookieStore.get(paramid[1]))
    $scope.address = $cookieStore.get(paramid[1]);

    $scope.fname = $scope.address.fname;
    $scope.mob_number = parseFloat($scope.address.mobileno);
    //console.log($scope.address.mobileno);
    $scope.house_no = $scope.address.plot_no;
    $scope.street = $scope.address.locality;
    $scope.city = $scope.address.city;
    $scope.landmark = $scope.address.landmark;
    $scope.pincode = parseInt($scope.address.pincode);
    $scope.address_type = $scope.address.title;
    $scope.state = $scope.address.state;
    $scope.form.othertype = $scope.address.address_title;
    loading.deactive();
    console.log($scope.address);

  }


  /**
 * Created By Nitin Kumar
 * Dated on 08/10/2018
 * Start of Function
 * function name : edit_address
 * this function will check the validation first and then update the address if all fields are correct
 */

 $scope.form = {};

  $scope.edit_address = function(form){
    
    var res = '';
    if ($scope[form].$error) {
        var error_str = '';

        if ($scope[form].fname.$error.required !== undefined) {
            error_str += "Full Name, ";
        }

         if ($scope[form].mob_number.$error.required !== undefined) {
            error_str += "Mobile Number, ";
        } 
        
        if ($scope[form].house_no.$error.required !== undefined) {
            error_str += "Address, ";
        } 

        if ($scope[form].street.$error.required !== undefined) {
            error_str += "Street, ";
        }
        if ($scope[form].city.$error.required !== undefined) {
            error_str += "City, ";
        }

        if ($scope[form].landmark.$error.required !== undefined) {
            error_str += "Landmark, ";
        }

        /* if ($scope[form].pincode.$error.required !== undefined || $scope[form].pincode.$error.number) {
            error_str += "Pincode, ";
        } */

        if ($scope[form].address_type.$error.required !== undefined) {
            error_str += "Address Type, ";
        }

        if ($scope[form].state.$error.required !== undefined) {
            error_str += "State, ";
        }

        if($scope.address_type == 'other'){
            
            if ($scope[form].othertype.$error.required !== undefined) {
                error_str += "Address Title, ";
            }
        }

    }
    setTimeout(function () {
        error_str = error_str.substr(0, error_str.lastIndexOf(', '));
        if (error_str !== '') {
            error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }
    }, 400);

    if($scope[form].$valid){            //if all field are filled then this will check pattern of input entered
        // alert("Success");
        var reg1 = /^[a-zA-Z ]+$/;
        //var reg2 = /^[A-za-z\d-\/]{2,10}$/;
        var reg3 = /[(a-zA-Z)?0-9 ]+/;
        var reg4 = /^[a-zA-Z ]{3,20}$/;
        var reg5 = /^[(a-zA-Z)?0-9 ]+$/;
        var reg6 = /^[0-9]{6}$/;
        var reg7 = /^[0-9]{10}$/;

        if (reg1.test($scope.fname) == false) {
            error_str = "Full Name should contain Alphabets Only";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }

         /* if (reg2.test($scope.house_no) == false) {
            error_str = "House Number should contain Numbers & Alphabets Only & Length should be between 2 to 10";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }  */

        if (reg7.test($scope.mob_number) == false) {
            error_str = "Mobile Number should contain Numbers Only & Length should be 10";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }

        /* if (reg3.test($scope.street) == false) {
            error_str = "Street should contain Alphabets & Numbers Only";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        } */

        if (reg4.test($scope.city) == false) {
            error_str = "City should contain Alphabets Only & length should be between 3 to 20";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }

        if (reg5.test($scope.landmark) == false) {
            error_str = "Landmark should contain Alphabets & Numbers Only";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }

       /*  if (reg6.test($scope.pincode) == false) {
            error_str = "Pin Code should contain Numbers Only & Length should be 6";
            // model.show('Alert', error_str);
            alert(error_str);
            return false;
        }  */
        
        //End of pattern checking


        if(error_str == ""){
            loading.active(); 
            var args = $.param({    
                'aid' : $scope.address.ad_id,
                'uid' : GlobalUID,        
                'fname': $scope.fname,
                'plot_no' : $scope.house_no,
                'mobileno': $scope.mob_number,
                'locality': $scope.street,
                'city': $scope.city,
                'landmark': $scope.landmark,
                'pincode': $scope.pincode,
                'state'  : $scope.state,
                'title' : $scope.address_type,
                'address_title' : $scope.form.othertype
            });
        
            //Edit Address from LocalAPI    

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method : 'POST',
                url : app_url + 'itemcartapi/editAddress',
                data : args   
                }).then(function(response){
                    //alert();
                    loading.deactive();
                    //res = response;
                    // console.log(response);
                    
                    if(response.data.status == 'success'){
                        alert("Updated Successfully"); 
                        //$location.path("/address"); 
                        window.history.back(); 
                                    
                    }else{
                        alert("Sorry..No Data Found!");
                    }
                })  
            }
        }       // End of $valid 
    }           // edit_address function ends    
});