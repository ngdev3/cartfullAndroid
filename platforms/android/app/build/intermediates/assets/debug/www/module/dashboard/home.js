app.controller('home', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {

     $rootScope.page = 1;
     $rootScope.seacrh_key_val = '';
     $rootScope.brand_data_page = '';
     $rootScope.price_filter = '';

     if (!$cookieStore.get('userinfo')) {
        //$location.path('/login');
        //return false;
        $scope.loggedin = false;
        var uid = '';
    }else{ 
        $scope.loggedin = true;
        var uid = $cookieStore.get('userinfo').uid;
        $scope.username = $cookieStore.get('userinfo').username;
        if($cookieStore.get('userinfo').image == Profile_path){
            $scope.image = '';
        }else{
            console.log($cookieStore.get('userinfo').image)
            console.log(Profile_path)
            $scope.image = $cookieStore.get('userinfo').image;
        }
    }


    if (!$cookieStore.get('storeinfo')) {
        $location.path('/store');
        return false;
    }

    $scope.check_list = function() {
        if($scope.enableDiv == true){
            $scope.enableDiv = false;
            $scope.search = '';
        }
    }
      
    $scope.toLocationFetch = function () {
        $location.path('/store');
    }

    $scope.category = function () {
        $location.path('dashboard/category')
    }
    $scope.useroffers = function () {
        $location.path('/offers')
    }

    $scope.toprofile =  function(){
        $cookieStore.put('from','home');
        $location.path('/myaccount/profile');
    }

    $scope.home = function () {
        //$location.path('dashboard/home')
        $route.reload()
    }
    $scope.notification = function () {

        $location.path('/notification')

    }

   
    
    $scope.contact_us = function() {
        $location.path('/contact_us')
    }

    $scope.signout = function () {
        $rootScope.DeleteData();
        $cookieStore.remove("userinfo");
        $cookieStore.remove("storeinfo");
        $location.path('/login');
    }

    $scope.subcategory = function (id) {
        $cookieStore.put('id', id);
        //$cookieStore.put('from','home');
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
    $scope.policy = function(){
        $location.path('/policy')
    }

    $scope.categorydetails = function(id){
        $cookieStore.put('id', id);
        $location.path('subcategory')
    }

    $scope.store_location = $cookieStore.get('storeinfo').address; // this will get the Store Address which is saved by user
    // console.log($scope.store_location);

    $scope.list_category = function () {
        var getRes = $rootScope.getCategory();
        $scope.loading_hit = 1;
        getRes.then(function (response) {
            console.log("Re")
            console.log(response)
            
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
           
            
            res = response;
            console.log(res);
            if (res.data.status == 'success') {
               
                $scope.offers = res.data.data;
               
            } else {
                model.show('Alert', res.data.responseMessage);
            }
        });
         var bannerFooter = $scope.bannerFooter();
         bannerFooter.then(function (response) {

            console.log(response.data)
           
            

            res = response;
            if (res.data.banner_data) {
                $scope.banner_top_data = res.data.banner_data.banner_top_data;
                $scope.banner_left_data = res.data.banner_data.banner_left_data;
                $scope.banner_bottom_data = res.data.banner_data.banner_bottom_data;
                
            } else {
                alert('Error in footer banners');
            }
        });
        var homecategory = $scope.homecategory();
         homecategory.then(function (response) {
            //loading.deactive();
            res = response;
            if (res.data.status == 'success') {
                console.log(response.data.catgory_list[1])
                $scope.catdata1 = response.data.catgory_list[1];
                $scope.catdata4 = response.data.catgory_list[4];
                $scope.catdata21 = response.data.catgory_list[21];
                $scope.catdata10 = response.data.catgory_list[10];
                
                $scope.catgory_list = res.data.catgory_list;
                if(res.data.catgory_list[1]){
                $scope.catgory_list_a = res.data.catgory_list[1].products;
                $scope.catgory_list_a_name = res.data.catgory_list[1].name;
                }
                if(res.data.catgory_list[4]){
                $scope.catgory_list_b = res.data.catgory_list[4].products;
                $scope.catgory_list_b_name = res.data.catgory_list[4].name;
                }
                if(res.data.catgory_list[21]){
                $scope.catgory_list_c = res.data.catgory_list[21].products;
                $scope.catgory_list_c_name = res.data.catgory_list[21].name;
                }
                if(res.data.catgory_list[10]){
                    $scope.catgory_list_d = res.data.catgory_list[10].products;
                    $scope.catgory_list_d_name = res.data.catgory_list[10].name;
                }
                
                $scope.slickConfig2Loaded = true;
                $scope.slickConfig2 = {
                  method: {},
                  dots: false,
                  infinite: false,
                  speed: 300,
                   autoplay:false,
                   autoplaySpeed:3000,
                   arrows:false,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        infinite: false,
                        dots: false,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                    {
                      breakpoint: 360,
                      settings: {
                        slidesToShow: 2,
                      }
                    }
                  ]
                };

                console.log( $scope.catgory_list_a) 
            } else {
               alert('Something went wrong');
            }
        }); 
        var footer_brand = $scope.footer_brand();
        footer_brand.then(function (response) {
            //loading.deactive();
            res = response;
            console.log(response);
            if (res.data.status == 'success') {
                
                $scope.footerbrands = res.data.data;
                $scope.slickConfig3Loaded = true;
                $scope.slickConfig3 = {
                  method: {},
                  dots: false,
                  infinite: true,
                  speed: 500,
                   autoplay:true,
                   autoplaySpeed:3000,
                   arrows:false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  margin:true,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 1,
                        infinite: true,
                        dots: false,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 360,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    }
                  ]
                };
            } else {
               //alert('Something went wrong');
            }  
            setTimeout(function(){
                $scope.loading_hit = 0;
                loading.deactive();

            },1500);
        })

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

     $scope.homecategory = function () {
      
        return  $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'GET',
                url: app_url + '/bannerapi/catgory_list_site_page?uid='+uid+'&mid='+uuid+'&store_id='+$cookieStore.get('storeinfo').store_id,
                //data : args
            })
        } 


        $scope.footer_brand = function () {
      
            return  $http({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: app_url + '/bannerapi/brand_footer',
                    //data : args
                })
            }

     $scope.bannerFooter = function () {
      loading.active();
        return  $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'GET',
                url: app_url + '/bannerapi/banner_images',
                //data : args
            })
        } 


    $scope.my_account = function () {

        $location.path('/myaccount/account');

    }

    $scope.my_cart = function () {
        if(!$cookieStore.get('userinfo')){
            alert('Please login First');
            $location.path('/login');
        }
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
        //console.log(categoryInfo);return;
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

                $scope.slickConfig1Loaded = true;
                $scope.slickConfig1 = {
                  method: {},
                  dots: false,
                  infinite: true,
                  speed: 500,
                   autoplay:true,
                   autoplaySpeed:5000,
                   arrows:false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 1,
                        infinite: true,
                        dots: false,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                      }
                    },
                    {
                      breakpoint: 360,
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                  ]
                };



                $scope.sliderCount = res.data.count;
                console.log($scope.slider)
                $location.path('/dashboard/home');
            } else {

                alert(res.data.status);
            }

        })/* .finally(function () {
            loading.deactive();
        }); */



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
            url: app_url + '/search/searchapi_result/?search_key=' + $scope.search+'&uid='+uid+'&mid='+uuid+'&page_no='+'1',
            //data: args

        }).then(function (response) {

            res = response;
            // console.log(res.data.data)

            if (res.data.total_record > 0) {
                $scope.total_record = res.data.total_record;
                $scope.searchresult = res.data.data;
                $rootScope.search_result = $scope.searchresult;
                $scope.enableDiv = true;
                //$rootScope.scroll_search();
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

    $scope.product_view = function (pid) {
        $cookieStore.put('productviewID', pid);
        $location.path('/product/view')
    }

});