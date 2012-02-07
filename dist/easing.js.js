/*! Easing Plugin - v1.0.1 - 2/6/2012
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
        return 1 - arc( p, 1, 1, amount, smooth );
      },
      e: function( p, amount ) {
        return Math.sin( Math.PI * 2 - p *  Math.PI * ( amount + amount - 0.5 )  ) * base.s( p, 2, 1 ) * 0.97;
      },
      b: function( p, amount ) {
        var levels = [ 0.10, 0.32, 0.68, 1.305 ],
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
      Bounce : [ base.b ],
      Back: [ base.back ]
    },

    // p is progress (0-1), h is height of arc, rX is radius on X,
    // pwr is how much curve and smooth makes it more like a cubic curve
    arc = function( p, h, rX, pwr, smooth ) {
      h = h || 1;
      rX = rX || 1;
      return Math.pow( Math.sqrt( h * h - Math.pow( ( h / rX ) * p, pwr || 2 ) ), smooth || 2 );
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
