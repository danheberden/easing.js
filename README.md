# Easing.js

### Stand-alone and jQuery Plugin

Easing function for use with or without jQuery. In addition to the
standard list of easing functions, it adds an easier to remember syntax
for when you want to use Sine, Circ, Quad, Expo, etc.

`easing` accepts `easeInX`, `easeOutX`, and `easeInOutX` where X is a
number between 1 and 9; 1 is the least dramatic curve, similar to `Sine`. 9 is the most dramatic curve, even more than `Expo`.

```javascript
// get the easeIn3 value at 50% of the ease between 5 and 10
easing( 'easeIn3', 0.5, 5, 10 );
```

## Size?

752 bytes min'd and gzip'd.

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

    // easing functions will work with jq functions
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
  // easing returns a number between 0 and 1 if you don't specify a
  // a start and end.

  var start = 50,
      end = 100;

  // easeIn2 at 50% between 50 and 100
  easing( 'easeIn2', 0.5, start, end ); // returns 62.5

  // easeIn2 at 50%
  easing( 'easeIn2', 0.5 ) * ( end - start ) + start; // returns 62.5

 </script>
```
## Demo

[http://jsfiddle.net/danheberden/rWGm2/](http://jsfiddle.net/danheberden/rWGm2/)

## Documentation

`easing` only requires the first two arguments:

#### type
The type of easing you want to perform, such as `easeInBounce`,
`easeInSine` or the easier to remember `easeInX`, `easeOutX`, and
`easeInOutX` where `X` can any number between 1 and 9. If `type` cannot
be found, 'linear' will be used.

#### position
This is at what point you wish to calculate the easing. This is a number
between 0 and 1.

#### start (optional)

The start value to use for the easing value calculation

#### end (optional)
The end value to use for the easing value calculation

For a list of what easing functions are supported, check out the demo.

## FAQ

##### Why did you make this? There's already an easing plugin

We were working to write new easing plugins for jQuery UI because the existing ones,
borrowed from [here](http://gsgd.co.uk/sandbox/jquery/easing/), were just
a bit too big; this plugin works without jQuery, is smaller, and offers
more usability.

## Release History
v1.0.0 - Removed constructor design in favor of easier to use utilities,
simpler math and quicker load time.

v0.0.1 - Initial release

## License
Copyright (c) 2012 Dan Heberden
Licensed under the MIT license.
