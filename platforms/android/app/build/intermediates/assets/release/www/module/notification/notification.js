app.controller('notification', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    //alert()
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }
    $rootScope.initOneSignal();
    loading.deactive();

    $scope.notify = function (form) {
        loading.active();

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/profileapi/notifications?mid=' + uuid,
            //data: args 

        }).then(function (response) {

            res = response;

            if (res.data.data != '') {
                lengthOfSlots = res.data.data.length;
                $scope.notificationdata = res.data.data;
                $location.path('/notification');
            } else {

                lengthOfSlots = res.data.data.length;
                $scope.notificationdata = res.data.data;
                //  alert('No Data');
            }

        }).finally(function () {
            loading.deactive();
        });


    };
});