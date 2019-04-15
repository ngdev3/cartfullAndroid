app.controller('orderdetails', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope, $cordovaFileTransfer) {

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid; //Global Uid for get the response by sending the http request.

    $rootScope.initOneSignal();
    loading.deactive();

    if (!$cookieStore.get('orderID')) {
        $location.path('/login');
    }

    $scope.home = function () {
        //$location.path('/home');
        window.history.back();
    }


    /**
     * Funtion: ordersDetalisInit from my_orders_details.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 10/10/2018 at 11:00am
     * Get the order details by sending the http request
     */


    $scope.ordersDetalisInit = function () {
        loading.active();

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/profileapi/getorderDetails?uid=' + GlobalUID + '&order_no=' + $cookieStore.get('orderID'),

        }).then(function (response) {

            res = response;

            if (res.data.status == 'success') {
               
                //console.log(res.data);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
                $location.path('/order/myorderdetails');
                $scope.myordersdetails = res.data;
               
                $scope.ship_charge = res.data.order_shippingcharge;
            //    console.log( $scope.payable_amount);
               
                if(res.data.is_wallet_used == 1){
                    $scope.paymentmode = res.data.order_paymentmode+', wallet';
                    // console.log($scope.paymentmode)
                }else{
                    $scope.paymentmode = res.data.order_paymentmode;
                    // console.log($scope.paymentmode)
                }
                $scope.productdetails = res.data.products;
                //$scope.payable_amt = (res.data.order_total-res.data.wallet_used_amount);
                $scope.payable_amount =Number(res.data.order_total) - (Number(res.data.promocode_amount) + Number(res.data.wallet_used_amount));
                $scope.savings = res.data.order_discount - res.data.promocode_amount ;
                console.log($scope.payable_amount);

            } else {

                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.status);
            }
            setTimeout(function(){

                loading.deactive();

            },200);

        })
    }

    $scope.downloadinvoice = function (invoicedatas, invoiceurl) {

        // alert(invoicedatas);
        var permissions = cordova.plugins.permissions;

        permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, function (status) {

            if (status.hasPermission) {

                if (invoicedatas == null) {
                    alert('Some Problem in Invoice');
                    return false;
                }

                document.addEventListener('deviceready', function () {
                    var url = $scope.myordersdetails.invoice_data.invoice_name;
                    var targetPath = cordova.file.externalDataDirectory + invoicedatas;
                    var trustHosts = true;
                    var options = {};
                    // alert(url);
                    // alert(targetPath);
                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                        .then(function (result) {
                            // Success!
                            //  alert('result' + JSON.stringify(result));
                            //$scope.error = result;
                            cordova.plugins.MediaScannerPlugin.scanFile(targetPath, successCallback, errorCallback);

                            function successCallback() {
                                $scope.urldata = url;
                                $scope.targeturl = targetPath;
                                //var ref = cordova.InAppBrowser.open('assets/foo.pdf', '_blank', 'location=no');
                                //alert('Download Completed Check File In Any Pdf Reader');
                                model.show('Alert',"Download Complete Please Open in any PDF viewer")
                                $scope.complete = 'Download Completed';
                            };

                            function errorCallback() {
                                alert('error');
                            };
                            cordova.exec(null, null, 'ScanMedia', 'mediaScanner', [result.nativeURL]);
                        }, function (err) {
                            alert(('err' + JSON.stringify(err)));
                            $scope.error = err;
                            // Error
                        }, function (progress) {
                            // alert(('progress' + progress));
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });
                }, false);
            } else {

                permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, success, error);

                function error() {
                    alert('Permission required !!! ');
                }

                function success(status) {
                    // alert(status)
                    if (!status.hasPermission) {
                        error();
                    } else {
                        $scope.downloadinvoice(invoicedatas);
                    }
                }


                //alert("No :( ");
            }

        });





    }
    /**
     * Created By Nitin Kumar
     * Dated on 17/10/2018
     * Start of Function
     * function name : orderAgain
     * work on clicking on Order Again and work using reorder API
     */
    $scope.orderAgain = function (no) {
        loading.active();

        var args = $.param({
            'uid': GlobalUID,
            'order_no': no,
            'device_type': "android"
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/profileapi/reorder',
            data: args

        }).then(function (response) {
            res = response;
            // console.log(res);
            if (res.data.status == 'success') {
                console.log(res);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
                $location.path('/cart');

            } else {
                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });
    }

    //End of Function


});