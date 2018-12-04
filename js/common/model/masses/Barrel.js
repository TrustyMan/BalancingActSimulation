// Copyright 2014-2017, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var barrelImage = require( 'image!BALANCING_ACT/barrel.png' );
  var ImageMass = require( 'BALANCING_ACT/common/model/ImageMass' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  var MASS = 90; // In kg
  var HEIGHT = 0.75; // In meters

  /**
   * @param initialPosition
   * @param isMystery
   * @constructor
   */
  function Barrel( initialPosition, isMystery ) {
    ImageMass.call( this, MASS, barrelImage, HEIGHT, initialPosition, isMystery );
  }

  balancingAct.register( 'Barrel', Barrel );

  return inherit( ImageMass, Barrel );
} );