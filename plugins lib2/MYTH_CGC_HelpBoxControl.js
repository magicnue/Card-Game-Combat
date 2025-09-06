//=============================================================================
// MYTH_CGC_HelpBoxControl
//=============================================================================
/*:
* @target MZ
* @author Swarnava Banerjee (Neel)
* @plugindesc v1.2.0 Allows you to change settings for the Help Box in Battle. Made to be compatible with CGC.
* @url https://mythatelier.itch.io/card-game-combat
*
* @param Help Box Settings
*
* @param showHelpBox
* @parent Help Box Settings
* @text Show Help Box?
* @desc Determines whether Help Box is shown or hidden
* @type boolean
* @default true
*
* @param helpBoxAnchor
* @parent Help Box Settings
* @type struct<Coordinate>
* @text XY Anchor
* @desc The anchor positions of the Help Box.
* @default {"x":"0","y":"0"}
*
* @param helpBoxWidth
* @parent Help Box Settings
* @text Width
* @desc Width of the Help Box
* @type number
* @default 400
*
* @param helpBoxHeight
* @parent Help Box Settings
* @text Height
* @desc Height of the Help Box
* @type number
* @default 96
*
* @param helpBoxSkin
* @parent Help Box Settings
* @text Window Skin
* @desc Window Skin of the Help Box
* @type file
* @dir img/system
* @require 1
*
* @param helpBoxWrap
* @parent Help Box Settings
* @text Wrap Text?
* @desc Text in Help Box will be word wrapped based on Window Width.
* @type boolean
* @default true
*
* @param helpBoxScreenBuffer
* @parent Help Box Settings
* @text Screen Edge Buffer
* @desc Buffer of how far to keep it from the viewport edges. If set to 0, will not clamp to viewport dimensions.
* @type number
* @default 32
*
* @param helpBoxCardBuffer
* @parent Help Box Settings
* @text Card Offset Buffer
* @desc Buffer of how far to keep it from the Card edges. If Negative, will overlap with selected card.
* @type number
* @default 4
*
* @param helpBoxFontFace
* @parent Help Box Settings
* @text Font Face
* @desc Font Face for the Help Box (has to have the same name as in fonts folder)
* @type string
* @default GameFont
*
* @param helpBoxFontSize
* @parent Help Box Settings
* @text Font Size
* @desc Font Size of the Help Box
* @type number
* @default 22
*
* @param Follow Conditions
*
* @param followHelpBox
* @parent Follow Conditions
* @text Follow Select Card?
* @desc Determines whether the Help Box follows the currently selected card at an offset.
* @type boolean
* @default true
*
* @param helpBoxAlign
* @parent Follow Conditions
* @text Card Align
* @desc Automatically sets Help Box X/Y relative to selected Card position. If "Don't Use", defaults to Anchor X/Y instead.
* @type select
* @option Don't Use
* @option Top
* @option Left
* @option Right
* @option Bottom
* @default Don't Use
*
* @param followHBLockX
* @parent Follow Conditions
* @text Lock X when Follow?
* @desc If True, this will fix X of the Help Box while following so it doesn't offset based on index.
* @type boolean
* @default false
*
* @param followHBLockY
* @parent Follow Conditions
* @text Lock Y when Follow?
* @desc If True, this will fix Y of the Help Box while following so it doesn't offset at an arc.
* @type boolean
* @default false
*
* @param useSmartAlign
* @parent Follow Conditions
* @text Use Smart Align?
* @desc If using Card Align, this shifts Alignment based on viewport edge (e.g. Left -> Right Align if Help Box would go over edge)
* @type boolean
* @default true
*
* @param anchorFallback
* @parent Follow Conditions
* @text Use Anchor Fallback?
* @desc If True, if inspecting outside of the Card Hand, Help Box will fallback to Anchor X Y
* @type boolean
* @default false
*
* @param State Popup Integration
*
* @param stateInfoHost
* @parent State Popup Integration
* @text Host State Windows?
* @desc If using MYTH_StateInfoPopup, this will host those Windows under the Help Box
* @type boolean
* @default false
*
* @param allowDynamicOffset
* @parent State Popup Integration 
* @text Allow Dynamic Offset?
* @desc If ON, offsets Help Box relative to current # of State Windows. If OFF, offsets Help Box based on max # of State Windows.
* @type boolean
* @default true
*
* @param alignOverride
* @parent State Popup Integration
* @text State Align Override
* @desc Use this if you want make sure that the State Windows ONLY show up in one configuration (ignoring Card Align).
* @type select
* @option Don't Use
* @option Top
* @option Left
* @option Right
* @option Bottom
* @default Don't Use
*
*@help
*
 * ============================================================================
 * Overview
 * ============================================================================
* 
* This plugin allows you to change the Help Window into a moving Tooltip that
* follows the currently selected Card in Hand. You can alter the dimensions of
* the Help Window to suit your game's needs. You can set an Anchor Point on screen 
* where the Help Window will go to when not moving around or being offset by another 
* feature. You can change the alignment of the Window relative to the current Card 
* (placing it on Top, to the Left/Right, or on the Bottom).
*
* This plugin supports the State Windows created by the IsiahStateWindow plugin
* so that those Windows are nested under the Help Window. You can change the alignment
* of the State Windows so they appear in a different part of the card or in a new
* configuration that better suits your game's UI. It is recommended to have your
* project at a resolution of 1280 x 720 px or higher to take full advantage of these
* UI Elements (otherwise the screen might feel a little cramped).
*
* If the Help Window or State Windows gets too close to the edge of the screen, 
* you can enable the Screen Edge Buffer and Smart Alignment via plugin parameters
* so letting the plugin figure out how best to show all Windows within the screen.
*
* Made to work with MythCardGameCombat and IsiahStateWindow plugins. Place
* those above this plugin so that the tied in features on this plugin can work.
*
* ============================================================================
* Version History
* ============================================================================
*
* v1.2.0 - Wordwrapping now works a lot better and doesn't cut off with escape characters
*		 - Fixed Show Help Window plugin param not working due to some CoreEngine changes
*
* v1.1.1 - Fixed conflicts with Party UI A, Anchors and Card Align should work now
*        - Added some basic word wrapping so Descriptions don't get cut off
*        - Fixed bug where Help Window wouldn't close when you return to Party Command
*        - Consolidated some params into more comprehensible categories
*
* v1.1.0 - Consolidated some functionality into the core plugin.
*        - Changed plugin name.
* 
* v1.0.3  - Tested MZ Functionality and compatibility for multiple resolutions
*         - Added Help Box Position Align Plugin Parameter (Top, Left, Right, Bottom)
*         - Added Smart Align Option to change Alignment in a way to stay in viewport
*         - Added Card Offset Buffer to limit overlap between Windows and Cards
*         - Added integration for IsiahStateWindows to alter State Window placement
*         - Added plugin parameters for additional configuration of State Windows
*
* v1.0.2  - Help Box remains when a cards are Discarded or Removed as a cost
*         - Help Box now repositions after mouse and gamepad selection is made
*         - Added viewportClamp functions to keep Help Box within screen bounds
*         - Can provide descriptions for Deck and Discard for Help Info Box
*         - Can now change the Help Box Window Skin with plugin parameters
*         - Added AnchorFallback if inspection goes outside Card Hand
*
* v1.0.1  - Added Command Selection Overrides
*
* v1.0.0 - Basic Functionality complete. You can move the Help Box around based on Hand Index.
*/

/*~struct~Coordinate:
 * @param x
 * @text X Coordinate
 * @type number
 * @min -10000
 * @default 0
 *
 * @param y
 * @text Y Coordinate
 * @type number
 * @min -10000
 * @default 0
 *
 */

var Myth = Myth || {};
var Neel = Neel || {};

if (!Myth.CGC)
	console.error("Please make sure MYTH_CGC_CoreEngine is placed above MYTH_CGC_HelpBoxControl");
Neel.CGC = Myth.CGC;
/*
if(!Myth.CGC.PartyUI)
	console.error("Please make sure MYTH_CGC_PartyUI_TypeA is placed above MYTH_CGC_HelpBoxControl");
*/

Myth.HBC = Myth.HCB || {};

Myth.Parameters = PluginManager.parameters('MYTH_CGC_HelpBoxControl');

Myth.HBC.showHelpBox = JSON.parse(Myth.Parameters.showHelpBox);
Myth.HBC.helpBoxAnchorX = JSON.parse(Myth.Parameters.helpBoxAnchor).x;
Myth.HBC.helpBoxAnchorY = JSON.parse(Myth.Parameters.helpBoxAnchor).y;
Myth.HBC.helpBoxWidth = Number(Myth.Parameters.helpBoxWidth);
Myth.HBC.helpBoxHeight = Number(Myth.Parameters.helpBoxHeight);
Myth.HBC.helpBoxAlign = Myth.Parameters.helpBoxAlign;
Myth.HBC.helpBoxSmart = JSON.parse(Myth.Parameters.useSmartAlign);
Myth.HBC.helpBoxModAlign = Myth.helpBoxAlign;
Myth.HBC.helpBoxWrap = JSON.parse(Myth.Parameters.helpBoxWrap);

Myth.HBC.helpBoxScreenBuffer = Number(Myth.Parameters.helpBoxScreenBuffer);
Myth.HBC.helpBoxCardBuffer = Number(Myth.Parameters.helpBoxCardBuffer);

Myth.HBC.helpBoxSkin = Myth.Parameters.helpBoxSkin;
Myth.HBC.helpBoxFontFace = String(Myth.Parameters.helpBoxFontFace);
Myth.HBC.helpBoxFontSize = Number(Myth.Parameters.helpBoxFontSize);
Myth.HBC.followHelpBox = JSON.parse(Myth.Parameters.followHelpBox);
Myth.HBC.followHBLockX = JSON.parse(Myth.Parameters.followHBLockX);
Myth.HBC.followHBLockY = JSON.parse(Myth.Parameters.followHBLockY);
Myth.HBC.anchorFallback = JSON.parse(Myth.Parameters.anchorFallback);

//For safety
var Isiah = Isiah || {};
if (Isiah.StWin)
	Myth.StWin = Isiah.StWin;

if (JSON.parse(Myth.Parameters.stateInfoHost) && !Myth.StWin)
{
	console.error("Please make sure MYTH_StateInfoPopup is placed above MYTH_CGC_HelpBoxControl");
}

Myth.HBC.stateInfoHost = (Myth.StWin) ? JSON.parse(Myth.Parameters.stateInfoHost) : false;
Myth.HBC.stateDynOffset = (Myth.StWin) ? JSON.parse(Myth.Parameters.allowDynamicOffset) : false;
Myth.HBC.stateAlignOverride = Myth.Parameters.alignOverride;

//====================================================
// Window_Help Overrides
//====================================================

Window_Help.prototype.standardFontFace = function(){
	var face = 'GameFont';
	if (SceneManager._scene instanceof Scene_Battle && Myth.HBC.helpBoxFontFace)
		face = Myth.HBC.helpBoxFontFace;
	return face;
}

Myth.HBC.Window_Help_refresh = Window_Help.prototype.refresh;

Window_Help.prototype.refresh = function ()
{
	Myth.HBC.Window_Help_refresh.call(this);
	this.visible = Myth.HBC.showHelpBox;	
}

Window_Help.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;

		if($gameParty.inBattle() && this._text && Myth.HBC.helpBoxWrap)
		{
			var maxWidth = Myth.HBC.helpBoxWidth * 1.1;
			var words = this._text.split(" ");
			var lines = [];
			var currentLine = 0;

			for (var i = 0; i < words.length; i++) {
				var line = lines[currentLine];
				if (line == undefined) line = "";
				var word = words[i].trim();
				var testText = line + " " + word;
				var textWidth = this.textWidth(testText.replace(/\x1b\w+\[\w*\]/ig, ''));
				if (textWidth < maxWidth) {
					line = testText;
					lines[currentLine] = line;
				}
				else
				{
					line = word;
					currentLine++;
					lines[currentLine] = line;
				}
			}
			var totalText = "";
			for (var i = 0; i <= currentLine; i++)
			{
				if (lines[i]) totalText += lines[i].trim() + "\n";
			}
			this._text = totalText;
		}

        this.refresh();
    }
};

Window_Help.prototype.standardFontSize = function(){
	var size = 0;
	(SceneManager._scene instanceof Scene_Battle) ? size = Myth.HBC.helpBoxFontSize : size = 28;;
	return size;
}

//====================================================
// Window_BattleSkill Overrides
//====================================================

Myth.HBC.Window_BattleSkill_updateHandPosition = Window_BattleSkill.prototype.updateHandPosition;
Window_BattleSkill.prototype.updateHandPosition = function()
{
	Myth.HBC.Window_BattleSkill_updateHandPosition.call(this);

	var coords = Myth.CGC.coordinates;
	var cardZone = this._cardSprites.getCardSprites();

	var extraCardHeight = this.contents.fontSize * 2;
	var cardHeight = cardZone[0] ? cardZone[0].bitmap.height + extraCardHeight : extraCardHeight;
	var cardWidth = cardZone[0] ? cardZone[0].bitmap.width : 0;

	for (var i = cardZone.length - 1; i >= 0; i--)
	{
		var card = cardZone[i];
		var cardX = this.getCardX(i, cardZone);
		var cardY = this.getCardY(i, card, cardX);

		var pos = (i + this._itemsBeforeCards);
		if (pos == this.index())
		{
			if(SceneManager._scene._helpWindow && Myth.HBC.followHelpBox)
			{
				SceneManager._scene._helpWindow.x = Myth.HBC.helpBoxAnchorX;
				SceneManager._scene._helpWindow.y = Myth.HBC.helpBoxAnchorY;

				switch(Myth.HBC.helpBoxAlign)
				{
					case "Top":
					{
						if(!Myth.HBC.followHBLockX) SceneManager._scene._helpWindow.x = cardX - SceneManager._scene._helpWindow.width / 2;
						if(!Myth.HBC.followHBLockY) SceneManager._scene._helpWindow.y = cardY - cardHeight/2 - SceneManager._scene._helpWindow.height/2 - coords.cardSelectionY + Myth.HBC.helpBoxCardBuffer;
					}
					break;
					case "Left":
					{
						if(!Myth.HBC.followHBLockX) SceneManager._scene._helpWindow.x = cardX - cardWidth/2 - SceneManager._scene._helpWindow.width - Myth.HBC.helpBoxCardBuffer;
						if(!Myth.HBC.followHBLockY) SceneManager._scene._helpWindow.y = cardY - coords.cardSelectionY;
					}
					break;
					case "Right":
					{
						if(!Myth.HBC.followHBLockX) SceneManager._scene._helpWindow.x = cardX + cardWidth/2 + Myth.HBC.helpBoxCardBuffer;
						if(!Myth.HBC.followHBLockY) SceneManager._scene._helpWindow.y = cardY - coords.cardSelectionY;
					}
					break;
					case "Bottom":
					{
						if(!Myth.HBC.followHBLockX) SceneManager._scene._helpWindow.x = cardX - SceneManager._scene._helpWindow.width / 2;
						if(!Myth.HBC.followHBLockY) SceneManager._scene._helpWindow.y = cardY + cardHeight/2 + coords.cardSelectionY - (SceneManager._scene._helpWindow.height/2 + Myth.HBC.helpBoxCardBuffer);
					}
					break;
				}

				if(Myth.HBC.helpBoxSmart) Myth.HBC.testforSmartAlign(cardX, cardY, cardWidth, cardHeight);
				if(Myth.HBC.helpBoxScreenBuffer > 0) Myth.HBC.viewportClamp();
			}
		}
	}

	if(Myth.HBC.stateInfoHost)
	{
		var item = this.item();
		var statusDescriptionWindows = SceneManager._scene._statusDescriptionWindows;
		var stateAlign = Myth.HBC.helpBoxModAlign;
		if(Myth.HBC.stateAlignOverride != "Don't Use") stateAlign = Myth.HBC.stateAlignOverride;

		//Calculate Final Height (Relative to the number of State Windows shown)

		var numItems = 0;

		if(Myth.HBC.stateDynOffset)
		{
			if(item && item._statesToShow)	numItems = Math.min(item._statesToShow.length, statusDescriptionWindows.length);
			if(Myth.HBC.helpBoxModAlign == "Top" || Myth.HBC.helpBoxModAlign== "Bottom") numItems = Math.floor(numItems/2);
		}
		else
		{
			numItems =	statusDescriptionWindows.length;
		}

		var finalHeight = SceneManager._scene._helpWindow.y + SceneManager._scene._helpWindow.height + (statusDescriptionWindows[0].height + Myth.StWin.coordinates.sepHeight) * numItems;
		
		//If Over Viewport Edge, then push Help Box Y up to where all Windows can be seen

		if(finalHeight > Graphics.boxHeight)
		{
			var boxYOffset = finalHeight - Graphics.boxHeight;
			SceneManager._scene._helpWindow.y -= boxYOffset;
		}

		for(var i = 0; i < statusDescriptionWindows.length; i++)
		{
			switch(stateAlign)
			{
				case "Top":
				{
					statusDescriptionWindows[i].x = SceneManager._scene._helpWindow.x + cardWidth * (i % 2 == 0 ? -1 : 2) + (i % 2 == 0 ? 0 : Myth.HBC.helpBoxCardBuffer * 2);
					if(Myth.HBC.helpBoxModAlign == "Left") statusDescriptionWindows[i].x += cardWidth * (i % 2 == 1 ? -1 : 0) - (i % 2 == 1 ? Myth.HBC.helpBoxCardBuffer * 2 : 0);
					if(Myth.HBC.helpBoxModAlign == "Right") statusDescriptionWindows[i].x += cardWidth * (i % 2 == 0 ? 1 : 0) - (i % 2 == 0 ? 0 : Myth.HBC.helpBoxCardBuffer * 2);
					statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y + SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * Math.floor(i / 2);
					if(Myth.HBC.helpBoxModAlign == "Bottom") statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y - (SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * Math.floor(i / 2));
				}
				break;
				case "Left":
				{
					statusDescriptionWindows[i].x = SceneManager._scene._helpWindow.x + (SceneManager._scene._helpWindow.width - statusDescriptionWindows[i].width);
					if(Myth.HBC.helpBoxModAlign == "Right") statusDescriptionWindows[i].x -= (SceneManager._scene._helpWindow.width + cardWidth + Myth.HBC.helpBoxCardBuffer * 2);
					if(Myth.HBC.helpBoxModAlign == "Top" || Myth.HBC.helpBoxModAlign == "Bottom") statusDescriptionWindows[i].x -= (cardWidth * 2 + Myth.HBC.helpBoxCardBuffer * 2);
					statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y + SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * i;
					if(Myth.HBC.helpBoxModAlign == "Right") statusDescriptionWindows[i].y -= SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight;
					if(Myth.HBC.helpBoxModAlign == "Bottom") statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y - SceneManager._scene._helpWindow.height - Myth.StWin.coordinates.sepHeight - (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * i;
				}
				break;
				case "Right":
				{
					statusDescriptionWindows[i].x = SceneManager._scene._helpWindow.x;
					if(Myth.HBC.helpBoxModAlign == "Left") statusDescriptionWindows[i].x += SceneManager._scene._helpWindow.width + cardWidth + Myth.HBC.helpBoxCardBuffer * 2;
					if(Myth.HBC.helpBoxModAlign == "Top" || Myth.HBC.helpBoxModAlign == "Bottom") statusDescriptionWindows[i].x += (cardWidth * 2 + Myth.HBC.helpBoxCardBuffer * 2);
					statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y + SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * i;
					if(Myth.HBC.helpBoxModAlign == "Left") statusDescriptionWindows[i].y -= SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight;
					if(Myth.HBC.helpBoxModAlign == "Bottom") statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y - SceneManager._scene._helpWindow.height - Myth.StWin.coordinates.sepHeight - (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * i;
				}
				break;
				case "Bottom":
				{
					statusDescriptionWindows[i].x = SceneManager._scene._helpWindow.x + cardWidth * (i % 2 == 0 ? -1 : 2) + (i % 2 == 0 ? 0 : Myth.HBC.helpBoxCardBuffer * 2);
					if(Myth.HBC.helpBoxModAlign == "Left") statusDescriptionWindows[i].x += cardWidth * (i % 2 == 1 ? -1 : 0) - (i % 2 == 1 ? Myth.HBC.helpBoxCardBuffer * 2 : 0);
					if(Myth.HBC.helpBoxModAlign == "Right") statusDescriptionWindows[i].x += cardWidth * (i % 2 == 0 ? 1 : 0) - (i % 2 == 0 ? 0 : Myth.HBC.helpBoxCardBuffer * 2);
					statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y + SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * Math.floor(i / 2);
					if(Myth.HBC.helpBoxModAlign == "Bottom") statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y - (SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * Math.floor(i / 2));
				}
				break;
				default:
				{
					statusDescriptionWindows[i].x = SceneManager._scene._helpWindow.x;
					statusDescriptionWindows[i].y = SceneManager._scene._helpWindow.y + SceneManager._scene._helpWindow.height + Myth.StWin.coordinates.sepHeight + (statusDescriptionWindows[i].height + Myth.StWin.coordinates.sepHeight) * i;
				}
				break;
			}
		}
	}
}

Myth.HBC.Window_BattleSkill_select = Window_BattleSkill.prototype.select;
Window_BattleSkill.prototype.select = function (index)
{
	Myth.HBC.Window_BattleSkill_select.call(this, index);

	if(Myth.HBC.anchorFallback && this._cardSprites != null)
	{
		var lowBound = this._itemsBeforeCards;
		var highBound = this._itemsBeforeCards + this._cardSprites.getCardSprites().length;

		if(this.index() < lowBound || this.index() >= highBound)
		{
			SceneManager._scene._helpWindow.x = Myth.HBC.helpBoxAnchorX;
			SceneManager._scene._helpWindow.y = Myth.HBC.helpBoxAnchorY;
		}
	}

	if(Myth.HBC.helpBoxScreenBuffer > 0) Myth.HBC.viewportClamp();
};

Myth.HBC.testforSmartAlign = function(cardX, cardY, cardWidth, cardHeight)
{
	//Checks if out of Viewport
	var leftOk = Myth.HBC.viewportCheckLeft(SceneManager._scene._helpWindow);
	var rightOk = Myth.HBC.viewportCheckRight(SceneManager._scene._helpWindow);
	var topOk = Myth.HBC.viewportCheckTop(SceneManager._scene._helpWindow);
	var botOk = Myth.HBC.viewportCheckBot(SceneManager._scene._helpWindow);

	//Aligns it the other way based on Boundary crossed

	if(!Myth.HBC.followHBLockX)
	{
		if(leftOk)
		{
			SceneManager._scene._helpWindow.x = cardX + cardWidth/2;
			Myth.HBC.helpBoxModAlign = "Right";
		}
		else if(rightOk)
		{
			SceneManager._scene._helpWindow.x = cardX - cardWidth/2 - SceneManager._scene._helpWindow.width;
			Myth.HBC.helpBoxModAlign = "Left";
		}
		else
		{
			Myth.HBC.helpBoxModAlign = Myth.HBC.helpBoxAlign;
		}
	}

	if(!Myth.HBC.followHBLockY)
	{
		if(topOk)
		{
			SceneManager._scene._helpWindow.y = cardY + cardHeight/2;
			Myth.HBC.helpBoxModAlign = "Bottom";
		}
		else if(botOk)
		{
			SceneManager._scene._helpWindow.y = cardY - cardHeight/2 - SceneManager._scene._helpWindow.height/2 - Myth.CGC.coordinates.cardSelectionY;
			Myth.HBC.helpBoxModAlign = "Top";
		}
		else
		{
			Myth.HBC.helpBoxModAlign = Myth.HBC.helpBoxAlign;
		}
	}
}

Myth.HBC.viewportCheckLeft = function(window)
{
	return window.x - Myth.HBC.helpBoxScreenBuffer < 0;
}

Myth.HBC.viewportCheckRight = function(window)
{
	return window.x + window.width + Myth.HBC.helpBoxScreenBuffer >= Graphics.boxWidth;
}

Myth.HBC.viewportCheckTop = function(window)
{
	return window.y - Myth.HBC.helpBoxScreenBuffer  < 0;
}

Myth.HBC.viewportCheckBot = function(window)
{
	return window.y + window.height + Myth.HBC.helpBoxScreenBuffer >= Graphics.boxHeight;
}

Myth.HBC.viewportClamp = function()
{
	var win = SceneManager._scene._helpWindow;
	if(Myth.HBC.viewportCheckLeft(win)) win.x = Myth.HBC.helpBoxScreenBuffer;
	if(Myth.HBC.viewportCheckRight(win)) win.x = Graphics.boxWidth - win.width - Myth.HBC.helpBoxScreenBuffer;
	if(Myth.HBC.viewportCheckTop(win)) win.y = Myth.HBC.helpBoxScreenBuffer;
	if (Myth.HBC.viewportCheckBot(win)) win.y = Graphics.boxHeight - win.height - Myth.HBC.helpBoxScreenBuffer;
}

//====================================================
// Scene_Battle Overrides
//====================================================

Myth.HBC.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function ()
{
	Myth.HBC.Scene_Battle_createAllWindows.call(this);

	this._helpWindow.active = Myth.HBC.showHelpBox;
	if(Myth.HBC.helpBoxSkin != '')	this._helpWindow.windowskin = ImageManager.loadSystem(Myth.HBC.helpBoxSkin);
	this._helpWindow.x = Myth.HBC.helpBoxAnchorX;
	this._helpWindow.y = Myth.HBC.helpBoxAnchorY;
	this._helpWindow.width = Myth.HBC.helpBoxWidth;
	this._helpWindow.height = Myth.HBC.helpBoxHeight;
};

Myth.HBC.BattleManager_requireDiscard = BattleManager.requireDiscard;
BattleManager.requireDiscard = function (amount, mode, type)
{
	Myth.HBC.BattleManager_requireDiscard.call(this, amount, mode, type);
	SceneManager._scene._helpWindow.show();
}