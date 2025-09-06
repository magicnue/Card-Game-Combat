//=============================================================================
// MYTH_CGC_ActionPack1
//=============================================================================

/*:
 * @target MZ *
 * @author Isiah Brighton
 * @plugindesc v1.1.1 An extension to MythCardGameCombat that adds several new Card Actions.
 * @url https://www.patreon.com/mythatelier
 *
 * @param selectionHighlight
 * @text Selection Highlight Image
 * @type file
 * @dir img/system
 * @require 1
 * @desc The sprite that appears on top of the card when it is being queued for selection in the Selection Window.
 *
 * @param showTopText
 * @text Show Top Text?
 * @type boolean
 * @default true
 * @desc Determines if the top text appears in the Card Selection Window. Top text is "Select X cards from zoneName"
 * 
 * @param showBottomText
 * @text Show Bottom Text?
 * @type boolean
 * @default true
 * @desc Determines if the bottom text appears in the Card Selection Window during a selection. Bottom text is "X / X selected"
 * 
 * @help
 *
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin adds several new Card Actions which involve the Card Selection
 * Window.
 * 
 * These Card Actions (CAs) work together in a group as part of 1 of 3 
 * stages:
 * 1. Selection
 * 2. Movement
 * 3. Clear
 * 
 * 
 * Selection CAs open the Selection Window and have the player select cards
 *     (e.g, "Select 2 from deck")
 * 
 * Movement CAs perform an action involving the cards selected in the 
 *     Selection CA (e.g, "Move selected to discard")
 *     
 * The Clear CA clears the list of selected cards so future Movement CAs do
 *     not use them ("Clear selected")
 *     
 * A Selection Card Action must be called before a Movement Card Action can
 * execute, and a Clear Card Action cleans up all internal variables to
 * prepare for the next set of Card Actions.
 * 
 * Example:
 *     <Card Actions>
 *     Select 2 from deck
 *     Move selected to discard
 *     Clear selected
 *     </Card Actions>
 * This example makes the player move 2 cards of their choice from their deck
 * to their discard.
 * 
 * 
 *
 * ============================================================================
 * Selection Card Actions
 * ============================================================================
 *
 * Select X from zoneName
 *     Replace 'X' with a number or game variable, and replace 'zoneName' with
 *     'deck', 'discard' or 'hand'
 *     This opens the Card Selection Window and makes the player choose X cards
 *     from the specified zone.
 *     
 * Select X of Y from zoneName location
 *     Replace 'X' with a number, 'Y' with another number,
 *     'zoneName' with a zone, and replace 'location' with either 'Top', 
 *     'Bottom' or 'Random'.
 *     This makes the player choose X cards from a selection of Y cards from
 *     the specified zone. If 'Top', The pool of cards will be grabbed from
 *     the top Y cards. If 'Bottom', the bottom. If 'random', cards will be
 *     grabbed randomly from the zone.
 *     
 * Select X from skills Y, Z, A, B
 *     Replace X, Y, Z, etc with numbers.
 *     This makes the player choose X cards from a list of Skill IDs.
 *     The list of IDs can be any size, separated by commas.
 * 
 *  Select All from zoneName
 *     This automatically loads all cards in the specified zone into Selected.
 * 
 * If you're using CardTypes:
 * 
 * 
 * Select X Type typeName from zoneName
 *     Replace X with a number, typeName with the name of a Card Type, and
 *     zoneName with a zone.
 *     This makes the player choose X cards from the specified zone filtered
 *     to only include the specified Card Type.
 *     
 * Select X of Y Type typeName from zoneName location
 *     This makes the player choose X cards from the specified zone,
 *     filtered to only include the specified Card Type, with a pool size
 *     of Y grabbed from the top/bottom or grabbed randomly from the zone.
 *   
 * 
 * Note that each Selection CA adds to the list of selected cards, rather than
 * overwriting it.
 *
 * ============================================================================
 * Movement Card Actions
 * ============================================================================
 *
 * Once the player performed a Selection, these Movement Card Actions will
 * take those selected Cards and do something with them.
 * 
 * Move selected to zoneName
 *     Replace 'zoneName' with a zone.
 *     This will move the selected cards from their previous zone to the
 *     specified zone.
 *     
 * Remove selected
 *     This will remove the selected cards from play.
 *     
 * Add selected to zoneName
 *     Replace 'zoneName' with a zone.
 *     This will add a copy of each selected card to the specified zone.
 *     Note that this is the only Movement Card Action that works when
 *     using the Card Action "Select from Skills" because it's the only one
 *     that does not require a zone of origin.
 *     
 *
 * ============================================================================
 * Clear Card Action
 * ============================================================================
 * Each Selection Card Action adds to the list of selected cards, and that
 * list will not be cleared until you call one of the following:
 * 
 * Clear Selected
 * Clear Selection
 * 
 * This means that, until you call Clear Selected/Selection, you can perform
 * multiple Selection CAs and one Movement CA which will act on all of them,
 * or call multiple movement CAs with only one selected card.
 * 
 *
 * ============================================================================
 * Version History
 * ============================================================================
 * 
 * v1.1.1 - Fixed crash if selecting from a pool of cards that has a length of
 *          0.
 * 
 * v1.1.0 - Added Select All Card Action
 *          Selection text will no longer appear while browsing cards normally.
 *          Updated for combatibility with CGC core v1.6.0 and Card Summons.
 *          Minor refactoring to improve Card Actions reading variables
 *          Renamed plugin
 *          Added option to not display text in the Card Selection Window
 *          Fixed crash from selecting cards too fast.
 *          
 *
 * v1.0.0 - Released plugin
 *
 */

var Myth = Myth || {};
if (!Myth.CGC)
	console.error("MYTH_CGC_ActionPack1 should be placed underneath MYTH_CGC_CoreEngine.");
Myth.CGC.AP = Myth.CGC.AP || {};
Myth.Parameters = PluginManager.parameters('MYTH_CGC_ActionPack1');

Myth.CGC.images.cardSelectedHighlight = Myth.Parameters.selectionHighlight;
Myth.CGC.showSelectionTopText = JSON.parse(Myth.Parameters.showTopText);
Myth.CGC.showSelectionBottomText = JSON.parse(Myth.Parameters.showBottomText);


Myth.CGC.AP.Window_CardSelection_initialize = Window_CardSelection.prototype.initialize;
Window_CardSelection.prototype.initialize = function (cards, direction)
{
	this._cardsSelected = [];
	this._indexesSelected = [];
	Myth.CGC.AP.Window_CardSelection_initialize.call(this, cards, direction);
}

Window_CardSelection.prototype.readySelection = function (index)
{
	var doesContain = false;
	//var selectedCards = this._cardsSelected.getCardSprites();
	var selectedCards = this._indexesSelected;
	for (var i = selectedCards.length - 1; i >= 0; i--)
	{
		if (selectedCards[i] == index)
		{
			doesContain = true;
			this._cardSprites[index]._enabledSprite.hide();
			selectedCards.splice(i, 1);
			this.contents.clear();
			this.drawAllItems();
			break;
			//this._cardSprites.getCardSprites()[index]._readyToDiscard = false;
		}
	}

	if (!doesContain && selectedCards.length < BattleManager._cardsToSelect)
	{
		selectedCards.push(index);
		this._cardSprites[index]._enabledSprite.show();
		this.contents.clear();
		this.drawAllItems();
		//this._cardSprites.getCardSprites()[index]._readyToDiscard = true;
		this.selectSelectedCards();
	}


};

Myth.CGC.AP.Window_CardSelection_createCardSprites = Window_CardSelection.prototype.createCardSprites;
Window_CardSelection.prototype.createCardSprites = function ()
{
	Myth.CGC.AP.Window_CardSelection_createCardSprites.call(this);
	for (var i = 0; i < this._cardSprites.length; i++)
	{
		var cardSprite = this._cardSprites[i];
		if (Myth.CGC.images.cardSelectedHighlight)
			cardSprite._enabledSprite.bitmap = ImageManager.loadBitmap("img/system/", Myth.CGC.images.cardSelectedHighlight);
	}
}

Window_CardSelection.prototype.selectSelectedCards = function ()
{
	//var selectedCards = this._cardsSelected.getCardSprites();
	var selectedCards = this._indexesSelected;
	if (selectedCards.length == BattleManager._cardsToSelect)
	{
		for (var i = 0; i < selectedCards.length; i++)
		{
			this._cardsSelected.push(this._cards[selectedCards[i]]);
		}
		BattleManager._cardsToSelect = 0;
		this._indexesSelected = [];
	}
};

Window_CardSelection.prototype.selectAll = function ()
{
	for (var i = 0; i < this._cards.length; i++)
	{
		this._cardsSelected.push(this._cards[i]);
	}
	BattleManager._cardsToSelect = 0;
	this._indexsSelected = [];
};

Window_CardSelection.prototype.selectedCards = function ()
{
	return this._cardsSelected;
}

Window_CardSelection.prototype.clearSelectedCards = function ()
{
	this._indexesSelected = [];
	this._cardsSelected = [];
}

Window_CardSelection.prototype.drawAllItems = function ()
{
	if (BattleManager._cardsToSelect == 0 || BattleManager._cardsToSelect == undefined) return;
	var text = "Select " + BattleManager._cardsToSelect + " cards from ";
	if (BattleManager._selectedZone == null)
		text += "the selection.";
	else
	{
		text += BattleManager._currentCardBattler.name() + "'s ";
		switch (BattleManager._selectedZone)
		{
			case "deck":
				text += "Deck.";
				break;
			case "hand":
				text += "Hand.";
				break;
			case "discard":
				text += "Discard.";
				break;
			default:
				text += BattleManager._selectedZone + ".";
				break;
		}
	}
	if (Myth.CGC.showSelectionTopText)
	this.drawText(text, 0, 0, this.contents.width, 'center');

	var bottomText = this._indexesSelected.length + " / " + BattleManager._cardsToSelect + " selected.";

	if (Myth.CGC.showSelectionBottomText)
		this.drawText(bottomText, 0, this.contents.height - this.lineHeight(), this.contents.width, 'center');
};

Window_CardSelection.prototype.giveCardToRemovedSprites = function (index)
{
	var cardSprite = this._cardSprites[index];
	var trueX = cardSprite.x + this.x;
	var trueY = cardSprite.y + this.y;
	cardSprite._enabledSprite.hide();
	cardSprite.scale = this.cardScale();

	var skillWindow = SceneManager._scene._skillWindow;
	skillWindow._removedSprites.getCardSprites().push(cardSprite);
	this._cardSprites.splice(index, 1);
	cardSprite.x = trueX;
	cardSprite.y = trueY;

	this.removeChild(cardSprite);
	SceneManager._scene.addCardSprite(cardSprite);
}

Myth.CGC.AP.Scene_Battle_onCardSelectionOk = Scene_Battle.prototype.onCardSelectionOk;
Scene_Battle.prototype.onCardSelectionOk = function ()
{
	if (BattleManager._phase != 'cardSelection')
		Myth.CGC.AP.Scene_Battle_onCardSelectionOk.call(this);

	var index = this._cardSelectionWindow.index();
	this._cardSelectionWindow.readySelection(index);
}

Myth.CGC.AP.Scene_Battle_onCardSelectionCancel = Scene_Battle.prototype.onCardSelectionCancel;
Scene_Battle.prototype.onCardSelectionCancel = function ()
{
	if (BattleManager._phase != 'cardSelection')
		Myth.CGC.AP.Scene_Battle_onCardSelectionCancel.call(this);
};

Myth.CGC.AP.Scene_Battle_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function ()
{
	if (BattleManager._phase == 'cardSelection')
		BattleManager.updateCardSelection();

	Myth.CGC.AP.Scene_Battle_updateBattleProcess.call(this);
}

Myth.CGC.AP.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function ()
{
	Myth.CGC.AP.BattleManager_startBattle.call(this);
	this._selectedZone = null;
}

BattleManager.clearSelectedCards = function ()
{
	this._selectedZone = null;
	var selectionWindow = SceneManager._scene._cardSelectionWindow;
	selectionWindow.clearSelectedCards();
}

BattleManager.requireSelection = function (amount, pool)
{
	if ($gameTroop.isAllDead())
		return;
	if (amount == 0 || pool.length == 0) return;

	this._cardsToSelect = amount || 1;
	this._cardsToSelect = Math.min(this._cardsToSelect, pool.length);
	this._previousPhase = this._phase;
	this._phase = 'cardSelection';
	var selectionWindow = SceneManager._scene._cardSelectionWindow;
	selectionWindow.setCards(pool);
	selectionWindow.show();
	selectionWindow.activate();
	selectionWindow.select(0);
	var helpWindow = SceneManager._scene._helpWindow;
	helpWindow.show();

};

BattleManager.requireSelectionByZone = function (actor, amount, zoneName, poolSize, place, type)
{
	var pool = [];
	var zone = actor.getZoneByName(zoneName.toLowerCase());
	if (zone == null) return console.error();
	this._selectedZone = zoneName.toLowerCase();
	if (poolSize == undefined)
	{
		pool = zone._data;
		if (type != undefined)
		{
			pool = pool.filter(function (card)
			{
				return DataManager.isSkillOfType(card.id(), type);
			});
		}
	}
	else
	{
		place = place.toLowerCase();
		var tempCards = new Game_Cards("temp");
		tempCards.copy(zone);
		if (place == "random")
			tempCards.shuffle();
		else if (place == "bottom")
			tempCards._data = tempCards._data.reverse();
		if (type != undefined)
		{
			tempCards._data = tempCards._data.filter(function (card)
			{
				return DataManager.isSkillOfType(card.id(), type);
			});
			tempCards.length = tempCards._data.length;
		}
		poolSize = Math.min(poolSize, tempCards.length);
		for (var i = 0; i < poolSize; i++)
		{
			pool.push(tempCards.card(i));
		}
	}



	this.requireSelection(amount, pool);
};

BattleManager.requireSelectionByArray = function (amount, skillArray)
{
	var pool = [];
	for (var i = 0; i < skillArray.length; i++)
	{
		var card = new Game_Card(skillArray[i]);
		pool.push(card);
	}

	this.requireSelection(amount, pool);
}

BattleManager.selectAllByZone = function (actor, zoneName)
{
	var zone = actor.getZoneByName(zoneName.toLowerCase());
	if (zone == null) return console.error();
	this._selectedZone = zoneName.toLowerCase();
	var pool = zone._data;
	var selectionWindow = SceneManager._scene._cardSelectionWindow;
	this._previousPhase = this._phase;
	this._phase = 'cardSelection';
	selectionWindow.setCards(pool);
	selectionWindow.selectAll();
};

BattleManager.updateCardSelection = function ()
{
	if (this._cardsToSelect <= 0)
	{
		this._phase = this._previousPhase;
		var selectionWindow = SceneManager._scene._cardSelectionWindow;
		selectionWindow.hide();
	}
	else
	{
		var selectionWindow = SceneManager._scene._cardSelectionWindow;
		selectionWindow.activate();
	}
}


Myth.CGC.AP.Game_Actor_performCardAction = Game_Battler.prototype.performCardAction;
Game_Battler.prototype.performCardAction = function (action)
{
	var originalAction = action;
	action = this.formatCardAction(action);

	if (action.match(/(?:select )(\d+)(?: from skills )((\d+? ?,? ?)+)/i))
	{
		var amount = Number(RegExp.$1);
		var array = RegExp.$2.split(/[\s,]+/);
		for (var i = 0; i < array.length; i++)
		{
			var num = Number(array[i].trim());
			if (num != NaN)
				array[i] = num;
		}
		BattleManager.requireSelectionByArray(amount, array);
	}
	else if (action.match(/(?:select )(\d+)(?: of )(\d+)(?: from )(\w+) (top|bottom|random)/i))
	{
		var amount = Number(RegExp.$1);
		var poolSize = Number(RegExp.$2)
		var zone = RegExp.$3;
		var place = RegExp.$4;

		BattleManager.requireSelectionByZone(this, amount, zone, poolSize, place);
	}
	else if (action.match(/(?:select )(\d+)(?: from )(\w+)$/i))
	{
		var amount = Number(RegExp.$1);
		var zone = RegExp.$2;

		BattleManager.requireSelectionByZone(this, amount, zone);
	}
	else if (action.match(/(?:select )(\d+)(?: type )(\w+)(?: from )(\w+)$/i))
	{
		var amount = Number(RegExp.$1);
		var type = RegExp.$2;
		var zone = RegExp.$3;

		BattleManager.requireSelectionByZone(this, amount, zone, undefined, undefined, type);
	}
	else if (action.match(/(?:select )(\d+)(?: of )(\d+)(?: type )(\w+)(?: from )(\w+) (top|bottom|random)/i))
	{
		var amount = Number(RegExp.$1);
		var poolSize = Number(RegExp.$2);
		var type = RegExp.$3;
		var zone = RegExp.$4;
		var place = RegExp.$5;

		BattleManager.requireSelectionByZone(this, amount, zone, poolSize, place, type);
	}
	else if (action.match(/(?:select all from )(\w+)/i))
	{

		var zone = RegExp.$1;
		BattleManager.selectAllByZone(this, zone);
	}
	else if (action.match(/(?:move selected to )(\w+)/i))
	{
		var newZone = RegExp.$1;
		this.moveSelectedCards(newZone);
	}
	else if (action.match(/remove selected/i))
	{
		this.removeSelectedCards();
	}
	else if (action.match(/(?:add selected to )(\w+)/i))
	{
		var selectedCards = SceneManager._scene._cardSelectionWindow.selectedCards();
		this.addCardsToZone(selectedCards, RegExp.$1);
	}
	else if (action.match(/clear (?:selected|selection)/i))
	{
		BattleManager.clearSelectedCards();
	}
	else
		Myth.CGC.AP.Game_Actor_performCardAction.call(this, originalAction);
};


Game_Battler.prototype.addCardsToZone = function (skillArray, zone)
{
	for (var i = 0; i < skillArray.length; i++)
	{
		var skillId = skillArray[i].id();
		this.addCardToZone(skillId, zone);
	}
}

Game_Battler.prototype.moveSelectedCards = function (newZone)
{
	var selectionWindow = SceneManager._scene._cardSelectionWindow;
	var cards = selectionWindow.selectedCards();
	var oldZone = BattleManager._selectedZone;
	if (oldZone == null) return;

	var startingZone = this.getZoneByName(oldZone);
	var endingZone = this.getZoneByName(newZone);
	if (startingZone.isSpecial)
	{
		return this.moveSelectedCardsSpecial(newZone);
	}

	for (var i = 0; i < cards.length; i++)
	{
		var card = cards[i];
		var index = startingZone.indexOfObject(card);
		this.moveCard(index, startingZone, endingZone);
	}
}

Game_Battler.prototype.removeSelectedCards = function ()
{
	var selectionWindow = SceneManager._scene._cardSelectionWindow;
	var skillWindow = SceneManager._scene._skillWindow;
	if (!selectionWindow) return;

	var cards = selectionWindow.selectedCards();
	var oldZone = BattleManager._selectedZone;
	if (oldZone == null) return;

	var zone = this.getZoneByName(oldZone);
	if (zone.isSpecial)
	{
		return this.removeSelectedCardsSpecial();
	}

	for (var i = cards.length - 1; i >= 0; i--)
	{
		var card = cards[i];
		var index = zone.indexOfObject(card);
		if (index == -1) continue;

		if (oldZone.toLowerCase() == "hand")
		{

			skillWindow.removeCard(index + skillWindow._itemsBeforeCards);
			//var cardSprite = this._cardSprites.getCardSprites()[index];
			//this._cardSprites.getCardSprites().splice(index, 1);
			//this._removedSprites.getCardSprites().push(cardSprite);
		}
		else
		{
			selectionWindow.giveCardToRemovedSprites(index);
			zone.splice(index, 1);
			this.removedCards++;
		}


	}

	this.updateCardVariables();
}

if (Game_Battler.prototype.removeSelectedCardsSpecial == undefined)
{
	Game_Battler.prototype.removeSelectedCardsSpecial = function ()
	{
		//to be overwritten in functions that can be placed above this
	}
}

if (Game_Battler.prototype.moveSelectedCardsSpecial == undefined)
{
	Game_Battler.prototype.moveSelectedCardsSpecial = function (newZone)
	{
		//to be overwritten in functions that can be placed above this
	}
}