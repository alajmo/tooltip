(function () {
    'use strict';

    var app = angular.module('app', ['ngTooltip', 'ngAnimate'])
    .run(function($templateCache, $http){
    });

    app.controller('mainCtrl', function($scope){

            $scope.tpl1 = '<div class="tooltip tooltip-1 margin-bottom anim">'+
                            'Tooltip<div class="arrow-down"></div>'+
                         '</div>';

            $scope.tpl2 = '<div class="tooltip anim">'+
                            'Tooltip<div class=""></div>'+
                         '</div>';

            $scope.tpl3 = '<div class="tooltip tooltip-4">'+
                            'Tooltip'+
                         '</div>';

            $scope.tpl4 = '<div class="tooltip border margin-right anim">'+
                            'Tooltip<div class="arrow-right"></div>'+
                         '</div>';

            $scope.tpl5 = '<div class="tooltip">'+
                            'Tooltip'+
                         '</div>';
    });

}());