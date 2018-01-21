var app = angular.module('app', ['ngCookies']);

app.controller('ctrl', function($scope, $http, $cookies){
    $scope.autentification = function (login, password) {
        $http({
            method: 'POST',
            url: '/autentificate',
            form: {
                'login': login,
                'password': password
            }
        }).then(function (response) {
            if (response.statusCode == 200){
                $cookies.put('id', response.data._id);
                document.location.href = response.data.path;
            } else {
                document.location.href = response.data.path;
            }
        });
    };
});