//=============================================================================
// MYTH_UTIL_WindowResizer
//=============================================================================
/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc This is just to used to make sure our MV and MZ projects have parity. Please replace this with another plugin that can change window size properly.
 * 
 * @param resolution
 * @text Screen Resolution
 * @type select
 * @option 1280x720
 * @option 1366x768
 * @option 1600x900
 * @option 1920x1080
 * @option 2560x1440
 * @default 1600x900
 * @desc The resolution of the window.
 */


var Myth = Myth || {};
Myth.Util = Myth.Util || {};

Myth.Util.Parameters = PluginManager.parameters('MYTH_UTIL_WindowResizer');

Myth.Util.resolution = Myth.Util.Parameters.resolution || "1600x900";

Myth.Util.screenWidth = Number(Myth.Util.resolution.split('x')[0]);
Myth.Util.screenHeight = Number(Myth.Util.resolution.split('x')[1]);

SceneManager._screenWidth = Myth.Util.screenWidth;
SceneManager._screenHeight = Myth.Util.screenHeight;
SceneManager._boxWidth = Myth.Util.screenWidth;
SceneManager._boxHeight = Myth.Util.screenHeight;

Myth.Util.resizeToScale = function (sprite)
{
	var ratio = 1 / (sprite.bitmap.width / Graphics.boxWidth);
	sprite.scale.x = ratio;
	sprite.scale.y = ratio;
}


//MV
Myth.Util.SceneManager_initNwjs = SceneManager.initNwjs;
SceneManager.initNwjs = function ()
{
	Myth.Util.SceneManager_initNwjs.call(this);

	if (Utils.isNwjs())
	{
		var dw = Myth.Util.screenWidth - window.innerWidth;
		var dh = Myth.Util.screenHeight - window.innerHeight;
		window.moveBy(-dw / 2, -dh / 2);
		window.resizeBy(dw, dh);
	}
}


//MZ
Scene_Boot.prototype.resizeScreen = function ()
{
	const screenWidth = Myth.Util.screenWidth;
	const screenHeight = Myth.Util.screenHeight;
	Graphics.resize(screenWidth, screenHeight);
	this.adjustBoxSize();
	this.adjustWindow();
};
Scene_Boot.prototype.adjustBoxSize = function ()
{
	const uiAreaWidth = Myth.Util.screenWidth;
	const uiAreaHeight = Myth.Util.screenHeight;
	const boxMargin = 4;
	Graphics.boxWidth = uiAreaWidth - boxMargin * 2;
	Graphics.boxHeight = uiAreaHeight - boxMargin * 2;
};


Myth.Util.Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function ()
{
	Myth.Util.Spriteset_Battle_createBattleback.call(this);
	this._back1Sprite.bitmap.addLoadListener(() =>
	{
		Myth.Util.resizeToScale(this._back1Sprite);
		this._back1Sprite.x = 0;
		this._back1Sprite.y = 0;
	});
	this._back2Sprite.bitmap.addLoadListener(() =>
	{
		Myth.Util.resizeToScale(this._back2Sprite);
		this._back2Sprite.x = 0;
		this._back2Sprite.y = 0;
	});
};

Spriteset_Battle.prototype.locateBattleback = function ()
{

}

Myth.Util.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function (battler)
{
	Myth.Util.Sprite_Enemy_setBattler.call(this, battler);

	if ($dataSystem.optSideView)
	{
		this.setHome(battler.screenX(), battler.screenY() + (Myth.Util.screenHeight * 0.2));
	}
	else
	{
		this.setHome(battler.screenX() + (Myth.Util.screenWidth * 0.25), battler.screenY() + (Myth.Util.screenHeight * 0.07));
	}
};

Sprite_Actor.prototype.setActorHome = function (index) 
{
	this.setHome((Myth.Util.screenWidth * 0.75) + index * 48, (Myth.Util.screenHeight * 0.5) + index * 64);
};

Myth.Util.Scene_Title_centerSprite = Scene_Title.prototype.centerSprite;
Scene_Title.prototype.centerSprite = function (sprite)
{
	Myth.Util.Scene_Title_centerSprite.call(this, sprite);
	Myth.Util.resizeToScale(sprite);
}