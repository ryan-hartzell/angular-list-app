/**
 * Created by rhartzell on 4/8/16.
 */

app.controller('signupController', function ($scope, listService, $state, $mdToast) {

    $scope.addNewUser = function () {
        if ($scope.password !== $scope.passwordConfirm) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Your Passwords Need to Match!")
                    .position("bottom left")
                    .hideDelay(2500));
        }
        else {
            var newUser = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                userName: $scope.userName,
                password: $scope.password,
                email: $scope.email
            };

            if (!listService.createUser(newUser))
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Username Already Exists!")
                        .position("bottom left")
                        .hideDelay(2500));
            else
                $state.go('main')
        }
    }
});