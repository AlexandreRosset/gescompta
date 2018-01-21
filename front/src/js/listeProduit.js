var app = angular.module('app', []);

app.controller('ctrl', function($scope, $http){
    $scope.produit = [];
    $http({
        method: 'GET',
        url: '/recupProduit'
    }).then(function (response) {
        $scope.produit = response.data;
        $scope.apply();
    });
});