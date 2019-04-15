app.controller('productlist', function ($scope, $http, $location,$route, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    $rootScope.price_filter = '';
    $rootScope.brand_array = '';
    $rootScope.category_array = ''
    

    if (!$cookieStore.get('categoryInfo')) {
        //return false;
    }else{
        $scope.catName = $cookieStore.get('categoryInfo').categoryName;
    }

    $scope.backtopage = function(){
        if($cookieStore.get('from') == 'home'){
            $cookieStore.remove('from');
            $location.path('/dashboard/home');
        }else if($cookieStore.get('from') == 'category'){
            $cookieStore.remove('from');
            $location.path('/category');
        }else{
            $location.path('/dashboard/home');
        }
    }
    
    $scope.brand_array = [];
    $scope.Filtering = function (id) {
        //alert();
        if ($('#brand_' + id).prop("checked") == true) {
            console.log($scope.brands);
            brand_array = $scope.brand_array.push(id);
            console.log(brand_array)
        }
        else if ($('#brand_' + id).prop("checked") == false) {
        
            var index = $scope.brand_array.indexOf(id);
            $scope.brand_array.splice(index, 1);
        }
        $rootScope.brand_array = $scope.brand_array;

    } 
    

    /* $scope.category_array = [];
    $scope.catFiltering = function (id) {
        //alert();
        if ($('#cat_' + id).prop("checked") == true) {
            console.log($scope.category);
            category_array = $scope.category_array.push(id);
            console.log(category_array)
        }
        else if ($('#cat_' + id).prop("checked") == false) {
        
            var index = $scope.category_array.indexOf(id);
            $scope.category_array.splice(index, 1);
        }
        $rootScope.category_array = $scope.category_array;
        console.log($rootScope.category_array)

    }  */
    

    $scope.getvalueforOtherVarient = function (a, th) {

        
        weightID = $("#product_" + a + " option:selected").attr('data-weight_id');
        pid = $("#product_" + a + " option:selected").attr('data-product_id');
        $rootScope.varientCheck(weightID, $cookieStore.get('storeinfo').store_id, pid);
    }



$scope.price_fff = function(price_ids){
    $scope.price_filter = price_ids;
}

$scope.getProductprice =  function(form){
    $rootScope.price_filter = $scope.price_filter;
    $rootScope.getProductList();
}

});