app.controller('delivery_time', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {

    
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }
    if (!$cookieStore.get('paymentStatus')) {
        $cookieStore.put('from','payment');
        $location.path('/cart');
        return false;
    }
    var GlobalUID = $cookieStore.get('userinfo').uid;  //UID used for getting data from http request
    
   $scope.form ={};
    $scope.toPaymentMode = function (delivery_form) {

        var error_str = '';
        console.log($scope.form.icon)
        if($scope.form.icon == '' || $scope.form.icon == undefined){
            error_str += "Time Solts, ";
            alert('Please Select a Time Slot');
        }
        if (error_str == '') {

            $location.path("/payment/mode");
        }
    }

    $scope.toAddress = function () {
        $location.path("/addressdetail");
    }

    /* $scope.getDate = function(){
        loading.active();

        var args = $.param({
            'user_id' : GlobalUID
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'itemcartapi/deliverytimeslotold',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;           
            //return;
            console.log(res.data);
            str = res.data.daydate.replace(/,\s*$/, "");
            $scope.delivery_time = str.split(',');
            console.log($scope.delivery_time);
     
        })
    } */

    /**
     * Created By Nitin Kumar
     * Created on 22/10/2018
     * Start of Function
     * function name : getDeliveryTIme
     * work on initialization and will fetch Time Slots
     */
    $scope.getDeliveryTime = function () {
        loading.active();
        //alert();return;
        var args = $.param({
            user_id: GlobalUID,
            mid: uuid,
            device_type: device_type
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'itemcartapi/deliverytimeslot',
            data: args
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            //console.log(res);return;   
            $scope.updatedTimeSlot(res.data.timeslots[0].day_name)
            $scope.deliveryday = res.data.timeslots[0].day_name;
            $scope.delivery_day = res.data.timeslots;

            for (var i = 0; i < res.data.timeslots.length; i++) {
                $scope.delivery_time = res.data.timeslots[0].slots_array;
                //$scope.delivery_time = str.split(',');          
            }
            //console.log($scope.delivery_time); 

        })
    }

    //End of function 

    /**
     * Funtion: updatedTimeSlot from delivery_time.html on ng-change
     * Name: Sajal Goyal
     * Created-on: 24/10/2018 at 12:01pm
     * Get the time slot by sending the http request
     */

    $scope.updatedTimeSlot = function (day) {
        
        $scope.form.icon = '';
        loading.active();

        var args = $.param({
            'dayvalue': day
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/deliverytimeslot_daywise',
            data: args

        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            lengthOfSlots = res.data.slots.length;
            if (lengthOfSlots > 0) {
                $scope.dataFromTimeSlots = res.data.slots;
                console.log($scope.dataFromTimeSlots);
                  
            } else {
                alert('No Time Slots available at this day');
                $scope.dataFromTimeSlots = '';
                $scope.timeslots = '';
            }

        }).finally(function () {
            loading.deactive();
        });


    }

    /**
    * Funtion: TimeSlot from delivery_time.html on ng-change of timeslot
    * Name: Sajal Goyal
    * Created-on: 24/10/2018 at 02:30 pm
    * set the time & date in cookie so that it can send to payment mode.
    */
    $scope.TimeSlot = function (time, day) {
        var daytime = {
            'date': day,
            'time': time
        }
         console.log(daytime);
        $cookieStore.put('deliverydaytime', daytime)
    }

});