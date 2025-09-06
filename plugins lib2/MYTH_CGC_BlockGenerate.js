//=============================================================================
// MYTH_CGC_BlockGenerate
//=============================================================================
/*:
* @target MZ
* @author Swarnava Banerjee (Neel)
* @plugindesc v1.2.0 Build Block on an Actor in the style of Slay the Spire
* @url https://mythatelier.itch.io/card-game-combat
*
* ============================================================================
* Parameters
* ============================================================================
*
* @param Block State Settings
*
* @param blockStateID
* @parent Block State Settings 
* @type number
* @text Block State ID
* @desc Set this to the ID of the Block State in your Database.
* @min 1
* @default 2
*
* @param blockedTypes
* @parent Block State Settings 
* @text Blocked Elements
* @desc Elements this State will Block (separated by commas), rest will bypass it.
* @type string
* @default 1
*
* @param defaultInitBlock
* @parent Block State Settings 
* @type number
* @text Default Initial Block
* @desc Default Initial Block value for all Battlers at Battle Start.
* @default 0
*
* @param defaultMaxBlock
* @parent Block State Settings 
* @type number
* @text Default Max Block
* @desc Default Max Block value for all Battlers at Battle Start. Set to -1 to have no Max.
* @default -1
*
* @param blockIconOffActor
* @parent Block State Settings
* @text Actor Offset
* @type struct<Coordinate>
* @default {"x":"0","y":"0"}
* @desc X and Y Offsets for the Block Icon relative to its base position at the Actor.
*
* @param blockIconOffEnemy
* @parent Block State Settings
* @text Enemy Offset
* @type struct<Coordinate>
* @default {"x":"0","y":"0"}
* @desc X and Y Offsets for the Block Icon relative to its base position at the Enemy.
*
* @param blockIconFont
* @parent Block State Settings
* @text Font Face
* @desc Font Face for the Block Icon
* @type string
* @default GameFont
*
* @param blockFontSize
* @parent Block State Settings
* @text Font Size
* @desc Font Size for the Block Icon
* @type number
* @default 18
*
* @param blockText
* @parent Block State Settings
* @text Block State Message
* @type string
* @default "BLOCK! %1 blocked %2 damage!"
* @desc Battle Log Text Popup when the Block State Holds. %1 - Target, %2 - Damage
*
* @param breakText
* @parent Block State Settings
* @text Break State Message
* @type string
* @default "BREAK! %1 took %2 damage!"
* @desc Battle Log Text Popup when the Block State Breaks. %1- Target, %2 - Damage
*
* @param Health State Settings
*
* @param healthStateID
* @parent Health State Settings
* @type number
* @text Health State ID
* @desc Set this to the ID of your Health State in your Database. If 0, does not show.
* @min 0
*
* @param healthIconOffActor
* @parent Health State Settings
* @text Actor Offset
* @type struct<Coordinate>
* @default {"x":"0","y":"0"}
* @desc X and Y Offsets for the Health Icon relative to its base position at the Actor.
*
* @param healthIconOffEnemy
* @parent Health State Settings
* @text Enemy Offset
* @type struct<Coordinate>
* @default {"x":"0","y":"0"}
* @desc X and Y Offsets for the Health Icon relative to its base position at the Enemy.
*
* @param healthIconFont
* @parent Health State Settings
* @text Font Face
* @desc Font Face for the Health Icon
* @type string
* @default GameFont
*
* @param healthFontSize
* @parent Health State Settings
* @text Font Size
* @desc Font Size for the Health Icon
* @type number
* @default 18
*
* @help
*
* ============================================================================
* Overview
* ============================================================================
* Block Generate is a utility plugin which simulates Block in the style of
* deckbuilders like Slay the Spire. Block is a defensive resource that can be
* accumulated by playing cards or having certain items equipped. When damage
* is dealt to the Actor, Block is deducted first before Health.
*
* This plugin has you select one State as the Block State which is automatically
* applied to an Actor or Enemy when they have any amount of Block. It includes
* Notetags and Script Calls (see below) for determining how this Block is gained
* and lost from different sources.
*
*
* ============================================================================
* Card Actions
* ============================================================================
*
* Add Block [+/-]X
*     Adds X Block to the targets of the Card. X can be a negative or positive 
*     whole number.
*
* Set Block X
*     Sets the Block value of targets of the Card to X. X must be a positive 
*     whole number or 0. If X is greater than the Max Block of the target, the
*     value is clamped to the Max Block.
*
* Clear Block
*     Clears all Block from targets of the Card.
*
* ============================================================================
* Notetags
* ============================================================================
*
* For Actors and Enemies:
*
*   <Init Block: X>
*
* Sets initial Block value this Actor/Enemy will have at the start of a battle.
*
*   <Max Block: X>
*
* Sets maximum Block value this Actor/Enemy can have at any one time.
*
*    <Hide Block>
*
* Hide Block Icon with the current BLK of Battler on their Sprite and Windows.
*
*    <Hide Health>
*
* Hide Health Icon with text of current HP of Battler on their Sprite and Windows.
*
* For Skills and Items:
*
*    <Ignore Block>
*
* Damage Formula of these Skills/Items will ignore target's Block and deal
* their damage directly to HP instead. Useful for "piercing" type Skills.
*
* For Weapons and Armors:
*
*   <Mod Init Block: +x>
*
* Modifies an Actor's Initial Block amount by adding a positive/negative number.
* Can stack from multiple sources (like different pieces of equipment).
*
*   <Mod Max Block: +x>
*
* Modifies an Actor's Max Block amount by adding a positive/negative number.
* Can stack from multiple sources (like different pieces of equipment).
*
* For States:
*
*    <Block Change: +X>
*
* Determines how much an Actor with the State will gain/lose Block at the end
* of their turn (during the Regenerate Step). Can stack from multiple sources.
* If there is both Block Gain and Block Loss from multiple States, the values 
* are summed together and applied as a single instance of generation e.g. if 
* State A gains 20 BLOCK each turn and State B loses 40 Block each turn, then 
* an Actor with both State A and B loses 20 Block (+20 - 40 = -20) each turn
*
*    <Negate Block>
*
* When a State with this Notetag is applied to an actor, they will lose all 
* Block and be unable to gain Block until it elapses or is removed.
*
* ============================================================================
* Script Calls
* ============================================================================
*
* For Actors and Enemies:
*
*   {battler}.getBlock()
*
* Returns the Battler's current Block value.
*
*   {battler}.setBlock(value, show)
*
* Sets the Battler's Block to value. Show can be true/false depending on whether 
* you want a Damage Popup and Battle Log message to show the change.
*
*   {battler}.addBlock(value, show)
*
* Adds to the Battler's Block. Value can be either positive or negative. If it
* goes over the Battler's Max or under 0, the value is automatically clamped.
* Show can be true/false depending on whether you want a Damage Popup and 
* Battle Log message to show the change.
*
*   {battler}.clearBlock(show)
*
* Clears the Battler's Block setting it to 0 and removing the Block State.
*
* Usage Examples:
*
* $gameParty.leader().getBlock();
*
* $gameTroop.members()[1].clearBlock();
*
* ============================================================================
* Version History
* ============================================================================
*
* v1.2.0  - Fixed issue with Normal Attack damage type ignoring Block
*         - <Ignore Block> is working again and unaffected by Damage Types
*         - Added new Card Actions for Add Block, Set Block and Clear Block
*         - Fixed bug where Block carried over rounds despite showing it cleared
*
*
* v1.1.0 - Added in Health Icon in case users want to show both Health and 
*          Block on a Battler. Has a Notetags if you want to hide it.
*        - Block and Health values are written to Icons on Actor & Party Windows
*          Can set different Fonts for Block and Health Icon text.
*        - Exposed the text for State Messages for Block and Break. Now can 
*          be customized. Has differences between MV and MZ.
*        - Added support for Elements. You can now choose which Damage Types
*          the Block State reduces vs which ones are ignored.
*        - Different Icon Offsets can be declared for Actors and Enemies
*
* v1.0.0 - Base Functionality complete! Will probably come back around and do
*          some minor edits once I am done testing this with CGC Demo Project.
*
*
* =============================================================================
* Contact Information
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

/*~struct~BlockState:
* @param stateId
* @text State ID
* @type number
* @desc State ID of the Block State.
* @min 1
*
* @param blockedTypes
* @text Blocked Elements
* @desc List of Elements this State will Block (seperated by commas), rest will bypass.
* @type string
* @default "1"
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
Myth.Util = Myth.Util || {};
Myth.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");
Myth.Util.spritePrototype = Myth.Util.usingMZ ? Sprite_Clickable : Sprite_Base;

Myth.BLK = Myth.BLK || {};

Myth.Parameters = PluginManager.parameters('Myth_CGC_BlockGenerate');

Myth.BLK._blockStateID = Number(Myth.Parameters.blockStateID);
Myth.BLK._healthStateID = Number(Myth.Parameters.healthStateID);

Myth.BLK._blockedTypes = String(Myth.Parameters.blockedTypes).split('"').join('').split(",").map(Number);
Myth.BLK._blockedTypes.push(-1);    //exception for Normal Attack damage type, which for whatever reason is -1

Myth.BLK._blockText = String(Myth.Parameters.blockText).split('"').join('');
Myth.BLK._breakText = String(Myth.Parameters.breakText).split('"').join('');

Myth.BLK._defaultInitBlock = Number(Myth.Parameters.defaultInitBlock);
if(Myth.BLK._defaultInitBlock < 0) Myth.BLK._defaultInitBlock = 0;

Myth.BLK._defaultMaxBlock = Number(Myth.Parameters.defaultMaxBlock);
if(Myth.BLK._defaultMaxBlock < 0) Myth.BLK._defaultMaxBlock = 9999999999;

Myth.BLK.blockIconFont = String(Myth.Parameters.blockIconFont);
Myth.BLK.blockFontSize = Number(Myth.Parameters.blockFontSize);

Myth.BLK._blockIconOffset = {
    actor_x: Number(JSON.parse(Myth.Parameters.blockIconOffActor).x),
    actor_y: Number(JSON.parse(Myth.Parameters.blockIconOffActor).y),
    enemy_x: Number(JSON.parse(Myth.Parameters.blockIconOffEnemy).x),
    enemy_y: Number(JSON.parse(Myth.Parameters.blockIconOffEnemy).y)
}

Myth.BLK.healthIconFont = String(Myth.Parameters.healthIconFont);
Myth.BLK.healthFontSize = Number(Myth.Parameters.healthFontSize);

Myth.BLK._healthIconOffset = {
    actor_x: Number(JSON.parse(Myth.Parameters.healthIconOffActor).x),
    actor_y: Number(JSON.parse(Myth.Parameters.healthIconOffActor).y),
    enemy_x: Number(JSON.parse(Myth.Parameters.healthIconOffEnemy).x),
    enemy_y: Number(JSON.parse(Myth.Parameters.healthIconOffEnemy).y)
}

Myth.BLK._negateStateIds = [];

Myth.Util.clamp = function(value, min, max)
{
    return Math.min(Math.max(value, min), max);
}

//=============================================================================
// Game_Battler
//=============================================================================

Myth.BLK._GameBattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function()
{
	Myth.BLK._GameBattler_initMembers.call(this);
	this._blockCount = 0;
    this._initBlock = Myth.BLK._defaultInitBlock || 0;
    this._maxBlock = Myth.BLK._defaultMaxBlock || 100;
    this._lastBlocked = 0;
}

Myth.BLK._GameBattler_rengerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
	Myth.BLK._GameBattler_rengerateAll.call(this);

	if(this.isAlive())
	{
		const blockChangeList = [];

		this.states().forEach(function(state){
			if($dataStates[state.id]._blockChanges)
			{
				var bList = $dataStates[state.id]._blockChanges;
                for(var i = 0; i < bList.length; ++i)
				{
					blockChangeList.push(bList[i]);
				}
			}
		}, this);

        this.addBlock(blockChangeList.reduce((total, curr) => total + curr, 0), false);
	}
};

Game_Battler.prototype.equipsInitMods = function()
{
    if(this.isActor())
    {
        for(var i = 0; i < this._equips.length; ++i)
        {
            if(this._equips[i]._dataClass == "weapon" && this._equips[i]._itemId != 0)
            {
                this._initBlock += $dataWeapons[this._equips[i]._itemId]._initMods.reduce((total, curr) => total + curr, 0);                
            }
            else if(this._equips[i]._dataClass == "armor" && this._equips[i]._itemId != 0)
            {
                this._initBlock += $dataArmors[this._equips[i]._itemId]._initMods.reduce((total, curr) => total + curr, 0);
            }
        }
    }
}

Game_Battler.prototype.equipsMaxMods = function()
{
    if(this.isActor())
    {
        for(var i = 0; i < this._equips.length; ++i)
        {
            if(this._equips[i]._dataClass == "weapon" && this._equips[i]._itemId != 0)
            {
                this._maxBlock += $dataWeapons[this._equips[i]._itemId]._maxMods.reduce((total, curr) => total + curr, 0);
            }
            else if(this._equips[i]._dataClass == "armor" && this._equips[i]._itemId != 0)
            {
                this._maxBlock += $dataArmors[this._equips[i]._itemId]._maxMods.reduce((total, curr) => total + curr, 0);
            }
        }
    }
}

Game_Battler.prototype.getBlock = function()
{
    return this._blockCount;
}

Game_Battler.prototype.setBlock = function(value, show)
{
    var negateSkip = false;
    Myth.BLK._negateStateIds.forEach((id) =>{ if(this._states.includes(id)) negateSkip = true;})
    if(negateSkip) return;

    if(!this.isStateAffected(Myth.BLK._blockStateID))
    {
        this._lastBlocked = value;
        this.addState(Myth.BLK._blockStateID);
    }

    this._blockCount = Myth.Util.clamp(value, 0, this._maxBlock);
    if(show) this.startBlockPopup(value);

    if(Myth.Util.usingMZ)
    {
        if(SceneManager._scene._statusWindow) SceneManager._scene._statusWindow.refresh();
        if(SceneManager._scene._partyStatusWindow) SceneManager._scene._partyStatusWindow.refresh();
        if(SceneManager._scene._actorWindow) SceneManager._scene._actorWindow.refresh();
    }
}

Game_Battler.prototype.addBlock = function(value, showMsg)
{
    if(value == 0) return;

    var negateSkip = false;
    Myth.BLK._negateStateIds.forEach((id) =>{ if(this._states.includes(id)) negateSkip = true;})
    if(negateSkip) return;

    if(!this.isStateAffected(Myth.BLK._blockStateID) && value > 0)
    {
        this._lastBlocked = value;
        this.addState(Myth.BLK._blockStateID);
    }

    this._lastBlocked = value;
    this._blockCount = Myth.Util.clamp(this._blockCount + value, 0, this._maxBlock);
    if(this._blockCount <= 0) this.clearBlock();

    this.startBlockPopup(value);
    if(showMsg) this.startBlockLogMsg(value);

    if(Myth.Util.usingMZ)
    {
        if(SceneManager._scene._statusWindow) SceneManager._scene._statusWindow.refresh();
        if(SceneManager._scene._partyStatusWindow) SceneManager._scene._partyStatusWindow.refresh();
        if(SceneManager._scene._actorWindow) SceneManager._scene._actorWindow.refresh();
    }
}

Game_Battler.prototype.clearBlock = function(show)
{
    if(show) this.startBlockPopup(this._blockCount);

    this._blockCount = 0;
    this._lastBlocked = 0;
    if (this.isStateAffected(Myth.BLK._blockStateID)) this.removeState(Myth.BLK._blockStateID);

    if(Myth.Util.usingMZ)
    {
        if(SceneManager._scene._statusWindow) SceneManager._scene._statusWindow.refresh();
        if(SceneManager._scene._partyStatusWindow) SceneManager._scene._partyStatusWindow.refresh();
        if(SceneManager._scene._actorWindow) SceneManager._scene._actorWindow.refresh();
    }
}

Game_Battler.prototype.startBlockPopup = function(value)
{
    var blockPop = new Sprite_Damage();

    if(Utils.RPGMAKER_NAME == "MZ")
    {
        blockPop._colorType = 2;
        blockPop.createDigits(value);
    }
    else
    {
        blockPop.createDigits(2, value);
    }

    var spriteArray = (this.isActor()) ? BattleManager._spriteset._actorSprites : BattleManager._spriteset._enemySprites;
    var battlerSprite = spriteArray.filter(obj => {return obj._battler === this}).shift();

    if(battlerSprite && this.isSpriteVisible())
    {
        battlerSprite._damages.push(blockPop);
        blockPop.x = battlerSprite.x + battlerSprite.damageOffsetX();
        blockPop.y = battlerSprite.y + battlerSprite.damageOffsetY() - (battlerSprite._damages[0].isPlaying() ? 32 : 0);
        battlerSprite.parent.addChild(blockPop);
    }
}

Game_Battler.prototype.startBlockLogMsg = function(value)
{
    var battleLog = SceneManager._scene._logWindow;

    if(battleLog)
    {
        battleLog.push('popBaseLine');
        battleLog.push('pushBaseLine');

        if(value > 0)
        {
            battleLog.push('addText', BattleManager._subject.name() + " gains " + String(value) + " Block!");
        }
        else if(value < 0)
        {
            battleLog.push('addText', BattleManager._subject.name() + " loses " + String(value) + " Block!");
        }
            
        battleLog.push('waitForEffect');
    }
}

Myth.BLK._GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    if(this.isStateAddable(stateId))
    {
       if(Myth.BLK._negateStateIds.includes(stateId)) this.clearBlock();
    }
    Myth.BLK._GameBattler_addState.call(this, stateId);
};

Myth.BLK._GameBattler_removeState = Game_Battler.prototype.removeState;

Game_Battler.prototype.removeState = function (stateId) {
    Myth.BLK._GameBattler_removeState.call(this, stateId);
    if (stateId == Myth.BLK._blockStateID) this.clearBlock();
}

//=============================================================================
// BattleManager
//=============================================================================

Myth.BLK._BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    Myth.BLK._BattleManager_startBattle.call(this);

    $gameParty.battleMembers().forEach((actor) => 
    { 
        if($dataActors[actor._actorId]._maxBlock)
        {
            actor._maxBlock = $dataActors[actor._actorId]._maxBlock;
        }
        else
        {
            actor._maxBlock = Myth.BLK.defaultMaxBlock || 100;
        }

        actor.equipsMaxMods();

        if($dataActors[actor._actorId]._initBlock)
        {
            actor._initBlock = $dataActors[actor._actorId]._initBlock;
        }
        else
        {
            actor._initBlock = Myth.BLK.defaultInitBlock || 0;
        }

        actor._hideHealth = ($dataActors[actor._actorId]._hideHealth) ?  true: false;
        actor._hideBlock = ($dataActors[actor._actorId]._hideBlock) ? true : false;

        actor.equipsInitMods();

        actor.setBlock(actor._initBlock);
        if(!$dataActors[actor._actorId]._hideHealth) actor.addState(Myth.BLK._healthStateID);
    });

    $gameTroop.members().forEach((enemy) =>
    {
        if($dataEnemies[enemy._enemyId]._maxBlock)  enemy._maxBlock = $dataEnemies[enemy._enemyId]._maxBlock;
        if($dataEnemies[enemy._enemyId]._initBlock) enemy.setBlock($dataEnemies[enemy._enemyId]._initBlock);

        enemy._hideHealth = ($dataEnemies[enemy._enemyId]._hideHealth) ? true : false;
        enemy._hideBlock = ($dataEnemies[enemy._enemyId]._hideBlock) ? true : false;
        if(!$dataEnemies[enemy._enemyId]._hideHealth) enemy.addState(Myth.BLK._healthStateID);
    });

};

//=============================================================================
// Sprite_HealthIcon
//=============================================================================

function Sprite_HealthIcon(){
    this.initialize.apply(this, arguments);
}

Sprite_HealthIcon.prototype = Object.create(Sprite_StateIcon.prototype);
Sprite_HealthIcon.prototype.constructor = Sprite_HealthIcon;

Sprite_HealthIcon.prototype.initMembers = function()
{
    Sprite_StateIcon.prototype.initMembers.call(this);
    this._blockReadout = new Sprite();
    this.addChild(this._blockReadout);

    this._origX = this.x;
    this._origY = this.y;

    this._blockReadout.anchor.x = 0.5;
    this._blockReadout.anchor.y = 0.5;
    this._blockReadout.bitmap = (Utils.RPGMAKER_NAME == "MZ") ? new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight) : new Bitmap(Window_Base._iconWidth, Window_Base._iconHeight);
    this._blockReadout.bitmap.fontSize = 18;
    this._blockReadout.bitmap._fontFace = Myth.BLK.healthIconFont;
}

Sprite_HealthIcon.prototype.update = function()
{
    Sprite.prototype.update.call(this);

    this.updateIcon();
    this.updateFrame();
}

Sprite_HealthIcon.prototype.updateIcon = function()
{
    var contents = this._blockReadout.bitmap;
    contents.clear();

    if(this._battler && this._battler.isAlive() && this._battler.isStateAffected(Myth.BLK._healthStateID))
    {
        if(this._battler._hideHealth) return;

        this.x = this._origX + (this._battler.isActor() ? Myth.BLK._healthIconOffset.actor_x : Myth.BLK._healthIconOffset.enemy_x);
        this.y = this._origY + (this._battler.isActor() ? Myth.BLK._healthIconOffset.actor_y : Myth.BLK._healthIconOffset.enemy_y);

        if(this._battler.isStateAffected(Myth.BLK._blockStateID))
        {
             this.x -= (Utils.RPGMAKER_NAME == "MZ") ? ImageManager.iconWidth : Window_Base._iconWidth;
        }

        this._iconIndex = $dataStates[Myth.BLK._healthStateID].iconIndex;
        contents.drawText(String(this._battler.hp), 0, 0, (Utils.RPGMAKER_NAME == "MZ") ? ImageManager.iconWidth : Window_Base._iconWidth, 
        (Utils.RPGMAKER_NAME == "MZ") ? ImageManager.iconHeight : Window_Base._iconHeight, 'center');
    }
    else
    {
        this._iconIndex = 0;
    }
}

Myth.BLK._HealthStateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
Sprite_StateIcon.prototype.updateIcon = function()
{
    Myth.BLK._HealthStateIcon_updateIcon.call(this);
    //this may cause issues if two states reuse the same icon
    if(this._battler.isStateAffected(Myth.BLK._healthStateID) && this._iconIndex == $dataStates[Myth.BLK._healthStateID].iconIndex) this._iconIndex = 0;
}

//=============================================================================
// Sprite_BlockIcon
//=============================================================================

function Sprite_BlockIcon(){
    this.initialize.apply(this, arguments);
}

Sprite_BlockIcon.prototype = Object.create(Sprite_StateIcon.prototype);
Sprite_BlockIcon.prototype.constructor = Sprite_BlockIcon;

Sprite_BlockIcon.prototype.initMembers = function()
{
    Sprite_StateIcon.prototype.initMembers.call(this);
    this._blockReadout = new Sprite();
    this.addChild(this._blockReadout);

    this._origX = this.x;
    this._origY = this.y;

    this._blockReadout.anchor.x = 0.5;
    this._blockReadout.anchor.y = 0.5;

    this._blockReadout.bitmap = (Utils.RPGMAKER_NAME == "MZ") ? new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight) : new Bitmap(Window_Base._iconWidth, Window_Base._iconHeight);
    this._blockReadout.bitmap.fontSize = 18;
    this._blockReadout.bitmap._fontFace = Myth.BLK.blockIconFont;
}

Sprite_BlockIcon.prototype.update = function()
{
    Sprite.prototype.update.call(this);

    this.updateIcon();
    this.updateFrame();
}

Sprite_BlockIcon.prototype.updateIcon = function()
{
    var contents = this._blockReadout.bitmap;
    contents.clear();

    if(this._battler && this._battler.isAlive() && this._battler.isStateAffected(Myth.BLK._blockStateID))
    {
        if(this._battler._hideBlock) return;

        this.x = this._origX + (this._battler.isActor() ? Myth.BLK._blockIconOffset.actor_x : Myth.BLK._blockIconOffset.enemy_x);
        this.y = this._origY + (this._battler.isActor() ? Myth.BLK._blockIconOffset.actor_y : Myth.BLK._blockIconOffset.enemy_y);

        if(this._battler.isStateAffected(Myth.BLK._healthStateID))
        {
             this.x += (Utils.RPGMAKER_NAME == "MZ") ? ImageManager.iconWidth : Window_Base._iconWidth;
        }

        this._iconIndex = $dataStates[Myth.BLK._blockStateID].iconIndex;
        contents.drawText(String(this._battler.getBlock()), 0, 0, (Utils.RPGMAKER_NAME == "MZ") ? ImageManager.iconWidth : Window_Base._iconWidth, 
        (Utils.RPGMAKER_NAME == "MZ") ? ImageManager.iconHeight : Window_Base._iconHeight, 'center');
    }
    else
    {
        this._iconIndex = 0;
    }
}

Myth.BLK._BlockStateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
Sprite_StateIcon.prototype.updateIcon = function()
{
    Myth.BLK._BlockStateIcon_updateIcon.call(this);
    //this may cause issues if two states reuse the same icon
    if(this._battler.isStateAffected(Myth.BLK._blockStateID) && this._iconIndex == $dataStates[Myth.BLK._blockStateID].iconIndex) this._iconIndex = 0;
}

//=============================================================================
// Sprite_Battler
//=============================================================================

Myth.BLK._SpriteActor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    Myth.BLK._SpriteActor_initMembers.call(this);
    if($dataSystem.optSideView) this.createBlockIconSprite();
    if($dataSystem.optSideView) this.createHealthIconSprite();
};

Myth.BLK._SpriteEnemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    Myth.BLK._SpriteEnemy_initMembers.call(this);    
    this.createBlockIconSprite();
    this.createHealthIconSprite();
};

Sprite_Battler.prototype.createBlockIconSprite = function() {
    this._blockIconSprite = new Sprite_BlockIcon();
    this.addChild(this._blockIconSprite);
};

Sprite_Battler.prototype.createHealthIconSprite = function(){
    this._healthIconSprite = new Sprite_HealthIcon();
    this.addChild(this._healthIconSprite);
}

Myth.BLK._SpriteBattler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Myth.BLK._SpriteBattler_setBattler.call(this, battler);
    if(this._blockIconSprite) this._blockIconSprite.setup(battler);
    if(this._healthIconSprite) this._healthIconSprite.setup(battler);
};

//=============================================================================
// Game_Action
//=============================================================================

Myth.BLK._GameAction_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value)
{
    var skipBlock = false;

    skipBlock = !(Myth.BLK._blockedTypes.includes(this.item().damage.elementId));

    if(this._item._dataClass == "skill")
    {
        if($dataSkills[this._item._itemId]._ignoreBlock)    skipBlock = true;
    }

    if(this._item._dataClass == "item")
    {
        if($dataItems[this._item._itemId]._ignoreBlock)     skipBlock = true;
    }

	if(this.isHpEffect() && value > 0 && target.isStateAffected(Myth.BLK._blockStateID) && !skipBlock)
	{
		if(target._blockCount > value)
		{
            target.startBlockPopup(value);
			target._blockCount -= value;
            target._lastBlocked = value;
			value = 0;
		}
		else if(target._blockCount <= value)
		{
            target.startBlockPopup(target._blockCount);
			value -= target._blockCount;
            target._lastBlocked = target._blockCount;
			target._blockCount = 0;
            target.clearBlock();
		}
	}

    if(Myth.Util.usingMZ)
    {
        if(SceneManager._scene._statusWindow) SceneManager._scene._statusWindow.refresh();
        if(SceneManager._scene._partyStatusWindow) SceneManager._scene._partyStatusWindow.refresh();
        if(SceneManager._scene._actorWindow) SceneManager._scene._actorWindow.refresh();
    }

	Myth.BLK._GameAction_executeDamage.call(this, target, value);
}

Myth.BLK._GameAction_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect)
{
    if(Myth.BLK._negateStateIds.includes(effect.dataId)) target.clearBlock();
    Myth.BLK._GameAction_itemEffectAddState.call(this, target, effect);
}

//=============================================================================
// Window_BattleActor
//=============================================================================

if(Myth.CGC.PartyUI)
{

Myth.BLK._Window_BattleActor_drawActorIcons = Window_BattleActor.prototype.drawActorIcons;
Window_BattleActor.prototype.drawActorIcons = function(actor, x, y, width) {

    var iconArray = actor.allIcons();
    var iconWidth = (Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth);
    var iconHeight = (Myth.Util.usingMZ ? ImageManager.iconHeight : Window_Base._iconHeight);

    if(actor.isStateAffected(Myth.BLK._blockStateID) && actor._hideBlock) 
        iconArray = iconArray.filter((item) => { return item != $dataStates[Myth.BLK._blockStateID].iconIndex; })

    if(actor.isStateAffected(Myth.BLK._healthStateID) && actor._hideHealth) 
        iconArray = iconArray.filter((item) => { return item != $dataStates[Myth.BLK._healthStateID].iconIndex; })

    var icons = iconArray.slice(0, Math.floor(width / iconWidth));

    for (var i = 0; i < icons.length; i++)
    {
        this.drawIcon(icons[i], x + (iconWidth * i), y + 2);
        this.contents.fontSize = 18;

        if(icons[i] == $dataStates[Myth.BLK._blockStateID].iconIndex && actor.isStateAffected(Myth.BLK._blockStateID))
        {
            this.contents.fontFace = Myth.BLK.blockIconFont;
            this.drawText(String(actor.getBlock()), x + (iconWidth * i) + ((3 - String(actor.getBlock()).length) * 4) + 2, 
            y + 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
        }

        if(icons[i] == $dataStates[Myth.BLK._healthStateID].iconIndex && actor.isStateAffected(Myth.BLK._healthStateID))
        {
            this.contents.fontFace = Myth.BLK.healthIconFont;
            this.drawText(String(actor.hp), x + (iconWidth * i) + ((3 - String(actor.hp).length) * 4) + 2, 
            y + 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
        }
    }
};

//=============================================================================
// Window_PartyStatus
//=============================================================================

Myth.BLK._Window_PartyStatus_drawActorIcons = Window_PartyStatus.prototype.drawActorIcons;
Window_PartyStatus.prototype.drawActorIcons = function(actor, x, y, width) {

    var iconArray = actor.allIcons();
    var iconWidth = (Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth);
    var iconHeight = (Myth.Util.usingMZ ? ImageManager.iconHeight : Window_Base._iconHeight);

    if(actor.isStateAffected(Myth.BLK._blockStateID) && actor._hideBlock) 
        iconArray = iconArray.filter((item) => { return item != $dataStates[Myth.BLK._blockStateID].iconIndex; })

    if(actor.isStateAffected(Myth.BLK._healthStateID) && actor._hideHealth) 
        iconArray = iconArray.filter((item) => { return item != $dataStates[Myth.BLK._healthStateID].iconIndex; })

    var icons = iconArray.slice(0, Math.floor(width / iconWidth));

    for (var i = 0; i < icons.length; i++)
    {
        this.drawIcon(icons[i], x + (iconWidth * i), y + 2);

        if(icons[i] == $dataStates[Myth.BLK._blockStateID].iconIndex && actor.isStateAffected(Myth.BLK._blockStateID))
        {
            this.contents.fontFace = Myth.BLK.blockIconFont;
            this.contents.fontSize = Myth.BLK.blockFontSize;
            this.drawText(String(actor.getBlock()), x + (iconWidth * i) + ((3 - String(actor.getBlock()).length) * 4) + 2, 
            y + 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
        }

        if(icons[i] == $dataStates[Myth.BLK._healthStateID].iconIndex && actor.isStateAffected(Myth.BLK._healthStateID))
        {
            this.contents.fontFace = Myth.BLK.healthIconFont;
            this.contents.fontSize = Myth.BLK.healthFontSize;
            this.drawText(String(actor.hp), x + (iconWidth * i) + ((3 - String(actor.hp).length) * 4) + 2, 
            y + 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
        }
    }
};

if (Myth.Util.usingMZ)
{
    Myth.BLK.Window_PartyStatus_drawItemStatus = Window_PartyStatus.prototype.drawItemStatus;
    Window_PartyStatus.prototype.drawItemStatus = function (index)
    {
        Myth.BLK.Window_PartyStatus_drawItemStatus.call(this, index);
        
        const actor = this.actor(index);
		const rect = this.itemRectWithPadding(index);
        var iconWidth = ImageManager.iconWidth;
        var iconHeight = ImageManager.iconHeight;
        var offset = 1;

        if(actor.isStateAffected(Myth.BLK._blockStateID))
        {
            this.contents.fontFace = Myth.BLK.blockIconFont;
            this.contents.fontSize = Myth.BLK.blockFontSize;
            this.drawIcon($dataStates[Myth.BLK._blockStateID].iconIndex, this.stateIconX(rect) - 9 + iconWidth * offset, this.stateIconY(rect) - (iconHeight * 0.5) - 2);
            this.drawText(String(actor.getBlock()), this.stateIconX(rect) + (iconWidth * offset) + ((3 - String(actor.getBlock()).length) * 4) - 6, this.stateIconY(rect) - (iconHeight * 0.5) - 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
            offset++;
        }

        if(actor.isStateAffected(Myth.BLK._healthStateID))
        {
            this.contents.fontFace = Myth.BLK.healthIconFont;
            this.contents.fontSize = Myth.BLK.healthFontSize;
            this.drawIcon($dataStates[Myth.BLK._healthStateID].iconIndex, this.stateIconX(rect) - 9 + iconWidth * offset, this.stateIconY(rect) - (iconHeight * 0.5) - 2);
            this.drawText(String(actor.hp), this.stateIconX(rect) + (iconWidth * offset) + ((3 - String(actor.hp).length) * 4) - 6, this.stateIconY(rect) - (iconHeight * 0.5) - 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
            offset++;
        }
    }

    Window_PartyStatus.prototype.placeBasicGauges = function (actor, x, y)
	{
		var gaugeWidth = ($dataSystem.optDisplayTp) ? this.width * 0.15 : this.width * 0.2;
        var iconOffset = (ImageManager.iconWidth * 2) - 10;

		this.placeGauge(actor, "hp", x + iconOffset, y);
		this.placeGauge(actor, "mp", x + iconOffset + gaugeWidth + 2, y);
		if ($dataSystem.optDisplayTp) {
			this.placeGauge(actor, "tp", x + iconOffset + gaugeWidth * 2 + 2, y);
		}
	};
}

//=============================================================================
// Window_ActorStatus
//=============================================================================

Myth.BLK._Window_ActorStatus_drawActorIcons = Window_ActorStatus.prototype.drawActorIcons;
Window_ActorStatus.prototype.drawActorIcons = function(actor, x, y, width) {

    var iconArray = actor.allIcons();
    var iconWidth = (Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth);
    var iconHeight = (Myth.Util.usingMZ ? ImageManager.iconHeight : Window_Base._iconHeight);

    if(actor.isStateAffected(Myth.BLK._blockStateID) && actor._hideBlock) 
        iconArray = iconArray.filter((item) => { return item != $dataStates[Myth.BLK._blockStateID].iconIndex; })

    if(actor.isStateAffected(Myth.BLK._healthStateID) && actor._hideHealth) 
        iconArray = iconArray.filter((item) => { return item != $dataStates[Myth.BLK._healthStateID].iconIndex; })

    var icons = iconArray.slice(0, Math.floor(width / iconWidth));

    for (var i = 0; i < icons.length; i++)
    {
        this.drawIcon(icons[i], x + (iconWidth * i), y + 2);

        if(icons[i] == $dataStates[Myth.BLK._blockStateID].iconIndex && actor.isStateAffected(Myth.BLK._blockStateID))
        {
            this.contents.fontFace = Myth.BLK.blockIconFont;
            this.contents.fontSize = Myth.BLK.blockFontSize;
            this.drawText(String(actor.getBlock()), x + (iconWidth * i) + ((3 - String(actor.getBlock()).length) * 4) + 2, y, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
        }

        if(icons[i] == $dataStates[Myth.BLK._healthStateID].iconIndex && actor.isStateAffected(Myth.BLK._healthStateID))
        {
            this.contents.fontFace = Myth.BLK.healthIconFont;
            this.contents.fontSize = Myth.BLK.healthFontSize;
            this.drawText(String(actor.hp), x + (iconWidth * i) + ((3 - String(actor.hp).length) * 4) + 2, y, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
        }
    }
};

if (Myth.Util.usingMZ)
{
    Myth.BLK.Window_ActorStatus_drawItemStatus = Window_ActorStatus.prototype.drawItemStatus;
    Window_ActorStatus.prototype.drawItemStatus = function (index)
    {
        Myth.BLK.Window_ActorStatus_drawItemStatus.call(this, index);
        
        const actor = this.actor(index);
		const rect = this.itemRectWithPadding(index);
        var iconWidth = ImageManager.iconWidth;
        var iconHeight = ImageManager.iconHeight;
        var offset = 1;

        if(actor.isStateAffected(Myth.BLK._blockStateID))
        {
            this.contents.fontFace = Myth.BLK.blockIconFont;
            this.contents.fontSize = Myth.BLK.blockFontSize;
            this.drawIcon($dataStates[Myth.BLK._blockStateID].iconIndex, (this.nameX(rect) + 88) + iconWidth * offset, this.stateIconY(rect) + this.lineHeight() * ($dataSystem.optDisplayTp ? 1.2 : 0.5) - 2);
            this.drawText(String(actor.getBlock()), (this.nameX(rect) + 88) + (iconWidth * offset) + ((3 - String(actor.getBlock()).length) * 4) + 2, this.stateIconY(rect) + this.lineHeight() * ($dataSystem.optDisplayTp ? 1.2 : 0.5) - 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
            offset++;
        }

        if(actor.isStateAffected(Myth.BLK._healthStateID))
        {
            this.contents.fontFace = Myth.BLK.healthIconFont;
            this.contents.fontSize = Myth.BLK.healthFontSize;
            this.drawIcon($dataStates[Myth.BLK._healthStateID].iconIndex, (this.nameX(rect) + 88) + iconWidth * offset, this.stateIconY(rect) + this.lineHeight() * ($dataSystem.optDisplayTp ? 1.2 : 0.5) - 2);
            this.drawText(String(actor.hp), (this.nameX(rect) + 88) + (iconWidth * offset) + ((3 - String(actor.hp).length) * 4) + 2, this.stateIconY(rect) + this.lineHeight() * ($dataSystem.optDisplayTp ? 1.2 : 0.5) - 2, this.textWidth("000"), iconHeight, 'center');
            this.resetFontSettings();
            offset++;
        }
    }
}

}

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.displayAddedStates = function(target) {
    target.result().addedStateObjects().forEach(function(state) {
        var stateMsg = target.isActor() ? state.message1 : state.message2;
        if (state.id === target.deathStateId()) {
            this.push('performCollapse', target);
        }
        if (state.id === Myth.BLK._blockStateID)    stateMsg = null;
        if (stateMsg) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
            this.push('addText', target.name() + stateMsg);
            this.push('waitForEffect');
        }
    }, this);
};

Myth.BLK._BattleLog_makeHpDamageText = Window_BattleLog.prototype.makeHpDamageText;
Window_BattleLog.prototype.makeHpDamageText = function(target)
{
    var result = target.result();
    var damage = result.hpDamage;
    var isActor = target.isActor();
    var fmt;
    if (damage > 0 && result.drain) {
        fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
        return fmt.format(target.name(), TextManager.hp, damage);
    } else if (damage > 0) {

        if(target._lastBlocked > 0)
        {
            fmt = Myth.BLK._breakText;
        }
        else
        {
            fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
        }

        return fmt.format(target.name(), damage);

    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
        return fmt.format(target.name(), TextManager.hp, -damage);
    } 
    else 
    {
        if(target._lastBlocked > 0)
        {
            damage = target._lastBlocked;
            fmt = Myth.BLK._blockText;
            return fmt.format(target.name(), damage);
        }
        else
        {
            fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
            return fmt.format(target.name());
        }
    }
}

//=============================================================================
// New Card Actions
//=============================================================================

Myth.BLK.Game_Actor_performCardAction = Game_Battler.prototype.performCardAction;

Game_Battler.prototype.performCardAction = function (action) {
    var originalAction = action;
    action = this.formatCardAction(action);

    if (action.match(/(?:Add Block )([\+\-]\d+)/i))
    {
        this.addBlock(Number(RegExp.$1),true);
    }
    else if (action.match(/(?:Set Block )(\d+)/i))
    {
        this.setBlock(Number(RegExp.$1), true);
    }
    else if (action.match(/(?:Clear Block)/i))
    {
        this.clearBlock(true);
    }
    else
        Myth.BLK.Game_Actor_performCardAction.call(this, originalAction);
}


//=============================================================================
// DataManager
//=============================================================================

var Myth_BlockGenerate_loaded = false;

Myth.BLK.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
	if(!Myth.BLK.DataManager_isDatabaseLoaded.call(this)) return false;
	if(!Myth_BlockGenerate_loaded)
	{
        DataManager.processInitBlockNotetags($dataActors);
        DataManager.processInitBlockNotetags($dataEnemies);
        DataManager.processMaxBlockNotetags($dataActors);
        DataManager.processMaxBlockNotetags($dataEnemies);

        DataManager.processModInitBlockNotetags($dataWeapons);
        DataManager.processModInitBlockNotetags($dataArmors);
        DataManager.processModMaxBlockNotetags($dataWeapons);
        DataManager.processModMaxBlockNotetags($dataArmors);

        DataManager.processBlockChangeNotetags($dataStates);
        DataManager.processNegateBlockNotetags($dataStates);

        DataManager.processHideHealthNotetags($dataActors);
        DataManager.processHideHealthNotetags($dataEnemies);

        DataManager.processHideBlockNotetags($dataActors);
        DataManager.processHideBlockNotetags($dataEnemies);

        DataManager.processIgnoreBlockNotetags($dataSkills);
        DataManager.processIgnoreBlockNotetags($dataItems);
	}

	return true;
}

DataManager.processHideBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
    	var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

        for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<HIDE BLOCK>/i))
			{
				obj._hideBlock = true;
			}
		}
    }
}

DataManager.processHideHealthNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
    	var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

        for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<HIDE HEALTH>/i))
			{
				obj._hideHealth = true;
			}
		}
    }
}

DataManager.processInitBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<(?:INIT BLOCK): (\d*)/i))
			{
				obj._initBlock = parseInt(RegExp.$1);
			}
		}
	}
}

DataManager.processMaxBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<(?:MAX BLOCK): (\d*)/i))
			{
				obj._maxBlock = parseInt(RegExp.$1);
			}
		}
	}
}

DataManager.processModInitBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
        const initMods = [];

		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<MOD INIT BLOCK: ([\+\-]\d+)>/i))
			{
				var mod = parseInt(RegExp.$1);
                initMods.push(mod);
			}
		}

        obj._initMods = initMods;
	}
}

DataManager.processModMaxBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
        const maxMods = [];

		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<MOD MAX BLOCK: ([\+\-]\d+)>/i))
			{
				var mod = parseInt(RegExp.$1);
                maxMods.push(mod);
			}
		}

        obj._maxMods = maxMods;
	}
}

DataManager.processBlockChangeNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
		const blockChanges = [];

		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<BLOCK CHANGE: ([\+\-]\d+)>/i))
			{
				var mod = parseInt(RegExp.$1);
				blockChanges.push(mod);
			}
		}

		obj._blockChanges = blockChanges;
	}
}

DataManager.processIgnoreBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
    	var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

        for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<IGNORE BLOCK>/i))
			{
				obj._ignoreBlock = true;
			}
		}
    }
}

DataManager.processNegateBlockNotetags = function(group)
{
	for(var n = 1; n < group.length; n++)
	{
    	var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

        for(var i = 0; i < notedata.length; ++i)
		{
			var line = notedata[i];
			if(line.match(/<NEGATE BLOCK>/i))
			{
                Myth.BLK._negateStateIds.push(obj.id);
			}
		}
    }
}