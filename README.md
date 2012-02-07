# Easing Plugin

Creates Easing object to get easing state from by percentage. Latest
version: 911 bytes min'd and gzip'.

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

The 3rd and 4rd arguement of ease are the `start` and `end` - these are
convenience arguments that perform the math for you :)

This plugin will add easings for use with jQuery's animation methods as
well.


## Release History
Still working on it - pull req and issues, yo.

## License
Copyright (c) 2012 Dan Heberden
Licensed under the MIT license.
