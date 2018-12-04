// Copyright 2014-2017, University of Colorado Boulder

/**
 * Screen that allows the user to select the game level that they wish to play.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var balancingAct = require( 'BALANCING_ACT/balancingAct' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var selectLevelString = require( 'string!VEGAS/selectLevel' );

  /**
   * @param {Function} startLevelFunction - Function used to initiate a game
   * level, will be called with a zero-based index value.
   * @param {Function} resetFunction - Function to reset game and scores.
   * @param {Property} timerEnabledProperty
   * @param {Property} soundEnabledProperty
   * @param {Array} iconNodes - Set of iconNodes to use on the buttons, sizes
   * should be the same, length of array must match number of levels.
   * @param {Array} scores - Current scores, used to decide which stars to
   * illuminate on the level start buttons, length must match number of levels.
   * @param {Object} modelViewTransform
   * @param {Object} [options] - See code below for options and default values.
   * @constructor
   */
  function StartGameLevelNode( startLevelFunction, resetFunction, timerEnabledProperty, soundEnabledProperty,
                               iconNodes, scores, modelViewTransform, options ) {

    Node.call( this );

    options = _.extend( {
      // Defaults
      numLevels: 4,
      titleString: selectLevelString,
      numStarsOnButtons: 5,
      perfectScore: 10,
      buttonBackgroundColor: 'rgb( 242, 255, 204 )',
      highlightedButtonBackgroundColor: 'rgb( 224, 255, 122 )',
      numButtonRows: 1, // For layout
      controlsInset: 10,
      size: new Dimension2( 768, 504 ),
      maxTitleWidth: Number.POSITIVE_INFINITY
    }, options );

    // Verify parameters
    if ( iconNodes.length !== options.numLevels || scores.length !== options.numLevels ) {
      throw new Error( 'Number of game levels doesn\'t match length of provided arrays' );
    }

    // Title
    var title = new Text( options.titleString, { font: new PhetFont( 30 ), maxWidth: options.maxTitleWidth } );
    this.addChild( title );

    // Add the buttons
    function createLevelStartFunction( level ) {
      return function() { startLevelFunction( level ); };
    }

    var buttons = new Array( options.numLevels );
    for ( var i = 0; i < options.numLevels; i++ ) {
      buttons[ i ] = new LevelSelectionButton(
        iconNodes[ i ],
        scores[ i ],
        {
          listener: createLevelStartFunction( i ),
          baseColor: options.buttonBackgroundColor,
          scoreDisplayOptions: {
            numberOfStars: options.numStarsOnButtons,
            perfectScore: options.perfectScore
          }
        }
      );
      this.addChild( buttons[ i ] );
    }

    // Sound and timer controls.
    var timerToggleButton = new TimerToggleButton( timerEnabledProperty );
    this.addChild( timerToggleButton );
    var soundToggleButton = new SoundToggleButton( soundEnabledProperty );
    this.addChild( soundToggleButton );

    // Reset button.
    var resetButton = new ResetAllButton( { listener: resetFunction, radius: 20, touchAreaDilation: 8 } );
    this.addChild( resetButton );

    // Layout
    var numColumns = options.numLevels / options.numButtonRows;
    var buttonSpacingX = buttons[ 0 ].width * 1.2; // Note: Assumes all buttons are the same size.
    var buttonSpacingY = buttons[ 0 ].height * 1.2;  // Note: Assumes all buttons are the same size.
    var firstButtonOrigin = new Vector2( options.size.width / 2 - ( numColumns - 1 ) * buttonSpacingX / 2,
      options.size.height * 0.45 - ( ( options.numButtonRows - 1 ) * buttonSpacingY ) / 2 );
    for ( var row = 0; row < options.numButtonRows; row++ ) {
      for ( var col = 0; col < numColumns; col++ ) {
        var buttonIndex = row * numColumns + col;
        buttons[ buttonIndex ].centerX = firstButtonOrigin.x + col * buttonSpacingX;
        buttons[ buttonIndex ].centerY = firstButtonOrigin.y + row * buttonSpacingY;
      }
    }
    resetButton.right = options.size.width - options.controlsInset;
    resetButton.bottom = options.size.height - options.controlsInset;
    title.centerX = options.size.width / 2;
    title.centerY = buttons[ 0 ].top / 2;

    // The sound and timer buttons are positioned such that once is above the ground and the other below because there
    // wasn't space to put them both above or below.
    var interButtonSpacing = 18;
    soundToggleButton.left = options.controlsInset;
    soundToggleButton.bottom = modelViewTransform.modelToViewY( 0 ) - interButtonSpacing / 2;
    timerToggleButton.left = options.controlsInset;
    timerToggleButton.top = soundToggleButton.bottom + interButtonSpacing;
  }

  balancingAct.register( 'StartGameLevelNode', StartGameLevelNode );

  // Inherit from Node.
  return inherit( Node, StartGameLevelNode );
} );
