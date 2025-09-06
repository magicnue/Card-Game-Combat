//=============================================================================
// MYTH_StateInfoPopup.js                                                      
//=============================================================================
/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.03 Adds State Windows to the side of the battle to show descriptions for states.
 * @url https://mythatelier.itch.io/
 *
 * @param displayTimer
 * @text Display Timer
 * @type number
 * @min 1
 * @default 300
 * @desc The amount of frames the State Windows will be visible when an enemy uses a skill.
 *
 * 
 * @param Window Coordinates
 * 
 *  @param x
 *  @parent Window Coordinates
 *  @type number
 *  @default 16
 *  @desc The x position of the State Windows.
 *  
 *  @param startY
 *  @text Starting Y
 *  @parent Window Coordinates
 *  @default 192
 *  @desc The y coordinate of the topmost State Window.
 *  
 *  @param width
 *  @parent Window Coordinates
 *  @default 200
 *  @desc The width of the State Window.
 *  
 *  @param height
 *  @parent Window Coordinates
 *  @default 104
 *  @desc The height of the State Window.
 *  
 *  @param sepHeight
 *  @parent Window Coordinates
 *  @text Separation Height
 *  @default 8
 *  @desc The distance between State Windows.
 * 
 * @param Text Coordinates
 * 
 *  @param nameX
 *  @text State Name X
 *  @parent Text Coordinates
 *  @type number
 *  @default 36
 *  
 *  @param nameY
 *  @text State Name Y
 *  @parent Text Coordinates
 *  @type number
 *  @default 0
 *  @min -999
 *  
 *  @param nameCap
 *  @text Name All Caps?
 *  @parent Text Coordinates
 *  @type boolean
 *  @default false
 *  @desc If set to ON, the name of the state will appear in all caps in the State Window.
 *  
 *  @param nameFontSize
 *  @text Name Font Size
 *  @parent Text Coordinates
 *  @type number
 *  @default 26
 *  
 *  @param descY
 *  @text Description Y
 *  @parent Text Coordinates
 *  @type number
 *  @default 28
 *  
 *  @param wrap
 *  @text Word Wrap?
 *  @parent Text Coordinates
 *  @type boolean
 *  @default false
 *  @desc Requires YEP_MessageCore, MV exclusive.
 *  
 *  @param descFontSize
 *  @text Description Font Size
 *  @parent Text Coordinates
 *  @type number
 *  @default 20
 *  
 * @param windowskins
 * 
 * @param positiveSkin
 * @parent windowskins
 * @text Positive Effect windowskin
 * @desc The window for a positive status effect
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * 
 * @param neutralSkin
 * @parent windowskins
 * @text Neutral Effect windowskin
 * @desc The window for a neutral status effect
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * 
 * @param negativeSkin
 * @parent windowskins
 * @text Negative Effect windowskin
 * @desc The window for a negative status effect
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * 
 * 
 * @param maxWindows
 * @text Max # of State Windows
 * @type number
 * @min 1
 * @default 3
 * @desc Set this only to as many as you need for one skill, to save on performance.
 *
 * @help
 * 
 * This plugin makes a State Window appear in battle to describe what a state 
 * does.
 * State Windows appear on two occasions:
 *     1. The player is highlighting a skill that triggers the State Window 
 *        during their input. The window will go away when they select 
 *        something else or confirm their choice.
 *     2. An enemy is currently using a skill that triggers the State Window. 
 *        The window will go away after a period of time you can set in the 
 *        plugin parameters.
 *        
 * There are 3 windowskins a State Window can have, designated Positive, 
 * Neutral, and Negative.
 * 
 * 
 * 
 * ============================================================================
 *                                State Notetags
 * ============================================================================
 * 
 *     <State Desc>
 *     Text
 *     Text
 *     </State Desc>
 * This sets the description for the state. The State Window will display this 
 * text when it appears for this state.
 *     
 *     <Neutral>
 *     <Positive>
 *     <Negative>
 * This determines which window to use for the state.
 * If none of these tags are present, the plugin will default to using the
 * Neutral window.
 *     
 * 
 * ============================================================================
 *                              Skill/Item Notetags
 * ============================================================================
 *
 *     <Show State X>
 * Where X is the index of the state in the database.
 * This will cause this skill/item to trigger the State Window. That means
 * the State Window will appear in either of the two occasions listed earlier
 * in the help file, showing state X.
 *
 *
 * ============================================================================
 *                                  Functions
 * ============================================================================
 *
 *     BattleManager.hideStateWindows()
 *     BattleManager.showStateWindows()
 * These override the visibility of State Windows - hiding them will prevent 
 * them from appearing normally until you call showStateWindows().
 *
 *     BattleManager.showStateWindows([2, 4, 6])
 * If you supply an array of state indeces, it will display those. Useful for
 * testing the appearance of the window.
 * NOTE: This is technically a different function from showStateWindows() with
 *       no parameters - as a result, it will not work if hideStateWindows() 
 *       has previously been called, until showStateWindows() is called to 
 *       re-enable window visibility.
 *
 *    BattleManager.clearStatuses()
 * This function is called automatically all the time but you can call it
 * manually too. It clears the windows of their statuses so they disappear 
 * until they receive new statuses to display.
 * 
 * 
 * ============================================================================
 *                                Version History
 * ============================================================================
 * 
 * v1.1.0 - Changed plugin name
 * 
 * v1.0.3 - Added MZ support!
 *         Fixed crash when executing an action with no item to use
 * 
 * v1.0.2 - Replaced an unwieldy plugin parameter array with State Notetags.
 *         Added Text Coords plugin parameters to give users more control
 *         over positioning and font settings.
 *         Removed obsolete functions.
 *         Cleaned up help section.
 * 
 * v1.0.1 - Added notetags to items as well as skills.
 *
 * v1.0.0 - Finished plugin
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



var Myth = Myth || {};
Myth.StWin = Myth.StWin || {};
Myth.StWin = {};

var Imported = Imported || {};
Imported.Isiah_StateWindow = true;

var parameters = PluginManager.parameters('MYTH_StateInfoPopup');

Myth.Util = Myth.Util || {};
Myth.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");


Myth.StWin.coordinates = {
	x: Number(parameters.x),
	y: Number(parameters.startY),
	width: Number(parameters.width),
	height: Number(parameters.height),
	sepHeight: Number(parameters.sepHeight)
};

Myth.StWin.textCoords = {
	nameX: Number(parameters.nameX),
	nameY: Number(parameters.nameY),
	descY: Number(parameters.descY),
	wrap: JSON.parse(parameters.wrap),
	nameCap: JSON.parse(parameters.nameCap),
	nameFontSize: Number(parameters.nameFontSize),
	descFontSize: Number(parameters.descFontSize),
}

Myth.StWin.windowskins = {
	neutral: parameters.neutralSkin,
	positive: parameters.positiveSkin,
	negative: parameters.negativeSkin
}

Myth.StWin.maxWindows = Number(parameters.maxWindows);
Myth.StWin.testDescription = "This state does not have a description.";

Myth.StWin.displayTime = Number(parameters.displayTimer);

function Window_StatusDescription()
{
	this.initialize.apply(this, arguments);
}

Window_StatusDescription.prototype = Object.create(Window_Base.prototype);
Window_StatusDescription.prototype.constructor = Window_StatusDescription;

Window_StatusDescription.prototype.initialize = function (windowNum)
{
	var coords = Myth.StWin.coordinates;
	var x = coords.x;
	
	var width = this.windowWidth();
	var height = this.windowHeight();

	var startingY = coords.y;
	var yOffset = coords.sepHeight;
	var y = startingY + (height + yOffset) * windowNum;

	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
	}
	else
		Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.windowNum = windowNum;

	this.statusId = -1;
	this._displayTime = -1;

	this.hide();
};

Window_StatusDescription.prototype.windowWidth = function ()
{
	return Myth.StWin.coordinates.width;
}

Window_StatusDescription.prototype.windowHeight = function ()
{
	return Myth.StWin.coordinates.height;
}

Window_StatusDescription.prototype.setStatus = function (id, temporary)
{
	temporary = temporary || false;

	this.statusId = id;
	if (BattleManager.statusVisibility)
		this.show();

	if (temporary)
		this._displayTime = Myth.StWin.displayTime;
	else
		this._displayTime = -1;

	this.setWindowskin();
	this.drawStatus();
};

Window_StatusDescription.prototype.setWindowskin = function ()
{
	var effect = $dataStates[this.statusId]._stateEffect;
	var skins = Myth.StWin.windowskins;
	var thisSkin = '';
	switch (effect)
	{
		case "Positive":
			thisSkin = skins.positive;
			break;
		case "Negative":
			thisSkin = skins.negative;
			break;
		case "Neutral":
		default:
			thisSkin = skins.neutral;
			break;
			break;
	}

	if (thisSkin != '')
	{
		this.windowskin = ImageManager.loadSystem(thisSkin);
	}
}

Window_StatusDescription.prototype.drawStatus = function ()
{
	this.contents.clear();
	var state = $dataStates[this.statusId];
	var statusName = state.name;
	var statusDescription = state._stateDesc;
	var statusIcon = state.iconIndex;
	if (!statusDescription)
	{
		console.error("No description for the following state: " + this.statusId + "  " + statusName);
		statusDescription = Myth.StWin.testDescription;
	}

	this.drawIcon(statusIcon, 0, 0);

	var tCoords = Myth.StWin.textCoords;

	this.contents.fontSize = tCoords.nameFontSize;
	if (tCoords.nameCap)
		statusName = statusName.toUpperCase();
	if (tCoords.wrap && Imported.YEP_MessageCore)
		statusDescription = "<WordWrap>" + statusDescription;

	this.drawText(statusName, tCoords.nameX, tCoords.nameY);
	this.resetFontSettings();
	this.drawTextEx(statusDescription, 0, tCoords.descY);

};

Window_StatusDescription.prototype.lineHeight = function ()
{
	return 20;
};

Window_StatusDescription.prototype.calcTextHeight = function (textState, all)
{
	var textHeight = Window_Base.prototype.calcTextHeight.call(this, textState, all);
	textHeight -= 8;
	return textHeight;
}

Window_StatusDescription.prototype.standardPadding = function ()
{
	return 8;
};

Window_StatusDescription.prototype.standardFontSize = function ()
{
	return Myth.StWin.textCoords.descFontSize;
};

if (Myth.Util.usingMZ)
{
	Window_StatusDescription.prototype.resetFontSettings = function ()
	{
		this.contents.fontFace = $gameSystem.mainFontFace();
		this.contents.fontSize = this.standardFontSize();
		this.resetTextColor();
	};

	Window_StatusDescription.prototype.calcTextHeight = function (textState)
	{
		const lineSpacing = this.lineHeight() - this.contents.fontSize;
		const lastFontSize = this.contents.fontSize;
		const lines = textState.text.slice(textState.index).split("\n");
		const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
		this.contents.fontSize = lastFontSize;
		return textHeight;
	};
}

Window_StatusDescription.prototype.stateNameFontSize = function ()
{
	return 28;
};

Window_StatusDescription.prototype.update = function ()
{
	Window_Base.prototype.update.call(this);
	if (this._displayTime > 0 && this.isOpen())
	{
		this._displayTime--;
		if (this._displayTime == 0)
		{
			this._displayTime = -1;
			this.hide();
		}
	}
}




Myth.StWin.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function ()
{
	Myth.StWin.Scene_Battle_createAllWindows.call(this);
	this.createStatusDescriptionWindows();
};

Scene_Battle.prototype.createStatusDescriptionWindows = function ()
{
	this._statusDescriptionWindows = [];
	for (var i = 0; i < Myth.StWin.maxWindows; i++)
	{
		var win = new Window_StatusDescription(i);
		this.addWindow(win);
		this._statusDescriptionWindows.push(win);
	}
};

BattleManager.statusVisibility = true;

BattleManager.showStateWindows = function (indexArray, temporary)
{
	var statusDescriptionWindows = SceneManager._scene._statusDescriptionWindows;
	if (indexArray)
	{
		this.clearStatuses();
		if (temporary == null)
			temporary = false;


		var len = Math.min(indexArray.length, Myth.StWin.maxWindows);
		for (var i = 0; i < len; i++)
		{
			statusDescriptionWindows[i].setStatus(indexArray[i], temporary);
		}
	}
	else
	{
		BattleManager.statusVisibility = true;
		for (var i = 0; i < statusDescriptionWindows.length; i++)
		{
			if (statusDescriptionWindows[i].statusId != -1)
				statusDescriptionWindows[i].show();
		}
	}

};

BattleManager.clearStatuses = function ()
{
	var statusDescriptionWindows = SceneManager._scene._statusDescriptionWindows;
	if (statusDescriptionWindows)
	{
		for (var i = 0; i < statusDescriptionWindows.length; i++)
		{
			statusDescriptionWindows[i].statusId = -1;
			statusDescriptionWindows[i].hide();
		}
	}
	
}

BattleManager.hideStateWindows = function ()
{
	BattleManager.statusVisibility = false;
	var statusDescriptionWindows = SceneManager._scene._statusDescriptionWindows;
	if (statusDescriptionWindows)
	{
		for (var i = 0; i < statusDescriptionWindows.length; i++)
		{
			statusDescriptionWindows[i].hide();
		}
	}
}

Myth.StWin.Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function (subject, action, targets)
{
	Myth.StWin.Window_BattleLog_startAction.call(this, subject, action, targets);
	
	if (subject.isEnemy())
	{
		var item = action.item();
		if (item && item._statesToShow)
		{
			BattleManager.showStateWindows(item._statesToShow, true);
		}
	}
}


//=============================================================================
// Window_BattleSkill
//=============================================================================

Myth.StWin.Window_BattleSkill_select = Window_BattleSkill.prototype.select;
Window_BattleSkill.prototype.select = function (index)
{
	Myth.StWin.Window_BattleSkill_select.call(this, index);
	if (index != -1)
	{
		var item = this.item();
		if (item && item._statesToShow)
		{
			BattleManager.showStateWindows(item._statesToShow);
		}
		else
		{
			BattleManager.clearStatuses();
		}
	}
	
}

Myth.StWin.Window_BattleSkill_deselect = Window_BattleSkill.prototype.hide;
Window_BattleSkill.prototype.hide = function ()
{
	Myth.StWin.Window_BattleSkill_deselect.call(this);
	BattleManager.clearStatuses();
};


//=============================================================================
// Window_BattleItem
//=============================================================================

Myth.StWin.Window_BattleItem_hide = Window_BattleItem.prototype.hide;
Window_BattleItem.prototype.hide = function ()
{
	Myth.StWin.Window_BattleItem_hide.call(this);
	BattleManager.clearStatuses();

};

Myth.StWin.Window_BattleItem_select = Window_BattleItem.prototype.select;
Window_BattleItem.prototype.select = function (index)
{
	Myth.StWin.Window_BattleItem_select.call(this, index);
	if (index != -1)
	{
		var item = this.item();
		if (item && item._statesToShow)
		{
			BattleManager.showStateWindows(item._statesToShow);
		}
		else
		{
			BattleManager.clearStatuses();
		}
	}

}


var Isiah_StateWindow_loaded = false;

Myth.StWin.DataManager_isDataBaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.StWin.DataManager_isDataBaseLoaded.call(this)) return false;
	if (!Isiah_StateWindow_loaded)
	{
		DataManager.processStateDescriptionNotetags($dataStates);
		DataManager.processStateShowcaseNotetags($dataSkills);
		DataManager.processStateShowcaseNotetags($dataItems);

		Isiah_StateWindow_loaded = true;
	}

	return true;
};

DataManager.processStateDescriptionNotetags = function (group)
{
	var startNote = /<STATE DESC>/i;
	var endNote = /<\/STATE DESC>/i;
	var desc = "";
	var writeDesc = false;

	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(startNote))
			{
				desc = "";
				writeDesc = true;
			}
			else if (line.match(endNote))
			{
				writeDesc = false;
				obj._stateDesc = desc.trim();
			}
			else if (writeDesc)
			{
				desc += line + '\n';
			}
			else if (line.match(/<NEUTRAL>/i))
			{
				obj._stateEffect = "Neutral";
			}
			else if (line.match(/<POSITIVE>/i))
			{
				obj._stateEffect = "Positive";
			}
			else if (line.match(/<NEGATIVE>/i))
			{
				obj._stateEffect = "Negative";
			}
		}
	}
}


DataManager.processStateShowcaseNotetags = function (group)
{
	var note = /<(?:SHOW STATE) (\d*)/i;
	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(note))
			{
				obj._statesToShow = obj._statesToShow || [];
				obj._statesToShow.push(Number(RegExp.$1));
			}
		}
	}
}