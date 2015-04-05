var chat_app = angular.module('chatApp',[]);

chat_app.controller('chatCtrl', function($scope) {
    // here's the App ID value from the portal:
    var appid = "7caf8bfa-47a2-4113-a899-1a4098174557";

    // create a client object using the App ID value from Step 2
    var client = respoke.createClient({
        appId: appid,
        developmentMode: true
    });

    var group;
    var groupId = "test";
    $scope.groupName = '';
    $scope.user = user;

    // listen for the 'connect' event
    client.listen('connect', function () {
        console.log("CONNECTED");
        client.join({
            id: groupId,
            onSuccess: function (evt) {
                console.log('I joined', evt.id);
                group = evt;
                $scope.groupName = group.id;
                $scope.$digest();
            },
            onMessage: function(evt) {
                $("#messages").append(
                    "<li>" + evt.message.endpointId + ": " + evt.message.message + "</li>"
                );
            }
        });
    });

    client.connect({
        endpointId: user // your username is the endpoint
    });

    $("#sendMessage").click(function (){
        // grab the text to send
        var messageText = $("#textToSend").val();

        // send it
        group.sendMessage({ message : messageText });

        // show yourself the message
        $("#messages").append(
            "<li>" + $scope.user + ": " + messageText + "</li>"
        );

        // clear the text you just sent
        $("#textToSend").val('');
    });
});
