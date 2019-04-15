app.controller('payment_summary', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {

    $rootScope.couponData = '';
    
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }
    if (!$cookieStore.get('paymentStatus')) {
        $location.path('/cart');
        return false;
    }
    // console.log($rootScope.shippingCartData);
    if ($rootScope.shippingCartData == undefined || $rootScope.shippingCartData == '') {
        alert('There is Some Problem in Payment Summary');
        $location.path('/cart');
        return false;
    }
    $scope.toAddressDetail = function () {
        $location.path("/addressdetail");
    }

    $scope.toCart = function () {
        $cookieStore.put('from','payment');
        $location.path("/cart");
    }

    $(document).on('focus', 'input',function(){
        //alert();
        $(".fixed_checkout_payment").hide();
     }).on('blur', 'input', function(){
        //alert();
        $(".fixed_checkout_payment").show();
       /*  $('#apply').on('click',function(){
            $scope.applyPromocode($('#inputpromo').val());
        }); */
        //angular.element(document.getElementById('apply')).scope().applyPromocode($('#inputpromo').val());
           
     });

    /**
     * Funtion: Payment Summary from payment_summary.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 22/10/2018 at 03:15pm
     * Get the Payment Summary by sending the http request
     */

    $scope.pay_summery = function () {

        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,

        })
        $http({

            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/userCartpayu',
            data: args

        }).then(function (response) {

            res = response;
            // console.log(res.data);
            if (res.data.status == 'success') {

                //console.log($scope.item)
                $location.path('/payment');

            } else {
                $scope.payment = res.data;
                alert('No Item in cart');
                $location.path('/payment');
            }

        }).finally(function () {
            loading.deactive();
        });


    }

    

    /**
     * Funtion: run on as soon as page loads
     * Created By: Nitin Kumar
     * Created-on: 26/10/2018 
     * if cookie is set then automatically bind the coupon already applied
     */
    $scope.form = {}; //made model object.property in html and this line will assign empty object,then use inside function
    if($cookieStore.get('promocodeData')){
        
        $scope.form.coupon = $cookieStore.get('promocodeData');
       
        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'distance': $cookieStore.get('storeinfo').store_distance,
            'promocode': $scope.form.coupon
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/applyPromo',
            data: args
        }).then(function (response) {
            loading.deactive();
            res = response;
            // console.log(res);

            if (res.data.status == "success") {
                $rootScope.couponData = res.data;               
                $('#inputpromo').attr("disabled", "disabled");
                $('#apply').removeClass('show').hide();
                $('#applied').removeClass('hide').show();
                $('#promoEdit').removeClass('hide').show();
                $scope.form.coupon = $cookieStore.get('promocodeData');
                // alert("Coupon Applied Successfully");
                // console.log($scope.couponData);
            } else {
                alert("Coupon Code is invalid");
            }
        })
    }
    

    $scope.enablebutton = function () {
        
        $('#promoEdit').removeClass('show').addClass('hide');
        $('#inputpromo').removeAttr('disabled')
        $('#apply').removeClass('hide').addClass('show');
        $('#applied').removeClass('show').addClass('hide');
        $scope.form.coupon = '';
        $rootScope.couponData = '';
        $cookieStore.remove('promocodeData');
    }
    


    /**
     * Funtion: applyPromocode
     * Created By: Nitin Kumar
     * Created-on: 25/10/2018 
     * Fetch the Promocode by sending the http request
     */
    $scope.form = {};
    $scope.applyPromocode = function (form) {

        //$rootScope.couponData = '';
         //console.log(form);return false;
        /*  if ($scope[form].coupon.$error.required !== undefined) {
           alert('Please enter your promo code.');
           return false;
        } 
        console.log($scope.form.coupon) */
        

         if($scope.form.coupon == '' || $scope.form.coupon == undefined){
            alert('Please enter your promo code.');
            return false;
        } 
 
        loading.active();
        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'distance': $cookieStore.get('storeinfo').store_distance,
            'promocode': $scope.form.coupon
        });
        // console.log(args);
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/applyPromo',
            data: args
        }).then(function (response) {
            loading.deactive();
            res = response;
            // console.log(res);

            if (res.data.status == "success") {
                $rootScope.couponData = res.data;
                $scope.promoValue = $scope.form.coupon;
                $cookieStore.put('promocodeData', $scope.form.coupon);

                $('#inputpromo').attr("disabled", "disabled");
                $('#apply').removeClass('show').hide();
                $('#applied').removeClass('hide').show();
                $('#promoEdit').removeClass('hide').show();

                alert("Promo Code Applied Successfully");
                // console.log($scope.couponData);
            } else {
                alert("Promo Code is invalid");
                $cookieStore.remove('promocodeData');
            }
        })
    }

    //End of Function

});