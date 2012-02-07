/*
 * easing.js
 * https://github.com/danheberden/easing.js
 *
 * Copyright (c) 2012 Dan Heberden
 * Licensed under the MIT license.
 */

// New Object Template
(function( $, window){
  var easing = window.Easing = function( type, start, end ) {
      return new window.Easing.fn.init( type, start, end );
    },

    proto = easing.fn = easing.prototype= {
      constructor: easing,
      init: function( type, start, end ){

        // what kind of easing fn?
        var kind = /(InOut|In|Out)(\w+)/.exec( type ),
          easingFn = type,
          map,
          fn;


        if ( kind ) {
          map = proto.mappings[ kind[2] ];
          fn = proto.base[ map[0] ];

          if ( kind[1] === "InOut" ){
            easingFn = function( p, e ){
              return p < 0.5 ?
                     fn( p * 2, map[1], map[2] ) / 2 :
                     fn( p * -2 + 2, map[1], map[2] ) / -2 + 1;
            };
          } else if ( kind[1] === "Out" ) {
            easingFn = function( p, e) {
              return 1 - fn(1-p, map[1], map[2]);
            };
          }else {
            easingFn = function( p ){
              return fn( p, map[1], map[2] );
            };
          }

        // look up type in the easing object or default to linear
        // if it wasn't a custom function passed in
        } else if ( typeof type !== 'function' ) {
          easingFn = easing.fn.easings[ type || 'linear' ];
        }

        // assign the easing props of this object
        this.type = "" + type;
        this.easingFn = easingFn;
        this.start = start || 0;
        this.end = end || 1;
      },
      calc: function( p ) {
        return p === 0 ? this.start :
               p === 1 ? this.end :
               this.easingFn( p, this ) * ( this.end - this.start ) + this.start;
      },
      easings: {
        linear: function( p ){
          return p;
        }
      },

     mappings: {
        'Quad' : [ 's', 2 , 2 ],
        'Cubic' : [ 's', 3 , 2 ],
        'Quart' : [ 's', 4 , 2 ],
        'Quint' : [ 's', 5 , 2 ],
        'Expo' : [ 's', 6 ],
        'Sine' : [ 's', 2, 2 ],
        'Circ' : [ 's', 2 ],
        'Elastic' : [ 'e', 3 ],
        'Bounce' : [ 'b' ],
        'Back': [ 'back' ]
      },


      base: {
        s: function( p, amount, smooth ) {
          return 1 - arc( p, 1, 1, amount, smooth );
        },
        e: function( p, amount ) {
          return Math.sin( (pi*2) - p * (pi *(amount+amount-1+0.5)) ) * ( 1 - arc( p, 1, 1, 4 ) * .97 );
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
      }

    },

    // p is progress (0-1), h is height of arc, rX is radius on X,
    // pwr is how much curve and smooth makes it more like a cubic curve
    arc = function( p, h, rX, pwr, smooth ) {
      return pow( Math.sqrt( h * h - pow( ( h / rX ) * p, pwr || 2 ) ), smooth || 1 );
    },

    pow = Math.pow,
    pi = Math.PI;

  proto.init.prototype = proto;

  // all the jqueries
  if ( $ ) {
    $.each( proto.mappings, function( n, v ){
      $.each( ['In', 'Out', 'InOut'], function( i, t ) {
        var name = "ease" + t + n;

        // make a jq version
        $.easing[name] = function( x, t, b, c, d ) {
          return easing( name, b, c-b ).calc( t/d );
        };
      });
    });
  }
}( jQuery, this));
