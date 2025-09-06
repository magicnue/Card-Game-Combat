//=============================================================================
// MYTH_ScreenShakePlus.js                                                   
//=============================================================================
/*:
 * @target MZ
* @author Isiah Brighton
* @plugindesc v1.1.0 A plugin that adds a new screen shake system to your games - works in menus!
 * @url https://mythatelier.itch.io/shake-plus-rpgmvmz
 *
 * @param addShakeOption
 * @text Add Shake Option
 * @type boolean
 * @default true
 * @desc If set to ON, an option will appear in the Options Menu to customize
 * the amount of shake they experience, like a volume slider.
 * 
 * @param shakeOptionName
 * @text Shake Option Name
 * @parent addShakeOption
 * @default Screen Shake
 * @desc The text that appears for the Shake Option.
 * 
 * @param usingmv3d
 * @text Using MV3D / MZ3D?
 * @type boolean
 * @default false
 * @desc Set this to ON if you are using MV3D or MZ3D, because map shakes work
 * differently in that system. This will also enable AddShakeZ.
 * 
 * 
 * 
 * @command addShakeX
 * @text Add Shake X
 * @desc Make the screen shake left and right.
 * 
 *     @arg duration
 *     @text Duration
 *     @type number
 *     @min -1
 *     @default 0
 *     @desc The number of frames the shake will happen. Set to -1 for infinite frames.
 *     
 *     @arg intensity
 *     @text Intensity
 *     @type number
 *     @min 0
 *     @default 0
 *     @desc The number of pixels the screen can shake in a given frame. Set to 0 for default behavior (see help section).
 *     
 * @command addShakeY
 * @text Add Shake Y
 * @desc Make the screen shake up and down.
 * 
 *     @arg duration
 *     @text Duration
 *     @type number
 *     @min -1
 *     @default 0
 *     @desc The number of frames the shake will happen. Set to -1 for infinite frames.
 *     
 *     @arg intensity
 *     @text Intensity
 *     @type number
 *     @min 0
 *     @default 0
 *     @desc The number of pixels the screen can shake in a given frame. Set to 0 for default behavior (see help section).
 *   
 * @command addShakeZ
 * @text Add Shake Z (MZ3D)
 * @desc Make the screen shake forward and backwards.
 * 
 *     @arg duration
 *     @text Duration
 *     @type number
 *     @min -1
 *     @default 0
 *     @desc The number of frames the shake will happen. Set to -1 for infinite frames.
 *     
 *     @arg intensity
 *     @text Intensity
 *     @type number
 *     @min 0
 *     @default 0
 *     @desc The number of pixels the screen can shake in a given frame. Set to 0 for default behavior (see help section).
 * 
 * @command addShakeRadial
 * @text Add Shake Radial
 * @desc Make the screen shake in a circle.
 * 
 *     @arg duration
 *     @text Duration
 *     @type number
 *     @min -1
 *     @default 0
 *     @desc The number of frames the shake will happen. Set to -1 for infinite frames.
 *     
 *     @arg intensity
 *     @text Intensity
 *     @type number
 *     @min 0
 *     @default 0
 *     @desc The number of pixels the screen will offset from the center. Set to 0 for default behavior (see help section).
 *     
 * @command clearAllShakes
 * @text Clear All Shakes
 * @desc Remove all shakes that are still in process.
 * 
 * @help
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 * 
 * This plugin adds a new screen shake system to RPG Maker that is more
 * in line with traditional screen shakes. Instead of moving the camera 
 * side-to-side, the screen vibrates chaotically, creating a more intense 
 * effect from smaller motions.
 * 
 * In addition, screen shakes can be called in menus.
 * 
 * This plugin also adds a setting in the Options menu for the player to set
 * how much screenshake they experience, on a sliding scale from 0% to 100%.
 * It functions just like the volume settings.
 * You can disable this option using the Add Shake Option plugin parameter,
 * though it is recommended to keep it on for accessibility purposes.
 * 
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * AddShakeX [duration] [intensity]
 * AddShakeY [duration] [intensity]
 *     [duration] - replace with the duration (in frames) of the screenshake.
 *     [intensity] - (optional) replace with the intensity in pixels of the 
 *         screenshake.
 * These commands will cause the screen to shake left and right or up and down
 * (respectively) for [duration] frames at [intensity] intensity.
 * 
 * Each frame, the intensity is randomized, with a maximum of the specified
 * value, and subtracted from half the maximum intensity, and that is the
 * amount of pixels the camera moves from the center for that frame.
 * This mimics a traditional screen shake.
 * 
 * 
 * AddShakeRadial [duration] [intensity]
 *     [duration] - replace with the duration (in frames) of the screenshake.
 *     [intensity] - (optional) replace with the intensity in pixels of the 
 *         screenshake.
 *     
 * This will cause a different kind of screenshake where instead of the
 * intensity being randomized, an angle is randomized, and the camera is
 * moved Y amount of pixels in that direction.
 * See it for yourself in action to get an idea of what it's like.
 * Lower intensity values are recommended for this one as they make a larger
 * difference.
 * 
 * 
 * If you don't supply an intensity for any of these plugin commands,
 * the intensity will match the duration. It will continue to match the
 * remaining duration of the shake, growing less intense until the shake ends.
 * 
 * 
 * ClearAllShakes
 * This will stop all screen shakes.
 * 
 * ============================================================================
 * Using Multiple Screen Shakes at Once
 * ============================================================================
 * 
 * The short story is that you can do it.
 * 
 * The long story is this:
 * X, Y, and Radial shakes are all handled independently of one-another. This 
 * means that adding one does not interrupt the other - and they will stack.
 * 
 * In addition, if more than one X shake, or Y shake, or Radial shake is added, 
 * they are handled together so that their intensities are added together, but 
 * their durations are not.
 * 
 * So for example if you have the following:
 * 
 *     AddShakeY 30 10
 *     AddShakeY 60 10
 *     AddShakeY 90 10
 * 
 * The result will be that for 30 frames, the vertical shake intensity is
 * treated as 30 (the sum of all 3 shakes), then the first shake will disappear.
 * For the next 30 frames, the intensity will be 20 (the sum of the remaining
 * 2 shakes). Finally, the last 30 frames will only have one vertical shake
 * with an intensity of 10.
 * 
 * And if you have:
 * 
 *     AddShakeY 30
 *     AddShakeY 30
 * 	   
 * The intensities will use their default values, which get smaller over time
 * rather than staying constant - but since their intensities are added together,
 * you will end up with a shake that lasts just as long but is twice as intense 
 * as if you only had one plugin command.
 * 
 *
 * ============================================================================
 * MV3D/MZ3D Plugin Command
 * ============================================================================
 *
 * This plugin requires that you have MV3D or MZ3D in your project (above this
 * plugin) and you have the parameter Using 3D ON.
 * 
 * AddShakeZ [duration] [intensity]
 *     [duration] - replace with the duration (in frames) of the screenshake.
 *     [intensity] - (optional) replace with the intensity in pixels of the
 *         screenshake.
 *     
 * This will work just like an X or Y shake, but it will be
 * along the Z axis.
 *
 * 
 * ============================================================================
 * Infinite Shake
 * ============================================================================
 * 
 * You can supply -1 for the duration to cause the screen shake to never end.
 * 
 * This is recommended only in scripted sequences where you know it will
 * only be a matter of time before you can call ClearAllShakes.
 * Otherwise the player may find themselves skipping the clear call, and
 * their screen will shake forever. They'll blame you for it, not me.
 * 
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * $gameScreen.addShakeHorizontal(duration, intensity);
 * $gameScreen.addShakeHorizontal(duration);
 *     Works just like the AddShakeX Plugin Command
 * 
 * $gameScreen.addShakeVertical(duration, intensity);
 * $gameScreen.addShakeVertical(duration);
 *     Works just like the AddShakeY Plugin Command
 * 
 * $gameScreen.addShakeRadial(duration, intensity);
 * $gameScreen.addShakeRadial(duration);
 *     Works just like the AddShakeRadial Plugin Command
 * 
 * $gameScreen.clearAllShakes();
 *     Works just like the ClearAllShakes Plugin Command
 *     
 * $gameScreen.addShakeZ(duration, intensity);
 * $gameScreen.addShakeZ(duration);
 *     Works just like the AddShakeZ Plugin Command
 *     Just like the command, only works if you are using MV3D/MZ3D and
 *     the Plugin Parameter is set to ON.
 * 
 * ============================================================================
 * Version History
 * ============================================================================
 * 
 * v1.1.0 - Changed plugin name
 * 
 * v1.0.0 - Added manually-specified intensities. Cleaned up help file.
 *          Fixed MV3D bug where the camera wasn't resetting properly after
 *          a shake.
 *          Added MZ compatibility. Then added MZ3D compatibility.
 *          Public release!
 * 
 * v0.5.0 - Internal plugin use
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

var Myth = Myth || {};
Myth.SHK = Myth.SHK || {};

Myth.Parameters = PluginManager.parameters('MYTH_ScreenShakePlus');


Myth.SHK.usingmv3d = JSON.parse(Myth.Parameters.usingmv3d);

Myth.SHK.addShakeOption = JSON.parse(Myth.Parameters.addShakeOption);
Myth.SHK.shakeOptionName = Myth.Parameters.shakeOptionName;

Myth.Util = Myth.Util || {};
Myth.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");


Myth.SHK.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args)
{
	Myth.SHK.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toLowerCase() == 'addshakehorizontal') $gameScreen.addShakeHorizontal(args[0], args[1]);
	if (command.toLowerCase() == 'addshakex') $gameScreen.addShakeHorizontal(args[0], args[1]);
	if (command.toLowerCase() == 'addshakevertical') $gameScreen.addShakeVertical(args[0], args[1]);
	if (command.toLowerCase() == 'addshakey') $gameScreen.addShakeVertical(args[0], args[1]);
	if (command.toLowerCase() == 'addshakez') $gameScreen.addShakeZ(args[0], args[1]);
	if (command.toLowerCase() == 'addshakeradial') $gameScreen.addShakeRadial(args[0], args[1]);

	if (command.toLowerCase() == 'clearshakes') $gameScreen.clearShakes();
	if (command.toLowerCase() == 'clearallshakes') $gameScreen.clearShakes();

};

if (Myth.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_ScreenShakePlus", "addShakeX", args =>
	{
		const duration = Number(args.duration);
		var intensity = Number(args.intensity);
		if (intensity == 0) intensity = undefined;
		$gameScreen.addShakeHorizontal(duration, intensity);
	});

	PluginManager.registerCommand("MYTH_ScreenShakePlus", "addShakeY", args =>
	{
		const duration = Number(args.duration);
		var intensity = Number(args.intensity);
		if (intensity == 0) intensity = undefined;
		$gameScreen.addShakeVertical(duration, intensity);
	});

	PluginManager.registerCommand("MYTH_ScreenShakePluss", "addShakeZ", args =>
	{
		const duration = Number(args.duration);
		var intensity = Number(args.intensity);
		if (intensity == 0) intensity = undefined;
		$gameScreen.addShakeZ(duration, intensity);
	});

	PluginManager.registerCommand("MYTH_ScreenShakePlus", "addShakeRadial", args =>
	{
		const duration = Number(args.duration);
		var intensity = Number(args.intensity);
		if (intensity == 0) intensity = undefined;
		$gameScreen.addShakeRadial(duration, intensity);
	});

	PluginManager.registerCommand("MYTH_ScreenShakePlus", "clearAllShakes", args =>
	{
		$gameScreen.clearAllShakes();
	});


}


ConfigManager.shakeIntensity = 100;

Myth.SHK.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function ()
{
	var config = Myth.SHK.ConfigManager_makeData.call(this);
	config.shakeIntensity = this.shakeIntensity;
	return config;
};

Myth.SHK.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config)
{
	Myth.SHK.ConfigManager_applyData.call(this, config);
	this.shakeIntensity = this.readVolume(config, 'shakeIntensity');
}

Myth.SHK.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function ()
{
	Myth.SHK.Window_Options_addGeneralOptions.call(this);
	this.addScreenShakeOption();
};

Window_Options.prototype.addScreenShakeOption = function ()
{
	if (Myth.SHK.addShakeOption)
		this.addCommand(Myth.SHK.shakeOptionName, 'shakeIntensity');
}

Myth.SHK.Window_Options_isVolumeSymbol = Window_Options.prototype.isVolumeSymbol;
Window_Options.prototype.isVolumeSymbol = function (symbol)
{
	var isVolume = Myth.SHK.Window_Options_isVolumeSymbol.call(this, symbol);
	return symbol.contains('Intensity') || isVolume;
};

Myth.SHK.Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function ()
{
	Myth.SHK.Game_Screen_update.call(this);
	this.updateShakes();
}

Myth.SHK.Game_Screen_clear = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function ()
{
	Myth.SHK.Game_Screen_clear.call(this);
	this.clearShakes();
}

Myth.SHK.Game_Screen_onBattleStart = Game_Screen.prototype.onBattleStart;
Game_Screen.prototype.onBattleStart = function ()
{
	Myth.SHK.Game_Screen_onBattleStart.call(this);
	this.clearShakes();
}

Game_Screen.prototype.addShakeVertical = function (duration, intensity)
{
	if (intensity == undefined)
		intensity = 'default';
	else
		intensity = Number(intensity);
	var shake = {
		duration: duration,
		intensity: intensity
	}
	this._vertShakes.push(shake);
};

Game_Screen.prototype.addShakeHorizontal = function (duration, intensity)
{
	if (intensity == undefined)
		intensity = 'default';
	else
		intensity = Number(intensity);
	var shake = {
		duration: duration,
		intensity: intensity
	}
	this._horzShakes.push(shake);
};

Game_Screen.prototype.addShakeZ = function (duration, intensity)
{
	if (intensity == undefined)
		intensity = 'default';
	else
		intensity = Number(intensity);
	var shake = {
		duration: duration,
		intensity: intensity
	}
	this._zShakes.push(shake);
};

Game_Screen.prototype.addShakeRadial = function (duration, intensity)
{
	if (intensity == undefined)
		intensity = 'default';
	else
		intensity = Number(intensity);
	var shake = {
		duration: Number(duration),
		intensity: intensity
	}
	this._radShakes.push(shake);
};

Game_Screen.prototype.updateShakes = function ()
{
	this.updateShakeArray(this._vertShakes);
	this.updateShakeArray(this._horzShakes);
	this.updateShakeArray(this._zShakes);
	this.updateShakeArray(this._radShakes);

	this.refreshShakeY();
	this.refreshShakeX();
	this.refreshShakeZ();
	this.refreshShakeRadial();
};

Game_Screen.prototype.updateShakeArray = function (shakes)
{
	for (var i = shakes.length - 1; i >= 0; i--)
	{
		shakes[i].duration--;
		if (shakes[i].duration == 0)
			shakes.splice(i, 1);
	}
}

Game_Screen.prototype.refreshShakeY = function ()
{
	var y = 0;
	var total = 0;
	for (var i = 0; i < this._vertShakes.length; i++)
	{
		var shake = this._vertShakes[i];
		var intensity = shake.intensity;
		if (intensity == 'default')
			intensity = shake.duration;
		total += intensity;
		y += Math.floor(Math.random() * intensity);
	}
	y -= total / 2;

	y *= (ConfigManager.shakeIntensity / 100);

	this._shakeY = y;
}

Game_Screen.prototype.refreshShakeX = function ()
{
	var x = 0;
	var total = 0;
	for (var i = 0; i < this._horzShakes.length; i++)
	{
		var shake = this._horzShakes[i];
		var intensity = shake.intensity;
		if (intensity == 'default')
			intensity = shake.duration;
		total += intensity;
		x += Math.floor(Math.random() * intensity);
	}
	x -= total / 2;

	x *= (ConfigManager.shakeIntensity / 100);

	this._shakeX = x;
}

Game_Screen.prototype.refreshShakeZ = function ()
{
	var z = 0;
	var total = 0;
	for (var i = 0; i < this._zShakes.length; i++)
	{
		var shake = this._zShakes[i];
		var intensity = shake.intensity;
		if (intensity == 'default')
			intensity = shake.duration;

		total += intensity;
		z += Math.floor(Math.random() * intensity);
	}
	z -= total / 2;

	z *= (ConfigManager.shakeIntensity / 100);

	this._shakeZ = z;
}

Game_Screen.prototype.refreshShakeRadial = function ()
{
	var totalIntensity = 0;
	for (var i = 0; i < this._radShakes.length; i++)
	{
		var shake = this._radShakes[i];
		var intensity = shake.intensity;
		if (intensity == 'default')
			intensity = shake.duration;

		totalIntensity += intensity;
	}

	totalIntensity * - 0.25;

	totalIntensity *= (ConfigManager.shakeIntensity / 100);

	var angle = Math.random() * 360;

	this._shakeRadial = { intensity: totalIntensity, angle: angle };
}

Game_Screen.prototype.shakeY = function ()
{
	return this._shakeY;
}

Game_Screen.prototype.shakeX = function ()
{
	return this._shakeX;
}

Game_Screen.prototype.shakeZ = function ()
{
	return this._shakeZ;
}

Game_Screen.prototype.shakeRadial = function ()
{
	return this._shakeRadial;
}

Game_Screen.prototype.clearShakes = function ()
{
	this._vertShakes = [];
	this._horzShakes = [];
	this._radShakes = [];
	this._zShakes = [];
};
//just so that there's redundancy for users
Game_Screen.prototype.clearAllShakes = function ()
{
	this.clearShakes();
}

Myth.SHK.Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function ()
{
	if ((this instanceof Scene_Battle) || (this instanceof Scene_Map && Myth.SHK.usingmv3d))
		return Myth.SHK.Scene_Base_update.call(this);

	if ($gameScreen != null)
	{
		if (!(this instanceof Scene_Map))
			$gameScreen.update();

		var shakeX = $gameScreen.shakeX();
		var shakeY = $gameScreen.shakeY();

		if (shakeX != NaN && shakeY != NaN)
		{
			var radial = $gameScreen.shakeRadial();
			if (radial)
			{
				var radX = Math.cos(radial.angle * Math.PI / 180) * radial.intensity;
				shakeX += radX;
				var radY = Math.sin(radial.angle * Math.PI / 180) * radial.intensity;
				shakeY += radY;
			}
			this.x = shakeX;
			this.y = shakeY;
		}
	}

	Myth.SHK.Scene_Base_update.call(this);
};

Myth.SHK.Spriteset_Battle_updatePosition = Spriteset_Battle.prototype.updatePosition;
Spriteset_Battle.prototype.updatePosition = function ()
{
	Myth.SHK.Spriteset_Battle_updatePosition.call(this);
	var shakeX = $gameScreen.shakeX();
	var shakeY = $gameScreen.shakeY();

	var radial = $gameScreen.shakeRadial();
	if (radial)
	{
		var radX = Math.cos(radial.angle * Math.PI / 180) * radial.intensity;
		shakeX += radX;
		var radY = Math.sin(radial.angle * Math.PI / 180) * radial.intensity;
		shakeY += radY;
	}

	this.x += shakeX;
	this.y += shakeY;
}


if (Myth.SHK.usingmv3d)
{
	//In MZ, for some reason, we need to wait several frames before shakes can happen on the map
	Myth.Util.MZCountDown = 30;

	var __mv3d_updateBlenders = mv3d.updateBlenders;
	mv3d.updateBlenders = function (reorient)
	{
		if (this.previousShakeX == undefined) this.previousShakeX = 0;
		if (this.previousShakeY == undefined) this.previousShakeY = 0;
		if (this.previousShakeZ == undefined) this.previousShakeZ = 0;

		__mv3d_updateBlenders.call(this, reorient);
		var shakeX = $gameScreen.shakeX();
		var shakeY = $gameScreen.shakeY();
		var shakeZ = $gameScreen.shakeZ();

		
		var radial = $gameScreen.shakeRadial();
		if (radial)
		{
			var radX = Math.cos(radial.angle * Math.PI / 180) * radial.intensity;
			shakeX += radX;
			var radY = Math.sin(radial.angle * Math.PI / 180) * radial.intensity;
			shakeY += radY;
		}

		if (Myth.Util.usingMZ)
		{
			if (Myth.Util.MZCountDown <= 0)
			{
				this.cameraNode.translate(this.util.YAxis, (shakeY - this.previousShakeY) / 48, 0);
				this.cameraNode.translate(this.util.XAxis, (shakeX - this.previousShakeX) / 48, 0);
				this.cameraNode.translate(this.util.ZAxis, (shakeZ - this.previousShakeZ) / 48, 0);
			}
			else
				Myth.Util.MZCountDown--;
		}
		else
		{
			this.cameraNode.translate(this.util["YAxis"], (shakeY - this.previousShakeY) / 48, 0);
			this.cameraNode.translate(this.util["XAxis"], (shakeX - this.previousShakeX) / 48, 0);
			this.cameraNode.translate(this.util["ZAxis"], (shakeZ - this.previousShakeZ) / 48, 0);
		}

		this.previousShakeX = shakeX;
		this.previousShakeY = shakeY;
		this.previousShakeZ = shakeZ;
	}
}