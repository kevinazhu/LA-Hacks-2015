var group_app = angular.module("groupApp", []);
var TICKS_PER_MILE = .008689;
var lat;
var long;


group_app.controller('groupCtrl', function($scope, $http){
    if (navigator.geolocation)
    { navigator.geolocation.getCurrentPosition(showPosition); }
    else { console.log("Geolocation is not supported by this browser."); }

    function showPosition(position)
    {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        console.log("Making post now");
        $scope.groups = [];
        $http.post('/querySQL', { queryName: 'SELECT * FROM GROUPS WHERE LBound < ' + long + " AND RBound > " + long +
                                                        "AND UBound < " + lat + " And DBound > " + lat + ";"})
            .success(function(data) {
                console.log("POST Succeeded");
                $scope.groups = data.queryResults;
                console.log($scope.groups);

            })
            .error(function(){
                console.log("POST ERROR");
            });
    }

    $scope.showLoginModal = function() {
        $('#myModal').modal('show')
    };
});

group_app.controller('makeGroupCtrl', function($scope, $http){
    $scope.makeGroup = function() {
        var groupName = document.getElementById('groupName').value;
        if(groupName === ""){
            alert("Group Name field required");
            return;
        }

        console.log(lat +  " and "  + long);
        var groupDescription = document.getElementById('groupDescription').value;


        var range = document.getElementById('range').value;
        var LBound = long - range * TICKS_PER_MILE;
        var RBound = long + range * TICKS_PER_MILE;
        var UBound = lat - range * TICKS_PER_MILE;
        var DBound = lat + range * TICKS_PER_MILE;

        $http.post('/insertSQL', { name: groupName, description: groupDescription, LBound:LBound, RBound:RBound, UBound:UBound, DBound:DBound})
            .success(function() {
                //window.location = "/chat";
                console.log("POST Succeeded");
            })
            .error(function(){
                console.log("POST ERROR");
            });
    }
});

group_app.controller('loginCtrl', function($scope, $http) {
    $scope.login = function() {
        $http.post('/trytologin', {username: $scope.form.username})
        .success(function() {
            window.location = "/chat";
        })
        .error(function(){
            console.log("LOGIN POST ERROR");
        });
    }
});
