app.controller('rewards', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {

if (!$cookieStore.get('userinfo')) {
    $location.path("/login");
    return false;
}

var inithit = false
$scope.myrewards = function(){
   
    loading.active();
        var args = $.param({
            uid: $cookieStore.get('userinfo').uid,
            page_no: 1,
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/profileapi/getloyaltypoints?uid='+$cookieStore.get('userinfo').uid+'&page_no=1',
            data: args //forms user object

        }).then(function (response) {
            loading.deactive();
            res = response;
            
            if (res.data.status == 'success') {
               
                $scope.referral_code = res.data.referral_code;
                $scope.loyality_points = parseFloat(res.data.total_loyalty_points);
                $scope.redeem_limit = parseFloat(res.data.redeem_limit);
                $scope.loyalty_data = (res.data.loyalty_data);
                inithit = true;
                $scope.rewardsPagination();
            } else {
                alert(res.data.responseStatus);
            }
            // console.log(response);

        }).finally(function () {
            //loading.deactive();
        })
}



$scope.reddempoints = function(){
    
    // console.log($scope.loyality_points+" "+$scope.redeem_limit);
    if($scope.loyality_points < $scope.redeem_limit){
        alert('You can not redeem now. Minimum point should be greater than '+$scope.redeem_limit);
        return false;
    }
  //  return;

    loading.active();
    var args = $.param({
        uid: $cookieStore.get('userinfo').uid,
        loyalty_point : $scope.loyality_points
    });

    $http({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        url: app_url + '/profileapi/redeem_points?uid='+$cookieStore.get('userinfo').uid+'&loyalty_point='+$scope.loyality_points,
        //data: args //forms user object

    }).then(function (response) {
        loading.deactive();
        res = response;
        console.log(res)
        //  alert("response from the server ");
        if (res.data.status == 'success') {
            alert('Points Redeem Successfully');
            $scope.myrewards();
        } else {
            alert('Error..Points not Redeem');
        }
        // console.log(response);

    }).finally(function () {
        //loading.deactive();
    })
    
}


 
$scope.rewardspage = 1;
$scope.rewardsPagination = function () {
    
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
            if ($scope.loyalty_data.length < 30) {
                //alert("Don't have further page");
            } else {
                var pageNo = $scope.rewardspage;
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
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'GET',
                    url: app_url + '/profileapi/getloyaltypoints?uid='+$cookieStore.get('userinfo').uid+'&page_no='+pageNo,
                    //data: args //forms user object
        
                }).then(function (response) {

                        res = response;

                        if (res.data.status == 'success') {

                            if (res.data.loyalty_data.length > 0) {
                                inithit = true;
                                $scope.rewardspage = pageNo;
                                angular.forEach(res.data.loyalty_data, function (value, key) {
                                    $scope.loyalty_data.push(value);
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


});