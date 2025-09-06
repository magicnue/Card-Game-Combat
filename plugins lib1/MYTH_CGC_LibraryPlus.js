//=============================================================================
// MYTH_CGC_LibraryPlus
//=============================================================================

/*:
 * @target MZ *
 * @author Isiah Brighton
 * @plugindesc v1.2.0 An extension to MythCardGameCombat that adds a lot more options to the appearance of the Card Library
 * @url https://mythatelier.itch.io/card-game-combat
 *
 * 
 * @param horizontalCardLibrary
 * @text Horizontal Card Library
 * @type boolean
 * @default true
 * @desc If set to OFF, will layout cards vertically instead of horizontally.
 * 
 * @param numVisibleCols
 * @text Max Visible Columns
 * @type number
 * @default 6
 * @desc Number used to calculate how long to wait before scrolling horizontally (vertically if Horizontal Card Library).
 * 
 * @param numVisibleRows
 * @text Max Visible Rows
 * @type number
 * @default 2
 * @desc Number used to calculate how long to wait before scrolling vertically (horizontally if Horizontal Card Library).
 *    
 * @param cardDisplay
 * @text Card Placement Settings
 * @type struct<CardDisplay>
 * @default {"maxCols":"6","cardScale":"1","selectedCardScale":"1.1","startPadding":"{\"x\":\"50\",\"y\":\"80\"}","cardSpacing":"{\"x\":\"30\",\"y\":\"40\"}","amountCoords":"{\"x\":\"0\",\"y\":\"0\"}","amountJustify":"right"} 
 * @desc Settings that determine how cards are positioned within the Library window.
 * 
 * @param hideLibraryStatus
 * @text Hide Status in Library
 * @type boolean
 * @default false
 * @desc If ON, the Card Type list window will become horizontal, saving more vertical space for the cards themselves.
 * 
 *    @param cardLibraryTypeColumns
 *    @text Card Type Columns
 *    @parent hideLibraryStatus
 *    @type number
 *    @min 1
 *    @default 4
 *    @desc The number of items in the Card Type list window shown at once.
 *    
 *    @param cardLibraryText
 *    @text Card Library Header Text
 *    @parent hideLibraryStatus
 *    @desc This text (if present) will appear on the top of the Card Type list window, making it a bit taller. MV only.
 *    
 * @param showHelpWindowInSkillScene
 * @text Show Help Window in Library
 * @type boolean
 * @default false
 * @desc If OFF, the Help Window will not be present, saving more vertical space for the cards.
 * 
 * 
 * @param backgroundImage
 * @text Background Image
 * @type file
 * @require 1
 * @dir img/pictures
 * @desc A background image can be added to the scene.
 * 
 * @help
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin allows you to customize the appearance of the Card Library
 * in more detail.
 *
 *
 *
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.2.0 - Updated for compatibility with CGC 1.6.2.
 *          Complete overhaul for new Library. Plugin parameters have been
 *          completely changed.
 *          Moved Deck Editor params to the Deck Editor plugin.
 *          Added background image parameter.
 * 
 * v1.1.0 - Updated for compatibility with CGC 1.5.1
 *          Added parameters for Deck Editor extension
 *          Fixed bug where Help section wouldn't show up.
 * 
 * v1.0.0 - Released plugin
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

/*~struct~CardDisplay:
 * @param maxCols
 * @text Max Columns
 * @type number
 * @default 6
 * @desc The max number of columns for the cards. If using Horizontal Card Library, treat this as max rows instead.
 * 
 * @param cardScale
 * @text Card Scale
 * @type number
 * @default 1
 * @decimals 2
 * @min 0.01
 * @desc The multiplier for the scale of the cards.
 * 
 * @param selectedCardScale
 * @text Selected Card Scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.1
 * @desc The scale of the card that is currently selected in the menu.
 * 
 * @param startPadding
 * @text Starting Padding
 * @type struct<Coordinate>
 * @desc The padding between the left/top of the (invisible) Window and the cards.
 * @default {"x":"50","y":"80"}
 * 
 * @param cardSpacing
 * @text Card Spacing
 * @type struct<Coordinate>
 * @desc The spacing between cards
 * @default {"x":"30","y":"40"}
 * 
 * @param amountCoords
 * @text Amount Text Offset
 * @type struct<Coordinate>
 * @desc The coordinate offset values for the Amount text. They default to underneath the center of the cards.
 * @default {"x":"0","y":"0"}
 * 
 * @param amountJustify
 * @text Amount Text Justify
 * @type select
 * @option left
 * @option center
 * @option right
 * @default right
 * @desc Whether the "amount" text of a card will be centered, justified left, or right. Ignore if using Simple Library.
 *
 * 
 */

var Myth = Myth || {};
if(!Myth.CGC)
{
	console.error("Please make sure MYTH_CGC_LibraryPlus is placed underneath MYTH_CGC_CoreEngine");
}
Myth.CGC.LP = Myth.CGC.LP || {};

Myth.Parameters = PluginManager.parameters('MYTH_CGC_LibraryPlus');

Myth.CGC.hideLibraryStatus = JSON.parse(Myth.Parameters.hideLibraryStatus);
Myth.CGC.horizontalCardLibrary = JSON.parse(Myth.Parameters.horizontalCardLibrary);
Myth.CGC.showHelpWindowInSkillScene = JSON.parse(Myth.Parameters.showHelpWindowInSkillScene);
Myth.CGC.cardLibraryCoords = {

	numVisibleCols: Number(Myth.Parameters.numVisibleCols),
	numVisibleRows: Number(Myth.Parameters.numVisibleRows),

	cardDisplay: JSON.parse(Myth.Parameters.cardDisplay),
}
Myth.Util.castMembersToNumber(Myth.CGC.cardLibraryCoords);

Myth.CGC.cardLibraryText = Myth.Parameters.cardLibraryText;
if (Myth.Util.usingMZ)
	Myth.CGC.cardLibraryText = "";
Myth.CGC.cardLibraryTypeColumns = Number(Myth.Parameters.cardLibraryTypeColumns);

Myth.CGC.cardLibraryBackgroundImage = Myth.Parameters.backgroundImage;

if (!Window_CardSkillType)
{
	//We need to define Window_CardSkillType so that the horizontal version works


	function Window_CardSkillType()
	{
		this.initialize.apply(this, arguments);
	};

	Window_CardSkillType.prototype = Object.create(Window_SkillType.prototype);
	Window_CardSkillType.prototype.constructor = Window_CardSkillType;

	Scene_CardLibrary.prototype.createSkillTypeWindow = function ()
	{
		var wy = this._helpWindow.height;
		if (Myth.Util.usingMZ)
		{
			const rect = this.cardSkillTypeWindowRect();
			this._skillTypeWindow = new Window_CardSkillType(rect);
		}
		else
			this._skillTypeWindow = new Window_CardSkillType(0, wy);
		this._skillTypeWindow.setHelpWindow(this._helpWindow);
		this._skillTypeWindow.setHandler('skill', this.commandSkill.bind(this));
		this._skillTypeWindow.setHandler('cancel', this.popScene.bind(this));
		this._skillTypeWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._skillTypeWindow.setHandler('pageup', this.previousActor.bind(this));
		this.addWindow(this._skillTypeWindow);
	};

	Scene_CardLibrary.prototype.cardSkillTypeWindowRect = function ()
	{
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(3, true);
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaTop();
		return new Rectangle(wx, wy, ww, wh);
	};
}


Scene_CardLibrary.prototype.getLibraryBackground = function ()
{
	return Myth.CGC.cardLibraryBackgroundImage;
}

Myth.CGC.LibraryPlus_Scene_CardLibrary_createItemWindow = Scene_CardLibrary.prototype.createItemWindow;
Scene_CardLibrary.prototype.createItemWindow = function ()
{
	Myth.CGC.LibraryPlus_Scene_CardLibrary_createItemWindow.call(this);

	if (Myth.CGC.hideLibraryStatus)
	{
		this._itemWindow.y = this._skillTypeWindow.y + this._skillTypeWindow.height;
	}
	this._itemWindow.height = Graphics.boxHeight - this._itemWindow.y - this._helpWindow.height;

	if (!Myth.Util.usingMZ)
		this._cardParent.move(this._itemWindow.x, this._itemWindow.y, this._itemWindow.width, this._itemWindow.height);
};

Myth.CGC.LibraryPlus_Scene_CardLibrary_createStatusWindow = Scene_CardLibrary.prototype.createStatusWindow;
Scene_CardLibrary.prototype.createStatusWindow = function ()
{
	Myth.CGC.LibraryPlus_Scene_CardLibrary_createStatusWindow.call(this);
	if (Myth.CGC.hideLibraryStatus)
	{
		this._statusWindow.height = 0;
		this._statusWindow.width = 0;
		this._statusWindow.hide();
	}
}

if (Myth.CGC.hideLibraryStatus)
{
	Myth.CGC.LibraryPlus_typeWindowRect = Myth.CGC.Types.typeWindowRect;
	Myth.CGC.Types.typeWindowRect = function ()
	{
		var rect = Myth.CGC.LibraryPlus_typeWindowRect.call(this);
		rect.width = Graphics.boxWidth;
		return rect;
	}

	Scene_CardLibrary.prototype.cardSkillTypeWindowRect = function ()
	{
		const ww = Graphics.boxWidth;
		var wh = this.calcWindowHeight(2, true);
		if (Myth.CGC.cardLibraryText == "")
		{
			wh = this.calcWindowHeight(1, true);
		}
		const wx = 0;
		const wy = this.mainAreaTop();

		return new Rectangle(wx, wy, ww, wh);
	};

	Window_CardSkillType.prototype.windowWidth = function ()
	{
		return Graphics.boxWidth;
	}

	Window_CardSkillType.prototype.numVisibleRows = function ()
	{
		return 1;
	};

	Window_CardSkillType.prototype.maxCols = function ()
	{
		return Myth.CGC.cardLibraryTypeColumns;
	};

	Window_CardSkillType.prototype.itemTextAlign = function ()
	{
		return 'center';
	};

	if (Myth.CGC.cardLibraryText != "")
	{
		Window_CardSkillType.prototype.windowHeight = function ()
		{
			return this.fittingHeight(2);
		};

		Window_CardSkillType.prototype.itemRect = function (index)
		{
			var rect = Window_SkillType.prototype.itemRect.call(this, index);
			rect.y += rect.height;
			return rect;
		};

		Window_CardSkillType.prototype.maxPageRows = function ()
		{
			return this.numVisibleRows();
		};

		Window_CardSkillType.prototype.refresh = function ()
		{
			Window_SkillType.prototype.refresh.call(this);
			this.drawTextEx(Myth.CGC.cardLibraryText, 0, 0);
		};
	}
}

Window_CardList.prototype.isCardLibraryScene = function ()
{
	return true;
}

Window_CardList.prototype.isHorizontal = function ()
{
	return this.isCardLibraryScene() && Myth.CGC.horizontalCardLibrary;
}

Window_CardList.prototype.getCardX = function (index)
{
	var totalCardWidth = this.totalCardWidth();
	var startingPadding = this.cardPaddingX();
	var rowColumn = (index % this.maxCols()) - this._currentCol;
	if (this.isHorizontal())
	{
		rowColumn = Math.floor(index / this.maxCols()) - this._currentRow;
	}

	//console.log(totalCardWidth, startingPadding, rowColumn);
	var targetX = this.x + totalCardWidth * rowColumn + startingPadding + this.cardWidth() / 2 - SceneManager._scene._cardParent.x;

	return targetX;
}

Window_CardList.prototype.getCardY = function (index)
{
	var totalCardHeight = this.totalCardHeight();
	var startingPadding = this.cardPaddingY();
	var rowColumn = Math.floor(index / this.maxCols()) - this._currentRow;
	if (this.isHorizontal())
	{
		rowColumn = (index % this.maxCols()) - this._currentCol;
	}

	var targetY = this.y + totalCardHeight * rowColumn + startingPadding + this.cardHeight() / 2 - SceneManager._scene._cardParent.y;
	return targetY;
}

Window_CardList.prototype.displaySettings = function ()
{
	return Myth.CGC.cardLibraryCoords.cardDisplay;
}

Window_CardList.prototype.numVisibleCols = function ()
{
	return Myth.CGC.cardLibraryCoords.numVisibleCols;
}

Window_CardList.prototype.numVisibleRows = function ()
{
	return Myth.CGC.cardLibraryCoords.numVisibleRows;
}


Myth.CGC.LP.Window_CardList_getAmountX = Window_CardList.prototype.getAmountX;
Window_CardList.prototype.getAmountX = function (spriteCard)
{
	var x = Myth.CGC.LP.Window_CardList_getAmountX.call(this, spriteCard);
	x += this.displaySettings().amountCoords.x;
	return x;
}

Myth.CGC.LP.Window_CardList_getAmountY = Window_CardList.prototype.getAmountY;
Window_CardList.prototype.getAmountY = function (spriteCard)
{
	var y = Myth.CGC.LP.Window_CardList_getAmountY.call(this, spriteCard);
	y += this.displaySettings().amountCoords.y;
	return y;
}

Window_CardList.prototype.cursorRight = function (wrap)
{
	if (this.isHorizontal())
	{
		var columnSize = this.maxCols();

		var index = this.index();
		var maxItems = this.maxItems();
		if (index < maxItems - columnSize)
			this.select(index + columnSize) % maxItems;
		else if (index < maxItems - 1)
		{
			this.select((index + 1) % maxItems);
		}
		return;
	}

	Window_Selectable.prototype.cursorRight.call(this, wrap);

};

Window_CardList.prototype.cursorLeft = function (wrap)
{
	if (this.isHorizontal())
	{
		var columnSize = this.maxCols();

		var index = this.index();
		var maxItems = this.maxItems();
		if (index > (columnSize - 1))
		{
			this.select((index - columnSize + maxItems) % maxItems)
		}
		else if (index > 0)
		{
			this.select((index - 1 + maxItems) % maxItems);
		}

		return;
	}
	Window_Selectable.prototype.cursorLeft.call(this, wrap);
};

Window_CardList.prototype.cursorDown = function (wrap)
{
	if (this.isHorizontal())
		Window_Selectable.prototype.cursorRight.call(this, wrap);
	else
		Window_Selectable.prototype.cursorDown.call(this, wrap);
};

Window_CardList.prototype.cursorUp = function (wrap)
{
	if (this.isHorizontal())
		Window_Selectable.prototype.cursorLeft.call(this, wrap);
	else
		Window_Selectable.prototype.cursorUp.call(this, wrap);
	
};


/*if (Myth.CGC.Deck != undefined)
{
	Window_DeclCardList.prototype.getCardPadding = function ()
	{
		return Myth.CGC.cardLibraryCoords.deckPaddingWidth;
	}
}*/


/*Sprite_SkillCard.prototype.drawAmount = function ()
{
	var coords = Myth.CGC.cardLibraryCoords;
	var b = this._amountText.bitmap;
	b.smooth = true;
	b.clear();
	b.drawText("x" + this._amount, 0, 0, 40, 40, coords.amountJustify);
	if (coords.amountJustify == 'center')
	{
		this._amountText.x = -(this._amountText.bitmap.width / 2);
	}
	else
		this._amountText.x = coords.amountX;
	this._amountText.y = this.bitmap.height / 2 + coords.amountY;
	
}*/