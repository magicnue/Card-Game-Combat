//=============================================================================
// MYTH_CGC_Fusion
//=============================================================================

/*:
 * @target MZ *
 * @author Isiah Brighton
 * @plugindesc v1.0.0 An extension to Card Game Combat that adds the ability to automatically fuse cards
 * @url https://www.patreon.com/mythatelier
 *
 * 
 * @param fusionZone
 * @text Fusion Temp Zone
 * @type struct<TempZone>
 * @desc Where cards go to while they are being fused. Not a real zone. Works just like the Temp Zone in CoreEngine.
 * @default {"coordinates":"{\"x\":\"664\",\"y\":\"380\"}","cardScale":"0.5000","skew":"{\"x\":\"0.0000\",\"y\":\"0.0000\"}","cardRotation":"15"}
 *
 * 
 * @help
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * This plugin will allow you to create a system where Cards can be fused
 * together automatically into new cards as long as they're all in the same
 * zone.
 * 
 * Whenever a zone's contents are changed, the game will check if it contains
 * cards that can be fused, and if so it will fuse them. Cards that will be
 * fused together will go to the Fusion Zone, a temporary zone like the
 * Temp Zone in the CoreEngine. The Fusion Zone can be configured through plugin
 * parameters. Once the cards arrive at the Fusion Zone, they will be replaced 
 * with the newly fused card which will then return to the zone of origin.
 * 
 * Card Fusion will take priority over Card Action execution, pausing the
 * active CA list until the fusion resolves. Similarly, the player cannot
 * make inputs until the fusion is done.
 * 
 * ============================================================================
 * Card Passive
 * ============================================================================
 * 
 * Place the following inside the Card Passives of the Skill you want cards to
 * be fused into - the result of the fusion.
 * 
 * [zoneName] Fusion Recipe: X, Y, Z, A, B...
 *     Replace [zoneName] with the name of a Zone
 *     Replace X, Y, etc with skill IDs.
 *     When the specified zone contains cards of the specified IDs, a Card
 *     Fusion will take place that removes those cards from the zone and
 *     replaces them with this card.
 *     
 *     Ex:
 *         Hand Fusion Recipe: 4, 4, 4
 *     The above will make the game check if the Hand contains 3 copies of
 *     a card with the skill ID 4, and if it does those three cards will be
 *     fused into the card that contains this Card Passive.
 *         Discard Fusion Recipe: 5, 7, 9, 10, 11
 *     The above will require that 5 different, specific cards are in the
 *     Discard, and if they are, they will fuse into the card that contains
 *     this Card Passive.
 *     
 * Note that a Card can have any number of Fusion Recipes, in any number
 * of zones, including Extra Zones.
 *         
 *         
 * ============================================================================
 * Yu-Gi-Oh style Polymerization
 * ============================================================================
 * 
 * Yu-Gi-Oh has a card which the player can use to select cards to fuse
 * together. This mechanic can be recreated through clever use of the
 * CoreEngine's extra zones parameters.
 * 
 * First, add an extra zone called Polymer. Then, have a Card with the following 
 * Card Actions:
 * 
 * Move 2 from Hand to Polymer
 * Move All from Polymer to Hand
 * 
 * This card will make the player select 2 cards to potentially fuse. If they
 * can't fuse, they will return to the hand immediately. However, if they
 * match IDs in any skill's Card Passive saying:
 *     Polymer Fusion Recipe: X, Y
 * They will fuse before the Move All Card Action executes. Then the
 * Move All CA will execute, moving the newly fused card into the hand.
 *     
 *     
 */

/*~struct~TempZone:
 *
 * @param coordinates
 * @text Zone Coordinates
 * @type struct<Coordinate>
 * @desc Where on screen the card will move to while waiting to resolve
 *
 * @param cardScale
 * @text Card Scale
 * @type number
 * @decimals 4
 * @desc The scale cards will become as they move to this zone.
 * @default 0.5
 *
 * @param skew
 * @text Skew
 * @type struct<Point>
 * @desc Use this to simulate isometric 3D rotation
 * @default {"x":"0.0000","y":"0.0000"}
 *
 *
 * @param cardRotation
 * @text Card Rotation
 * @type number
 * @min -360
 * @desc The rotation cards will have when they arrive at this zone.
 * @default 0
 */

var Myth = Myth || {};
Myth.CGC = Myth.CGC || {};
Myth.CGC.Fusion = Myth.CGC.Fusion || {};

Myth.Parameters = PluginManager.parameters('MYTH_CGC_Fusion');

Myth.CGC.zoneInfo.fusionZone = JSON.parse(Myth.Parameters.fusionZone);
Myth.Util.castMembersToNumber(Myth.CGC.zoneInfo.fusionZone);
//Myth.CGC.zoneInfo.fusionZone = JSON.parse(JSON.stringify(Myth.CGC.zoneInfo.tempZone));

Myth.CGC.Fusion.getZoneDataByName = Myth.Util.getZoneDataByName;
Myth.Util.getZoneDataByName = function (name)
{
	if (name == "$fusion")
		return Myth.CGC.zoneInfo.fusionZone;
	return Myth.CGC.Fusion.getZoneDataByName.call(this, name);
}

Myth.CGC.Fusion.Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function (x, y, width, height)
{
	Myth.CGC.Fusion.Window_BattleSkill_initialize.call(this, x, y, width, height);
	this._cardFusionExt = {id: -1};
	this._fuseCardToAdd = null;
	this._fuseZoneToPush = "";
}

Myth.CGC.Fusion.Window_BattleSkill_initializeSpritegroups = Window_BattleSkill.prototype.initializeSpritegroups;
Window_BattleSkill.prototype.initializeSpritegroups = function ()
{
	Myth.CGC.Fusion.Window_BattleSkill_initializeSpritegroups.call(this);

	var actors = $gameParty.allMembers().slice(0, $gameParty.maxBattleMembers());
	this._fusedCardSprites = new Spritegroup_Cards(actors);
}

Myth.CGC.Fusion.Window_BattleSkill_addActorToZones = Window_BattleSkill.prototype.addActorToZones;
Window_BattleSkill.prototype.addActorToZones = function (actor)
{
	Myth.CGC.Fusion.Window_BattleSkill_addActorToZones.call(this, actor);
	this._fusedCardSprites.pushActor(actor);
}

Myth.CGC.Fusion.BattleManager_updateCardWait = BattleManager.updateCardWait;
BattleManager.updateCardWait = function ()
{
	Myth.CGC.Fusion.BattleManager_updateCardWait.call(this);
	if (this._cardWaitFrames <= 0)
	{
		var skillWindow = SceneManager._scene._skillWindow;
		if (skillWindow._cardFusionExt.id > -1)
		{
			skillWindow._actor.fuseCards(skillWindow._cardFusionExt);
			skillWindow._cardFusionExt = { id: -1 };
		}
	}
}

Myth.CGC.Fusion.Window_BattleSkill_makeItemList = Window_BattleSkill.prototype.makeItemList;
Window_BattleSkill.prototype.makeItemList = function ()
{
	Myth.CGC.Fusion.Window_BattleSkill_makeItemList.call(this);
	
	if (this._cardFusionExt.id == -1 && this._fuseCardToAdd == null)
	{
		//console.log("checking");
		this.checkFusionConditons();
	}
}

Myth.CGC.Fusion.Window_BattleSkill_isOpenAndActive = Window_BattleSkill.prototype.isOpenAndActive;
Window_BattleSkill.prototype.isOpenAndActive =function ()
{
	if (this._cardFusionExt.id > -1 || this._fuseCardToAdd != null)
		return false;
	return Myth.CGC.Fusion.Window_BattleSkill_isOpenAndActive.call(this);
}

Myth.CGC.Fusion.Window_BattleSkill_resetCards = Window_BattleSkill.prototype.resetCards;
Window_BattleSkill.prototype.resetCards = function ()
{
	var actor = this._actor;
	this._fusedCardSprites.setActor(actor);

	Myth.CGC.Fusion.Window_BattleSkill_resetCards.call(this);
}

Window_BattleSkill.prototype.checkFusionConditons = function ()
{
	var fusionExt = this._actor.checkAllFusionConditions();
	if (fusionExt.id > -1)
	{
		BattleManager.requireWait(30);
		this._cardFusionExt = fusionExt;
	}
}

Window_BattleSkill.prototype.fuseCardSprites = function (gameCards, newCard)
{
	var spritegroup = this.getSpritegroupFromName(this._cardFusionExt.zone);
	var cardSprites = spritegroup.getCardSprites();

	var dataStartingZone = Myth.Util.getZoneDataByName(this._cardFusionExt.zone);
	for (var i = 0; i < gameCards.length; i++)
	{
		var index = spritegroup.getIndexOfCard(gameCards[i]);
		var sprite = cardSprites[index];
		if (sprite)
		{
			sprite._enabledSprite.hide();
			sprite._discardSprite.hide();
			cardSprites.splice(index, 1);
		}
		else
		{
			sprite = new Sprite_SkillCard(gameCards[i], this._actor);
			SceneManager._scene.addCardSprite(sprite);
			sprite.x = dataStartingZone.coordinates.x; sprite.y = dataStartingZone.coordinates.y;
			sprite.scale.x = dataStartingZone.cardScale; sprite.scale.y = dataStartingZone.cardScale;
			sprite.rotation = dataStartingZone.cardRotation * Math.PI / 180;
		}

		var fusedSprites = this._fusedCardSprites.getCardSprites();
		fusedSprites.push(sprite);
	}

	this._fuseCardToAdd = newCard;
	this._fuseZoneToPush = this._cardFusionExt.zone;
	BattleManager.requireWait(1);

	SoundManager.playFuseCard();
}

Myth.CGC.Fusion.Window_BattleSkill_update = Window_BattleSkill.prototype.update;
Window_BattleSkill.prototype.update = function ()
{
	Myth.CGC.Fusion.Window_BattleSkill_update.call(this);
	if ($gameSystem._cardBattleEnabled)
	{
		var finished = this.updateFusedCardPosition();
		if (!finished)
		{
			BattleManager.requireWait(1);
		}
	}
}

Window_BattleSkill.prototype.updateFusedCardPosition = function ()
{
	var zoneData = Myth.CGC.zoneInfo.fusionZone;
	this.updateSpritegroupPosition(this._fusedCardSprites, zoneData);

	var cardSprites = this._fusedCardSprites.getCardSprites();
	if (cardSprites == -1 || cardSprites.length == 0)
		return true;

	//set Blend
	for (var i = cardSprites.length - 1; i >= 0; i--)
	{
		var cardSprite = cardSprites[i];
		if (cardSprite._blendAlpha == undefined)
			cardSprite._blendAlpha = 0;
		cardSprite._blendAlpha += 5;
		cardSprite.setBlendColor([255, 255, 255, cardSprite._blendAlpha]);
	}

	var targetAngle = zoneData.cardRotation * Math.PI / 180;
	for (var i = cardSprites.length - 1; i >= 0; i--)
	{
		var cardSprite = cardSprites[i];
		if (Math.round(cardSprite.x) != zoneData.coordinates.x || Math.round(cardSprite.y) != zoneData.coordinates.y)
			return false;
		if (Math.round(Math.round(cardSprite.rotation) != Math.round(targetAngle)))
		{
			return false;
		}
			
		if (Math.round(cardSprite.scale.x * 100) != Math.round(zoneData.cardScale * 100))
			return false;
	}

	for (var i = cardSprites.length - 1; i >= 0; i--)
	{
		SceneManager._scene.removeCardSprite(cardSprites[i]);
		cardSprites.splice(i, 1);
	}

	this.addFusedCardToZone(this._fuseCardToAdd, this._fuseZoneToPush, this._actor);
	//console.log("added");
	this._fuseCardToAdd = null;
	this._fuseZoneToPush = "";

	SoundManager.playAddFusedCard();
	this.makeItemList();

	return true;
}

Window_BattleSkill.prototype.addFusedCardToZone = function (card, zoneName, actor)
{
	if (zoneName == undefined)
		zoneName = "hand";
	if (actor == undefined)
		actor = this._actor;

	var startingZone = { name: "$fusion" };
	var endingZone = actor.getZoneByName(zoneName);
	this.moveCardSprite(card, -1, startingZone, endingZone, actor);
}

Myth.CGC.Window_BattleSkill_getSpritegroupFromName = Window_BattleSkill.prototype.getSpritegroupFromName;
Window_BattleSkill.prototype.getSpritegroupFromName = function (name)
{
	var _name = name.trim().toLowerCase();
	if (_name == "$fusion")
		return this._fusedCardSprites;
	return Myth.CGC.Window_BattleSkill_getSpritegroupFromName.call(this, name);
}

Game_Actor.prototype.checkAllFusionConditions = function ()
{
	var fusionExt = this.checkFusionConditons('hand');
	if (fusionExt.id == -1)
		fusionExt = this.checkFusionConditons('deck');
	if (fusionExt.id == -1)
		fusionExt = this.checkFusionConditons('discard');

	if (fusionExt.id == -1 && this._extraZones)
	{
		for (var i = 0; i < this._extraZones.length; i++)
		{
			fusionExt = this.checkFusionConditons(this._extraZones[i].name);
			if (fusionExt.id != -1) break;
		}
	}

	return fusionExt;
}

Game_Actor.prototype.checkFusionConditons = function (zoneName)
{
	//console.log(zoneName);
	var fusionSkills = $dataSkills.filter(function (skill)
	{
		return skill && skill._cardFusionRecipes != undefined && skill._cardFusionRecipes[zoneName] != undefined;
	});
	var zoneIds = this.getZoneByName(zoneName).getSkillIds();
	//console.log(zoneIds);
	var fusionId = -1;
	var fusionIndex = -1;
	for (var i = 0; i < fusionSkills.length; i++)
	{
		var recipes = fusionSkills[i]._cardFusionRecipes[zoneName];
		for (var j = 0; j < recipes.length; j++)
		{
			var recipe = recipes[j];
			var contains = zoneIds.containsAllWithDuplicates(recipe);
			if (contains)
			{
				fusionId = fusionSkills[i].id;
				fusionIndex = j;
				break;
			}
		}
		if (fusionId != -1) break;
	}

	var fusionExt = {
		id: fusionId,
		index: fusionIndex,
		zone: zoneName
	};
	return fusionExt;
}

Game_Actor.prototype.fuseCards = function (fusionExt)
{

	var recipe = [...$dataSkills[fusionExt.id]._cardFusionRecipes[fusionExt.zone][fusionExt.index]];
	var recipeLength = recipe.length;
	var zone = this.getZoneByName(fusionExt.zone);
	var ingredients = [];
	for (var i = 0; i < zone.length; i++)
	{
		var card = zone.card(i);
		if (ingredients.includes(card)) continue;
		var index = recipe.indexOf(card.id());
		if (index > -1)
		{
			ingredients.push(card);
			recipe.splice(index, 1);
		}
		if (recipe.length == 0) break;
	}

	//somehow doesn't have all ingredients
	if (ingredients.length != recipeLength)
		return;

	var newCard = new Game_Card(fusionExt.id, "fusion");
	SceneManager._scene._skillWindow.fuseCardSprites(ingredients, newCard);

	for (var i = 0; i < ingredients.length; i++)
	{
		var index = zone.indexOfObject(ingredients[i]);
		zone.splice(index, 1);
	}
	zone.add(newCard);
}

Game_Cards.prototype.getSkillIds = function ()
{
	var ids = [];
	for (var i = 0; i < this._data.length; i++)
	{
		ids.push(this._data[i].id());
	}

	return ids;
}

Array.prototype.containsAllWithDuplicates = function (arr)
{
	var biggerArray = [...this].sort();
	var arrayToContain = [...arr].sort();

	var i = 0; var j = 0;
	for (; i < arrayToContain.length; i++)
	{
		var x = arrayToContain[i];
		var containsThis = false;
		for (; j < biggerArray.length; j++)
		{
			var y = biggerArray[j];
			if (y == x)
			{
				containsThis = true;
				j++;
				break;
			}
			//else if (y > x)
			//	return false;
		}
		if (!containsThis) return false;
	}

	return true;
}

Spritegroup_Cards.prototype.getSpriteFromCard = function (card, actor)
{
	var cardSprites = this.getCardSprites(actor);
	var cardSprite = cardSprites.find((sprite) => sprite.card() == card);
	return cardSprite;
}

Spritegroup_Cards.prototype.getIndexOfCard = function (card, actor)
{
	var cardSprite = this.getSpriteFromCard(card, actor);
	var cardSprites = this.getCardSprites(actor);
	return cardSprites.indexOf(cardSprite);
}


SoundManager.playFuseCard = function ()
{
	var seName = Myth.CGC.addCardSFX;
	if (seName)
	{
		var se = {
			name: seName,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
}

SoundManager.playAddFusedCard = function ()
{
	this.__ignoreZoneMoveSound = true;
	var seName = Myth.CGC.addCardSFX;
	if (seName)
	{
		var se = {
			name: seName,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
}


Myth.CGC.Fusion.processCardPassiveNotetags = DataManager.processCardPassiveNotetags;
DataManager.processCardPassiveNotetags = function (group)
{
	Myth.CGC.Fusion.processCardPassiveNotetags.call(this, group);
	this.processCardFusionNotetags(group);
}

DataManager.processCardFusionNotetags = function (group)
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
				if (line.match(/(\w+) fusion recipe:?((?:,?\s+\d+)+)/i))
				{
					if (obj._cardFusionRecipes == undefined)
						obj._cardFusionRecipes = {};
					var zone = RegExp.$1.toLowerCase();
					if (obj._cardFusionRecipes[zone] == undefined)
						obj._cardFusionRecipes[zone] = [];

					var numbersString = RegExp.$2.trim();
					numbersString = numbersString.replace(/,/g, '');
					var numbers = numbersString.split(' ');
					Myth.Util.castMembersToNumber(numbers);
					
					obj._cardFusionRecipes[zone].push(numbers);
					//console.log(obj._cardFusionRecipes);
				}
			}
		}
	}
}