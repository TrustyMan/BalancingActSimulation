// Copyright 2014-2017, University of Colorado Boulder

/**
 * Convenience type for creating the icons used on the game level start buttons.
 */
define( function( require ) {
  'use strict';

  // modules
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var levelString = require( 'string!BALANCING_ACT/level' );
  var pattern0Label1ValueString = require( 'string!BALANCING_ACT/pattern0Label1Value' );

  // constants
  var FONT = new PhetFont( 16 );
  var IMAGE_SIZE = new Dimension2( 100, 65 );

  function GameIconNode( image, levelNumber ) {
    Node.call( this );
    var title = new Text( StringUtils.format( pattern0Label1ValueString, levelString, levelNumber ), { font: FONT } );
    this.addChild( title );
    var imageNode = new Image( image );
    imageNode.scale( new Vector2( IMAGE_SIZE.width / imageNode.width, IMAGE_SIZE.height / imageNode.height ) );
    imageNode.top = title.bottom + 4;
    this.addChild( imageNode );
    imageNode.centerX = title.centerX;
  }

  balancingAct.register( 'GameIconNode', GameIconNode );

  return inherit( Node, GameIconNode );
} );
