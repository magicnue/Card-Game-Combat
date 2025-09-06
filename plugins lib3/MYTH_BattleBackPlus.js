//=============================================================================
// MYTH_BattleBackPlus.js
//=============================================================================
/*:
 * @plugindesc v1.1.0 Battlebacks Extends YEP_ImprovedBattlebacks to provide battleback sequences
 * that happen automatically.
 * @author Isiah Brighton
 *
 * @param resetAfterBattle
 * @text Reset Commands After Battle?
 * @type boolean
 * @default true
 * @desc If true, any battleback commands set up using this plugin 
 * will be reset automatically at the end of the battle.
 *
 * @help
 * 
 * ============================================================================
 *                                 Introduction
 * ============================================================================
 * 
 * This plugin takes YEP_ImprovedBattlebacks's plugin commands and allows you
 * to preload battleback assets before the battle starts, add foreground
 * elements, and create a sequence of commands to play in order in a loop.
 * 
 * Using the function Myth.BBP.addBattlebackCommand, create a list of commands
 * before the battle begins (or add mid-battle) to change the battlebacks,
 * including a "wait" command to help the timing of these commands.
 * All commands in YEP_ImprovedBattlebacks can be supplied, but additionally
 * there are more below that can be given.
 * 
 * Ensure this plugin is placed underneath YEP_ImprovedBattlebacks in the
 * plugin order.
 * 
 * 
 * ============================================================================
 *                                 Script Calls
 * ============================================================================
 *
 *     Myth.BBP.addBattlebackCommand(command1, command2, etc)
 *     Myth.BBP.addBattlebackCommand(arrayOfCommands)
 * This function accepts strings which are plugin commands outlined in
 * YEP_ImprovedBattlebacks. This will create a list of plugin commands to
 * execute in the background. Like the time background, not the battleback
 * background, you know what I mean.
 * 
 * The function will accept as many parameters at once as you give it. It can
 * also take an array as a single parameter.
 * 
 *     Myth.BBP.resetBattlebackCommands()
 * This function clears the list of commands that execute in the background.
 * If the "Reset Commands After Battle" parameter is set to false, this
 * function must be called manually when you decide you no longer want the
 * command list you were using previously.
 * 
 * ============================================================================
 *                               Preload Commands
 * ============================================================================
 *
 *     'BATTLEBACK id PRELOAD: folder, filename'
 *     'BATTLEBACK id PRELOAD: folder, filename, hue'
 * These work exactly the same as YEP's 'ADD' function, except that they
 * execute before a battle begins, and the battle will not fade in until
 * they are all successfully loaded and added to the battle.
 * Note that the IDs must be 3 or higher, just like with YEP's ADD command.
 *
 *
 *     'BATTLEBACK id FOREGROUND'
 * This command will set the given battleback id to be a foreground element
 * rather than a background element. This means it will be in front of the
 * players and enemies. This command is processed at the same time as a
 * preloaded battleback.
 * Note: if multiple foreground elements are used, their order will be
 * inverse to their ID. In other words, higher IDs will be behind lower IDs.
 * 
 * ============================================================================
 *                             Navigation Commands
 * ============================================================================
 * 
 * Note that these commands were designed to work with the battleback command
 * list that iterates in the background, and as such they only work if they
 * are in the command list. In other words, you do not use a Plugin Command
 * to use these commands, you instead use Myth.BBP.addBattlebackCommand
 * to add them to the command list.
 * 
 *     'BATTLEBACK WAIT x'
 * This command will make the command list wait x frames before executing
 * the next command in the list.
 * All commands execute within the same frame until they get to a Wait
 * command. This command therefore gives you complete control of the timing
 * of commands.
 * 
 *     'BATTLEBACK JUMP TO TOP'
 *     'BATTLEBACK JUMP TO x'
 *     'BATTLEBACK JUMP TO [LABELNAME]'
 * Replace x with an index representing which command to jump to, or use
 * 'top' to jump to the beginning of the command list.
 * This command will return to the command at index 'x' and begin processing
 * commands as normal from there.
 * The first command in the list is index 0, the 2nd is index 1, and so on.
 * 
 * You can also supply a label like so:
 * 
 *     'LABEL [LABELNAME]'
 *     
 * The command "jump to [labelname]" will return to the command with that label.
 * Example:
 * 
 *     command 
 *     'Label Cool Stuff'
 *     command
 *     command 
 *     command
 *     'BATTLEBACK Jump to Cool Stuff'
 * 
 * This example will iterate through the 4 commands, then jump back to
 * Cool Stuff and iterate through the 3 commands that are after Cool Stuff.
 * 
 * Important note about jumps and labels:
 *     All commands execute within a single frame unless a wait command
 *     is entered. What this means is if there are no wait commands between
 *     the start and end of a loop (a label and the jump to that label)
 *     then it will become an infinite loop that freezes the game.
 *     
 *     
 * Finally, the most powerful command:
 *     'BATTLEBACK IF [CONDITION]'
 * 
 * This command will execute the command immediately following it
 * only if the condition supplied evaluates to true.
 * 
 * Example:
 * 
 *     'BATTLEBACK IF $gameSwitches.value(3) == true'
 *     'BATTLEBACK Jump to Cool Stuff'
 *     command
 *     command
 *     'Label Cool Stuff'
 * 
 * In this example, the 2 commands will be skipped if Game Switch 3
 * is true, because the Jump command will execute and jump to the
 * label farther into the sequence.
 * 
 * It should be noted that Preload Commands (detailed below) cannot
 * be skipped through conditions or jumps, as they execute before
 * the battle begins.
 * 
 * These commands are also not case sensitive. So 'BATTLEBACK' and 'BaTtLeBaCk'
 * will work just as well.
 *    
 * 
 * ============================================================================
 *                                 Blend Command
 * ============================================================================
 * 
 * This command is unique to BBP in that it will work in a command sequence
 * or plugin command like the rest of YEP's commands.
 * 
 * 'BATTLEBACK id BLENDMODE: NORMAL'
 * 'BATTLEBACK id BLENDMODE: ADD'
 * 'BATTLEBACK id BLENDMODE: MULTIPLY'
 * 'BATTLEBACK id BLENDMODE: SCREEN'
 * 
 * This command will set the blendMode of the given battleback.
 * 
 * ============================================================================
 *                                 Example Use
 * ============================================================================
 * 
 *      var commands = [
 *       'battleback 3 preload: battlebacks2, Castle3',
 *       'battleback 3 foreground',
 *       'Battleback 3 opacity: 0',
 *       'Battleback 3 blendmode: add',
 *       'battleback 4 preload: parallaxes, DarkSpace1',
 *       'battleback 4 foreground',
 *       'battleback 4 opacity: 0',
 *       'battleback label start',
 *       'battleback 4 SCROLL SPEED X: +3',
 *       'battleback 4 SCROLL SPEED Y: +3',
 *       'battleback 3 fade in: 60',
 *       'BATTLEBACK 1 SCROLL SPEED X: +3',
 *       'BATTLEBACK 2 SCROLL SPEED X: +2',
 *       'BATTLEBACK WAIT 60',
 *       'BATTLEBACK 1 SCROLL SPEED X: -3',
 *       'BATTLEBACK 2 SCROLL SPEED X: -2',
 *       'bATTLEbACK WAIT 60',
 *       'battleback if $gameParty.leader().hp <= $gameParty.leader().mhp / 2',
 *       'battleback jump to half dead',
 *       'battleback jump to start'
 *       'battleback label half dead',
 *       'battleback 4 fade in: 200',
 *       'battleback wait 200',
 *       'battleback 4 fade out: 200',
 *       'battleback wait 200',
 *       'battleback jump to half dead'
 *      ];
 *      Myth.BBP.addBattlebackCommand(commands);
 *      
 * This example code will preload a foreground element and cause it to fade
 * in over 60 frames at the start of the battle, using an additive blend mode.
 * It will cause battlebacks 1 and 2 to move back and forth in a paralax
 * pattern, switching directions every 60 frames.
 * At the end of the list, it jumps to the label 'start', where it begins again
 * at 'BATTLEBACK 1 SCROLL SPEED X: +3'.
 * If the leader's HP is less than half full, however, it jumps to the next
 * phase of the sequence and fades in and out a foreground element.
 * 
 * A sequence this long may need to be broken up into multiple Script Calls.
 * Any time you call the addBattlebackCommand function, it adds your commands
 * to the end of the sequence.
 * 
 * 
 * ============================================================================
 *                                 Version History
 * ============================================================================
 * 
 * v1.1.0 - Changed plugin name and contact info
 * 
 * v1.0.4 - Commands are now saved to the save file, so they can carry over 
 *         between play sessions.
 * 
 * v1.0.3 - Fixed parameter bug evaluating to true when it is false
 * 
 * v1.0.2 - Added Labels and Conditions, cleaned up help file.
 * 
 * v1.0.1 - adjusted commands to be more accepting of syntax. EG, "wait x"
 *         can now also be "wait: x" to avoid headaches.
 * 
 * v1.0.0 - Finished plugin
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

var Imported = Imported || {};
var Myth = Myth || {};
Myth.BBP = Myth.BBP || {};

var parameters = PluginManager.parameters('MYTH_BattleBackPlus');

//if (!Imported.YEP_ImprovedBattlebacks) return;

Myth.BBP.backsToLoad = [];

Myth.BBP.resetCommandsAfterBattle = (parameters.resetAfterBattle);
if (Myth.BBP.resetCommandsAfterBattle == 'true')
	Myth.BBP.resetCommandsAfterBattle = true;
else
	Myth.BBP.resetCommandsAfterBattle = false;

function BattlebackData(index, folder, filename, hue, opacity, duration, push)
{
	this.folder = folder;
	this.filename = filename;
	this.index = index;
	this.hue = hue;
	this.opacity = opacity;
	this.duration = duration;
	this.push = push;

}

function Label(key, value)
{
	this.key = key;
	this.value = value;
}



Myth.BBP.battlebackCommands = [

];

Myth.BBP.battlebackLabels = [
]
Myth.BBP.condition = true;

Myth.BBP.resetBattlebackCommands = function ()
{
	Myth.BBP.battlebackCommands = [];
	Myth.BBP.backsToLoad = [];
	Myth.BBP.battlebackLabels = [];
}

Myth.BBP.addBattlebackCommand = function ()
{
	if (arguments[0] && Array.isArray(arguments[0]))
	{
		Myth.BBP.battlebackCommands = Myth.BBP.battlebackCommands.concat(arguments[0]);
	}
	else
	{
		for (var i = 0; i < arguments.length; i++)
		{
			Myth.BBP.battlebackCommands.push(arguments[i]);
		}
	}

	this.processPreloadCommands();
}

Myth.BBP.processPreloadCommands = function ()
{
	for (var i = 0; i < this.battlebackCommands.length; i++)
	{
		var line = this.battlebackCommands[i];
		if (line.match(/(?:BATTLEBACK|BATTLE BACK)[ ](\d+)/i))
		{
			var id = Math.max(1, parseInt(RegExp.$1));
			if (line.match(/(?:PRELOAD)/i))
			{
				if (line.match(/:[ ](.*),[ ](.*),[ ](\d+)/i))
				{
					var folder = 'img/' + String(RegExp.$1) + '/';
					var filename = String(RegExp.$2);
					var hue = Number(RegExp.$3).clamp(0, 360);
				} else if (line.match(/:[ ](.*),[ ](.*)/i))
				{
					var folder = 'img/' + String(RegExp.$1) + '/';
					var filename = String(RegExp.$2);
					var hue = 0;
				} else
				{
					return;
				}
				var battlebackData = new BattlebackData(id, folder, filename, hue, 255, 0);
				this.backsToLoad.push(battlebackData);
				this.battlebackCommands[i] = '';
			}
			else if (line.match(/(?:FOREGROUND)/i))
			{
				var backData;
				for (var j = 0; j < this.backsToLoad.length; j++)
				{
					var bD = this.backsToLoad[j];
					if (bD.index == id)
						backData = bD;
				}
				if (backData)
					backData.foreground = true;
			}
		}
		else if (line.match(/(?:LABEL)[: ]*([a-zA-Z ]*)/i))
		{
			
			var key = RegExp.$1.toLowerCase();
			var value = i;
			var label = new Label(key, value);
			Myth.BBP.battlebackLabels.push(label);
			this.battlebackCommands[i] = '';
		}
	}

}

Myth.BBP.Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function ()
{
	Myth.BBP.Spriteset_Battle_initialize.call(this);
	this._commandIndex = 0;
	this._commandWaitTime = 0;
}

Myth.BBP.Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function ()
{
	Myth.BBP.Spriteset_Battle_createBattleback.call(this);

	Myth.BBP.processPreloadCommands();
	for (var i = 0; i < Myth.BBP.backsToLoad.length; i++)
	{
		var backData = Myth.BBP.backsToLoad[i]
		var bitmap = ImageManager.loadBitmap(backData.folder, backData.filename, backData.hue);
		var battleback = new Sprite_ImprovedBattleback(bitmap, backData.index);
		battleback.setup(this._battleField, this._back1Sprite);
		battleback.setOpacity(backData.opacity);
		battleback.setFadeIn(backData.duration);
		if (backData.push && this._battlebackSprites.length > backData.index)
		{
			this._backgroundSprites.splice(backData.index, 0, battleback);
		}
		else
		{
			this._battlebackSprites[backData.index] = battleback;
		}
		this._battlebackSprites[backData.index].foreground = backData.foreground;
		this.updateBattlebackZCoordinates();

	}
}

Myth.BBP.Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function ()
{
	Myth.BBP.Spriteset_Battle_update.call(this);
	this.updateBattlebackCommands();
}

Spriteset_Battle.prototype.updateBattlebackCommands = function ()
{
	if (this.updateCommandWaitTime())
	{
		var isWait = false;
		var commandList = Myth.BBP.battlebackCommands;
		while (!isWait && this._commandIndex < commandList.length)
		{
			isWait = this.processCommand(commandList[this._commandIndex]);
			this._commandIndex++;
		}
	}
}

Spriteset_Battle.prototype.updateCommandWaitTime = function ()
{
	this._commandWaitTime--;
	return (this._commandWaitTime <= 0);
};

Spriteset_Battle.prototype.processCommand = function (line)
{
	var isWait = false;

	if (Myth.BBP.condition)
	{
		if (line.match(/(?:BATTLEBACK|BATTLE BACK)/i))
		{
			if (line.match(/(?:WAIT[: ]*)(\d+)/i))
			{
				isWait = true;
				this._commandWaitTime = Number(RegExp.$1);
			}
			else if (line.match(/(?:jump to)[: ]*(\d+)/i) || line.match(/JUMP TO[: ]*([a-zA-Z ]*)/i))
			{
				var newIndex = RegExp.$1;
				if (!isNaN(newIndex))
				{
					newIndex = Number(newIndex) - 1;
				}
				else if (newIndex.toLowerCase() == "top")
				{
					newIndex = -1;
				}
				else
				{
					var key = newIndex.toLowerCase();
					var labels = Myth.BBP.battlebackLabels;
					for (var i = 0; i < labels.length; i++)
					{
						if (labels[i].key == key)
						{
							newIndex = labels[i].value;
							break;
						}
					}

					if (key == newIndex)
					{
						newIndex = -1;
						console.error("The label " + key + " does not exist. Make sure there were no typos.");
					}
				}
				this._commandIndex = newIndex;
			}
			else if (line.match(/ if[: ]*(.*)/i))
			{
				var condition = true;
				try
				{
					condition = eval(RegExp.$1);
				}
				catch (error)
				{
					console.error("There was an issue with the condition " + line + ". Please make sure the syntax is correct");
					console.error(error);
				}

				Myth.BBP.condition = condition;

			}
			else
				BattleManager.alterBattleback(line);
		}
	}
	else
	{
		Myth.BBP.condition = true;
	}

	

	return isWait;
};

Spriteset_Battle.prototype.updateBattlebackGroupAdd = function ()
{
	if (!this._battlebackSprites) return;
	var length = this._battlebackSprites.length;
	for (var i = length; i > 0; --i)
	{
		var sprite = this._battlebackSprites[i];
		if (sprite)
		{
			if (sprite.foreground)
			{
				this._battleField.addChild(sprite);
			}
			else
				this._battleField.addChildAt(sprite, 0);
		}
	}
};


Myth.BBP.BattleManager_alterBattleback = BattleManager.alterBattleback;
BattleManager.alterBattleback = function (line)
{
	if (line.match(/(?:BATTLEBACK|BATTLE BACK)[ ](\d+)/i))
	{
		var id = Math.max(1, parseInt(RegExp.$1));
		var spriteset = SceneManager._scene._spriteset;
		if (!spriteset) return;
	} else
	{
		return;
	}

	if (line.match(/BLENDMODE:[ ]/i))
	{
		var blendmode;
		if (line.match(/NORMAL/i))
		{
			blendmode = Graphics.BLEND_NORNAL;
		}
		else if (line.match(/ADD/i))
		{
			blendmode = Graphics.BLEND_ADD;
		}
		else if (line.match(/MULTIPLY/i))
		{
			blendmode = Graphics.BLEND_MULTIPLY;
		}
		else if (line.match(/SCREEN/i))
		{
			blendmode = Graphics.BLEND_SCREEN;
		}

		if (blendmode)
		{
			//this._battlebackSprites[id].blendMode = blendmode;
			spriteset.battlebackBlendMode(id, blendmode);
		}
	}
	Myth.BBP.BattleManager_alterBattleback.call(this, line);
};

Spriteset_Battle.prototype.battlebackBlendMode = function (index, blendMode)
{
	if (!this._battlebackSprites) return;
	if (!this._battlebackSprites[index]) return;
	this._battlebackSprites[index].blendMode = blendMode;
}


if (Myth.BBP.resetCommandsAfterBattle)
{
	Myth.BBP.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
	BattleManager.updateBattleEnd = function ()
	{
		Myth.BBP.BattleManager_updateBattleEnd.call(this);
		Myth.BBP.resetBattlebackCommands();
	}
}

var _DataManager_setupTestTroop = DataManager.setupBattleTest;
DataManager.setupBattleTest = function ()
{
	_DataManager_setupTestTroop.call(this);
	var commands = [
		//put commands here when testing a troop to save time
	];


	Myth.BBP.addBattlebackCommand(commands);
};


Myth.BBP.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function ()
{
	var contents = Myth.BBP.DataManager_makeSaveContents.call(this);
	contents.battlebackData = {
		backsToLoad: Myth.BBP.backsToLoad,
		battlebackCommands: Myth.BBP.battlebackCommands,
		battlebackLabels: Myth.BBP.battlebackLabels
	};

	return contents;
};

Myth.BBP.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents)
{
	Myth.BBP.DataManager_extractSaveContents.call(this, contents);
	if (contents.battlebackData)
	{
		Myth.BBP.backsToLoad = contents.battlebackData.backsToLoad;
		Myth.BBP.battlebackCommands = contents.battlebackData.battlebackCommands;
		Myth.BBP.battlebackLabels = contents.battlebackData.battlebackLabels;
	}
	
};