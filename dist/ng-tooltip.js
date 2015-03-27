/**
 * ng-tooltip - Light, customizable tooltip/popup for Angular.js
 * @version 0.1.0
 * @link http://github.com/jedanput/ngTooltip
 * @license (c) 2015 MIT License
 */
(function () {
  'use strict';

  angular.module('ngTooltip', [])
    .service('positionService', function ($window) {
      return {
        setPosition: function (tooltip, x, y, aX, aY, rect) {
          // Normalize positions
          var posX = x / 100,
            posY = y / 100,
            posAX = aX / 100,
            posAY = aY / 100,
            posGlobX,
            posGlobY;

          // Adjust According to Parent, adjust for scroll as well.
          posGlobX = rect.left + rect.width * posX + $window.scrollX;
          posGlobY = rect.top + rect.height * posY + $window.scrollY;

          // Adjust According to Self
          posGlobX = posGlobX - tooltip[0].getBoundingClientRect().width * posAX;
          posGlobY = posGlobY - tooltip[0].getBoundingClientRect().height * posAY;

          tooltip.css('left',  posGlobX + "px");
          tooltip.css('top',  posGlobY + "px");
        }
      };
    })
    .directive('tpTooltip', function ($compile, $timeout, $animate,
      positionService) {
      return {
        restrict : 'AEC',
        scope: {},
        link: function (scope, elem, attrs) {
          // all attr @params are strings by default
          var tooltipElem,
            tooltip,
            toggle = false,
            // Option Defaults
            x = attrs.tpX || 50, // x-position relative to parent
            y = attrs.tpY || 50, // y-position relative to parent
            aX = attrs.tpAnchorX || 50, // x-position relative to tooltip
            aY = attrs.tpAnchorY || 50, // y-position relative to tooltip
            tpDelay = attrs.tpDelay || 100, // Delay before activating tooltip
            tpTpl = attrs.tpTemplate || false, // html template or plain text
            tpClass = attrs.tpClass || '', // Class wrapper for tooltip
            tpText = attrs.tpText || '', // Text for tooltip
            tpTrigger = attrs.tpTrigger || 'mouseover', // Trigger type
            tpAnimate = attrs.tpAnimate || false, // Animate or not
            // Functions
            compileTemplate,
            addTooltip,
            removeTooltip,
            handleMouseLeave,
            handleMouseOver,
            handleMouseClick,
            init;

          init = function () {
            var tpl = tpTpl || '<div class="' + tpClass + '">' +
              tpText + '</div>';
            tooltipElem = angular.element(tpl);

            if (tpTrigger === 'click') {
              elem[0].addEventListener('click', handleMouseClick, false);
            } else {
              elem[0].addEventListener('mouseover', handleMouseOver, false);
            }
          };

          compileTemplate = function () {
            var rect = elem[0].getBoundingClientRect();
            tooltip = $compile(tooltipElem)(scope);
            tooltip.css('position', 'absolute');
            tooltip.css('visibility', 'hidden');
            addTooltip();

            // Fix visibility issue where getBoundingClientRect shows 0
            // before element is appended to DOM.
            scope.$watch(tooltip, function () {
              tooltip.css('visibility', 'visible');
              positionService.setPosition(tooltip, x, y, aX, aY, rect);
            });
          };

          addTooltip = function () {
            if (tpAnimate === "true") {
              scope.$apply(function () {
                $animate.enter(tooltip, elem);
              });
            } else {
              elem.append(tooltip);
            }
          };

          removeTooltip = function () {
            if (tpAnimate === "true") {
              scope.$apply(function () {
                $animate.leave(tooltip, elem).then(function () {
                  tooltipElem.remove();
                });
              });
            } else {
              tooltipElem.remove();
            }
          };

          handleMouseLeave = function () {
            toggle = false;
            removeTooltip();
            // Add to avoid flickering bug on moving between parent/child.
            elem[0].removeEventListener('mouseleave', handleMouseLeave, false);
            elem[0].addEventListener('mouseover', handleMouseOver, false);
          };

          handleMouseOver = function () {
            elem[0].addEventListener('mouseleave', handleMouseLeave, false);
            toggle = true;
            $timeout(function () {
              if (toggle) {
                compileTemplate();
                elem[0].removeEventListener('mouseover', handleMouseOver, false);
              }
            }, tpDelay);
          };

          handleMouseClick = function () {
            toggle = !toggle;
            $timeout(function () {
              if (toggle === true) {
                compileTemplate();
              } else {
                removeTooltip();
              }
            }, 0);
          };

          init();
        }
      };
    });

}());