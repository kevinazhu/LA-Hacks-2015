var login_app = angular.module('loginApp',[]);

login_app.controller('loginCtrl', function($scope, $http) {
    $scope.login = function() {
        $http.post('/trytologin', {username: $scope.form.username})
            .success(function() {
                window.location = "/chat";
            })
            .error(function(){
                console.log("POST ERROR");
            });
    }
});
