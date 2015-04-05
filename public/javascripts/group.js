var group_app = angular.module("groupApp", []);

var groupIDs = [1,2,3,4,5];

group_app.controller('groupCtrl', function($scope){
    console.log("hi");

    $scope.groups =
        [
            {
                name: 'Group 1',
                description: 'jagairoei pizsa',
                capacity: '1/10'
            },
            {
                name: 'Group 2',
                description: 'spegit nd meetbal',
                capacity: '2/10'

            },
            {
                name: 'Group 3',
                description: 'u sukkk saucege',
                capacity: '2/10'

            },
            {
                name: 'Group 4',
                description: 'niec dye',
                capacity: '3/10'

            },
            {
                name: 'Group 5',
                description: 'wat teh fukkersssss',
                capacity: '4/10'

            }
        ];

});

function makeGroup() {
    var groupName = document.getElementById('groupName').value;
    if(groupName === ""){
        alert("Group Name field required");
    }
    var groupDescription = document.getElementById('groupDescription').value;
    var maxUsers = document.getElementById('maxUsers').value;
    if(maxUsers === ""){
        alert("Please enter max number of users for your group");
    }
    if(maxUsers <= 0){
        alert("Please enter a positive max number of users");
    }

    var range = document.getElementById('range').value;


}