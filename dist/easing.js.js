/*! Simple Easing Plugin - v0.0.1 - 2/6/2012
* https://github.com/danheberden/easing.js
* Copyright (c) 2012 Dan Heberden; Licensed MIT */

// New Object Template
(function( window ){
  var ease = window.ease = function( type, amount, start, end ) {

      // what kind of easing fn?
      var kind = /(InOut|In|Out)(\w+)/.exec( type ),
          easingFn = easy.In,
          map;
      start = start || 0;
      end = end || 1;


      if ( kind ) {
        // get our ease mappings
        map = mappings[ kind[2] ];

        // kind of easing function
        easingFn = easy[ kind[1] ];
      }

      // make sure  map is an array
      map = map || [];
      // look up type in the easing object or default to linear
      // if it wasn't a custom function passed in
      if ( !type.call ) {
        type = base[ map[0] ] || ease.easings[ type || 'linear' ];
      }

      return amount <= 0 ? start : amount >= 1 ? end : easingFn( type, amount, map[1], map[2] ) * ( end - start ) + start;
    },

    easy = {
      In: function( fn, p, a, b) {
        return fn( p, a, b );
      },
      Out: function( fn, p, a, b ) {
        return 1 - fn( 1-p, a, b );
      },
      InOut: function( fn, p, a, b ) {
        return p < 0.5 ?
                 fn( p * 2, a, b ) / 2 :
                 fn( p * -2 + 2, a, b ) / -2 + 1;
      }
    },

    mappings = {
      Quad : [ 's', 2 , 2 ],
      Cubic : [ 's', 3 , 2 ],
      Quart : [ 's', 4 , 2 ],
      Quint : [ 's', 5 , 2 ],
      Expo : [ 's', 6 ],
      Sine : [ 's', 2, 2 ],
      Circ : [ 's', 2 ],
      Elastic : [ 'e', 3 ],
      Bounce : [ 'b' ],
      Back: [ 'back' ]
    },


    base = {
      s: function( p, amount, smooth ) {
        return 1 - arc( p, 1, 1, amount, smooth );
      },
      e: function( p, amount ) {
        return Math.sin( (pi*2) - p * (pi *(amount+amount-1+0.5)) ) * ( 1 - arc( p, 1, 1, 4 ) * 0.97 );
      },
      b: function( p, amount ) {
        var levels = [0.10,0.32,0.68,1.305],
          result = 0,
          i = 0;
        for ( ; i < levels.length; i++ ) {
          if ( p < levels[i] ) {
            var half = ( levels[i] - ( levels[i-1] || 0 ) ) / 2,
              height = 1-arc( levels[i] - half, 1, 1, 2, 2 ) + 0.01;
            return arc( p - (levels[i] - half) , height, half );
          }
        }
      },
      back: function( p ) {
        return p * p * ( 3 * p - 2 );
      }
      // p is progress (0-1), h is height of arc, rX is radius on X,
      // pwr is how much curve and smooth makes it more like a cubic curve
    },
    arc = function( p, h, rX, pwr, smooth ) {
      return pow( Math.sqrt( h * h - pow( ( h / rX ) * p, pwr || 2 ) ), smooth || 1 );
    },
    pow = Math.pow,
    pi = Math.PI,
    $ = window.jQuery;

  ease.easings = {
    linear: function( p ){
      return p;
    }
  };

  ease.mappings = mappings;

  ease.easejQuery = function( $ ) {
    $ = $ || window.jQuery;
    // all the jqueries
    $.each( mappings, function( n, v ){
      $.each( easy, function( type ) {
        var name = "ease" + type + n;

        // make a jq version
        $.easing[name] = function( x, t, b, c, d ) {
          return ease( name, t/d, b, c-b );
        };
      });
    });
  };

}( this));
