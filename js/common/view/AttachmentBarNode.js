// Copyright 2013-2017, University of Colorado Boulder

/**
 * View representation for the attachment bar which goes from the pivot point
 * to the bottom center of the plank.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var PIVOT_RADIUS = 5;
  var ATTACHMENT_BAR_WIDTH = PIVOT_RADIUS * 1.5;

  function AttachmentBarNode( modelViewTransform, plank ) {
    Node.call( this );
    var pivotPointPosInView = modelViewTransform.modelToViewPosition( plank.pivotPoint );

    // Add the bar, which goes from the pivot point to the bottom of the plank.
    var attachmentBarLength = modelViewTransform.modelToViewDeltaY(
      plank.bottomCenterLocationProperty.get().y - plank.pivotPoint.y
    );
    var attachmentBar = new Rectangle( pivotPointPosInView.x - ATTACHMENT_BAR_WIDTH / 2, pivotPointPosInView.y, ATTACHMENT_BAR_WIDTH,
      attachmentBarLength, 0, 0, { fill: 'rgb( 200, 200, 200 )', stroke: 'rgb( 50, 50, 50 )' } );
    this.addChild( attachmentBar );

    // Rotate the bar as the plank tilts.
    var nodeRotation = 0;
    plank.tiltAngleProperty.link( function( angle ) {
      attachmentBar.rotateAround( pivotPointPosInView, nodeRotation - angle );
      nodeRotation = angle;
    } );

    // Add the pivot point, which is represented as a circle with a point in the middle.
    this.addChild( new Circle( PIVOT_RADIUS,
      {
        fill: 'rgb( 220, 220, 220 )',
        stroke: 'black',
        lineWidth: 1,
        center: pivotPointPosInView
      } ) );
    this.addChild( new Circle( 1,
      {
        fill: 'black',
        center: pivotPointPosInView
      } ) );
  }

  balancingAct.register( 'AttachmentBarNode', AttachmentBarNode );

  return inherit( Node, AttachmentBarNode );
} );
