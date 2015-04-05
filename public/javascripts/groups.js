var group_app = angular.module("groupApp", []);
var TICKS_PER_MILE = .008689;
var lat;
var long;
var groupId;

group_app.controller('groupCtrl', function($scope, $http){
    if (navigator.geolocation)
    { navigator.geolocation.getCurrentPosition(showPosition); }
    else { console.log("Geolocation is not supported by this browser."); }

    function showPosition(position)
    {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        $scope.groups = [];
        $http.post('/querySQL', { queryName: 'SELECT * FROM GROUPS WHERE LBound < ' + long + " AND RBound > " + long +
                                                        "AND UBound < " + lat + " And DBound > " + lat + ";"})
            .success(function(data) {
                $scope.groups = data.queryResults;
            })
            .error(function(){
                console.log("POST ERROR");
            });
    }

    $scope.showLoginModal = function(index) {
        $('#loginModal').modal('show');
        groupId = index;
    };

    $('#loginModal').on('shown.bs.modal', function () {
        $('#username').focus();
    })
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
                console.log("Insert SQL POST Succeeded");
            })
            .error(function(){
                console.log("Insert SQL POST ERROR");
            });

        $('#loginModal').modal('show');
        groupId = groupName;
        
        $('#loginModal').on('shown.bs.modal', function () {
            $('#username').focus();
        })
    }
});

group_app.controller('loginCtrl', function($scope, $http) {
    $scope.login = function() {
        $http.post('/trytologin', {username: $scope.form.username, groupId: groupId})
        .success(function() {
            window.location = "/chat";
        })
        .error(function(){
            console.log("LOGIN POST ERROR");
        });
    }

    $(function() {
        $("#username").keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                $scope.login();
                return false;
            } else {
                return true;
            }
        });
    });
});
