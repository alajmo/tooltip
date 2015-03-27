'use strict';

describe('tpTooltip', function () {
  var elem,
    scope;

  beforeEach(angular.mock.module('ngTooltip'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    var tpl = '<div class="item" tp-tooltip tp-class="tooltip"'+
      'tp-text="Hello!" tp-action="hover"></div>';

    elem = angular.element(tpl);
    $compile(elem)(scope);
    scope.$digest();
  }));

  it('onclick', function () {
    expect(scope.outsideModel).toBeUndefined();
    /*expect(scope.outsideModel).toBe('clicked');*/
  });

  it('Toolpip should be created', function () {
    expect(scope.outsideModel).toBeUndefined();
    /*elm.click();*/
    /*expect(scope.outsideModel).toBe('clicked');*/
    expect(elem.length).toBe(1);
  });

});