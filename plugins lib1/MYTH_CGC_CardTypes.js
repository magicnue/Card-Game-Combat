//=============================================================================
// MYTH_CGC_CardTypes
//=============================================================================

/*:
 * @target MZ * 
 * @author Isiah Brighton
 * @plugindesc v1.2.2 An extension to MYTH_CGC_CoreEngine that adds card types
 * @url https://www.patreon.com/mythatelier
 * 
 * 
 * @param types
 * @text Card Types
 * @type struct<CardType>[]
 * @default ["{\"name\":\"type1\",\"draw\":\"true\",\"icon\":\"0\",\"cardBase\":\"\"}","{\"name\":\"type2\",\"draw\":\"true\",\"icon\":\"0\",\"cardBase\":\"\"}","{\"name\":\"type3\",\"draw\":\"true\",\"icon\":\"0\",\"cardBase\":\"\"}"]
 * 
 * @param Appearance
 * 
 *     @param showName
 *     @parent Appearance
 *     @text Show Name?
 *     @type boolean
 *     @default true
 *     @desc If set to ON, the name of the Card Type will be shown on all cards with that type. If False, just the icon.
 *     
 *     @param nameCoordinate
 *     @text Coordinates
 *     @parent Appearance
 *     @type struct<Coordinate>
 *     @desc The X/Y coordinates for the first Card Type to be drawn on the card.
 *     @default {"x":"0","y":"0"}
 *     
 *     @param maxCols
 *     @text Number of Columns
 *     @parent Appearance
 *     @type number
 *     @default 2
 *     @desc The number of columns of Types that will display on the Card before moving down to the next row.
 *     
 *     @param typeWidth
 *     @text Row Width
 *     @parent Appearance
 *     @type number
 *     @default 172
 *     @desc The width of each row of Types. The spacing between Types will be calculated based on this + Number of Columns.
 *     
 *     @param typeHeight
 *     @text Row Height
 *     @parent Appearance
 *     @type number
 *     @default 22
 *     @desc The height of each row of Types.
 *         
 * 
 *    @param typeiconSize
 *    @parent Appearance
 *    @text Type Icon Size
 *    @type number
 *    @default 16
 *    @desc Icons may need to be drawn scaled-down on the card. This is the pixel width/height of icons to draw.
 *
 *
 *
 * @help
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 * 
 * This plugin allows you to add one or more card types to each Skill.
 * 
 * First, define the Type using the plugin parameter. When defining a type,
 * all parameters other than the Name affect how it's drawn on the card.
 * 
 * Then, use skill notetags to give a skill the Card Type you created.
 * The spelling and capitalization must be exactly the same, so watch out for
 * typos.
 * 
 * ============================================================================
 * Skill Notetags
 * ============================================================================
 * 
 * <Card Type: type_name>
 * Replace "type_name" with the name of the Card Type (case sensitive) that you
 * want this skill to have. A Skill/Card can have multiple Card Types, using
 * multiple instances of this notetag.
 * 
 * Ensure that all Types you plan to use are in the Card Types plugin parameter.
 * 
 * Any skill which contains the <Card Base: file_name> notetag from 
 * MYTH_CGC_CardTypes will use that specified Card Base instead of the one
 * specified by this plugin.
 * 
 * ============================================================================
 * Extra Card Actions
 * ============================================================================
 * 
 * Draw X Type typeName
 *     This will draw the first X cards in your deck that are of the specified
 *     type.
 *     
 * Mill X Type typeName
 * Discard X Type typeName
 * Remove X Type typeName
 *     These work the same way, but for their respective Mill/Discard/Remove
 *     actions.
 *     
 * Mill Until Type typeName
 *     This will Mill cards from the top of the deck until the card at the top
 *     is of the specified type.
 *     
 * Move X Type typeName from zoneName to zoneName
 *    This is the generic Move action that accepts all zones.
 *     
 * ============================================================================
 * Advanced feature
 * ============================================================================
 * 
 * user.cardsInZoneOfType(zone, type)
 *     This function can be used inside damage formulas, Evals, and Require
 *     notetags. It will return the amount of cards of the given type in the
 *     given zone.
 *     
 * 'zone' and 'type' are string parameters, which means they must have
 * quotation marks around them.
 *     
 * Zone options (include the quotation marks):
 *     "hand"
 *     "deck"
 *     "discard"
 *     
 * 'type' is a Card Type name with quotation marks around it.
 * 
 * An example of how to format this:
 * 
 *     <Card Passives>
 *     Require user.cardsInZoneOfType("hand", "Fossil")
 *     </Card Passives>
 * 
 * 
 * ============================================================================
 * Version History
 * ============================================================================
 * 
 * v1.2.2 - Changed how Types are drawn on the card to be in line with how
 *          items are drawn on a Selectable Window, ie, in a grid.
 *          Added Number of Colums, Row Width and Row Height params.
 *          Removed redundant parameters that are in TextFormatPlus.
 *          Types are now case-insensitive.
 *          Changes made to Library Scene continue when Card Types is present.
 *          New function drawRandomCardsOfType(amount, type). Might be fun.
 *          More getter functions for cards/zones.
 *			Moved Myth.Util.tryParse from CardTypes to CoreEngine, 
 *			genericized it slightly.
 * 
 * v1.2.1 - Fixed Icon Formatting Issues and added new Plugin Parameters
 *        - Fixed TextFormatPlus bug where wrong ResetFontSettings was being used
 *
 * v1.2.0 - Updated for compatibility with v1.6.0
 *        - Changed plugin name
 *        - Increased compatibility with other expansions
 *        - Added new Card Action: Move X Type typeName from zoneName to
 *          zoneName.
 * 
 * 
 */

/*~struct~CardType:
 * @param name
 * @text Name
 * @type text
 * 
 * @param draw
 * @text Draw on Card?
 * @type boolean
 * @default true
 * @desc If set to ON, this card type will be drawn on the card. If OFF, ignore all below parameters.
 *
 * @param icon
 * @text Icon
 * @type number
 * @desc The icon index that represents the card type, if you are displaying that on the card.
 * @default 0
 * 
 * @param cardBase
 * @text Card Base
 * @type string
 * @desc The Card Base to use for all cards of this Type. Set to nothing to ingore this feature.
 * 
 * @param showLibrary
 * @text Show in Library?
 * @type boolean
 * @default true
 * @desc If set to ON, the player will be able to filter by this type in the Card Library
 * 
 * @param showDeck
 * @text Show in Deck Editor?
 * @type boolean
 * @default true
 * @desc If set to ON, will show Category Icon in Deck Stats Window.
 * 
 * @param showCollection
 * @text Show in Collection?
 * @type boolean
 * @default true
 * @desc If set to ON, the player will be able to filter by this type in the Collection.
 * 
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
	console.error("Please make sure MYTH_CGC_CardTypes is placed underneath MYTH_CGC_CoreEngine");

var Imported = Imported || {};
Imported.IsiahCGCTypes = true;
Imported.MythCGCTypes = true;

Myth.CGC.Types = Myth.CGC.Types || {};

Myth.Parameters = PluginManager.parameters('MYTH_CGC_CardTypes');

Myth.CGC.Types.coordinates = {
	start: Myth.Parameters.nameCoordinate,
	maxCols: Number(Myth.Parameters.maxCols),
	typeHeight: Number(Myth.Parameters.typeHeight),

	drawName: JSON.parse(Myth.Parameters.showName),
}


Myth.Util.castMembersToNumber(Myth.CGC.Types.coordinates);
Myth.CGC.typeiconSize = Number(Myth.Parameters.typeiconSize);

Myth.CGC.textWidths.cardType = Number(Myth.Parameters.typeWidth);



if (Myth.Parameters.types)
	Myth.CGC.Types.cardTypes = JSON.parse(Myth.Parameters.types);
if (Myth.CGC.Types.cardTypes)
{
	var len = Myth.CGC.Types.cardTypes.length;
	for (var i = 0; i < len; i++)
	{
		Myth.CGC.Types.cardTypes[i] = JSON.parse(Myth.CGC.Types.cardTypes[i]);
		var type = Myth.CGC.Types.cardTypes[i];
		type.icon = Number(type.icon);
		type.draw = Myth.Util.tryParse(type.draw, false, "MYTH_CGC_CardTypes Type struct");
		type.showLibrary = Myth.Util.tryParse(type.showLibrary, false, "MYTH_CGC_CardTypes Type struct");
		type.showDeck = Myth.Util.tryParse(type.showDeck, type.showDeck, "MYTH_CGC_CardTypes Type struct");
		type.showCollection = Myth.Util.tryParse(type.showCollection, type.showLibrary, "MYTH_CGC_CardTypes Type struct");
	}
}

Myth.CGC.Types.typeWindowRect = function ()
{
	var wx = 0;
	var wy = 0;
	if (Myth.Util.usingMZ)
		wy = SceneManager._scene.mainAreaTop();
	var ww = Graphics.boxWidth / 2;
	var wh = 100;
	var rect = new Rectangle(wx, wy, ww, wh);
	return rect;
}

Myth.CGC.Types.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.Types.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_CGC_Type)
	{
		DataManager.processCardTypeNotetags($dataSkills);
		Myth.loaded_CGC_Type = true;
	}

	return true;
}

DataManager.processCardTypeNotetags = function (group)
{
	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(/<card ?type:? (.*)>/i))
			{
				var type = RegExp.$1;
				obj._cardTypes = obj._cardTypes || [];
				obj._cardTypes.push(type.toLowerCase());
			}
		}
	}
};

DataManager.isSkillOfType = function (skillId, type)
{
	var skill = $dataSkills[skillId];
	var types = skill._cardTypes;
	if (types)
	{
		return types.contains(type.toLowerCase());
	}

	return false;
}

Myth.CGC.Types.findTypeByName = function (name)
{
	name = name.toLowerCase();
	const isSameName = (element) => element.name.toLowerCase() == name;
	var index = Myth.CGC.Types.cardTypes.findIndex(isSameName);
	if (index == -1)
	{
		console.warn("Cannot find a Type in the list of Plugin Params for MYTH_CGC_CardTypes named " + name + ".");
		console.warn("This won't break the game but it may stop certain mechanics from working.");
	}
	return Myth.CGC.Types.cardTypes[index];
};

Myth.CGC.Types.getTypeNameFromInt = function (int)
{
	if (int >= Myth.CGC.Types.cardTypes.length)
	{
		console.error("Supplied " + int + " to Myth.CGC.Types.getTypeNameFromInt");
		return "";
	}
	return Myth.CGC.Types.cardTypes[int].name;
}



Myth.CGC.Types.Sprite_SkillCard_updateCardBack = Sprite_SkillCard.prototype.updateCardBack;
Sprite_SkillCard.prototype.updateCardBack = function ()
{
	var cardDesign = $dataSkills[this._skillId]._cardBase;
	var types = $dataSkills[this._skillId]._cardTypes;
	var cardBase = "";
	if (types)
	{
		var typeName = types[0];
		var type = Myth.CGC.Types.findTypeByName(typeName);
		
		if (type && type.cardBase && type.cardBase != "")
		{
			cardBase = type.cardBase;
		}
	}

	if (cardDesign || cardBase == "")
		return Myth.CGC.Types.Sprite_SkillCard_updateCardBack.call(this);


	var back = ImageManager.loadBitmap("img/" + Myth.CGC.cardDesignDirectory + "/", cardBase);
	this._cardback = back;
	return true;
};

Sprite_SkillCard.prototype.drawCardType = function ()
{
	if (!Myth.CGC.cardDisplayComponents.cardType) return;

	var types = this._skill._cardTypes;
	if (!types) return;
	this.drawType = 'cardType';
	this.resetFontSettings();

	var coords = Myth.CGC.Types.coordinates;
	var index = 0;
	for (var i = 0; i < types.length; i++)
	{
		var type = types[i];
		var dataType = Myth.CGC.Types.findTypeByName(type);
		if (!dataType) continue;
		if (dataType.draw == false) continue;
		
		var rect = this.typeRect(index);
		rect = this.alignTypeText(rect, dataType);

		if (coords.drawName)
		{
			if (!dataType.icon)// || (Myth.CGC.TFP && Myth.CGC.TFP.textAligns.cardType != 'left'))
			{
				this.drawText(dataType.name, rect.x, rect.y, rect.width, 'left');
			}
			else
			{
				this.drawText(dataType.name, rect.x + Myth.CGC.typeiconSize + 2, rect.y + 2, rect.width, 'left');
			}
		}
		
		if (dataType.icon)
		{
			this.drawIconScaled(dataType.icon, rect.x, rect.y, Myth.CGC.typeiconSize, Myth.CGC.typeiconSize);
		}
		index++;
	}
}

Sprite_SkillCard.prototype.alignTypeText = function (rect, dataType)
{
	var totalTextWidth = 0;
	if (Myth.CGC.Types.coordinates.drawName)
		totalTextWidth += this.textWidth(dataType.name);
	if (dataType.icon)
		totalTextWidth += Myth.CGC.typeiconSize + 2;

	var textAlign = this.textAlign();
	var maxTextWidth = rect.width;

	if (textAlign == 'center')
	{
		rect.x += maxTextWidth / 2;
		rect.x -= totalTextWidth / 2;
	}
	if (textAlign == 'right')
	{
		rect.x += maxTextWidth;
		rect.x -= totalTextWidth;
	}

	
	return rect;
}

if (Sprite_SkillCard.prototype.textAlign == undefined)
{
	Sprite_SkillCard.prototype.textAlign = function ()
	{
		return 'left';
	}
}

Sprite_SkillCard.prototype.typeRect = function (index)
{
	// Mimick itemRect

	var coords = Myth.CGC.Types.coordinates;
	var rect = new Rectangle();
	var maxCols = coords.maxCols;
	var spacing = 0;
	rect.width = Math.floor((Myth.CGC.textWidths.cardType + spacing) / maxCols - spacing);
	rect.height = coords.typeHeight;
	rect.x = coords.start.x + (index % maxCols * (rect.width + spacing));
	rect.y = coords.start.y + (Math.floor(index / maxCols) * rect.height);
	return rect;
}

Myth.CGC.Types.Sprite_SkillCard_resetFontSettings = Sprite_SkillCard.prototype.resetFontSettings;
Sprite_SkillCard.prototype.resetFontSettings = function ()
{
	Myth.CGC.Types.Sprite_SkillCard_resetFontSettings.call(this);
}



Myth.CGC.Types.Game_Battler_performCardAction = Game_Battler.prototype.performCardAction;
Game_Battler.prototype.performCardAction = function (action)
{
	var originalAction = action;
	action = this.formatCardAction(action);

	if (action.match(/(?:Draw )(\d+) type (.*)/i))
	{
		var amount = RegExp.$1;
		var type = RegExp.$2;
		this.drawCardsOfType(amount, type);
	}
	else if (action.match(/(?:Mill )(\d+) type (.*)/i))
	{
		var amount = RegExp.$1;
		var type = RegExp.$2;
		this.millCardsOfType(amount, type);
	}
	else if (action.match(/(?:Mill Until type )(.*)/i))
	{
		var type = RegExp.$1;
		this.millUntilType(type);
	}
	else if (action.match(/(?:Discard )(\d+) type (.+)/i))
	{
		var amount = RegExp.$1;
		var type = RegExp.$2;
		BattleManager.requireDiscard(amount, 'discard', type);
	}
	else if (action.match(/(?:Remove )(\d+) type (.+)/i))
	{
		var amount = RegExp.$1;
		var type = RegExp.$2;
		BattleManager.requireDiscard(amount, 'remove', type);
	}
	else if (action.match(/(?:Move )(\d+)(?: type )(.+)(?: from )(\w+)(?: to )(\w+)/i))
	{
		var amount = RegExp.$1;
		var type = RegExp.$2;
		var zone1 = RegExp.$3;
		var zone2 = RegExp.$4;
		this.moveCardsOfType(amount, type, zone1, zone2);
	}
	else
		Myth.CGC.Types.Game_Battler_performCardAction.call(this, originalAction);
};

Game_Battler.prototype.moveCardsOfType = function (amount, type, zone1, zone2)
{
	var startingZone = this.getZoneByName(zone1);
	var endingZone = this.getZoneByName(zone2);

	if (startingZone.length == 0)
	{
		var dataZone = Myth.Util.getZoneDataByName(zone1);
		if (dataZone.emptyActions && Myth.Util.getEmptyActionExecution(dataZone) == 1)
		{
			//basically cancel the card action and repeat it
			var newAction = "move " + amount + " type " + type + " from " + zone1 + " to " + zone2;
			var emptyActions = dataZone.emptyActions + '\n' + newAction;
			BattleManager.insertCardActions(this, emptyActions.split('\n'));
			return;
		}
	}

	if (amount == -1)
		amount = startingZone.length;

	for (var i = 0; i < amount; i++)
	{
		this.moveCardOfType(0, type, startingZone, endingZone, true);
	}
};

Game_Battler.prototype.moveCardOfType = function (index, type, startingZone, endingZone, playSE)
{
	var zoneIndex = -1;
	for (var i = 0; i < startingZone.length; i++)
	{
		var card = this._cardDeck.card(i);
		var skill = card.id();
		if (DataManager.isSkillOfType(skill, type))
		{
			zoneIndex = i;
			if (index == 0)
			{
				break;
			}
			else
			{
				index--;
			}
		}
	}

	if (zoneIndex != -1)
	{
		this.moveCard(index, startingZone, endingZone, playSE);
	}
}



Game_Battler.prototype.drawCardsOfType = function (amount, type)
{
	for (var i = 0; i < amount; i++)
	{
		this.drawCardOfType(type);
	}
}

Game_Battler.prototype.drawRandomCardsOfType = function (amount, type)
{
	if (this._cardDeck.length > 0)
	{
		var validIndices = [];

		for (var i = 0; i < this._cardDeck.length; i++)
		{
			var card = this._cardDeck.card(i);
			var skill = card.id();
			if (DataManager.isSkillOfType(skill, type))
			{
				validIndices.push(i);
			}
		}

		while (amount > 0 && validIndices.length > 0)
		{
			var indexIndex = Math.randomInt(validIndices.length);
			this.drawCardAtIndex(validIndices[indexIndex]);
			for (var i = indexIndex + 1; i < validIndices.length; i++)
			{
				validIndices[i]--;
			}
			validIndices.splice(indexIndex, 1);
			amount--;
		}
	}
}

Game_Battler.prototype.drawCardOfType = function(type)
{
	if (this._cardDeck.length > 0)
	{
		for (var i = 0; i < this._cardDeck.length; i++)
		{
			var card = this._cardDeck.card(i);
			var skill = card.id();
			if (DataManager.isSkillOfType(skill, type))
			{
				this.drawCardAtIndex(i);
				break;
			}
		}
	}
}

Game_Battler.prototype.millCardsOfType = function (amount, type)
{
	for (var i = 0; i < amount; i++)
	{
		this.millCardOfType(type);
	}
};

Game_Battler.prototype.millCardOfType = function (type)
{
	if (this._cardDeck.length > 0)
	{
		for (var i = 0; i < this._cardDeck.length; i++)
		{
			var card = this._cardDeck.card(i);
			var skill = card.id();
			if (DataManager.isSkillOfType(skill, type))
			{
				this.millCardAtIndex(i);
				break;
			}
		}
	}
}


Game_Battler.prototype.millUntilType = function (type)
{
	while (this._cardDeck.length > 0)
	{
		var card = this._cardDeck.card(0);
		var skill = card.id();
		if (DataManager.isSkillOfType(skill, type))
		{
			break;
		}
		else
		{
			var hasOneCard = (this._cardDeck.length == 1); //prevents an infinite loop
			this.millCard();
			if (hasOneCard)
			{
				break;
			}
		}
	}
};

Game_Battler.prototype.cardsInZoneOfType = function (zone, type)
{
	var amount = 0;
	var cardZone = this.getZoneByName(zone);
	if (cardZone)
	{
		for (var i = 0; i < cardZone.length; i++)
		{
			var card = cardZone.card(i);
			var skill = card.id();
			if (DataManager.isSkillOfType(skill, type))
				amount++;
		}
	}

	return amount;
}

Game_Actor.prototype.getLibrary = function ()
{
	return this._skillCards;
}

Game_Actor.prototype.moveCardsOfType = function (amount, type, zone1, zone2)
{
	var startingZone = this.getZoneByName(zone1);
	if (startingZone == this._cardHand)
	{
		BattleManager.requireDiscard(amount, zone2, type);
	}
	else
	{
		Game_Battler.prototype.moveCardsOfType.call(this, amount, type, zone1, zone2);
	}
}

Game_Actor.prototype.hasCardInZone = function(zone, value)
{
	var targetZone = this.getZoneByName(zone);
	if(targetZone == undefined) return false;
	var isFound = false;

	if(typeof value == "string")
	{
		targetZone._data.forEach((card) => 
		{
			if($dataSkills[card._skillId].name == value)  isFound = true;
		});
	}
	else
	{
		targetZone._data.forEach((card) => 
		{
			if($dataSkills[card._skillId].name == $dataSkills[value].name)  isFound = true;
		});
	}

	return isFound;
}

Myth.CGC.getIDsOfType = function(type)
{
	type = type.toLowerCase();
	var matchType = [];
	$dataSkills.forEach((skill) => {
		if(skill && skill._cardTypes)
		{
			if(skill._cardTypes.includes(type)) matchType.push(skill.id);
		}
	});

	return matchType;
}

Window_BattleSkill.prototype.showHighlightSpritesByType = function (type, highlight)
{
	type = type.toLowerCase();
	var cardZone = this._cardSprites.getCardSprites();
	for (var i = 0; i < cardZone.length; i++)
	{
		var card = cardZone[i];
		var dataSkill = card._skill;
		if (dataSkill._cardTypes)
		{
			for (var j = 0; j < dataSkill._cardTypes.length; j++)
			{
				var t = dataSkill._cardTypes[j];
				if (t == type)
				{
					card[highlight].show();
					break;
				}
			}
		}
	}
}

Window_BattleSkill.prototype.isCorrectType = function (item, type)
{
	if (this.index() == this.endTurnIndex()) return true;

	if (!type) return true;
	type = type.toLowerCase();

	var types = item._cardTypes;
	if (!types) return false;

	for (var i = 0; i < types.length; i++)
	{
		var t = types[i];
		if (t == type)
		{
			return true;
		}
	}

	return false;
}

Myth.CGC.Types.Window_BattleSkill_discardAllCards = Window_BattleSkill.prototype.discardAllCards;
Window_BattleSkill.prototype.discardAllCards = function (type)
{
	if (type == undefined || type == null)
		return Myth.CGC.Types.Window_BattleSkill_discardAllCards.call(this);
	var handCards = this._cardSprites.getCardSprites();
	for (var i = handCards.length - 1; i >= 0; i--)
	{
		if (this.isCorrectType(handCards[i]._skill, type))
			this.discardCard(i + this._itemsBeforeCards);
	}
}



function Window_CardSkillType()
{
	this.initialize.apply(this, arguments);
};

Window_CardSkillType.prototype = Object.create(Window_SkillType.prototype);
Window_CardSkillType.prototype.constructor = Window_CardSkillType;

Window_CardSkillType.prototype.initialize = function (rect)
{
	if (Myth.Util.usingMZ)
	{
		rect.height = this.fittingHeight(this.numVisibleRows());
		Window_SkillType.prototype.initialize.call(this, rect);
	}
	else
	{
		Window_SkillType.prototype.initialize.call(this, rect.x, rect.y);
		this.height = this.fittingHeight(this.numVisibleRows());
		this.width = rect.width;
	}
}

Window_CardSkillType.prototype.numVisibleRows = function ()
{
	return 2;
}

Window_CardSkillType.prototype.makeCommandList = function ()
{
	this._icons = [];
	if (this._actor)
	{
		var types = this.getActorTypes();
		this.addCommand('All', 'skill', true, 0);
		this._icons.push(0);
		var index = 1;
		Myth.CGC.Types.cardTypes.forEach(function (type)
		{
			var name = type.name;
			if (types.contains(name.toLowerCase()) && this.displayType(type))
			{
				this.addCommand(name, 'skill', true, index);
				this._icons.push(type.icon);
			}
			index++;
		}, this);
	}
};

Window_CardSkillType.prototype.getActorTypes = function ()
{
	var types = [];

	var actorSkills = this._actor.getLibrary().slice();
	for (var i = 0; i < actorSkills.length; i++)
	{
		var card = actorSkills[i];
		var skill = $dataSkills[card.id()];
		var ts = skill._cardTypes;
		if (ts)
		{
			for (var j = 0; j < ts.length; j++)
			{
				if (!types.contains(ts[j]))
				{
					types.push(ts[j]);
				}
			}
		}
	}

	return types;
}

Window_CardSkillType.prototype.displayType = function (type)
{
	return type.showLibrary;
}

Window_CardSkillType.prototype.drawItem = function (index)
{
	var rect = Myth.Util.usingMZ ? this.itemLineRect(index) : this.itemRectForText(index);
	var align = this.itemTextAlign();
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawIcon(this._icons[index], rect.x, rect.y);
	if (align == 'left')
	{
		var width = Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth;
		rect.x += width + 4;
		rect.width -= width + 4;
	}
	this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
}

Window_CardSkillType.prototype.maxCols = function ()
{
	return 3;
};

Window_CardSkillType.prototype.itemTextAlign = function ()
{
	return "center";
};



Scene_CardLibrary.prototype.createSkillTypeWindow = function ()
{
	var rect = Myth.CGC.Types.typeWindowRect();
	this._skillTypeWindow = new Window_CardSkillType(rect);

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

/*Scene_CardLibrary.prototype.createActorWindow = function ()
{

}*/

Scene_CardLibrary.prototype.createStatusWindow = function ()
{
	const rect = this.actorWindowRect();
	this._statusWindow = new Window_CardLibraryActor(rect.x, rect.y);
	this._statusWindow.setHandler("ok", this.onActorOk.bind(this));
	this._statusWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this.addWindow(this._statusWindow);
}

Scene_CardLibrary.prototype.actorWindowRect = function ()
{
	const wx = Graphics.boxWidth / 2;
	var wy = 0;
	if (Myth.Util.usingMZ)
		wy = this.mainAreaTop();
	const ww = Graphics.boxWidth / 2;

	var wh = 0;
	if (Myth.Util.usingMZ)
		wh = this.mainAreaHeight();
	else
		wh = Window_Selectable.prototype.fittingHeight(2);
	//const wh = 400;
	return new Rectangle(wx, wy, ww, wh);
};

function Window_CardLibraryActor()
{
	this.initialize.apply(this, arguments);
}

Window_CardLibraryActor.prototype = Object.create(Window_MenuStatus.prototype);
Window_CardLibraryActor.prototype.constructor = Window_CardLibraryActor;

Window_CardLibraryActor.prototype.initialize = function (x, y)
{

	if (Myth.Util.usingMZ)
	{
		var width = Graphics.boxWidth / 2;
		var height = this.lineHeight() * 2 + this.itemPadding() * 2;
		height += $gameSystem.windowPadding() * 2;
		var rect = new Rectangle(x, y, width, height);
		Window_MenuStatus.prototype.initialize.call(this, rect);
	}
	else
	{
		Window_MenuStatus.prototype.initialize.call(this, x, y);
	}
};

Window_CardLibraryActor.prototype.windowWidth = function ()
{
	return Graphics.boxWidth / 2;
};

Window_CardLibraryActor.prototype.windowHeight = function ()
{
	return this.lineHeight() * 2 + this.standardPadding() * 2;
};

Window_CardLibraryActor.prototype.setActor = function (actor)
{
	this._actor = actor;
	this.refresh();
}

Window_CardLibraryActor.prototype.itemRect = function (index)
{
	var height = this.lineHeight() * 2 + this.itemPadding() * 2;
	var rect = new Rectangle(0, 0, this.contents.width, height);
	return rect;
};

if (!Myth.Util.usingMZ)
{
	Window_CardLibraryActor.prototype.itemPadding = function ()
	{
		return this.standardPadding();
	}
}

Window_CardLibraryActor.prototype.drawAllItems = function ()
{
	const topIndex = this.topIndex();
	var max = Myth.Util.usingMZ ? this.maxVisibleItems() : this.maxPageItems();
	for (let i = 0; i < max; i++)
	{
		const index = topIndex + i;
		if (index < this.maxItems() && $gameParty.members()[index] == this._actor)
		{
			this.drawItemBackground(index);
			this.drawItem(index);
		}
	}
}

Window_CardLibraryActor.prototype.actor = function (index)
{
	return $gameParty.members()[index];
};



if (Myth.Util.usingMZ)
{
	Window_CardLibraryActor.prototype.drawItemStatus = function (index)
	{
		const actor = this.actor(index);
		if (!actor) return;
		const rect = this.itemRect(index);

		const x = rect.x + Myth.Util.usingMZ ? ImageManager.faceWidth : Window_Base._faceWidth;
		const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
		var textY = y + 8;
		var lineHeight = this.lineHeight();
		const x2 = rect.width / 2;
		this.drawActorName(actor, x, textY);
		this.drawActorLevel(actor, x, y + lineHeight * 1);
		var iconY = rect.height - Window_Base._iconHeight;
		if (Window_Base._iconHeight == undefined)
			iconY = rect.height - ImageManager.iconHeight;
		this.drawActorIcons(actor, x, iconY - 2);
		this.drawActorClass(actor, x2, textY);
		this.placeBasicGauges(actor, x2, textY - 4 + lineHeight);
	};
}
else
{
	Window_CardLibraryActor.prototype.drawItemStatus = function (index)
	{
		const actor = this.actor(index);
		if (!actor) return;
		const rect = this.itemRect(index);

		const x = rect.x + Myth.Util.usingMZ ? ImageManager.faceWidth : Window_Base._faceWidth;
		const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
		var textY = y + 8;
		var lineHeight = this.lineHeight();
		const x2 = (rect.width - x) / 2 + x;
		this.drawActorName(actor, x, textY);
		this.drawActorLevel(actor, x2, textY);

		var iconY = rect.height - Window_Base._iconHeight;
		this.drawActorIcons(actor, 0, iconY - 2);

		this.drawActorHp(actor, x, textY - 4 + lineHeight, x2 - x - 12)
		this.drawActorMp(actor, x2, textY - 4 + lineHeight * 1, rect.width - x2 - 12);
	};

	Window_CardLibraryActor.prototype.drawItemImage = function (index)
	{
		var actor = $gameParty.members()[index];
		var rect = this.itemRect(index);
		this.changePaintOpacity(actor.isBattleMember());
		var height = Math.min(Window_Base._faceHeight, this.contents.height);
		this.drawActorFace(actor, rect.x, rect.y, Window_Base._faceWidth, height);
		this.changePaintOpacity(true);
	};
}

Window_CardLibraryActor.prototype.drawActorLevel = function (actor, x, y)
{
	var color = Myth.Util.usingMZ ? ColorManager.systemColor() : this.systemColor();
	this.changeTextColor(color);
	this.drawText(TextManager.levelA, x, y, 48);
	this.resetTextColor();
	this.drawText(actor.level, x + 56, y, 36, "right");
};

Window_CardLibraryActor.prototype.placeGauge = function (actor, type, x, y)
{
	if (type == "tp") return;
	Window_StatusBase.prototype.placeGauge.call(this, actor, type, x, y);
};

Myth.CGC.Types.Window_CardList_includes = Window_CardList.prototype.includes;
Window_CardList.prototype.includes = function (item)
{
	if (Myth.CGC.Types.Window_CardList_includes.call(this, item) == false)
		return false;

	if (this._stypeId == 0 || this._stypeId == null)
		return true;
	else
	{
		var typeName = Myth.CGC.Types.getTypeNameFromInt(this._stypeId - 1).toLowerCase();
		var dataSkill = $dataSkills[item.id()];
		return dataSkill && dataSkill._cardTypes && dataSkill._cardTypes.contains(typeName);
	}
};


Game_Card.prototype.isType = function (typeName)
{
	return DataManager.isSkillOfType(this.id(), typeName);
}


Game_Cards.prototype.cardsOfType = function (type)
{
	var amount = 0;
	for (var i = 0; i < this._data.length; i++)
	{
		var card = this.card(i);
		var skill = card.id();
		if (DataManager.isSkillOfType(skill, type))
			amount++;
	}

	return amount;
}

Game_Cards.prototype.uniqueCardsOfType = function (type)
{
	type = type.toLowerCase();
	var uniqueIds = [];
	var ids = this.getSkillIds();
	for (var i = 0; i < ids.length; i++)
	{
		if (DataManager.isSkillOfType(ids[i], type) && !uniqueIds.includes(ids[i]))
			uniqueIds.push(ids[i]);
	}

	return uniqueIds.length;
}