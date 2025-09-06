//=============================================================================
// MYTH_DynamicHueShifter.js                                                      
//=============================================================================
/*:
 * @author Isiah Brighton
 * @plugindesc v1.1.0 Allows you to shift the hue of specific enemies
 * @target MZ
 * @url https://mythatelier.itch.io/
 * 
 *
 * @param Shift Timer
 * @type number
 * @min 1
 * @default 4
 * @desc The amount of frames before the hue shifts
 * 
 * @param Shift Amount
 * @type number
 * @min 1
 * @default 4
 * @desc The amount to shift the hue when the timer reaches 0. Must divide cleanly into 360.
 * 
 * @param Fail Condition Action
 * @type boolean
 * @on Stay Current Hue
 * @off Return to Default
 * @desc What should happen to the enemy's hue if their condition is not met.
 * @default true
 * 
 * @help
 * 
 * =============================================================================
 *                                 Introduction
 * =============================================================================
 *
 * This plugin will allow you to shift the hue of enemy sprites over time.
 *     
 * To manipulate the length of time between hue shifts in real-time, use:
 *     Isiah.HUE.timer
 * Make sure you never set this below 1.
 *
 * All enemies using the <Change Hue> notetag will change their hue 
 * 
 * =============================================================================
 *                                Enemy Notetags
 * =============================================================================
 * 
 * To get a specific enemy's hue to shift, use the following notetag:
 *     <Change Hue>
 * This will make the hue shift for this enemy using the values in this plugin's 
 * parameters. If you want enemies to have specific hue shifting patterns, you 
 * can also add notetags outlined below.
 * 
 *     <Hue Timer: x>
 * Where 'x' is an integer number. This will set the amount of frames until this
 * enemy's hue shifts. If this notetag is not present, it will default to the
 * Shift Timer plugin parameter.
 * 
 *     <Hue Amount: x>
 * Where 'x' is an integet number. Can be negative. Must divide cleanly into 360.
 * This is the amount by which the hue value will shift for this enemy.
 * If this notetag is not present, it will default to the Shift Amount plugin
 * parameter.
 * 
 * =============================================================================
 *                               Condition Notetags
 * =============================================================================
 * 
 * If you don't want a given enemy's hue to shift all the time, you can use a
 * condition notetag. Like so:
 * 
 *     <Hue Condition>
 *      code
 *     </Hue Condition>
 * This will make the hue only update if the condition outlined in the code is
 * met.
 * This code should be formatted like a simple expression. Examples include:
 *     "(this._enemy.hp <= this._enemy.mhp / 2)"
 *     "($gameSwitches.value(4) == true || $gameSwitches.value(6) == true)"
 *     etc.
 * 
 * Complete example including the notetag:
 *     <Hue Condition>
 *     (this._enemy.hp % 2 == 0)
 *     </Hue Condition>
 * This will make it so the hue will only update if the enemy's HP is an odd
 * number.
 * 
 * 
 * =============================================================================
 *                          Fail Condition Action Notetags
 * =============================================================================
 * 
 * These notetags outline what should happen to an enemy's hue if their condition
 * is not met. The "Fail Condition Action" parameter is the default behavior,
 * but these notetags override that behavior in the enemy they are placed in.
 * 
 *     <Hue Stay>
 * This will make it so that when a condition is not met, the enemy will stay
 * whatever hue they were when the condition failed.
 * 
 *     <Hue return>
 * This will make it so when a condition is not met, the enemy's hue will
 * snap to its default value.
 * 
 * =============================================================================
 *                                 Version History
 * =============================================================================
 * 
 * v1.1.0 - Changed plugin name
 * 
 * v1.0.3 - Added MZ compatibility
 * 
 * v1.0.2 - Fixed hues shifting at higher speeds if multiple of the same enemy were
 *         onscreen. Added fail condition actions.
 * 
 * v1.0.1a - crash hotfix
 * 
 * v1.0.1 - Added conditional notetag.
 * 
 * v1.0.0 - Added timer and amount notetags.
 * 
 * v0.1.0 - Finished internal version with base functionality.
 * 
 * =============================================================================
 *                              Contact Information
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

var Myth = Myth || {};
Myth.HUE = Myth.HUE || {};

var parameters = PluginManager.parameters('MYTH_DynamicHueShifter');
Myth.HUE.timer = Number(parameters['Shift Timer']);
Myth.HUE.shiftAmount = Number(parameters['Shift Amount']);
Myth.HUE.conditionFailAction = (parameters['Fail Condition Action']);


DataManager.processHueNotetag = function (group)
{
	var note = /<(?:CHANGE HUE)/i;
	var note2 = /<(?:Hue Timer:) (\d*)/i;
	var note3 = /<(?:Hue Amount:) (-?\d*)/i;
	var conditionNote = /<(?:Hue Condition)/i;
	var endConditionNote = /<(?:\/Hue Condition)/i;
	var stayHueNote = /<(?:Hue stay)/i;
	var returnHueNote = /<(?:Hue return)/i;

	var evalMode = 'none';


	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(note))
			{
				obj._changeHue = true;
			}
			else if (line.match(note2))
			{
				obj._hueTimer = Number(RegExp.$1);
			}
			else if (line.match(note3))
			{
				obj._hueAmount = Number(RegExp.$1);

			}
			else if (line.match(conditionNote))
			{
				evalMode = 'custom hue condition';
				obj._hueCondition = '';
			}
			else if (line.match(endConditionNote))
			{
				evalMode = 'none';
			}
			else if (evalMode == 'custom hue condition')
			{
				obj._hueCondition = obj._hueCondition + line + '\n';
			}
			else if (line.match(stayHueNote))
			{
				obj._hueFailConditionAction = 'stay';
			}
			else if (line.match(returnHueNote))
			{
				obj._hueFailConditionAction = 'return';
			}
		}
	}
};

Myth.HUE.Sprite_Enemey_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function ()
{
	Myth.HUE.Sprite_Enemey_initMembers.call(this);
	this._visibaleBattlerHue = this._battlerHue;
}

Myth.HUE.Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function ()
{
	var dataEnemy = this._enemy.enemy();
	var condition = dataEnemy._hueCondition;
	if (condition)
	{
		try
		{
			var valid = eval(condition);
		}
		catch (error)
		{
			console.error("There was an issue with the Hue condition for enemy " + this._enemy.battlerName() + ". ");
			console.error("Please check the syntax and make sure it is formatted like an expression.");
			console.error(error);
			valid = false;
		}
		if (!valid)
		{
			var failAction = Myth.HUE.conditionFailAction;
			if (dataEnemy._hueFailConditionAction == 'stay')
			{
				failAction = true;
			}
			else if (dataEnemy._hueFailConditionAction == 'return')
			{
				failAction = false;
			}
			if (failAction == false || failAction === 'false')
			{
				this._visibaleBattlerHue = this._enemy.battlerHue();
				this.loadBitmap(this._battlerName, this._visibaleBattlerHue);
			}
			Myth.HUE.Sprite_Enemy_updateBitmap.call(this);
			return;
		}
	}
	if (dataEnemy._changeHue)
	{
		var maxTimer = this._enemy.enemy()._hueTimer;
		var shiftAmount = this._enemy.enemy()._hueAmount;

		if (!maxTimer) maxTimer = Myth.HUE.timer + 1;
		if (!shiftAmount) shiftAmount = Myth.HUE.shiftAmount;

		this.__timer = this.__timer - 1 || maxTimer;
		if (this.__timer <= 1)
		{
			this.__timer = maxTimer;
			//var hue = this._enemy.enemy().battlerHue;
			var hue = this._visibaleBattlerHue;
			hue += shiftAmount;
			if (hue >= 360)
				hue = 0;
			if (hue < 0)
				hue = 360;
			//this._enemy.enemy().battlerHue = hue;
			this._visibaleBattlerHue = hue;
			//this.loadBitmap(this._battlerName, hue);
			if (Utils.RPGMAKER_NAME && Utils.RPGMAKER_NAME == "MZ")
				this.setHue(hue);
			else
				this.loadBitmap(this._battlerName, hue);
		}		
	}


	Myth.HUE.Sprite_Enemy_updateBitmap.call(this);
	
};

Myth.HUE.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function (battler)
{
	Myth.HUE.Sprite_Enemy_setBattler.call(this, battler);

	//preload all hues
	if (battler.enemy()._changeHue)
	{
		var en = battler.enemy();
		var shiftAmount = en._hueAmount || Myth.HUE.shiftAmount;

		var name = battler.battlerName();

		for (var i = 0; Math.abs(i) < 360; i += shiftAmount)
		{
			var hue = i;
			if (hue < 0)
				hue += 360;
			ImageManager.loadEnemy(name, hue);
		}
	}
};

(function ()
{
	Myth.HUE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function ()
	{
		if (!Myth.HUE.DataManager_isDatabaseLoaded.call(this)) return false;
		if (!Myth._loaded_hue)
		{
			DataManager.processHueNotetag($dataEnemies);

			Myth._loaded_hue = true;
		}

		return true;
	}
})();