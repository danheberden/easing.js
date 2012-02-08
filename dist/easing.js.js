/*! Easing Plugin - v1.1.0 - 2/8/2012
* https://github.com/danheberden/easing.js
* Copyright (c) 2012 Dan Heberden; Licensed MIT */

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
        type = map[0] || easing.easings[ type ] || function( p ){ return p; };
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

     base = {
      s: function( p, amount, smooth ) {
        return 1 - Math.pow( Math.sqrt( 1 - Math.pow( p, amount || 2 ) ), smooth || 2 );
      },
      e: function( p, amount ) {
        return Math.sin( ( Math.PI * 2 ) - p * ( Math.PI * ( amount + amount - 0.5 ) ) ) * ( base.s( p, 2, 1 ) * 0.97 );
      },
      b: function( p, amount ) {
        var limit = 4 / 7 + amount / 50,
            mod = 1 + p / ( limit / ( Math.pow( 2, amount )-1 )),
            bounce = ~~( Math.log( mod ) / Math.log( 2 ) );
        if ( p > limit ){
          return 1 - base.s( 1 - ( -limit + p ) / ( 1 - limit ), 2 );
        } else {
          return Math.sqrt( 1 - Math.pow( 2 * ( mod / Math.pow( 2, bounce ) - 1 ) - 1 ,2) ) * base.s( ( ( bounce + 1 ) / amount ) * limit, 3 );
        }
      },
      back: function( p ) {
        return p * p * ( 3 * p - 2 );
      }
    },

    mappings = easing.mappings = {
      Quad : [ base.s, 2  ],
      Cubic : [ base.s, 3  ],
      Quart : [ base.s, 4  ],
      Quint : [ base.s, 5 ],
      Expo : [ base.s, 6, 1 ],
      Sine : [ base.s, 2 ],
      Circ : [ base.s, 2, 1 ],
      Elastic : [ base.e, 3 ],
      Bounce : [ base.b, 3 ],
      Back: [ base.back ]
    },

    $ = window.jQuery;

  // add easier to remember easing functions - easeIn1, easeInOut2, etc
  for ( var i = 1; i < 7; i++ ) {
    mappings[i] = [ base.s, i + 1, i > 4 ? 1 : 2 ];
  }

  easing.easings = {};

  if ( $ ) {
    // all the jqueries
    $.each( mappings, function( n ){
      $.each( easy, function( type ) {
        var name = "ease" + type + n;

        // make a jq version
        $.easing[name] = function( x, t, b, c, d ) {
          return easing( name, t/d, b, c-b );
        };
      });
    });
  }

}( this ));
