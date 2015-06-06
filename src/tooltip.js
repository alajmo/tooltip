(function (angular) {
  'use strict';

  angular.module('tooltip.module', [])
    .service('positionService', ['$window', function ($window) {
      return {
        getPosition: function (tooltip, x, y, aX, aY, rect) {
          // Normalize positions
          var posX = x / 100,
            posY = y / 100,
            posAX = aX / 100,
            posAY = aY / 100,
            posGlobX,
            posGlobY;

          // Adjust According to Parent, and for scroll as well.
          posGlobX = rect.left + rect.width * posX + $window.scrollX;
          posGlobY = rect.top + rect.height * posY + $window.scrollY;

          // Adjust According to Self
          posGlobX = posGlobX - tooltip[0].getBoundingClientRect().width * posAX;
          posGlobY = posGlobY - tooltip[0].getBoundingClientRect().height * posAY;

          return {x: posGlobX, y: posGlobY};
        }
      };
    }])
    .directive('tooltip', ['$document', '$compile', '$timeout', '$animate',
      'positionService', function ($document, $compile, $timeout, $animate,
      positionService) {
      return {
        restrict : 'EA',
        scope: {},
        link: function (scope, elem, attrs) {
          // all attr @params are strings by default
          var tooltipElem,
            tooltip,
            toggle = false,
            body = angular.element($document).find('body').eq(0),
            // Option Attributes (and their defaults)
            x = attrs.tpX || 50, // x-position relative to parent
            y = attrs.tpY || 50, // y-position relative to parent
            aX = attrs.tpAnchorX || 50, // x-position relative to tooltip
            aY = attrs.tpAnchorY || 50, // y-position relative to tooltip
            tpDelay = attrs.tpDelay || 100, // Delay before activating tooltip
            tpTpl = attrs.tpTemplate || false, // html template or plain text
            tpClass = attrs.tpClass || '', // Class wrapper for tooltip
            tpText = attrs.tpText || '', // Text for tooltip
            tpTriggerOn = attrs.tpTriggerOn || 'mouseenter', // Trigger type
            tpAnimate = attrs.tpAnimate || false, // Animate or not
            // Functions
            init,
            compileTemplate,
            addTooltip,
            removeTooltip,
            setPosition,
            // Mouse Events
            mouseEnter,
            mouseLeave,
            mouseClick;

          init = function () {
            var tpl = tpTpl || '<div class="' + tpClass + '">' +
              tpText + '</div>';
            tooltipElem = angular.element(tpl);

            if (tpTriggerOn === 'click') {
              elem[0].addEventListener('click', mouseClick, false);
            } else {
              elem[0].addEventListener('mouseenter', mouseEnter, false);
            }
          };

          compileTemplate = function () {
            var rect = elem[0].getBoundingClientRect();
            tooltip = $compile(tooltipElem)(scope);
            tooltip.css('position', 'absolute');
            tooltip.css('visibility', 'hidden');
            addTooltip();

            // Use watch to fix visibility issue where getBoundingClientRect
            // shows width/height = 0 before element is appended to DOM.
            scope.$watch(tooltip, function () {
              setPosition();
            });
          };

          addTooltip = function () {
            if (tpAnimate === 'true') {
              scope.$apply(function () {
                $animate.enter(tooltip, body);
              });
            } else {
              body.append(tooltip);
            }
          };

          removeTooltip = function () {
            if (tpAnimate === 'true') {
              scope.$apply(function () {
                $animate.leave(tooltip, elem).then(function () {
                  tooltipElem.remove();
                });
              });
            } else {
              tooltipElem.remove();
            }
          };

          mouseLeave = function (e) {
            // Account for fast movement when mouseleave is fired before tooltip
            // is created.
            toggle = false;
            if (tooltip !== undefined) {
              // Enable movement between tooltip and its parent.
              if (e.relatedTarget !== tooltip[0] &&
                  e.relatedTarget !== elem[0]) {
                removeTooltip();
                elem[0].removeEventListener('mouseleave', mouseLeave, false);
              }
            }
          };

          mouseEnter = function () {
            toggle = true;
            elem[0].addEventListener('mouseleave', mouseLeave, false);
            $timeout(function () {
              if (toggle) {
                compileTemplate();
                tooltip[0].addEventListener('mouseleave', mouseLeave, false);
              }
            }, tpDelay);
          };

          mouseClick = function () {
            toggle = !toggle;
            $timeout(function () {
              if (toggle === true) {
                compileTemplate();
              } else {
                removeTooltip();
              }
            }, 0);
          };

          setPosition = function () {
            var pos;
            tooltip.css('visibility', 'visible');
            pos = positionService.getPosition(tooltip, x, y, aX, aY, rect);
            tooltip.css('left',  pos.x + 'px');
            tooltip.css('top',  pos.y + 'px');
          };

          init();
        }
      };
    }]);

}(angular));