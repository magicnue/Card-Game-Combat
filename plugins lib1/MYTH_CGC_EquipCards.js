//=============================================================================
// MYTH_CGC_EquipCards
//=============================================================================

/*:
 * @target MZ *
 * @author Isiah Brighton
 * @plugindesc v1.0.4 An extension to MYTH_CGC_CoreEngine that allows equipment and states to add cards to an actor's deck
 * @url https://www.patreon.com/mythatelier
 *
 *
 * @help
 *
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin allows you to use equipment and states to manipulate an actor's
 * deck.
 *
 * ============================================================================
 * Weapons/Armor/State Notetags
 * ============================================================================
 *
 * <Add Card X>
 * 
 * Replace X with a number representing the ID of the skill that the actor
 * will gain in their deck.
 * 
 * When an actor equips a weapon or armor with this tag, this skill will be
 * shuffled into their deck. When they are given a state with this tag, the 
 * skill will be added to the top of their deck.
 *
 * If an actor loses the state, or changes equipment mid-battle, the card
 * will be removed from their deck. If it's not in their deck, it will be
 * removed from their hand. If it's not in their deck, it will be removed from
 * their discard pile.
 * 
 * <Add Card [skill name]>
 * 
 * In addition to skill IDs, you can add them by name. Case sensitive.
 *
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.0.4 - Update for compatibility with DeckEditorCore v1.2.0
 * 
 * v1.0.3 - Fixed rare bug where testing a troop battle would double cards
 *          gained from equipment.
 * 
 * v1.0.2 - Updated for compatibility with CGC v1.5.1.
 *         Cards removed from unequip are now the exact same instance of card
 *         which were added from equip.

 * v1.0.1 - Fixed Help section, the notetag is now properly worded.
 *         Added adding card by skill name.
 *         Starting equipment now adds cards too.
 * 
 * v1.0.0 - Released plugin
 *
 */

var Myth = Myth || {};
Myth.CGC = Myth.CGC || {};
Myth.CGC.EQP = {};

Myth.CGC.EQP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.EQP.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_CGC_EQP)
	{

		DataManager.processCardEquipNotetags($dataWeapons);
		DataManager.processCardEquipNotetags($dataArmors);
		DataManager.processCardEquipNotetags($dataStates);

		Myth.loaded_CGC_EQP = true;
	}

	return true;
};

DataManager.processCardEquipNotetags = function (group)
{
	var addCardNote = /<add card (\d+)>/i;
	var addCardByNameNode = /<add card (.+)>/i;

	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(addCardNote))
			{
				if (!obj._cardsToAdd)
					obj._cardsToAdd = [];
				obj._cardsToAdd.push(Number(RegExp.$1));
			}
			else if (line.match(addCardByNameNode))
			{
				var name = RegExp.$1;
				var skill = Myth.Util.findSkillbyName(name);
				if (!skill)
				{
					console.error("Issue with EquipCards notetag. Trying to add skill " + name + " but no skill has this name. Is there a typo? Object:");
					console.log(obj);
					continue;
				}

				if (!obj._cardsToAdd)
					obj._cardsToAdd = [];

				obj._cardsToAdd.push(skill.id);
			}
		}
	}
};


Myth.CGC.EQP.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function (slotId, item)
{
	var oldEquip = Object.assign({}, this._equips[slotId]);
	Myth.CGC.EQP.Game_Actor_changeEquip.call(this, slotId, item);
	var newEquip = this._equips[slotId];

	if (oldEquip._itemId != newEquip._itemId)
	{
		this.removeCardsByEquipment(oldEquip);
		this.addCardsByEquipment(newEquip);
	}

	this.updateCardVariables();
}

Myth.CGC.EQP.Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function (slotId, item)
{
	var oldEquip = Object.assign({}, this._equips[slotId]);
	Myth.CGC.EQP.Game_Actor_forceChangeEquip.call(this, slotId, item);
	var newEquip = this._equips[slotId];

	if (oldEquip._itemId != newEquip._itemId)
	{
		this.removeCardsByEquipment(oldEquip);
		this.addCardsByEquipment(newEquip);
	}

	this.updateCardVariables();
};

Myth.CGC.EQP.Game_Actor_initEquips = Game_Actor.prototype.initEquips;
Game_Actor.prototype.initEquips = function (equips)
{
	Myth.CGC.EQP.Game_Actor_initEquips.call(this, equips);
	this._equipCards = [];

	this.removeAllCardsByEquipment();
	var currentEquips = this.equips();
	for (var i = 0; i < currentEquips.length; i++)
	{
		var equip = currentEquips[i];
		//console.log(this.name(), equip);
		if (equip)
			this.addCardsByEquipment(equip);
	}
}

Game_Actor.prototype.removeAllCardsByEquipment = function ()
{
	this._cardDeck.removeAllOfOrigin("equip");
	this._skillCards.removeAllOfOrigin("equip");
}

Game_Actor.prototype.addCardsByEquipment = function (equip)
{
	var item = equip._dataClass === "weapon" ? $dataWeapons[equip._itemId] : $dataArmors[equip._itemId];
	if (equip.etypeId)
	{
		item = equip;
	}
	if (!item) return;
	if (!item._cardsToAdd) return;
	//If Deck Editor's Equip Card Setting is set to Add to Current Deck at Start of Battle,
	// we don't add the cards to the library just yet.
	var toDeckOnly = (Myth.CGC.Deck && !!Myth.CGC.Deck.equipCardsSetting.match(/battle/i));
	var isInBattle = SceneManager._scene instanceof Scene_Battle;
	for (var i = 0; i < item._cardsToAdd.length; i++)
	{
		var skillId = item._cardsToAdd[i];			
		if (toDeckOnly)
		{
			this._equipCards.push(new Game_Card(skillId, "equip"));
		}
		else
		{
			this._cardDeck.push(skillId, "equip");
			this._skillCards.push(skillId, "equip");
		}
	}

	if (isInBattle)
	{
		this.shuffleDeck();
	}
}

Game_Actor.prototype.removeCardsByEquipment = function (equip)
{

	var item = equip._dataClass === "weapon" ? $dataWeapons[equip._itemId] : $dataArmors[equip._itemId];
	if (!item) return;
	if (!item._cardsToAdd) return;
	this.removeCardsByStateEquipment(item, "equip");
}

Myth.CGC.EQP.Game_Actor_initializeDeckForBattle = Game_Actor.prototype.initializeDeckForBattle;
Game_Actor.prototype.initializeDeckForBattle = function ()
{
	Myth.CGC.EQP.Game_Actor_initializeDeckForBattle.call(this);
	if (this._equipCards)
	{
		for (var i = 0; i < this._equipCards.length; i++)
		{
			this._cardDeck.add(this._equipCards[i]);
		}
	}
}


Myth.CGC.EQP.Game_Battler_addNewState = Game_Battler.prototype.addNewState;
Game_Battler.prototype.addNewState = function (stateId)
{
	var len = this._states.length;
	Myth.CGC.EQP.Game_Battler_addNewState.call(this, stateId);
	if (len == this._states.length || this._cardDeck == undefined) return;

	var state = $dataStates[stateId];
	if (!state._cardsToAdd) return;

	for (var i = 0; i < state._cardsToAdd.length; i++)
	{
		var skillId = state._cardsToAdd[i];
		this._cardDeck.push(skillId, "state");
		this._skillCards.push(skillId, "state");
	}
};

Myth.CGC.EQP.Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function (stateId)
{
	var len = this._states.length;
	Myth.CGC.EQP.Game_BattlerBase_eraseState.call(this, stateId);
	if (len == this._states.length || this._cardDeck == undefined) return;

	this.removeCardsByState(stateId);
}

Myth.CGC.EQP.Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function ()
{
	if (this._states)
	{
		for (var i = 0; i < this._states.length; i++)
		{
			this.removeCardsByState(this._states[i]);
		}
	}
	Myth.CGC.EQP.Game_BattlerBase_clearStates.call(this);
}

Game_Battler.prototype.removeCardsByState = function (stateId)
{
	var state = $dataStates[stateId];
	if (!state) return;
	if (!state._cardsToAdd) return;
	this.removeCardsByStateEquipment(state, "state");
}

Game_Battler.prototype.removeCardsByStateEquipment = function (item, origin)
{
	for (var i = 0; i < item._cardsToAdd.length; i++)
	{
		var skillId = item._cardsToAdd[i];

		if (origin == "equip" && this._equipCards)
		{
			var index = this._equipCards.map(function (card) { return card.id(); }).indexOf(skillId);
			if (index > -1)
			{
				this._equipCards.splice(index, 1);
			}
		}
		
		var index = this._skillCards.removeByEquipment(skillId, origin);
		//if (index > -1) continue;

		card = this._cardDeck.removeByEquipment(skillId, origin);
		if (card > -1) continue;

		card = this._cardHand.removeByEquipment(skillId, origin);
		if (card > -1)
		{
			var win = SceneManager._scene._skillWindow;
			if (win._actor == this)
				win.removeCard(index + win._itemsBeforeCards, false);
			continue;
		}

		card = this._cardDiscard.removeByEquipment(skillId, origin);
	}

	this.updateCardVariables();
};


Game_Cards.prototype.removeByEquipment = function (skillId, origin)
{
/*	var index = this._data.findIndex((card) =>
	{
		var valid = card.id() == skillId && card.origin() == origin;
		if (valid)
		{
			//console.log(card.id(), skillId);
			//console.log(card.origin(), origin);
		}
		return valid;
	});*/
	var index = this.indexOf(skillId, origin);
	if (index == -1 || index == null) return -1;

	var card = this.splice(index, 1);

	return index;
}

Game_Cards.prototype.removeAllOfOrigin = function (origin)
{
	for (var i = this.length - 1; i >= 0; i--)
	{
		var card = this.card(i);
		if (card.origin() == origin)
		{
			this.splice(i, 1);
		}
	}
}
