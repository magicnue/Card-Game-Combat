//=============================================================================
// MYTH Encounter Warning Plugin
// MYTH_EncounterWarning.js
// Version 1.1.0
//=============================================================================
/*:
 * @target MZ
 * @author Neel (mythbuilder)
 * @plugindesc v1.1.0 Adds Encounter Warning and FOE Proximity UI to the Map Scene
 * @url https://mythatelier.itch.io/
 *
 * @command showEncounterWindow
 * @text Show Encounter Window?
 * @desc Set visibility state of Encounter Warning window.
 *
 *    @arg enabled
 *    @text Visibility
 *    @type boolean
 *    @default true
 *    @desc If ON, will Show the Encounter Window. If OFF, will Hide it.
 *
 * @command moveEncounterWindow
 * @text Move Encounter Window
 * @desc Move the Encounter Warning Window to X and Y coordinates
 *
 *    @arg xPos
 *    @text X
 *    @type text
 *    @default 0
 *    @desc Sets the X coordinate that the Window will move to.
 *
 *    @arg yPos
 *    @text Y
 *    @type text
 *    @default 0
 *    @desc Sets the Y coordinate that the Window will move to.
 *
 * @command setHomeEncounterWindow
 * @text Set Home Encounter Window
 * @desc Set the Home Position of Encounter Warning Window
 *
 *    @arg xPos
 *    @text X
 *    @type text
 *    @default 0
 *    @desc Sets the X coordinate that the Window will move to.
 *
 *    @arg yPos
 *    @text Y
 *    @type text
 *    @default 0
 *    @desc Sets the Y coordinate that the Window will move to.
 *
 * @command setAwayEncounterWindow
 * @text Set Away Encounter Window
 * @desc Set the Away Position of Encounter Warning Window
 *
 *    @arg xPos
 *    @text X
 *    @type text
 *    @default 0
 *    @desc Sets the X coordinate that the Window will move to.
 *
 *    @arg yPos
 *    @text Y
 *    @type text
 *    @default 0
 *    @desc Sets the Y coordinate that the Window will move to.
 *
 * @command setEncounterThresholds
 * @text Set Encounter Thresholds
 * @desc Set the Encounter Thresholds for Stage 1, Stage 2, Stage 3.
 *
 *    @arg stage1
 *    @text Stage1
 *    @type number
 *    @default 0
 *    @desc Sets the Stage 1 step threshold.
 *
 *    @arg stage2
 *    @text Stage2
 *    @type number
 *    @default 0
 *    @desc Sets the Stage 2 step threshold.
 *
 *    @arg stage3
 *    @text Stage3
 *    @type number
 *    @default 0
 *    @desc  Sets the Stage 3 step threshold.
 *
 * @command resetEncounterCount
 * @text Reset Encounter Count
 * @desc Reset the steps building to the next encounter to 0.
 *
 * @command showFOEProximity
 * @text Show FOE Proximity?
 * @desc Set visibility state of FOE Proximity window.
 *
 *    @arg enabled
 *    @text Visibility
 *    @type boolean
 *    @default true
 *    @desc If ON, will Show the FOE Proximity. If OFF, will Hide it.
 *
 * @command moveFOEProximity
 * @text Move FOE Window
 * @desc Move the FOE Proximity Window to X and Y coordinates
 *
 *    @arg xPos
 *    @text X
 *    @type text
 *    @default 0
 *    @desc Sets the X coordinate that the Window will move to.
 *
 *    @arg yPos
 *    @text Y
 *    @type text
 *    @default 0
 *    @desc Sets the Y coordinate that the Window will move to.
 *
 * @command setHomeFOEWindow
 * @text Set Home FOE Window
 * @desc Set the Home Position of FOE Proximity Warning Window
 *
 *    @arg xPos
 *    @text X
 *    @type text
 *    @default 0
 *    @desc Sets the X coordinate that the Window will move to.
 *
 *    @arg yPos
 *    @text Y
 *    @type text
 *    @default 0
 *    @desc Sets the Y coordinate that the Window will move to.
 *
 * @command setAwayFOEWindow
 * @text Set Away FOE Window
 * @desc Set the Away Position of FOE Proximity Warning Window
 *
 *    @arg xPos
 *    @text X
 *    @type text
 *    @default 0
 *    @desc Sets the X coordinate that the Window will move to.
 *
 *    @arg yPos
 *    @text Y
 *    @type text
 *    @default 0
 *    @desc Sets the Y coordinate that the Window will move to.
 *
 *
 * @command setFOEThresholds
 * @text Set FOE Thresholds
 * @desc Set the FOE Proximity Thresholds for Stage 1, Stage 2, Stage 3.
 *
 *    @arg stage1
 *    @text Stage1
 *    @type number
 *    @default 0
 *    @desc Sets the Stage 1 step threshold.
 *
 *    @arg stage2
 *    @text Stage2
 *    @type number
 *    @default 0
 *    @desc Sets the Stage 2 step threshold.
 *
 *    @arg stage3
 *    @text Stage3
 *    @type number
 *    @default 0
 *    @desc  Sets the Stage 3 step threshold.
 *
 * @command resetEncounterCount
 * @text Reset Encounter Count
 * @desc Reset the steps building to the next encounter to 0.
 *
 * @command showFOEMark
 * @text Show FOE Mark
 * @desc Enables this event to show up in the FOE Proximity UI.
 *
 *    @arg id
 *    @text ID
 *    @type number
 *    @desc ID of the Event that this change is made to (optional)
 *
 * @command hideFOEMark
 * @text Hide FOE Mark
 * @desc Disables this event to show up in the FOE Proximity UI.
 *
 *    @arg id
 *    @text ID
 *    @type number
 *    @desc ID of the Event that this change is made to (optional)
 *
 * @param ew_base
 * @text Encounter Warning
 * @type boolean
 * @desc If ON, shows the Encounter Warning Window. If OFF, hides the Encounter Warning Window.
 * @default true
 *
 * @param ew_uiSettings
 * @text UI Settings
 * @parent ew_base
 *
 * @param ew_Home
 * @text Home Position
 * @desc Coordinates of Encounter Warning Window of Home Position
 * @parent ew_uiSettings
 * @type struct<Coordinate>
 *
 * @param ew_Away
 * @text Away Position
 * @desc Coordinates of Encounter Warning Window of Away Position
 * @parent ew_uiSettings
 * @type struct<Coordinate>
 *
 * @param ew_Size
 * @text Size
 * @desc Dimensions of Encounter Warning Window
 * @parent ew_uiSettings
 * @type struct<Dimensions>
 *
 * @param ew_thresholds
 * @text Thresholds
 * @parent ew_base
 *
 * @param ew_defaultBase
 * @parent ew_thresholds
 * @text Default
 * @type file
 * @dir img/system
 *
 * @param ew_stage1Thresh
 * @parent ew_thresholds
 * @text Stage 1
 * @type struct<Threshold>
 *
 * @param ew_stage2Thresh
 * @parent ew_thresholds
 * @text Stage 2
 * @type struct<Threshold>
 *
 * @param ew_stage3Thresh
 * @parent ew_thresholds
 * @text Stage 3
 * @type struct<Threshold>
 *
 * @param ew_animRate
 * @text Anim Speed
 * @desc How many frames before the sprite animates next frame. Set to 0 to keep static.
 * @parent ew_thresholds
 * @type number
 * @default 5
 *
 * @param fp_base
 * @text FOE Proximity
 * @type boolean
 * @desc If ON, shows the FOE Proximity Window. If OFF, hides the FOE Proximity Window.
 * @default true
 *
 * @param fp_showInRange
 * @text Show In Range?
 * @parent fp_base
 * @type boolean
 * @desc If ON, will show the Window only when in Stage 1 range of FOE. If OFF, Window will always show.
 * @default false
 *
 * @param fp_uiSettings
 * @text UI Settings
 * @parent fp_base
 *
 * @param fp_Home
 * @text Home Position
 * @desc Coordinates of FOE Proximity Window of Home Position
 * @parent fp_uiSettings
 * @type struct<Coordinate>
 *
 * @param fp_Away
 * @text Away Position
 * @desc Coordinates of FOE Proximity Window of Away Position
 * @parent fp_uiSettings
 * @type struct<Coordinate>
 *
 * @param fp_Size
 * @text Size
 * @desc Dimensions of FOE Proximity Window
 * @parent fp_uiSettings
 * @type struct<Dimensions>
 *
 * @param fp_thresholds
 * @text Thresholds
 * @parent fp_base
 *
 * @param fp_defaultBase
 * @parent fp_thresholds
 * @text Default
 * @type file
 * @dir img/system
 *
 * @param fp_stage1Thresh
 * @parent fp_thresholds
 * @text Stage 1
 * @type struct<Threshold>
 *
 * @param fp_stage2Thresh
 * @parent fp_thresholds
 * @text Stage 2
 * @type struct<Threshold>
 *
 * @param fp_stage3Thresh
 * @parent fp_thresholds
 * @text Stage 3
 * @type struct<Threshold>
 *
 * @param fp_animRate
 * @text Anim Speed
 * @desc How many frames before the sprite animates next frame. Set to 0 to keep static.
 * @parent fp_thresholds
 * @type number
 * @default 10
 *
 * @help
 *
 * =============================================================================
 *                                   Overview
 * =============================================================================
 * Encounter Warning is a plugin for RPG Maker MV/MZ that alters how Encounter 
 * Steps are counted by setting them to predefined thresholds: Stage 1 (safe), 
 * Stage 2 (cautious) and Stage 3 (immiment). These thresholds determine how 
 * many steps the player can take before the next encounter and what the 
 * apperance of the UI is at each stage.
 *
 * Encounters will only happen AFTER the player has taken steps equal to the 
 * Stage 3 threshold. This is determined by the formula:
 *
 * Steps to Encounter = Stage 3 Thresh + Random(0 - Map Encounter Steps) + 1
 *
 * After an Encounter happens, the counter is reset to 0 and the step count is
 * calculated once again using that formula. You can set what the random value
 * in that formula by changing Encounter Steps setting on your Map Properties.
 *
 * If the thresholds are changed by a script call or plugin command before an 
 * Encounter happens, then the steps accumulated will carry over and the 
 * Encounter Warning UI will change to match.
 *
 * The plugin can also add a FOE Proximity UI which can be used to mark Events 
 * which represent Elite enemies that are visibile on the Map. Events with the 
 * <FOE> Notetag are tracked by the UI and as they approach the player, the UI
 * will go up from Stage 1 to Stage 2 to Stage 3 to represent how many tiles 
 * away they are from the player position. The thresholds for each of these
 * Stages can be set in plugin parameters. Plugin commands can also toggle 
 * whether Events show up on the FOE Proximity UI.
 *
 * This plugin can work standalone but will work best with MYTH_TurnBasedMovement 
 * and MV3D/MZ3D plugins if you want to recreate the Etrian style of navigation.
 *
 * =============================================================================
 *                                 Plugin Commands
 * =============================================================================
 *
 *     ShowEncounterWindow
 * Command to show the Encounter Warning Window (map only).
 *
 *     HideEncounterWindow
 * Command to hide the Encounter Warning Window (map only).
 *
 *     MoveEncounterWindow X Y
 * Command to move the Encounter Warning Window to X and Y coordinates (map only).
 *
 *     SetHomeEncounterWindow X Y
 * Set hew Home Position to Encounter Warning Window to X and Y coordinates (map only).
 *
 *     SetAwayEncounterWindow X Y
 * Set hew Away Position to Encounter Warning Window to X and Y coordinates (map only).
 *
 *     SetEncounterThresholds X Y Z
 * Command to set the Thresholds for Stage 1, Stage 2 and Stage 3 respectively.
 * X, Y and Z must be number greater than or equal to 0
 *
 *     ResetEncounterCount
 * Command to reset the steps building to the next encounter.
 * Required total of steps till the next Encounter remains the same.
 *
 *     ShowFOEWindow
 * Command to show the FOE Proximity Window (map only).
 *
 *     HideFOEWindow
 * Command to hide the FOE Proximity Window (map only).
 *
 *     MoveFOEWindow X Y
 * Command to move the FOE Proximity Window to X and Y coordinates (map only).
 *
 *     SetHomeFOEWindow X Y
 * Set hew Home Position to FOE Proximity Window to X and Y coordinates (map only).
 *
 *     SetAwayFOEWindow X Y
 * Set hew Away Position to FOE Proximity Window to X and Y coordinates (map only).
 *
 *     SetFOEThresholds X Y Z
 * Command to set the Thresholds for Stage 1, Stage 2 and Stage 3 respectively.
 * X, Y and Z must be number greater than or equal to 0
 *
 *    ShowFOEMark X
 * Command that shows the FOE tag from an on-map Event so Proximity UI will pick up
 * on their position. X refers to the ID of the Event you want to turn the flag on
 * for. If X is not given, this will target the current Event.
 *
 *    HideFOEMark X
 * Command that hide the FOE tag from an on-map Event so Proximity UI won't pick up 
 * on their position. X refers to the ID of the Event you want to turn the flag OFF
 * for. If X is not given, this will target the current Event.
 *
 * =============================================================================
 *                                 Script Calls
 * =============================================================================
 *
 *    MYTH.EWFP.showEWWindow()
 * Shows the Encounter Warning window on screen.
 *
 *    MYTH.EWFP.homeEWWindow()
 * Hides the Encounter Warning window on screen.
 *
 *    MYTH.EWFP.moveEWWindow(x, y)
 * Moves the Encounter Warning window to a new X and Y coordinate.
 *
 *     MYTH.EWFP.setHomeEWWindow(x, y)
 * Sets new anchor position for the Encounter Warning window
 *
 *     MYTH.EWFP.goHomeEWWindow()
 * Sets the Encounter Warning window back to its X and Y anchors.
 *
 *    MYTH.EWFP.showFPWindow()
 * Shows the FOE Proximity window on screen.
 *
 *    MYTH.EWFP.homeFPWindow()
 * Hides the FOE Proximity window on screen.
 *
 *    MYTH.EWFP.moveFPWindow(x, y)
 * Moves the FOE Proximity window to a new X and Y coordinate.
 *
 *     MYTH.EWFP.setHomeFPWindow(x, y)
 * Sets new anchor position for the FOE Proximity window
 *
 *     MYTH.EWFP.goHomeFPWindow()
 * Sets the FOE Proximity window back to its X and Y anchors.
 *
 *     MYTH.EWFP.changeThreshold(type, min)
 * Change the step threshold for chosen state of the Encounter Warning.
 * type can be "Stage1", "Stage2" and "Stage3"
 * min can be a number greater than or equal to 0
 *
 *    MYTH.EWFP.resetEncounterCount()
 * Resets the step count building to the next encounter to 0.
 * Required total of steps till the next Encounter remains the same.
 *
 * =============================================================================
 *                              Version History
 * =============================================================================
 *
 * v1.1.0	- Consolidated Anchor and Size params into structs
			- Added in Tracker UI Class and Lerp Movement Functions
			- Changed Params Red, Yellow, Green to Stage 1, Stage 2, Stage 3
 *			- Added in FOE Proximity Window, all its settings and commands
 *
 * v1.0.0 - Base Features Complete
 *
 * =============================================================================
 *                              Contact Information
 * =============================================================================
 *
 * This tool was developed by folks at MythAtelier LLC. We make Games that Care.
 *
 * Need more tools for your project? Be sure to check out our other plugins here:
 * https://itch.io/c/1695699/tools-plugins
 *
 * Have any questions? Run into any bugs? Want to chat? Best place to reach us: 
 * https://discord.gg/wRk4XHF5tZ
 *
 * If you like this plugin and want to support us, please give our Patreon a look:
 * https://www.patreon.com/mythatelier
 *
*/

/*~struct~Coordinate:
 * @param x
 * @text X Coordinate
 * @type string
 * @default 0
 *
 * @param y
 * @text Y Coordinate
 * @type string
 * @default 0
 *
*/

/*~struct~Dimensions:
 * @param width
 * @text Width
 * @type string
 * @default 128
 *
 * @param height
 * @text Height
 * @type string
 * @default 128
 *
*/

/*~struct~Threshold:
*
* @param minThresh
* @text Minimum
* @type number
*
* @param spriteSheet
* @text Sprite Sheet
* @type file
* @dir img/system
*
* @param changeSE
* @text Change SE
* @desc Sound Effect that plays when it changes to this threshold.
* @type text 
*
*/

var MYTH = MYTH || {};
var Imported = Imported || {};

MYTH.EWFP = MYTH.EWFP || {};
MYTH.EWFP.version = 1.0;

MYTH.Util = MYTH.Util || {};
MYTH.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");
MYTH.Util.spritePrototype = MYTH.Util.usingMZ ? Sprite_Clickable : Sprite_Base;

function lerp(a, b, alpha)
{
	return a + alpha * (b - a);
}

MYTH.EWFP.parameters = PluginManager.parameters('MYTH_EncounterWarning');

MYTH.EWFP.ew_dimensions = {
	winWidth: JSON.parse(MYTH.EWFP.parameters.ew_Size).width,
	winHeight: JSON.parse(MYTH.EWFP.parameters.ew_Size).height,
	xHome: JSON.parse(MYTH.EWFP.parameters.ew_Home).x,
	yHome: JSON.parse(MYTH.EWFP.parameters.ew_Home).y,
	xAway: JSON.parse(MYTH.EWFP.parameters.ew_Away).x,
	yAway: JSON.parse(MYTH.EWFP.parameters.ew_Away).y
}

MYTH.EWFP.ew_bitmaps = {
	default: MYTH.EWFP.parameters.ew_defaultBase,
	stage1: JSON.parse(MYTH.EWFP.parameters.ew_stage1Thresh).spriteSheet,
	stage2: JSON.parse(MYTH.EWFP.parameters.ew_stage2Thresh).spriteSheet,
	stage3: JSON.parse(MYTH.EWFP.parameters.ew_stage3Thresh).spriteSheet
}

MYTH.EWFP.ew_thresholds = {
	stage1 : JSON.parse(MYTH.EWFP.parameters.ew_stage1Thresh).minThresh,
	stage2 : JSON.parse(MYTH.EWFP.parameters.ew_stage2Thresh).minThresh,
	stage3 : JSON.parse(MYTH.EWFP.parameters.ew_stage3Thresh).minThresh
}

MYTH.EWFP.fp_dimensions = {
	winWidth: JSON.parse(MYTH.EWFP.parameters.fp_Size).width,
	winHeight: JSON.parse(MYTH.EWFP.parameters.fp_Size).height,
	xHome: JSON.parse(MYTH.EWFP.parameters.fp_Home).x,
	yHome: JSON.parse(MYTH.EWFP.parameters.fp_Home).y,
	xAway: JSON.parse(MYTH.EWFP.parameters.fp_Away).x,
	yAway: JSON.parse(MYTH.EWFP.parameters.fp_Away).y
}

MYTH.EWFP.fp_bitmaps = {
	default: MYTH.EWFP.parameters.fp_defaultBase,
	stage1: JSON.parse(MYTH.EWFP.parameters.fp_stage1Thresh).spriteSheet,
	stage2: JSON.parse(MYTH.EWFP.parameters.fp_stage2Thresh).spriteSheet,
	stage3: JSON.parse(MYTH.EWFP.parameters.fp_stage3Thresh).spriteSheet
}

MYTH.EWFP.fp_thresholds = {
	stage1 : JSON.parse(MYTH.EWFP.parameters.fp_stage1Thresh).minThresh,
	stage2 : JSON.parse(MYTH.EWFP.parameters.fp_stage2Thresh).minThresh,
	stage3 : JSON.parse(MYTH.EWFP.parameters.fp_stage3Thresh).minThresh
}

MYTH.EWFP.fp_showInRange = JSON.parse(MYTH.EWFP.parameters.fp_showInRange);

MYTH.EWFP.ui_config = {
	ew_visible: JSON.parse(MYTH.EWFP.parameters.ew_base),
	ew_drawStow: true,
	fp_visible: JSON.parse(MYTH.EWFP.parameters.fp_base),
	fp_drawStow: false
}

MYTH.EWFP.stepData = {
	stepCount: 0,
	currState: "",
	nextState: ""
}

MYTH.EWFP.showEWWindow = function()
{
	var win = SceneManager._scene._encounterWarning;
	if(win)	SceneManager._scene._encounterWarning.show();
}

MYTH.EWFP.hideEWWindow = function()
{
	var win = SceneManager._scene._encounterWarning;
	if(win)	SceneManager._scene._encounterWarning.hide();
}

MYTH.EWFP.moveEWWindow = function(x, y)
{
	var win = SceneManager._scene._encounterWarning;
	if(win)
	{
		win.x = x;
		win.y = y;
	}
}

MYTH.EWFP.setHomeEWWindow = function(x, y)
{
	var win = SceneManager._scene._encounterWarning;
	if(win)
	{
		MYTH.EWFP.ew_dimensions.xHome = x;
		MYTH.EWFP.ew_dimensions.yHome = y;
	}
}

MYTH.EWFP.setAwayEWWindow = function(x, y)
{
	var win = SceneManager._scene._encounterWarning;
	if(win)
	{
		MYTH.EWFP.ew_dimensions.xAway = x;
		MYTH.EWFP.ew_dimensions.yAway = y;
	}
}

MYTH.EWFP.goHomeEWWindow = function()
{
	var win = SceneManager._scene._encounterWarning;
	if(win)
	{
		win.x = eval(String(MYTH.EWFP.parameters.ew_xAnchor));
		win.y = eval(String(MYTH.EWFP.parameters.ew_yAnchor));
	}
}

MYTH.EWFP.showFPWindow = function()
{
	var win = win = SceneManager._scene._foeProximity;
	if(win) SceneManager._scene._foeProximity.show();
}

MYTH.EWFP.hideFPWindow = function()
{
	var win = SceneManager._scene._foeProximity;
	if(win)	SceneManager._scene._foeProximity.hide();
}

MYTH.EWFP.moveFPWindow = function(x, y)
{
	var win = SceneManager._scene._foeProximity;
	if(win)
	{
		win.x = x;
		win.y = y;
		win._atFinal = true;
	}
}

MYTH.EWFP.setHomeFPWindow = function(x, y)
{
	var win = SceneManager._scene._foeProximity;
	if(win)
	{
		MYTH.EWFP.fp_dimensions.xHome = x;
		MYTH.EWFP.fp_dimensions.yHome = y;
	}
}

MYTH.EWFP.setAwayFPWindow = function(x, y)
{
	var win = SceneManager._scene._foeProximity;
	if(win)
	{
		MYTH.EWFP.fp_dimensions.xAway = x;
		MYTH.EWFP.fp_dimensions.yAway = y;
	}
}

MYTH.EWFP.goHomeFPWindow = function()
{
	var win = SceneManager._scene.foeProximity;
	if(win)
	{
		win.x = eval(String(MYTH.EWFP.parameters.fp_xHome));
		win.y = eval(String(MYTH.EWFP.parameters.fp_yHome));
	}
}

MYTH.EWFP.changeEWThreshold = function(type, min)
{
	switch(type)
	{
		case "Stage 1": MYTH.EWFP.ew_thresholds.stage1 = min; break;
		case "Stage 2": MYTH.EWFP.ew_thresholds.stage2 = min; break;
		case "Stage 3":	MYTH.EWFP.ew_thresholds.stage3 = min; break;
	}

	MYTH.EWFP.checkEWThreshold();
}

MYTH.EWFP.checkEWThreshold = function()
{
	if(Number(MYTH.EWFP.ew_thresholds.stage1) <= 0)
	{
		MYTH.EWFP.ew_thresholds.stage1 = 1;
		console.warn("Encounter Warning Stage 1 Threshold was set to zero/negative. Has been adjusted to " + MYTH.EWFP.ew_thresholds.stage1);
	}

	if(Number(MYTH.EWFP.ew_thresholds.stage2) < Number(MYTH.EWFP.ew_thresholds.stage1))
	{
		MYTH.EWFP.ew_thresholds.stage2 = Number(MYTH.EWFP.ew_thresholds.stage1) + 1;
		console.warn("Encounter Warning Stage 2 Threshold was lower than Stage 1. Has been adjusted to " + MYTH.EWFP.ew_thresholds.stage2);
	}

	if(Number(MYTH.EWFP.ew_thresholds.stage3) < Number(MYTH.EWFP.ew_thresholds.stage2))
	{
		MYTH.EWFP.ew_thresholds.stage3 = Number(MYTH.EWFP.ew_thresholds.stage2) + 1;
		console.warn("Encounter Warning Stage 3 Threshold was lower than Stage 2. Has been adjusted to " + MYTH.EWFP.ew_thresholds.stage3);
	}
}

MYTH.EWFP.changeFPThreshold = function(type, min)
{
	switch(type)
	{
		case "Stage 1": MYTH.EWFP.fp_thresholds.stage1 = min; break;
		case "Stage 2": MYTH.EWFP.fp_thresholds.stage2 = min; break;
		case "Stage 3":	MYTH.EWFP.fp_thresholds.stage3 = min; break;
	}

	MYTH.EWFP.checkFPThreshold();
}

MYTH.EWFP.checkFPThreshold = function()
{
	if(Number(MYTH.EWFP.fp_thresholds.stage3) <= 0)
	{
		MYTH.EWFP.fp_thresholds.stage3 = 1;
		console.warn("FOE Proximity Stage 3 Threshold was set to zero/negative number. Has been adjusted to " + MYTH.EWFP.fp_thresholds.stage3);
	}

	if(Number(MYTH.EWFP.fp_thresholds.stage2) < Number(MYTH.EWFP.fp_thresholds.stage3))
	{
		MYTH.EWFP.fp_thresholds.stage2 = Number(MYTH.EWFP.fp_thresholds.stage3) + 1;
		console.warn("FOE Proximity Stage 2 Threshold was lower than Stage 3. Has been adjusted to " + MYTH.EWFP.fp_thresholds.stage2);
	}

	if(Number(MYTH.EWFP.fp_thresholds.stage1) < Number(MYTH.EWFP.fp_thresholds.stage2))
	{
		MYTH.EWFP.fp_thresholds.stage1 = Number(MYTH.EWFP.fp_thresholds.stage2) + 1;
		console.warn("FOE Proximity Stage 1 Threshold was lower than Stage 2. Has been adjusted to " + MYTH.EWFP.fp_thresholds.stage1);
	}
}

MYTH.EWFP.resetEncounterCount = function()
{
	if(SceneManager._scene._encounterWarning)
	{
		SceneManager._scene._encounterWarning._stepCount = 0;
		SceneManager._scene._encounterWarning.checkState();
	}

	MYTH.EWFP.stepData.stepCount = 0;
}

MYTH.EWFP.showFOEMark = function(eventId)
{
	if(eventId != null)
	{
		if($gameMap._events[eventId]) $gameMap._events[eventId]._FOEcheck = true;
	}
	else
	{
		$gameMap._events[$gameMap._interpreter.eventId()]._FOEcheck = true;
	}
}

MYTH.EWFP.hideFOEMark = function(eventId)
{
	if(eventId != null)
	{
		if($gameMap._events[eventId]) $gameMap._events[eventId]._FOEcheck = false;
	}
	else
	{
		$gameMap._events[$gameMap._interpreter.eventId()]._FOEcheck = false;
	}
}

MYTH.EWFP.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args)
{
	MYTH.EWFP.Game_Interpreter_PluginCommand.call(this, command, args);

	if(command.toLowerCase() == "showencounterwindow") MYTH.EWFP.showEWWindow();
	if(command.toLowerCase() == "hideencounterwindow") MYTH.EWFP.hideEWWindow();
	if(command.toLowerCase() == "moveencounterwindow") MYTH.EWFP.moveEWWindow(args[0], args[1]);
	if(command.toLowerCase() == "sethomeencounterwindow") MYTH.EWFP.setHomeEWWindow(args[0], args[1]);
	if(command.toLowerCase() == "setawayencounterwindow") MYTH.EWFP.setAwayEWWindow(args[0], args[1]);

	if(command.toLowerCase() == "showfoewindow") MYTH.EWFP.showFPWindow();
	if(command.toLowerCase() == "hidefoewindow") MYTH.EWFP.hideFPWindow();
	if(command.toLowerCase() == "movefoewindow") MYTH.EWFP.moveFPWindow(args[0], args[1]);
	if(command.toLowerCase() == "sethomefoewindow") MYTH.EWFP.setHomeFPWindow(args[0], args[1]);
	if(command.toLowerCase() == "setawayfoewindow") MYTH.EWFP.setAwayFPWindow(args[0], args[1]);

	if(command.toLowerCase() == "setencounterthresholds")
	{
		MYTH.EWFP.changeEWThreshold("Stage1", args[0]);
		MYTH.EWFP.changeEWThreshold("Stage2", args[1]);
		MYTH.EWFP.changeEWThreshold("Stage3", args[2]);
		if(SceneManager._scene._encounterWarning)	SceneManager._scene._encounterWarning.checkState();
	}

	if(command.toLowerCase() == "setfoethresholds")
	{
		MYTH.EWFP.changeFPThreshold("Stage1", args[0]);
		MYTH.EWFP.changeFPThreshold("Stage2", args[1]);
		MYTH.EWFP.changeFPThreshold("Stage3", args[2]);
		if(SceneManager._scene._encounterWarning)	SceneManager._scene._encounterWarning.checkState();
	}

	if(command.toLowerCase() == "resetencountercount") MYTH.EWFP.resetEncounterCount();
	if(command.toLowerCase() == "showfoemark") MYTH.EWFP.showFOEMark(args[0]);
	if(command.toLowerCase() == "hidefoemark") MYTH.EWFP.hideFOEMark(args[0]);
}

if(MYTH.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_EncounterWarning", "showEncounterWindow", args =>
	{
		JSON.parse(args.enabled) ? MYTH.EWFP.showEWWindow() : MYTH.EWFP.hideEWWindow();
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "showFOEWindow", args =>
	{
		JSON.parse(args.enabled) ? MYTH.EWFP.showFPWindow() : MYTH.EWFP.hideFPWindow();
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "setHomeEncounterWindow", args =>
	{
		MYTH.EWFP.setHomeEWWindow(Number(args.xPos), Number(args.yPos));
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "setAwayEncounterWindow", args =>
	{
		MYTH.EWFP.setAwayEWWindow(Number(args.xPos), Number(args.yPos));
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "moveEncounterWindow", args =>
	{
		MYTH.EWFP.moveEWWindow(Number(args.xPos), Number(args.yPos));
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "setEncounterThresholds", args =>
	{
		MYTH.EWFP.changeEWThreshold(Number(args.stage1));
		MYTH.EWFP.changeEWThreshold(Number(args.stage2));
		MYTH.EWFP.changeEWThreshold(Number(args.stage3));
		if(SceneManager._scene._encounterWarning)	SceneManager._scene._encounterWarning.checkState();
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "setFOEThresholds", args =>
	{
		MYTH.EWFP.changeFPThreshold(Number(args.stage1));
		MYTH.EWFP.changeFPThreshold(Number(args.stage2));
		MYTH.EWFP.changeFPThreshold(Number(args.stage3));
		if(SceneManager._scene._encounterWarning)	SceneManager._scene._encounterWarning.checkState();
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "setHomeFOEWindow", args =>
	{
		MYTH.EWFP.setHomeFPWindow(Number(args.xPos), Number(args.yPos));
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "setAwayFOEWindow", args =>
	{
		MYTH.EWFP.setAwayFPWindow(Number(args.xPos), Number(args.yPos));
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "showFOEMark", args =>
	{
		 MYTH.EWFP.showFOEMark(args[0]);
	});

	PluginManager.registerCommand("MYTH_EncounterWarning", "hideFOEMark", args =>
	{
		 MYTH.EWFP.hideFOEMark(args[0]);
	});
}

//=============================================================================
//                                Tracker UI
//=============================================================================

function Window_TrackerUI()
{
	this.initialize.apply(this, arguments);
}

Window_TrackerUI.prototype = Object.create(Window_Base.prototype);
Window_TrackerUI.prototype.contructor = Window_TrackerUI;

Window_TrackerUI.prototype.initialize = function(x, y, width, height)
{
	if(MYTH.Util.usingMZ)
	{
		const rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
	}
	else
	{
		Window_Base.prototype.initialize.call(this, x, y, width, height);
	}

	this._uiBase = new MYTH.Util.spritePrototype();

	this._atFinal = true;
	this._isDrawn = false;

	this._finalX = x;
	this._finalY = y;
	this._latUpdate = 0;
	this._speed = 0.5;

	this._stage1Bmp = null;
	this._stage2Bmp = null;
	this._stage3Bmp = null;

	this._frameCount = 0;
	this._frameIndex = 0;

	this._currState = "";
	this._nextState = "";

	this.setBackgroundType(2);
}

Window_TrackerUI.prototype.update = function()
{
	Window_Base.prototype.update.call(this);

	if(this.contents)
	{
		var now = Date.now();
		var dt = now -this._lastUpdate;
		this._lastUpdate = now;

		if(!this._atFinal) this.lerpMove(dt);
	}
}

Window_TrackerUI.prototype.drawOut = function()
{
	this.setFinalDest(0, 0);
	this._isDrawn = true;
}

Window_TrackerUI.prototype.stowAway = function()
{
	this.setFinalDest(0, 0);
	this._isDrawn = false;
}

Window_TrackerUI.prototype.setFinalDest = function(x, y)
{
	this._finalX = x;
	this._finalY = y;
	this._atFinal = false;
}

Window_TrackerUI.prototype.lerpMove = function(dt)
{
	if(this.x < this._finalX) this.x += (this.x, this._finalX, dt * this._speed);
	if(this.x > this._finalX) this.x -= (this.x, this._finalX, dt * this._speed);
	if(this.y < this._finalY) this.y += (this.y, this._finalY, dt * this._speed);
	if(this.y > this._finalY) this.y -= (this.y, this._finalY, dt * this._speed);

	if(this.x == this._finalX && this.y == this._finalY) this.atFinal = true;
}

//=============================================================================
//                        FOE Proximity Window
//=============================================================================

function Window_FOEProximity()
{
	this.initialize.apply(this, arguments);
}

Window_FOEProximity.prototype = Object.create(Window_TrackerUI.prototype);
Window_FOEProximity.prototype.constructor = Window_FOEProximity;

Window_FOEProximity.prototype.initialize = function(x, y, width, height)
{

	Window_TrackerUI.prototype.initialize.call(this, x, y, width, height);

	this._uiBase.bitmap = ImageManager.loadSystem(MYTH.EWFP.fp_bitmaps.default);
	this.addChild(this._uiBase);

	this._stage1Bmp = ImageManager.loadSystem(MYTH.EWFP.fp_bitmaps.stage1);
	this._stage2Bmp = ImageManager.loadSystem(MYTH.EWFP.fp_bitmaps.stage2);
	this._stage3Bmp = ImageManager.loadSystem(MYTH.EWFP.fp_bitmaps.stage3);

	this.visible = MYTH.EWFP.ui_config.fp_visible;
	this._isDrawn = MYTH.EWFP.ui_config.fp_drawStow;

	this.checkState();
	this.update();
	if(!MYTH.EWFP.fp_showInRange) this.drawOut();
}

Window_FOEProximity.prototype.update = function()
{
	Window_TrackerUI.prototype.update.call(this);

	if(this.contents)
	{
		this.checkState();
		this.contents.clear();
		this.drawItems();
	}
}

Window_FOEProximity.prototype.show = function()
{
	Window_TrackerUI.prototype.show.call(this);
}

Window_FOEProximity.prototype.hide = function()
{
	Window_TrackerUI.prototype.hide.call(this);
}

Window_FOEProximity.prototype.drawOut = function()
{
	this.setFinalDest(MYTH.EWFP.fp_dimensions.xHome, MYTH.EWFP.fp_dimensions.yHome);
	this._isDrawn = true;
	MYTH.EWFP.ui_config.fp_drawStow = this._isDrawn;
}

Window_FOEProximity.prototype.stowAway = function()
{
	this.setFinalDest(MYTH.EWFP.fp_dimensions.xAway, MYTH.EWFP.fp_dimensions.yAway);
	this._isDrawn = false;
	MYTH.EWFP.ui_config.fp_drawStow = this._isDrawn;
}

Window_FOEProximity.prototype.checkState = function()
{
	var FOEarray = [];
	$gameMap._events.forEach((event) => { if(event._FOEcheck) FOEarray.push(event); } )
	var closest = 9999;

	for(var i = 0; i < FOEarray.length; ++i)
	{
		var dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, FOEarray[i].x, FOEarray[i].y);
		if(dist < closest) closest = dist;
	}

	if(closest <= MYTH.EWFP.fp_thresholds.stage3)
	{
		this._nextState = "Stage3";
	}
	else if(MYTH.EWFP.fp_thresholds.stage3 < closest && closest <= MYTH.EWFP.fp_thresholds.stage2)
	{
		this._nextState = "Stage2";
	}
	else if(MYTH.EWFP.fp_thresholds.stage2 < closest && closest <= MYTH.EWFP.fp_thresholds.stage1)
	{
		this._nextState = "Stage1";
	}
	else
	{
		this._nextState = "";
	}
}

Window_FOEProximity.prototype.drawItems = function()
{
	if(MYTH.EWFP.fp_showInRange)
	{
		if(this._currState == "")
		{
			this.stowAway();
		}
		else
		{
			this.drawOut();
		}
	}

	if(this._currState != this._nextState)
	{
		let se = {};

		switch(this._nextState)
		{
			case "Stage1":
			{
				this._uiBase.bitmap = this._stage1Bmp;
				se = {name: String(JSON.parse(MYTH.EWFP.parameters.fp_stage1Thresh).changeSE), volume: 50, pitch: 100, pan: 0};
			}
			break;
			case "Stage2":
			{
				this._uiBase.bitmap = this._stage2Bmp;
				se = {name: String(JSON.parse(MYTH.EWFP.parameters.fp_stage2Thresh).changeSE), volume: 50, pitch: 100, pan: 0};
			}
			break;
			case "Stage3":
			{
				this._uiBase.bitmap = this._stage3Bmp;
				se = {name: String(JSON.parse(MYTH.EWFP.parameters.fp_stage3Thresh).changeSE), volume: 50, pitch: 100, pan: 0};
			}
			break;
			default:
			{
				this._uiBase.bitmap = ImageManager.loadSystem(MYTH.EWFP.fp_bitmaps.default);
			}
			break;
		}

		this._currState = this._nextState;
		if(se && this.visible) AudioManager.playSe(se);

		this._uiBase.setFrame(0, 0, MYTH.EWFP.fp_dimensions.winWidth, MYTH.EWFP.fp_dimensions.winHeight);
	}

	if(this._uiBase.bitmap && this._uiBase.bitmap.isReady())
	{
		if(this._frameCount > Number(MYTH.EWFP.parameters.fp_animRate))
		{
			this._frameIndex++;
			if(this._frameIndex >= Math.floor(this._uiBase.bitmap.width / MYTH.EWFP.fp_dimensions.winWidth)) this._frameIndex = 0;

			var frameSizeX = this._uiBase.bitmap.width / MYTH.EWFP.fp_dimensions.winWidth;
			var xOffset = Math.floor(this._frameIndex * MYTH.EWFP.fp_dimensions.winWidth);
			this._uiBase.setFrame(xOffset, 0, MYTH.EWFP.fp_dimensions.winWidth, MYTH.EWFP.fp_dimensions.winHeight);

			this._frameCount = 0;
		}
		else
		{
			this._frameCount++;
		}
	}
}

//=============================================================================
//                         Encounter Warning Window
//=============================================================================

function Window_EncounterWarning()
{
	this.initialize.apply(this, arguments);
}

Window_EncounterWarning.prototype = Object.create(Window_TrackerUI.prototype);
Window_EncounterWarning.prototype.constructor = Window_EncounterWarning;

Window_EncounterWarning.prototype.initialize = function(x, y, width, height)
{
	Window_TrackerUI.prototype.initialize.call(this, x, y, width, height);

	this._uiBase.bitmap = ImageManager.loadSystem(MYTH.EWFP.ew_bitmaps.default);
	this.addChild(this._uiBase);

	this._stage1Bmp = ImageManager.loadSystem(MYTH.EWFP.ew_bitmaps.stage1);
	this._stage2Bmp = ImageManager.loadSystem(MYTH.EWFP.ew_bitmaps.stage2);
	this._stage3Bmp = ImageManager.loadSystem(MYTH.EWFP.ew_bitmaps.stage3);

	this._stepCount = MYTH.EWFP.stepData.stepCount;
	this._currState = MYTH.EWFP.stepData.currState;
	this._nextState = MYTH.EWFP.stepData.nextState;

	this.visible = MYTH.EWFP.ui_config.ew_visible;
	this._isDrawn = MYTH.EWFP.ui_config.fp_drawStow;

	this.checkState();
	this.update();
}

Window_EncounterWarning.prototype.show = function()
{
	Window_TrackerUI.prototype.show.call(this);
}

Window_EncounterWarning.prototype.hide = function()
{
	Window_TrackerUI.prototype.hide.call(this);

	MYTH.EWFP.stepData.stepCount = this._stepCount;
	MYTH.EWFP.stepData.currState = "";
	MYTH.EWFP.stepData.nextState = this._currState;
}

Window_EncounterWarning.prototype.checkState = function()
{
	if(this._stepCount >= MYTH.EWFP.ew_thresholds.stage1 && this._stepCount < MYTH.EWFP.ew_thresholds.stage2)
	{
		this._nextState = "Stage1";
	}
	else if(this._stepCount >= MYTH.EWFP.ew_thresholds.stage2 && this._stepCount < MYTH.EWFP.ew_thresholds.stage3)
	{
		this._nextState = "Stage2";
	}
	else if(this._stepCount >= MYTH.EWFP.ew_thresholds.stage3)
	{
		this._nextState = "Stage3";
	}
	else
	{
		this._nextState = "";
	}
}

Window_EncounterWarning.prototype.update = function()
{
	Window_TrackerUI.prototype.update.call(this);

	if(this.contents)
	{
		this.contents.clear();
		this.drawItems();
	}
}

Window_EncounterWarning.prototype.drawOut = function()
{
	this.setFinalDest(MYTH.EWFP.ew_dimensions.xHome, MYTH.EWFP.ew_dimensions.yHome);
	this._isDrawn = true;
	MYTH.EWFP.ui_config.ew_drawStow = this._isDrawn;
}

Window_EncounterWarning.prototype.stowAway = function()
{
	this.setFinalDest(MYTH.EWFP.ew_dimensions.xAway, MYTH.EWFP.ew_dimensions.yAway);
	this._isDrawn = false;
	MYTH.EWFP.ui_config.ew_drawStow = this._isDrawn;
}

Window_EncounterWarning.prototype.drawItems = function()
{
	if(this._currState != this._nextState)
	{
		let se = {};

		switch(this._nextState)
		{
			case "Stage1":
			{
				this._uiBase.bitmap = this._stage1Bmp;
				se = {name: String(JSON.parse(MYTH.EWFP.parameters.ew_stage1Thresh).changeSE), volume: 30, pitch: 100, pan: 0};
			}
			break;
			case "Stage2":
			{
				this._uiBase.bitmap = this._stage2Bmp;
				se = {name: String(JSON.parse(MYTH.EWFP.parameters.ew_stage2Thresh).changeSE), volume: 30, pitch: 100, pan: 0};
			}
			break;
			case "Stage3":
			{
				this._uiBase.bitmap = this._stage3Bmp;
				se = {name: String(JSON.parse(MYTH.EWFP.parameters.ew_stage3Thresh).changeSE), volume: 30, pitch: 100, pan: 0};
			}
			break;
			default:
			{
				this._uiBase.bitmap = ImageManager.loadSystem(MYTH.EWFP.ew_bitmaps.default);
			}
			break;
		}

		this._currState = this._nextState;
		this._uiBase.setFrame(0, 0, MYTH.EWFP.ew_dimensions.winWidth, MYTH.EWFP.ew_dimensions.winHeight);
		if(se && this.visible) AudioManager.playSe(se);
	}

	if(this._uiBase.bitmap && this._uiBase.bitmap.isReady())
	{
		if(this._frameCount > Number(MYTH.EWFP.parameters.ew_animRate))
		{		
			this._frameIndex++; 
			if(this._frameIndex >= Math.floor(this._uiBase.bitmap.width / MYTH.EWFP.ew_dimensions.winWidth)) this._frameIndex = 0;

			var frameSizeX = this._uiBase.bitmap.width / MYTH.EWFP.ew_dimensions.winWidth;
			var xOffset = Math.floor(this._frameIndex * MYTH.EWFP.ew_dimensions.winWidth);
			this._uiBase.setFrame(xOffset, 0, MYTH.EWFP.ew_dimensions.winWidth, MYTH.EWFP.ew_dimensions.winHeight);

			this._frameCount = 0;
		}
		else
		{
			this._frameCount++;
		}
	}
}

//=============================================================================
//                                 Game Player
//=============================================================================

MYTH_GamePlayer_increaseSteps = Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function()
{
    MYTH_GamePlayer_increaseSteps.call(this);
	SceneManager._scene._encounterWarning._stepCount++;
	SceneManager._scene._encounterWarning.checkState();
};

MYTH_GamePlayer_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
Game_Player.prototype.makeEncounterCount = function() {
    this._encounterCount = Number(MYTH.EWFP.ew_thresholds.stage3) + Math.randomInt($gameMap.encounterStep()) + 1;
	MYTH.EWFP.resetEncounterCount();
};

//=============================================================================
//                                  Scene Map
//=============================================================================

Scene_Map.prototype.createEncWarWindow = function()
{
	MYTH.EWFP.checkEWThreshold();

	var width = eval(MYTH.EWFP.ew_dimensions.winWidth); 	if(width) MYTH.EWFP.ew_dimensions.winWidth = width;
	var height = eval(MYTH.EWFP.ew_dimensions.winHeight);	if(height) MYTH.EWFP.ew_dimensions.winHeight = height;
	
	var xHome = eval(MYTH.EWFP.ew_dimensions.xHome); if(xHome)	MYTH.EWFP.ew_dimensions.xHome = xHome;
	var yHome = eval(MYTH.EWFP.ew_dimensions.yHome); if(yHome)	MYTH.EWFP.ew_dimensions.yHome = yHome;

	var xAway = eval(MYTH.EWFP.ew_dimensions.xAway); if(xAway)	MYTH.EWFP.ew_dimensions.xAway = xAway;
	var yAway = eval(MYTH.EWFP.ew_dimensions.yAway); if(yAway)	MYTH.EWFP.ew_dimensions.yAway = yAway;

	this._encounterWarning = new Window_EncounterWarning((MYTH.EWFP.ui_config.ew_drawStow) ? xHome : xAway, 
	(MYTH.EWFP.ui_config.ew_drawStow) ? yHome : yAway, width, height);

	this.addChild(this._encounterWarning);
}

Scene_Map.prototype.createFOEProxWindow = function()
{
	MYTH.EWFP.checkFPThreshold();

	var width = MYTH.EWFP.fp_dimensions.winWidth; 		if(width) MYTH.EWFP.fp_dimensions.winWidth = width;
	var height = MYTH.EWFP.fp_dimensions.winHeight; 	if(height) MYTH.EWFP.fp_dimensions.winHeight = height;
	
	var xHome = eval(MYTH.EWFP.fp_dimensions.xHome); 	if(xHome)	MYTH.EWFP.fp_dimensions.xHome = xHome;
	var yHome = eval(MYTH.EWFP.fp_dimensions.yHome); 	if(yHome)	MYTH.EWFP.fp_dimensions.yHome = yHome;

	var xAway = eval(MYTH.EWFP.fp_dimensions.xAway); 	if(xAway)	MYTH.EWFP.fp_dimensions.xAway = xAway;
	var yAway = eval(MYTH.EWFP.fp_dimensions.yAway); 	if(yAway)	MYTH.EWFP.fp_dimensions.yAway = yAway;

	this._foeProximity = new Window_FOEProximity((MYTH.EWFP.ui_config.fp_drawStow) ? xHome : xAway, 
	(MYTH.EWFP.ui_config.fp_drawStow) ? yHome : yAway, width, height);
	this.addChild(this._foeProximity);
}

MYTH_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function()
{
	this.createEncWarWindow();
	this.createFOEProxWindow();

	MYTH_SceneMap_createAllWindows.call(this);

	/*
	if(MYTH.Util.usingMZ)
	{
		this.createEncWarWindow();
		this.createMapNameWindow();	
	}
	else
	{
		this.createEncWarWindow();
		this.createFOEProxWindow();
		this.createMessageWindow();
		this.createScrollTextWindow();
	}
	*/
}

MYTH_WindowMessage_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	MYTH_WindowMessage_startMessage.call(this);
	MYTH.EWFP.hideEWWindow();
	//MYTH.EWFP.hideFPWindow();
};

MYTH_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
	MYTH_Window_Message_terminateMessage.call(this);
	MYTH.EWFP.showEWWindow();
	MYTH.EWFP.showFPWindow();
};

MYTH_SceneMap_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
	MYTH_SceneMap_callMenu.call(this);
	MYTH.EWFP.hideEWWindow();
	MYTH.EWFP.hideFPWindow();
};

MYTH_SceneMap_launchBattle = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
	MYTH_SceneMap_launchBattle.call(this);
	MYTH.EWFP.hideEWWindow();
	MYTH.EWFP.hideFPWindow();
};

//=============================================================================
//                                Game Event
//=============================================================================

MYTH.EWFP.GameEvent_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function()
{
	MYTH.EWFP.GameEvent_setupPageSettings.call(this);
	this.setupFOEmarkers();
};

Game_Event.prototype.setupFOEmarkers = function()
{
	if(this.event().note === '') return;
	var foeNote = /<FOE>/i;
	if(this.event().note.match(foeNote))
	{
		if(this._FOEcheck == null)	this._FOEcheck = true;
	}
};