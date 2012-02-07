# Easing Plugin

Easing function for use with or without jQuery. In addition to the
standard list of easing functions, it adds an easier to remember syntax
for when you want to use Sine, Circ, Quad, Expo, etc.

`ease` accepts `easeInX`, `easeOutX`, and `easeInOutX` where X is a
number between 1 and 9; 1 is the least dramatic curve, similar to `Sine`. 9 is the most dramatic curve, even more than `Expo`.

```javascript
// get the easeIn3 value at 50% of the ease between 5 and 10
ease( 'easeIn3', 0.5, 5, 10 );
```

## Size?

766 bytes min'd and gzip'd.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/danheberden/easing.js/master/dist/easing.js.min.js
[max]: https://raw.github.com/danheberden/easing.js/master/dist/easing.js.js

In your web page using jQuery:

```html
<script src="jquery.js"></script>
<script src="dist/easing.js.min.js"></script>
<script>
  $( document ).ready( function() {
    // create the jQuery methods
    // you only need to do this once!
    ease.easejQuery();

    // now the easing functions will work with jq fns
    $( '#idOfElement' ).slideUp( 1000, 'easeOutBounce' );

    // and even the easy to remember ones
    $( '#someElement' ).slideDown( 600, 'easeOut4' );
  });
 </script>
```

Using standalone:

```html
<script src="dist/easing.js.min.js"></script>
<script>
  // ease returns a number between 0 and 1 if you don't specify a
  // a start and end.

  var start = 50,
      end = 100;

  // easeIn2 at 50% between 50 and 100
  ease( 'easeIn2', 0.5, start, end ); // returns 62.5

  // easeIn2 at 50%
  ease( 'easeIn2', 0.5 ) * ( start - end ); // returns 62.5

 </script>
```
## Demo

[http://jsfiddle.net/danheberden/rWGm2/](http://jsfiddle.net/danheberden/rWGm2/)

## Documentation

`ease` only requires the first two arguments:

#### type
The type of easing you want to perform, such as `easeInBounce`,
`easeInSine` or the easier to remember `easeInX`, `easeOutX`, and
`easeInOutX` where `X` can any number between 1 and 9.

#### position
This is at what point you wish to calculate the easing. This is a number
between 0 and 1.

#### start (optional)

The start value to use for the ease value calculation

#### end (optional)
The end value to use for the ease value calculation

For a list of what easing functions are supported, check out the demo.

## Release History
Still working on it - pull req and issues, yo.

## License
Copyright (c) 2012 Dan Heberden
Licensed under the MIT license.
