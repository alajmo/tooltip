# light and customizable Angular tooltip

Simple light tooltip for Angular.js, only 1.6kb.
* no external dependency (except for Angular)
* highly customizeable, you decide: classes/templates/animation/exact placement

Animates if ngAnimate is included, otherwise uses basic hide/remove.

Tested on Chrome/Firefox. Should work on IE(run Angular < 1.3 because 1.3 doesn't support i8) and Safari as well.

## Demo
See [Demo](http://jedanput.github.io/tooltip/ "Demo")  here.

## Installation

Either copy dist/tooltip(.min).js or install through bower:

```bash
bower install angular-tooltip --save
```

Then add dependency to your app:

```bash
angular.module('myApp', ['tooltip.module', 'ngAnimate'])
```
Make sure you include ngAnimate if you want animation and add the appropiate classes. See demo for more information.

## Basic Usage

Anchor is the position of the popup/tooltip, where you will attach it to the
parent element in percent. Orientation of x- and y axis is top to bottom and left to right.
For instance, if you want to attach the southwest corner of the tooltip to the north east corner,
of the parent, you'd type in tp-x="100", tp-y="0" and tp-anchor-x="0", tp-anchor-y="100".

Default values are shown below:

```bash
<selector   tooltip <!-- adds the directive -->
            tp-x="50"  <!-- x value of selector, from 0 - 100 -->
            tp-y="50"  <!-- y value of selector, from 0 - 100 -->
            tp-anchor-x="50"  <!-- x value of tooltip, from 0 - 100 -->
            tp-anchor-y="50"  <!-- y value of tooltip, from 0 - 100 -->
            tp-delay="100"  <!-- number of milliseconds before showing tooltip -->
            tp-template=""  <!-- input custom template -->
            tp-class=""  <!-- input custom class -->
            tp-text=""  <!-- text to display on tooltip -->
            tp-trigger-on="hover"  <!-- trigger tooltip on click or hover -->
            tp-animate="false">  <!-- set true if you want animation -->
</selector>
```

### Examples

```bash
    <div class="item"
                         tooltip
                         tp-x="0" tp-y="100"
                         tp-anchor-x="0" tp-anchor-y="0"
                         tp-class="tooltip"
                         tp-text="Hello world!"
                         tp-trigger-on="hover">
      Hover over me!
    </div>
```

```bash
    <div class="item"
                         tooltip
                         tp-x="50" tp-y="0"
                         tp-anchor-x="50" tp-anchor-y="100"
                         tp-template="{{template}}"
                         tp-trigger-on="click"
                         tp-animate="true">
      Click!
    </div>
```

## TODO

* Enable more advanced animations.
* Enable different element to use as parent.
* Multiple Tool tips per element.
* Tests.

## Contributing
Feel free to contribute!

## License

The MIT License

Copyright (c) 2015, jedanput

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.