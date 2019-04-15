app.controller('view_product', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope,$window) {


    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        // $location.path("/login");
        // return false;
        var GlobalUID = '';
    }else{
        var GlobalUID = $cookieStore.get('userinfo').uid;//UID used for getting data from http request
    }

     
    $window.scrollTo(0, 0);
   
    if (!$cookieStore.get('productviewID')) {
        return false;
    }

    $scope.backtolist = function () {
        $rootScope.brand_data_page = '';
        $rootScope.price_filter = '';
        $rootScope.page = 1;
        window.history.back();
    }

    /**
     * Created By Nitin Kumar
     * Dated on 09/10/2018
     * Start of Function
     * function name : toProduct
     * on clicking back icon , render to the given path
     */
    $scope.toProduct = function () {
        window.history.back();
    }
    /**
     * End of Function
     */

    $scope.dataLoaded = false;
    $scope.productlist='';
    $scope.fetch_product_data = function () {
        $scope.loadproduct = 1;
        loading.active();
        $scope.pid = $cookieStore.get('productviewID');
        console.log($scope.pid);
        var args = $.param({
            'uid': GlobalUID,
            'pid': $cookieStore.get('productviewID'),
            'store_id': $cookieStore.get('storeinfo').store_id,
            'mid': uuid
        });
 
        loading.active();
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'itemcartapi/getProductdetail',
            data: args

        }).then(function (response) {
            //alert();
            
             console.log(response.data);
            if (response.data.status == 'success') {
                
                $scope.product_data = response.data;
                $scope.product_data_discount = response.data.discount;
                console.log($scope.product_data_discount)
                $scope.weight_data = $scope.product_data.weight_data;
                $scope.selectedprice = $scope.product_data.weight_data[0].wd_p_price;
                $scope.selectedoffprice = $scope.product_data.weight_data[0].wd_s_price;
                $scope.selectedweight = $scope.product_data.weight_data[0].wd_weight_id;
                $scope.productlist = $scope.product_data.related_product;
                $rootScope.newprice ="";
                
                $scope.myInterval = 3000;
                $scope.loadproduct = 0;
                $scope.slides = $scope.product_data.gallery_images
                $scope.dataLoaded = true;

            } else {

                alert("Sorry..No Data Found!");
            }
           
               

            
        }).finally(function(){
            loading.deactive();
        })
    }

    /**
     * End of Function
     */


    $scope.detailactive = function(){
        loading.active();

    }


    $scope.detaildeactive = function(){
        loading.deactive();
            
        }


    /**
     * Created By Nitin Kumar
     * Dated on 09/10/2018
     * Start of Function
     * function name : fetch_product_data
     * work on initialization and get the particular product data
     */
    // $scope.productPrice = '220.00';
    $scope.productpid = $cookieStore.get('productviewID');

    $scope.getvalueforOtherVarient = function (a, th) {

        console.log(a);
        // return
        weightID = $("#product_" + a + " option:selected").attr('data-weight_id');
        pid = $("#product_" + a + " option:selected").attr('data-product_id');
        $rootScope.varientCheck(weightID, $cookieStore.get('storeinfo').store_id, pid);
        console.log(weightID)
        console.log(pid)

    }

    $scope.product_view = function (productviewID) {
        $cookieStore.put('productviewID', productviewID);
        location.reload();
        $location.path('/product/view');
    }

});