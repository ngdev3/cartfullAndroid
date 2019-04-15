app.controller('home_products', function ($scope, $http, $location,$route, $interval, $cookieStore, model, $locale, loading, $rootScope) {

if($cookieStore.get('category_no')){

if($cookieStore.get('category_no') == '1'){
    $scope.productlist = $rootScope.catgory_list_a;
    $scope.cat_name = $rootScope.catgory_list_a_name;
}
else if($cookieStore.get('category_no') == '2'){
    $scope.productlist = $rootScope.catgory_list_b;
    $scope.cat_name = $rootScope.catgory_list_b_name;
}
else if($cookieStore.get('category_no') == '3'){
    $scope.productlist = $rootScope.catgory_list_c;
    $scope.cat_name = $rootScope.catgory_list_c_name;
}else{
    $scope.productlist = ''
}
  $cookieStore.remove('catgory_no');  
}
 

$scope.product_view = function (productviewID) {
    $cookieStore.put('productviewID', productviewID);
    $location.path('/product/view');
}

});    