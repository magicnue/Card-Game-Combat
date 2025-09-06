//=============================================================================
// MYTH_CGC_CardCollection
//=============================================================================

/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.0.0 An extension to MYTH_CGC_CoreEngine that adds a new menu showing every card the player has previously owned.
 * @url https://mythatelier.itch.io/card-game-combat
 * 
 * @command OpenCardCollection
 * @text Open Card Collection
 * 
 * @param horizontalCollection
 * @text Horizontal Collection
 * @type boolean
 * @default false
 * @desc If set to OFF, will layout cards vertically instead of horizontally.
 *
 * 
 * @param numVisibleCols
 * @text Max Visible Columns
 * @type number
 * @default 6
 * @desc Number used to calculate how long to wait before scrolling horizontally (vertically if Horizontal Collection).
 *
 * @param numVisibleRows
 * @text Max Visible Rows
 * @type number
 * @default 2
 * @desc Number used to calculate how long to wait before scrolling vertically (horizontally if Horizontal Collection).
 *
 * @param cardDisplay
 * @text Card Placement Settings
 * @type struct<CardDisplay>
 * @default {"maxCols":"6","cardScale":"1","selectedCardScale":"1.1","startPadding":"{\"x\":\"50\",\"y\":\"80\"}","cardSpacing":"{\"x\":\"30\",\"y\":\"40\"}"}
 * @desc Settings that determine how cards are positioned within the Collection window.
 * 
 * 
 * @param missingCardBitmap
 * @text Missing Card Image
 * @desc The image to use for missing cards, in img/CGC/bases. Leave blank for the default shading effect.
 *
 * @param missingCardDesc
 * @text Missing Card Description
 * @desc The description the Help Window will display for missing cards. Leave blank for skills' actual description
 * @default ???
 * 
 * @param showHelpWindow
 * @text Show Help Window?
 * @type boolean
 * @default true
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
 * 
 * @help
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin adds a Card Collection option in the Menu, which shows all
 * of the Cards that have been collected across the current save file.
 * 
 * If an actor learns a skill or gains a Card through equipment or states,
 * that card will appear in the Collection even after that Card has been
 * removed from that actor.
 * 
 * Additionally, cards that are missing from the Collection will appear greyed
 * out, or otherwise using the Missing Card Image parameter.
 * 
 * To prevent a Skill from appearing in the Card Collection, use the following
 * Skill Notetag:
 *    <hide from collection>
 * 
 */

/*~struct~CardDisplay:
 * @param maxCols
 * @text Max Columns
 * @type number
 * @default 6
 * @desc The max number of columns for the cards. If using Horizontal Collection, treat this as max rows instead.
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
 *
 */

var Myth = Myth || {};
Myth.CGC = Myth.CGC || {};
Myth.CGC.Collection = Myth.CGC.Collection || {};

Myth.Parameters = PluginManager.parameters('MYTH_CGC_CardCollection');


Myth.CGC.Collection.horizontalCollection = JSON.parse(Myth.Parameters.horizontalCollection);
Myth.CGC.Collection.missingCardDesc = Myth.Parameters.missingCardDesc;
Myth.CGC.Collection.showHelpWindow = JSON.parse(Myth.Parameters.showHelpWindow);

Myth.CGC.images.missingCardBitmap = Myth.Parameters.missingCardBitmap;
Myth.CGC.images.collectionBackgroundImage = Myth.Parameters.backgroundImage;

Myth.CGC.Collection.coords = {

	numVisibleCols: Number(Myth.Parameters.numVisibleCols),
	numVisibleRows: Number(Myth.Parameters.numVisibleRows),

	cardDisplay: JSON.parse(Myth.Parameters.cardDisplay),
}
Myth.Util.castMembersToNumber(Myth.CGC.Collection.coords);

if (Myth.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_CGC_CardCollection", "OpenCardCollection", args => {
		SceneManager.push(Scene_CardCollection);
	});
}

Myth.CGC.Collection.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function (command, args)
{
	Myth.CGC.Collection.Game_Interpreter_pluginCommand.call(this, command, args);
	command = command.toLowerCase();
	if (command == 'opencardcollection') SceneManager.push(Scene_CardCollection);
}

Myth.CGC.Collection.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function ()
{
	Myth.CGC.Collection.Window_MenuCommand_addOriginalCommands.call(this);
		this.addCommand("Collection", 'collection', true);
};

Myth.CGC.Collection.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function ()
{
	Myth.CGC.Collection.Scene_Menu_createCommandWindow.call(this);
	this._commandWindow.setHandler('collection', this.commandCollection.bind(this));
};

Scene_Menu.prototype.commandCollection = function ()
{
	SceneManager.push(Scene_CardCollection);
};


function Scene_CardCollection()
{
	this.initialize.apply(this, arguments);
}

Scene_CardCollection.prototype = Object.create(Scene_CardLibrary.prototype);
Scene_CardCollection.prototype.constructor = Scene_CardCollection;


Scene_CardCollection.prototype.createStatusWindow = function ()
{
	const rect = this.actorWindowRect();
	this._statusWindow = new Window_CardCollectionStatus(rect);
	this._statusWindow.setActor = function () { };
	this.addWindow(this._statusWindow);
}

Scene_CardCollection.prototype.createItemWindow = function ()
{
	var wx = 0;
	var wy = this._skillTypeWindow.y + this._skillTypeWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy - this._helpWindow.height;
	this._itemWindow = new Window_CardCollection(wx, wy, ww, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
	this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
	this._skillTypeWindow.setSkillWindow(this._itemWindow);
	this.addWindow(this._itemWindow);


	//cardParent.setBackgrounds(this._backgroundSprite, this._libraryBackgroundSprite);
	if (!Myth.Util.usingMZ)
		this._cardParent.move(wx, wy, ww, wh);
};

Scene_CardCollection.prototype.doesShowHelpWindow = function ()
{
	return Myth.CGC.Collection.showHelpWindow;
}

Scene_CardCollection.prototype.getLibraryBackground = function ()
{
	return Myth.CGC.images.collectionBackgroundImage;
}

/*Scene_CardCollection.prototype.refreshActor = function ()
{
	var actor = this.actor();
	this._itemWindow.setActor(actor);
};*/

Scene_CardCollection.prototype.actorWindowRect = function ()
{
	const wx = Graphics.boxWidth / 2;
	var wy = 0;
	if (Myth.Util.usingMZ)
		wy = this.mainAreaTop();
	const ww = Graphics.boxWidth / 2;

	var wh = 0;
	if (Myth.Util.usingMZ)
		wh = this.calcWindowHeight(2, true);
	else
		wh = Window_Selectable.prototype.fittingHeight(2);
	//const wh = 400;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_CardCollection.prototype.createSkillTypeWindow = function ()
{
	if (Myth.CGC.Types)
	{
		var rect = Myth.CGC.Types.typeWindowRect();
		this._skillTypeWindow = new Window_CollectionType(rect);

		this._skillTypeWindow.setHelpWindow(this._helpWindow);
		this._skillTypeWindow.setHandler('skill', this.commandSkill.bind(this));
		this._skillTypeWindow.setHandler('cancel', this.popScene.bind(this));
		this.addWindow(this._skillTypeWindow);
	}
}

Scene_CardCollection.prototype.needsPageButtons = function ()
{
	return false;
};


function Window_CardCollection()
{
	this.initialize.apply(this, arguments);
}

Window_CardCollection.prototype = Object.create(Window_CardList.prototype);
Window_CardCollection.prototype.constructor = Window_CardCollection;

Window_CardCollection.prototype.cardsToList = function ()
{
	return [...$gameParty._cardCollection._data];
}

Window_CardCollection.prototype.makeItemList = function ()
{
	// follow mostly the same behavior from Window_CardList
	// but we want to fuse equipped cards with learned cards
	this._data = [];
	this._amounts = [];
	var cards = this.cardsToList();
	cards.sort(function (a, b)
	{
		if (a.id() < b.id())
			return -1;
		if (b.id() < a.id())
			return 1;

	});
	cards = this.includeMissingCards(cards);
	var lastIndex = -1;
	for (var i = 0; i < cards.length; i++)
	{
		var card = cards[i];
		if (!this.includes(card))
			continue;
		var lastCard = this._data[lastIndex];
		if (!this.usingSimpleView() && lastCard != null && card.id() == lastCard.id())
		{
			this._amounts[lastIndex]++;
		}
		else
		{
			lastIndex++;
			this._data.push(card);
			var amount = 1;
			if (card.origin() == "missing")
				amount = 0;
			this._amounts.push(amount);
		}
	}

};

Window_CardCollection.prototype.createCard = function ()
{
	var amount = this._amounts[this._cardToCreate];
	if (amount == 0 && this.useMissingCardImage())
	{
		this._cardToCreate++;
		return this.createMissingCard();
	}

	return Window_CardList.prototype.createCard.call(this);
}

Window_CardCollection.prototype.useMissingCardImage = function ()
{
	return Myth.CGC.images.missingCardBitmap != "";
}

Window_CardCollection.prototype.createMissingCard = function ()
{
	var sprite = new Sprite_MissingCard();
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	return sprite;
}

Window_CardCollection.prototype.displaySettings = function ()
{
	return Myth.CGC.Collection.coords.cardDisplay;
}

Window_CardCollection.prototype.numVisibleCols = function ()
{
	return Myth.CGC.Collection.coords.numVisibleCols;
}

Window_CardCollection.prototype.numVisibleRows = function ()
{
	return Myth.CGC.Collection.coords.numVisibleRows;
}


Window_CardCollection.prototype.setHelpWindowItem = function (item)
{
	if (this._helpWindow)
	{
		var amount = this._amounts[this.index()];
		if (amount == 0 && !this.displayMissingCardDescs())
			this._helpWindow.setText(Myth.CGC.Collection.missingCardDesc);
		else
			Window_CardList.prototype.setHelpWindowItem.call(this, item);
	}
	
}

Window_CardCollection.prototype.displayMissingCardDescs = function ()
{
	return Myth.CGC.Collection.missingCardDesc == "";
}


Window_CardCollection.prototype.showMissingCards = function ()
{
	return true;
}

Window_CardCollection.prototype.showGapCards = function ()
{
	return true;
}

Window_CardCollection.prototype.drawCardOrigin = function ()
{
	return false;
}

Window_CardCollection.prototype.drawAmounts = function ()
{
	return false;
}

Window_CardCollection.prototype.usingSimpleView = function ()
{
	return false;
}

Window_CardCollection.prototype.isHorizontal = function ()
{
	return Myth.CGC.Collection.horizontalCollection;
}

Window_CardCollection.prototype.updateArrows = function ()
{

};

function Sprite_MissingCard()
{
	this.initialize.apply(this, arguments);
}

Sprite_MissingCard.prototype = Object.create(Myth.Util.spritePrototype.prototype);
Sprite_MissingCard.prototype.constructor = Sprite_MissingCard;

Sprite_MissingCard.prototype.initialize = function ()
{
	Myth.Util.spritePrototype.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadBitmap("img/CGC/bases/", Myth.CGC.images.missingCardBitmap);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	//Touch input
	this._parentWindow = null; //only used for MZ

	//var bitmap = new Bitmap(Myth.CGC.defaultCardBack.width, Myth.CGC.defaultCardBack.height);
	//this.bitmap.fillAll("black");
	//this.bitmap = bitmap;
}


//Mimick Sprite_SkillCard's touch controls

//MZ
Sprite_MissingCard.prototype.onClick = function ()
{
	if (this._parentWindow)
		return this._parentWindow.confirmByCard(this);

	var scene = SceneManager._scene;
	if (scene._skillWindow)
		scene._skillWindow.confirmByCard(this);
	else if (scene._itemWindow)
		scene._itemWindow.confirmByCard(this);
}

Sprite_MissingCard.prototype.onMouseEnter = function ()
{
	this.__mouseEntered = true;
	if (this._parentWindow)
		return this._parentWindow.hoverCard(this);

	var scene = SceneManager._scene;
	if (scene._skillWindow)
		scene._skillWindow.hoverCard();
	else if (scene._itemWindow)
		scene._itemWindow.hoverCard();
}

Sprite_MissingCard.prototype.onMouseExit = function ()
{
	this.__mouseEntered = false;

	if (this._parentWindow)
		return this._parentWindow.hoverCard(this);

	var scene = SceneManager._scene;
	if (scene._skillWindow)
		scene._skillWindow.hoverCard();
	else if (scene._itemWindow)
		scene._itemWindow.hoverCard();
}

//MV
Sprite_MissingCard.prototype.isTouchedInsideFrame = function ()
{
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var radiusX = this.width / 2 * this.scale.x;
	var radiusY = this.height / 2 * this.scale.y;
	return x >= -radiusX && y >= -radiusY && x < radiusX && y < radiusY;
}

Sprite_MissingCard.prototype.canvasToLocalX = function (x)
{
	var node = this;
	while (node)
	{
		x -= node.x;
		node = node.parent;
	}
	return x;
}

Sprite_MissingCard.prototype.canvasToLocalY = function (y)
{
	var node = this;
	while (node)
	{
		y -= node.y;
		node = node.parent;
	}
	return y;
}



if (Myth.CGC.Types)
{
	function Window_CollectionType()
	{
		this.initialize.apply(this, arguments);
	};

	Window_CollectionType.prototype = Object.create(Window_CardSkillType.prototype);
	Window_CollectionType.prototype.constructor = Window_CollectionType;

	Window_CollectionType.prototype.getActorTypes = function ()
	{
		var types = [];

		Myth.CGC.Types.cardTypes.forEach(function (type)
		{
			var name = type.name.toLowerCase();
			types.push(name);
		}, this);

		return types;
	}

	Window_CollectionType.prototype.update = function ()
	{
		Window_CardSkillType.prototype.update.call(this);
		if (SceneManager._scene._statusWindow)
			SceneManager._scene._statusWindow.setStypeId(this.currentExt());
	}

	Window_CollectionType.prototype.displayType = function (type)
	{
		return type.showCollection;
	}
}

function Window_CardCollectionStatus()
{
	this.initialize.apply(this, arguments);
}

Window_CardCollectionStatus.prototype = Object.create(Window_Base.prototype);
Window_CardCollectionStatus.prototype.constructor = Window_CardCollectionStatus;

Window_CardCollectionStatus.prototype.initialize = function (rect)
{
	if (Myth.Util.usingMZ)
		Window_Base.prototype.initialize.call(this, rect);
	else
		Window_Base.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
	this._stypeId = 0;
	this.refresh();
}

Window_CardCollectionStatus.prototype.drawMainStats = function ()
{
	var amount = $gameParty._cardCollection.getUniqueSkillIds().length;
	var collectableCards = $dataSkills.filter((skill) =>
	{
		if (!skill) return false;
		if (skill.name == "" && !Myth.CGC.showBlankCardsInLibrary)
			return false;
		return skill.hideFromCardCollection != true;
	});
	var total = collectableCards.length;
	var percentage = (amount / total * 100).toFixed(2);//(Math.round(amount / total * 100));

	this.drawTextEx(amount + " / " + total + " Cards", 0, 0);
	this.drawText(percentage + "%", this.contents.width / 2, 0, this.contents.width / 2, 'right');
};

Window_CardCollectionStatus.prototype.drawTypeStats = function ()
{
	if (!Myth.CGC.Types) return;
	if (this._stypeId == 0) return;
	var typeName = Myth.CGC.Types.getTypeNameFromInt(this._stypeId - 1);
	var amount = $gameParty._cardCollection.uniqueCardsOfType(typeName);
	var collectableCards = $dataSkills.filter((skill) =>
	{
		if (!skill) return false;
		if (skill.name == "" && !Myth.CGC.showBlankCardsInLibrary)
			return false;
		var hasType = DataManager.isSkillOfType(skill.id, typeName);
		return skill.hideFromCardCollection != true && hasType;
	});
	var total = collectableCards.length;
	var percentage = (amount / total * 100).toFixed(2);

	this.drawTextEx(amount + " / " + total + " " + typeName, 0, this.lineHeight());
	this.drawText(percentage + "%", this.contents.width / 2, this.lineHeight(), this.contents.width / 2, 'right');

}

Window_CardList.prototype.shouldHideCard = function (dataSkill)
{
	if (dataSkill.hideFromCardCollection) return true;
}

Window_CardCollectionStatus.prototype.setStypeId = function (stypeId)
{
	if (this._stypeId !== stypeId)
	{
		this._stypeId = stypeId;
		this.refresh();
	}
};

Window_CardCollectionStatus.prototype.refresh = function ()
{
	this.contents.clear();
	this.drawMainStats();
	this.drawTypeStats();
};

Myth.CGC.Collection.DataManager_processCardAppearanceNotetags = DataManager.processCardAppearanceNotetags;
DataManager.processCardAppearanceNotetags = function (group)
{
	Myth.CGC.Collection.DataManager_processCardAppearanceNotetags.call(this, group);

	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(/<hide from collection>/i))
			{
				obj.hideFromCardCollection = true;
			}
		}
	}
}