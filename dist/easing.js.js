/*! Simple Easing Plugin - v0.0.1 - 2/6/2012
* https://github.com/danheberden/easing.js
* Copyright (c) 2012 Dan Heberden; Licensed MIT */

// New Object Template
(function( window ){
  var easing = window.easing = function( type, amount, start, end ) {

      // what kind of easing fn?
      var parse = /(InOut|In|Out)(\w+)?/.exec( type ),
          easingFn = easy.In,
          map, kind;
      start = start || 0;
      end = end || 1;


      if ( parse ) {
        // get our easing mappings
        kind = parse[2];
        map = mappings[ kind ];

        // kind of easing function
        easingFn = easy[ parse[1] ];
      }

      map = map || [];

      // look up type in the easing object or default to linear
      // if it wasn't a custom function passed in
      if ( !type.call ) {
        type = base[ map[0] ] || easing.easings[ type ] || function( p ){ return p; };
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

    mappings = easing.mappings = {
      Quad : [ 's', 2  ],
      Cubic : [ 's', 3  ],
      Quart : [ 's', 4  ],
      Quint : [ 's', 5 ],
      Expo : [ 's', 6, 1 ],
      Sine : [ 's', 2 ],
      Circ : [ 's', 2, 1 ],
      Elastic : [ 'e', 3 ],
      Bounce : [ 'b' ],
      Back: [ 'back' ]
    },

    base = {
      s: function( p, amount, smooth ) {
        return 1 - arc( p, 1, 1, amount, smooth );
      },
      e: function( p, amount ) {
        return Math.sin( ( pi * 2 ) - p * ( pi * ( amount + amount - 0.5 ) ) ) * ( base.s( p, 2, 1 ) * 0.97 );
      },
      b: function( p, amount ) {
        var levels = [0.10,0.32,0.68,1.305],
          i = 0;
        for ( ; i < levels.length; i++ ) {
          if ( p < levels[i] ) {
            var half = ( levels[i] - ( levels[i-1] || 0 ) ) / 2,
                height = base.s( levels[i] - half, 1, 1 ) + 0.085;
            return arc( p - (levels[i] - half) , height, half, 2 );
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
      h = h || 1;
      rX = rX || 1;
      return pow( Math.sqrt( h * h - pow( ( h / rX ) * p, pwr || 2 ) ), smooth || 2 );
    },
    pow = Math.pow,
    pi = Math.PI;

  // add easier to remember easing functions - easeIn1, easeInOut2, etc
  for ( var i = 1; i < 10; i++ ) {
    mappings[i] = [ 's', i+1, i > 4 ? 1 : 2 ];
  }

  easing.easings = {};

  easing.easejQuery = function( $ ) {
    $ = $ || window.jQuery;
    // all the jqueries
    $.each( mappings, function( n, v ){
      $.each( easy, function( type ) {
        var name = "ease" + type + n;

        // make a jq version
        $.easing[name] = function( x, t, b, c, d ) {
          return easing( name, t/d, b, c-b );
        };
      });
    });
  };

}( this));

