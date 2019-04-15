app.controller('address', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope,$route) {
    
    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
         return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid;  //UID used for getting data from http request
    
    

    $scope.toAddAddress = function(){
        $location.path("/address/add");
    }

    // function for back button on my account page created by sajal
    $scope.my_account = function(){
        $location.path("/myaccount/account");
    }
    
    /**
     * Created By Nitin Kumar
     * Dated on 05/10/2018
     * Start of Function
     * function name : address_init
     * work on initialization and get the address list
     */
    $scope.address_init = function () {
        loading.active();

       /*  var args = $.param({
            'uid' : $scope.user_id
        }) */
        //Get the Address List from LocalAPI    

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + 'itemcartapi/getAddress?uid=' +GlobalUID,
            //data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;           
        //   console.log(res);
            if (res.data.address.length > 0) {

                $scope.address = res.data.address;
                res.data.address.map(function (x, key) {
                    // console.log(x);
                    $cookieStore.put(x.ad_id, x);
                })
            } else {
                //alert("Sorry..No Data Found!");
            }
        })
    }

    // End of Address Initialization Function



    /**
     * created by Nitin
     * created on 08/10/2018
     * Function Name : edit_address
     * this function will show us the Edit Address Page
     */

    $scope.toEditAddress = function (ad_id) {
        $cookieStore.put('aid',ad_id);
        $location.path("/address/edit/:id=" + ad_id);
        // console.log(ad_id);
    }

    // End of Edit Address Function



    /**
     * created by Nitin
     * created on 08/10/2018
     * Function Name : delete_address
     * this function will delete the address according to the id
     */

    $scope.delete_address = function (ad_id) {
        
        // alert(ad_id);

        var args = $.param({
            'uid': GlobalUID,
            'aid': ad_id
        });
        //var isConfirmed = confirm("Are you sure to delete this record ?");

        $.confirm({            
            title: 'Delete!',
            content: 'Are You Sure!',
            buttons: {  
                confirm: function () {     
                    loading.active();               
                    $http({                        
                        headers: {
                            //'token': '40d3dfd36e217abcade403b73789d732',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        url: app_url + 'itemcartapi/deleteAddress',
                        data: args
                    }).then(function (response) {
                        loading.deactive();
                        // console.log(response);
                        if (response.data.status == "success") {
                            alert("Address Successfully Deleted");
                            $route.reload();
                        } else {
                            alert("Something went wrong.");
                        }
                    })
                },
                cancel: function () {
                    $.alert('Cancelled!');
                    $scope.address_init();
                }       
            }
        })

    }
    // End of Delete Address Function

});