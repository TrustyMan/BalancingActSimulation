// Copyright 2014-2017, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var ImageMass = require( 'BALANCING_ACT/common/model/ImageMass' );
  var inherit = require( 'PHET_CORE/inherit' );
  var smallRockImage = require( 'image!BALANCING_ACT/rock-4.png' );

  // constants
  var MASS = 30; // In kg
  var HEIGHT = 0.25; // In meters

  /**
   * @param initialPosition
   * @param isMystery
   * @constructor
   */
  function SmallRock( initialPosition, isMystery ) {
    ImageMass.call( this, MASS, smallRockImage, HEIGHT, initialPosition, isMystery );
  }

  balancingAct.register( 'SmallRock', SmallRock );

  return inherit( ImageMass, SmallRock );
} );