/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function($) {

  module('var Easing;');

  test('Function and pub stuff even there?', 3, function() {
    strictEqual( typeof easing, 'function', 'window.easing should be a function' );
    strictEqual( typeof easing.easings, 'object', 'easings obj should be there' );
    strictEqual( typeof easing.mappings, 'object', 'mappings should be there' );
   });

  test( 'jQuery Plugin ', 1, function() {
    easing.easejQuery();
    strictEqual( typeof jQuery.easing.easeInBounce, 'function', 'easeInBounce should be on $.easing when easing.easejQuery() is called' );
  });


  test( 'Calc', 1, function() {
    strictEqual( easing( 'linear', 0.5 ), 0.5, 'default linear easing should be .5 on 0-1 range' );
  });


}(jQuery));
