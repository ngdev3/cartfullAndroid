app.controller('category', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    $rootScope.page = 1;
    $scope.enableDiv = false;
    if (!$cookieStore.get('userinfo')) {
        // $location.path("/login");
        // return false;
       var uid= '';
       $scope.loggedin = false;
    }else{
        $scope.loggedin = true;
       var uid= $cookieStore.get('userinfo').uid
    }

    $scope.my_account = function () {
        $location.path('/myaccount/account');
    }

    $scope.check_list = function() {
        if($scope.enableDiv == true){
            $scope.enableDiv = false;
            $scope.search = '';
        }
    }

    $scope.subcategory = function (id) {
        // console.log(id)
        $cookieStore.put('id', id);
        $cookieStore.put('from','category');
        $location.path('subcategory')

    }

    $scope.category_data = function () {

        // console.log("category init")
        var allCategory = $rootScope.getCategory();
        allCategory.then(function (response) {
            loading.deactive();
            res = response;
            if (res.status == '200') {
                // console.log(res.data.data)
                $scope.allCategories = res.data.data
            } else {
                model.show('Alert', res.data.responseMessage);
            }
            
        });

    }

    /**
     * Funtion: searchbar on ng-keyup from category.html
     * Name: Sajal Goyal
     * Created-on: 23/10/2018 at 04:00pm 
     * Get product on searching
     */
    $scope.searchbar = function () {
        $scope.datanotfound = false;
        $scope.resultstatus = false;
        $scope.searchresult = '';
        $scope.enableDiv = false;
        
        if (($scope.search.length >= 1) && ($scope.search.length < 3)) {
            $scope.resultstatus = true;
            return false;
        } else if ($scope.search.length == 0) {

            $scope.resultstatus = false;
            return false;
        }

         console.log($scope.search.length)
         $('#searchloder').addClass('show').removeClass('hide');
         $rootScope.search_val = $scope.search;
        /* var args = $.param({
            'search_key': $scope.search,
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid
        }) */
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/search/searchapi_result/?search_key=' + $scope.search+'&uid='+uid+'&mid='+uuid,
            //data: args

        }).then(function (response) {

            res = response;
            // console.log(res.data.data)

            if (res.data.total_record > 0) {
                $scope.total_record = res.data.total_record;
                $scope.searchresult = res.data.data;
                $rootScope.search_result = $scope.searchresult;
                $scope.enableDiv = true;
                $rootScope.scroll_search();
            } else {
                // alert()
                $scope.resultstatus = false;
                $scope.searchresult = '';
                $scope.datanotfound = true;
            }

        }).finally(function () {
            $('#searchloder').addClass('hide').removeClass('show');
        });



    }


    /*   $scope.product_list = function (productListID, categoryName) {

          var categoryInfo = {
              'categoryName': categoryName,
              'productListID': productListID
          }
          $cookieStore.put('categoryInfo', categoryInfo);

          $location.path('/product/list');
      } */
    $scope.product_view = function (pid) {
        $cookieStore.put('productviewID', pid);
        $location.path('/product/view')
    }




});