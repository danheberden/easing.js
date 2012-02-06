# Easing Plugin

Creates Easing object to get easing state from by percentage. Latest
version: 911 bytes min'd and gzip'd.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/danheberden/easing.js/master/dist/easing.js.min.js
[max]: https://raw.github.com/danheberden/easing.js/master/dist/easing.js.js

In your web page using jQuery:

```html
<script src="jquery.js"></script>
<script src="dist/easing.js.min.js"></script>
<script>
  $( '#idOfElement' ).slideUp( 1000, 'easeOutBounce' );
</script>
```

Using standalone:

```html
<script src="dist/easing.js.min.js"></script>
<script>
  // ease using easeInCirc between 50 and 100
  var ease = Easing( 'easeInCirc', 50, 100 );

  ease.calc( 0 ); // 0% of the ease: 50
  ease.calc( .5 ); // 50% of the ease: 56.7
  ease.calc( .75 ); // 75% of the ease: 66.9
  ease.calc( 1 ); // 100% of the ease: 100;
</script>
```


## Documentation

The 2nd and 3rd arguement of the Easing constructor will default to 0
and 1 for the use-case of percentages. E.g.,

```javascript
var ease = Easing( 'easeInCirc' );

ease.calc( .5 ); // .134
```

This plugin will add easings for use with jQuery's animation methods as
well. 


## Release History
Still working on it - pull req and issues, yo.

## License
Copyright (c) 2012 Dan Heberden  
Licensed under the MIT license.
