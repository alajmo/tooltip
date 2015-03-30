## ng-tooltip

Simple tooltip, only 1.7kb, smallest between the ones I've found for Angular. Also
* no external dependency (except for Angular)
* highly customizeable, you decide: classes/templates/animation/exact placement

Animates if ngAnimate is included, otherwise uses basic hide/remove.

Tested on Chrome/Firefox. Should work on IE(run Angular < 1.3 because 1.3 doesn't support i8) and Safari as well.
http://jedanput.github.io/ng-tooltip/
See [Demo](http://jedanput.github.io/ng-tooltip/ "Demo")  here.

## Installation

Either copy dist/ng-tooltip(.min).js or install through bower:

```bash
bower install ng-tooltip --save
```

Then add dependency to your app, for instance:

```bash
angular.module('myApp', ['tooltip.module'])
```

### Basic Usage

Include 'ngAnimate' if you want animations and add appropiate css, see demo
page for an example. If ngAnimate is not included, it falls back to basic show/hide.

#### HTML

```bash
<selector tp-placement="" tp-class="" tp-timer="" tp-tooltiptext="">Click</selector>
```

#### JS

Anchor is the position of the popup/tooltip, where you will attach it to the
parent element. Orientation of x- and y axis is top to bottom and left to right.

### Options

#### Position

Two inputs, placement relative to tooltip (anchor) and relative to parent.
Both range from 0 to 100% of respective width/height.

tp-x, tp-y
    position relative to parent. Direction is top to bottom and left to right.

tp-anchor-x, tp-anchor-y
    position relative to tooltip. Direction is top to bottom and left to right.

tp-mouseover-delay (default 500)
    Number of milliseconds (ms) before tooltip is shown on hover.

tp-class
    Class(es) for the tooltip.

tp-active-class (default disabled)
    Used for animation before tooltip is removed.

tp-text
    Text to display.

tp-template (default disabled)
    HTML template to display. Takes in plain text.

### Examples

```bash
<button class="item" tp-placement="" tp-class="tooltip" tp-timer="100" tp-tooltip="Hello!">Click</button>
```

```bash
<div class="item" tp-placement="" tp-class="tooltip" tp-timer="100" tp-tooltip="Hello!">Hover to see</div>
```

```bash
<span class="item" tp-placement="" tp-class="tooltip" tp-timer="100" tp-tooltip="Hello!">span</span>
```

```bash
<p class="item" tp-placement="" tp-class="tooltip" tp-timer="100" tp-tooltip="Hello!">paragraph</p>
```

## TODO

* Enable more advanced animations.
* Enable different element to use as parent.
* Multiple Tool tips per element.
* Tests.

## Contributing
See the [CONTRIBUTING Guidelines](https://github.com/jedanput/slush-slush-component/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/jedanput/slush-slush-component/issues).

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