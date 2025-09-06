//=============================================================================
// MYTH_TurnBasedMovement.js                                                      
//=============================================================================


/*:
 *
 * @author Isiah Brighton
 * @plugindesc v1.1.0 Turns all map movement into a turn-based system
 *
 * 
 * @help
 *
 * =============================================================================
 *                                   Overview
 * =============================================================================
 * This plugin will make map movement turn-based similar to that of the Mystery 
 * Dungeon or Etrian Odyssey games. All events will wait for the player to move 
 * before moving themselves.
 * 
 *  If events are set to different speeds from the player they will move at
 *  different rates. For example, an event set to x2 Slower will move one time
 *  for every 2 moves the player makes, while an event set to x2 Faster will
 *  move two times for every 1 move the player makes, assuming the player's
 *  speed is set to Normal.
 * 
 * Events must have their movement Frequency set to 5: Highest, or else their
 * turns will be skipped if the player moves fast enough. For the same reason,
 * this plugin does not support player dashing. You will need another plugin 
 * to disable dashing.
 * 
 * Galv's Disable Dash plugin is free: 
 *     https://galvs-scripts.com/2016/05/24/mv-disable-dash/
 * 
 * When setting a Move Route for an event without the <TBM Free Move> tag,
 * ensure that 'Skip If Cannot Move' is unchecked.
 *
 * 
 * =============================================================================
 *                                Event Notetags
 * =============================================================================
 *
 * Inside an event's Note section, put: 
 *     <TBM Free Move>
 * This will allow the event to move freely without being affected by the turn-
 * based movement.
 * 
 * Events which never move do not need this notetag.
 * 
 * 
 * =============================================================================
 *                              Event Page Comments
 * =============================================================================
 * 
 * In addition to an event's Note section, you can also leave comments inside
 * an event's pages. The event will only have free move if its current active
 * page has the comment.
 *
 * The comment to leave is still:
 *     <TBM Free Move>
 *     
 * If you are using any event spawning plugin, use this system instead of
 * event notes for spawned events.
 * 
 * =============================================================================
 *                                 Script Calls
 * =============================================================================
 * 
 *     Myth.TBM.setMoveFree(true/false)
 * If passing 'true,' will disable turn-based movement and allow free movement
 * for everything. False will re-enable it. Useful for cutscenes.
 * 
 * 
 *     Myth.TBM.skipTurn($gamePlayer)
 * This will cause the player to pass their turn.
 * 
 *     Myth.TBM.skipTurn(this)
 * When set within a movement route set to move an event, this will cause the
 * event to pass their turn.
 * 
 * 
 * =============================================================================
 *   Version History
 * =============================================================================
 *
 * v1.1.0 - Changed plugin name
 *     - Added per-event page TBM settings.
 *     - Fixed crash when using spawned events.
 * 
 * v1.0.2 - Fixed bug where you can clip through walls after skipping turns.
 * 
 * v1.0.1 - Added compatibility with the following Movement Commands:
 *     -Jump...
 *     -All Turn commands
 * 
 * v1.0.0 - Finished plugin
 * 
 * =============================================================================
 *   Contact Information
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
 *
 */

var Imported = Imported || {};

var Myth = Myth || {};
Myth.TBM = Myth.TBM || {};
Myth.TBM.version = 1.0;

var parameters = PluginManager.parameters('MYTH_TurnBasedMovement');
	
//Myth.TBM.useStamina = eval(parameters['Use Stamina?']);



Myth.TBM.moveFree = false;


Myth.TBM.setMoveFree = function (moveFree)
{
	Myth.TBM.moveFree = moveFree;
	var events = $gameMap.events();
	if (moveFree)
	{
		for (var i = 0; i < events.length; i++)
		{
			var event = events[i];
			event._TBMtime = 0;
		}
		$gamePlayer._TBMtime = 0;
	}
	this.CheckAllMoved();

}

//This iterates through each event and finds out
//if the event can move.
//If no one can move, it "moves to the next turn" by decreasing 
//each event's time variable.
Myth.TBM.CheckAllMoved = function()
{
	var events = $gameMap.events();
	var size = events.length;
	var allMoved = true;
	for (var i = 0; (i < size) && (!allMoved); i++)
	{
		var thisEvent = events[i];
		if (thisEvent == null) continue;
		var thisTime = thisEvent._TBMtime;
		
		if ((thisTime < 1) && (thisEvent.isNearTheScreen()))
			allMoved = false;
	
	}
	
	var pTime = $gamePlayer._TBMtime;
	if (pTime < 1)
		allMoved = false;
	
	if (allMoved)
	{
		var someoneCanMove = false;
		do
		{
			for (var i = 0; (i < size); i++)
			{
				var thisEvent = events[i];
				if (thisEvent == null) continue;
				var thisTime = thisEvent._TBMtime;
				if ((thisTime > 0) && thisEvent.isNearTheScreen())
				{
					thisTime -= 1;
					if (thisTime <= 0)
						someoneCanMove = true;
				}
				thisEvent._TBMtime = thisTime;
			}
			pTime--;
			if (pTime <= 0)
				someoneCanMove = true;
			$gamePlayer._TBMtime = pTime;
			
		} while (someoneCanMove == false);
	}
	
};


//This function skips the turn of the event that calls it.
//Use Myth.TBM.skipTurn(this) from inside an event.
Myth.TBM.skipTurn = function(character)
{
	var isPlayer = false;
	if (character instanceof Game_Player)
		isPlayer = true;

	character._TBMtime += Myth.TBM.GetTimeLossFromMovementSpeed(character.moveSpeed());
	character._TBMstamina -= 1;
	character._skipping = true;

/*	if (isPlayer && Myth.TBM.useStamina)
		Myth.TBM.StaminAffectHealth(stamDec);*/

	
	Myth.TBM.CheckAllMoved();
};



 Myth.TBM.GetTimeLossFromMovementSpeed = function(movementSpeed)
{
	var timeLoss = 1;
	switch (movementSpeed)
	{
		case 6:
		timeLoss = 1; break;
		case 5:
		timeLoss = 2; break;
		case 4:
		timeLoss = 4; break;
		case 3:
		timeLoss = 8; break;
		case 2:
		timeLoss = 16; break;
		case 1:
		timeLoss = 32; break;
	}
	
	return (timeLoss);
}; 

//Main function.
//All movements call this, it handles the logic of putting the other functions
//together.
Myth.TBM.Main = function(character)
{
	var isPlayer = false;
	if (character instanceof Game_Player)
		isPlayer = true;
	
	if (character.isMovementSucceeded() && !(character instanceof Game_Follower))
	{

		var stam = character._TBMstamina
		var time = character._TBMtime;

		var stamDec = -1;
		var timePass = Myth.TBM.GetTimeLossFromMovementSpeed(character.moveSpeed());
		
		stam += stamDec;
		time += timePass;


		character._TBMstamina = stam;
		character._TBMtime = time;
/*		if (isPlayer && Myth.TBM.useStamina)
			Myth.TBM.StaminAffectHealth(stamDec);	*/
	}
};

//When you move while you have remaining stamina, you recover health
//if you have 0 stamina, you instead take damage
//The formulas are managed here, and can be changed if necessary
Myth.TBM.StaminAffectHealth = function(stamDec)
{
	var stam = $gamePlayer._TBMstamina;
	
	if (stam >= 0)
	{
		$gameParty.members().forEach(function(m)
		{
			//Recover health formula
			var d = Math.round(m.mhp * 0.01 * -stamDec);
			var KO = false;
			Game_Interpreter.prototype.changeHp.call(this, m, d, KO);
		});
	}
	else
	{
		$gamePlayer._TBMstamina = 0;
		$gameParty.members().forEach(function(m)
		{
			//take damage formula
			var d = Math.round(m.mhp * -0.01);
			var KO = true;
			Game_Interpreter.prototype.changeHp.call(this, m, d, KO);
		});
		
		
		$gameScreen.startFlash([255, 0, 0, 70], 20);
	}
};

(function()
{	
	var _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
	Game_CharacterBase.prototype.moveStraight = function(direction) 
	{
		var time = this._TBMtime || 0;

		var instanceType = 'event';
		if (this instanceof Game_Player)
			instanceType = 'player';
		else if (this instanceof Game_Follower)
			instanceType = 'follower';
		
		if (time < 1)
		{
			_Game_CharacterBase_moveStraight.call(this, direction);

			var moveFree = Myth.TBM.moveFree;

			if (!moveFree && instanceType == 'event')
			{
				moveFree = this.moveFree;
				var dataEvent = $dataMap.events[this.eventId()]
				if (dataEvent)
					moveFree = dataEvent.meta["TBM Free Move"];
			}
				

			if (!moveFree)
			{
				Myth.TBM.Main(this);
				Myth.TBM.CheckAllMoved();
			}
		}
	}

	var _Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
	Game_CharacterBase.prototype.jump = function (xPlus, yPlus)
	{
		var time = this._TBMtime || 0;

		var instanceType = 'event';
		if (this instanceof Game_Player)
			instanceType = 'player';
		else if (this instanceof Game_Follower)
			instanceType = 'follower';

		if (time < 1)
		{
			_Game_CharacterBase_jump.call(this, xPlus, yPlus);

			var moveFree = Myth.TBM.moveFree;
			if (!moveFree && instanceType == 'event')
			{
				moveFree = this.moveFree;
				var dataEvent = $dataMap.events[this.eventId()]
				if (dataEvent)
					moveFree = dataEvent.meta["TBM Free Move"];
			}
			
			if (!moveFree)
			{
				Myth.TBM.Main(this);
				Myth.TBM.CheckAllMoved();
			}
		}
	}

	
	var _Game_CharacterBase_setMovementSuccess = Game_CharacterBase.prototype.setMovementSuccess;
	Game_CharacterBase.prototype.setMovementSuccess = function(success) 
	{
		var time = this._TBMtime;
		if (time >= 1 )
		{
			if (this._skipping)
			{
				this._skipping = false;
			}
			else
				success = false;
		}
		_Game_CharacterBase_setMovementSuccess.call(this, success);
	}

	var _Game_CharacterBase_isMovementSucceeded = Game_CharacterBase.prototype.isMovementSucceeded;
	Game_CharacterBase.prototype.isMovementSucceeded = function (x, y)
	{
		if (this._skipping)
		{
			this._skipping = false;
		}

		var isSucceeded = _Game_CharacterBase_isMovementSucceeded.call(this, x, y);
		return isSucceeded;

	}

	var _Game_CharacterBase_initMemebers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function ()
	{
		_Game_CharacterBase_initMemebers.call(this);
		this._TBMtime = 0;
		this._TBMstamina = 0;
		this._skipping = false;
	}

	var _Game_CharacterBase_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
	Game_Character.prototype.updateRoutineMove = function ()
	{
		if (this._TBMtime >= 1) return;

		_Game_CharacterBase_updateRoutineMove.call(this);
	};

	var _Game_Event_setupPage = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function ()
	{
		_Game_Event_setupPage.call(this);
		var page = this.page(); if (!page) return;
		var list = this.list();
		if (!list) return;

		this.moveFree = false;
		for (var i = 0; i < list.length; i++)
		{
			var item = list[i];
			if (item.code == 108 || item.code == 408)
			{
				var param = item.parameters[0];
				if (param.match(/<?tbm free ?move>?/i))
				{
					this.moveFree = true;
				}
			}
		}
	}
	
})();