//=============================================================================
// MYTH_CGC_PartyUI_TypeA
//=============================================================================
/*:
 * @target MZ
 * @author Isiah Brighton + Swarnava Banerjee (Neel)
 * @plugindesc v1.1.2 A UI companion plugin to MYTH_CGC_CoreEngine.
 * @url https://mythatelier.itch.io/card-game-combat
 * 
 * @param Party Status Window
 *
 * @param showPartyStatus
 * @parent Party Status Window
 * @type boolean
 * @text Show/Hide?
 * @default true
 * @desc Shows Party Status Window if True. Hides if False.
 *
 * @param showActorPortParty
 * @parent Party Status Window
 * @type boolean
 * @text Use Actor Portrait?
 * @default true
 * @desc Shows Actor Portrait in Party Status Window if True. Hides if False.
 * 
 * @param partyStatusOffset
 * @parent Party Status Window
 * @type struct<Coordinate>
 * @text XY Offset
 * @default {"x":"0","y":"0"}
 * @desc The offset positions of the Party Status Window. Anchored to the top right of the screen.
 *
 * @param partyStatusWidth
 * @parent Party Status Window
 * @type number
 * @text Width
 * @default 616
 * @desc The width of the Party Status Window
 * 
 * @param partyStatusHeight
 * @parent Party Status Window
 * @type number
 * @text Height
 * @default 192
 * @desc The height of the Party Status Window
 *
* @param partyStatusSkin
* @parent Party Status Window
* @text Window Skin
* @desc Window Skin of the Party Status Window (if empty, goes with default)
* @type file
* @dir img/system
* @require 1
 *
 * @param Actor Status Window
 *
 * @param showActorStatus
 * @parent Actor Status Window
 * @type boolean
 * @text Show/Hide?
 * @default true
 * @desc Shows Actor Status Window if True. Hides if False.
 *
 * @param showActorPortActor
 * @parent Actor Status Window
 * @type boolean
 * @text Use Actor Portrait?
 * @default true
 * @desc Shows Actor Portrait in Actor Status Window if True. Hides if False;
 * 
 * @param actorStatusOffset
 * @parent Actor Status Window
 * @type struct<Coordinate>
 * @text XY Offset
 * @default {"x":"0","y":"0"}
 * @desc The offset positions of the Actor Status Window. Anchored to the bottom left of the screen.
 *
 * @param actorStatusWidth
 * @parent Actor Status Window
 * @text Width
 * @type number
 * @default 320
 * @desc The width of the Actor Status Window
 *
 * @param actorStatusHeight
 * @parent Actor Status Window
 * @type number
 * @text Height
 * @default 180
 * @desc The height of the Actor Status Window
 * 
 * @param actorStatusSkin
 * @parent Actor Status Window
 * @text Window Skin
 * @desc Window Skin of the Actor Status Window (if empty, goes with default)
 * @type file
 * @dir img/system
 * @require 1
 *
 * @help
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 * 
 * This plugin has 2 different Status windows in the battle scene:
 * 1. The Party Status Window.
 *     This is the window that appears in the top-right corner, which
 *     shows the party's health.
 * 2. The Actor Status Window.
 *     This is the window that appears at the bottom-left corner,
 *     which shows only the current actor's status but shows all their 
 *     information.
 * 
 * Place this plugin directly below MYTH_CGC_CoreEngine.
 * 
 * Please be aware that some plugin parameters that affect the
 * battle UI are inside MYTH_CGC_CoreEngine. If you're looking for a parameter
 * to change and it's not in this plugin, check that one.
 * 
 * ============================================================================
 * Version History
 * ============================================================================
 * 
 * v1.1.2 - Fixed bug where hitting up on the hand would softlock if the
 *          Party Status Window was disabled.
 *          
 * 
 * v1.1.1 - Fixed bug where Battle Log and Help Windows got cut off
 *        - Actor and Party Status Windows are on their own Window Layers now
 *        - Fixed Actor Portraits so that they don't go out of bounds
 *        - Fixed bug where Status Offset Windows wouldn't work
 *        - Changed Actor Status UI Elements to better show States
 *        - Fixed TP gauges in Actor and Party Status Window
 *        - Changed Item Window height so it doesn't overlap with Party Status
 *        - Added Winddow Skin params for Actor and Party Status Windows
 *
 * v1.1.0 - Changed plugin name
 *        - Changed "Micro Status Window" to "Party Status Window" for clarity
 *        - Changed "Main Status Window" to "Actor Status Window" for clarity
 *        - Fixed bug where Actor Status Window X Offset wouldn't work
 *        - Restored Window Frames to MZ Windows, tinkered with Rect positions
 * 
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
if (!Myth.CGC)
	console.error("Please make sure MYTH_CGC_PartyUI_TypeA is placed underneath MYTH_CGC_CoreEngine");

Myth.CGC.PartyUI = Myth.CGC.PartyUI || {};
Myth.CGC.changeBattleWindows = true;
Myth.CGC.statusWindowAtTop = true;

Myth.Parameters = PluginManager.parameters('MYTH_CGC_PartyUI_TypeA');

Myth.CGC.PartyUI.coordinates = {
	partyStatusWidth: Number(Myth.Parameters.partyStatusWidth),
	partyStatusHeight: Number(Myth.Parameters.partyStatusHeight),
	actorStatusWidth: Number(Myth.Parameters.actorStatusWidth),
	actorStatusHeight: Number(Myth.Parameters.actorStatusHeight)
};

Myth.CGC.PartyUI.coordinates.partyStatusOffset = JSON.parse(Myth.Parameters.partyStatusOffset);
Myth.CGC.PartyUI.coordinates.actorStatusOffset = JSON.parse(Myth.Parameters.actorStatusOffset);
Myth.Util.castMembersToNumber(Myth.CGC.PartyUI.coordinates);

Myth.CGC.PartyUI.showPartyStatus = JSON.parse(Myth.Parameters.showPartyStatus);
Myth.CGC.PartyUI.partyStatusSkin = Myth.Parameters.partyStatusSkin;

Myth.CGC.PartyUI.showActorStatus = JSON.parse(Myth.Parameters.showActorStatus);
Myth.CGC.PartyUI.actorStatusSkin = Myth.Parameters.actorStatusSkin;

Myth.CGC.PartyUI.showActorPortParty = JSON.parse(Myth.Parameters.showActorPortParty);
Myth.CGC.PartyUI.showActorPortActor = JSON.parse(Myth.Parameters.showActorPortActor);

//====================================================
// Window_PartyStatus
//====================================================

function Window_PartyStatus()
{
	this.initialize.apply(this, arguments);
};

Window_PartyStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_PartyStatus.prototype.constructor = Window_PartyStatus;

Window_PartyStatus.prototype.initialize = function ()
{
	if (Myth.Util.usingMZ)
	{
		const ww = this.windowWidth();
		const wh = this.windowHeight();
		const wx = Graphics.boxWidth - ww;
		const wy = 0;
		const rect = new Rectangle(wx, wy, ww, wh);
		Window_BattleStatus.prototype.initialize.call(this, rect);
	}
	else Window_BattleStatus.prototype.initialize.call(this);
};

Window_PartyStatus.prototype.drawBasicArea = function(rect, actor)
{
	var width = this.contents.width / 2;
	var height = this.lineHeight();
	if (Myth.CGC.PartyUI.showActorPortParty) this.drawFace(actor.faceName(), actor.faceIndex(), this.contents.width - (Window_Base._faceWidth * 1.2), rect.y, width, height);
    this.drawActorName(actor, rect.x, rect.y, 116);
    this.drawActorIcons(actor, rect.x + 118, rect.y, Window_Base._iconWidth * 5);
};

Window_PartyStatus.prototype.drawActorHp = function (actor, x, y, width)
{
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
	this.changeTextColor(this.hpColor(actor));
	this.drawText(actor.hp, x + width - 64, y, 64, 'right');
}

Window_PartyStatus.prototype.drawActorMp = function (actor, x, y, width)
{
	var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
	this.changeTextColor(this.mpColor(actor));
	this.drawText(actor.mp, x + width - 64, y, 64, 'right');
}

Window_PartyStatus.prototype.drawActorTp = function (actor, x, y, width)
{
	var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
	this.changeTextColor(this.tpColor(actor));
	this.drawText(actor.tp, x + width - 64, y, 64, 'right');
}

Window_PartyStatus.prototype.drawGaugeArea = function (rect, actor)
{
	var width = ($dataSystem.optDisplayTp) ? this.contents.width / 6 : this.contents.width / 5;
	var xOff = this.contents.width - (($dataSystem.optDisplayTp) ? width * 6 : width * 5);
	this.drawActorHp(actor, xOff + width * 3, rect.y, width - 8);
	this.drawActorMp(actor, xOff + width * 4, rect.y, width - 8);
	if($dataSystem.optDisplayTp) this.drawActorTp(actor, width * 5, rect.y, width - 8);
};

Window_PartyStatus.prototype.windowWidth = function ()
{
	return Myth.CGC.PartyUI.coordinates.partyStatusWidth;
};

Window_PartyStatus.prototype.windowHeight = function ()
{
	return Myth.CGC.PartyUI.coordinates.partyStatusHeight;
};

if (Myth.Util.usingMZ)
{

	Window_PartyStatus.prototype.maxCols = function ()
	{
		return 1;
	};

	Window_PartyStatus.prototype.numVisibleRows = function ()
	{
		return 4;
	};

	Window_PartyStatus.prototype.itemHeight = function ()
	{
		return this.innerHeight / this.numVisibleRows();
	};

	Window_PartyStatus.prototype.faceRect = function (index)
	{
		const rect = this.itemRect(index);
		rect.pad(-1);
		if (rect.width / 3 > ImageManager.faceWidth)
		{
			rect.x = rect.width - (ImageManager.faceWidth * 0.8);
			rect.width = ImageManager.faceWidth;
		}
		else
		{
			rect.x = rect.width / 3 * 2;
			rect.width = rect.width * 0.35;
		}
		//rect.height = this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
		return rect;
	};

	Window_PartyStatus.prototype.stateIconX = function(rect) {
		return rect.x + rect.width * 0.23;
	};

	Window_PartyStatus.prototype.placeBasicGauges = function (actor, x, y)
	{
		var gaugeWidth = ($dataSystem.optDisplayTp) ? this.width * 0.15 : this.width * 0.2;
		this.placeGauge(actor, "hp", x, y);
		this.placeGauge(actor, "mp", x + gaugeWidth + 2, y);
		if ($dataSystem.optDisplayTp) {
			this.placeGauge(actor, "tp", x + gaugeWidth * 2 + 2, y);
		}
	};

	Window_PartyStatus.prototype.nameY = function (rect)
	{
		return this.basicGaugesY(rect);
	};
	
	Window_PartyStatus.prototype.extraHeight = function ()
	{
		return 8;
	};

	Window_PartyStatus.prototype.basicGaugesY = function (rect)
	{
		const bottom = rect.y + rect.height - this.extraHeight();
		const numGauges = $dataSystem.optDisplayTp ? 3 : 2;
		return bottom - this.gaugeLineHeight();
	};

	Window_PartyStatus.prototype.basicGaugesX = function (rect)
	{
		return rect.x + rect.width * 0.3;
	};
}

Window_PartyStatus.prototype.cursorDown = function (wrap)
{
	var index = this.index();
	var maxItems = this.maxItems();
	var maxCols = this.maxCols();
	if (index == maxItems - maxCols)
		this.processCancel();
	else
		Window_BattleStatus.prototype.cursorDown.call(this, wrap);

};

Window_PartyStatus.prototype.cursorUp = function (wrap)
{
	var index = this.index();
	if (index != 0)
		Window_BattleStatus.prototype.cursorUp.call(this, wrap);
}

//====================================================
// Window_ActorStatus
//====================================================

function Window_ActorStatus()
{
	this.initialize.apply(this, arguments);
};

Window_ActorStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_ActorStatus.prototype.constructor = Window_ActorStatus;

Window_ActorStatus.prototype.initialize = function ()
{
	if (Myth.Util.usingMZ)
	{
		const ww = this.windowWidth();
		const wh = this.windowHeight();
		const wx = 0;
		const wy = Graphics.boxHeight - wh;
		const rect = new Rectangle(wx, wy, ww, wh);
		Window_BattleStatus.prototype.initialize.call(this, rect);
	}
	else Window_BattleStatus.prototype.initialize.call(this);
}

Window_ActorStatus.prototype.numVisibleRows = function ()
{
	return 1;
};

Window_ActorStatus.prototype.refresh = function ()
{
	Window_BattleStatus.prototype.refresh.call(this);
	if (this._partyStatusWindow)
		this._partyStatusWindow.refresh();
};

Window_ActorStatus.prototype.open = function ()
{
	Window_BattleStatus.prototype.open.call(this);
	if (this._partyStatusWindow)
		this._partyStatusWindow.open();
}

Window_ActorStatus.prototype.close = function ()
{
	Window_BattleStatus.prototype.close.call(this);
	if (this._partyStatusWindow)
		this._partyStatusWindow.close();
}

Window_ActorStatus.prototype.select = function (index)
{
	if (index == -1) return;
	Window_BattleStatus.prototype.select.call(this, index);
	if (this._partyStatusWindow)
		this._partyStatusWindow.select(index);

	this.refresh();
};

Window_ActorStatus.prototype.windowWidth = function ()
{
	return Myth.CGC.PartyUI.coordinates.actorStatusWidth;
};

Window_ActorStatus.prototype.update = function ()
{
	Myth.CGC.Window_BattleStatus_update.call(this);
};

Window_ActorStatus.prototype.windowHeight = function ()
{
	var height = Myth.CGC.PartyUI.coordinates.actorStatusHeight;
	var minHeight = this.lineHeight() * ($dataSystem.optDisplayTp ? 6 : 5);
	if(height < minHeight) height = minHeight;
	return height;
};

Window_ActorStatus.prototype.maxPageItems = function ()
{
	return 1;
};

Window_ActorStatus.prototype.topIndex = function ()
{
	return (Math.max(this.index(), 0));
}

Window_ActorStatus.prototype.updateCursor = function ()
{
	{
		this.setCursorRect(0, 0, 0, 0);
	}
};

Window_ActorStatus.prototype.drawAllItems = function ()
{
	var index = Math.max(this.index(), 0);
	index = Math.min($gameParty.members().length - 1, index);
	if (index >= 0)
		this.drawItem(index);
};

Window_ActorStatus.prototype.basicAreaRect = function (index)
{
	var rect = this.itemRectForText(0);
	rect.x = 0;
	rect.width = this.contents.width;
	return rect;
};

Window_ActorStatus.prototype.gaugeAreaRect = function (index)
{
	var rect = this.itemRectForText(1);
	rect.width = this.contents.width;
	return rect;
};

Window_ActorStatus.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(current, x3, y, valueWidth, 'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(current, x1, y, valueWidth, 'right');
    }
};

Window_ActorStatus.prototype.drawGaugeAreaWithTp = function (rect, actor)
{
	var halfWidth = this.contents.width * 0.6;
	this.drawActorHp(actor, 0, rect.y + this.lineHeight(), halfWidth);
	this.drawActorMp(actor, 0, rect.y + this.lineHeight() * 2, halfWidth);
	this.drawActorTp(actor, 0, rect.y + this.lineHeight() * 3, halfWidth);
};

Window_ActorStatus.prototype.drawGaugeAreaWithoutTp = function (rect, actor)
{
	var halfWidth = this.contents.width * 0.6;
	this.drawActorHp(actor, 0, rect.y + this.lineHeight(), halfWidth);
	this.drawActorMp(actor, 0, rect.y + this.lineHeight() * 2, halfWidth);
};

Window_ActorStatus.prototype.drawActorCardZonesVertical = function (actor, x, y)
{
	var xx = x;
	var yy = y;
	var textWidth = this.textWidth("000");

	if (Myth.CGC.displayStatusCardIcons) 
	{
		this.drawIcon(Myth.CGC.statusIcons.handSize, xx, yy + 2);
		this.drawText(actor._cardHand.length, xx + textWidth, yy, textWidth, 'right');

		yy += this.lineHeight();		
		
		this.drawIcon(Myth.CGC.statusIcons.deckSize, xx, yy + 2);
		this.drawText(actor._cardDeck.length, xx + textWidth, yy, textWidth, 'right')

		yy += this.lineHeight();	
		
		this.drawIcon(Myth.CGC.statusIcons.discardSize, xx, yy + 2);
		this.drawText(actor._cardDiscard.length, xx + textWidth, yy, textWidth, 'right');		
	}
};

Window_ActorStatus.prototype.drawBasicArea = function (rect, actor)
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.displayStatusCardIcons)
	{
		return Myth.CGC.Window_battleStatus_drawBasicArea.call(this, rect, actor);
	}

	var halfWidth = this.contents.width * 0.5;
	var width = this.contents.width / 2;
	var height = this.contents.height / 4;
	this.drawActorName(actor, 0, 0, halfWidth);

	if(Myth.CGC.PartyUI.showActorPortActor)
	{
		this.drawFace(actor.faceName(), actor.faceIndex(), halfWidth + (Window_Base._faceWidth * 0.1), rect.y, halfWidth, ($dataSystem.optDisplayTp ? this.lineHeight() * 2 : this.lineHeight()));
	}

	this.drawActorIcons(actor, 0, rect.y + this.lineHeight(), Window_Base._iconWidth * 5);
	this.drawActorCardZonesVertical(actor, this.contents.width - 96, ($dataSystem.optDisplayTp ? this.lineHeight() * 2 : this.lineHeight()));
}

if (Myth.Util.usingMZ)
{
	Window_ActorStatus.prototype.faceRect = function (index)
	{
		const rect = this.itemRect(index);
		rect.width = Math.min(this.innerWidth);//, ImageManager.faceWidth);
		rect.height = this.lineHeight() * 1.5;
		rect.x = ImageManager.faceWidth * 0.69;
		return rect;
	};

	Window_ActorStatus.prototype.basicGaugesX = function (rect)
	{
		return rect.x - 8;
	};

	Window_ActorStatus.prototype.drawItemImage = function(index) 
	{
		const actor = this.actor(index);
		const rect = this.faceRect(index);

		if (Myth.CGC.PartyUI.showActorPortActor) this.drawActorFace(actor, rect.x, rect.y + this.windowHeight() / 4 - this.lineHeight() * 0.5, rect.width, rect.height);
	};

	Window_ActorStatus.prototype.drawItemStatus = function (index)
	{
		const actor = this.actor(index);
		const rect = this.itemRectWithPadding(index);
		const nameX = this.nameX(rect);
		const nameY = this.nameY(rect);
		const stateIconX = this.stateIconX(rect);
		const stateIconY = this.stateIconY(rect);
		const basicGaugesX = this.basicGaugesX(rect);
		const basicGaugesY = this.basicGaugesY(rect);
		this.placeTimeGauge(actor, nameX - 8, nameY - this.lineHeight() * 0.5);
		this.placeActorName(actor, nameX - 8, nameY - this.lineHeight() * (($dataSystem.optDisplayTp) ? 1.2 : 1));
		this.placeStateIcon(actor, nameX + 100, nameY - this.lineHeight() * 1.5 + ImageManager.iconHeight * 0.72);
		this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
		this.drawActorCardZonesVertical(actor, rect.width - this.textWidth("000000"), nameY);
	};

    Sprite_Gauge.prototype.bitmapWidth = function() {
		
		var width = 114 * (Graphics.width/(Graphics.boxWidth * 0.5));

		if(this.parent)
		{
			if(this.parent.parent)
			{
				if(this.parent.parent instanceof Window_ActorStatus) 
					width = this.parent.parent.width * 0.5;

				if(this.parent.parent instanceof Window_PartyStatus) 
					width = ($dataSystem.optDisplayTp) ? this.parent.parent.width * 0.15 : this.parent.parent.width * 0.2;

				if(this.parent.parent instanceof Window_BattleActor) 
					width = this.parent.parent.width * 0.2;
			}
		}

		return width;
    };

	Window_ActorStatus.prototype.refreshCursor = function ()
	{
		{
			this.setCursorRect(0, 0, 0, 0);
		}
	};

	Window_ActorStatus.prototype.itemRect = function (index)
	{
		var rect = Window_BattleStatus.prototype.itemRect.call(this, 0);
		rect.y -= this.lineHeight();
		rect.width = this.innerWidth;
		if($dataSystem.optDisplayTp) rect.height = this.lineHeight() * 6;
		return rect;
	}
}

//====================================================
// Scene_Battle Overrides
//====================================================

Scene_Map.prototype.createButtons = function() { };
Scene_Battle.prototype.createButtons = function() { };

Myth.CGC.PartyUI.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function ()
{
	this.createPartyStatusWindow();
	Myth.CGC.PartyUI.Scene_Battle_createAllWindows.call(this);
	
	if(!Myth.CGC.PartyUI.showPartyStatus) this._statusWindow._partyStatusWindow.visible = false;
	if(!Myth.CGC.PartyUI.showActorStatus) this._statusWindow.width = 0;
	if(Myth.CGC.PartyUI.partyStatusSkin != '')	this._partyStatusWindow.windowskin = ImageManager.loadSystem(Myth.CGC.PartyUI.partyStatusSkin);

	this._partyStatusWindow.x += Myth.CGC.PartyUI.coordinates.partyStatusOffset.x;
	this._partyStatusWindow.origX = this._partyStatusWindow.x;

	this._partyStatusWindow.y += Myth.CGC.PartyUI.coordinates.partyStatusOffset.y;
	this._partyStatusWindow.origY = this._partyStatusWindow.y;

	var partyWin = SceneManager._scene._windowLayer.children.filter(g => g instanceof Window_PartyStatus)[0];
	var index1 = SceneManager._scene._windowLayer.children.indexOf(partyWin);
	SceneManager._scene._windowLayer.children.push(SceneManager._scene._windowLayer.children.splice(index1, 1)[0]);

	this._statusWindow.x = 0;
	this._statusWindow.x += Myth.CGC.PartyUI.coordinates.actorStatusOffset.x;
	this._statusWindow.origX = this._statusWindow.x;

	this._statusWindow.y = Graphics.boxHeight - this._statusWindow.height;
	this._statusWindow.y += Myth.CGC.PartyUI.coordinates.actorStatusOffset.y;
	this._statusWindow.origY = this._statusWindow.y;

	if(Myth.CGC.PartyUI.actorStatusSkin != '')	this._statusWindow.windowskin = ImageManager.loadSystem(Myth.CGC.PartyUI.actorStatusSkin);

	var actorWin = SceneManager._scene._windowLayer.children.filter(g => g instanceof Window_ActorStatus)[0];
	var index2 = SceneManager._scene._windowLayer.children.indexOf(actorWin);
	SceneManager._scene._windowLayer.children.push(SceneManager._scene._windowLayer.children.splice(index2, 1)[0]);

	this._enemyWindow.x = 0;

	this._helpWindow.width = (Myth.CGC.PartyUI.showPartyStatus ? this._partyStatusWindow.x : Graphics.boxWidth);
	if(Myth.Util.usingMZ) this._helpWindow.width -= this._helpWindow.itemPadding() * 0.5;
	this._helpWindow.height = this._helpWindow.lineHeight() * 3;
	if(this._partyStatusWindow.x < 0 || this._partyStatusWindow.x > Graphics.boxWidth) this._helpWindow.width = Graphics.boxWidth;

	this._itemWindow.y = this._partyStatusWindow.height;
	this._itemWindow.height = Graphics.boxHeight - this._partyStatusWindow.height - this._statusWindow.height;

	if(Myth.Util.usingMZ)
	{
		var battleActor = SceneManager._scene._windowLayer.children.filter(g => g instanceof Window_BattleActor)[0];
		var index3 = SceneManager._scene._windowLayer.children.indexOf(battleActor);
		SceneManager._scene._windowLayer.children.push(SceneManager._scene._windowLayer.children.splice(index3, 1)[0]);
		battleActor.width = this._helpWindow.width;
		battleActor.height = this._partyStatusWindow.height;

		var battleEnemy = SceneManager._scene._windowLayer.children.filter(g => g instanceof Window_BattleEnemy)[0];
		var index4 = SceneManager._scene._windowLayer.children.indexOf(battleEnemy);
		SceneManager._scene._windowLayer.children.push(SceneManager._scene._windowLayer.children.splice(index4, 1)[0]);
		battleEnemy.width = this._helpWindow.width;
		battleEnemy.height = this._partyStatusWindow.height;
	}
};

Scene_Battle.prototype.createStatusWindow = function ()
{
	this._statusWindow = new Window_ActorStatus();
	this.addWindow(this._statusWindow);
	this._statusWindow._partyStatusWindow = this._partyStatusWindow;
};

Scene_Battle.prototype.createPartyStatusWindow = function ()
{
	this._partyStatusWindow = new Window_PartyStatus();
	this._partyStatusWindow.setHandler('ok', this.onPartyStatusOk.bind(this));
	this._partyStatusWindow.setHandler('cancel', this.onPartyStatusCancel.bind(this));
	this.addWindow(this._partyStatusWindow);
	this._partyStatusWindow.refresh();
};

Scene_Battle.prototype.updateWindowPositions = function ()
{
	if (!$gameSystem._cardBattleEnabled)
		return Myth.CGC.Window_BattleStatus_updateWindowPositions.call(this);
	this._statusWindow.x = this._statusWindow.origX;
	this._statusWindow.y = this._statusWindow.origY;
	//this._partyStatusWindow.x = this._partyStatusWindow.origX;
	//this._partyStatusWindow.y = this._partyStatusWindow.origY;
};

Myth.CGC.PartyUI.SceneBattle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function ()
{
	Myth.CGC.PartyUI.SceneBattle_startPartyCommandSelection.call(this);
	this._statusWindow.close();
}

Myth.CGC.PartyUI.SceneBattle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;
Scene_Battle.prototype.updateStatusWindow = function ()
{
	Myth.CGC.PartyUI.SceneBattle_updateStatusWindow.call(this);
	if (this._partyCommandWindow.isOpenAndActive())
		this._statusWindow.close();
}

//***************************************************************
// Peeking at allies' decks
//***************************************************************

Window_BattleSkill.prototype.cursorUp = function (wrap)
{
	if (Myth.CGC.PartyUI.showPartyStatus)
		SceneManager._scene.activatePartyStatusWindow();
	else
		Window_Selectable.prototype.cursorUp.call(this, wrap);
};

Scene_Battle.prototype.activatePartyStatusWindow = function ()
{
	this._skillWindow.deactivate();
	this._skillWindow.deselect();
	this._partyStatusWindow.activate();
	SoundManager.playOk();
};

Scene_Battle.prototype.onPartyStatusCancel = function ()
{
	this._skillWindow.activate();
	this._partyStatusWindow.deactivate();
	this._statusWindow.reselect();
	this._skillWindow.previewOnly = false;

	var index = this._statusWindow.index();
	var actor = $gameParty.battleMembers()[index];
	this._skillWindow.setActor(actor);
	this._skillWindow.select(this._skillWindow._itemsBeforeCards);
	//this._statusWindow.select(index);
};

Scene_Battle.prototype.onPartyStatusOk = function ()
{
	var index = this._partyStatusWindow.index();
	if (index == this._statusWindow.index())
	{
		return this.onPartyStatusCancel();
	}

	this._skillWindow.activate();
	var actor = $gameParty.battleMembers()[index];
	this._skillWindow.previewOnly = true;
	this._skillWindow.setActor(actor);
	this._skillWindow.select(this._skillWindow._itemsBeforeCards);
	//this._statusWindow.select(index);
}

Myth.CGC.PartyUI.Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function ()
{
	var isActive = Myth.CGC.PartyUI.Scene_Battle_isAnyInputWindowActive.call(this);
	return (isActive || this._partyStatusWindow.active);
};

Myth.CGC.Scene_Battle_onSkillCancel2 = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function ()
{
	if (this._skillWindow.previewOnly)
	{
		this.onPartyStatusCancel();
	}
	else Myth.CGC.Scene_Battle_onSkillCancel2.call(this);

};

Myth.CGC.Window_BattleSkill_isEnabled2 = Window_BattleSkill.prototype.isEnabled;
Window_BattleSkill.prototype.isEnabled = function (item)
{
	if (this.previewOnly)
		return false;
	else return Myth.CGC.Window_BattleSkill_isEnabled2.call(this, item);
}


if (Myth.Util.usingMZ)
{
	Window_PartyStatus.prototype.processTouch = function ()
	{
		var skillWindowOpen = SceneManager._scene._skillWindow.isOpenAndActive();
		var MZCondition = !this.isOpenAndActive() && skillWindowOpen && !TouchInput.isHovered() && TouchInput.isTriggered();
		var didHit = this.hitIndex() >= 0;

		if (MZCondition && didHit)
		{
			this._touching = true;
			SceneManager._scene.activatePartyStatusWindow();
			this.onTouchSelect(false);
		}
		else
			Window_BattleStatus.prototype.processTouch.call(this);
	}

	Window_BattleStatus.prototype.initialize = function(rect) 
	{
		Window_StatusBase.prototype.initialize.call(this, rect);
		return this.frameVisible = true;
	}

	Window_BattleActor.prototype.show = function()
	{
		this.forceSelect(0);
		$gameTemp.clearTouchState();
		Window_BattleStatus.prototype.show.call(this);
		SceneManager._scene._helpWindow.hide();
	};

	Window_BattleActor.prototype.maxCols = function() 
	{
		return 4;
	};

	Window_BattleActor.prototype.hide = function()
	{
		Window_BattleStatus.prototype.hide.call(this);
		$gameParty.select(null);
		SceneManager._scene._helpWindow.show();
	};

	Window_BattleEnemy.prototype.show = function() {
		this.refresh();
		this.forceSelect(0);
		$gameTemp.clearTouchState();
		Window_Selectable.prototype.show.call(this);
		SceneManager._scene._helpWindow.hide();
	};

	Window_BattleEnemy.prototype.hide = function() {
		Window_Selectable.prototype.hide.call(this);
		$gameTroop.select(null);		
		SceneManager._scene._helpWindow.show();
	};

	Window_BattleEnemy.prototype.contentsWidth = function() {
		return SceneManager._scene._helpWindow.width;
	}

	Window_BattleEnemy.prototype.contentsHeight = function() {
		return SceneManager._scene._partyStatusWindow.height;
	}

	Window_BattleEnemy.prototype.maxCols = function() {
		return 4;
	};

	Window_BattleEnemy.prototype.maxRows = function() {
		return 2;
	};

	Window_BattleEnemy.prototype.itemHeight = function(){
		return Math.floor(this.innerHeight / this.maxRows());
	};

	Scene_Battle.prototype.statusWindowX = function() {

	};
}
else
{
	Window_PartyStatus.prototype.processTouch = function ()
	{
		var skillWindowOpen = SceneManager._scene._skillWindow.isOpenAndActive();

		var MVCondition = !this.isOpenAndActive() && skillWindowOpen && TouchInput.isTriggered() && this.isTouchedInsideFrame();
		if (MVCondition)
		{
			this._touching = true;
			SceneManager._scene.activatePartyStatusWindow();
		}
		else
			Window_BattleStatus.prototype.processTouch.call(this);
	};

	Window_BattleActor.prototype.windowWidth = function ()
	{
		var partyStatus = SceneManager._scene._partyStatusWindow;
		var width = Graphics.boxWidth;

		if(partyStatus)
		{
			width = (Myth.CGC.PartyUI.showPartyStatus ? partyStatus.x : Graphics.boxWidth);
			if(partyStatus.x < 0 || partyStatus.x > Graphics.boxWidth) width = Graphics.boxWidth;
		}

		return width;
	}

	Window_BattleEnemy.prototype.windowWidth = function ()
	{
		var partyStatus = SceneManager._scene._partyStatusWindow;
		var width = Graphics.boxWidth;

		if(partyStatus)
		{
			width = (Myth.CGC.PartyUI.showPartyStatus ? partyStatus.x : Graphics.boxWidth);
			if(partyStatus.x < 0 || partyStatus.x > Graphics.boxWidth) width = Graphics.boxWidth;
		}

		return width;
	};

	Window_BattleLog.prototype.windowWidth = function ()
	{
		var partyStatus = SceneManager._scene._partyStatusWindow;
		var width = Graphics.boxWidth;

		if(partyStatus)
		{
			width = (Myth.CGC.PartyUI.showPartyStatus ? partyStatus.x : Graphics.boxWidth);
			if(partyStatus.x < 0 || partyStatus.x > Graphics.boxWidth) width = Graphics.boxWidth;
		}
		
		return width;
	};
}