//=============================================================================
// MYTH_CGC_TurnStartPlus
//=============================================================================

/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.1.0 An extension to MYTH_CGC_CoreEngine that lets you change the Start of Turn Card Actions based on actor, class, equipment, etc
 * @url https://mythatelier.itch.io/card-game-combat
 *
 * @help
 *
 * ============================================================================
 * Overview
 * ============================================================================
 * 
 * With this plugin, you can use notetags to give actors unique Start of Turn
 * Card Actions. In addition to the actions specified in the Start of Turn and
 * Start of Battle notetags in the core plugin, notetags will add more Card
 * Actions on top of that.
 * 
 * ============================================================================
 * Actor, Class, Weapons, Armor, and State notetags
 * ============================================================================
 *
 * <Battle Start Actions>
 * action
 * action
 * </Battle Start Actions>
 * 
 * This will add Card Actions executed at the start of the first turn if the
 * party member is that Actor, that Class, is using that equipment, or
 * is affected by that state.
 * 
 * 
 * <Turn Start Actions>
 * action
 * action
 * </Turn Start Actions>
 * 
 * This will add Card Actions executed at the start of every turn after
 * the first if the party member is that Actor, that Class, is using that 
 * equipment, or is affected by that state.
 * 
 * 
 * Card Actions are executed in this order:
 * 1) The Battle/Turn Start Actions parameter in the core CGC plugin
 * 2) Actions added by notetag in the Actor
 * 3) Actions added in the Class
 * 4) Actions added in the Equipment, in the order they are equipped
 * 5) Actions added by states, ordered by State ID.
 *
 *
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.1.0 - Changed plugin name.
 * 
 * v1.0.1 - Updated for compatibility with CGC 1.5.6+
 *          Removed warning of incompatibility with MZ.
 *          Fixed Turn Start Actions not working inside Actor note tags
 * 
 * v1.0.0 - Finished plugin
 *
 */


BattleManager.getStartCardActions = function (actor)
{
	if ($gameTroop._turnCount >= 1)
	{
		return (actor.getAllTurnCardActions());
	}
	else
	{
		return (actor.getAllBattleCardActions());
	}
}


Game_Actor.prototype.getAllBattleCardActions = function ()
{
	var actorActions = $dataActors[this.actorId()]._battleActions;
	var classActions = this.currentClass()._battleActions;
	var equipActions = [];
	var equips = this.equips();
	for (var i = 0; i < equips.length; i++)
	{
		if (equips[i])
			equipActions[i] = equips[i]._battleActions;
	}

	var stateActions = [];
	var states = this.states();
	for (var i = 0; i < states.length; i++)
	{
		if (states[i])
			stateActions[i] = states[i]._battleActions;
	}

	var totalActions = "";
	totalActions += Myth.CGC.startOfBattleActions;
	if (actorActions && actorActions != "")
	{
		if (totalActions == "")
			totalActions += actorActions;
		else
			totalActions += "\n" + actorActions;
	}
	if (classActions && classActions != "")
	{
		if (totalActions == "")
			totalActions += classActions;
		else
			totalActions += "\n" + classActions;
	}
	for (var i = 0; i < equipActions.length; i++)
	{
		var eA = equipActions[i];
		if (eA && eA != "")
		{
			if (totalActions == "")
				totalActions += eA;
			else
				totalActions += "\n" + eA;
		}
	}
	for (var i = 0; i < stateActions.length; i++)
	{
		var sA = stateActions[i];
		if (sA && sA != "")
		{
			if (totalActions == "")
				totalActions += sA;
			else
				totalActions += "\n" + sA;
		}
	}
	return totalActions;
}

Game_Actor.prototype.getAllTurnCardActions = function ()
{
	var actorActions = $dataActors[this.actorId()]._turnActions;
	var classActions = this.currentClass()._turnActions;
	var equipActions = [];
	var equips = this.equips();
	for (var i = 0; i < equips.length; i++)
	{
		if (equips[i])
			equipActions[i] = equips[i]._turnActions;
	}

	var stateActions = [];
	var states = this.states();
	for (var i = 0; i < states.length; i++)
	{
		if (states[i])
			stateActions[i] = states[i]._turnActions;
	}

	var totalActions = "";
	totalActions += Myth.CGC.startOfTurnActions;
	if (actorActions && actorActions != "")
	{
		if (totalActions == "")
			totalActions += actorActions;
		else
			totalActions += "\n" + actorActions;
	}
		
	if (classActions && classActions != "")
	{
		if (totalActions == "")
			totalActions += classActions;
		else
			totalActions += "\n" + classActions;
	}
	for (var i = 0; i < equipActions.length; i++)
	{
		var eA = equipActions[i];
		if (eA && eA != "")
		{
			if (totalActions == "")
				totalActions += eA;
			else
				totalActions += "\n" + eA;
		}
	}
	for (var i = 0; i < stateActions.length; i++)
	{
		var sA = stateActions[i];
		if (sA && sA != "")
		{
			if (totalActions == "")
				totalActions += sA;
			else
				totalActions += "\n" + sA;
		}
	}
	return totalActions;
}



Myth.CGC.DataManager_isDatabaseLoadedTurnActions = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.DataManager_isDatabaseLoadedTurnActions.call(this)) return false;
	if (!Myth.loaded_CGCTurnActions)
	{
		DataManager.processTurnCardActionNotetags($dataActors);
		DataManager.processTurnCardActionNotetags($dataClasses);
		DataManager.processTurnCardActionNotetags($dataWeapons);
		DataManager.processTurnCardActionNotetags($dataArmors);
		DataManager.processTurnCardActionNotetags($dataStates);

		Myth.loaded_CGCTurnActions = true;
	}

	return true;
}

DataManager.processTurnCardActionNotetags = function (group)
{
	var startNote = /<Turn Start Actions?>/i;
	var endNote = /<\/Turn Start Actions?>/i;

	var startNote2 = /<Battle Start Actions?>/i;
	var endNote2 = /<\/Battle Start Actions?>/i;


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
				mode = 'turnActions';
				obj._turnActions = "";
			}
			else if (line.match(startNote2))
			{
				mode = 'battleActions';
				obj._battleActions = "";
			}
			else if (line.match(endNote) || line.match(endNote2))
			{
				mode = '';
			}
			else if (mode == 'turnActions')
			{
				line = line.trim();
				line = line.replace(/,/g, '`comma`');
				if (obj._turnActions == "")
					obj._turnActions = line.trim();
				else
					obj._turnActions += "\n" + line.trim();
			}
			else if (mode == 'battleActions')
			{
				line = line.trim();
				line = line.replace(/,/g, '`comma`');
				if (obj._battleActions == "")
					obj._battleActions = line.trim();
				else
					obj._battleActions += "\n" + line.trim();
			}
		}
	}
}