//=============================================================================
// MYTH_CGC_ActionPack1
//=============================================================================

/*:
 * @target MZ *
 * @author Isiah Brighton
 * @plugindesc v1.0.1 An extension to Card Game Combat that adds several new Card Actions.
 * @url https://www.patreon.com/mythatelier
 *
 * 
 * @help
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin adds several new Card Actions, a small cluster of Card Passives,
 * and some extra keywords for Card Actions we're calling Modifiers.
 * 
 * 
 * ============================================================================
 * Card Actions
 * ============================================================================
 * 
 * 
 * Shuffle zoneName
 *     Replace 'zoneName' with a zone.
 *     This will shuffle the specified zone.
 *     
 * Transform X into Y
 *     Replace X with a number, and Y with a skill ID.
 *     This will make the player select X cards from their hand, and the
 *     selected cards will transform into a card with the specified Skill ID.
 *     The card will then have all of the Actions and Passives of the new
 *     Skill ID.
 *     If you're using Independent Card Variables, the transformed card will
 *     still have access to its old Var values.
 *     
 * Transform This into X
 *     Replace X with a skillID.
 *     This will transform the card currently being used into a card
 *     with the specified Skill ID.
 *     
 * Transform Selected into X
 *     Replace X with a skillID.
 *     When used in conjunction with ActionPack1, this will transform
 *     cards selected through a Select Card Action into cards with the
 *     specified Skill ID.
 *     
 * Copy X to zoneName
 *     Replace X with a number and 'zoneName' with a zone.
 *     This will make the player select X cards from their hand, and the
 *     selected cards will be copied into the specified zone.
 *     This is a duplication effect, which means unlike Add, which creates
 *     a whole new card, the new copy has all of the Var values from the
 *     original.
 *     
 * Copy Selected to zoneName
 *     Replace 'zoneName' with a zone.
 *     When used in conjunction with ActionPack1, this will copy the
 *     cards selected through a Select Card Action into the specified zone.
 *     
 * Copy This to zoneName
 *     Replace 'zoneName' with a zone.
 *     This will copy the card currently being used into the specified zone.
 *     
 * Draw X from zoneName
 *     Replace X with a number and 'zoneName' with a zone.
 *     This will take a card from the top of the specified zone and add
 *     it to the Hand. It works just like "Move X from zoneName to Hand"
 *     
 * ============================================================================
 * Card Passives
 * ============================================================================
 *
 * Prevent [cardAction]
 *     This prevents a card from being the target of a given Card Action.
 *     Ex.
 *     Prevent Discard
 *         This card cannot be selected for the Discard action
 *     Prevent Move to Discard
 *         This card cannot be moved to the discard zone through any means
 *     Prevent Move
 *         This card cannot be moved from its starting zone.
 *
 *     Specially implemented is:
 *     Prevent Perma Remove
 *         This card can be removed from play but it will return at end of
 *         battle like a normal Remove. See "Perma" Modifier for details below
 *
 *
 * Transform This into X if [expression]
 *     Replace X with a skill ID and expression with code that evaluates to
 *     true or false.
 *     This passive transforms the card into a card of the specified Skill ID 
 *     if the expression is true.
 *     The condition works just like the Require passive, but it's evaluated
 *     whenever there is a change in game state, as long as this card is in
 *     the hand.
 *
 *     Ex.
 *     Transform this into 5 if user.handSize > 7
 *         This will transform the card into a card with the Skill ID 5
 *         if the user's hand has more than 7 cards.
 *
 * 
 * ============================================================================
 * Modifiers Overview
 * ============================================================================
 * 
 * Modifiers are keywords you can add to a Card Action to change how it works.
 * If Card Actions are verbs, Modifiers are adjectives and adverbs.
 * You can add a Modifier to nearly any Card Action and its effect will be 
 * applied to that Card Action.
 * 
 * There are 3 types of Modifiers - Start, Middle, and End Modifiers.
 * Start Modifiers need to be placed at the beginning of the Card Action,
 * End Modifiers need to be placed at the end of the Card Action,
 * and Middle Modifiers should be placed somewhere in the middle.
 * 
 * They are organized this way to avoid confusing Modifiers with other
 * Modifiers or Card Actions that share similar language.
 * 
 * As an example:
 * 
 *     Discard Random 1
 * 
 * This takes a default Card Action, "Discard 1", and adds the "Random"
 * Modifier, changing its behavior. The "Random" Modifier randomly selects
 * a card instead of making the player choose.
 * 
 * A Card Action can have any number of Modifiers on it at once.
 * 
 * ============================================================================
 * Start Modifiers
 * ============================================================================
 * 
 * Perma
 *    This modifies a Card Action whose effects are undone at the end of
 *    battle to retain those effects.
 *    
 *    Ex:
 *        Perma Add 8 to Hand
 *    The Add Card Action normally adds cards only for the duration of the 
 *    battle, but with the Perma Modifier these cards remain after battle.
 *        Perma Transform This into 8
 *    Transformed cards revert at the end of battle, but with the Perma
 *    Modifier this card would remain transformed.
 *        Perma Remove Selected
 *    The Perma Modifier would remove the selected cards from the actor's
 *    library permanently.
 *    
 * Force
 *    This overrides the Prevent Card Passive, allowing the Card Action to
 *    happen even on a Card that would normally Prevent it.
 *    
 * Bypass
 *    This modifies any Card Action that makes a card enter or exit a zone
 *    such that its Enter/Exit Zone Forced Actions do not trigger.
 *
 *    Ex:
 *        Bypass Discard Until 0
 *    This would discard the player's entire hand without triggering any
 *    Enter/Exit effects that cards may otherwise possess.
 *    
 *    
 * ============================================================================
 * Middle Modifiers
 * ============================================================================
 * 
 * Overflow zoneName
 *    Replace 'zoneName' with a zone.
 *    This modifies any Card Action that targets cards from a zone. If the
 *    amount of targets exceeds the amount of cards in that zone, cards will
 *    be selected from the specified Overflow zone to make up the difference.
 *    
 *    Ex:
 *        Discard 5 Overflow Deck
 *    Discard 5 would make the player choose 5 cards to discard. Normally,
 *    if the player only has 3 cards they would automatically discard those
 *    3 and the Action would resolve. However, with "Overflow Deck" added
 *    then 2 more cards would be taken from the Deck and added to the Discard.
 *        Move 7 from Discard Overflow Hand to Deck
 *    This would return 7 cards from the Discard pile to the Deck. If the
 *    player only had 3 cards in their Discard, the player would then have
 *    4 of their cards taken from their Hand to move to the Deck.
 *        Transform 3 Overflow Deck into 8
 *    If the player had fewer than 3 cards in their Hand, the remainder
 *    would be taken from the top of the Deck to be Transformed.
 *    
 *    
 * Top
 * Middle
 * Bottom
 * Random
 *    These modify any Card Action that targets cards from a zone. When
 *    a player would normally make a manual selection, these automate
 *    the selection. When an Action would normally target the first card
 *    in a zone (like Draw) these can override that.
 *    
 *    Top makes the Action target the first card in the zone.
 *    Middle makes the Action target the median card in the zone.
 *    Bottom makes the Action target the last card in the zone.
 *    Random makes the Action target a random card in the zone.
 *    
 *    Ex:
 *        Draw Bottom 1
 *    While Draw normally draws from the top, this would instead cause
 *    the player to draw from the bottom of the Deck.
 *       Discard Random 3
 *    This selects 3 random cards in the player's hand and discards them,
 *    rather than making the player choose.
 *       Move Bottom 2 from Discard to Hand
 *    This would return the 2 most recently discarded cards to the player's
 *    hand. Note that by default the Discard displays its cards in opposite
 *    order, so what a player would intuitively know as the "top" of the
 *    Discard is actually its Bottom.
 *    
 * ============================================================================
 * End Modifiers
 * ============================================================================
 * 
 * Top
 * Middle
 * Bottom
 * Random
 *    These Modifiers do something different depending on if they are in
 *    the Middle of a Card Action or at the End.
 *    These modify any Card Action that sends cards to a specific zone.
 *    Normally, cards are moved to the bottom of a zone. These can override
 *    that.
 *    
 *    Top moves a card to be the first card in a zone.
 *    Middle moves a card to be in the middle position in a zone.
 *    Bottom does not change the behavior.
 *    Random moves the card to a random position within the zone, "shuffling"
 *    it in.
 *    
 *    Ex:
 *        Discard 1 Random
 *    This makes the player select a card from their hand, and moves
 *    the card to a random position inside the discard.
 *        Copy Selected to Deck Top
 *    This modifies the Copy Selected Card Action so that the new copies
 *    are added to the top of the deck instead of the bottom.
 *        
 * Note that because Top/Bottom/Random is a different Modifier depending
 * on where it is in the Card Action, you can use both at once.
 * 
 * Ex:
 *     Move 2 from Deck Bottom to Discard Top
 * This would take cards from the bottom of the Deck and put them at the
 * top of the Discard.
 *        
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.0.1 - Changed when transform conditions are checked to happen more often.
 *
 * v1.0.0 - Finished plugin
 */

var Myth = Myth || {};
Myth.CGC = Myth.CGC || {};
Myth.CGC.AP = Myth.CGC.AP || {};

DataManager.doesItemContainPrevent = function (item, preventName)
{
	if (item._cardPassives && item._cardPassives.preventActions)
	{
		var preventActions = item._cardPassives.preventActions;
			
		for (var i = 0; i < preventActions.length; i++)
		{
			if (preventActions[i].match(/move to (\w+)/i))
			{
				if (RegExp.$1 == preventName)
					return true;
			}
			else if (preventName == preventActions[i])
				return true;
		}
	}
	return false;
}
/**
 * @param {string} preventName
 */
Game_Card.prototype.containsPrevent = function (preventName)
{
	var dataSkill = $dataSkills[this._skillId];
	return DataManager.doesItemContainPrevent(dataSkill, preventName);
}

Game_Card.prototype.canBeMoved = function ()
{
	if (this.containsPrevent('move')) return false;
	return true;
}

Game_Card.prototype.canBeMovedTo = function (zoneName)
{
	if (this.containsPrevent('move to ' + zoneName)) return false;
	return this.canBeMoved();
}

Game_Card.prototype.canBeDiscarded = function ()
{
	if (this.containsPrevent('discard')) return false;
	return this.canBeMoved();
};

Game_Card.prototype.canBeRemoved = function ()
{
	if (this.containsPrevent('remove')) return false;
	return true;
}

Game_Card.prototype.canBeCopied = function ()
{
	if (this.containsPrevent('copy')) return false;
	return true;
}

Game_Card.prototype.canBeTransformed = function ()
{
	if (this.containsPrevent('transform')) return false;
	return true;
}

Game_Card.prototype.canBePermaRemoved = function ()
{
	if (this._origin == 'equip') return false;
	if (this.containsPrevent('perma remove')) return false;
	return true;
}

Myth.CGC.AP.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function ()
{
	Myth.CGC.AP.Game_Battler_initMembers.call(this);
	this._bypassAction = false;
	this._overflowZone = null;
	this._forgottenCards = 0;
	this._movePlacement = '';
	this._selectPlacement = '';

	this._cardTransformId = 0;
	this._copyZone = '';
}

Myth.CGC.AP.Game_Battler_formatCardAction = Game_Battler.prototype.formatCardAction;
Game_Battler.prototype.formatCardAction = function (action)
{
	action = Myth.CGC.AP.Game_Battler_formatCardAction.call(this, action);

	this._overflowZone = null;
	this._bypassAction = false;
	this._permaAction = false;
	this._movePlacement = '';
	this._selectPlacement = '';

	var startModifiers = [/^bypass /i, /^force /i, /^perma /i];
	var hasModifiers = [false, false, false];
	for (var i = 0; i < startModifiers.length; i++)
	{
		if (i == 1 && action.match(/force action/i)) continue;

		if (action.match(startModifiers[i]))
		{
			hasModifiers[i] = true;
			action = action.replace(startModifiers[i], '');
			i = -1;
		}
	}
	if (hasModifiers[0])
		this._bypassAction = true;
	if (hasModifiers[1])
		this._forceCardAction = true;
	if (hasModifiers[2])
		this._permaAction = true;

	if (action.match(/ overflow (\w+)/i))
	{
		this._overflowZone = RegExp.$1.toString();
		action = action.replace(/ overflow (\w+)/i, '');
	}
	if (action.match(/(top|middle|bottom|random)$/i)) // if it's at the end of the string it randomizes the destination
	{
		var place = RegExp.$1;
		if (!action.match(/^select/i))
		{
			this._movePlacement = place;
			action = action.replace(/(top|middle|bottom|random)$/i, '');
		}
	}
	if (action.match(/ (top|middle|bottom|random) /i)) // if it's anywhere but the beginning or end it randomizes the selection
	{
		var place = RegExp.$1;
		if (!action.match(/^select/i))
		{
			this._selectPlacement = place;
			action = action.replace(/ (top|middle|bottom|random)/i, '');
		}
	}

	return action;
}

Myth.CGC.AP.Game_Battler_performCardAction2 = Game_Battler.prototype.performCardAction;
Game_Battler.prototype.performCardAction = function (action)
{
	var originalAction = action;
	action = this.formatCardAction(action);

	if (action.match(/Transform (\d+) into (\d+)/i))
	{
		var amount = Number(RegExp.$1);
		var skillId = Number(RegExp.$2);
		this.transformCards(amount, skillId);
	}
	else if (action.match(/Transform this into (\d+)/i))
	{
		var skillId = Number(RegExp.$1);
		this.transformUsedCard(skillId);
	}
	else if (action.match(/Transform selected into (\d+)/i))
	{
		var skillId = Number(RegExp.$1);
		this.transformSelectedCards(skillId);
	}
	else if (action.match(/Shuffle (\w+)/i))
	{
		var zone = RegExp.$1;
		this.shuffleZone(zone);
	}
	else if (action.match(/Copy this to (\w+)/i))
	{
		var zone = RegExp.$1;
		this.copyCardToZone("this", zone);
	}
	else if (action.match(/Copy (\d+) to (\w+)/i))
	{
		var amount = Number(RegExp.$1);
		var zone = RegExp.$2;
		this.copyCards(amount, 'hand', zone);
	}
	else if (action.match(/Copy selected to (\w+)/i))
	{
		var zone = RegExp.$1;
		var selectedCards = SceneManager._scene._cardSelectionWindow.selectedCards();
		this.copyCardsToZone(selectedCards, zone);
	}
	else if (action.match(/Draw (\d+) from (\w+)/i))
	{
		var amount = Number(RegExp.$1);
		var zone1 = RegExp.$2;
		this.moveCards(amount, zone1, 'hand');
	}
	else
		Myth.CGC.AP.Game_Battler_performCardAction2.call(this, originalAction);
}

Myth.CGC.AP.Game_Battler_moveCard = Game_Battler.prototype.moveCard;
Game_Battler.prototype.moveCard = function (index, startingZone, endingZone, playSE)
{
	index = this.modifyCardTarget(index, startingZone, true);
	if (!this._forceCardAction)
		index = this.smoothCardMoveTarget(index, startingZone, endingZone);
	if (index == -1) return null;

	return Myth.CGC.AP.Game_Battler_moveCard.call(this, index, startingZone, endingZone, playSE);
};

Myth.CGC.AP.Game_Battler_enterCard = Game_Battler.prototype.enterCard;
Game_Battler.prototype.enterCard = function (zone, card, playSE)
{
	var card = Myth.CGC.AP.Game_Battler_enterCard.call(this, zone, card, playSE);
	this.setCardPlacement(zone, card);

	return card;
}

Game_Battler.prototype.setCardPlacement = function (zone, card)
{
	if (this._movePlacement == '') return;
	if (this._movePlacement == 'bottom') return;

	var index = zone.indexOfObject(card);
	if (index != -1)
	{
		zone.splice(index, 1);
	}


	if (this._movePlacement == 'top')
	{
		zone.insert(card, 0);
	}
	else if (this._movePlacement == 'middle')
	{
		var index = Math.floor(zone.length / 2);
		zone.insert(card, index);
	}
	else if (this._movePlacement == 'random')
	{
		var index = Math.randomInt(zone.length);
		zone.insert(card, index);
	}

	var spritegroup = SceneManager._scene._skillWindow.getSpritegroupFromName(zone.name);
	if (spritegroup == null) return;

	spritegroup.reorderCardSprites(zone, this);
}

Game_Battler.prototype.shuffleZone = function (zoneName)
{
	var cardZone = this.getZoneByName(zoneName);
	var spritegroup = SceneManager._scene._skillWindow.getSpritegroupFromName(zoneName);
	if (cardZone == null || spritegroup == null) return console.eror("Error trying to shuffle zone " + zoneName + ". Did you misspell a zone name?");

	cardZone.shuffle();
	spritegroup.reorderCardSprites(cardZone, this);
}

Game_Battler.prototype.copyCards = function (amount, zone1, zone2)
{
	var startingZone = this.getZoneByName(zone1);
	var endingZone = this.getZoneByName(zone2);


	if (this._overflowZone != null)
	{
		if (startingZone.length < amount)
		{
			var leftover = amount - startingZone.length;
			this.copyCards(startingZone.length, zone1, zone2);
			var overflowZone = this.getZoneByName(this._overflowZone);
			if (overflowZone.length > 0)
				this.transformCards(leftover, overflowZone, zone2);
			return;
		}
	}

	
	for (var i = 0; i < amount; i++)
	{
		this.copyCard(i, startingZone, endingZone);
	}
}

Game_Battler.prototype.copyCard = function (index, startingZone, endingZone, playSE)
{
	index = this.modifyCardTarget(index, startingZone, false);
	if (index == -1) return null;

	var card = startingZone.card(index);
	if (!card) return null;

	this.copyCardToZone(card, endingZone.name);
}

Game_Battler.prototype.copyCardsToZone = function (cardArray, zone)
{
	for (var i = 0; i < cardArray.length; i++)
	{
		var card = cardArray[i];
		this.copyCardToZone(card, zone);
	}
}

Game_Battler.prototype.copyCardToZone = function (card, zoneName)
{
	var cardZone = this.getZoneByName(zoneName);
	if (cardZone == null)
		return console.error("Error trying to add skill #" + skill + " to zone " + zoneName + ". Did you misspell a zone name?");

	if (card == "this")
	{
		card = SceneManager._scene._skillWindow._activeCardSprite.card();
	}

	var newCard = new Game_Card(card.id(), "copy");
	if (Myth.CGC.ICV)
	{
		if (card.var)
			newCard.var = [...card.var];
	}

	cardZone.add(newCard);
	this.updateCardVariables();

	this.setCardPlacement(cardZone, newCard);

	return newCard;
}

Game_Battler.prototype.selectRandomCardIndex = function (zone)
{
	//more efficient way to do it if we don't need to worry about Prevent Move
	if (this._forceCardAction)
		return Math.randomInt(zone.length);


	var indexArray = [];
	for (var i = 0; i < zone.length; i++)
	{
		var card = zone.card(i);
		if (!card.canBeMoved())
			continue;
		indexArray.push(i);
	}
	Myth.Util.shuffleArray(indexArray);

	return indexArray[0];
};

Game_Battler.prototype.modifyCardTarget = function (index, zone, absolute)
{
	
	if (this._selectPlacement != '' && zone.length > 0)
	{
		if (absolute)
			index = 0;

		if (this._selectPlacement == 'top')
			index = index;
		else if (this._selectPlacement == 'middle')
		{
			index = Math.floor(zone.length / 2) + index;
		}
		else if (this._selectPlacement == 'bottom')
		{
			index = zone.length - (1 + index);
		}
		else if (this._selectPlacement == 'random')
		{
			index = this.selectRandomCardIndex(startingZone);
		}
	}
	if (index == -1) return null;

	return index;
}

Game_Battler.prototype.smoothCardMoveTarget = function (index, startingZone, endingZone)
{
	var originalCard = startingZone.card(index);
	if (originalCard && originalCard.canBeMoved())
		return index;

	var offset = 1;
	while (index + offset < startingZone.length || index - offset >= 0)
	{
		if (index + offset < startingZone.length)
		{
			var card = startingZone.card(index + offset);
			if (card.canBeMovedTo(endingZone.name)) return index + offset;
		}
		if (index - offset >= 0)
		{
			var card = startingZone.card(index - offset);
			if (card.canBeMovedTo(endingZone.name)) return index - offset;
		}
		offset++;
	}
	if (index + offset >= startingZone.length && index - offset < 0)
		return -1;

	return index;
};


Game_Battler.prototype.forgetCard = function (card)
{
	var id = card.id();
	var dataSkill = $dataSkills[id];
	if (!card.canBePermaRemoved()) return;
	if (DataManager.doesItemContainPrevent(dataSkill, 'perma remove')) return;

	var index = this._deckCopy.indexOfObject(card);
	//console.trace();
	if (index > -1)
	{
		this._deckCopy.splice(index, 1);
		this.forgetSkill(id);
	}

	this._forgottenCards++;
};

Myth.CGC.Game_Battler_addCardToZone = Game_Battler.prototype.addCardToZone;
Game_Battler.prototype.addCardToZone = function (skill, zoneName)
{
	var card = Myth.CGC.Game_Battler_addCardToZone.call(this, skill, zoneName);
	if (this._permaAction)
	{
		this._skillCards.add(card);
		this._deckCopy.add(card);
		$gameParty.addCardToLibrary(card);
	}

	var zone = this.getZoneByName(zoneName);
	this.setCardPlacement(zone, card);

	return card;
}

Myth.CGC.Game_Actor_removeSelectedCards = Game_Battler.prototype.removeSelectedCards;
Game_Battler.prototype.removeSelectedCards = function ()
{
	Myth.CGC.Game_Actor_removeSelectedCards.call(this);
	if (this._permaAction)
	{
		var selectionWindow = SceneManager._scene._cardSelectionWindow;
		var cards = selectionWindow.selectedCards();
		for (var i = cards.length - 1; i >= 0; i--)
		{
			this.forgetCard(cards[i]);
		}
	}

};

Game_Battler.prototype.transformSelectedCards = function (skillId)
{
	var selectionWindow = SceneManager._scene._cardSelectionWindow;
	var cards = selectionWindow.selectedCards();
	var zoneName = BattleManager._selectedZone;
	if (zoneName == null) return;
	var zone = this.getZoneByName(zoneName);
	var spritegroup = SceneManager._scene._skillWindow.getSpritegroupFromName(zoneName);
	var cardSprites = spritegroup.getCardSprites(this);

	for (var i = 0; i < cards.length; i++)
	{
		var card = cards[i];
		var index = zone.indexOfObject(card);
		var newCard = this.transformSpecificCard(card, skillId);
		zone._data[index] = newCard;

		for (var j = 0; j < cardSprites.length; j++)
		{
			if (cardSprites[j].card() == card)
			{
				cardSprites[j].setCard(newCard);
				break;
			}
		}
	}

	
	
	//spritegroup.reorderCardSprites(zone, this);
}

Game_Battler.prototype.transformCards = function (amount, skillId, startingZone)
{
	if (startingZone == undefined)
		startingZone = this._cardHand;

	if (this._overflowZone != null)
	{
		if (startingZone.length < amount)
		{
			var leftover = amount - startingZone.length;
			this.transformCards(startingZone.length, skillId, startingZone);
			var overflowZone = this.getZoneByName(this._overflowZone);
			if (overflowZone.length > 0)
				this.transformCards(leftover, skillId, overflowZone);
			return;
		}
	}

	for (var i = 0; i < amount; i++)
	{
		this.transformCard(i, startingZone, skillId);
	}
};

Game_Battler.prototype.transformCard = function (index, zone, skillId)
{
	index = this.modifyCardTarget(index, zone, true);
	if (index == -1) return null;

	var card = zone.card(index);
	if (!card) return null;

	card = this.transformSpecificCard(card, skillId);
	zone._data[index] = card;
	return card;
}

Game_Battler.prototype.transformSpecificCard = function (card, skillId)
{
	if (this._permaAction)
	{
		card._skillId = skillId;
	}
	else
	{
		var newCard = new Game_Card(skillId, 'transformed');
		if (Myth.CGC.ICV)
		{
			newCard.var = card.var;
		}

		card = newCard;
		
	}

	return card;
}

Game_Battler.prototype.transformUsedCard = function (skillId)
{

}

Game_Actor.prototype.transformCards = function (amount, skillId, startingZone)
{
	if (startingZone == undefined)
		startingZone = this._cardHand;

	if (this._selectPlacement != '' || startingZone != this._cardHand)
	{
		Game_Battler.prototype.transformCards.call(this, amount, skillId, startingZone);
	}
	else
	{
		this._cardTransformId = skillId;
		BattleManager.requireDiscard(amount, 'transform');
	}
}

Game_Actor.prototype.transformCard = function (index, zone, skillId)
{
	var oldIndex = index;
	var previousSelectPlacement = this._selectPlacement;
	index = this.modifyCardTarget(index, zone, true);
	if (index == -1) return null;

	this._selectPlacement = '';
	var skillWindow = SceneManager._scene._skillWindow;
	
	var oldCard = zone.card(index);
	var newCard = Game_Battler.prototype.transformCard.call(this, index, zone, skillId);
	skillWindow.transformCard(zone, oldCard, newCard);

	this._selectPlacement = previousSelectPlacement;
	return newCard;
}

Game_Actor.prototype.transformUsedCard = function (skillId)
{

	var win = SceneManager._scene._skillWindow;
	if (!win._activeCardSprite) return;

	var card = win._activeCardSprite.card();
	var newCard = this.transformSpecificCard(card, skillId);

	win.transformUsedCard(newCard);

	return card;
}

Game_Actor.prototype.copyCardToZone = function (card, zoneName)
{
	var newCard = Game_Battler.prototype.copyCardToZone.call(this, card, zoneName);
	if (SceneManager._scene._skillWindow)
		SceneManager._scene._skillWindow.addCardToZone(newCard, zoneName, this);

	this.updateCardVariables();

	return newCard;
}

Game_Actor.prototype.copyCards = function (amount, zone1, zone2)
{
	var startingZone = this.getZoneByName(zone1);
	if (this._selectPlacement != '' || startingZone != this._cardHand)
	{
		Game_Battler.prototype.copyCards.call(this, amount, zone1, zone2);
	}
	else
	{
		this._copyZone = zone2;
		BattleManager.requireDiscard(amount, 'copy');
	}
}

Myth.CGC.AP.Game_Actor_moveCards = Game_Actor.prototype.moveCards;
Game_Actor.prototype.moveCards = function (amount, zone1, zone2)
{
	if (this._overflowZone != null)
	{
		var startingZone = this.getZoneByName(zone1);
		if (startingZone.length < amount)
		{
			var leftover = amount - startingZone.length;
			this.moveCards(startingZone.length, zone1, zone2);
			if (this.getZoneByName(this._overflowZone).length > 0)
				this.moveCards(leftover, this._overflowZone, zone2);
			return;
		}
	}
	if (this._selectPlacement != '')
	{
		Game_Battler.prototype.moveCards.call(this, amount, zone1, zone2);
	}
	else
		Myth.CGC.AP.Game_Actor_moveCards.call(this, amount, zone1, zone2);
}

Myth.CGC.AP.Game_Actor_performStartOfBattlePassives = Game_Actor.prototype.performStartOfBattlePassives;
Game_Actor.prototype.performStartOfBattlePassives =function ()
{
	this._forceCardAction = true;
	Myth.CGC.AP.Game_Actor_performStartOfBattlePassives.call(this);
	this._forceCardAction = false;
}

Window_BattleSkill.prototype.transformCard = function (zone, oldCard, newCard)
{
	var spritegroup = this.getSpritegroupFromName(zone.name);
	if (!spritegroup) return null;
	var cards = spritegroup.getCardSprites(this._actor);
	var success = false;

	for (var i = 0; i < cards.length; i++)
	{
		var gameCard = cards[i].card();
		if (gameCard == oldCard)
		{
			success = true;
			cards[i].transformCard(newCard);
			break;
		}
	}
	//return card;
}

Window_BattleSkill.prototype.startTransformCard = function (index, skillId)
{
	if (skillId == undefined)
		skillId = this._actor._cardTransformId;
	index -= this._itemsBeforeCards;
	this._actor.transformCard(index, this._actor._cardHand, skillId);
	this.refresh();
}

Window_BattleSkill.prototype.transformUsedCard = function (newCard)
{
	if (!this._activeCardSprite) return;
	this._activeCardSprite.transformCard(newCard);
}

Window_BattleSkill.prototype.startCopyCard = function (index, zoneName)
{
	if (zoneName == undefined)
		zoneName = this._actor._copyZone;
	var targetZone = this._actor.getZoneByName(zoneName);
	var startingZone = this._actor.getZoneByName('hand');
	index -= this._itemsBeforeCards;
	this._actor.copyCard(index, startingZone, targetZone);

}

Myth.CGC.AP.Window_BattleSkill_discardCard = Window_BattleSkill.prototype.discardCard;
Window_BattleSkill.prototype.discardCard = function (index)
{
	if (this._discardMode == 'transform' || this._discardMode == 'copy')
	{
		if (this._discardMode == 'copy')
		{
			this.startCopyCard(index);
		}
		else
		{
			this.startTransformCard(index);
		}
		this._actor.updateCardVariables();
		this.deselect();

		this.makeItemList();
		return;
	}
	
	var perma = this._discardMode == 'remove' && this._actor._permaAction == true;
	if (perma)
	{
		var handCards = this._cardSprites.getCardSprites();
		var cardSprite = handCards[index - this._itemsBeforeCards];
		if (cardSprite)
			this._actor.forgetCard(cardSprite.card());
	}
	return Myth.CGC.AP.Window_BattleSkill_discardCard.call(this, index);
};

Myth.CGC.AP.Window_BattleSkill_removeCard = Window_BattleSkill.prototype.removeCard;
Window_BattleSkill.prototype.removeCard = function (index, exitEffect)
{
	var perma = this._actor._permaAction == true;
	if (perma)
	{
		var handCards = this._cardSprites.getCardSprites();
		var cardSprite = handCards[index - this._itemsBeforeCards];
		if (cardSprite)
			this._actor.forgetCard(cardSprite.card());
	}

	Myth.CGC.AP.Window_BattleSkill_removeCard.call(this, index, exitEffect);
}

Myth.CGC.AP.Window_BattleSkill_resolveUsed = Window_BattleSkill.prototype.resolveUsedCard;
Window_BattleSkill.prototype.resolveUsedCard = function (zoneName)
{
	if (this._actor._permaAction && this._activeCardSprite)
	{
		var card = this._activeCardSprite.card();
		this._actor.forgetCard(card);
	}
	Myth.CGC.AP.Window_BattleSkill_resolveUsed.call(this, zoneName);
};

Myth.CGC.AP.Window_BattleSkill_setDiscardMode = Window_BattleSkill.prototype.setDiscardMode;
Window_BattleSkill.prototype.setDiscardMode = function (mode, type)
{
	Myth.CGC.AP.Window_BattleSkill_setDiscardMode.call(this, mode, type);
	if (this._actor._forceCardAction) return;

	var cardZone = this._cardSprites.getCardSprites();
	for (var i = 0; i < cardZone.length; i++)
	{
		var card = cardZone[i];
		if (!this.isEnabled(card._skill))
			card._discardSprite.hide();
	}

	if (this._actor._selectPlacement != '')
		this.readyRandomForDiscard();
};

Window_BattleSkill.prototype.readyRandomForDiscard = function ()
{
	var indexes = [];
	var minIndex = this._itemsBeforeCards;
	var maxIndex = this._itemsBeforeCards + this._cardSprites.getCardSprites().length;
	for (var i = minIndex; i < maxIndex; i++)
	{
		indexes.push(i);
	}
	var placement = this._actor._selectPlacement;
	if (placement == 'random')
		Myth.Util.shuffleArray(indexes);
	else if (placement == 'bottom')
	{
		indexes.reverse();
	}
	for (var i = 0; i < BattleManager._cardsToDiscard; i++)
	{
		this.readyDiscard(indexes[i]);
	}
	this.discardSelectedCards();
}

Myth.CGC.AP.Window_BattleSkill_isEnabled = Window_BattleSkill.prototype.isEnabled;
Window_BattleSkill.prototype.isEnabled = function (item)
{
	if (BattleManager._phase == 'discard' && !this._actor._forceCardAction)
	{
		if (this._discardMode == 'remove')
		{
			if (this._actor._permaAction)
			{
				if (DataManager.doesItemContainPrevent(item, 'perma remove')) return false;
			}
			else
			{
				if (DataManager.doesItemContainPrevent(item, 'remove')) return false;
			}
		}
		else if (DataManager.doesItemContainPrevent(item, 'move')) return false;
		else if (this._discardMode == 'discard')
		{
			if (DataManager.doesItemContainPrevent(item, 'discard')) return false;
		}
		
	}
	return Myth.CGC.AP.Window_BattleSkill_isEnabled.call(this, item);
}

Myth.CGC.AP.Window_BattleSkill_updateCardSpritePosition = Window_BattleSkill.prototype.updateCardSpritePosition;
Window_BattleSkill.prototype.updateCardSpritePosition = function (cardSprite, zoneData)
{
	var scale = new Point(cardSprite.scale.x, cardSprite.scale.y);
	Myth.CGC.AP.Window_BattleSkill_updateCardSpritePosition.call(this, cardSprite, zoneData);
	cardSprite.updateCardTransform(zoneData.cardScale);
};

/*Myth.CGC.AP.Window_BattleSkill_updateHandPosition = Window_BattleSkill.prototype.updateHandPosition;
Window_BattleSkill.prototype.updateHandPosition = function ()
{
	var scales = [];
	var cardZone = this._cardSprites.getCardSprites();
	for (var i = cardZone.length - 1; i >= 0; i--)
	{
		scales[i] = new Point(cardZone[i].scale.x, cardZone[i].scale.y);
	}

	Myth.CGC.AP.Window_BattleSkill_updateHandPosition.call(this);

	for (var i = cardZone.length - 1; i >= 0; i--)
	{
		var card = cardZone[i];
		var scale = scales[i];
		card.updateCardTransform(scale, 1);
	}
};*/

Myth.CGC.AP.Window_BattleSkill_updateHandCardPosition = Window_BattleSkill.prototype.updateHandCardPosition;
Window_BattleSkill.prototype.updateHandCardPosition = function (index, cardGroup)
{
	var cardSprite = cardGroup[index];
	if (cardSprite._isTransforming)
		cardSprite.updateCardTransform(1);
	else
		Myth.CGC.AP.Window_BattleSkill_updateHandCardPosition.call(this, index, cardGroup);

};

Myth.CGC.AP.Window_BattleSkill_getCardY = Window_BattleSkill.prototype.getCardY;
Window_BattleSkill.prototype.getCardY = function (index, card, cardX)
{
	var y = Myth.CGC.AP.Window_BattleSkill_getCardY.call(this, index, card, cardX);
	if (card._isTransforming)
		y -= Myth.CGC.zoneInfo.hand.selectedCardYOff * 2;

	return y;
}

Myth.CGC.AP.Window_BattleSkill_refresh = Window_BattleSkill.prototype.refresh;
Window_BattleSkill.prototype.refresh = function ()
{
	Myth.CGC.AP.Window_BattleSkill_refresh.call(this);
	this.checkTransformConditions();
};

Window_BattleSkill.prototype.checkTransformConditions = function ()
{
	var handCards = this._cardSprites.getCardSprites();
	for (var i = 0; i < handCards.length; i++)
	{
		if (handCards[i]._isTransforming) continue;

		var skill = handCards[i]._skill;
		if (skill._cardPassives && skill._cardPassives.transformConditions)
		{
			var transformConditions = skill._cardPassives.transformConditions;
			var card = handCards[i].card();
			var user = this._actor;

			for (var j = 0; j < transformConditions.length; j++)
			{
				var condition = transformConditions[j].condition;
				var meetsCondition = false;
				try
				{
					meetsCondition = eval(condition);
				}
				catch (error)
				{
					console.error(error);
					console.error("Error in MYTH_CGC_ActionPack2 Card Passive Transform This. It tried to parse an expression it didn't understand in Skill #"
						+ skill.id + " " + skill.name + ". Make sure your syntax is correct.");
				}
				if (meetsCondition)
				{
					this.startTransformCard(i + this._itemsBeforeCards, transformConditions[j].skillId);
					break;
				}
			}
		}
	}
}



Sprite_SkillCard.prototype.transformCard = function (newCard)
{
	this._newCard = newCard;
	this._isTransforming = true;
	this.setSkill($dataSkills[newCard.id()]);
}

Myth.CGC.AP.Sprite_SkillCard_isImageChanged = Sprite_SkillCard.prototype.isImageChanged;
Sprite_SkillCard.prototype.isImageChanged = function ()
{
	if (this._newCard) return false;

	return Myth.CGC.AP.Sprite_SkillCard_isImageChanged.call(this);
}

Myth.CGC.AP.Sprite_SkillCard_card = Sprite_SkillCard.prototype.card;
Sprite_SkillCard.prototype.card = function ()
{
	if (this._newCard)
		return this._newCard;
	return Myth.CGC.AP.Sprite_SkillCard_card.call(this);
};

Sprite_SkillCard.prototype.updateCardTransform = function (targetScale)
{
	if (this._isTransforming)
	{
		//fix for yscale
		if (this.scale.y != targetScale)
		{
			this.scale.y += (targetScale - this.scale.y) / 10;
		}

		var speed = 0.05;
		if (this._newCard)
		{
			this.scale.x = this.scale.x - (targetScale * speed);
			if (this.scale.x <= 0)
			{
				this.scale.x = 0;
				this.setCard(this._newCard);
				this._newCard = null;
			}
		}
		else
		{
			this.scale.x = this.scale.x + (targetScale * speed);
			if (this.scale.x >= targetScale)
			{
				this.scale.x = targetScale;
				if (this._finishedTransformingTimer == undefined)
					this._finishedTransformingTimer = 10;
				this._finishedTransformingTimer--;
				if (this._finishedTransformingTimer == 0)
				{
					this._isTransforming = false;
					this._finishedTransformingTimer = undefined;
				}
				
			}
		}

		
	}
}

BattleManager.reduceAvailableCardsByMode = function (availableCards, mode, type)
{
	var hand = this.actor()._cardHand;
	for (var i = 0; i < hand.length; i++)
	{
		var card = hand.card(i);
		if (mode == 'discard' && !card.canBeDiscarded())
		{
			availableCards--;
			continue;
		}
		else if (mode == 'remove' && !card.canBeRemoved())
		{
			availableCards--;
			continue;
		}
		else if (mode == 'copy' && !card.canBeCopied())
		{
			availableCards--;
			continue;
		}
		else if (mode == 'transform' && !card.canBeTransformed())
		{
			availableCards--;
			continue;
		}
		if (type && !DataManager.isSkillOfType(card.id(), type))
		{
			availableCards--;
			continue;
		}
	}

	return availableCards;
}

Myth.CGC.AP.BattleManager_requireDiscard = BattleManager.requireDiscard;
BattleManager.requireDiscard = function (amount, mode, type)
{
	if (!mode)
		mode = 'discard';
	amount = amount || 1;
	var actor = SceneManager._scene._skillWindow._actor;
	if (!actor._forceCardAction)
	{
		var hand = actor._cardHand;
		var availableCards = hand.length;
		availableCards = this.reduceAvailableCardsByMode(availableCards, mode, type);

		if (amount > availableCards)
		{
			SceneManager._scene._skillWindow.setDiscardMode(mode);
			SceneManager._scene._skillWindow.discardAllCards(type);
			SceneManager._scene._skillWindow.setDiscardMode('');
			return;
		}
	}
	

	Myth.CGC.AP.BattleManager_requireDiscard.call(this, amount, mode, type);
}

//Need to make an edit to the core engine here, alas.
// to get Forget if Unplayed to work
/*Myth.CGC.AP.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function ()
{
	if ()
}*/

Myth.CGC.AP.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function ()
{
	if (this._subject._permaAction)
		this._subject._permaAction = false;
	Myth.CGC.AP.BattleManager_endAction.call(this);
};

Myth.CGC.AP.BattleManager_exitZoneForcedActions = BattleManager.exitZoneForcedActions;
BattleManager.exitZoneForcedActions = function (actor, zone, skillId)
{
	if (actor._bypassAction)
		return;
	Myth.CGC.AP.BattleManager_exitZoneForcedActions.call(this, actor, zone, skillId);
};

Myth.CGC.AP.BattleManager_enterZoneForcedActions = BattleManager.enterZoneForcedActions;
BattleManager.enterZoneForcedActions = function (actor, zone, skillId)
{
	if (actor._bypassAction)
		return;
	Myth.CGC.AP.BattleManager_enterZoneForcedActions.call(this, actor, zone, skillId);
};



Myth.CGC.AP.DataManager_processCardPassiveNotetags = DataManager.processCardPassiveNotetags;
DataManager.processCardPassiveNotetags = function (group)
{
	Myth.CGC.AP.DataManager_processCardPassiveNotetags.call(this, group);
	this.processCAPNotetags(group);
}

DataManager.processCAPNotetags = function (group)
{
	var startNote = /<Card Passives?>/i;
	var endNote = /<\/Card Passives?>/i;

	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		var mode = '';
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(startNote))
			{
				mode = 'passives';
				if (!obj._cardPassives)
					obj._cardPassives = {};
			}
			else if (line.match(endNote))
			{
				mode = '';
			}
			else if (mode == 'passives')
			{
				if (line.match(/transform this into (\d+) if (.*)/i))
				{
					if (obj._cardPassives.transformConditions == undefined)
						obj._cardPassives.transformConditions = [];

					var transformCondition = {};
					transformCondition.skillId = Number(RegExp.$1);
					transformCondition.condition = RegExp.$2;
					obj._cardPassives.transformConditions.push(transformCondition);
				}
				else if (line.match(/prevent (.+)/i))
				{
					if (obj._cardPassives.preventActions == undefined)
						obj._cardPassives.preventActions = [];
					obj._cardPassives.preventActions.push(RegExp.$1.trim().toLowerCase());
				}
				else if (line.match(/perma remove if unplayed/i))
					obj._cardPassives.permaRemoveIfUnplayed = true;		
			}
		}
	}
}

Spritegroup_Cards.prototype.reorderCardSprites = function (cardZone, actor)
{
	var cardSprites = this.getCardSprites(actor);
	var newCardSprites = [];
	var gameCards = cardZone._data;
	for (var i = 0; i < gameCards.length; i++)
	{
		var gameCard = gameCards[i];
		for (var j = 0; j < cardSprites.length; j++)
		{
			var cardSprite = cardSprites[j];
			if (cardSprite.card() == gameCard)
			{
				newCardSprites[i] = cardSprite;
				continue;
			}
		}
	}

	for (var i = 0; i < newCardSprites.length; i++)
	{
		if (!newCardSprites[i]) continue;
		SceneManager._scene.removeCardSprite(newCardSprites[i]);
		SceneManager._scene.addCardSprite(newCardSprites[i]);

		cardSprites[i] = newCardSprites[i];
	}
}