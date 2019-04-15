app.controller('cart', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter, $route) {

    $cookieStore.remove('promocodeData');

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    if ($cookieStore.get('paymentStatus')) {
        $cookieStore.remove('paymentStatus');
    }

    if($cookieStore.get('from') == 'payment'){
        $scope.backtogo = true;
        $cookieStore.remove('from');
    }
    $scope.homePage = function () {
        $location.path('/dashboard/home');
    }

    $rootScope.backbycon = function () {
        loading.active();
        $rootScope.page = 1;
        window.history.back();
        loading.deactive();
    }

     $scope.backtohome = function () {
        $location.path('/dashboard/home');
    } 
    
    $scope.product_view = function (productviewID) {
        $cookieStore.put('productviewID', productviewID);
        $location.path('/product/view');
    }

    $scope.singleDelete = function (weightID) {
        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'weightid': weightID
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/deleteItem',
            data: args

        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response.data;
            console.log(res);
            if (res.status == 'deleted') {
                alert('Product Deleted Successfully')
                $rootScope.usercartvalue();
            } else {
                alert('Item Not Deleted ')
            }
        })

    }


    $scope.paymentsummary = function () {
        
          if($rootScope.currentcartprice.cart_subtotal < 200){
           alert('Minimum Amount Should Greater Than Rs. 200');
           return;
       }  
        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'distance': $cookieStore.get('storeinfo').store_distance
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/usercheckout',
            data: args

        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response.data;
            if(response.data.error == false)
            {
                $rootScope.shippingCartData = response.data;
                $cookieStore.put('paymentStatus', 'true')
                $location.path('/payment');
            }else{
                alert('Error in cart');
            }
           
            
        })


    }

    /**
     * Funtion: empty_cart from cart.html on ng-click
     * Name: Sajal Goyal
     * Created-on: 26/10/2018 at 04:00pm
     * Empty the cart
     */


    $scope.empty_cart = function () {
        if ($rootScope.currentcartitems.length == 0) {
            model.show('Info', 'You Have No Items In Your Shopping Cart.')
            return false;
        }
        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'device_type': device_type
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/clearCart',
            data: args

        }).then(function (response) {
            loading.deactive();
            res = response.data;

            if (res.error == false) {
                $route.reload()
            } else {
                alert('Error Occured')
            }

        })

    }
});