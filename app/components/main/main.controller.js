/**
 * Created by rhartzell on 4/8/16.
 */

app.controller('mainController', function ($scope, listService, $state, $mdToast, $mdSidenav, $mdDialog) {

    var updateUser = function () {
        $scope.user = listService.getUser();
        $scope.listName = listService.getListName();
        $scope.currentList = listService.getCurrentList();
        $scope.lists = listService.getLists();
    };

    updateUser();

    $scope.addToList = function () {
        if ($scope.itemToAdd) {
            listService.addItem($scope.itemToAdd);
        }
        else {
            $mdToast.show($mdToast.simple()
                .textContent("You have to enter an item first!")
                .position("bottom left"));
        }
        $scope.itemToAdd = null;
    };

    $scope.toggleNav = function () {
        $mdSidenav('navigation').toggle();
    };

    $scope.removeFromList = function (item) {
        listService.removeItem(item);
        $mdToast.show($mdToast.simple()
            .textContent('"' + item.itemName + '"' + " Was Removed from Your Shopping List")
            .position("bottom left"));
    };

    $scope.selectList = function (listName) {
        if (!listService.selectList(listName)) {
            $mdToast.show($mdToast.simple().textContent(listName + " cannot be found"));
        }
        else {
            updateUser();
            $mdSidenav('navigation').close();
        }
    };

    $scope.createNewList = function (ev) {
        var newList = $mdDialog.prompt()
            .title('What would you like to call your new list?')
            .placeholder('to do, places to visit, etc...')
            .ariaLabel('New List Name')
            .targetEvent(ev)
            .ok('Create List')
            .cancel('Cancel');
        $mdDialog.show(newList).then(function (result) {
            listService.addList(result);
            listService.selectList(result);
            updateUser();
            $mdToast.show($mdToast.simple()
                .textContent("Created list \"" + result + "\""));
        })
    };

    $scope.signOut = function () {
        listService.signOut();
        $state.go('signin');
    };

    $scope.update = function () {
        listService.update();
    };

});