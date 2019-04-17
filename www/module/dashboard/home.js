app.controller('home', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }


    if (!$cookieStore.get('storeinfo')) {
        $location.path('/store');
        return false;
    }

    $scope.toProfile = function () {
        $location.path('/myaccount/profile');
    }

    $scope.category = function () {
        $location.path('dashboard/category')
    }
    $scope.useroffers = function () {
        $location.path('/offers')
    }

    $scope.home = function () {
        //$location.path('dashboard/home')
        $route.reload()
    }
    $scope.notification = function () {

        $location.path('/notification')

    }

    $scope.signout = function () {
        $rootScope.DeleteData();
        $cookieStore.remove("userinfo");
        $cookieStore.remove("storeinfo");
        $location.path('/login');
    }

    $scope.subcategory = function (id) {
        $cookieStore.put('id', id);
        $location.path('/subcategory')

    }

/* Function For Hot Deals */

    $scope.hot_deals = function(){
        $cookieStore.put('id', 7);
        $location.path('/subcategory')
    }
    $scope.about_us = function(){
        $location.path('/about_us')
    }

    $scope.Contact_us = function(){
        $location.path('/contact')
    }

    $scope.categorydetails = function(id){
        $cookieStore.put('id', id);
        $location.path('subcategory')
    }


    $scope.store_location = $cookieStore.get('storeinfo').address; // this will get the Store Address which is saved by user
    // console.log($scope.store_location);

    $scope.list_category = function () {
        var getRes = $rootScope.getCategory();
        getRes.then(function (response) {
            console.log("Re")
            console.log(response)
            loading.deactive();
            res = response;
            // console.log(res);
            // console.log("-------------------------");
            if (res.data.response == 'success') {
                //put cookie and redirect it  
                //console.log(res.data.data)
                $scope.categories = res.data.data
            } else {
                model.show('Alert', res.data.responseMessage);
            }
        });
        var offers = $scope.getOffers();
        offers.then(function (response) {
           
            loading.deactive();
            res = response;
            console.log(res);
            if (res.data.status == 'success') {
               
                $scope.offers = res.data.data;
               
            } else {
                model.show('Alert', res.data.responseMessage);
            }
        });

        /* var saidenav = $scope.sidebar();
        saidenav.then(function (response) {

            console.log(response)
            loading.deactive();

            res = response;
            if (res.status == '200') {
                
                $scope.offers = res.data.data;
                //console.log($scope.offers)
            } else {
                model.show('Alert', res.data.responseMessage);
            }
        }); 
 */

    }




    $scope.getOffers = function () {
        return $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + 'bannerapi/offers_main',
        })
    }

    /* $scope.sidebar = function () {

        return  $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'GET',
                url: app_url + '/drawercategoryapi',
    
            })
        } */


    $scope.my_account = function () {

        $location.path('/myaccount/account');

    }

    $scope.my_cart = function () {
        $location.path('/cart');
    }
    $scope.back = function () {
        window.history.back();
    }

    $scope.allCategory = function () {
        $location.path('/dashboard/category');

    }

    $scope.product_list = function (productListID, categoryName) {

        var categoryInfo = {
            'categoryName': categoryName,
            'productListID': productListID
        }
        $cookieStore.put('categoryInfo', categoryInfo);

        $location.path('/product/list');
    }



    /**
     * Funtion: slider from home.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 12/10/2018 at 06:45pm
     * slider by sending the http request
     */

    $scope.slider = function () {

        loading.active();

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/bannerapi'
            //data: args 

        }).then(function (response) {

            res = response;

            if (res.data.response == 'success') {
                console.log(res.data.data)
                $scope.slider = res.data.data;
                $scope.sliderCount = res.data.count;
                //console.log($scope.slider)
                $location.path('/dashboard/home');
            } else {

                alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });



    }

    /* $scope.initAutocomplete =  function(){
            console.log("hellooo");
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -33.8688, lng: 151.2195},
              zoom: 13,
              mapTypeId: 'roadmap'
            });
    
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            console.log(searchBox);
    
            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
    
            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              console.log("in the listener");
              var places = searchBox.getPlaces();
              alert(places);
              if (places.length == 0) {
                return;
              }
    
              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];
    
              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
    
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));
    
                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });
          }
 */


    /**
     * Funtion: searchbar on ng-keyup from home.html
     * Name: Sajal Goyal
     * Created-on: 17/10/2018 at 12:00pm 
     * Get product on searching
     */
    $scope.searchbar = function () {
        $scope.datanotfound = false;
        $scope.resultstatus = false;
        $scope.searchresult = '';

        if (($scope.search.length >= 1) && ($scope.search.length < 3)) {
            $scope.resultstatus = true;
            return false;
        } else if ($scope.search.length == 0) {

            $scope.resultstatus = false;
            return false;
        }

         console.log($scope.search.length)
        loading.active();

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
            url: app_url + '/search/searchapi_result/?search_key=' + $scope.search+'&uid='+$cookieStore.get('userinfo').uid+'&mid='+uuid,
            //data: args

        }).then(function (response) {

            res = response;
            // console.log(res.data.data)

            if (res.data.total_record > 0) {
                $scope.searchresult = res.data.data;
                $scope.enableDiv = true;
            } else {
                // alert()
                $scope.resultstatus = false;
                $scope.searchresult = '';
                $scope.datanotfound = true;
            }

        }).finally(function () {
            loading.deactive();
        });



    }

    $scope.product_view = function (pid) {
        $cookieStore.put('productviewID', pid);
        $location.path('/product/view')
    }

});