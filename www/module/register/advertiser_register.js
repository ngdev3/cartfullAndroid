app.controller('advertiser_register', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    $rootScope.initOneSignal();
    loading.deactive();

    // Advertiser Register Controller      
    if ($cookieStore.get('userinfo') != '' || $cookieStore.get('userinfo') != undefined) {
        if ($cookieStore.get('userinfo')) {
            var type = $cookieStore.get('userinfo').user_type;
            if (type == 3) {
                $location.path('/userhome');
            } else if (type == 4) {
                $location.path('/advertiser_home');
            }
        }
    }
    // initialize the function here to get country,state,city

    $scope.home = function () {
        //$location.path('/home');
        window.history.back();
    }

    $scope.card_type = function () {
        loading.active();
        var args = $.param({
            'api_key': api_key,
        });

        // Get the country from country master
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'auth/credit_card_type',
            data: args //forms user object

        }).then(function (response) {
            res = response;
            //console.log(res);
            if (res.data.responseCode == '200') {
                //put cookie and redirect it    
                $scope.credit_card_type = res.data.data;
            } else {
                model.show('Alert', res.data.responseMessage);
            }
        }).finally(function () {
            loading.deactive();
        });
    }

    $scope.advertise = function () {

        loading.active();
        var args = $.param({
            'api_key': api_key,
        });

        // Get the country from country master
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'auth/country',
            data: args //forms user object

        }).then(function (response) {


            res = response;
            //console.log(res);
            if (res.data.responseCode == '200') {
                //put cookie and redirect it    
                $scope.country = res.data.data;
                //console.log($scope.country);
            } else {

                //Throw error if not logged in
                //                alert(res.data.responseMessage);
                model.show('Alert', res.data.responseMessage);

            }


        }).finally(function () {
            loading.deactive();
        });

        // ends here 


        // Get the state from the state master

        $scope.getstate = function (countryid) {

            loading.active();
            var args = $.param({
                'api_key': api_key,
                'country_id': countryid
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'auth/statebycountryid',
                data: args //forms user object

            }).then(function (response) {

                res = response;
                //console.log( res);
                if (res.data.responseCode == '200') {
                    //put cookie and redirect it    
                    $scope.state = res.data.data;

                } else {

                    //Throw error if not logged in
                    //alert(res.data.responseMessage.error_msg);
                    $scope.state = '';
                    // alert(res.data.responseMessage)
                    model.show('Alert', res.data.data.error_msg);

                }


            }).finally(function () {
                loading.deactive();
            });
        }

        // End here


        // Get The city from city master

        $scope.getcitys = function (state_id) {

            loading.active();
            var args = $.param({
                'api_key': api_key,
                'state': state_id
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'auth/citybystateid',
                data: args //forms user object

            }).then(function (response) {

                res = response;
                //console.log( res);
                if (res.data.responseCode == '200') {
                    //put cookie and redirect it    
                    $scope.city = res.data.data;

                } else {

                    //Throw error if not logged in
                    //alert(res.data.responseMessage.error_msg);
                    $scope.city = '';
                    // alert(res.data.responseMessage)
                    model.show('Alert', res.data.data.error_msg);

                }


            }).finally(function () {
                loading.deactive();
            });
        }

        // Ends Here
        var year = new Date().getFullYear();
        var range = [];
        range.push(year);
        for (var i = 1; i < 20; i++) {
            range.push(year + i);
        }
        $scope.years = range;
        // $scope.currentMonth = new Date().getMonth() + 1;
        $scope.months = $locale.DATETIME_FORMATS.MONTH;





        // Check The validation on the form 

        $scope.advertise_form = function (form) {
            //alert();
            var res = '';
            //if fields are invalid
            if ($scope[form].$error) {
                var error_str = '';
                if ($scope[form].fname.$error.required !== undefined) {
                    error_str += "First Name, ";
                }
                if ($scope[form].lname.$error.required !== undefined) {
                    error_str += "Last Name, ";
                }
                if ($scope[form].cname.$error.required !== undefined || $scope[form].cname.$error.email) {
                    error_str += "Company Name, ";
                }
                if ($scope[form].email_id.$error.required !== undefined || $scope[form].email_id.$error.email) {
                    error_str += "Email Id, ";
                }
                if ($scope[form].address.$error.required !== undefined) {
                    error_str += "Address, ";
                }
                if ($scope[form].country_id.$error.required !== undefined) {
                    error_str += "Country Name, ";
                }
                if ($scope[form].creditcard_type.$error.required !== undefined) {
                    error_str += "Credit Card Type, ";
                }
                if ($scope[form].state_id.$error.required !== undefined) {
                    error_str += "State Name, ";
                }
                if ($scope[form].city_id.$error.required !== undefined) {
                    error_str += "City Name, ";
                }
                if ($scope[form].cnumber.$error.required !== undefined) {
                    error_str += "Card Number, ";
                }
                if ($scope[form].expmonth.$error.required !== undefined) {
                    error_str += "Expiry Month, ";
                }
                if ($scope[form].expyear.$error.required !== undefined) {
                    error_str += "Expiry Year, ";
                }
                if ($scope[form].cvvnum.$error.required !== undefined) {
                    error_str += "CVV Number, ";
                }
                if ($scope[form].password.$error.required !== undefined) {
                    error_str += "Password, ";
                }
                if ($scope[form].cpassword.$error.required !== undefined) {
                    error_str += "Confirm Password, ";
                }
                error_str = error_str.substr(0, error_str.lastIndexOf(', '));
                if (error_str !== '') {
                    error_str = " <span style='font-weight:700;'>Following fields must have valid information: </span><br/>" + error_str;
                    model.show('Alert', error_str);
                    //alert(error_str);
                    return false;
                }

                // Check the Password Field 

                if ($scope[form].$valid) {
                    var reg = /^[^%\s]{6,}$/;
                    var reg2 = /[a-zA-Z]/;
                    var reg3 = /[0-9]/;
                    var reg4 = /^[0-9]*$/;
                    var reg44 = /^[0-9]*$/;
                    var reg5 = /^[a-zA-Z]*$/;
                    var reg6 = /\S+@\S+\.\S+/;

                    if (reg.test($scope.password) == false) {
                        error_str = " Password should contain at least one character & one Number and length should be 6 minimum! ";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }
                    if (reg2.test($scope.password) == false) {
                        error_str = " Password should contain at least one character & one Number and length should be 6 minimum! ";
                        model.show('Alert', error_str);
                        // alert(error_str);
                        return false;
                    }
                    if (reg3.test($scope.password) == false) {
                        error_str = " Password should contain at least one character & one Number and length should be 6 minimum! ";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }
                    if (($scope.password) != ($scope.cpassword)) {
                        model.show('Alert', 'Confirm Password not matched ');
                        return false;
                    }

                    if (reg5.test($scope.fname) == false) {
                        error_str = " First Name Allow characters! ";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }
                    if (reg5.test($scope.lname) == false) {
                        error_str = " Last Name Allow characters!";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }

                    if (reg6.test($scope.email_id) == false) {
                        error_str = " Email Id not valid!";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }
                    if (reg4.test($scope.cnumber) == false) {
                        error_str = " Card Number accept only numbers! ";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }
                    if (reg44.test($scope.cvvnum) == false) {
                        error_str = " CVV Field accept only numbers! ";
                        model.show('Alert', error_str);
                        //alert(error_str);
                        return false;
                    }

                }
            }
            // Ends Here

            // Save The data into the database 

            if ($scope[form].$valid) {

                loading.active();
                var userdata = $cookieStore.get('advertiseform');

                //console.log(userdata); 

                var args = $.param({
                    'api_key': api_key,
                    first_name: $scope.fname,
                    last_name: $scope.lname,
                    company_name: $scope.cname,
                    email: $scope.email_id,
                    password: $scope.password,
                    confirm_password: $scope.cpassword,
                    address: $scope.address,
                    card_number: $scope.cnumber,
                    expiry_month: $scope.expmonth,
                    expiry_year: $scope.expyear,
                    cvv_number: $scope.cvvnum,
                    country_id: $scope.country_id,
                    state_id: $scope.state_id,
                    city_id: $scope.city_id,
                    card_type: $scope.creditcard_type,

                });



                $http({
                    headers: {
                        //'token': '40d3dfd36e217abcade403b73789d732',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: app_url + 'auth/advertiser_registration',

                    data: args //forms user object

                }).then(function (response) {

                    res = response;
                    //console.log(res);

                    if (res.data.responseCode == '200') {
                        //put cookie and redirect it  
                        //                        response.data.data.result

                        //$cookieStore.remove('register_step1');

                        $location.path('/login');
                        model.show('Info', 'Register Successfully');
                        //alert('Register Successfully');
                    } else {

                        //Throw error if not logged in
                        model.show('Alert', res.data.responseMessage.error_msg);
                        //alert(res.data.responseMessage.error_msg);
                        $location.path('/advertiser_register');
                    }


                }).finally(function () {
                    loading.deactive();
                });

            }
            // Ends here the save_data





        };

    }
    // Ends here initialize

});

