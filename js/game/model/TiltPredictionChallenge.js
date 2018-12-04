// Copyright 2014-2017, University of Colorado Boulder

/**
 * A challenge, used in the balance game, in which the user must predict which
 * way the plank will tilt when the supports are removed.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BalanceGameChallenge = require( 'BALANCING_ACT/game/model/BalanceGameChallenge' );
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var inherit = require( 'PHET_CORE/inherit' );
  var whatWillHappenString = require( 'string!BALANCING_ACT/whatWillHappen' );

  /**
   * @constructor
   */
  function TiltPredictionChallenge( fixedMasses ) {
    BalanceGameChallenge.call( this, 'doubleColumns' );
    Array.prototype.push.apply( this.fixedMassDistancePairs, fixedMasses );

    // Set up the challenge view configuration, which provides information to
    // the view about how this challenge should be displayed.
    this.viewConfig = {
      title: whatWillHappenString,
      showMassEntryDialog: false,
      showTiltPredictionSelector: true
    };
  }

  balancingAct.register( 'TiltPredictionChallenge', TiltPredictionChallenge );

  return inherit( BalanceGameChallenge, TiltPredictionChallenge, {}, {
    // statics

    // convenience factory method for creating this type of challenge
    create: function( fixedMass1, fixedMass1DistanceFromCenter, fixedMass2, fixedMass2DistanceFromCenter ) {

      // Add the fixed masses and their distances from the center of the balance.
      var fixedMassesList = [];
      fixedMassesList.push( { mass: fixedMass1, distance: fixedMass1DistanceFromCenter } );
      fixedMassesList.push( { mass: fixedMass2, distance: fixedMass2DistanceFromCenter } );

      // Create the actual challenge.
      return new TiltPredictionChallenge( fixedMassesList );
    }
  } );
} );