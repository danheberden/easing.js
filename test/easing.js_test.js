/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function($) {

  module('var Easing;');

  test('Constructor assignments', 3, function() {
    var ease = new Easing( 'easeInSine', 9001, 31337 );
    strictEqual( typeof ease.easingFn, 'function', 'easingFn should be a function' );
    strictEqual( ease.start, 9001, 'starting value shoul persist ' );
    strictEqual( ease.end, 31337, 'ending value should persist' );
  });

  test( 'Constructor defaults', 2, function() {
    var ease = new Easing( 'easeInSine' );
    strictEqual( ease.start, 0, 'start should default to 0' );
    strictEqual( ease.end, 1, 'end should default to 1' );
  });

  test('Proto', 4, function() {
    var ease = new Easing( 'easeInSine' );
    strictEqual( ease.constructor, Easing, 'constructor should be easy' );
    strictEqual( typeof ease.calc, 'function', 'calc should be there and a function' );
    strictEqual( ease.fn, ease.prototype, 'prototype should be aliased as fn' );
    strictEqual( typeof ease.easings, 'object', 'extra or custom easings object should exist' );
  });

  test( 'Calc', 2, function() {
    var ease = new Easing();
    strictEqual( ease.calc( 0.5 ), 0.5, 'default linear easing should be .5 on 0-1 range' );
    ease.end = 100;
    strictEqual( ease.calc( 0.5 ), 50, 'easing should use new end value to get 50% of' );
  });


}(jQuery));
