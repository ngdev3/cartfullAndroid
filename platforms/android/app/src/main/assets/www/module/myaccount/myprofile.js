app.controller('myprofile', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $route) {

    if($cookieStore.get('from') == 'home'){
        $cookieStore.remove('from');
        $scope.backtohomepage = "home";
    }else{
       
        $scope.backtohomepage = "list";
    }


    $scope.maxDate = new Date();
    $scope.monthSelectorOptions = {
        format: "dd-MM-yyyy"
    }
    
    /**
    * This will check if user is registered with app or not , if not user will be redirected to login screen
    */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

   

    $scope.backtohome = function(){
        $location.path('/dashboard/home');
    }
    var GlobalUID = $cookieStore.get('userinfo').uid;  //UID used for getting data from http request

    $scope.location = $cookieStore.get('storeinfo').address;
    /* Upload adds link */

    $scope.upload_ad = function () {
        $location.path('/upload_ads');
    }

    $scope.my_account = function () {
        $location.path("myaccount/account");
    }
    
    $scope.reset = function(){
        $location.path("/changepassword");
    }

    /* End Upload adds link  Here*/

    /* Update Profile of advertiser Link Form */

    $scope.update_advertise_info = function () {
        $location.path('myaccount/advertise_up');
    }

    /* End Update Profile of advertiser Link Form */


    /* Change Password  for advertiser Link Form */

    $scope.changepassword_advertise = function () {
        $location.path('/changepassword');
    }
    /* get Profile data for perticular user id  */


    //Function to fetch the User's Data

    $scope.myprofile_data = function () {
        loading.active();
        //console.log("Profile data initialize")

        var args = $.param({
            'uid': GlobalUID
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'profileapi',
            data: args //forms user object

        }).then(function (response) {
            loading.deactive();
            res = response;
            // console.log(res);
            if (res.data.status == 'success') {
                console.log(response)
                //put cookie and redirect it    
                $scope.fname = res.data.name;
                $scope.email = res.data.email;
                $scope.mobile = res.data.mobile;
                $scope.form.dob = res.data.dob;
                $scope.image = res.data.image;
                $scope.gender = res.data.gender;
            } else {

                //Throw error if not logged in
                model.show('Alert', res.data.responseMessage);
            }
        });

    }

    /*Update user profile */
    $scope.form = {};
    $scope.update_profile = function (form) {
        var error_str = '';
        
        if ($scope[form].$error) {

            /* if ($scope[form].fname.$error.required !== undefined) {
                error_str += "Full Name, ";
            }
 */
            if ($scope[form].email.$error.required !== undefined || $scope[form].email.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].mobile.$error.required !== undefined) {
                error_str += "Mobile Number, ";
            }

            if ($scope[form].dob.$error.required !== undefined) {
                error_str += "Date of Birth, ";
            }
            
            if ($scope[form].gender.$error.required !== undefined) {
                error_str += "Gender, ";
            }
            /* if ($scope[form].location.$error.required !== undefined) {
                error_str += "Location, ";
            } */
        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                return false;
            }
        }, 400);
        if (error_str == '') {

            var reg1 = /[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}/;
            var reg2 = /[a-zA-Z_\s-]+$/;
            
            var date = ($scope.form.dob).split("-");

            if(date[0] > 31 || date[1] > 12){
                alert('Please insert valid Date');
                return false;
            }

            
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 
        var year = date.getFullYear();
        var currentDate = yyyy + '-' + mm + '-' + dd;

        var date = ($scope.form.dob).split("-").reverse().join("-");
            
            var d1 = Date.parse(currentDate);
            var d2 = Date.parse(date);

              if(d2 > d1){
                alert("Date of birth should be less then today's Date");
                return false;
            }  
            if (reg1.test($scope.form.dob) == false) {
                error_str = "Date Format Is Wrong";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            if (reg2.test($scope.fname) == false) {
                error_str = "Please Fill Valid Name";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            loading.active();
            var args = $.param({
                uid: GlobalUID,
                email: $scope.email,
                mobile: $scope.mobile,
                dob: $scope.form.dob,
                gender: $scope.gender,
                name: $scope.fname,
               /*  location: $scope.location, */
            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'profileapi/updateProfile',
                data: args //forms user object

            }).then(function (response) {
                loading.deactive();
                res = response;

                console.log("response from the server ");
                console.log(response);

                if (res.data.status == 'success') {
                   
                    //console.log("Profile updated")
                    model.show('Alert', 'Profile Updated Successfully');
                    $route.reload();
                    //$location.path('/dashboard/home');
                    
                } else {

                    //Throw error if not logged in

                    model.show('Alert', res.data.responseMessage);
                    $location.path('/dashboard/myprofile');
                }
            }).finally(function () {
                //loading.deactive();
            })
        }
    }

  
    $scope.profile_update = function(files){
        
      
        //console.log(files)
         this.files = event.target.files;
         var profile_image = this.files[0].name;	
        
        console.log(profile_image)
        loading.active();
        
        // return false
        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'file' : profile_image
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded' //'multipart/form-data' 
            },
            method: 'POST',
            url: app_url + '/profileapi/update_profile_image',
            data: args
        }).then(function (response) {  
            loading.deactive();
            console.log(response)    
        })
    }
});

