app.controller('myorders', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope, $route) {


    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid; //Global Uid for get the response by sending the http request.

    $rootScope.initOneSignal();
    loading.deactive();

    $scope.home = function () {
        //$location.path('/home');
        window.history.back();
    }

    $scope.orders = function () {
        $location.path('myaccount/account');
        //window.history.back();
    }


    /**
     * Funtion: ordersInit from my_orders.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:45pm
     * Get the order list by sending the http request
     */

    var inithit = false
    $scope.myorders= '';
    $scope.ordersInit = function () {

        loading.active();
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/profileapi/getOrders?uid=' + GlobalUID
            //data: args 

        }).then(function (response) {

            res = response;

            if (res.data.status == 'success') {

                //put cookie and redirect it    
                //model.show('Alert', res.data.status);
                //console.log(res.data);
                
                if (res.data.orders.length > 0) {
                    $scope.myorders = res.data.orders;
                    console.log($scope.myorders.length);
                    inithit = true;
                    $scope.orderPagination();
                    $location.path('/order/myorder');
                } else {
                    alert('No Orders Found');
                }
                setTimeout(function(){

                    loading.deactive();
    
                },200);
            } else {
                alert('No Orders Found');
                
            }

        }).finally(function () {
            loading.deactive();
        });


    }

    /**
     * created by Nitin
     * created on 16/10/2018
     * Function Name : deleteOrder
     * this function will delete the order according to the orderno
     */

    $scope.deleteOrder = function (no) {

        $.confirm({
            title: 'Cancel Order!',
            content: '' +
                '<form action="" id="id_form" class="formReason">' +
                '<div class="form-group">' +
                '<label>Reason</label>' +
                '<input type="text" placeholder="Enter Reason Here" id="cancel_order" class="name form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {

                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.name').val();
                       
                        if (name.trim() === "" || name === null) {
                            
                            $.alert('Please Provide the Reason');
                            return false;
                        }
                        loading.active();

                        var name = this.$content.find('.name').val(); //to get the prompt value

                        var args = $.param({
                            'uid': GlobalUID,
                            'order_no': no,
                            'reason': name
                        });

                        //alert(name);return false; 
                        if (name != "") {
                            $http({
                                headers: {
                                    //'token': '40d3dfd36e217abcade403b73789d732',
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                method: 'POST',
                                url: app_url + '/profileapi/cancelOrder',
                                data: args
                            }).then(function (response) {
                                
                                // console.log(response);
                                // return false;
                                // $.alert('Confirmed!');
                                if (response.data.status == "success") {
                                    alert("Order Successfully Cancelled");
                                    $scope.ordersInit();
                                    
                                } else {
                                    alert("Something went wrong.");
                                }
                                setTimeout(function(){

                                    loading.deactive();
                    
                                },100);
                            })
                        } else {
                            alert("Please Provide the Reason");
                            $scope.ordersInit();
                        }
                    }
                },
                cancel: function () {

                }
            }
        })
    }
    //End of Function

    $scope.orderDetails = function (orderID) {
        $cookieStore.put('orderID', orderID);
        $location.path('/order/myorderdetails');
    }

    
    $scope.orderpage = 1;
        $scope.orderPagination = function () {
            
            if($cookieStore.get('userinfo')){
                var user_id = $cookieStore.get('userinfo').uid
            }else{
                var user_id = '';
            }
            $(window).scroll(function () {
                var window_top = $(window).scrollTop();
                var div_top = $('#max-limitorder').offset().top;
                var div_height = $('#max-limitorder').outerHeight();
                // console.log(div_height)
                // console.log(div_top)
                // console.log(window_top)

                console.log("outside");
                 var sum = div_top + div_height+10 - window.innerHeight;
                 
                console.log(window_top + " " + sum + " outside");
                // console.log($scope.product.length);return;
                //if (window_top == sum) {
                    if((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 1)){
                    console.log("inside");
                    // alert("Reached the bottom");return;
                    if ($scope.myorders.length < 30) {
                        //alert("Don't have further page");
                    } else {
                        var pageNo = $scope.orderpage;
                        //   alert(pageNo);
    
                        if (pageNo > $scope.total_pageno) {
                            //alert("Don't have further page");
                            return
                        }

                        ++pageNo;
                       // window_top = 0;
                      console.log(pageNo)
                       if(inithit){
                        loading.active();
                        inithit = false
                            $http({
                                headers: {
                                    //'token': '40d3dfd36e217abcade403b73789d732',
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                method: 'GET',
                                url: app_url + '/profileapi/getOrders?uid=' + GlobalUID+'&page_no='+pageNo
                                //data: args 

                            }).then(function (response) {

                                res = response;

                                if (res.data.status == 'success') {

                                    //put cookie and redirect it    
                                    //model.show('Alert', res.data.status);
                                    //console.log(res.data);
                                    
                                    if (res.data.orders.length > 0) {
                                        inithit = true;
                                        $scope.orderpage = pageNo;
                                        angular.forEach(res.data.orders, function (value, key) {
                                            $scope.myorders.push(value);
                                            //$route.reload();
                                        });
                                    } else {
                                        //alert('No Orders Found');
                                    }
                                    setTimeout(function(){

                                        loading.deactive();
                        
                                    },200);
                                } else {
                                    //alert('No Orders Found');
                                    
                                }

                            }).finally(function () {
                                loading.deactive();
                            });
                        }
                    }
                } else {
    
                }
    
                /* }else{
                   if( paused ){
                      paused = false;
                  }  */
            });
        }
    
    
        /**
         * End of Function
         */
    
   
    $('text').on('keypress', function(e) {
        if (e.which === 32 &&  e.target.selectionStart === 0) {
          return false;
        }  
      });
    
});