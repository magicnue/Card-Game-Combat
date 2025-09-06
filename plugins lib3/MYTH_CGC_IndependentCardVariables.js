//=============================================================================
// MYTH_CGC_IndependentCardVariables
//=============================================================================
/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.1.2 Allows individual cards to contain variables to be used in damage formulas
 * @url https://mythatelier.itch.io/card-game-combat
 *
 * 
 * @param resetAfterBattle
 * @text Reset Var after battle?
 * @type boolean
 * @default false
 * @desc If set to ON, changes to a card's Var variables will be reset at the end of each battle.
 * 
 * @param preventNegativeCost
 * @text Prevent Negative Cost?
 * @type boolean
 * @default true
 * @desc If set to ON, subtracting a Var from a skill's cost will never result in a value below 0.
 * 
 * @help
 *
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin gives cards a new array of variables called Var, which can
 * be accessed through code (for damage formulas and the like) and can also
 * be used in place of numbers in other Card Actions.
 * 
 * Var can contain as many variables within it that you need. To access them
 * in card actions, use:
 *     Var(index)
 * Where index is any number. By default all variables inside Var are set to 0.
 * 
 * Below is a list of Card Actions which allow you to modify the variables
 * inside Var.
 * 
 * Note that this plugin is compatible with CGC 1.5, but some features will
 * not work - namely, the Card appearance will not change to reflect
 * description or cost changes as a result of Var values changing. 1.6.0 or
 * higher is required for these features.
 *
 * 
 * ============================================================================
 * New Card Actions & Passives
 * ============================================================================
 *
 * Card Actions: 
 * 
 *     Var(X) set Y
 * Replace X with the Var index
 * Replace Y with the value you wish the Var index to contain
 * 
 * This sets the specified Var of this card to the value supplied in Y.
 * 
 *     Var(X) mod [+/-]Y
 * Replace X with the Var index
 * Replace [+/-]Y with a positive or negative number
 * 
 * This modifies the specified Var of this cardby the value of Y. Basically 
 * it adds or subtracts Y to/from the Var.
 * 
 * 
 *     All Skill [skillID] Var(X) set Y
 *     All Skill [skillID] Var(X) mod [+/-]Y
 * 
 * These Card Actions modify the Var of all cards belonging to that actor
 * of the specified Skill ID.
 * 
 *     All Skill [skillID] Var(X) set Y in [zoneName]
 *     All Skill [skillID] Var(X) mod [+/-]Y in [zoneName]
 *     
 * These Card Actions modify the Var of all cards belonging to that actor's
 * specific zone. Replace "[zoneName]" with "Deck", "Discard" or "Hand".
 * 
 * 
 * If you have MYTH_CGC_ActionPack1 you also have access to these Card Actions:
 * 
 *     Selected Var(X) set Y
 *     Selected Var(X) mod [+/-]Y
 * 
 * These Card Actions act on all Selected cards instead of the card containing
 * the Card Actions.
 * 
 * 
 * Card Passive:
 * 
 *     Var(X) init Y
 *
 * This will set the initial value of Var(X) to the number specified in Y.
 * All values initialize at 0 by default, and this overrides that behavior for
 * this Var index of all cards belonging to this skill.
 *
 * When Var values are reset, either through the "Reset Var after battle?"
 * plugin parameter or through functions listed below, they return to their
 * initial values.
 * 
 * 
 * ============================================================================
 * Getting the Value of a Var
 * ============================================================================
 *
 * In Card Actions you can use:
 *     Var(index)
 * Where index is the number of the index you want.
 *
 * In damage formulas, use:
 *     a.cardVar(index)
 * Where index is the number of the index you want.
 *
 * Finally, in skill descriptions, you can use:
 *     \Var[n]
 * Where n is the number of the index you want.
 *
 * By default, these will all return 0 if no value was found at that index
 * of Var.
 * 
 * ============================================================================
 * Modifying Card Cost
 * ============================================================================
 * 
 * Use the following notetag:
 *     <[MP/TP/HP] cost [+/-/=] var(X)>
 *     
 * This takes the current MP/TP/HP cost and adds/subtracts/sets equal to
 * the variable of index X in Var.
 * 
 * Eg.
 * 
 *     <MP cost + var(0)>
 *     This will cause the value of Var(0) of that card to be added onto
 *     the base skill cost
 *     
 *     <TP cost - var(1)>
 *     This will make the TP cost go down as Var(1) goes up.
 *     
 *     <HP cost = var(1)>
 *     This will override the base HP cost and replace it with the value
 *     of Var(1).
 *     
 * Note that the HP cost tag will only work if you are using plugins that
 * support HP cost.
 * 
 * 
 * ============================================================================
 * Advanced / Functions
 * ============================================================================
 *
 *     actor.cardVar(index)
 * This returns the value of the Var of the currently-being-used card.
 * Useful for damage formulas.
 * 
 * 
 *     actor.modSkillVar(skillId, index, value, direction)
 * This function modifies the Var of all Cards of a given Skill ID belonging
 * to this actor.
 * direction should be -1, 0, or 1.
 * When direction is -1, value is subtracted from the var. When direction is 1,
 * value is added to the var.
 * When direction is 0, the var is set to the value.
 *
 *     actor.resetAllCardVars();
 * This function resets all Vars of all Cards belonging to the actor.
 * 
 *     actor.resetSkillVar(skillId)
 * This function resets all Vars of all Cards of a given Skill ID belonging
 * to this actor.
 * 
 *     card.getVar(index)
 * If you can get access to a specific Game Card you can use this function
 * to grab the Var from that card.
 *     
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.1.2 - Small change to one function for compatibility with Core Engine
 *          v1.6.2.
 * 
 * v1.1.1 - Simple View for the Card Library is now forced
 *        - Var values are now shown on cards in the Card Library Simple View.
 *        - Initial Var values are now shown on cards in all scenes where
 *          previously their values always shown as 0.
 * 
 * v1.1.0 - Changed plugin name
 *        - Updated for compatibility with 1.6.0
 *        - Minor refactoring to improve compatibility with other expansion
 *          plugins.
 * 
 * v1.0.3 - Fixed All Skill Card Action adding numbers like strings instead of
 *          numbers. 1 + 1 now equals 2 instead of 11.
 *          Init Var(x) and Set Var(x) can now supply a negative number.
 * 
 * v1.0.2 - Init Var(x) now a Card Passive for consistency with CGC.
 *          Cleaned up help file for improved readability.
 * 
 * v1.0.1 - Changed syntax for Card Actions that modify Var to be a bit more
 *          intuitive.
 *          Fixed Set Card Action not working properly
 *          Added <init> notetag and fixed reset function to use initial 
 *          values.
 * 
 * v1.0.0 - Finished plugin
*/

var Myth = Myth || {};
Myth.CGC = Myth.CGC || {};

Myth.CGC.ICV = {};
Myth.Parameters = PluginManager.parameters('MYTH_CGC_IndependentCardVariables');


//Force enabled simple deck view
Myth.CGC.simpleDeckView = true;

Myth.CGC.ICV.preventNegativeCost = JSON.parse(Myth.Parameters.preventNegativeCost);
Myth.CGC.ICV.resetAfterBattle = JSON.parse(Myth.Parameters.resetAfterBattle);


DataManager.getInitialVar = function (skillId, slot)
{
	var skill = $dataSkills[skillId];
	if (skill._initVar == undefined)
		return 0;
	if (skill._initVar[slot] == undefined)
		return 0;
	return skill._initVar[slot];
}

Myth.CGC.ICV.Game_Card_initialize = Game_Card.prototype.initialize;
Game_Card.prototype.initialize = function (skillId, origin)
{
	Myth.CGC.ICV.Game_Card_initialize.call(this, skillId, origin);
	this.var = [];
}

Game_Card.prototype.getVar = function (index)
{
	index = index || 0;
	if (this.var[index] == undefined || this.var[index] == null)
	{
		var skill = $dataSkills[this.id()];
		if (skill._initVar && skill._initVar[index] != undefined && skill._initVar[index] != null)
			this.var[index] = skill._initVar[index];
		else
			this.var[index] = 0;
	}
		
	return this.var[index];
}

Myth.CGC.ICV.formatCardAction = Game_Battler.prototype.formatCardAction;
Game_Battler.prototype.formatCardAction = function (action)
{
	action = Myth.CGC.ICV.formatCardAction.call(this, action);

	// first we need to check if a card action is "var(x) set" or "var(x) mod"
	// and replace that with "var x set" or "var x mod"
	// marking these as setters.
	// this way any other instance of "var(x)" will be a getter.
	action = action.replace(/var\((\d+)\) (set|mod)/ig, function ()
	{
		var setOrMod = RegExp.$2;
		return "var " + RegExp.$1 + " " + setOrMod;
	}.bind(this));

	action = action.replace(/var\((\d+)\)/ig, function ()
	{
		return this.cardVar(Number(RegExp.$1));
	}.bind(this));

	return action;
}

Myth.CGC.ICV.Game_Actor_performCardAction = Game_Battler.prototype.performCardAction;
Game_Battler.prototype.performCardAction = function (action)
{
	var originalAction = action;
	action = this.formatCardAction(action);

	//ActionPack1 compatible actions
	if (action.match(/selected var (\d+) set (-)?(\d+)/i))
	{
		var selectedCards = SceneManager._scene._cardSelectionWindow.selectedCards();
		var varIndex = Number(RegExp.$1);
		var value = Number(RegExp.$3);
		if (RegExp.$2 == "-")
			value = -value;
		this.modCardsVar(selectedCards, varIndex, value, 0);
	}
	else if (action.match(/selected var (\d+) mod (\+|-)(\d+)/i))
	{
		var selectedCards = SceneManager._scene._cardSelectionWindow.selectedCards();
		var varIndex = Number(RegExp.$1);
		var direction = RegExp.$2 == "+" ? 1 : -1;
		var value = Number(RegExp.$3);
		this.modCardsVar(selectedCards, varIndex, value, direction);
	}
	//all skill actions
	else if (action.match(/all skills? (\d+) var (\d+) set (-)?(\d+)(?: in (\w+))?/i))
	{
		var skillId = Number(RegExp.$1);
		var varIndex = Number(RegExp.$2);
		var value = Number(RegExp.$4);
		if (RegExp.$3 == "-")
			value = -value;
		var zone = RegExp.$5;
		this.modSkillVar(skillId, varIndex, value, 0, zone);
	}
	else if (action.match(/all skills? (\d+) var (\d+) mod (\+|-)(\d+)(?: in (\w+))?/i))
	{
		var skillId = Number(RegExp.$1);
		var varIndex = Number(RegExp.$2);
		var direction = RegExp.$3 == "+" ? 1 : -1;
		var value = Number(RegExp.$4);
		var zone = RegExp.$5;

		this.modSkillVar(skillId, varIndex, value, direction, zone);
	}
	//normal actions
	else if (action.match(/var (\d+) set (-)?(\d+)/i))
	{
		var varIndex = Number(RegExp.$1);
		var value = Number(RegExp.$3);
		if (RegExp.$2 == "-")
			value = -value;
		this.modCardVar(BattleManager._activeCard, varIndex, value, 0);
	}
	else if (action.match(/var (\d+) mod (\+|-)(\d+)/i))
	{
		var varIndex = Number(RegExp.$1);
		var direction = RegExp.$2 == "-" ? -1 : 1;
		var value = Number(RegExp.$3);
		this.modCardVar(BattleManager._activeCard, varIndex, value, direction);
	}
	else
	{
		Myth.CGC.ICV.Game_Actor_performCardAction.call(this, originalAction);
	}
		
};

Game_Actor.prototype.modCardVar = function (card, varIndex, value, direction)
{
	var variable = card.getVar(varIndex);
	variable += (value * direction);
	if (direction == 0)
		variable = value;
	card.var[varIndex] = variable;
};

Game_Actor.prototype.modCardsVar = function (cards, varIndex, value, direction)
{
	for (var i = 0; i < cards.length; i++)
	{
		this.modCardVar(cards[i], varIndex, value, direction);
	}
};

Game_Actor.prototype.modSkillVar = function (skillId, varIndex, value, direction, zone)
{
	var allCards = [];
	if (zone)
	{
		allCards = this.getZoneByName(zone).slice();
	}
	else
	{
		allCards = this._cardDeck.slice();
		allCards = allCards.concat(this._cardDiscard.slice());
		allCards = allCards.concat(this._cardHand.slice());
/*		allCards = this._skillCards.slice();*/
	}
	var cardsOfSkill = allCards.filter((card) => card.id() == skillId);
	this.modCardsVar(cardsOfSkill, varIndex, value, direction);
}

Game_Actor.prototype.cardVar = function (index)
{
	var card = this._currentCard || BattleManager._activeCard;
	if (!card) return 0;
	return card.getVar(index);
};

Game_Actor.prototype.resetAllCardVars = function ()
{
	var cards = this._cardDeck.slice();
	for (var i = 0; i < cards.length; i++)
	{
		this.resetCardVar(cards[i]);
	}
}

Game_Actor.prototype.resetCardVar = function (card)
{
	card.var = [];
};

Game_Actor.prototype.resetSkillVar = function (skillId)
{
	var cardsOfSkill = this._cardDeck.slice().filter((card) => card.id() == skillId);
	for (var i = 0; i < cardsOfSkill.length; i++)
	{
		this.resetCardVar(cardsOfSkill[i]);
	}
};

Game_Party.prototype.resetAllCardVars = function ()
{
	var members = this.members();
	for (var i = 0; i < members.length; i++)
	{
		members[i].resetAllCardVars();
	}
}

BattleManager._activeCard = null;

Myth.CGC.ICV.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function ()
{
	if (!$gameSystem._cardBattleEnabled)
		return Myth.CGC.BattleManager_startAction.call(this); //the original

	var win = SceneManager._scene._skillWindow;
	if (win.index() >= 0)
	{
		this._activeCard = win.getCard(win.index());
	}

	Myth.CGC.ICV.BattleManager_startAction.call(this);
};

Myth.CGC.ICV.Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function ()
{
	Myth.CGC.ICV.Game_Actor_onBattleEnd.call(this);
	if (Myth.CGC.ICV.resetAfterBattle)
		this.resetAllCardVars();
}


Window_SkillList.prototype.getCard = function (index)
{
	if (!this._actor) return null;
	var cards = [...this._actor._skillCards._data];
	cards.sort(function (a, b) { return a.id() - b.id() });
	var card = cards[index];
	return card;
}

Window_BattleSkill.prototype.getCard = function (index)
{
	if (!this._actor) return null;
	index -= this._itemsBeforeCards;
	var card = this._actor._cardHand.card(index);
	return card;
};

Window_CardSelection.prototype.getCard = function (index)
{
	return this._cards[index];
}

Myth.CGC.ICV.Window_SkillList_select = Window_SkillList.prototype.select;
Window_SkillList.prototype.select = function (index)
{
	var card = this.getCard(index);
	if (card && this._helpWindow)
	{
		this._helpWindow.setCard(card);
	}

	Myth.CGC.ICV.Window_SkillList_select.call(this, index);
}

Myth.CGC.ICV.Window_BattleSkill_select = Window_BattleSkill.prototype.select;
Window_BattleSkill.prototype.select = function (index)
{
	var card = this.getCard(index);
	if (card && this._helpWindow)
	{
		this._helpWindow.setCard(card);
	}

	Myth.CGC.ICV.Window_BattleSkill_select.call(this, index);
};

Myth.CGC.ICV.Window_CardSelection_select = Window_CardSelection.prototype.select;
Window_CardSelection.prototype.select = function (index)
{
	var card = this.getCard(index);
	if (card && this._helpWindow)
	{
		this._helpWindow.setCard(card);
	}
	Myth.CGC.ICV.Window_CardSelection_select.call(this, index);
}




Myth.CGC.ICV.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters
Window_Base.prototype.convertEscapeCharacters = function (text)
{
	text = Myth.CGC.ICV.Window_Base_convertEscapeCharacters.call(this, text);
	text = this.convertCardVarEscapeCharacters(text);

	return text;
}

Window_Base.prototype.convertCardVarEscapeCharacters = function (text)
{
	text = text.replace(/\x1bVar\[(\d+)\]/gi, function ()
	{
		var varIndex = Number(RegExp.$1);
		if (this._card)
		{
			return this._card.getVar(varIndex);
		}
		else if (this._skill)
		{
			return DataManager.getInitialVar(this._skill.id, varIndex);
		}
		else
		{
			//console.warn("text found a reference to CGC's Independent Card Variables but can't access a card in scene " + 
			//	SceneManager._scene.constructor.name);
			return "0";
		}
		
	}.bind(this));
	
	return text;
};

Sprite_SkillCard.prototype.convertCardVarEscapeCharacters = function (text)
{
	return Window_Base.prototype.convertCardVarEscapeCharacters.call(this, text);
}

Window_Help.prototype.setCard = function (card)
{
	if (card != this._card)
	{
		this._card = card;
		this.refresh();
	}
};

// Modifying Skill Cost

Myth.CGC.ICV.Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function (skill)
{
	var modifier = 0;
	var card = this._currentCard;
	if (SceneManager._scene._skillWindow && (card == undefined || card == null))
		card = SceneManager._scene._skillWindow._highlightedCard;
	if (card && skill._varCost && skill._varCost.MP)
	{
		var direction = skill._varCost.MP.direction;
		var variable = skill._varCost.MP.variable;
		var value = card.getVar(variable);
		if (direction == 0)
			return value;

		value *= direction;
		modifier = value;
	}
	var cost = Myth.CGC.ICV.Game_BattlerBase_skillMpCost.call(this, skill);
	if (Myth.CGC.ICV.preventNegativeCost && modifier + cost < 0)
		return 0;

	return modifier + cost;
}

Myth.CGC.ICV.Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function (skill)
{
	var modifier = 0;
	var card = this._currentCard;
	if (SceneManager._scene._skillWindow && (card == undefined || card == null))
		card = SceneManager._scene._skillWindow._highlightedCard;
	if (card && skill._varCost && skill._varCost.TP)
	{
		var direction = skill._varCost.TP.direction;
		var variable = skill._varCost.TP.variable;
		var value = card.getVar(variable);
		if (direction == 0)
			return value;

		if (direction != 0)
			value *= direction;
		modifier = value;
	}
	var cost = Myth.CGC.ICV.Game_BattlerBase_skillTpCost.call(this, skill);
	if (Myth.CGC.ICV.preventNegativeCost && modifier + cost < 0)
		return 0;
	return modifier + cost;
};

if (Game_BattlerBase.prototype.skillHpCost != undefined)
{
	Myth.CGC.ICV.Game_BattlerBase_skillHpCost = Game_BattlerBase.prototype.skillHpCost;
	Game_BattlerBase.prototype.skillHpCost = function (skill)
	{
		var modifier = 0;
		var card = this._currentCard;
		if (SceneManager._scene._skillWindow && (card == undefined || card == null))
			card = SceneManager._scene._skillWindow._highlightedCard;
		if (card && skill._varCost && skill._varCost.HP)
		{
			var direction = skill._varCost.HP.direction;
			var variable = skill._varCost.HP.variable;
			var value = card.getVar(variable);
			if (direction == 0)
				return value;

			value *= direction;
			modifier = value;
		}
		var cost = Myth.CGC.ICV.Game_BattlerBase_skillTpCost.call(this, skill);

		if (Myth.CGC.ICV.preventNegativeCost && modifier + cost < 0)
			return 0;
		return modifier + cost;
	}
}

Myth.CGC.ICV.Window_SkillList_isCurrentItemEnabled = Window_SkillList.prototype.isCurrentItemEnabled;
Window_SkillList.prototype.isCurrentItemEnabled = function ()
{
	this._highlightedCard = this.getCard(this.index());
	return Myth.CGC.ICV.Window_SkillList_isCurrentItemEnabled.call(this);
};


Myth.CGC.ICV.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.ICV.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_CGC_ICV)
	{
		DataManager.processCardVarCostNotetags($dataSkills);
		DataManager.processStartingVarNotetags($dataSkills);
		Myth.loaded_CGC_ICV = true;
	}

	return true;
};

DataManager.processCardVarCostNotetags = function (group)
{
	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(/<MP Cost (\+|-|=) var\((\d+)\)>/i))
			{
				var sign = RegExp.$1;
				var direction = sign == "+" ? 1 : sign == "-" ? -1 : 0;
				var variable = Number(RegExp.$2);
				if (obj._varCost == undefined)
					obj._varCost = {};

				obj._varCost.MP = {
					direction: direction,
					variable: variable
				}
			}
			else if (line.match(/<TP Cost (\+|-|=) var\((\d+)\)>/i))
			{
				var sign = RegExp.$1;
				var direction = sign == "+" ? 1 : sign == "-" ? -1 : 0;
				var variable = Number(RegExp.$2);
				if (obj._varCost == undefined)
					obj._varCost = {};

				obj._varCost.TP = {
					direction: direction,
					variable: variable
				}
			}
			else if (line.match(/<HP Cost (\+|-|=) var\((\d+)\)>/i))
			{
				var sign = RegExp.$1;
				var direction = sign == "+" ? 1 : sign == "-" ? -1 : 0;
				var variable = Number(RegExp.$2);
				if (obj._varCost == undefined)
					obj._varCost = {};

				obj._varCost.HP = {
					direction: direction,
					variable: variable
				}
			}
		}
	}
};

DataManager.processStartingVarNotetags = function (group)
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
			if (line.match(/<init var\((\d+)\):? ?(\d+)>/i))
			{
				var variableIndex = Number(RegExp.$1);
				var value = Number(RegExp.$2);
				if (obj._initVar == undefined)
					obj._initVar = [];
				obj._initVar[variableIndex] = value;
			}

			var line = notedata[i];
			if (line.match(startNote))
			{
				mode = 'passives';
				//obj._cardPassives = {};
			}
			else if (line.match(endNote))
			{
				mode = '';
			}
			else if (mode == 'passives')
			{
				if (line.match(/var\((\d+)\) init (-)?(\d+)/i))
				{
					var variableIndex = Number(RegExp.$1);
					var value = Number(RegExp.$3);
					if (RegExp.$2 == "-")
						value = -value;
					if (obj._initVar == undefined)
						obj._initVar = [];
					obj._initVar[variableIndex] = value;
				}
			}
		}
	}
}

Myth.CGC.ICV.Sprite_SkillCard_drawSkillCost = Sprite_SkillCard.prototype.drawSkillCost;
Sprite_SkillCard.prototype.drawSkillCost = function (skill, x, y, width)
{
	if (this._card)
	{
		this._actor._currentCard = this._card;
	}
	Myth.CGC.ICV.Sprite_SkillCard_drawSkillCost.call(this, skill, x, y, width);
	this._actor._currentCard = null;
};