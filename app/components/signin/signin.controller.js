/**
 * Created by rhartzell on 4/8/16.
 */

app.controller('signinController', function ($scope, listService, $state, $mdToast) {

    $scope.logIn = function () {
        if ($scope.userName !== undefined) {
            if (!listService.fetchUser($scope.userName))
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Could not find user " + '"' + $scope.userName + '"')
                        .position("bottom left")
                        .hideDelay(3000));
            else if (!listService.logIn($scope.password))
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Incorrect password!")
                        .position("bottom left")
                        .hideDelay(2000));
            else
                $state.go('main')
        }
    }
});