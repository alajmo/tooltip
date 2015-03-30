(function () {
    'use strict';

    angular.module('app', ['ngTooltip', 'ngAnimate'])
    .run(function($templateCache, $http){
    })
    .controller('mainCtrl', function($scope){

            $scope.tpl1 = '<div class="tooltip margin-bottom anim">'+
                            'Tooltip<div class="arrow-down"></div>'+
                         '</div>';

            $scope.tpl2 = '<div class="tooltip-2 margin-left">'+
                            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.<div class=""></div>'+
                         '</div>';

            $scope.tpl3 = '<div class="tooltip anim">'+
                            'Tooltip'+
                         '</div>';
    });

}());