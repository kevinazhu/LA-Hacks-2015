var chat_app = angular.module('chatApp',[]);

chat_app.controller('chatCtrl', function($scope, $http) {
    var client = respoke.createClient();

    $http.get('/token')
    .success(function(data) {
        console.log("Got Token");
        client.connect({
            token: data.token // your username is the endpoint
        });
    })
    .error(function(){
        console.log("TOKEN POST ERROR");
    });

    var group;
    var groupId = "test";
    $scope.groupName = '';
    $scope.user = user;

    // listen for the 'connect' event
    client.listen('connect', function () {
        console.log("Connected to Respoke");
        client.join({
            id: groupId,
            onSuccess: function (evt) {
                console.log('I joined', evt.id);
                group = evt;
                $scope.groupName = group.id;
                $scope.$digest();
            },
            onMessage: function(evt) {
                if(evt.message.message != "")
                {
                    $("#messages").append(
                        "<li>" + evt.message.endpointId + ": " + evt.message.message + "</li>"
                    );
                }
            }
        });
    });

    $(function() {
        $("#textToSend").keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                $scope.sendMessage();
                return false;
            } else {
                return true;
            }
        });
    });

    $scope.sendMessage = function() {
        // grab the text to send
        var messageText = $("#textToSend").val();
        if(messageText != "")
        {
            // send it
            group.sendMessage({ message : messageText });

            // show yourself the message
            $("#messages").append(
                "<li>" + $scope.user + ": " + messageText + "</li>"
            );
        }
        // clear the text you just sent
        $("#textToSend").val('');
    };
});
