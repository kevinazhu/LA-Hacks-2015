var chat_app = angular.module('loginApp',[]);

chat_app.controller('loginCtrl', function($scope) {
    // here's the App ID value from the portal:
    var appid = "7caf8bfa-47a2-4113-a899-1a4098174557";

    // create a client object using the App ID value from Step 2
    var client = respoke.createClient({
        appId: appid,
        developmentMode: true
    });

    $scope.connectionStatus = "Not Connected";

    // listen for the 'connect' event
    client.listen('connect', function () {
        $scope.connectionStatus = "Connected to Respoke!";
    });

    // now connect when the user clicks the 'Connect' button
    $scope.login = function() {
        var endpoint = $scope.form.username;
        client.connect({
            endpointId: endpoint // your username is the endpoint
        });
    };
});
