// Copyright 2013-2017, University of Colorado Boulder

/**
 * This class represents an adult male human in a toolbox.  When the user
 * clicks on this node, the corresponding model element is added to the model at
 * the user's mouse location.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var ImageMassCreatorNode = require( 'BALANCING_ACT/balancelab/view/ImageMassCreatorNode' );
  var ImageMassNode = require( 'BALANCING_ACT/common/view/ImageMassNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Man = require( 'BALANCING_ACT/common/model/masses/Man' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // Model-view transform for scaling the node used in the toolbox.  This
  // may scale the node differently than what is used in the model so that
  // items in the toolbox can be sized differently (generally smaller).
  var SCALING_MVT = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, 80 );

  /**
   * @param {BalanceLabModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function ManCreatorNode( model, modelViewTransform ) {
    ImageMassCreatorNode.call( this, model, modelViewTransform, new Man(), true );
    this.setSelectionNode( new ImageMassNode( this.prototypeImageMass, SCALING_MVT, false, new Property( false ), false ) );
    this.positioningOffset = new Vector2( 0, -modelViewTransform.modelToViewDeltaY( this.prototypeImageMass.heightProperty.get() / 2 ) );
  }

  balancingAct.register( 'ManCreatorNode', ManCreatorNode );

  return inherit( ImageMassCreatorNode, ManCreatorNode );
} );