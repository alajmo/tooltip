'use strict';

describe('Main Actions', function() {
  browser.get('http://localhost:5000/demo');

  it('Tooltip is created/destroyed on mouseover/mouseleave', function () {
    // mouseover
    var elem1 = element(by.id('1'));
    browser.actions().mouseMove(elem1).perform();
    var elem = element(by.css('.tooltip'));
    expect(elem.isDisplayed()).toBeTruthy();

    // mouseleave
    browser.actions().mouseMove(elem1, {x: 0, y: 0}).perform();
    expect(elem.isPresent()).toBeFalsy();
  });

  it('Tooltip created/destroyed on click', function () {
    var elem2 = element(by.id('2'));
    browser.actions().click(elem2).perform();
    var elem = element(by.css('.tooltip'));
    expect(elem.isDisplayed()).toBeTruthy();

    browser.actions().click(elem2).perform();
    expect(elem.isPresent()).toBeFalsy();
  });

});