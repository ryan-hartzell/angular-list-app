/**
 * Created by rhartzell on 4/8/16.
 */

app.factory('listService', function () {

    var service = {};

    var _userData = {};

    service.createUser = function (newUser) {
        if (JSON.parse(window.localStorage.getItem(newUser.userName)))
            return false;

        _userData.firstName = newUser.firstName;
        _userData.lastName = newUser.lastName || "";
        _userData.userName = newUser.userName;
        _userData.password = newUser.password;
        _userData.email = newUser.email;
        _userData.listName = 'Groceries';
        _userData.currentList = [];
        _userData.lists = ['Groceries'];
        saveList('Groceries', []);

        saveUser(newUser.userName);
        return true;
    };

    service.addItem = function (item) {
        if (_userData) {
            _userData.currentList.push({itemName: item, checked: false});
            saveUser(_userData.userName);
            saveList(_userData.listName, _userData.currentList);
        }
    };

    service.addList = function (listName) {
        if (listName)
            _userData.lists.push(listName);
        saveUser(_userData.userName);
        saveList(listName, []);
    };

    var saveList = function (listName, list) {
        window.localStorage.setItem("_" + _userData.userName + listName, JSON.stringify(list));
    };

    var saveUser = function (userName) {
        window.localStorage.setItem(userName, JSON.stringify(_userData));
    };

    service.getUser = function () {
        return {
            firstName: _userData.firstName,
            lastName: _userData.lastName,
            email: _userData.email
        }
    };

    service.getCurrentList = function () {
        return _userData.currentList;
    };

    service.getListName = function () {
        return _userData.listName;
    };

    service.getLists = function () {
        return _userData.lists;
    };

    service.signOut = function () {
        if (Object.keys(_userData).length !== 0) {
            saveUser(_userData.userName);
            _userData = {};
        }
    };

    service.update = function () {
        saveUser(_userData.userName);
        saveList(_userData.listName, _userData.currentList);
    };

    service.removeItem = function (item) {
        if (_userData) {

            for (var i = 0; i < _userData.currentList.length; i++) {
                if (_userData.currentList[i].itemName === item.itemName && _userData.currentList[i].checked === item.checked)
                    break;
            }
            _userData.currentList.splice(i, 1);
            saveUser(_userData.userName);
            saveList(_userData.listName, _userData.currentList);
        }
    };

    service.fetchUser = function (username) {
        _userData = JSON.parse(window.localStorage.getItem(username));
        return _userData !== null;
    };

    service.selectList = function (listName) {
        saveList(_userData.listName, _userData.currentList);
        var list = JSON.parse(window.localStorage.getItem("_" + _userData.userName + listName));
        if (list) {
            _userData.currentList = list || _userData.currentList;
            _userData.listName = listName;
            return true;
        }
        else {
            var index = _userData.lists.indexOf(listName);
            _userData.lists.splice(index, 1);
            return false;
        }

    };

    service.logIn = function (password) {
        if (!_userData || password !== _userData.password) {
            _userData = null;
            return false;
        }
        return true;
    };

    return service;
});