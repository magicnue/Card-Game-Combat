//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemBTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x5130b4=_0x292a;(function(_0x421220,_0x4359e6){const _0x1d58ed=_0x292a,_0x28f876=_0x421220();while(!![]){try{const _0x38dfbb=-parseInt(_0x1d58ed(0x3e6))/0x1+parseInt(_0x1d58ed(0x3d0))/0x2*(-parseInt(_0x1d58ed(0x29a))/0x3)+parseInt(_0x1d58ed(0x2c6))/0x4+-parseInt(_0x1d58ed(0x1d2))/0x5+parseInt(_0x1d58ed(0x3cc))/0x6*(-parseInt(_0x1d58ed(0x200))/0x7)+-parseInt(_0x1d58ed(0x196))/0x8+parseInt(_0x1d58ed(0x412))/0x9;if(_0x38dfbb===_0x4359e6)break;else _0x28f876['push'](_0x28f876['shift']());}catch(_0x4b978d){_0x28f876['push'](_0x28f876['shift']());}}}(_0x8b09,0x70cb1));function _0x8b09(){const _0x597a3a=['StatusPredictFmt','_actorCommandWindow','textSizeEx','qqNUR','initHomePositions','round','Actor','commandCancel','createTurnOrderBTBGraphicType','resetFontSettings','setBlendColor','PositiveColor','OVcAe','includes','sxVZp','windowRect','pop','1357844PafHAw','Game_Action_allowRandomSpeed','Game_BattlerBase_appear','match','BattleSystemBTB','MaxActions','textWidth','_graphicFaceIndex','isInputting','createActorCommandWindowBTB','SubjectDistance','containerPosition','isActiveTpb','setItem','loadSystem','Enemy-%1-%2','duKHP','Game_Action_speed','createTestBitmap','GIcmo','BravePointRegenBase','_surprise','guard','Show_0_BP_Cost','updateBattleContainerOrder','getBattleSystem','kVhYA','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_position','updatePadding','BxysE','toUpperCase','loadEnemy','height','canUse','_btbTurnOrderVisible','Game_BattlerBase_canUse','_tempBattler','%1\x20%2\x20%3','createActorCommandWindow','traitObjects','Game_Battler_useItem','padding','sort','svBattlerName','Enemy','CMWXi','SpriteThin','drawItemStatusXPStyle','_bypassAiValidCheck','DisplayOffsetX','Armor-%1-%2','yoGLJ','filter','ScreenBuffer','itemRect','calculateTargetPositions','%1AnimationID','cursorPageup','_fadeTarget','KQWtu','KUled','removeActionBattlersBTB','FLuDp','Game_Enemy_makeActions','singleSkill','ActionCurrent','#000000','description','ovZyj','BhSXL','ARRAYNUM','_fullHeight','BtbTurnOrderActorIcon','onTurnEndBTB','top','createTurnOrderBTBGraphicFaceIndex','BattleManager_isTpb','isAppeared','updateLetter','qrcxb','JsBravePointsTarget','pTfMa','actor','indexOf','payBravePointsCost','LVTut','showBravePoints','loseBravePoints','ImdtU','ShowEnemyBrave','isBattleItemWindowBTB','addInnerChild','Window_Selectable_cursorPagedown','addBraveCommand','setHandler','updateTurnOrderBTB','PPmBM','SystemTurnOrderVisibility','isEnemy','MaxVertSprites','Game_BattlerBase_canInput','regenerateBravePoints','right','BattleManager_startTurn','queueBraveAnimationsBTB','setHue','Game_Battler_onBattleStart','rhbhI','_isBattleOver','changeFaceGraphicBitmap','BravePointRegen','JTWff','BravePointsIcon','ItemScene','members','updateGraphicHue','_itemIDs','update','eRxvR','battleEnd','left','clearActions','LwfPB','gradientFillRect','formFlexCombo','BtbTurnOrderClearActorGraphic','startActionBTB','BattleLayout','TurnOrderBTBGraphicFaceName','JJHmX','ItemQuantityFmt','brave','getActionFusionRecipeItems','cKtpR','btbBravePointsFull','Game_Action_setItem','hYDHE','_homeX','FaceIndex','HideBravePointCost','svactor','ReduceShownBPCost','bravePoints','eBxVp','ceil','EVAL','MinBravePointsHardCap','IpFVv','startAction','CenterHorz','createBackgroundSprite','_btbTurnOrderFaceIndex','SwNEg','IconIndex','setup','destroy','setBravePoints','boxHeight','compareBattlerSprites','rVTpl','TurnOrderBTBGraphicFaceIndex','concat','_targetHomeX','CannotBrave','updateVisibility','Actor-%1-%2','DrawActionCountersJS','REcJQ','oKBVq','BravePointItemCost','isSkill','_graphicType','joVjM','_positionTargetY','SRoUo','_items','BattleManager_startInput','Scene_Battle_onDisabledPartyCommandSelection','parameters','SIqzv','ItemQuantityFontSize','_btbTurnOrderFaceName','waitForAnimation','_btbTurnOrderGraphicType','Game_Unit_makeActions','battlerHue','oaBMb','%1_display','FaceName','AllowRandomSpeed','Wjeie','return\x200','RepositionLogWindow','test','create','tkYOz','NeutralColor','_phase','Cancel','pIgTj','RepositionTopHelpX','EnemyMultiAction','defaultPosition','_ogWindowLayerY','applyItemBattleSystemBTBUserEffect','registerCommand','createBattlerSprites','ZPnBZ','bravePointsCost','BravePointCost','GlHAZ','BraveAnimation','ActionSlot','cannotFusionNotetagBTB','close','battleLayoutStyle','oAZRw','HceZE','call','drawItemStatusListStyle','currentSymbol','_backgroundSprite','onBattleStart','currentExt','Brave','faceIndex','faceHeight','_isAppeared','MaxHorzSprites','Game_BattlerBase_hide','Weapon-%1-%2','mainFontFace','qvepH','updateHomePosition','UpdateFrames','shift','QlsFf','exit','sSKJc','skillCostSeparator','%1SystemBorder','isForFriend','attackSkillId','FolIB','setBTBGraphicIconIndex','createLetterSprite','getTotalActionFusionRecipes','children','btbBraveCommand','makeAdditionalCostTextBTB','ParseAllNotetags','ActorActionFusions','index','optDisplayTp','NVXMz','allowRandomSpeed','loadSvEnemy','inputtingAction','name','BravePointSetUser','subject','297372aiQIsk','JsBravePointsUser','changeIconGraphicBitmap','_helpWindow','3034Jcwcek','clearTurnOrderBTBGraphics','CMxHd','applyItemUserEffect','hideBraveTrait','BravePointSetTarget','fillRect','BravePointPredictedCost','lCFlq','maxBattleMembers','icon','_actor','join','kAGKL','modifyBTBActionCounterSprite','_windowLayer','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','canBrave','BattleManager_battleSys','createBattlerRect','Window_BattleLog_startAction','center','223874GclSnt','_index','initialize','zkhaT','createKeyJS','ConvertParams','Window_Base_close','Mechanics','max','_btbItemStrictFusion','ODKkO','commandBrave','btbParseFusionData','BattleManager_makeActionOrders','bitmapWidth','setAttack','addCommand','SKZUO','BravePointAlterUser','removeActionFusionIngredients','getColor','makeActionTimes','applyBattleSystemBTBUserEffect','GmABB','\x5cI[%1]%2','YKAxB','parse','_letter','jttEY','LtlMH','_graphicIconIndex','_positionDuration','StatusDisplayFmt','_homeDuration','Njqxi','guardSkillId','maxBravePoints','processActionFusionsBTB','btbRegisterFusions','needsSelection','qgcML','_fadeDuration','note','requestRefresh','14327343VrukHo','getSkillIdWithName','itemLineRect','drawText','amzZc','dmMPk','makeDeepCopy','fontSize','rKOGL','_subject','updateGraphic','lpULT','addChildAt','yIGMs','isSideView','_isAlive','_unit','_containerWidth','makeCommandList','getOffsetX_BTB','getOffsetY_BTB','createInitialPositions','setText','createTurnOrderBTBGraphicIconIndex','btbActionCurrent','Game_Battler_performCollapse','BattleManager_isActiveTpb','checkTargetPositions','Window_Base_drawItemNumber','TQITb','kVebb','canProcessActionFusionsBTB','wlziC','currentAction','dylPN','RegExp','SpriteLength','makeActions','btbPaySkillFusionCosts','Parse_Notetags_BravePointsUserJS','map','TurnOrderBTBGraphicType','BorderThickness','min','bitmapHeight','TIolt','removeActor','isAlive','sVIKd','speed','ShowCommand','STR','%1Mirror','hasSvBattler','checkActionsBTB','startInput','BtbTurnOrderEnemyFace','Window_BattleStatus_drawItemStatusXPStyle','EnemyBattlerIcon','Game_Battler_makeActionTimes','createBorderSprite','updateOpacity','select','commandCancelBTB','\x5cI[%1]','Settings','_logWindow','CalcActionSpeedJS','hQKaj','_graphicFaceName','BTB_MIN_BRAVEPOINTS_DEFAULT','BTB_MAX_BRAVEPOINTS_HARD_CAP','BGPOK','ShowFacesListStyle','predictedBravePoints','btbMatchesCurrentFusionAction','Game_System_initialize','updateSelectionEffect','cancelBrave','mPTiD','repositionLogWindowBTB','setBattleSystemBTBTurnOrderVisible','enemy','canAddBraveCommand','appear','YcRgo','commandStyle','Window_ActorCommand_addGuardCommand','text','_scrollX','btbPayItemFusionCosts','_armors','onBattleStartBTB','calcRegenBravePoints','waitCount','BraveAnimationID','format','clear','uhgzu','canPayActionFusionCombination','wrqLX','IBXua','substring','guvoQ','_btbTurnOrderWindow','battlerName','trim','5580552YXkoDH','selectNextCommand','KdPWm','MaxBravePointsHardCap','startFade','BravePointAlterTarget','itemRectPortraitBTB','_targetHomeY','cannotBraveTrait','%1-%2','Window_ActorCommand_makeCommandList','checkPosition','bottom','iconWidth','clamp','Game_Action_applyItemUserEffect','onTurnEnd','makeSpeed','numActions','svActorVertCells','BtbTurnOrderClearEnemyGraphic','showNormalAnimation','yDkig','MRrNx','drawItemNumberBTB','drawTextEx','MHsxD','some','status','process_VisuMZ_BattleSystemBTB_Notetags','gainBravePoints','process_VisuMZ_BattleSystemBTB','changeSvActorGraphicBitmap','bOrzO','General','dHeQt','Scene_Boot_onDatabaseLoaded','DisplayPosition','HMNQr','Window_Help_setItem','Yepsz','OAFqs','onDisabledPartyCommandSelection','BattleManager_startAction','isSTB','aScAg','createChildren','ARRAYSTRUCT','sortActionOrdersBTB','DWJos','IILtK','contents','BtbTurnOrderActorFace','updateSidePosition','ShowCostForGuard','canActionFusionWithBTB','edjEn','NUM','oXUAS','_turnOrderInnerSprite','688975ndidFO','FusionStrict','KTTTR','ParseItemNotetags','initMembers','btbBravePointsIcon','createAllWindows','JGpmK','byHvC','Class-%1-%2','bind','BTB_MAX_BRAVEPOINTS_DEFAULT','createTurnOrderBTBGraphicFaceName','_actionInputIndex','battler','HIsPP','_actions','_containerHeight','Item-%1-%2','zQwpN','MaxActionsDefault','BTB','Game_Battler_onTurnEnd','faceWidth','drawActorBravePoints','_ogWindowLayerX','visible','Window','numItems','_btbSkillFlexFusion','_statusWindow','fMDmx','makeMultiActionsBTB','MaxBravePoints','EnemyBattlerFaceName','Window_Selectable_cursorPageup','refreshStatusBTB','_graphicHue','isHorz','Window_BattleStatus_drawItemStatusListStyle','splice','_btbItemFlexFusion','containerWindow','performCollapse','_scrollY','sDBkp','56tPyFSh','Window_Base_makeAdditionalSkillCostText','recalculateHome','blt','_weapons','slice','Scene_Battle_createActorCommandWindow','getActionFusionCombinationsBTB','xbgBK','QwzxV','BravePointsAbbr','removeChild','CjazG','refresh','ARRAYSTR','svActorHorzCells','%1BgColor2','_skillIDs','BravePointSkillCost','Show_1_BP_Cost','_plural','xKmhM','braveAnimationTimes','faceName','duXVT','BTB_MAX_ACTIONS_HARD_CAP','WaitFrames','CannotFusion','setActionFusionBTB','_actionBattlers','push','active','isSkipPartyCommandWindow','\x5cC[%1]%2\x5cC[0]','YLhqm','isActor','performBrave','isTpb','Game_BattlerBase_canGuard','RepositionTopHelpY','%1Mute','loadFace','addChild','createBTBTurnOrderWindow','ActorBattlerIcon','FUNC','isBattleSystemBTBTurnOrderVisible','_homeY','remove','Actors','clearRect','maxBraveActions','%1BgColor1','HMboP','SkvpY','makeAdditionalSkillCostText','NdXOY','_scene','cursorPagedown','face','Enemies','isUsePageUpDnShortcutBTB','width','addGuardCommand','BTB_MAX_ACTIONS_DEFAULT','BnDFt','_actionFusionRecipe','_letterSprite','_braveStartupAnimation','ItemsEquipsCore','constructor','MAqKd','canGuard','prototype','_btbActionSprite','initBattleSystemBTB','ifXAA','cancel','updatePosition','qLDOo','getActionFusionRecipeSkills','onDatabaseLoaded','EnemyBattlerFaceIndex','AtYOm','fontFace','EnemyBattlerType','Game_Actor_makeActions','isDrawItemNumber','aoRPg','Window_Selectable_select','canInput','GrhCH','destroyBTBActionCounters','BravePointCostFmt','anchor','createGraphicSprite','OrBwQ','QSGLF','useItemBTB','addLoadListener','RepositionTopForHelp','isTurnBased','createBTBActionCounters','_bravePoints','makeActionOrders','_turnOrderContainer','BattleCore','_graphicSv','BravePointStartFavor','ChySS','iconHeight','CancelAnimationID','btbCostFormat','split','qqeHE','EnableFusion','ShowCostForAttack','floor','processUpdateGraphic','Game_Action_setSkill','NSgbB','%1_align','attack','_btbTurnOrderIconIndex','_graphicSprite','reduceBrave','repeat','minBravePoints','ParseSkillNotetags','changeEnemyGraphicBitmap','setGuard','HideBrave','xuVQU','ackQG','length','getAlignmentBTB','IqJmU','isSceneBattle','_targetIndex','_guardUnleash','BraveShortcuts','requestFauxAnimation','MaxActionsHardCap','BTB_MIN_BRAVEPOINTS_HARD_CAP','qwIXq','Game_Party_removeActor','NegativeColor','_positionTargetX','MImFj','EnemyActionFusions','%1_offsetX','bitmap','modifyBTBActionCounterSprite_Fallback','FusionFlex','27whnVEO','process_VisuMZ_BattleSystemBTB_JS','item','isBTB','_graphicEnemy','setSkill','opacity','btbActionSlot','DRhrq','_blendColor','cwvUK','BravePointsFull','Skill-%1-%2','TurnOrderBTBGraphicIconIndex','%1BorderColor','showBraveAnimationBTB','EnemyBattlerFontSize','checkOpacity','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','lineHeight','BravePointsRegenAlive','btbBravePointsAbbr','applyBattleItemWindowBTB','Scene_Battle_createAllWindows','State-%1-%2','CGKbE','OrderDirection'];_0x8b09=function(){return _0x597a3a;};return _0x8b09();}var label=_0x5130b4(0x2ca),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5130b4(0x2fb)](function(_0x2c779c){const _0xb5172=_0x5130b4;return _0x2c779c[_0xb5172(0x1b2)]&&_0x2c779c[_0xb5172(0x30a)][_0xb5172(0x2c2)]('['+label+']');})[0x0];VisuMZ[label][_0x5130b4(0x16c)]=VisuMZ[label][_0x5130b4(0x16c)]||{},VisuMZ[_0x5130b4(0x3eb)]=function(_0x1f81b2,_0x5e06c4){const _0x25747e=_0x5130b4;for(const _0x234dac in _0x5e06c4){if(_0x234dac[_0x25747e(0x2c9)](/(.*):(.*)/i)){const _0x560529=String(RegExp['$1']),_0x2a6f19=String(RegExp['$2'])[_0x25747e(0x2e5)]()[_0x25747e(0x195)]();let _0x17b312,_0x110fd5,_0x5d0827;switch(_0x2a6f19){case _0x25747e(0x1cf):_0x17b312=_0x5e06c4[_0x234dac]!==''?Number(_0x5e06c4[_0x234dac]):0x0;break;case _0x25747e(0x30d):_0x110fd5=_0x5e06c4[_0x234dac]!==''?JSON['parse'](_0x5e06c4[_0x234dac]):[],_0x17b312=_0x110fd5['map'](_0x45fbcc=>Number(_0x45fbcc));break;case _0x25747e(0x358):_0x17b312=_0x5e06c4[_0x234dac]!==''?eval(_0x5e06c4[_0x234dac]):null;break;case'ARRAYEVAL':_0x110fd5=_0x5e06c4[_0x234dac]!==''?JSON[_0x25747e(0x400)](_0x5e06c4[_0x234dac]):[],_0x17b312=_0x110fd5['map'](_0x50f3eb=>eval(_0x50f3eb));break;case'JSON':_0x17b312=_0x5e06c4[_0x234dac]!==''?JSON[_0x25747e(0x400)](_0x5e06c4[_0x234dac]):'';break;case'ARRAYJSON':_0x110fd5=_0x5e06c4[_0x234dac]!==''?JSON[_0x25747e(0x400)](_0x5e06c4[_0x234dac]):[],_0x17b312=_0x110fd5[_0x25747e(0x153)](_0x37c43c=>JSON[_0x25747e(0x400)](_0x37c43c));break;case _0x25747e(0x22d):_0x17b312=_0x5e06c4[_0x234dac]!==''?new Function(JSON['parse'](_0x5e06c4[_0x234dac])):new Function(_0x25747e(0x386));break;case'ARRAYFUNC':_0x110fd5=_0x5e06c4[_0x234dac]!==''?JSON['parse'](_0x5e06c4[_0x234dac]):[],_0x17b312=_0x110fd5[_0x25747e(0x153)](_0x511ca6=>new Function(JSON['parse'](_0x511ca6)));break;case _0x25747e(0x15e):_0x17b312=_0x5e06c4[_0x234dac]!==''?String(_0x5e06c4[_0x234dac]):'';break;case _0x25747e(0x20e):_0x110fd5=_0x5e06c4[_0x234dac]!==''?JSON[_0x25747e(0x400)](_0x5e06c4[_0x234dac]):[],_0x17b312=_0x110fd5[_0x25747e(0x153)](_0x3f93e0=>String(_0x3f93e0));break;case'STRUCT':_0x5d0827=_0x5e06c4[_0x234dac]!==''?JSON[_0x25747e(0x400)](_0x5e06c4[_0x234dac]):{},_0x17b312=VisuMZ['ConvertParams']({},_0x5d0827);break;case _0x25747e(0x1c5):_0x110fd5=_0x5e06c4[_0x234dac]!==''?JSON['parse'](_0x5e06c4[_0x234dac]):[],_0x17b312=_0x110fd5[_0x25747e(0x153)](_0x3c9f02=>VisuMZ[_0x25747e(0x3eb)]({},JSON[_0x25747e(0x400)](_0x3c9f02)));break;default:continue;}_0x1f81b2[_0x560529]=_0x17b312;}}return _0x1f81b2;},(_0x6f2432=>{const _0x386780=_0x5130b4,_0x197e7e=_0x6f2432['name'];for(const _0x4a3164 of dependencies){if(!Imported[_0x4a3164]){alert(_0x386780(0x2ac)[_0x386780(0x18b)](_0x197e7e,_0x4a3164)),SceneManager[_0x386780(0x3b4)]();break;}}const _0x5bc96e=_0x6f2432[_0x386780(0x30a)];if(_0x5bc96e[_0x386780(0x2c9)](/\[Version[ ](.*?)\]/i)){if(_0x386780(0x15b)!==_0x386780(0x2a4)){const _0x55ed43=Number(RegExp['$1']);if(_0x55ed43!==VisuMZ[label]['version']){if(_0x386780(0x278)!==_0x386780(0x396))alert(_0x386780(0x3e0)[_0x386780(0x18b)](_0x197e7e,_0x55ed43)),SceneManager[_0x386780(0x3b4)]();else{const _0x57b8ce=new _0x46350c(this);_0x57b8ce[_0x386780(0x29f)](_0x5d3b53),_0x57b8ce[_0x386780(0x2f7)]=!![],this['_actions'][_0x386780(0x21e)](_0x57b8ce);}}}else _0x39e476['push'](_0x5b30fa+'-'+_0x15c4a7[_0x399d48]),_0x176f40(_0x3ec2cf+'-'+_0x1df269[_0x26a172],_0x113185[_0x386780(0x205)](_0xefc9f1+0x1));}if(_0x5bc96e[_0x386780(0x2c9)](/\[Tier[ ](\d+)\]/i)){if('GMebD'!==_0x386780(0x247)){const _0x57c1a6=Number(RegExp['$1']);if(_0x57c1a6<tier){if('SYMwa'===_0x386780(0x40e)){_0x544f4f=(_0x2d3cb4(_0x378d19)||'')[_0x386780(0x195)]();const _0x4f229c=/^\d+$/['test'](_0x213298);_0x4f229c?_0x3e5d8c[_0x386780(0x21e)](_0x45ca80(_0x4c194d)):_0x47a9e5['push'](_0x5e2d34[_0x386780(0x413)](_0x5ec518));}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x386780(0x18b)](_0x197e7e,_0x57c1a6,tier)),SceneManager[_0x386780(0x3b4)]();}else'quLZv'===_0x386780(0x336)?_0x475fec+=_0x57c800(_0x61229e['$1']):tier=Math[_0x386780(0x3ee)](_0x57c1a6,tier);}else _0x33d1b8+=_0xca499d(_0x2c944a['$1']);}VisuMZ[_0x386780(0x3eb)](VisuMZ[label][_0x386780(0x16c)],_0x6f2432[_0x386780(0x379)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x5130b4(0x3c9)],_0x5130b4(0x30f),_0x47647f=>{const _0x2eae10=_0x5130b4;VisuMZ['ConvertParams'](_0x47647f,_0x47647f);const _0x9422f8=_0x47647f[_0x2eae10(0x231)],_0xb5c026=_0x47647f[_0x2eae10(0x360)];for(const _0x12d9f4 of _0x9422f8){if(_0x2eae10(0x35a)===_0x2eae10(0x24f))_0x132c3d[_0x2eae10(0x239)][_0x2eae10(0x27d)]();else{const _0x4460c4=$gameActors[_0x2eae10(0x319)](_0x12d9f4);if(!_0x4460c4)continue;_0x4460c4[_0x2eae10(0x37e)]='icon',_0x4460c4[_0x2eae10(0x27b)]=_0xb5c026;}}}),PluginManager['registerCommand'](pluginData['name'],_0x5130b4(0x1ca),_0x5884de=>{const _0x46c7e9=_0x5130b4;VisuMZ[_0x46c7e9(0x3eb)](_0x5884de,_0x5884de);const _0x4cf729=_0x5884de[_0x46c7e9(0x231)],_0x2f5586=_0x5884de['FaceName'],_0x2b9ec8=_0x5884de[_0x46c7e9(0x351)];for(const _0x43f908 of _0x4cf729){const _0x185248=$gameActors[_0x46c7e9(0x319)](_0x43f908);if(!_0x185248)continue;_0x185248[_0x46c7e9(0x37e)]='face',_0x185248[_0x46c7e9(0x37c)]=_0x2f5586,_0x185248[_0x46c7e9(0x35e)]=_0x2b9ec8;}}),PluginManager[_0x5130b4(0x394)](pluginData[_0x5130b4(0x3c9)],_0x5130b4(0x344),_0x3383d0=>{const _0x30083a=_0x5130b4;VisuMZ[_0x30083a(0x3eb)](_0x3383d0,_0x3383d0);const _0xeb6949=_0x3383d0['Actors'];for(const _0x2edd30 of _0xeb6949){const _0x16582d=$gameActors[_0x30083a(0x319)](_0x2edd30);if(!_0x16582d)continue;_0x16582d['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x5130b4(0x394)](pluginData[_0x5130b4(0x3c9)],'BtbTurnOrderEnemyIcon',_0x1ab3fb=>{const _0x5df092=_0x5130b4;VisuMZ[_0x5df092(0x3eb)](_0x1ab3fb,_0x1ab3fb);const _0x11dac2=_0x1ab3fb[_0x5df092(0x23c)],_0x11d5b3=_0x1ab3fb[_0x5df092(0x360)];for(const _0x197636 of _0x11dac2){const _0x12ce31=$gameTroop[_0x5df092(0x339)]()[_0x197636];if(!_0x12ce31)continue;_0x12ce31['_btbTurnOrderGraphicType']='icon',_0x12ce31[_0x5df092(0x27b)]=_0x11d5b3;}}),PluginManager['registerCommand'](pluginData[_0x5130b4(0x3c9)],_0x5130b4(0x163),_0x5e69d5=>{const _0x45ee2f=_0x5130b4;VisuMZ[_0x45ee2f(0x3eb)](_0x5e69d5,_0x5e69d5);const _0x24e6bb=_0x5e69d5[_0x45ee2f(0x23c)],_0x1fccb2=_0x5e69d5[_0x45ee2f(0x383)],_0x3031d9=_0x5e69d5[_0x45ee2f(0x351)];for(const _0x30957b of _0x24e6bb){const _0x16d49c=$gameTroop[_0x45ee2f(0x339)]()[_0x30957b];if(!_0x16d49c)continue;_0x16d49c[_0x45ee2f(0x37e)]='face',_0x16d49c['_btbTurnOrderFaceName']=_0x1fccb2,_0x16d49c[_0x45ee2f(0x35e)]=_0x3031d9;}}),PluginManager[_0x5130b4(0x394)](pluginData[_0x5130b4(0x3c9)],_0x5130b4(0x1aa),_0x6d16b4=>{const _0x16b300=_0x5130b4;VisuMZ[_0x16b300(0x3eb)](_0x6d16b4,_0x6d16b4);const _0x40d849=_0x6d16b4['Enemies'];for(const _0x25900b of _0x40d849){const _0x55bc71=$gameTroop[_0x16b300(0x339)]()[_0x25900b];if(!_0x55bc71)continue;_0x55bc71[_0x16b300(0x3d1)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x5130b4(0x328),_0x457c90=>{const _0x19952f=_0x5130b4;VisuMZ[_0x19952f(0x3eb)](_0x457c90,_0x457c90);const _0x1ab9fd=_0x457c90['Visible'];$gameSystem[_0x19952f(0x17c)](_0x1ab9fd);}),VisuMZ['BattleSystemBTB'][_0x5130b4(0x14e)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x1ba)]=Scene_Boot['prototype'][_0x5130b4(0x251)],Scene_Boot[_0x5130b4(0x249)][_0x5130b4(0x251)]=function(){const _0x548deb=_0x5130b4;VisuMZ[_0x548deb(0x2ca)][_0x548deb(0x1ba)][_0x548deb(0x3a1)](this),this['process_VisuMZ_BattleSystemBTB']();},Scene_Boot['prototype'][_0x5130b4(0x1b5)]=function(){const _0xe62de7=_0x5130b4;this[_0xe62de7(0x1b3)](),this['process_VisuMZ_BattleSystemBTB_JS']();},Scene_Boot[_0x5130b4(0x249)]['process_VisuMZ_BattleSystemBTB_Notetags']=function(){const _0x3d8c9a=_0x5130b4;if(VisuMZ[_0x3d8c9a(0x3c1)])return;const _0x1e4865=$dataSkills[_0x3d8c9a(0x368)]($dataItems);for(const _0x506201 of _0x1e4865){if(!_0x506201)continue;DataManager[_0x3d8c9a(0x40c)](_0x506201);}},VisuMZ[_0x5130b4(0x2ca)]['JS']={},Scene_Boot['prototype'][_0x5130b4(0x29b)]=function(){const _0x2a38a1=_0x5130b4;if(VisuMZ[_0x2a38a1(0x3c1)])return;const _0xe24f45=VisuMZ[_0x2a38a1(0x2ca)]['RegExp'],_0x1812fb=$dataSkills['concat'](dataItems);for(const _0x1bda1b of _0x1812fb){if(!_0x1bda1b)continue;VisuMZ['BattleSystemBTB'][_0x2a38a1(0x152)](_0x1bda1b,_0x2a38a1(0x3cd)),VisuMZ['BattleSystemBTB'][_0x2a38a1(0x152)](_0x1bda1b,_0x2a38a1(0x317));}},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x152)]=function(_0x2662fc,_0x3cc1a8){const _0xc84713=_0x5130b4,_0x420889=VisuMZ[_0xc84713(0x2ca)][_0xc84713(0x14e)][_0x3cc1a8],_0x5a31a6=_0x2662fc[_0xc84713(0x410)];if(_0x5a31a6[_0xc84713(0x2c9)](_0x420889)){if(_0xc84713(0x38e)!==_0xc84713(0x3fd)){const _0x380e76=String(RegExp['$1']),_0x1298f9=_0xc84713(0x2e1)[_0xc84713(0x18b)](_0x380e76),_0x17af36=VisuMZ[_0xc84713(0x2ca)][_0xc84713(0x3ea)](_0x2662fc,_0x3cc1a8);VisuMZ['BattleSystemBTB']['JS'][_0x17af36]=new Function(_0x1298f9);}else this[_0xc84713(0x3e8)](...arguments);}},VisuMZ[_0x5130b4(0x2ca)]['createKeyJS']=function(_0x66ade1,_0x3b1db9){const _0x198427=_0x5130b4;if(VisuMZ['createKeyJS'])return VisuMZ[_0x198427(0x3ea)](_0x66ade1,_0x3b1db9);let _0x1b80a0='';if($dataActors['includes'](_0x66ade1))_0x1b80a0=_0x198427(0x36c)[_0x198427(0x18b)](_0x66ade1['id'],_0x3b1db9);if($dataClasses[_0x198427(0x2c2)](_0x66ade1))_0x1b80a0=_0x198427(0x1db)[_0x198427(0x18b)](_0x66ade1['id'],_0x3b1db9);if($dataSkills['includes'](_0x66ade1))_0x1b80a0=_0x198427(0x2a6)[_0x198427(0x18b)](_0x66ade1['id'],_0x3b1db9);if($dataItems[_0x198427(0x2c2)](_0x66ade1))_0x1b80a0=_0x198427(0x1e4)[_0x198427(0x18b)](_0x66ade1['id'],_0x3b1db9);if($dataWeapons[_0x198427(0x2c2)](_0x66ade1))_0x1b80a0='Weapon-%1-%2'[_0x198427(0x18b)](_0x66ade1['id'],_0x3b1db9);if($dataArmors[_0x198427(0x2c2)](_0x66ade1))_0x1b80a0=_0x198427(0x2f9)['format'](_0x66ade1['id'],_0x3b1db9);if($dataEnemies['includes'](_0x66ade1))_0x1b80a0='Enemy-%1-%2'[_0x198427(0x18b)](_0x66ade1['id'],_0x3b1db9);if($dataStates[_0x198427(0x2c2)](_0x66ade1))_0x1b80a0=_0x198427(0x2b2)['format'](_0x66ade1['id'],_0x3b1db9);return _0x1b80a0;},VisuMZ['BattleSystemBTB'][_0x5130b4(0x280)]=VisuMZ[_0x5130b4(0x280)],VisuMZ[_0x5130b4(0x280)]=function(_0x4ea49c){const _0x5c2d19=_0x5130b4;VisuMZ[_0x5c2d19(0x2ca)]['ParseSkillNotetags'][_0x5c2d19(0x3a1)](this,_0x4ea49c),DataManager['btbRegisterFusions'](_0x4ea49c),VisuMZ['BattleSystemBTB'][_0x5c2d19(0x152)](_0x4ea49c,_0x5c2d19(0x3cd)),VisuMZ[_0x5c2d19(0x2ca)]['Parse_Notetags_BravePointsUserJS'](_0x4ea49c,_0x5c2d19(0x317));},VisuMZ[_0x5130b4(0x2ca)]['ParseItemNotetags']=VisuMZ[_0x5130b4(0x1d5)],VisuMZ[_0x5130b4(0x1d5)]=function(_0x3d7584){const _0x498ada=_0x5130b4;VisuMZ[_0x498ada(0x2ca)][_0x498ada(0x1d5)][_0x498ada(0x3a1)](this,_0x3d7584),DataManager[_0x498ada(0x40c)](_0x3d7584),VisuMZ[_0x498ada(0x2ca)][_0x498ada(0x152)](_0x3d7584,_0x498ada(0x3cd)),VisuMZ[_0x498ada(0x2ca)]['Parse_Notetags_BravePointsUserJS'](_0x3d7584,'JsBravePointsTarget');},DataManager[_0x5130b4(0x413)]=function(_0x461875){const _0x26ae54=_0x5130b4;_0x461875=_0x461875['toUpperCase']()['trim'](),this['_skillIDs']=this['_skillIDs']||{};if(this[_0x26ae54(0x211)][_0x461875])return this[_0x26ae54(0x211)][_0x461875];for(const _0x460921 of $dataSkills){if(!_0x460921)continue;this['_skillIDs'][_0x460921['name'][_0x26ae54(0x2e5)]()['trim']()]=_0x460921['id'];}return this[_0x26ae54(0x211)][_0x461875]||0x0;},DataManager['getItemIdWithName']=function(_0x256b89){const _0x4c7212=_0x5130b4;_0x256b89=_0x256b89[_0x4c7212(0x2e5)]()[_0x4c7212(0x195)](),this[_0x4c7212(0x33b)]=this['_itemIDs']||{};if(this[_0x4c7212(0x33b)][_0x256b89])return this[_0x4c7212(0x33b)][_0x256b89];for(const _0x32f9d6 of $dataItems){if(_0x4c7212(0x3f0)!==_0x4c7212(0x316)){if(!_0x32f9d6)continue;this[_0x4c7212(0x33b)][_0x32f9d6[_0x4c7212(0x3c9)][_0x4c7212(0x2e5)]()[_0x4c7212(0x195)]()]=_0x32f9d6['id'];}else{if(this[_0x4c7212(0x39c)]())return![];const _0x11e44e=_0x105804[_0x4c7212(0x2ca)][_0x4c7212(0x16c)][_0x4c7212(0x3ed)];if(this['isActor']()){if(_0x11e44e[_0x4c7212(0x3c2)]===_0x4fed43)return!![];return _0x11e44e[_0x4c7212(0x3c2)];}else{if(_0x11e44e['EnemyActionFusions']===_0x2f1444)return!![];return _0x11e44e['EnemyActionFusions'];}}}return this['_itemIDs'][_0x256b89]||0x0;},DataManager[_0x5130b4(0x1ef)]={},DataManager['_btbSkillStrictFusion']={},DataManager[_0x5130b4(0x1fb)]={},DataManager[_0x5130b4(0x3ef)]={},DataManager['btbRegisterFusions']=function(_0x4f06c1){const _0x5e51fa=_0x5130b4;if(!_0x4f06c1)return;const _0x1b75c4=VisuMZ[_0x5e51fa(0x2ca)]['RegExp'],_0x27b817=_0x4f06c1['note'],_0x1ee594=DataManager['isSkill'](_0x4f06c1),_0x30c2d7=_0x27b817[_0x5e51fa(0x2c9)](_0x1b75c4[_0x5e51fa(0x299)]);if(_0x30c2d7){if(_0x5e51fa(0x18f)!==_0x5e51fa(0x1bf))for(const _0x62ba19 of _0x30c2d7){if(!_0x62ba19)continue;_0x62ba19[_0x5e51fa(0x2c9)](_0x1b75c4[_0x5e51fa(0x299)]);const _0x7d783a=String(RegExp['$1'])['split'](','),_0x6b339c=this[_0x5e51fa(0x3f2)](_0x7d783a,_0x1ee594)[_0x5e51fa(0x2f1)]((_0x25fa36,_0x5a4dc8)=>_0x25fa36-_0x5a4dc8);if(_0x6b339c[_0x5e51fa(0x286)]<=0x1)continue;const _0xaf5abe=_0x6b339c[_0x5e51fa(0x3dc)]('-'),_0x58313b=_0x1ee594?DataManager['_btbSkillFlexFusion']:DataManager[_0x5e51fa(0x1fb)];_0x58313b[_0xaf5abe]=_0x4f06c1['id'];}else this['x']=this[_0x5e51fa(0x350)],this['y']=this['_homeY'];}const _0x144b5d=_0x27b817[_0x5e51fa(0x2c9)](_0x1b75c4[_0x5e51fa(0x1d3)]);if(_0x144b5d)for(const _0x481017 of _0x144b5d){if(!_0x481017)continue;_0x481017['match'](_0x1b75c4['FusionStrict']);const _0x567e17=String(RegExp['$1'])['split'](','),_0x2988c0=this[_0x5e51fa(0x3f2)](_0x567e17,_0x1ee594);if(_0x2988c0[_0x5e51fa(0x286)]<=0x1)continue;const _0x15f584=_0x2988c0[_0x5e51fa(0x3dc)]('-'),_0x2c6d8a=_0x1ee594?DataManager['_btbSkillFlexFusion']:DataManager[_0x5e51fa(0x1fb)];_0x2c6d8a[_0x15f584]=_0x4f06c1['id'];}},DataManager['btbParseFusionData']=function(_0x15c0ae,_0x204178){const _0x43ca6c=_0x5130b4,_0x106b1a=[];for(let _0xed96a1 of _0x15c0ae){_0xed96a1=(String(_0xed96a1)||'')[_0x43ca6c(0x195)]();const _0x2518aa=/^\d+$/['test'](_0xed96a1);if(_0x2518aa)_0x43ca6c(0x1b0)===_0x43ca6c(0x33d)?_0x136eda+=_0x489635(_0x3ea4d2['$1']):_0x106b1a['push'](Number(_0xed96a1));else _0x204178?_0x106b1a[_0x43ca6c(0x21e)](DataManager['getSkillIdWithName'](_0xed96a1)):_0x106b1a[_0x43ca6c(0x21e)](DataManager['getItemIdWithName'](_0xed96a1));}return _0x106b1a;},ImageManager[_0x5130b4(0x1d7)]=VisuMZ[_0x5130b4(0x2ca)]['Settings'][_0x5130b4(0x1b8)][_0x5130b4(0x337)],ImageManager[_0x5130b4(0x20f)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x5130b4(0x1a9)]=ImageManager[_0x5130b4(0x1a9)]||0x6,TextManager[_0x5130b4(0x34d)]=VisuMZ[_0x5130b4(0x2ca)]['Settings']['General'][_0x5130b4(0x2a5)],TextManager[_0x5130b4(0x2af)]=VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x16c)]['General'][_0x5130b4(0x20a)],TextManager[_0x5130b4(0x270)]=VisuMZ[_0x5130b4(0x2ca)]['Settings'][_0x5130b4(0x1b8)][_0x5130b4(0x25d)],TextManager[_0x5130b4(0x3bf)]=VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x16c)][_0x5130b4(0x1ed)]['CommandName'],TextManager['btbActionSlot']=VisuMZ[_0x5130b4(0x2ca)]['Settings'][_0x5130b4(0x1ed)][_0x5130b4(0x39b)],TextManager[_0x5130b4(0x143)]=VisuMZ['BattleSystemBTB'][_0x5130b4(0x16c)][_0x5130b4(0x1ed)][_0x5130b4(0x308)],SceneManager[_0x5130b4(0x289)]=function(){const _0x3c7dea=_0x5130b4;return this[_0x3c7dea(0x239)]&&this[_0x3c7dea(0x239)]['constructor']===Scene_Battle;},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x3e2)]=BattleManager['battleSys'],BattleManager['battleSys']=function(){const _0x5527be=_0x5130b4;if(this[_0x5527be(0x29d)]())return'BTB';return VisuMZ[_0x5527be(0x2ca)][_0x5527be(0x3e2)][_0x5527be(0x3a1)](this);},BattleManager['isBTB']=function(){const _0x1f4e04=_0x5130b4;return $gameSystem[_0x1f4e04(0x2df)]()==='BTB';},VisuMZ['BattleSystemBTB'][_0x5130b4(0x313)]=BattleManager[_0x5130b4(0x225)],BattleManager[_0x5130b4(0x225)]=function(){const _0x289d96=_0x5130b4;if(this[_0x289d96(0x29d)]())return![];return VisuMZ[_0x289d96(0x2ca)]['BattleManager_isTpb'][_0x289d96(0x3a1)](this);},VisuMZ[_0x5130b4(0x2ca)]['BattleManager_isActiveTpb']=BattleManager[_0x5130b4(0x2d2)],BattleManager[_0x5130b4(0x2d2)]=function(){const _0x28a0d9=_0x5130b4;if(this[_0x28a0d9(0x29d)]())return![];return VisuMZ[_0x28a0d9(0x2ca)][_0x28a0d9(0x145)]['call'](this);},VisuMZ[_0x5130b4(0x2ca)]['BattleManager_isTurnBased']=BattleManager[_0x5130b4(0x265)],BattleManager[_0x5130b4(0x265)]=function(){const _0x163b99=_0x5130b4;if(this[_0x163b99(0x29d)]())return!![];return VisuMZ[_0x163b99(0x2ca)]['BattleManager_isTurnBased'][_0x163b99(0x3a1)](this);},VisuMZ['BattleSystemBTB']['BattleManager_startInput']=BattleManager[_0x5130b4(0x162)],BattleManager[_0x5130b4(0x162)]=function(){const _0x1dea66=_0x5130b4;VisuMZ[_0x1dea66(0x2ca)][_0x1dea66(0x377)][_0x1dea66(0x3a1)](this),this[_0x1dea66(0x29d)]()&&this['isSkipPartyCommandWindow']()&&!this[_0x1dea66(0x2db)]&&$gameParty[_0x1dea66(0x25a)]()&&this[_0x1dea66(0x197)]();},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x32e)]=BattleManager['startTurn'],BattleManager['startTurn']=function(){const _0x23a6f7=_0x5130b4;VisuMZ['BattleSystemBTB'][_0x23a6f7(0x32e)][_0x23a6f7(0x3a1)](this),this[_0x23a6f7(0x1f6)]();},BattleManager[_0x5130b4(0x1f6)]=function(){const _0x5e697d=_0x5130b4;if(!SceneManager['isSceneBattle']())return;if(!this[_0x5e697d(0x29d)]())return;const _0x28e758=SceneManager[_0x5e697d(0x239)];if(!_0x28e758)return;const _0x10643d=_0x28e758[_0x5e697d(0x1f0)];if(!_0x10643d)return;_0x10643d[_0x5e697d(0x411)]();},VisuMZ[_0x5130b4(0x2ca)]['BattleManager_makeActionOrders']=BattleManager[_0x5130b4(0x268)],BattleManager[_0x5130b4(0x268)]=function(){const _0x5a65aa=_0x5130b4;VisuMZ[_0x5a65aa(0x2ca)][_0x5a65aa(0x3f3)]['call'](this);if(this[_0x5a65aa(0x29d)]()){if(_0x5a65aa(0x2c3)==='sxVZp')this[_0x5a65aa(0x21d)]=this[_0x5a65aa(0x21d)]['filter'](_0x47547c=>_0x47547c&&_0x47547c[_0x5a65aa(0x1e2)][_0x5a65aa(0x286)]>0x0),this['updateTurnOrderBTB']();else{this['x']=this['_positionTargetX'],this['y']=this[_0x5a65aa(0x374)];if(this['opacity']<0xff&&!this[_0x5a65aa(0x333)]&&this[_0x5a65aa(0x40f)]<=0x0){const _0x3fb317=this[_0x5a65aa(0x1e0)]();_0x3fb317&&(this[_0x5a65aa(0x301)]=_0x3fb317[_0x5a65aa(0x15a)]()&&_0x3fb317[_0x5a65aa(0x314)]()?0xff:0x0);}}}},BattleManager['sortActionOrdersBTB']=function(){const _0x5d1c87=_0x5130b4;if(!this[_0x5d1c87(0x29d)]())return;if(!SceneManager[_0x5d1c87(0x289)]())return;const _0x366212=this[_0x5d1c87(0x21d)];for(const _0x59f38b of _0x366212){if(_0x5d1c87(0x36e)!==_0x5d1c87(0x1ad))_0x59f38b[_0x5d1c87(0x1a7)]();else{if(!this[_0x5d1c87(0x17e)]())return;const _0x6fb0e2=this[_0x5d1c87(0x181)](),_0x14fb19=_0x5f1e3f[_0x5d1c87(0x3bf)],_0x2fa3f3=_0x4366f0[_0x5d1c87(0x1d7)],_0x435679=_0x6fb0e2==='text'?_0x14fb19:'\x5cI[%1]%2'[_0x5d1c87(0x18b)](_0x2fa3f3,_0x14fb19);this[_0x5d1c87(0x3f6)](_0x435679,_0x5d1c87(0x34a),this[_0x5d1c87(0x3db)][_0x5d1c87(0x3e1)]()),_0x554e94['refreshStatusBTB']();}}_0x366212[_0x5d1c87(0x2f1)]((_0x516cb0,_0x5e477e)=>_0x5e477e[_0x5d1c87(0x15c)]()-_0x516cb0['speed']());if(this['isBTB']()){if('lbhja'===_0x5d1c87(0x341)){const _0x57f67f=this[_0x5d1c87(0x319)]()[_0x5d1c87(0x410)];if(_0x57f67f['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x59881d(_0x49eaaf['$2']);return this['faceIndex']();}else this[_0x5d1c87(0x326)]();}},BattleManager[_0x5130b4(0x304)]=function(){const _0x4d7994=_0x5130b4;if(!this[_0x4d7994(0x29d)]())return;this[_0x4d7994(0x21d)]=this['_actionBattlers']||[],this[_0x4d7994(0x21d)]=this[_0x4d7994(0x21d)][_0x4d7994(0x2fb)](_0x662300=>_0x662300&&_0x662300['isAppeared']()&&_0x662300['isAlive']()),this[_0x4d7994(0x326)]();},BattleManager[_0x5130b4(0x326)]=function(_0x5f08e0){const _0x528da7=_0x5130b4;if(!this[_0x528da7(0x29d)]())return;const _0x2b89dd=SceneManager['_scene'][_0x528da7(0x193)];if(!_0x2b89dd)return;_0x2b89dd['updateTurnOrder'](_0x5f08e0);},VisuMZ[_0x5130b4(0x2ca)]['BattleManager_startAction']=BattleManager['startAction'],BattleManager[_0x5130b4(0x35b)]=function(){const _0x31ba3b=_0x5130b4;if(BattleManager[_0x31ba3b(0x29d)]()&&this[_0x31ba3b(0x41b)]){if('FOkFV'==='cHYRo'){const _0x33c4f=this[_0x31ba3b(0x29c)](),_0xad8e39=_0xe6395a['inputtingAction']();if(_0xad8e39)_0xad8e39[_0x31ba3b(0x2d3)](_0x33c4f?_0x33c4f['id']:null);_0x101720['prototype']['applyBattleItemWindowBTB'][_0x31ba3b(0x3a1)](this);}else this[_0x31ba3b(0x41b)]['processActionFusionsBTB']();}VisuMZ[_0x31ba3b(0x2ca)][_0x31ba3b(0x1c1)]['call'](this);},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x177)]=Game_System[_0x5130b4(0x249)][_0x5130b4(0x3e8)],Game_System[_0x5130b4(0x249)][_0x5130b4(0x3e8)]=function(){const _0x3be5f7=_0x5130b4;VisuMZ[_0x3be5f7(0x2ca)][_0x3be5f7(0x177)][_0x3be5f7(0x3a1)](this),this[_0x3be5f7(0x24b)]();},Game_System[_0x5130b4(0x249)][_0x5130b4(0x24b)]=function(){this['_btbTurnOrderVisible']=!![];},Game_System[_0x5130b4(0x249)][_0x5130b4(0x22e)]=function(){const _0x7b018c=_0x5130b4;return this[_0x7b018c(0x2e9)]===undefined&&this[_0x7b018c(0x24b)](),this[_0x7b018c(0x2e9)];},Game_System[_0x5130b4(0x249)][_0x5130b4(0x17c)]=function(_0x4f3089){const _0x125068=_0x5130b4;this[_0x125068(0x2e9)]===undefined&&this[_0x125068(0x24b)](),this[_0x125068(0x2e9)]=_0x4f3089;},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x1a5)]=Game_Action[_0x5130b4(0x249)]['applyItemUserEffect'],Game_Action[_0x5130b4(0x249)][_0x5130b4(0x3d3)]=function(_0x5d98a8){const _0x52805b=_0x5130b4;VisuMZ[_0x52805b(0x2ca)]['Game_Action_applyItemUserEffect']['call'](this,_0x5d98a8),this[_0x52805b(0x3fc)](_0x5d98a8);},Game_Action[_0x5130b4(0x249)]['applyBattleSystemBTBUserEffect']=function(_0x3c58ab){const _0x34e631=_0x5130b4;if(!BattleManager['isBTB']())return;if(this[_0x34e631(0x29c)]())this[_0x34e631(0x393)](_0x3c58ab);},Game_Action[_0x5130b4(0x249)][_0x5130b4(0x393)]=function(_0x180f40){const _0x1ebb1e=_0x5130b4,_0x4dc459=VisuMZ[_0x1ebb1e(0x2ca)]['RegExp'],_0x4ca79c=this[_0x1ebb1e(0x29c)]()[_0x1ebb1e(0x410)],_0x280bc1=this['item']();if(this[_0x1ebb1e(0x3cb)]()){if(_0x4ca79c[_0x1ebb1e(0x2c9)](_0x4dc459[_0x1ebb1e(0x3ca)])){const _0xb19d99=Number(RegExp['$1']);this[_0x1ebb1e(0x3cb)]()[_0x1ebb1e(0x363)](_0xb19d99);}if(_0x4ca79c[_0x1ebb1e(0x2c9)](_0x4dc459[_0x1ebb1e(0x3f8)])){if(_0x1ebb1e(0x3d8)!=='ilyGs'){const _0x17a657=Number(RegExp['$1']);this['subject']()['gainBravePoints'](_0x17a657);}else this[_0x1ebb1e(0x1b4)](-_0x37ba89);}const _0x28ed02=_0x1ebb1e(0x3cd),_0x15e75d=VisuMZ[_0x1ebb1e(0x2ca)][_0x1ebb1e(0x3ea)](_0x280bc1,_0x28ed02);if(VisuMZ[_0x1ebb1e(0x2ca)]['JS'][_0x15e75d]){if('GMKKh'==='GMKKh'){const _0xd0aafd=VisuMZ[_0x1ebb1e(0x2ca)]['JS'][_0x15e75d]['call'](this,this[_0x1ebb1e(0x3cb)](),_0x180f40,this[_0x1ebb1e(0x3cb)]()[_0x1ebb1e(0x355)]());this[_0x1ebb1e(0x3cb)]()[_0x1ebb1e(0x363)](_0xd0aafd);}else{const _0x352626=_0x153de4(_0x5ae784['$1']);this[_0x1ebb1e(0x3cb)]()[_0x1ebb1e(0x363)](_0x352626);}}}if(_0x180f40){if(_0x1ebb1e(0x34c)===_0x1ebb1e(0x284)){const _0x452a9f=this[_0x1ebb1e(0x414)](_0x291b08),_0x2372ed=_0x244b0e['optDisplayTp']?0x4:0x3,_0x141eae=_0x2372ed*0x80+(_0x2372ed-0x1)*0x8+0x4;let _0xf563ef=_0x452a9f['x']+this[_0x1ebb1e(0x2f0)];_0x3903a8[_0x1ebb1e(0x26a)][_0x1ebb1e(0x16c)][_0x1ebb1e(0x346)][_0x1ebb1e(0x174)]?_0xf563ef=_0x452a9f['x']+_0x48c9c0[_0x1ebb1e(0x1e9)]+0x8:_0xf563ef+=_0x58ecaf[_0x1ebb1e(0x1a3)];const _0x4d66e6=_0x2e7f4c['round'](_0x4936ef[_0x1ebb1e(0x156)](_0x452a9f['x']+_0x452a9f[_0x1ebb1e(0x23e)]-_0x141eae,_0xf563ef));let _0x1db5cb=_0x4d66e6+0x88,_0x49498e=_0x452a9f['y'];_0x1db5cb+=0x88*(_0x3653e1[_0x1ebb1e(0x3c4)]?0x3:0x2),_0x1db5cb+=this[_0x1ebb1e(0x13e)](),_0x49498e+=this[_0x1ebb1e(0x13f)]();const _0x56d6aa=this[_0x1ebb1e(0x287)]();if(_0x1db5cb>_0x452a9f['x']+_0x452a9f[_0x1ebb1e(0x23e)])return;this[_0x1ebb1e(0x1ea)](_0x548b12,_0x1db5cb,_0x49498e,_0x452a9f[_0x1ebb1e(0x23e)],_0x56d6aa);}else{if(_0x4ca79c['match'](_0x4dc459[_0x1ebb1e(0x3d5)])){if(_0x1ebb1e(0x2f4)==='VjDub')_0xc73b57=_0x2f3d85+this[_0x1ebb1e(0x3b6)]()+_0x274585;else{const _0x4d6f92=Number(RegExp['$1']);_0x180f40[_0x1ebb1e(0x363)](_0x4d6f92);}}if(_0x4ca79c[_0x1ebb1e(0x2c9)](_0x4dc459[_0x1ebb1e(0x19b)])){const _0x52d1f0=Number(RegExp['$1']);_0x180f40[_0x1ebb1e(0x1b4)](_0x52d1f0);}const _0x4b9fcc=_0x1ebb1e(0x317),_0x598019=VisuMZ[_0x1ebb1e(0x2ca)][_0x1ebb1e(0x3ea)](_0x280bc1,_0x4b9fcc);if(VisuMZ[_0x1ebb1e(0x2ca)]['JS'][_0x598019]){const _0x5ccabf=VisuMZ[_0x1ebb1e(0x2ca)]['JS'][_0x598019][_0x1ebb1e(0x3a1)](this,this[_0x1ebb1e(0x3cb)](),_0x180f40,_0x180f40[_0x1ebb1e(0x355)]());_0x180f40[_0x1ebb1e(0x363)](_0x5ccabf);}}}},VisuMZ['BattleSystemBTB']['Game_Action_speed']=Game_Action[_0x5130b4(0x249)][_0x5130b4(0x15c)],Game_Action[_0x5130b4(0x249)][_0x5130b4(0x15c)]=function(){const _0x2d4651=_0x5130b4;return BattleManager[_0x2d4651(0x29d)]()?VisuMZ[_0x2d4651(0x2ca)]['Settings'][_0x2d4651(0x3ed)][_0x2d4651(0x16e)]['call'](this):VisuMZ['BattleSystemBTB'][_0x2d4651(0x2d7)][_0x2d4651(0x3a1)](this);},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x2c7)]=Game_Action['prototype']['allowRandomSpeed'],Game_Action['prototype'][_0x5130b4(0x3c6)]=function(){const _0x134334=_0x5130b4;return BattleManager[_0x134334(0x29d)]()?VisuMZ['BattleSystemBTB'][_0x134334(0x16c)][_0x134334(0x3ed)][_0x134334(0x384)]:VisuMZ[_0x134334(0x2ca)][_0x134334(0x2c7)]['call'](this);},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x277)]=Game_Action['prototype']['setSkill'],Game_Action[_0x5130b4(0x249)][_0x5130b4(0x29f)]=function(_0x494b2c){const _0x1e469a=_0x5130b4;VisuMZ[_0x1e469a(0x2ca)][_0x1e469a(0x277)]['call'](this,_0x494b2c),BattleManager[_0x1e469a(0x1c6)]();},VisuMZ['BattleSystemBTB']['Game_Action_setItem']=Game_Action[_0x5130b4(0x249)][_0x5130b4(0x2d3)],Game_Action[_0x5130b4(0x249)][_0x5130b4(0x2d3)]=function(_0x2c120c){const _0x530293=_0x5130b4;VisuMZ[_0x530293(0x2ca)][_0x530293(0x34e)][_0x530293(0x3a1)](this,_0x2c120c),BattleManager[_0x530293(0x1c6)]();},Game_Action[_0x5130b4(0x249)]['setActionFusionBTB']=function(_0x3edbe5){const _0x55472e=_0x5130b4;this[_0x55472e(0x242)]=_0x3edbe5;},Game_Action[_0x5130b4(0x249)][_0x5130b4(0x3bd)]=function(){const _0x41413e=_0x5130b4;if(this[_0x41413e(0x242)]===undefined)return 0x0;return this[_0x41413e(0x242)][_0x41413e(0x271)]('-')[_0x41413e(0x286)]-0x1;},Game_Action[_0x5130b4(0x249)][_0x5130b4(0x250)]=function(){const _0xc31a2d=_0x5130b4;if(this[_0xc31a2d(0x242)]===undefined)return[];return this['_actionFusionRecipe'][_0xc31a2d(0x271)]('-')[_0xc31a2d(0x153)](_0x16d2a0=>$dataSkills[Number(_0x16d2a0)]);},Game_Action[_0x5130b4(0x249)][_0x5130b4(0x34b)]=function(){const _0x57b40b=_0x5130b4;if(this['_actionFusionRecipe']===undefined)return[];return this[_0x57b40b(0x242)]['split']('-')[_0x57b40b(0x153)](_0x3268b9=>$dataItems[Number(_0x3268b9)]);},Game_BattlerBase['prototype'][_0x5130b4(0x355)]=function(){const _0x33b6f7=_0x5130b4;return this[_0x33b6f7(0x267)]||0x0;},Game_BattlerBase[_0x5130b4(0x240)]=VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x16c)][_0x5130b4(0x3ed)][_0x5130b4(0x1e6)],Game_BattlerBase[_0x5130b4(0x219)]=VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x16c)][_0x5130b4(0x3ed)][_0x5130b4(0x28e)],Game_BattlerBase['prototype'][_0x5130b4(0x233)]=function(){const _0x160550=_0x5130b4;if(this[_0x160550(0x19e)]())return 0x1;if(this[_0x160550(0x3d4)]())return 0x1;const _0xe9f2fb=VisuMZ[_0x160550(0x2ca)][_0x160550(0x14e)],_0x591ec6=_0xe9f2fb[_0x160550(0x2cb)];let _0x32261e=Game_BattlerBase[_0x160550(0x240)];const _0x282a20=this[_0x160550(0x2ee)]();for(const _0x21e482 of _0x282a20){if(_0x160550(0x2c1)!==_0x160550(0x41f)){if(!_0x21e482)continue;const _0x305d48=_0x21e482['note'];_0x305d48[_0x160550(0x2c9)](_0x591ec6)&&(_0x160550(0x3a0)!==_0x160550(0x3a0)?(this[_0x160550(0x1a1)](),this[_0x160550(0x405)]=0x0,this['updatePosition'](),this[_0x160550(0x2a0)]=this['_fadeTarget']):_0x32261e+=Number(RegExp['$1']));}else _0x511d5f=_0x108394['x']+_0xc79a5e[_0x160550(0x1e9)]+0x8;}return _0x32261e[_0x160550(0x1a4)](0x1,Game_BattlerBase[_0x160550(0x219)]);},Game_BattlerBase[_0x5130b4(0x1dd)]=VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x16c)][_0x5130b4(0x3ed)]['MaxBravePointsDefault'],Game_BattlerBase[_0x5130b4(0x171)]=VisuMZ['BattleSystemBTB'][_0x5130b4(0x16c)]['Mechanics']['MinBravePointsDefault'],Game_BattlerBase[_0x5130b4(0x172)]=VisuMZ[_0x5130b4(0x2ca)]['Settings'][_0x5130b4(0x3ed)][_0x5130b4(0x199)],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP']=VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x16c)][_0x5130b4(0x3ed)][_0x5130b4(0x359)],Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x40a)]=function(){const _0x2aab94=_0x5130b4,_0x4e721c=VisuMZ[_0x2aab94(0x2ca)]['RegExp'],_0x10421a=_0x4e721c[_0x2aab94(0x1f3)];let _0x1ec54c=Game_BattlerBase['BTB_MAX_BRAVEPOINTS_DEFAULT'];const _0x52d5fd=this[_0x2aab94(0x2ee)]();for(const _0x21fedc of _0x52d5fd){if(_0x2aab94(0x1ac)!==_0x2aab94(0x253)){if(!_0x21fedc)continue;const _0x40f2f3=_0x21fedc[_0x2aab94(0x410)];_0x40f2f3[_0x2aab94(0x2c9)](_0x10421a)&&(_0x2aab94(0x20c)===_0x2aab94(0x20c)?_0x1ec54c+=Number(RegExp['$1']):_0x426e69[_0x2aab94(0x2c2)](_0x57818f['item']()['id'])&&(_0x1a8205[_0x2aab94(0x21e)](_0x4e14c0),_0x1a9dc3[_0x2aab94(0x1fa)](_0x300461['indexOf'](_0x1cfb33[_0x2aab94(0x29c)]()['id']),0x1)));}else _0x4183d1=_0x234468,_0x25a3da=_0x28071b[_0x5b78d6];}return Math[_0x2aab94(0x156)](_0x1ec54c,Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x27f)]=function(){const _0x4dcccb=_0x5130b4,_0x43d1ed=VisuMZ[_0x4dcccb(0x2ca)][_0x4dcccb(0x14e)],_0x1e0d6a=_0x43d1ed['MinBravePoints'];let _0x55a1eb=Game_BattlerBase[_0x4dcccb(0x171)];const _0x356c46=this[_0x4dcccb(0x2ee)]();for(const _0x2fa782 of _0x356c46){if(!_0x2fa782)continue;const _0x4d7273=_0x2fa782['note'];_0x4d7273[_0x4dcccb(0x2c9)](_0x1e0d6a)&&(_0x55a1eb+=Number(RegExp['$1']));}return Math[_0x4dcccb(0x3ee)](_0x55a1eb,Game_BattlerBase[_0x4dcccb(0x28f)]);},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x363)]=function(_0x545fad){const _0x5c70cb=_0x5130b4;this['_bravePoints']=Math['min'](_0x545fad,this[_0x5c70cb(0x40a)]()),this[_0x5c70cb(0x20d)]();},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x1b4)]=function(_0x867d1e){const _0x16f272=_0x5130b4;_0x867d1e+=this['_bravePoints']||0x0,this[_0x16f272(0x363)](_0x867d1e);},Game_BattlerBase['prototype']['loseBravePoints']=function(_0x10ee99){const _0xf5e62=_0x5130b4;this[_0xf5e62(0x1b4)](-_0x10ee99);},Game_BattlerBase[_0x5130b4(0x249)]['bravePointsCost']=function(_0x400801){const _0xae38d2=_0x5130b4,_0x286871=VisuMZ[_0xae38d2(0x2ca)]['Settings'][_0xae38d2(0x3ed)];if(!_0x400801)return _0x286871[_0xae38d2(0x3d7)];if(DataManager[_0xae38d2(0x371)](_0x400801)){if(_0x400801['id']===this[_0xae38d2(0x409)]())return 0x0;if(this['currentAction']()&&this['currentAction']()['item']()===_0x400801&&this[_0xae38d2(0x14c)]()[_0xae38d2(0x28b)]){if(_0xae38d2(0x3af)===_0xae38d2(0x3af))return 0x0;else{if(this[_0xae38d2(0x242)]===_0x3f166b)return[];return this['_actionFusionRecipe'][_0xae38d2(0x271)]('-')['map'](_0x40c29f=>_0x5ec8d6[_0x43d118(_0x40c29f)]);}}}const _0x451bd1=VisuMZ[_0xae38d2(0x2ca)][_0xae38d2(0x14e)],_0x1ce6d5=_0x400801['note'];if(_0x1ce6d5[_0xae38d2(0x2c9)](_0x451bd1[_0xae38d2(0x398)])){if('RpFBE'!==_0xae38d2(0x30b))return Number(RegExp['$1']);else{if(!_0xa46ebc[_0xae38d2(0x29d)]())return![];if(!_0x5b3872[_0xae38d2(0x2ca)]['Settings'][_0xae38d2(0x1ed)][_0xae38d2(0x15d)])return![];if(this[_0xae38d2(0x3db)]&&this[_0xae38d2(0x3db)][_0xae38d2(0x3d4)]())return![];return!![];}}let _0x22e310=0x0;if(DataManager[_0xae38d2(0x371)](_0x400801))_0x22e310=_0x286871[_0xae38d2(0x212)];else DataManager['isItem'](_0x400801)&&(_0x22e310=_0x286871[_0xae38d2(0x370)]);return _0x22e310[_0xae38d2(0x1a4)](0x0,Game_BattlerBase[_0xae38d2(0x172)]);},VisuMZ['BattleSystemBTB'][_0x5130b4(0x2ea)]=Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x2e8)],Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x2e8)]=function(_0x4c664f){const _0x10d18d=_0x5130b4;if(_0x4c664f&&SceneManager[_0x10d18d(0x289)]()&&BattleManager[_0x10d18d(0x29d)]()){if(_0x10d18d(0x1d9)===_0x10d18d(0x238)){const _0x1f661d=_0x485ab1(_0x13afd9['$1'])[_0x10d18d(0x271)](',');for(let _0xc78c90 of _0x1f661d){_0xc78c90=(_0x1c9a9d(_0xc78c90)||'')['trim']();const _0x48467e=/^\d+$/['test'](_0xc78c90);_0x48467e?_0x3c9550[_0x10d18d(0x21e)](_0x410d8a(_0xc78c90)):_0x33f401['push'](_0x56ce11['getSkillIdWithName'](_0xc78c90));}}else{const _0x370b28=this[_0x10d18d(0x397)](_0x4c664f);if(this['bravePoints']()-_0x370b28<this['minBravePoints']())return![];}}return VisuMZ[_0x10d18d(0x2ca)][_0x10d18d(0x2ea)]['call'](this,_0x4c664f);},Game_BattlerBase[_0x5130b4(0x249)]['payBravePointsCost']=function(_0x18aed8){const _0x3a351e=_0x5130b4;if(!BattleManager[_0x3a351e(0x29d)]())return;const _0x439d61=this[_0x3a351e(0x397)](_0x18aed8);this[_0x3a351e(0x31e)](_0x439d61);},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x2ef)]=Game_Battler[_0x5130b4(0x249)]['useItem'],Game_Battler[_0x5130b4(0x249)]['useItem']=function(_0x1094be){const _0x1ca5ff=_0x5130b4;if(this['btbMatchesCurrentFusionAction'](_0x1094be)){if(_0x1ca5ff(0x3f7)==='TQcca')_0x128341[_0x1ca5ff(0x2ca)]['Game_Action_setItem']['call'](this,_0x4a7299),_0x8b1209[_0x1ca5ff(0x1c6)]();else{this[_0x1ca5ff(0x262)](_0x1094be);return;}}VisuMZ['BattleSystemBTB'][_0x1ca5ff(0x2ef)][_0x1ca5ff(0x3a1)](this,_0x1094be),this[_0x1ca5ff(0x31b)](_0x1094be);},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x176)]=function(_0x2a0271){const _0x1ead9d=_0x5130b4;if(!BattleManager[_0x1ead9d(0x29d)]())return![];if(!SceneManager[_0x1ead9d(0x289)]())return![];if(!this[_0x1ead9d(0x223)]())return![];if(this!==BattleManager[_0x1ead9d(0x41b)])return![];if(!this[_0x1ead9d(0x14c)]())return![];if(!this[_0x1ead9d(0x14c)]()[_0x1ead9d(0x29c)]())return![];if(this[_0x1ead9d(0x14c)]()[_0x1ead9d(0x29c)]()!==_0x2a0271)return![];if(this[_0x1ead9d(0x14c)]()[_0x1ead9d(0x371)]())return this[_0x1ead9d(0x14c)]()['getActionFusionRecipeSkills']()[_0x1ead9d(0x286)]>0x0;else{if(this[_0x1ead9d(0x14c)]()['isItem']())return this[_0x1ead9d(0x14c)]()[_0x1ead9d(0x34b)]()['length']>0x0;else{if(_0x1ead9d(0x2a2)!==_0x1ead9d(0x2a2))this['canPayActionFusionCombination'](_0x8ca0d6)&&(_0x4fc010=_0x292ec8,_0x299f74=_0x5e37ac[_0x5b19b2]);else return![];}}},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x262)]=function(_0x1c5319){const _0x25118a=_0x5130b4;if(!SceneManager[_0x25118a(0x289)]())return;if(DataManager[_0x25118a(0x371)](_0x1c5319))this[_0x25118a(0x151)]();else{if(_0x25118a(0x2fa)==='yipqi'){if(_0x2824e9['createKeyJS'])return _0x48bc37['createKeyJS'](_0x567097,_0x2e9929);let _0x5a8258='';if(_0x2214c4[_0x25118a(0x2c2)](_0x28448d))_0x5a8258=_0x25118a(0x36c)['format'](_0x515cc5['id'],_0x380e9b);if(_0x4f8ed3['includes'](_0x3c2f46))_0x5a8258='Class-%1-%2'['format'](_0x23b404['id'],_0x291007);if(_0x5b3707[_0x25118a(0x2c2)](_0x4ad1ba))_0x5a8258='Skill-%1-%2'[_0x25118a(0x18b)](_0x1dbf23['id'],_0x4eb66d);if(_0x5ac505[_0x25118a(0x2c2)](_0x319d29))_0x5a8258=_0x25118a(0x1e4)[_0x25118a(0x18b)](_0x5c21d7['id'],_0x36f9dc);if(_0x481dcf['includes'](_0x242b0b))_0x5a8258=_0x25118a(0x3ad)[_0x25118a(0x18b)](_0x127019['id'],_0x5dcda4);if(_0x3f637e[_0x25118a(0x2c2)](_0x1b239b))_0x5a8258=_0x25118a(0x2f9)[_0x25118a(0x18b)](_0x3e956f['id'],_0x138dae);if(_0x3b69b8[_0x25118a(0x2c2)](_0x4835fb))_0x5a8258=_0x25118a(0x2d5)[_0x25118a(0x18b)](_0x181813['id'],_0x4696fd);if(_0x4fd49e['includes'](_0x1157e6))_0x5a8258='State-%1-%2'[_0x25118a(0x18b)](_0x3e7f1b['id'],_0x2ce917);return _0x5a8258;}else this[_0x25118a(0x185)]();}},Game_Battler[_0x5130b4(0x249)]['btbPaySkillFusionCosts']=function(){const _0x303a66=_0x5130b4,_0x30f2ac=this[_0x303a66(0x14c)]()[_0x303a66(0x250)]();if(!_0x30f2ac)return;for(const _0x5a9d7e of _0x30f2ac){if(!_0x5a9d7e)continue;if(!this[_0x303a66(0x2e8)](_0x5a9d7e))return![];VisuMZ[_0x303a66(0x2ca)][_0x303a66(0x2ef)][_0x303a66(0x3a1)](this,_0x5a9d7e),this['payBravePointsCost'](_0x5a9d7e);}return!![];},Game_Battler['prototype']['btbPayItemFusionCosts']=function(){const _0x57cc3a=_0x5130b4,_0x3b9b30=this[_0x57cc3a(0x14c)]()[_0x57cc3a(0x34b)]();if(!_0x3b9b30)return;for(const _0x2ffa77 of _0x3b9b30){if(!_0x2ffa77)continue;if(!this[_0x57cc3a(0x2e8)](_0x2ffa77))return![];VisuMZ[_0x57cc3a(0x2ca)]['Game_Battler_useItem']['call'](this,_0x2ffa77),this[_0x57cc3a(0x31b)](_0x2ffa77);}return!![];},Game_BattlerBase[_0x5130b4(0x249)]['predictedBravePoints']=function(){const _0x5be83d=_0x5130b4,_0x4491d8=this[_0x5be83d(0x355)]()-this['predictedBravePointCost']()+this[_0x5be83d(0x188)]();return _0x4491d8[_0x5be83d(0x1a4)](Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP'],this[_0x5be83d(0x40a)]());},Game_BattlerBase['prototype']['predictedBravePointCost']=function(){const _0x50d979=_0x5130b4;let _0x28ac8e=0x0;for(const _0x144c0c of this[_0x50d979(0x1e2)]){if(_0x50d979(0x1d4)==='yBeng'){const _0x279a16=_0x52713e[_0x50d979(0x418)](_0x343e72[_0x50d979(0x376)]),_0x37c3fc=_0x55c3cf[_0x50d979(0x418)](_0x34837b[_0x50d979(0x204)]),_0x5f25c2=_0x5ace43[_0x50d979(0x418)](_0x3243aa[_0x50d979(0x186)]);let _0x5c794f=_0x42266e['btbPayItemFusionCosts']();return _0x4246ed[_0x50d979(0x376)]=_0x279a16,_0x40df15[_0x50d979(0x204)]=_0x37c3fc,_0x35ed05[_0x50d979(0x186)]=_0x5f25c2,_0x5c794f;}else{if(!_0x144c0c)continue;const _0x5102e7=_0x144c0c[_0x50d979(0x29c)]();_0x28ac8e+=this[_0x50d979(0x397)](_0x5102e7);}}return _0x28ac8e;},VisuMZ['BattleSystemBTB'][_0x5130b4(0x32b)]=Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x25a)],Game_BattlerBase[_0x5130b4(0x249)]['canInput']=function(){const _0x304c4e=_0x5130b4;if(BattleManager[_0x304c4e(0x29d)]()&&this[_0x304c4e(0x355)]()<0x0)return![];else{if(_0x304c4e(0x402)===_0x304c4e(0x1e5)){const _0x25dcbd=_0x423cd7[_0x304c4e(0x16c)],_0x171cbb=this[_0x304c4e(0x3f4)](),_0x2f9cb2=this['bitmapHeight'](),_0x1884dc=_0x48a081[_0x304c4e(0x156)](_0x171cbb,_0x2f9cb2);this['_graphicSprite'][_0x304c4e(0x297)]=new _0x2cf1fb(_0x171cbb,_0x2f9cb2);const _0x182a6e=this[_0x304c4e(0x27c)][_0x304c4e(0x297)],_0x3d225b=_0xe7892f[_0x304c4e(0x156)](0x1,_0x1884dc/_0x1361b3[_0x304c4e(0x23e)],_0x1884dc/_0x5f1547['height']),_0x5503e8=_0x42b32b[_0x304c4e(0x23e)]*_0x3d225b,_0x41befc=_0x58a391['height']*_0x3d225b,_0x43e00a=_0x2375ea[_0x304c4e(0x2ba)]((_0x171cbb-_0x5503e8)/0x2),_0x55a78b=_0x11ece4[_0x304c4e(0x2ba)]((_0x2f9cb2-_0x41befc)/0x2);_0x182a6e[_0x304c4e(0x203)](_0x36c094,0x0,0x0,_0xef48eb[_0x304c4e(0x23e)],_0x8a900c['height'],_0x43e00a,_0x55a78b,_0x5503e8,_0x41befc);}else return VisuMZ['BattleSystemBTB'][_0x304c4e(0x32b)]['call'](this);}},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x226)]=Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x248)],Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x248)]=function(){const _0x247277=_0x5130b4;if(BattleManager[_0x247277(0x29d)]()&&this[_0x247277(0x1a8)]()>0x1){if('zvIhW'!=='zvIhW')delete this[_0x247277(0x37e)],delete this[_0x247277(0x37c)],delete this['_btbTurnOrderFaceIndex'],delete this[_0x247277(0x27b)];else return![];}else return VisuMZ[_0x247277(0x2ca)][_0x247277(0x226)]['call'](this);},Game_BattlerBase[_0x5130b4(0x249)]['canBrave']=function(){const _0x4ab303=_0x5130b4;if(this[_0x4ab303(0x19e)]())return![];return this[_0x4ab303(0x1a8)]()<this[_0x4ab303(0x233)]()&&this[_0x4ab303(0x267)]>this['minBravePoints']();},Game_BattlerBase[_0x5130b4(0x249)]['cannotBraveTrait']=function(){const _0x1f04ec=_0x5130b4,_0x323c7a=VisuMZ['BattleSystemBTB'][_0x1f04ec(0x14e)],_0x30103b=_0x323c7a[_0x1f04ec(0x36a)];return this[_0x1f04ec(0x2ee)]()[_0x1f04ec(0x1b1)](_0x129047=>_0x129047&&_0x129047[_0x1f04ec(0x410)][_0x1f04ec(0x2c9)](_0x30103b));},Game_BattlerBase['prototype']['hideBraveTrait']=function(){const _0x34af75=_0x5130b4,_0x8ff078=VisuMZ[_0x34af75(0x2ca)]['RegExp'],_0x58fd2b=_0x8ff078[_0x34af75(0x283)];return this[_0x34af75(0x2ee)]()['some'](_0x89987b=>_0x89987b&&_0x89987b['note'][_0x34af75(0x2c9)](_0x58fd2b));},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x3d1)]=function(){const _0x4935cf=_0x5130b4;delete this[_0x4935cf(0x37e)],delete this[_0x4935cf(0x37c)],delete this[_0x4935cf(0x35e)],delete this[_0x4935cf(0x27b)];},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x154)]=function(){const _0x12ba3f=_0x5130b4;return this[_0x12ba3f(0x37e)]===undefined&&(this[_0x12ba3f(0x37e)]=this[_0x12ba3f(0x2bd)]()),this[_0x12ba3f(0x37e)];},Game_BattlerBase['prototype'][_0x5130b4(0x2bd)]=function(){const _0x29f7b5=_0x5130b4;return Window_BTB_TurnOrder[_0x29f7b5(0x16c)][_0x29f7b5(0x255)];},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x347)]=function(){const _0x2fe368=_0x5130b4;if(this[_0x2fe368(0x37c)]===undefined){if(_0x2fe368(0x192)===_0x2fe368(0x1ff)){const _0x42b6da=_0x54afc5[_0x2fe368(0x16c)],_0x42c520=this[_0x2fe368(0x1f8)](),_0x18c5df=_0x42b6da[_0x2fe368(0x2b4)],_0x1fc3ce=_0x42b6da[_0x2fe368(0x2d0)],_0x4f9fb4=_0x111c60[_0x2fe368(0x239)][_0x2fe368(0x193)];if(!_0x4f9fb4)return;const _0x30753c=this['containerPosition']();this[_0x2fe368(0x405)]=_0x42b6da[_0x2fe368(0x3b1)],this[_0x2fe368(0x293)]=_0x42c520?_0x42b6da[_0x2fe368(0x2f5)]*_0x30753c:0x0,this[_0x2fe368(0x374)]=_0x42c520?0x0:_0x42b6da[_0x2fe368(0x2f5)]*_0x30753c,_0x30753c>0x0&&(this[_0x2fe368(0x293)]+=_0x42c520?_0x1fc3ce:0x0,this[_0x2fe368(0x374)]+=_0x42c520?0x0:_0x1fc3ce),_0x18c5df?this[_0x2fe368(0x293)]=_0x42c520?_0x4f9fb4[_0x2fe368(0x23e)]-this[_0x2fe368(0x293)]-_0x42b6da[_0x2fe368(0x2f5)]:0x0:this['_positionTargetY']=_0x42c520?0x0:_0x4f9fb4[_0x2fe368(0x2e7)]-this[_0x2fe368(0x374)]-_0x42b6da[_0x2fe368(0x2f5)];}else this[_0x2fe368(0x37c)]=this[_0x2fe368(0x1de)]();}return this[_0x2fe368(0x37c)];},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x1de)]=function(){const _0x1b566e=_0x5130b4;return Window_BTB_TurnOrder[_0x1b566e(0x16c)]['EnemyBattlerFaceName'];},Game_BattlerBase['prototype'][_0x5130b4(0x367)]=function(){const _0x47be3a=_0x5130b4;return this[_0x47be3a(0x35e)]===undefined&&(this[_0x47be3a(0x35e)]=this[_0x47be3a(0x312)]()),this[_0x47be3a(0x35e)];},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x312)]=function(){const _0x2e7e6e=_0x5130b4;return Window_BTB_TurnOrder['Settings'][_0x2e7e6e(0x252)];},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x2a7)]=function(){const _0x78f7c7=_0x5130b4;return this[_0x78f7c7(0x27b)]===undefined&&(this[_0x78f7c7(0x27b)]=this[_0x78f7c7(0x142)]()),this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x5130b4(0x249)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x40cadd=_0x5130b4;return Window_BTB_TurnOrder[_0x40cadd(0x16c)][_0x40cadd(0x165)];},Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x3bb)]=function(_0x46df9c){const _0xff28ea=_0x5130b4;this[_0xff28ea(0x27b)]=_0x46df9c;},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x3ac)]=Game_BattlerBase[_0x5130b4(0x249)]['hide'],Game_BattlerBase['prototype']['hide']=function(){const _0x337087=_0x5130b4;VisuMZ['BattleSystemBTB'][_0x337087(0x3ac)][_0x337087(0x3a1)](this),BattleManager[_0x337087(0x304)]();},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x2c8)]=Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x17f)],Game_BattlerBase[_0x5130b4(0x249)][_0x5130b4(0x17f)]=function(){const _0x5370c4=_0x5130b4;VisuMZ[_0x5370c4(0x2ca)][_0x5370c4(0x2c8)][_0x5370c4(0x3a1)](this),BattleManager[_0x5370c4(0x304)]();},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x144)]=Game_Battler['prototype'][_0x5130b4(0x1fd)],Game_Battler['prototype'][_0x5130b4(0x1fd)]=function(){const _0x4d9b0b=_0x5130b4;VisuMZ[_0x4d9b0b(0x2ca)][_0x4d9b0b(0x144)]['call'](this),BattleManager['removeActionBattlersBTB']();},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x166)]=Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x3fb)],Game_Battler['prototype']['makeActionTimes']=function(){const _0x3c1dca=_0x5130b4;return BattleManager['isBTB']()?_0x3c1dca(0x305)!==_0x3c1dca(0x149)?0x1:![]:VisuMZ['BattleSystemBTB'][_0x3c1dca(0x166)][_0x3c1dca(0x3a1)](this);},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x331)]=Game_Battler[_0x5130b4(0x249)]['onBattleStart'],Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x3a5)]=function(_0x2a2dc4){const _0x55e159=_0x5130b4;VisuMZ[_0x55e159(0x2ca)]['Game_Battler_onBattleStart'][_0x55e159(0x3a1)](this,_0x2a2dc4),this['onBattleStartBTB'](_0x2a2dc4);},Game_Battler['prototype'][_0x5130b4(0x187)]=function(_0x5928f4){const _0x117ec1=_0x5130b4;if(!BattleManager[_0x117ec1(0x29d)]())return;const _0x55f63f=VisuMZ['BattleSystemBTB'][_0x117ec1(0x16c)][_0x117ec1(0x3ed)],_0x5caa75=VisuMZ[_0x117ec1(0x2ca)][_0x117ec1(0x14e)];let _0x2fd58f=_0x5928f4?_0x55f63f[_0x117ec1(0x26c)]:_0x55f63f['BravePointStartNeutral'];const _0x2919a8=this[_0x117ec1(0x2ee)]();for(const _0x97f575 of _0x2919a8){if('PPmBM'===_0x117ec1(0x327)){if(!_0x97f575)continue;const _0x1c0a2f=_0x97f575[_0x117ec1(0x410)];_0x1c0a2f['match'](_0x5caa75['BravePointBattleStart'])&&(_0x2fd58f+=Number(RegExp['$1']));}else this[_0x117ec1(0x23d)]()?this[_0x117ec1(0x3db)]&&!this[_0x117ec1(0x3db)][_0x117ec1(0x3d4)]()&&this['_actor']['canBrave']()&&_0x9c5e85[_0x117ec1(0x239)][_0x117ec1(0x224)]():_0x35257b[_0x117ec1(0x2ca)][_0x117ec1(0x323)]['call'](this);}this[_0x117ec1(0x363)](_0x2fd58f);},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x224)]=function(){const _0x4defeb=_0x5130b4;this[_0x4defeb(0x1e2)][_0x4defeb(0x21e)](new Game_Action(this));const _0x5429b3=VisuMZ[_0x4defeb(0x2ca)]['Settings'][_0x4defeb(0x39a)];if(_0x5429b3[_0x4defeb(0x18a)]){const _0x825cf0=_0x4defeb(0x3a7),_0x408131=_0x5429b3[_0x4defeb(0x2ff)[_0x4defeb(0x18b)](_0x825cf0)],_0x56e059=_0x5429b3[_0x4defeb(0x15f)['format'](_0x825cf0)],_0x4eae5b=_0x5429b3[_0x4defeb(0x228)[_0x4defeb(0x18b)](_0x825cf0)];$gameTemp[_0x4defeb(0x28d)]([this],_0x408131,_0x56e059,_0x4eae5b);}},Game_Battler['prototype'][_0x5130b4(0x179)]=function(){const _0x2f8f06=_0x5130b4;if(this[_0x2f8f06(0x1e2)][_0x2f8f06(0x286)]<=0x1)return;this[_0x2f8f06(0x1e2)][_0x2f8f06(0x2c5)]();const _0x35ab21=VisuMZ[_0x2f8f06(0x2ca)][_0x2f8f06(0x16c)][_0x2f8f06(0x39a)];if(_0x35ab21[_0x2f8f06(0x26f)]){if('JWrOA'!==_0x2f8f06(0x236)){const _0x28eb84=_0x2f8f06(0x38d),_0x195f55=_0x35ab21[_0x2f8f06(0x2ff)[_0x2f8f06(0x18b)](_0x28eb84)],_0x49a654=_0x35ab21['%1Mirror'['format'](_0x28eb84)],_0xe1d9e0=_0x35ab21[_0x2f8f06(0x228)[_0x2f8f06(0x18b)](_0x28eb84)];$gameTemp[_0x2f8f06(0x28d)]([this],_0x195f55,_0x49a654,_0xe1d9e0);}else _0x32f19e[_0x2f8f06(0x2ca)][_0x2f8f06(0x256)][_0x2f8f06(0x3a1)](this),_0x118e65[_0x2f8f06(0x29d)]()&&this[_0x2f8f06(0x355)]()<0x0&&this[_0x2f8f06(0x340)]();}},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x1e8)]=Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x1a6)],Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x1a6)]=function(){const _0x4b79c8=_0x5130b4;VisuMZ[_0x4b79c8(0x2ca)]['Game_Battler_onTurnEnd'][_0x4b79c8(0x3a1)](this),this['onTurnEndBTB']();},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x310)]=function(){const _0x439a1c=_0x5130b4;if(!BattleManager[_0x439a1c(0x29d)]())return;if(!$gameParty['inBattle']())return;this[_0x439a1c(0x32c)]();},Game_Battler['prototype'][_0x5130b4(0x32c)]=function(){const _0x8b6e12=_0x5130b4,_0x166ef8=VisuMZ['BattleSystemBTB']['Settings'][_0x8b6e12(0x3ed)],_0x54c9b5=_0x166ef8[_0x8b6e12(0x2ae)];if(_0x54c9b5&&!this[_0x8b6e12(0x15a)]())return;const _0x1844e6=this[_0x8b6e12(0x188)]();this[_0x8b6e12(0x1b4)](_0x1844e6);},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x188)]=function(){const _0x25b38f=_0x5130b4,_0x4dd42c=VisuMZ[_0x25b38f(0x2ca)][_0x25b38f(0x14e)],_0xfba02e=VisuMZ['BattleSystemBTB'][_0x25b38f(0x16c)]['Mechanics'];let _0x50b43a=_0xfba02e[_0x25b38f(0x2da)]||0x0;const _0xf66c6b=this[_0x25b38f(0x2ee)]();for(const _0x435ba8 of _0xf66c6b){if(!_0x435ba8)continue;const _0x1ab285=_0x435ba8['note'];_0x1ab285[_0x25b38f(0x2c9)](_0x4dd42c[_0x25b38f(0x335)])&&(_0x50b43a+=Number(RegExp['$1']));}return _0x50b43a;},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x40b)]=function(){const _0x4b8f14=_0x5130b4;if(!this[_0x4b8f14(0x14a)]())return;if(this[_0x4b8f14(0x1a8)]()<=0x1)return;if(!this[_0x4b8f14(0x14c)]())return;if(!this['currentAction']()[_0x4b8f14(0x29c)]())return;const _0x2d84ff=this[_0x4b8f14(0x207)]();if(_0x2d84ff[_0x4b8f14(0x286)]<=0x0)return;let _0x5eff93='',_0x31b28a=0x0;const _0x286127=this[_0x4b8f14(0x14c)]()['isSkill'](),_0x26b653=_0x286127?DataManager[_0x4b8f14(0x1ef)]:DataManager[_0x4b8f14(0x1fb)],_0x1f7e38=_0x286127?DataManager['_btbSkillStrictFusion']:DataManager[_0x4b8f14(0x3ef)];for(const _0x4d6fa8 of _0x2d84ff){if(_0x4b8f14(0x1c3)===_0x4b8f14(0x1c3)){if(!_0x4d6fa8)continue;_0x26b653[_0x4d6fa8]&&_0x26b653[_0x4d6fa8]>=_0x31b28a&&(this[_0x4b8f14(0x18e)](_0x4d6fa8)&&(_0x4b8f14(0x403)===_0x4b8f14(0x403)?(_0x5eff93=_0x4d6fa8,_0x31b28a=_0x26b653[_0x4d6fa8]):(this[_0x4b8f14(0x2e9)]===_0xb2a485&&this[_0x4b8f14(0x24b)](),this[_0x4b8f14(0x2e9)]=_0xdcc087)));if(_0x1f7e38[_0x4d6fa8]&&_0x1f7e38[_0x4d6fa8]>=_0x31b28a){if(_0x4b8f14(0x173)!==_0x4b8f14(0x261))this[_0x4b8f14(0x18e)](_0x4d6fa8)&&(_0x5eff93=_0x4d6fa8,_0x31b28a=_0x26b653[_0x4d6fa8]);else{const _0x49e770=_0x23508b['Settings'];return this[_0x4b8f14(0x1f8)]()?_0x49e770[_0x4b8f14(0x2f5)]:_0x49e770['SpriteLength'];}}}else return _0x5559d4[_0x4b8f14(0x29d)]();}if(_0x31b28a<=0x0)return;this[_0x4b8f14(0x3f9)](_0x5eff93),this[_0x4b8f14(0x14c)]()[_0x4b8f14(0x21c)](_0x5eff93);if(_0x286127){if(_0x4b8f14(0x285)!==_0x4b8f14(0x285)){this['_turnOrderInnerSprite']=new _0xfa5f78(),this['addInnerChild'](this[_0x4b8f14(0x1d1)]),this[_0x4b8f14(0x269)]=[];for(let _0x43dd55=0x0;_0x43dd55<_0x4468a9[_0x4b8f14(0x3d9)]();_0x43dd55++){const _0x569a51=new _0x54da25(_0x2d9a5c,_0x43dd55);this['_turnOrderInnerSprite'][_0x4b8f14(0x22a)](_0x569a51),this[_0x4b8f14(0x269)][_0x4b8f14(0x21e)](_0x569a51);}for(let _0x570339=0x0;_0x570339<_0x5ba6db[_0x4b8f14(0x339)]()[_0x4b8f14(0x286)];_0x570339++){const _0xff6dc=new _0x3108b0(_0x4c663d,_0x570339);this['_turnOrderInnerSprite'][_0x4b8f14(0x22a)](_0xff6dc),this[_0x4b8f14(0x269)]['push'](_0xff6dc);}}else this[_0x4b8f14(0x14c)]()['setSkill'](_0x31b28a);}else _0x4b8f14(0x41d)!==_0x4b8f14(0x41d)?_0x135ab5=_0x32dbfa[_0x4b8f14(0x370)]:this[_0x4b8f14(0x14c)]()[_0x4b8f14(0x2d3)](_0x31b28a);},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x14a)]=function(){const _0x4314e9=_0x5130b4;if(this['cannotFusionNotetagBTB']())return![];const _0x12e1e6=VisuMZ['BattleSystemBTB'][_0x4314e9(0x16c)][_0x4314e9(0x3ed)];if(this[_0x4314e9(0x223)]()){if(_0x4314e9(0x356)===_0x4314e9(0x258))_0x196f6d[_0x4314e9(0x2ca)][_0x4314e9(0x2b1)][_0x4314e9(0x3a1)](this),this[_0x4314e9(0x22b)]();else{if(_0x12e1e6[_0x4314e9(0x3c2)]===undefined)return!![];return _0x12e1e6[_0x4314e9(0x3c2)];}}else{if(_0x12e1e6[_0x4314e9(0x295)]===undefined)return!![];return _0x12e1e6[_0x4314e9(0x295)];}},Game_BattlerBase['prototype'][_0x5130b4(0x39c)]=function(){const _0x203ae6=_0x5130b4,_0x592ac7=VisuMZ[_0x203ae6(0x2ca)]['RegExp'],_0x2126bd=this[_0x203ae6(0x2ee)]();for(const _0x1ce0c4 of _0x2126bd){if(!_0x1ce0c4)continue;const _0x3559dc=_0x1ce0c4[_0x203ae6(0x410)];if(_0x3559dc[_0x203ae6(0x2c9)](_0x592ac7[_0x203ae6(0x21b)]))return!![];if(_0x3559dc[_0x203ae6(0x2c9)](_0x592ac7[_0x203ae6(0x273)]))return![];}return![];},Game_Battler['prototype'][_0x5130b4(0x207)]=function(){const _0xba6d2f=_0x5130b4,_0x4835ad=this[_0xba6d2f(0x14c)](),_0x5e49a1=this[_0xba6d2f(0x1e2)],_0x39af4c=_0x5e49a1[_0xba6d2f(0x2fb)](_0x34f9de=>this[_0xba6d2f(0x1cd)](_0x4835ad,_0x34f9de)),_0x1a904f=_0x39af4c[_0xba6d2f(0x153)](_0x454ea8=>_0x454ea8[_0xba6d2f(0x29c)]()['id']),_0x1ded29=VisuMZ[_0xba6d2f(0x2ca)][_0xba6d2f(0x343)](_0x4835ad[_0xba6d2f(0x29c)]()['id'],_0x1a904f);let _0x3a541c=String(_0x4835ad[_0xba6d2f(0x29c)]()['id']);for(let _0x35a2f5=0x1;_0x35a2f5<_0x5e49a1[_0xba6d2f(0x286)];_0x35a2f5++){const _0x3dadfa=_0x5e49a1[_0x35a2f5];if(this[_0xba6d2f(0x1cd)](_0x4835ad,_0x3dadfa))_0x3a541c=_0xba6d2f(0x19f)['format'](_0x3a541c,_0x3dadfa['item']()['id']),_0x1ded29[_0xba6d2f(0x21e)](_0x3a541c);else break;}return _0x1ded29[_0xba6d2f(0x2fb)]((_0xb07e9a,_0x32f461,_0x43fe34)=>_0x43fe34[_0xba6d2f(0x31a)](_0xb07e9a)===_0x32f461);},VisuMZ['BattleSystemBTB'][_0x5130b4(0x343)]=function(_0x59b7fe,_0x1a8ff7){const _0x31cf38=[],_0x48ce5a=function(_0x2cf6fd,_0x392a51){const _0x5993ab=_0x292a;for(var _0x439142=0x0;_0x439142<_0x392a51[_0x5993ab(0x286)];_0x439142++){_0x31cf38[_0x5993ab(0x21e)](_0x2cf6fd+'-'+_0x392a51[_0x439142]),_0x48ce5a(_0x2cf6fd+'-'+_0x392a51[_0x439142],_0x392a51[_0x5993ab(0x205)](_0x439142+0x1));}};return _0x48ce5a(_0x59b7fe,_0x1a8ff7),_0x31cf38;},Game_Battler[_0x5130b4(0x249)]['canActionFusionWithBTB']=function(_0x543987,_0x1795b0){const _0x24df2f=_0x5130b4;if(!_0x543987||!_0x1795b0)return![];if(_0x543987===_0x1795b0)return![];if(!_0x543987[_0x24df2f(0x29c)]()||!_0x1795b0[_0x24df2f(0x29c)]())return![];if(_0x543987[_0x24df2f(0x371)]()!==_0x1795b0[_0x24df2f(0x371)]())return![];return!![];},Game_Battler[_0x5130b4(0x249)][_0x5130b4(0x18e)]=function(_0x26a769){const _0x1ded40=_0x5130b4,_0x294593=this[_0x1ded40(0x14c)]()[_0x1ded40(0x371)](),_0x15210f=JsonEx[_0x1ded40(0x418)](this);_0x15210f[_0x1ded40(0x2eb)]=!![],_0x15210f['currentAction']()[_0x1ded40(0x21c)](_0x26a769);if(_0x294593)return _0x15210f['btbPaySkillFusionCosts']();else{const _0x298dc3=JsonEx[_0x1ded40(0x418)]($gameParty[_0x1ded40(0x376)]),_0x351538=JsonEx[_0x1ded40(0x418)]($gameParty['_weapons']),_0x2fe099=JsonEx[_0x1ded40(0x418)]($gameParty['_armors']);let _0xcefc08=_0x15210f[_0x1ded40(0x185)]();return $gameParty[_0x1ded40(0x376)]=_0x298dc3,$gameParty[_0x1ded40(0x204)]=_0x351538,$gameParty['_armors']=_0x2fe099,_0xcefc08;}},Game_Battler[_0x5130b4(0x249)]['removeActionFusionIngredients']=function(_0x36c1ac){const _0x1010bb=_0x5130b4,_0x239e73=this[_0x1010bb(0x14c)](),_0x51eeb8=_0x36c1ac[_0x1010bb(0x271)]('-')[_0x1010bb(0x153)](_0x270097=>Number(_0x270097));_0x51eeb8[_0x1010bb(0x3b2)]();const _0x4b7f18=this[_0x1010bb(0x1e2)],_0x13515e=[];for(const _0x49d8fa of _0x4b7f18){_0x1010bb(0x3e9)===_0x1010bb(0x3e9)?this[_0x1010bb(0x1cd)](_0x239e73,_0x49d8fa)&&(_0x51eeb8['includes'](_0x49d8fa[_0x1010bb(0x29c)]()['id'])&&(_0x1010bb(0x38a)===_0x1010bb(0x25b)?this[_0x1010bb(0x41b)]['processActionFusionsBTB']():(_0x13515e[_0x1010bb(0x21e)](_0x49d8fa),_0x51eeb8[_0x1010bb(0x1fa)](_0x51eeb8['indexOf'](_0x49d8fa[_0x1010bb(0x29c)]()['id']),0x1)))):(_0x25baf5['BattleSystemBTB'][_0x1010bb(0x331)][_0x1010bb(0x3a1)](this,_0x54327c),this[_0x1010bb(0x187)](_0x2f174e));}for(const _0x3c4580 of _0x13515e){if(_0x1010bb(0x39f)===_0x1010bb(0x39f))_0x4b7f18[_0x1010bb(0x230)](_0x3c4580);else return this[_0x1010bb(0x276)]();}},Game_Actor[_0x5130b4(0x249)][_0x5130b4(0x363)]=function(_0xba84cb){const _0x20a85c=_0x5130b4;Game_Battler[_0x20a85c(0x249)][_0x20a85c(0x363)]['call'](this,_0xba84cb);if(!SceneManager['isSceneBattle']())return;if(!BattleManager['allBattleMembers']()[_0x20a85c(0x2c2)](this))return;BattleManager['refreshStatusBTB']();},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x256)]=Game_Actor[_0x5130b4(0x249)][_0x5130b4(0x150)],Game_Actor[_0x5130b4(0x249)][_0x5130b4(0x150)]=function(){const _0x4a7af4=_0x5130b4;VisuMZ[_0x4a7af4(0x2ca)][_0x4a7af4(0x256)][_0x4a7af4(0x3a1)](this);if(BattleManager[_0x4a7af4(0x29d)]()&&this[_0x4a7af4(0x355)]()<0x0){if(_0x4a7af4(0x1ce)===_0x4a7af4(0x294)){const _0x4980ec=_0x2207f3[_0x4a7af4(0x16c)],_0x168693=this[_0x4a7af4(0x1f8)]()?_0x4980ec[_0x4a7af4(0x3ab)]:_0x4980ec[_0x4a7af4(0x32a)];return _0x168693+0x1;}else this[_0x4a7af4(0x340)]();}},Game_Actor['prototype'][_0x5130b4(0x2bd)]=function(){const _0x1e9a4f=_0x5130b4,_0x4ea23f=this[_0x1e9a4f(0x319)]()[_0x1e9a4f(0x410)];if(_0x4ea23f[_0x1e9a4f(0x2c9)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x1e9a4f(0x23b);else{if(_0x4ea23f[_0x1e9a4f(0x2c9)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x1e9a4f(0x3c5)==='NVXMz')return'icon';else _0x449a11['BattleSystemBTB']['Game_BattlerBase_appear'][_0x1e9a4f(0x3a1)](this),_0x8bf89d[_0x1e9a4f(0x304)]();}}return Window_BTB_TurnOrder[_0x1e9a4f(0x16c)]['ActorBattlerType'];},Game_Actor[_0x5130b4(0x249)][_0x5130b4(0x347)]=function(){const _0x2616c0=_0x5130b4,_0x3b5c5e=this['actor']()[_0x2616c0(0x410)];if(_0x3b5c5e[_0x2616c0(0x2c9)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2616c0(0x288)!==_0x2616c0(0x1f1)?String(RegExp['$1']):this[_0x2616c0(0x13b)]?this['_unit']['members']()[this[_0x2616c0(0x3e7)]]:null;return this[_0x2616c0(0x217)]();},Game_Actor['prototype'][_0x5130b4(0x367)]=function(){const _0x381be0=_0x5130b4,_0x4dfcd3=this[_0x381be0(0x319)]()[_0x381be0(0x410)];if(_0x4dfcd3['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x381be0(0x3a8)]();},Game_Actor[_0x5130b4(0x249)][_0x5130b4(0x142)]=function(){const _0x21716b=_0x5130b4,_0x1deda7=this[_0x21716b(0x319)]()[_0x21716b(0x410)];if(_0x1deda7[_0x21716b(0x2c9)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x21716b(0x16c)][_0x21716b(0x22c)];},Game_Actor['prototype']['canActionFusionWithBTB']=function(_0x11942c,_0x498262){const _0x5d090b=_0x5130b4;if(!Game_Battler[_0x5d090b(0x249)][_0x5d090b(0x1cd)][_0x5d090b(0x3a1)](this,_0x11942c,_0x498262))return![];if(_0x11942c[_0x5d090b(0x40d)]()&&_0x498262[_0x5d090b(0x40d)]()){if(_0x5d090b(0x3b5)==='UCXZg')this[_0x5d090b(0x1ae)](_0x4f6582,_0x4063fa,_0x22f588,_0x3d94bc);else{if(_0x11942c[_0x5d090b(0x3b8)]()!==_0x498262[_0x5d090b(0x3b8)]())return![];if(_0x11942c[_0x5d090b(0x28a)]!==_0x498262[_0x5d090b(0x28a)])return![];}}return!![];},Game_Enemy[_0x5130b4(0x249)][_0x5130b4(0x2bd)]=function(){const _0x48e6cf=_0x5130b4,_0x3b0ca1=this[_0x48e6cf(0x17d)]()[_0x48e6cf(0x410)];if(_0x3b0ca1[_0x48e6cf(0x2c9)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x48e6cf(0x241)===_0x48e6cf(0x241))return _0x48e6cf(0x23b);else _0x1ed496[_0x48e6cf(0x21e)](_0x51253e(_0x269a4a));}else{if(_0x3b0ca1[_0x48e6cf(0x2c9)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x48e6cf(0x3da);}return Window_BTB_TurnOrder['Settings'][_0x48e6cf(0x255)];},Game_Enemy['prototype']['createTurnOrderBTBGraphicFaceName']=function(){const _0x1095ab=_0x5130b4,_0xbfcdcf=this[_0x1095ab(0x17d)]()[_0x1095ab(0x410)];if(_0xbfcdcf[_0x1095ab(0x2c9)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x1095ab(0x16c)][_0x1095ab(0x1f4)];},Game_Enemy[_0x5130b4(0x249)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x4e9ffa=_0x5130b4,_0x1f1ae3=this['enemy']()[_0x4e9ffa(0x410)];if(_0x1f1ae3['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder[_0x4e9ffa(0x16c)][_0x4e9ffa(0x252)];},Game_Enemy[_0x5130b4(0x249)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x4e1dd1=_0x5130b4,_0x91bf16=this[_0x4e1dd1(0x17d)]()[_0x4e1dd1(0x410)];if(_0x91bf16['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return'OrBwQ'===_0x4e1dd1(0x260)?Number(RegExp['$1']):_0x54d806[_0x4e1dd1(0x29d)]();return Window_BTB_TurnOrder[_0x4e1dd1(0x16c)][_0x4e1dd1(0x165)];},VisuMZ['BattleSystemBTB'][_0x5130b4(0x306)]=Game_Enemy[_0x5130b4(0x249)][_0x5130b4(0x150)],Game_Enemy['prototype'][_0x5130b4(0x150)]=function(){const _0x1f0e7b=_0x5130b4;VisuMZ[_0x1f0e7b(0x2ca)][_0x1f0e7b(0x306)]['call'](this),this[_0x1f0e7b(0x161)](),this[_0x1f0e7b(0x1f2)]();},Game_Enemy[_0x5130b4(0x249)]['checkActionsBTB']=function(){const _0x3cc6f6=_0x5130b4;if(!BattleManager['isBTB']())return;if(this[_0x3cc6f6(0x1a8)]()<=0x0)return;this[_0x3cc6f6(0x244)]=![];if(this[_0x3cc6f6(0x355)]()<0x0){if(_0x3cc6f6(0x14b)!==_0x3cc6f6(0x2b8))this[_0x3cc6f6(0x340)]();else return _0x34d4ef['isBTB']()?0x1:_0x831a49[_0x3cc6f6(0x2ca)]['Game_Battler_makeActionTimes']['call'](this);}},Game_Enemy['prototype'][_0x5130b4(0x1f2)]=function(){const _0x8f0aa1=_0x5130b4;if(!BattleManager[_0x8f0aa1(0x29d)]())return;if(this[_0x8f0aa1(0x1a8)]()<=0x0)return;const _0x15e9c5=this['_actions'][0x0];if(!_0x15e9c5)return;const _0x12407e=_0x15e9c5['item']();if(!_0x12407e)return;const _0x37a432=VisuMZ[_0x8f0aa1(0x2ca)]['RegExp'],_0x705fa=_0x12407e[_0x8f0aa1(0x410)];let _0x43742a=[];if(_0x705fa[_0x8f0aa1(0x2c9)](_0x37a432[_0x8f0aa1(0x390)])){if('gXeVp'==='oqZNn')_0x274442['isBTB']()&&this[_0x8f0aa1(0x246)]===_0xf850fd?this[_0x8f0aa1(0x1ae)](_0x3242ae,_0x338cc2,_0x233115,_0x5e6e9c):_0x4de9f0[_0x8f0aa1(0x2ca)][_0x8f0aa1(0x147)][_0x8f0aa1(0x3a1)](this,_0x320554,_0x25ceb2,_0x5d221b,_0x248d0c),this[_0x8f0aa1(0x2be)]();else{const _0x2eb1fd=String(RegExp['$1'])[_0x8f0aa1(0x271)](',');for(let _0x1b82e9 of _0x2eb1fd){_0x1b82e9=(String(_0x1b82e9)||'')['trim']();const _0x3a2244=/^\d+$/[_0x8f0aa1(0x388)](_0x1b82e9);if(_0x3a2244){if('oKBVq'===_0x8f0aa1(0x36f))_0x43742a[_0x8f0aa1(0x21e)](Number(_0x1b82e9));else{const _0x13bd37=_0x1c2fe8[_0x8f0aa1(0x349)],_0x4b2309=_0x13bd37['format'](_0x977525[_0x8f0aa1(0x1ee)](_0x5c3e06)),_0x9cff77=this['textWidth'](_0x4b2309+this['skillCostSeparator']());_0x3f98f0-=_0x9cff77;}}else'TQITb'===_0x8f0aa1(0x148)?_0x43742a[_0x8f0aa1(0x21e)](DataManager[_0x8f0aa1(0x413)](_0x1b82e9)):this['_btbTurnOrderGraphicType']=this['createTurnOrderBTBGraphicType']();}}}if(_0x43742a[_0x8f0aa1(0x286)]<=0x0)return;while(_0x43742a[_0x8f0aa1(0x286)]>this[_0x8f0aa1(0x233)]()){_0x43742a['pop']();}if(_0x43742a['length']<=0x0)return;this[_0x8f0aa1(0x340)]();for(const _0x157ced of _0x43742a){const _0x5e4ed1=new Game_Action(this);_0x5e4ed1[_0x8f0aa1(0x29f)](_0x157ced),_0x5e4ed1[_0x8f0aa1(0x2f7)]=!![],this[_0x8f0aa1(0x1e2)][_0x8f0aa1(0x21e)](_0x5e4ed1);}},Game_Enemy[_0x5130b4(0x249)][_0x5130b4(0x216)]=function(){const _0x3ecce4=_0x5130b4;let _0x2be1ff=this[_0x3ecce4(0x1a8)]();for(const _0x3bd9e6 of this['_actions']){if(!_0x3bd9e6)continue;_0x2be1ff+=_0x3bd9e6['getTotalActionFusionRecipes']();}return _0x2be1ff-0x1;},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x37f)]=Game_Unit['prototype'][_0x5130b4(0x150)],Game_Unit['prototype']['makeActions']=function(){const _0x1fe00c=_0x5130b4;VisuMZ['BattleSystemBTB'][_0x1fe00c(0x37f)][_0x1fe00c(0x3a1)](this);if(BattleManager['isBTB']()&&this===$gameTroop&&SceneManager[_0x1fe00c(0x289)]()){if(_0x1fe00c(0x1e1)!==_0x1fe00c(0x1e1)){const _0x1d2153=this[_0x1fe00c(0x404)],_0x346306=this[_0x1fe00c(0x3f4)](),_0x2cee88=this[_0x1fe00c(0x157)]();this['_graphicSprite']['bitmap']=new _0x2e0cd1(_0x346306,_0x2cee88);const _0x457013=this[_0x1fe00c(0x27c)][_0x1fe00c(0x297)],_0x3e8915=_0x15cc91['iconWidth'],_0x1d48fd=_0x439187[_0x1fe00c(0x26e)],_0x2fc473=_0x7e854a['min'](_0x3e8915,_0x1d48fd,_0x346306,_0x2cee88),_0x261127=_0x1d2153%0x10*_0x3e8915,_0x24aa3a=_0x30d66c[_0x1fe00c(0x275)](_0x1d2153/0x10)*_0x1d48fd,_0x1cdba2=_0x299a27['floor'](_0x37b181['max'](_0x346306-_0x2fc473,0x0)/0x2),_0x402832=_0xb49bd7[_0x1fe00c(0x275)](_0x39e55c[_0x1fe00c(0x3ee)](_0x2cee88-_0x2fc473,0x0)/0x2);_0x457013[_0x1fe00c(0x203)](_0x2c7bb7,_0x261127,_0x24aa3a,_0x3e8915,_0x1d48fd,_0x1cdba2,_0x402832,_0x2fc473,_0x2fc473);}else BattleManager[_0x1fe00c(0x268)]();}},VisuMZ['BattleSystemBTB'][_0x5130b4(0x291)]=Game_Party[_0x5130b4(0x249)][_0x5130b4(0x159)],Game_Party[_0x5130b4(0x249)][_0x5130b4(0x159)]=function(_0x20332d){const _0x1f35db=_0x5130b4;VisuMZ[_0x1f35db(0x2ca)][_0x1f35db(0x291)][_0x1f35db(0x3a1)](this,_0x20332d),SceneManager[_0x1f35db(0x289)]()&&BattleManager[_0x1f35db(0x1c2)]()&&BattleManager[_0x1f35db(0x21d)]['remove']($gameActors[_0x1f35db(0x319)](_0x20332d));},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x378)]=Scene_Battle[_0x5130b4(0x249)]['onDisabledPartyCommandSelection'],Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x1c0)]=function(){const _0x37733c=_0x5130b4;BattleManager[_0x37733c(0x29d)]()?this[_0x37733c(0x197)]():VisuMZ[_0x37733c(0x2ca)][_0x37733c(0x378)][_0x37733c(0x3a1)](this);},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x206)]=Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x2ed)],Scene_Battle['prototype'][_0x5130b4(0x2ed)]=function(){const _0x33303c=_0x5130b4;VisuMZ['BattleSystemBTB'][_0x33303c(0x206)][_0x33303c(0x3a1)](this),this[_0x33303c(0x2cf)]();},Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x2cf)]=function(){const _0x46f10b=_0x5130b4;if(!BattleManager[_0x46f10b(0x29d)]())return;const _0xf1fa1b=this[_0x46f10b(0x2b6)];if(!_0xf1fa1b)return;_0xf1fa1b[_0x46f10b(0x325)](_0x46f10b(0x34a),this['commandBrave'][_0x46f10b(0x1dc)](this)),_0xf1fa1b[_0x46f10b(0x325)](_0x46f10b(0x24d),this[_0x46f10b(0x16a)][_0x46f10b(0x1dc)](this));},Scene_Battle['prototype'][_0x5130b4(0x3f1)]=function(){this['performBrave']();},Scene_Battle[_0x5130b4(0x249)]['commandCancelBTB']=function(){const _0x3ff49d=_0x5130b4,_0x72eb0=BattleManager[_0x3ff49d(0x319)]();if(!_0x72eb0)this['commandCancel']();else{if(_0x72eb0['numActions']()<=0x1){if(_0x3ff49d(0x180)!==_0x3ff49d(0x381))this[_0x3ff49d(0x2bc)]();else return _0x3110de['getBattleSystem']()===_0x3ff49d(0x1e7);}else _0x72eb0[_0x3ff49d(0x1df)]>0x0?this[_0x3ff49d(0x2bc)]():this['reduceBrave']();}},Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x224)]=function(){const _0x3d7579=_0x5130b4,_0x49b9d2=BattleManager[_0x3d7579(0x319)]();if(!_0x49b9d2)return;_0x49b9d2[_0x3d7579(0x224)]();const _0xe680e2=this[_0x3d7579(0x2b6)][_0x3d7579(0x184)],_0x16cbe0=this[_0x3d7579(0x2b6)][_0x3d7579(0x1fe)],_0x416f46=this[_0x3d7579(0x2b6)][_0x3d7579(0x3c3)]();this[_0x3d7579(0x2b6)][_0x3d7579(0x361)](_0x49b9d2),this[_0x3d7579(0x2b6)][_0x3d7579(0x169)](_0x416f46),this[_0x3d7579(0x2b6)][_0x3d7579(0x184)]=_0xe680e2,this[_0x3d7579(0x2b6)][_0x3d7579(0x1fe)]=_0x16cbe0;},Scene_Battle[_0x5130b4(0x249)]['reduceBrave']=function(){const _0x2cf90a=_0x5130b4,_0x403dd7=BattleManager['actor']();if(!_0x403dd7)return;_0x403dd7[_0x2cf90a(0x179)]();const _0x5028ef=this[_0x2cf90a(0x2b6)][_0x2cf90a(0x184)],_0x34a225=this[_0x2cf90a(0x2b6)][_0x2cf90a(0x1fe)],_0x2eca58=this['_actorCommandWindow'][_0x2cf90a(0x3c3)]();this[_0x2cf90a(0x2b6)]['setup'](_0x403dd7),this[_0x2cf90a(0x2b6)][_0x2cf90a(0x169)](_0x2eca58),this['_actorCommandWindow'][_0x2cf90a(0x184)]=_0x5028ef,this[_0x2cf90a(0x2b6)][_0x2cf90a(0x1fe)]=_0x34a225;},VisuMZ['BattleSystemBTB'][_0x5130b4(0x2b1)]=Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x1d8)],Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x1d8)]=function(){const _0x5cae5d=_0x5130b4;VisuMZ[_0x5cae5d(0x2ca)][_0x5cae5d(0x2b1)][_0x5cae5d(0x3a1)](this),this[_0x5cae5d(0x22b)]();},Scene_Battle['prototype'][_0x5130b4(0x22b)]=function(){const _0x42ab6a=_0x5130b4;if(!BattleManager[_0x42ab6a(0x29d)]())return;this[_0x42ab6a(0x193)]=new Window_BTB_TurnOrder();const _0x4cb77d=this['getChildIndex'](this[_0x42ab6a(0x3df)]);this[_0x42ab6a(0x41e)](this[_0x42ab6a(0x193)],_0x4cb77d),this['repositionLogWindowBTB'](),BattleManager[_0x42ab6a(0x326)](!![]);},Scene_Battle[_0x5130b4(0x249)][_0x5130b4(0x17b)]=function(){const _0x5c41d4=_0x5130b4,_0x445a97=Window_BTB_TurnOrder[_0x5c41d4(0x16c)];if(_0x445a97[_0x5c41d4(0x1bb)]!==_0x5c41d4(0x311))return;if(!_0x445a97[_0x5c41d4(0x387)])return;if(!this[_0x5c41d4(0x16d)])return;const _0x2607b2=this[_0x5c41d4(0x193)]['y']-Math[_0x5c41d4(0x2ba)]((Graphics[_0x5c41d4(0x2e7)]-Graphics['boxHeight'])/0x2),_0x57c9b1=_0x2607b2+this[_0x5c41d4(0x193)][_0x5c41d4(0x2e7)];this[_0x5c41d4(0x16d)]['y']=_0x57c9b1+_0x445a97['ScreenBuffer'];};function Sprite_BTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]=Object[_0x5130b4(0x389)](Sprite_Clickable[_0x5130b4(0x249)]),Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x246)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x3e8)]=function(_0x30469b,_0x30b0cc){const _0x42823f=_0x5130b4;this[_0x42823f(0x1d6)](_0x30469b,_0x30b0cc),Sprite_Clickable[_0x42823f(0x249)][_0x42823f(0x3e8)]['call'](this),this[_0x42823f(0x2a0)]=0x0,this['createChildren'](),this[_0x42823f(0x2ab)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x1d6)]=function(_0x55f200,_0x2cee28){const _0x483df4=_0x5130b4;this[_0x483df4(0x13b)]=_0x55f200,this['_index']=_0x2cee28;const _0x32518b=Window_BTB_TurnOrder[_0x483df4(0x16c)],_0x991bea=this[_0x483df4(0x1f8)](),_0x3fe169=this[_0x483df4(0x391)]();this[_0x483df4(0x405)]=0x0,this[_0x483df4(0x293)]=_0x991bea?_0x32518b['SpriteThin']*_0x3fe169:0x0,this['_positionTargetY']=_0x991bea?0x0:_0x32518b['SpriteThin']*_0x3fe169,this[_0x483df4(0x40f)]=0x0,this[_0x483df4(0x301)]=0xff,this[_0x483df4(0x13a)]=![],this[_0x483df4(0x3aa)]=![],this['_containerWidth']=0x0,this[_0x483df4(0x1e3)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x1c4)]=function(){const _0x92689d=_0x5130b4;this[_0x92689d(0x140)](),this['createBackgroundSprite'](),this[_0x92689d(0x25f)](),this[_0x92689d(0x167)](),this[_0x92689d(0x3bc)]();},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['createInitialPositions']=function(){const _0x3cbc0d=_0x5130b4;this['x']=this['_positionTargetX'],this['y']=this[_0x3cbc0d(0x374)];},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x1f8)]=function(){const _0x449b05=_0x5130b4,_0x297703=Window_BTB_TurnOrder[_0x449b05(0x16c)],_0x20ea17=[_0x449b05(0x311),_0x449b05(0x1a2)]['includes'](_0x297703[_0x449b05(0x1bb)]);return _0x20ea17;},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x3f4)]=function(){const _0x1bd4df=_0x5130b4,_0x365422=Window_BTB_TurnOrder[_0x1bd4df(0x16c)];return this[_0x1bd4df(0x1f8)]()?_0x365422[_0x1bd4df(0x2f5)]:_0x365422[_0x1bd4df(0x14f)];},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x157)]=function(){const _0x2b5367=_0x5130b4,_0x3cf46d=Window_BTB_TurnOrder[_0x2b5367(0x16c)];return this[_0x2b5367(0x1f8)]()?_0x3cf46d[_0x2b5367(0x14f)]:_0x3cf46d[_0x2b5367(0x2f5)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x2d8)]=function(){const _0x2b2bff=_0x5130b4;this[_0x2b2bff(0x297)]=new Bitmap(0x48,0x24);const _0x1e7348=this[_0x2b2bff(0x1e0)]()?this[_0x2b2bff(0x1e0)]()['name']():_0x2b2bff(0x2ec)[_0x2b2bff(0x18b)](this['_unit'],this[_0x2b2bff(0x3e7)]);this[_0x2b2bff(0x297)][_0x2b2bff(0x415)](_0x1e7348,0x0,0x0,0x48,0x24,_0x2b2bff(0x3e5));},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x35d)]=function(){const _0x220b69=_0x5130b4;if(!Window_BTB_TurnOrder[_0x220b69(0x16c)]['ShowMarkerBg'])return;const _0x3a38f7=Window_BTB_TurnOrder['Settings'],_0x58841f=this[_0x220b69(0x13b)]===$gameParty?'Actor':_0x220b69(0x2f3),_0x5f3e19='%1SystemBg'['format'](_0x58841f),_0x347047=new Sprite();_0x347047[_0x220b69(0x25e)]['x']=this[_0x220b69(0x25e)]['x'],_0x347047[_0x220b69(0x25e)]['y']=this['anchor']['y'];if(_0x3a38f7[_0x5f3e19]){if('CMxHd'!==_0x220b69(0x3d2)){if(this['_fadeDuration']>0x0){const _0x5d70e7=this[_0x220b69(0x40f)];this[_0x220b69(0x2a0)]=(this[_0x220b69(0x2a0)]*(_0x5d70e7-0x1)+this[_0x220b69(0x301)])/_0x5d70e7,this[_0x220b69(0x40f)]--,this['_fadeDuration']<=0x0&&(this[_0x220b69(0x1a1)](),this['_positionDuration']=0x0,this[_0x220b69(0x24e)](),this[_0x220b69(0x2a0)]=this[_0x220b69(0x301)]);}if(this['_isBattleOver'])return;_0x54b3f2['_phase']==='battleEnd'&&(this['_isBattleOver']=!![],this['startFade'](0x0));}else _0x347047['bitmap']=ImageManager[_0x220b69(0x2d4)](_0x3a38f7[_0x5f3e19]);}else{const _0x1df9a8=this[_0x220b69(0x3f4)](),_0x4cfd09=this[_0x220b69(0x157)]();_0x347047[_0x220b69(0x297)]=new Bitmap(_0x1df9a8,_0x4cfd09);const _0x34aacb=ColorManager[_0x220b69(0x3fa)](_0x3a38f7['%1BgColor1'[_0x220b69(0x18b)](_0x58841f)]),_0x36cc2a=ColorManager[_0x220b69(0x3fa)](_0x3a38f7[_0x220b69(0x210)['format'](_0x58841f)]);_0x347047[_0x220b69(0x297)][_0x220b69(0x342)](0x0,0x0,_0x1df9a8,_0x4cfd09,_0x34aacb,_0x36cc2a,!![]);}this[_0x220b69(0x3a4)]=_0x347047,this[_0x220b69(0x22a)](this['_backgroundSprite']);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x25f)]=function(){const _0x56ff67=_0x5130b4,_0x4fdc24=new Sprite();_0x4fdc24[_0x56ff67(0x25e)]['x']=this[_0x56ff67(0x25e)]['x'],_0x4fdc24['anchor']['y']=this['anchor']['y'],this['_graphicSprite']=_0x4fdc24,this[_0x56ff67(0x22a)](this[_0x56ff67(0x27c)]),this[_0x56ff67(0x276)]();},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['createBorderSprite']=function(){const _0x3fe664=_0x5130b4;if(!Window_BTB_TurnOrder[_0x3fe664(0x16c)]['ShowMarkerBorder'])return;const _0x4d483a=Window_BTB_TurnOrder[_0x3fe664(0x16c)],_0xe746ee=this[_0x3fe664(0x13b)]===$gameParty?'Actor':_0x3fe664(0x2f3),_0x293a00=_0x3fe664(0x3b7)[_0x3fe664(0x18b)](_0xe746ee),_0x12dff4=new Sprite();_0x12dff4[_0x3fe664(0x25e)]['x']=this[_0x3fe664(0x25e)]['x'],_0x12dff4[_0x3fe664(0x25e)]['y']=this[_0x3fe664(0x25e)]['y'];if(_0x4d483a[_0x293a00])_0x12dff4[_0x3fe664(0x297)]=ImageManager['loadSystem'](_0x4d483a[_0x293a00]);else{let _0x1fad84=this[_0x3fe664(0x3f4)](),_0x531c00=this['bitmapHeight'](),_0x51e97d=_0x4d483a[_0x3fe664(0x155)];_0x12dff4[_0x3fe664(0x297)]=new Bitmap(_0x1fad84,_0x531c00);const _0xf78d2b=_0x3fe664(0x309),_0x5a2aa0=ColorManager[_0x3fe664(0x3fa)](_0x4d483a[_0x3fe664(0x2a8)[_0x3fe664(0x18b)](_0xe746ee)]);_0x12dff4[_0x3fe664(0x297)][_0x3fe664(0x3d6)](0x0,0x0,_0x1fad84,_0x531c00,_0xf78d2b),_0x1fad84-=0x2,_0x531c00-=0x2,_0x12dff4['bitmap'][_0x3fe664(0x3d6)](0x1,0x1,_0x1fad84,_0x531c00,_0x5a2aa0),_0x1fad84-=_0x51e97d*0x2,_0x531c00-=_0x51e97d*0x2,_0x12dff4[_0x3fe664(0x297)][_0x3fe664(0x3d6)](0x1+_0x51e97d,0x1+_0x51e97d,_0x1fad84,_0x531c00,_0xf78d2b),_0x1fad84-=0x2,_0x531c00-=0x2,_0x51e97d+=0x1,_0x12dff4[_0x3fe664(0x297)][_0x3fe664(0x232)](0x1+_0x51e97d,0x1+_0x51e97d,_0x1fad84,_0x531c00);}this[_0x3fe664(0x3a4)]=_0x12dff4,this['addChild'](this[_0x3fe664(0x3a4)]),this[_0x3fe664(0x23e)]=this[_0x3fe664(0x3a4)][_0x3fe664(0x23e)],this[_0x3fe664(0x2e7)]=this[_0x3fe664(0x3a4)][_0x3fe664(0x2e7)];},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x3bc)]=function(){const _0x109c8d=_0x5130b4,_0x4ed285=Window_BTB_TurnOrder['Settings'];if(!_0x4ed285['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0xd25a20=this[_0x109c8d(0x3f4)](),_0x286ce3=this['bitmapHeight'](),_0x3aaed5=new Sprite();_0x3aaed5[_0x109c8d(0x25e)]['x']=this[_0x109c8d(0x25e)]['x'],_0x3aaed5[_0x109c8d(0x25e)]['y']=this[_0x109c8d(0x25e)]['y'],_0x3aaed5[_0x109c8d(0x297)]=new Bitmap(_0xd25a20,_0x286ce3),this[_0x109c8d(0x243)]=_0x3aaed5,this[_0x109c8d(0x22a)](this[_0x109c8d(0x243)]);},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x1e0)]=function(){const _0x32db08=_0x5130b4;return this['_unit']?this[_0x32db08(0x13b)][_0x32db08(0x339)]()[this['_index']]:null;},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x33c)]=function(){const _0x28ee27=_0x5130b4;Sprite_Clickable['prototype'][_0x28ee27(0x33c)]['call'](this),this[_0x28ee27(0x1a1)](),this[_0x28ee27(0x24e)](),this[_0x28ee27(0x2ab)](),this[_0x28ee27(0x168)](),this[_0x28ee27(0x41c)](),this[_0x28ee27(0x33a)](),this[_0x28ee27(0x315)](),this[_0x28ee27(0x178)]();},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x1a1)]=function(){const _0x1245d3=_0x5130b4,_0x4d6216=this[_0x1245d3(0x2d1)]();if(this[_0x1245d3(0x2e2)]===_0x4d6216)return;this['_position']=_0x4d6216;this[_0x1245d3(0x2a0)]<0xff&&this['battler']()&&_0x4d6216!==this[_0x1245d3(0x391)]()&&(_0x1245d3(0x417)===_0x1245d3(0x417)?this[_0x1245d3(0x19a)](0xff):(this[_0x1245d3(0x1d6)](_0x5c092f,_0x10b257),_0x233d8a['prototype']['initialize'][_0x1245d3(0x3a1)](this),this['opacity']=0x0,this[_0x1245d3(0x1c4)](),this[_0x1245d3(0x2ab)]()));if(_0x4d6216===this[_0x1245d3(0x391)]()&&this[_0x1245d3(0x40f)]<=0x0&&this[_0x1245d3(0x2a0)]>0x0)_0x1245d3(0x26d)!=='rhigV'?this['startFade'](0x0):_0x562182[_0x1245d3(0x21e)](_0x427e49(_0x2db43b));else this['_fadeDuration']<=0x0&&this[_0x1245d3(0x2a0)]<0xff&&this[_0x1245d3(0x2ab)]();this[_0x1245d3(0x2fe)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x146)]=function(){const _0x2910c7=_0x5130b4,_0x58d6b0=this[_0x2910c7(0x1fc)]();if(!_0x58d6b0)return;let _0x127168=![];if(this[_0x2910c7(0x13c)]!==_0x58d6b0[_0x2910c7(0x23e)])_0x2910c7(0x31c)===_0x2910c7(0x31c)?_0x127168=!![]:_0x57f8e3=_0x20725b;else this[_0x2910c7(0x1e3)]!==_0x58d6b0[_0x2910c7(0x2e7)]&&(_0x127168=!![]);if(_0x127168){if(_0x2910c7(0x24c)===_0x2910c7(0x24c))this[_0x2910c7(0x2fe)]();else{const _0x2f32ed=this['_graphicFaceIndex'],_0x1145f2=this['bitmapWidth'](),_0x4606db=this[_0x2910c7(0x157)](),_0x5285d7=_0x56e67d[_0x2910c7(0x3ee)](_0x1145f2,_0x4606db);this['_graphicSprite'][_0x2910c7(0x297)]=new _0x52885b(_0x1145f2,_0x4606db);const _0x5e0496=this['_graphicSprite']['bitmap'],_0x55bc2b=_0x12ef5c[_0x2910c7(0x1e9)],_0x14ff57=_0x19f970[_0x2910c7(0x3a9)],_0x5ab400=_0x5285d7/_0xc90889[_0x2910c7(0x3ee)](_0x55bc2b,_0x14ff57),_0x5ea1f9=_0x34067a['faceWidth'],_0x4302e4=_0x5696f0[_0x2910c7(0x3a9)],_0x5ea00b=_0x2f32ed%0x4*_0x55bc2b+(_0x55bc2b-_0x5ea1f9)/0x2,_0x1b1c14=_0x405e60[_0x2910c7(0x275)](_0x2f32ed/0x4)*_0x14ff57+(_0x14ff57-_0x4302e4)/0x2,_0x133fb6=(_0x1145f2-_0x55bc2b*_0x5ab400)/0x2,_0x312a9e=(_0x4606db-_0x14ff57*_0x5ab400)/0x2;_0x5e0496[_0x2910c7(0x203)](_0x2bcc28,_0x5ea00b,_0x1b1c14,_0x5ea1f9,_0x4302e4,_0x133fb6,_0x312a9e,_0x5285d7,_0x5285d7);}}},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['calculateTargetPositions']=function(){const _0x138f7f=_0x5130b4,_0x3f1820=Window_BTB_TurnOrder[_0x138f7f(0x16c)],_0x45ac4d=this[_0x138f7f(0x1f8)](),_0x5ab94f=_0x3f1820[_0x138f7f(0x2b4)],_0x2652a9=_0x3f1820[_0x138f7f(0x2d0)],_0x291910=SceneManager[_0x138f7f(0x239)][_0x138f7f(0x193)];if(!_0x291910)return;const _0x1734fa=this['containerPosition']();this['_positionDuration']=_0x3f1820[_0x138f7f(0x3b1)],this[_0x138f7f(0x293)]=_0x45ac4d?_0x3f1820[_0x138f7f(0x2f5)]*_0x1734fa:0x0,this[_0x138f7f(0x374)]=_0x45ac4d?0x0:_0x3f1820[_0x138f7f(0x2f5)]*_0x1734fa,_0x1734fa>0x0&&(_0x138f7f(0x2d6)!=='seDXn'?(this[_0x138f7f(0x293)]+=_0x45ac4d?_0x2652a9:0x0,this[_0x138f7f(0x374)]+=_0x45ac4d?0x0:_0x2652a9):this[_0x138f7f(0x19a)](0xff)),_0x5ab94f?this[_0x138f7f(0x293)]=_0x45ac4d?_0x291910[_0x138f7f(0x23e)]-this[_0x138f7f(0x293)]-_0x3f1820[_0x138f7f(0x2f5)]:0x0:this[_0x138f7f(0x374)]=_0x45ac4d?0x0:_0x291910[_0x138f7f(0x2e7)]-this[_0x138f7f(0x374)]-_0x3f1820['SpriteThin'];},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x24e)]=function(){const _0x5630ff=_0x5130b4;if(this[_0x5630ff(0x40f)]>0x0)return;if(this[_0x5630ff(0x405)]>0x0){if(_0x5630ff(0x408)==='pTdZo')return this['battler']();else{const _0x5f3f6d=this['_positionDuration'];this['x']=(this['x']*(_0x5f3f6d-0x1)+this[_0x5630ff(0x293)])/_0x5f3f6d,this['y']=(this['y']*(_0x5f3f6d-0x1)+this[_0x5630ff(0x374)])/_0x5f3f6d,this[_0x5630ff(0x405)]--;}}if(this[_0x5630ff(0x405)]<=0x0){if(_0x5630ff(0x34f)===_0x5630ff(0x385))this[_0x5630ff(0x267)]=_0xf295b2[_0x5630ff(0x156)](_0x4b4d35,this[_0x5630ff(0x40a)]()),this[_0x5630ff(0x20d)]();else{this['x']=this[_0x5630ff(0x293)],this['y']=this[_0x5630ff(0x374)];if(this[_0x5630ff(0x2a0)]<0xff&&!this[_0x5630ff(0x333)]&&this[_0x5630ff(0x40f)]<=0x0){if('WCTaK'===_0x5630ff(0x375))return![];else{const _0x45f59e=this[_0x5630ff(0x1e0)]();_0x45f59e&&(this['_fadeTarget']=_0x45f59e[_0x5630ff(0x15a)]()&&_0x45f59e['isAppeared']()?0xff:0x0);}}}}},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x391)]=function(){const _0x258a36=_0x5130b4,_0xf03836=Window_BTB_TurnOrder[_0x258a36(0x16c)],_0x3f7205=this[_0x258a36(0x1f8)]()?_0xf03836[_0x258a36(0x3ab)]:_0xf03836[_0x258a36(0x32a)];return _0x3f7205+0x1;},Sprite_BTB_TurnOrder_Battler['prototype']['containerWindow']=function(){return SceneManager['_scene']['_btbTurnOrderWindow'];},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['containerPosition']=function(){const _0x51b961=_0x5130b4,_0x354a3c=this[_0x51b961(0x1e0)]();if(!_0x354a3c)return this[_0x51b961(0x391)]();if(_0x354a3c===BattleManager['_subject'])return 0x0;if(BattleManager[_0x51b961(0x21d)][_0x51b961(0x2c2)](_0x354a3c)){const _0x25dc5c=BattleManager[_0x51b961(0x21d)][_0x51b961(0x31a)](_0x354a3c)+0x1;return _0x25dc5c;}return this[_0x51b961(0x391)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x19a)]=function(_0x4362a8){const _0x1c7a8c=_0x5130b4,_0x49d34e=Window_BTB_TurnOrder['Settings'];this[_0x1c7a8c(0x40f)]=_0x49d34e[_0x1c7a8c(0x3b1)],this[_0x1c7a8c(0x301)]=_0x4362a8;},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x2ab)]=function(){const _0x3e86f9=_0x5130b4,_0x11d296=this[_0x3e86f9(0x1e0)]();if(!_0x11d296)return;if(this[_0x3e86f9(0x13a)]===_0x11d296['isAlive']()&&this['_isAppeared']===_0x11d296['isAppeared']())return;this[_0x3e86f9(0x13a)]=_0x11d296[_0x3e86f9(0x15a)](),this['_isAppeared']=_0x11d296[_0x3e86f9(0x314)]();let _0x4311f5=this[_0x3e86f9(0x13a)]&&this[_0x3e86f9(0x3aa)]?0xff:0x0;this[_0x3e86f9(0x19a)](_0x4311f5);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x168)]=function(){const _0x220057=_0x5130b4;if(this['_fadeDuration']>0x0){const _0x5e3b30=this[_0x220057(0x40f)];this['opacity']=(this['opacity']*(_0x5e3b30-0x1)+this[_0x220057(0x301)])/_0x5e3b30,this[_0x220057(0x40f)]--;if(this['_fadeDuration']<=0x0){if(_0x220057(0x416)!==_0x220057(0x416))return _0x220057(0x23b);else this['checkPosition'](),this[_0x220057(0x405)]=0x0,this[_0x220057(0x24e)](),this[_0x220057(0x2a0)]=this[_0x220057(0x301)];}}if(this[_0x220057(0x333)])return;BattleManager[_0x220057(0x38c)]===_0x220057(0x33e)&&(this['_isBattleOver']=!![],this[_0x220057(0x19a)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['updateGraphic']=function(){const _0x50f8f7=_0x5130b4,_0x5e4ddc=this[_0x50f8f7(0x1e0)]();if(!_0x5e4ddc)return;const _0x255a8b=Window_BTB_TurnOrder[_0x50f8f7(0x16c)],_0x4ec8f2=this['_unit']===$gameParty?_0x50f8f7(0x2bb):_0x50f8f7(0x2f3);let _0x549d1f=_0x5e4ddc['TurnOrderBTBGraphicType']();if(_0x5e4ddc[_0x50f8f7(0x223)]()&&_0x549d1f===_0x50f8f7(0x17d))_0x549d1f=_0x50f8f7(0x23b);else{if(_0x5e4ddc[_0x50f8f7(0x329)]()&&_0x549d1f===_0x50f8f7(0x353)){if('CxASM'!==_0x50f8f7(0x2d9))_0x549d1f=_0x50f8f7(0x17d);else return this[_0x50f8f7(0x267)]||0x0;}}if(this['_graphicType']!==_0x549d1f)return this[_0x50f8f7(0x276)]();switch(this[_0x50f8f7(0x372)]){case _0x50f8f7(0x23b):if(this[_0x50f8f7(0x170)]!==_0x5e4ddc['TurnOrderBTBGraphicFaceName']()){if('ImdtU'===_0x50f8f7(0x31f))return this['processUpdateGraphic']();else{if(!_0x4be637['isBTB']())return;const _0x479fb4=this[_0x50f8f7(0x397)](_0x546338);this[_0x50f8f7(0x31e)](_0x479fb4);}}if(this[_0x50f8f7(0x2cd)]!==_0x5e4ddc[_0x50f8f7(0x367)]()){if(_0x50f8f7(0x1c7)!==_0x50f8f7(0x373))return this['processUpdateGraphic']();else{const _0x513979=_0x50f8f7(0x38d),_0x1407a5=_0x129c78[_0x50f8f7(0x2ff)[_0x50f8f7(0x18b)](_0x513979)],_0x187dc5=_0x4abb48[_0x50f8f7(0x15f)[_0x50f8f7(0x18b)](_0x513979)],_0x267f2b=_0x231ad4[_0x50f8f7(0x228)[_0x50f8f7(0x18b)](_0x513979)];_0x263dfd[_0x50f8f7(0x28d)]([this],_0x1407a5,_0x187dc5,_0x267f2b);}}break;case _0x50f8f7(0x3da):if(this[_0x50f8f7(0x404)]!==_0x5e4ddc['TurnOrderBTBGraphicIconIndex']())return this[_0x50f8f7(0x276)]();break;case'enemy':if(_0x5e4ddc[_0x50f8f7(0x160)]()){if(this[_0x50f8f7(0x26b)]!==_0x5e4ddc[_0x50f8f7(0x2f2)]()){if(_0x50f8f7(0x272)===_0x50f8f7(0x272))return this['processUpdateGraphic']();else this[_0x50f8f7(0x224)]();}}else{if(this[_0x50f8f7(0x29e)]!==_0x5e4ddc[_0x50f8f7(0x194)]())return this[_0x50f8f7(0x276)]();}break;case _0x50f8f7(0x353):if(_0x5e4ddc[_0x50f8f7(0x223)]()){if(this[_0x50f8f7(0x26b)]!==_0x5e4ddc[_0x50f8f7(0x194)]())return this[_0x50f8f7(0x276)]();}else{if(this['_graphicEnemy']!==_0x5e4ddc[_0x50f8f7(0x194)]()){if('bJghR'!==_0x50f8f7(0x218))return this[_0x50f8f7(0x276)]();else{const _0x3edefe=this[_0x50f8f7(0x319)]()[_0x50f8f7(0x410)];if(_0x3edefe['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x4b6e98(_0x5662df['$1']);return _0xa79510[_0x50f8f7(0x16c)][_0x50f8f7(0x22c)];}}}break;}},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x276)]=function(){const _0x33273f=_0x5130b4,_0x2884af=this[_0x33273f(0x1e0)]();if(!_0x2884af)return;this[_0x33273f(0x372)]=_0x2884af[_0x33273f(0x154)]();if(_0x2884af[_0x33273f(0x223)]()&&this[_0x33273f(0x372)]==='enemy'){if(_0x33273f(0x18d)==='uhgzu')this['_graphicType']='face';else{this['_unit']=_0x3217c0,this[_0x33273f(0x3e7)]=_0x582bff;const _0x24bc29=_0x19ddb6[_0x33273f(0x16c)],_0x194ac4=this[_0x33273f(0x1f8)](),_0x2bfb6f=this[_0x33273f(0x391)]();this['_positionDuration']=0x0,this[_0x33273f(0x293)]=_0x194ac4?_0x24bc29[_0x33273f(0x2f5)]*_0x2bfb6f:0x0,this[_0x33273f(0x374)]=_0x194ac4?0x0:_0x24bc29[_0x33273f(0x2f5)]*_0x2bfb6f,this[_0x33273f(0x40f)]=0x0,this[_0x33273f(0x301)]=0xff,this[_0x33273f(0x13a)]=![],this[_0x33273f(0x3aa)]=![],this['_containerWidth']=0x0,this[_0x33273f(0x1e3)]=0x0;}}else _0x2884af[_0x33273f(0x329)]()&&this[_0x33273f(0x372)]===_0x33273f(0x353)&&(this[_0x33273f(0x372)]=_0x33273f(0x17d));let _0x220393;switch(this['_graphicType']){case _0x33273f(0x23b):this[_0x33273f(0x170)]=_0x2884af[_0x33273f(0x347)](),this[_0x33273f(0x2cd)]=_0x2884af[_0x33273f(0x367)](),_0x220393=ImageManager[_0x33273f(0x229)](this['_graphicFaceName']),_0x220393[_0x33273f(0x263)](this[_0x33273f(0x334)][_0x33273f(0x1dc)](this,_0x220393));break;case'icon':this[_0x33273f(0x404)]=_0x2884af[_0x33273f(0x142)](),_0x220393=ImageManager['loadSystem']('IconSet'),_0x220393[_0x33273f(0x263)](this['changeIconGraphicBitmap'][_0x33273f(0x1dc)](this,_0x220393));break;case _0x33273f(0x17d):if(_0x2884af[_0x33273f(0x160)]()){if('xKmhM'!==_0x33273f(0x215)){const _0x466293=this['bitmapWidth'](),_0xa975cc=this[_0x33273f(0x157)](),_0x60b962=_0x19b80b[_0x33273f(0x156)](_0x466293,_0xa975cc);this[_0x33273f(0x27c)][_0x33273f(0x297)]=new _0x5a47f3(_0x466293,_0xa975cc);const _0x11e607=this[_0x33273f(0x27c)][_0x33273f(0x297)],_0x585f7c=this[_0x33273f(0x26b)][_0x33273f(0x2c9)](/\$/i),_0x14bd6d=_0x585f7c?0x1:_0x8c7412['svActorHorzCells'],_0xaf898d=_0x585f7c?0x1:_0x41a892['svActorVertCells'],_0x71f9c6=_0x1096e5[_0x33273f(0x23e)]/_0x14bd6d,_0x36aae8=_0xcc898b[_0x33273f(0x2e7)]/_0xaf898d,_0x4141e8=_0x307bd0[_0x33273f(0x156)](0x1,_0x60b962/_0x71f9c6,_0x60b962/_0x36aae8),_0x441b13=_0x71f9c6*_0x4141e8,_0x383c2c=_0x36aae8*_0x4141e8,_0x5bde96=_0x34071f[_0x33273f(0x2ba)]((_0x466293-_0x441b13)/0x2),_0x5d75ca=_0x1add79['round']((_0xa975cc-_0x383c2c)/0x2);_0x11e607['blt'](_0xf93a1f,0x0,0x0,_0x71f9c6,_0x36aae8,_0x5bde96,_0x5d75ca,_0x441b13,_0x383c2c);}else this[_0x33273f(0x26b)]=_0x2884af['svBattlerName'](),_0x220393=ImageManager['loadSvActor'](this[_0x33273f(0x26b)]),_0x220393[_0x33273f(0x263)](this[_0x33273f(0x1b6)]['bind'](this,_0x220393));}else{if($gameSystem[_0x33273f(0x139)]()){if(_0x33273f(0x1da)===_0x33273f(0x302))return _0x33273f(0x23b);else this['_graphicEnemy']=_0x2884af[_0x33273f(0x194)](),_0x220393=ImageManager[_0x33273f(0x3c7)](this['_graphicEnemy']),_0x220393['addLoadListener'](this[_0x33273f(0x281)][_0x33273f(0x1dc)](this,_0x220393));}else _0x33273f(0x235)!==_0x33273f(0x399)?(this[_0x33273f(0x29e)]=_0x2884af[_0x33273f(0x194)](),_0x220393=ImageManager[_0x33273f(0x2e6)](this[_0x33273f(0x29e)]),_0x220393['addLoadListener'](this[_0x33273f(0x281)][_0x33273f(0x1dc)](this,_0x220393))):this['btbPayItemFusionCosts']();}break;case _0x33273f(0x353):this[_0x33273f(0x26b)]=_0x2884af['battlerName'](),_0x220393=ImageManager['loadSvActor'](this[_0x33273f(0x26b)]),_0x220393[_0x33273f(0x263)](this[_0x33273f(0x1b6)]['bind'](this,_0x220393));break;}},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['changeFaceGraphicBitmap']=function(_0x56491d){const _0x5270ac=_0x5130b4,_0x2cf34a=this[_0x5270ac(0x2cd)],_0x352687=this[_0x5270ac(0x3f4)](),_0x1efcfa=this[_0x5270ac(0x157)](),_0x4cf991=Math[_0x5270ac(0x3ee)](_0x352687,_0x1efcfa);this[_0x5270ac(0x27c)]['bitmap']=new Bitmap(_0x352687,_0x1efcfa);const _0x4f4bc5=this[_0x5270ac(0x27c)][_0x5270ac(0x297)],_0x28fb36=ImageManager[_0x5270ac(0x1e9)],_0x1403ae=ImageManager[_0x5270ac(0x3a9)],_0x389a20=_0x4cf991/Math[_0x5270ac(0x3ee)](_0x28fb36,_0x1403ae),_0x54c7a5=ImageManager['faceWidth'],_0x172d28=ImageManager[_0x5270ac(0x3a9)],_0x31622e=_0x2cf34a%0x4*_0x28fb36+(_0x28fb36-_0x54c7a5)/0x2,_0x1b247c=Math[_0x5270ac(0x275)](_0x2cf34a/0x4)*_0x1403ae+(_0x1403ae-_0x172d28)/0x2,_0x91a6b1=(_0x352687-_0x28fb36*_0x389a20)/0x2,_0x3a420f=(_0x1efcfa-_0x1403ae*_0x389a20)/0x2;_0x4f4bc5[_0x5270ac(0x203)](_0x56491d,_0x31622e,_0x1b247c,_0x54c7a5,_0x172d28,_0x91a6b1,_0x3a420f,_0x4cf991,_0x4cf991);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5130b4(0x3ce)]=function(_0x324057){const _0x1a61fe=_0x5130b4,_0x2d00d4=this[_0x1a61fe(0x404)],_0x39ed5d=this[_0x1a61fe(0x3f4)](),_0x3a1abc=this['bitmapHeight']();this['_graphicSprite']['bitmap']=new Bitmap(_0x39ed5d,_0x3a1abc);const _0x454603=this['_graphicSprite'][_0x1a61fe(0x297)],_0x37a79a=ImageManager['iconWidth'],_0x3fa518=ImageManager['iconHeight'],_0x2bede1=Math[_0x1a61fe(0x156)](_0x37a79a,_0x3fa518,_0x39ed5d,_0x3a1abc),_0x38143d=_0x2d00d4%0x10*_0x37a79a,_0x2ad8cb=Math[_0x1a61fe(0x275)](_0x2d00d4/0x10)*_0x3fa518,_0x2d95b3=Math['floor'](Math[_0x1a61fe(0x3ee)](_0x39ed5d-_0x2bede1,0x0)/0x2),_0x4711c9=Math[_0x1a61fe(0x275)](Math[_0x1a61fe(0x3ee)](_0x3a1abc-_0x2bede1,0x0)/0x2);_0x454603[_0x1a61fe(0x203)](_0x324057,_0x38143d,_0x2ad8cb,_0x37a79a,_0x3fa518,_0x2d95b3,_0x4711c9,_0x2bede1,_0x2bede1);},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x1b6)]=function(_0x4ebc36){const _0x447e40=_0x5130b4,_0x6b5bc7=this[_0x447e40(0x3f4)](),_0x44115c=this[_0x447e40(0x157)](),_0xaaf68d=Math[_0x447e40(0x156)](_0x6b5bc7,_0x44115c);this[_0x447e40(0x27c)][_0x447e40(0x297)]=new Bitmap(_0x6b5bc7,_0x44115c);const _0xc89ca1=this[_0x447e40(0x27c)][_0x447e40(0x297)],_0x29a437=this[_0x447e40(0x26b)][_0x447e40(0x2c9)](/\$/i),_0x269d03=_0x29a437?0x1:ImageManager[_0x447e40(0x20f)],_0x432553=_0x29a437?0x1:ImageManager[_0x447e40(0x1a9)],_0x398583=_0x4ebc36[_0x447e40(0x23e)]/_0x269d03,_0x13f85b=_0x4ebc36[_0x447e40(0x2e7)]/_0x432553,_0xb16ca1=Math[_0x447e40(0x156)](0x1,_0xaaf68d/_0x398583,_0xaaf68d/_0x13f85b),_0x5835c1=_0x398583*_0xb16ca1,_0x193718=_0x13f85b*_0xb16ca1,_0x32ede1=Math[_0x447e40(0x2ba)]((_0x6b5bc7-_0x5835c1)/0x2),_0x3c1342=Math[_0x447e40(0x2ba)]((_0x44115c-_0x193718)/0x2);_0xc89ca1[_0x447e40(0x203)](_0x4ebc36,0x0,0x0,_0x398583,_0x13f85b,_0x32ede1,_0x3c1342,_0x5835c1,_0x193718);},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['changeEnemyGraphicBitmap']=function(_0x211322){const _0x3a79dc=_0x5130b4,_0x2ec59d=Window_BTB_TurnOrder[_0x3a79dc(0x16c)],_0x41913b=this[_0x3a79dc(0x3f4)](),_0x35b500=this[_0x3a79dc(0x157)](),_0x1b6fb9=Math['min'](_0x41913b,_0x35b500);this['_graphicSprite']['bitmap']=new Bitmap(_0x41913b,_0x35b500);const _0x4c8c6e=this[_0x3a79dc(0x27c)][_0x3a79dc(0x297)],_0x2dba81=Math['min'](0x1,_0x1b6fb9/_0x211322[_0x3a79dc(0x23e)],_0x1b6fb9/_0x211322[_0x3a79dc(0x2e7)]),_0x1b8ec4=_0x211322['width']*_0x2dba81,_0x331b7c=_0x211322[_0x3a79dc(0x2e7)]*_0x2dba81,_0x589a91=Math[_0x3a79dc(0x2ba)]((_0x41913b-_0x1b8ec4)/0x2),_0x44193f=Math[_0x3a79dc(0x2ba)]((_0x35b500-_0x331b7c)/0x2);_0x4c8c6e[_0x3a79dc(0x203)](_0x211322,0x0,0x0,_0x211322[_0x3a79dc(0x23e)],_0x211322[_0x3a79dc(0x2e7)],_0x589a91,_0x44193f,_0x1b8ec4,_0x331b7c);},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x33a)]=function(){const _0x41787e=_0x5130b4,_0x484ccd=this['battler']();if(!_0x484ccd)return;if(!_0x484ccd[_0x41787e(0x329)]())return;if(this[_0x41787e(0x1f7)]===_0x484ccd[_0x41787e(0x380)]())return;this[_0x41787e(0x1f7)]=_0x484ccd['battlerHue']();if(_0x484ccd[_0x41787e(0x160)]())this[_0x41787e(0x1f7)]=0x0;this[_0x41787e(0x27c)][_0x41787e(0x330)](this[_0x41787e(0x1f7)]);},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)]['updateLetter']=function(){const _0xe5d89d=_0x5130b4;if(!this[_0xe5d89d(0x243)])return;const _0x58f689=this[_0xe5d89d(0x1e0)]();if(!_0x58f689)return;if(this[_0xe5d89d(0x401)]===_0x58f689['_letter']&&this[_0xe5d89d(0x214)]===_0x58f689[_0xe5d89d(0x214)])return;this[_0xe5d89d(0x401)]=_0x58f689[_0xe5d89d(0x401)],this['_plural']=_0x58f689[_0xe5d89d(0x214)];const _0x2a8727=Window_BTB_TurnOrder['Settings'],_0x51b382=this['isHorz'](),_0x18c8e9=this[_0xe5d89d(0x3f4)](),_0x37d567=this['bitmapHeight'](),_0x51dce0=this[_0xe5d89d(0x243)]['bitmap'];_0x51dce0[_0xe5d89d(0x18c)]();if(!this[_0xe5d89d(0x214)])return;_0x51dce0[_0xe5d89d(0x254)]=_0x2a8727['EnemyBattlerFontFace']||$gameSystem[_0xe5d89d(0x3ae)](),_0x51dce0[_0xe5d89d(0x419)]=_0x2a8727[_0xe5d89d(0x2aa)]||0x10,_0x51b382?_0x51dce0[_0xe5d89d(0x415)](this[_0xe5d89d(0x401)]['trim'](),0x0,_0x37d567/0x2,_0x18c8e9,_0x37d567/0x2,_0xe5d89d(0x3e5)):_0x51dce0['drawText'](this[_0xe5d89d(0x401)][_0xe5d89d(0x195)](),0x0,0x2,_0x18c8e9-0x8,_0x37d567-0x4,_0xe5d89d(0x32d));},Sprite_BTB_TurnOrder_Battler[_0x5130b4(0x249)][_0x5130b4(0x178)]=function(){const _0x20c559=_0x5130b4,_0x32e9c5=this[_0x20c559(0x1e0)]();if(!_0x32e9c5)return;const _0x1c3363=_0x32e9c5[_0x20c559(0x1e0)]();if(!_0x1c3363)return;const _0x19f6bd=_0x1c3363['mainSprite']();if(!_0x19f6bd)return;this[_0x20c559(0x2bf)](_0x19f6bd[_0x20c559(0x2a3)]);},Sprite_BTB_TurnOrder_Battler['prototype']['getStateTooltipBattler']=function(){const _0x27d2b3=_0x5130b4;return this[_0x27d2b3(0x1e0)]();},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x201)]=Window_Base[_0x5130b4(0x249)][_0x5130b4(0x237)],Window_Base['prototype'][_0x5130b4(0x237)]=function(_0x1d4b8d,_0x2368ba,_0x22da78){const _0x5cbb1b=_0x5130b4;return _0x22da78=VisuMZ[_0x5cbb1b(0x2ca)][_0x5cbb1b(0x201)][_0x5cbb1b(0x3a1)](this,_0x1d4b8d,_0x2368ba,_0x22da78),_0x22da78=this[_0x5cbb1b(0x3c0)](_0x1d4b8d,_0x2368ba,_0x22da78),_0x22da78;},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x147)]=Window_Base['prototype']['drawItemNumber'],Window_Base[_0x5130b4(0x249)]['drawItemNumber']=function(_0xacced6,_0x34717f,_0x1a7e3a,_0x22efee){const _0x1ca4ce=_0x5130b4;if(BattleManager[_0x1ca4ce(0x29d)]()&&this['constructor']===Window_BattleItem){if(_0x1ca4ce(0x332)!==_0x1ca4ce(0x332))return _0x358553[_0x1ca4ce(0x2ca)][_0x1ca4ce(0x226)]['call'](this);else this[_0x1ca4ce(0x1ae)](_0xacced6,_0x34717f,_0x1a7e3a,_0x22efee);}else VisuMZ['BattleSystemBTB'][_0x1ca4ce(0x147)][_0x1ca4ce(0x3a1)](this,_0xacced6,_0x34717f,_0x1a7e3a,_0x22efee);this[_0x1ca4ce(0x2be)]();},Window_Base['prototype']['drawItemNumberBTB']=function(_0x3310e1,_0x2539ce,_0x937241,_0x2493ae){const _0x681614=_0x5130b4,_0x261e97=VisuMZ[_0x681614(0x2ca)][_0x681614(0x16c)][_0x681614(0x1b8)],_0x1c17a4=BattleManager[_0x681614(0x3db)]||$gameParty['members']()[0x0],_0x2a870b=this['makeAdditionalCostTextBTB'](_0x1c17a4,_0x3310e1,''),_0x2c28c8=this['textSizeEx'](_0x2a870b)[_0x681614(0x23e)],_0xe214aa=_0x261e97['CostPosition'];let _0x343340=_0x2539ce+_0x2493ae-_0x2c28c8;if(_0x2a870b===''){if(_0x681614(0x3b3)!==_0x681614(0x1b9))VisuMZ[_0x681614(0x2ca)]['Window_Base_drawItemNumber']['call'](this,_0x3310e1,_0x2539ce,_0x937241,_0x2493ae);else{if(_0x50e43e[_0x681614(0x2c9)](_0x50bbbe[_0x681614(0x3ca)])){const _0x28cca3=_0x101215(_0x53d788['$1']);this[_0x681614(0x3cb)]()[_0x681614(0x363)](_0x28cca3);}if(_0x596170[_0x681614(0x2c9)](_0x1c8cdc[_0x681614(0x3f8)])){const _0x965dd7=_0x3da53b(_0x48445a['$1']);this[_0x681614(0x3cb)]()[_0x681614(0x1b4)](_0x965dd7);}const _0x4fa586=_0x681614(0x3cd),_0x3c4442=_0xe3bbe6[_0x681614(0x2ca)][_0x681614(0x3ea)](_0x252850,_0x4fa586);if(_0x4e1172[_0x681614(0x2ca)]['JS'][_0x3c4442]){const _0x142bad=_0x1d94d8[_0x681614(0x2ca)]['JS'][_0x3c4442][_0x681614(0x3a1)](this,this['subject'](),_0x324879,this[_0x681614(0x3cb)]()[_0x681614(0x355)]());this[_0x681614(0x3cb)]()['setBravePoints'](_0x142bad);}}}else{if(this[_0x681614(0x257)](_0x3310e1)){this[_0x681614(0x2be)]();const _0x3b141c=VisuMZ[_0x681614(0x245)][_0x681614(0x16c)][_0x681614(0x338)];this[_0x681614(0x1c9)]['fontSize']=_0x3b141c[_0x681614(0x37b)];if(_0xe214aa){const _0x59d215=_0x3b141c[_0x681614(0x349)],_0x2672a7=_0x59d215[_0x681614(0x18b)]($gameParty[_0x681614(0x1ee)](_0x3310e1)),_0xab7ed7=this[_0x681614(0x2cc)](_0x2672a7+this[_0x681614(0x3b6)]());_0x343340-=_0xab7ed7;}else _0x2493ae-=this[_0x681614(0x2cc)](this[_0x681614(0x3b6)]())+_0x2c28c8;VisuMZ[_0x681614(0x2ca)][_0x681614(0x147)][_0x681614(0x3a1)](this,_0x3310e1,_0x2539ce,_0x937241,_0x2493ae);}}this['drawTextEx'](_0x2a870b,_0x343340,_0x937241);},Window_Base[_0x5130b4(0x249)][_0x5130b4(0x3c0)]=function(_0x18861f,_0xfa1041,_0x508e8e){const _0xea284b=_0x5130b4;if(!BattleManager['isBTB']())return _0x508e8e;if(!_0x18861f)return _0x508e8e;if(!_0xfa1041)return _0x508e8e;if(_0xfa1041['note'][_0xea284b(0x2c9)](VisuMZ['BattleSystemBTB'][_0xea284b(0x14e)][_0xea284b(0x352)]))return _0x508e8e;let _0x15b8a8=_0x18861f[_0xea284b(0x397)](_0xfa1041);const _0x4d56b7=VisuMZ[_0xea284b(0x2ca)][_0xea284b(0x16c)][_0xea284b(0x1b8)],_0x55661b=_0x4d56b7['CostPosition'],_0x4c5e44=_0x4d56b7[_0xea284b(0x274)],_0x44d3f3=_0x4d56b7[_0xea284b(0x1cc)],_0xfd222=_0x4d56b7[_0xea284b(0x354)]||0x0,_0x232f89=_0x4d56b7[_0xea284b(0x2dd)],_0x4f9efc=_0x4d56b7[_0xea284b(0x213)];if(DataManager[_0xea284b(0x371)](_0xfa1041)&&this[_0xea284b(0x246)]===Window_ActorCommand){if(!_0x4c5e44&&_0xfa1041['id']===_0x18861f[_0xea284b(0x3b9)]())return _0x508e8e;if(!_0x44d3f3&&_0xfa1041['id']===_0x18861f[_0xea284b(0x409)]())return _0x508e8e;}_0x15b8a8-=_0xfd222;if(_0x15b8a8<0x0)return _0x508e8e;if(!_0x232f89&&_0x15b8a8===0x0)return _0x508e8e;if(!_0x4f9efc&&_0x15b8a8===0x1)return _0x508e8e;const _0x24cd82=_0xea284b(0x16b)[_0xea284b(0x18b)](ImageManager[_0xea284b(0x1d7)]),_0x3772ef=TextManager[_0xea284b(0x2af)];let _0x32a360=TextManager[_0xea284b(0x270)]['format'](_0x15b8a8,_0x3772ef,_0x24cd82);if(_0x508e8e==='')_0x508e8e+=_0x32a360;else{if(_0x55661b){if('qKKNk'!=='XYXOG')_0x508e8e=_0x32a360+this[_0xea284b(0x3b6)]()+_0x508e8e;else{const _0x52d6cf=this[_0xea284b(0x319)]()[_0xea284b(0x410)];if(_0x52d6cf[_0xea284b(0x2c9)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x594134(_0x27e2dd['$1']);return this['faceName']();}}else _0x508e8e=_0x508e8e+this[_0xea284b(0x3b6)]()+_0x32a360;}return _0x508e8e;},Window_Selectable[_0x5130b4(0x249)][_0x5130b4(0x321)]=function(){return![];},VisuMZ['BattleSystemBTB'][_0x5130b4(0x259)]=Window_Selectable['prototype'][_0x5130b4(0x169)],Window_Selectable[_0x5130b4(0x249)][_0x5130b4(0x169)]=function(_0x35b126){const _0x19eab4=_0x5130b4;VisuMZ[_0x19eab4(0x2ca)][_0x19eab4(0x259)][_0x19eab4(0x3a1)](this,_0x35b126),this[_0x19eab4(0x321)]()&&this[_0x19eab4(0x21f)]&&('oXUAS'===_0x19eab4(0x1d0)?this['applyBattleItemWindowBTB']():_0x243428=_0xfe1a5d[_0x19eab4(0x3ee)](_0x328e52,_0x11d08a));},Window_Selectable[_0x5130b4(0x249)][_0x5130b4(0x2b0)]=function(){const _0x57e50e=_0x5130b4;BattleManager[_0x57e50e(0x1c6)]();},VisuMZ[_0x5130b4(0x2ca)]['Window_Help_setItem']=Window_Help[_0x5130b4(0x249)][_0x5130b4(0x2d3)],Window_Help[_0x5130b4(0x249)][_0x5130b4(0x2d3)]=function(_0x3492e9){const _0xbd142f=_0x5130b4;if(BattleManager[_0xbd142f(0x29d)]()&&_0x3492e9&&_0x3492e9[_0xbd142f(0x410)]&&_0x3492e9[_0xbd142f(0x410)]['match'](VisuMZ[_0xbd142f(0x2ca)]['RegExp']['BTB_Help'])){if(_0xbd142f(0x318)===_0xbd142f(0x366))return _0x27da11(_0x3938f9['$1']);else this[_0xbd142f(0x141)](String(RegExp['$1']));}else VisuMZ[_0xbd142f(0x2ca)]['Window_Help_setItem']['call'](this,_0x3492e9);},VisuMZ['BattleSystemBTB']['Window_BattleLog_startAction']=Window_BattleLog[_0x5130b4(0x249)][_0x5130b4(0x35b)],Window_BattleLog[_0x5130b4(0x249)][_0x5130b4(0x35b)]=function(_0xebf390,_0x802e63,_0x56fe1f){const _0x33690a=_0x5130b4;this[_0x33690a(0x2a9)](_0xebf390)?this[_0x33690a(0x32f)](_0xebf390,_0x802e63,_0x56fe1f):_0x33690a(0x16f)!==_0x33690a(0x1b7)?VisuMZ[_0x33690a(0x2ca)][_0x33690a(0x3e4)]['call'](this,_0xebf390,_0x802e63,_0x56fe1f):_0x5557f6[_0x33690a(0x29d)]()&&_0xf95d59&&_0x161233[_0x33690a(0x410)]&&_0x55bb06[_0x33690a(0x410)][_0x33690a(0x2c9)](_0x2ea975['BattleSystemBTB']['RegExp']['BTB_Help'])?this[_0x33690a(0x141)](_0x45ffc8(_0x5a45d4['$1'])):_0x54eecd[_0x33690a(0x2ca)][_0x33690a(0x1bd)][_0x33690a(0x3a1)](this,_0x209234);},Window_BattleLog['prototype'][_0x5130b4(0x345)]=function(_0x5e3451,_0x3640d1,_0x1df88e){const _0x5056c3=_0x5130b4;VisuMZ['BattleSystemBTB'][_0x5056c3(0x3e4)][_0x5056c3(0x3a1)](this,_0x5e3451,_0x3640d1,_0x1df88e);},Window_BattleLog[_0x5130b4(0x249)]['showBraveAnimationBTB']=function(_0xcbddac){const _0x34e2c3=_0x5130b4;if(!BattleManager[_0x34e2c3(0x29d)]())return![];if(!_0xcbddac)return![];if(!_0xcbddac[_0x34e2c3(0x329)]())return![];if(_0xcbddac[_0x34e2c3(0x244)])return![];const _0x185a3d=VisuMZ[_0x34e2c3(0x2ca)][_0x34e2c3(0x16c)][_0x34e2c3(0x39a)];if(!_0x185a3d[_0x34e2c3(0x320)])return![];if(_0x185a3d[_0x34e2c3(0x18a)]<=0x0)return![];return VisuMZ[_0x34e2c3(0x2ca)][_0x34e2c3(0x16c)]['BraveAnimation'][_0x34e2c3(0x320)];},Window_BattleLog['prototype'][_0x5130b4(0x32f)]=function(_0x4f7bf3,_0x2cc4d3,_0x4ae79f){const _0x5a8875=_0x5130b4;_0x4f7bf3[_0x5a8875(0x244)]=!![];let _0x4ac402=_0x4f7bf3[_0x5a8875(0x216)]();const _0xb6db0f=VisuMZ[_0x5a8875(0x2ca)][_0x5a8875(0x16c)]['BraveAnimation'],_0x581dad=_0xb6db0f[_0x5a8875(0x18a)],_0x54c9d6=_0xb6db0f[_0x5a8875(0x21a)];while(_0x4ac402--){if(_0x5a8875(0x2e4)!=='BxysE'){const _0x5e52f1=_0x4f4952[_0x5a8875(0x319)]();if(!_0x5e52f1)return;_0x5e52f1['performBrave']();const _0x5be683=this[_0x5a8875(0x2b6)][_0x5a8875(0x184)],_0x58ec8d=this[_0x5a8875(0x2b6)][_0x5a8875(0x1fe)],_0x1d1ea0=this['_actorCommandWindow']['index']();this[_0x5a8875(0x2b6)][_0x5a8875(0x361)](_0x5e52f1),this[_0x5a8875(0x2b6)][_0x5a8875(0x169)](_0x1d1ea0),this[_0x5a8875(0x2b6)]['_scrollX']=_0x5be683,this[_0x5a8875(0x2b6)][_0x5a8875(0x1fe)]=_0x58ec8d;}else this[_0x5a8875(0x21e)](_0x5a8875(0x1ab),[_0x4f7bf3],_0x581dad),_0x4ac402>0x0?this['push']('waitCount',_0x54c9d6):this['push'](_0x5a8875(0x37d));}this['push'](_0x5a8875(0x345),_0x4f7bf3,_0x2cc4d3,_0x4ae79f);},VisuMZ[_0x5130b4(0x2ca)]['Window_ActorCommand_addGuardCommand']=Window_ActorCommand['prototype'][_0x5130b4(0x23f)],Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x23f)]=function(){const _0x3639a0=_0x5130b4;this[_0x3639a0(0x324)](),VisuMZ[_0x3639a0(0x2ca)][_0x3639a0(0x182)][_0x3639a0(0x3a1)](this);},Window_ActorCommand[_0x5130b4(0x249)]['addBraveCommand']=function(){const _0x9a13d2=_0x5130b4;if(!this['canAddBraveCommand']())return;const _0x33bb26=this[_0x9a13d2(0x181)](),_0xe9b4cb=TextManager[_0x9a13d2(0x3bf)],_0x3e5924=ImageManager[_0x9a13d2(0x1d7)],_0x196816=_0x33bb26===_0x9a13d2(0x183)?_0xe9b4cb:_0x9a13d2(0x3fe)[_0x9a13d2(0x18b)](_0x3e5924,_0xe9b4cb);this[_0x9a13d2(0x3f6)](_0x196816,_0x9a13d2(0x34a),this[_0x9a13d2(0x3db)][_0x9a13d2(0x3e1)]()),BattleManager[_0x9a13d2(0x1f6)]();},Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x17e)]=function(){const _0x1285cd=_0x5130b4;if(!BattleManager[_0x1285cd(0x29d)]())return![];if(!VisuMZ[_0x1285cd(0x2ca)][_0x1285cd(0x16c)][_0x1285cd(0x1ed)][_0x1285cd(0x15d)])return![];if(this[_0x1285cd(0x3db)]&&this[_0x1285cd(0x3db)][_0x1285cd(0x3d4)]())return![];return!![];},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x323)]=Window_Selectable['prototype'][_0x5130b4(0x23a)],Window_Selectable['prototype'][_0x5130b4(0x23a)]=function(){const _0x1ff17a=_0x5130b4;if(this['isUsePageUpDnShortcutBTB']())_0x1ff17a(0x14d)===_0x1ff17a(0x14d)?this['_actor']&&!this[_0x1ff17a(0x3db)]['hideBraveTrait']()&&this[_0x1ff17a(0x3db)][_0x1ff17a(0x3e1)]()&&SceneManager[_0x1ff17a(0x239)]['performBrave']():this['_actionFusionRecipe']=_0x73a692;else{if(_0x1ff17a(0x348)!=='iGmYU')VisuMZ[_0x1ff17a(0x2ca)][_0x1ff17a(0x323)]['call'](this);else return _0x561812[_0x1ff17a(0x151)]();}},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x1f5)]=Window_Selectable[_0x5130b4(0x249)][_0x5130b4(0x300)],Window_Selectable[_0x5130b4(0x249)][_0x5130b4(0x300)]=function(){const _0x31375b=_0x5130b4;if(this[_0x31375b(0x23d)]()){if('lspgA'!==_0x31375b(0x3ba)){if(this[_0x31375b(0x3db)]&&!this['_actor']['hideBraveTrait']()&&this[_0x31375b(0x3db)][_0x31375b(0x1a8)]()>0x1){if(_0x31375b(0x209)===_0x31375b(0x190))return _0xb9359(_0x4539ff['$2']);else SceneManager[_0x31375b(0x239)][_0x31375b(0x27d)]();}}else _0xb8bd70[_0x31375b(0x2ca)][_0x31375b(0x1bd)][_0x31375b(0x3a1)](this,_0x448c7d);}else VisuMZ['BattleSystemBTB'][_0x31375b(0x1f5)][_0x31375b(0x3a1)](this);},Window_Selectable[_0x5130b4(0x249)][_0x5130b4(0x23d)]=function(){const _0x438335=_0x5130b4;if(this['constructor']!==Window_ActorCommand)return![];if(!SceneManager[_0x438335(0x289)]())return![];if(!BattleManager[_0x438335(0x29d)]())return![];return VisuMZ[_0x438335(0x2ca)]['Settings'][_0x438335(0x1ed)][_0x438335(0x28c)];},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x1a0)]=Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x13d)],Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x13d)]=function(){const _0x13aa6e=_0x5130b4;VisuMZ[_0x13aa6e(0x2ca)][_0x13aa6e(0x1a0)]['call'](this),this[_0x13aa6e(0x266)]();},VisuMZ['BattleSystemBTB'][_0x5130b4(0x3ec)]=Window_Base['prototype'][_0x5130b4(0x39d)],Window_Base[_0x5130b4(0x249)][_0x5130b4(0x39d)]=function(){const _0x3d9cbe=_0x5130b4;VisuMZ['BattleSystemBTB'][_0x3d9cbe(0x3ec)][_0x3d9cbe(0x3a1)](this),SceneManager[_0x3d9cbe(0x289)]()&&this['destroyBTBActionCounters']&&(_0x3d9cbe(0x30c)===_0x3d9cbe(0x222)?this[_0x3d9cbe(0x21e)]('waitCount',_0x3a3938):this['destroyBTBActionCounters']());},Window_ActorCommand['prototype'][_0x5130b4(0x25c)]=function(){const _0x4b232f=_0x5130b4;if(!this[_0x4b232f(0x24a)])return;this['_btbActionSprite'][_0x4b232f(0x297)]&&(_0x4b232f(0x1be)===_0x4b232f(0x1bc)?this['initialize'](...arguments):this[_0x4b232f(0x24a)][_0x4b232f(0x297)][_0x4b232f(0x362)]()),this[_0x4b232f(0x20b)](this['_btbActionSprite']),delete this[_0x4b232f(0x24a)];},Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x266)]=function(){const _0x243cd7=_0x5130b4;if(!BattleManager[_0x243cd7(0x29d)]())return;if(!this['_actor'])return;this[_0x243cd7(0x25c)]();if(this[_0x243cd7(0x3db)][_0x243cd7(0x3d4)]())return;this[_0x243cd7(0x24a)]=new Sprite(),this[_0x243cd7(0x22a)](this[_0x243cd7(0x24a)]),this[_0x243cd7(0x3de)]();},Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x3de)]=function(){const _0xeaecb6=_0x5130b4,_0x2c5344=VisuMZ['BattleSystemBTB'][_0xeaecb6(0x16c)][_0xeaecb6(0x1ed)][_0xeaecb6(0x36d)];_0x2c5344?_0x2c5344[_0xeaecb6(0x3a1)](this,this[_0xeaecb6(0x24a)],this,this[_0xeaecb6(0x3db)]):_0xeaecb6(0x208)===_0xeaecb6(0x198)?(_0x5c4373[_0xeaecb6(0x2ca)][_0xeaecb6(0x377)]['call'](this),this[_0xeaecb6(0x29d)]()&&this[_0xeaecb6(0x220)]()&&!this[_0xeaecb6(0x2db)]&&_0x18e0c6['canInput']()&&this[_0xeaecb6(0x197)]()):this[_0xeaecb6(0x298)][_0xeaecb6(0x3a1)](this,this['_btbActionSprite'],this,this['_actor']);},Window_ActorCommand['prototype'][_0x5130b4(0x298)]=function(){const _0x505bfe=_0x5130b4,_0x4f2484=arguments[0x0],_0x4e77e0=arguments[0x1],_0x1d133e=arguments[0x2];_0x4f2484['x']=Math[_0x505bfe(0x2ba)](_0x4e77e0['width']/0x2),_0x4f2484['y']=0x0,_0x4f2484[_0x505bfe(0x25e)]['x']=0.5,_0x4f2484['anchor']['y']=0.5;const _0x2d671e=TextManager[_0x505bfe(0x2a1)],_0x314783=TextManager[_0x505bfe(0x143)];let _0x2cd5df=_0x2d671e[_0x505bfe(0x27e)](_0x1d133e[_0x505bfe(0x1a8)]());const _0x2694a3=_0x1d133e[_0x505bfe(0x1df)];_0x2cd5df=_0x2cd5df[_0x505bfe(0x191)](0x0,_0x2694a3)+_0x314783+_0x2cd5df['substring'](_0x2694a3+0x1);const _0x1626f9=new Bitmap(_0x4e77e0[_0x505bfe(0x23e)],_0x4e77e0[_0x505bfe(0x2ad)]());_0x1626f9['fontSize']=0x24,_0x1626f9[_0x505bfe(0x415)](_0x2cd5df,0x0,0x0,_0x1626f9[_0x505bfe(0x23e)],_0x1626f9[_0x505bfe(0x2e7)],_0x505bfe(0x3e5)),_0x4f2484[_0x505bfe(0x297)]=_0x1626f9;},Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x321)]=function(){const _0x2f1a09=_0x5130b4;return BattleManager[_0x2f1a09(0x29d)]();},Window_ActorCommand[_0x5130b4(0x249)][_0x5130b4(0x2b0)]=function(){const _0xc6caba=_0x5130b4,_0x4ec969=BattleManager[_0xc6caba(0x3c8)]();if(_0x4ec969){if(_0xc6caba(0x290)===_0xc6caba(0x158)){const _0x2a8566=_0xca0248(_0x2bfdda['$1']);_0x422718[_0xc6caba(0x363)](_0x2a8566);}else{const _0x5be1b3=this[_0xc6caba(0x3a3)]();switch(_0x5be1b3){case _0xc6caba(0x27a):_0x4ec969[_0xc6caba(0x3f5)]();break;case _0xc6caba(0x2dc):_0x4ec969[_0xc6caba(0x282)]();break;case _0xc6caba(0x307):_0x4ec969[_0xc6caba(0x29f)](this[_0xc6caba(0x3a6)]());break;default:_0x4ec969['setSkill'](null);break;}}}Window_Command[_0xc6caba(0x249)][_0xc6caba(0x2b0)][_0xc6caba(0x3a1)](this);},Window_Base[_0x5130b4(0x249)][_0x5130b4(0x1ea)]=function(_0x52fe32,_0x25a97c,_0x3f0efb,_0x4051f4,_0x57ee11){const _0x278ac2=_0x5130b4;if(!_0x52fe32)return;if(!BattleManager[_0x278ac2(0x29d)]())return;const _0x1b543e=VisuMZ[_0x278ac2(0x2ca)][_0x278ac2(0x16c)]['Window'],_0x5112a1=BattleManager[_0x278ac2(0x2ce)]()?_0x1b543e[_0x278ac2(0x2b5)]:_0x1b543e[_0x278ac2(0x406)],_0x255c3a=_0x1b543e[_0x278ac2(0x38b)],_0x7299cf=_0x1b543e[_0x278ac2(0x2c0)],_0x598cb9=_0x1b543e[_0x278ac2(0x292)];let _0x3d69a2=0x0,_0x376de5=0x0;_0x376de5=_0x52fe32[_0x278ac2(0x355)]();if(_0x376de5>0x0)_0x3d69a2=_0x7299cf;if(_0x376de5===0x0)_0x3d69a2=_0x255c3a;if(_0x376de5<0x0)_0x3d69a2=_0x598cb9;const _0x1d00ce=_0x278ac2(0x221)[_0x278ac2(0x18b)](_0x3d69a2,_0x376de5),_0x5d6a70='\x5cI[%1]'[_0x278ac2(0x18b)](ImageManager[_0x278ac2(0x1d7)]);_0x376de5=_0x52fe32[_0x278ac2(0x175)]();if(_0x376de5>0x0)_0x3d69a2=_0x7299cf;if(_0x376de5===0x0)_0x3d69a2=_0x255c3a;if(_0x376de5<0x0){if(_0x278ac2(0x2b3)!==_0x278ac2(0x2b3)){const _0x170fa0=_0x3930e0[_0x278ac2(0x16c)],_0x436fd1=[_0x278ac2(0x311),_0x278ac2(0x1a2)][_0x278ac2(0x2c2)](_0x170fa0[_0x278ac2(0x1bb)]);return _0x436fd1;}else _0x3d69a2=_0x598cb9;}const _0x2f8beb=_0x278ac2(0x221)[_0x278ac2(0x18b)](_0x3d69a2,_0x376de5);let _0x3f6c44=_0x5112a1[_0x278ac2(0x18b)](_0x1d00ce,TextManager[_0x278ac2(0x2af)],_0x5d6a70,_0x2f8beb);const _0x141108=this[_0x278ac2(0x2b7)](_0x3f6c44)[_0x278ac2(0x23e)];if(_0x57ee11==='center')_0x25a97c+=Math[_0x278ac2(0x2ba)]((_0x4051f4-_0x141108)/0x2);else{if(_0x57ee11===_0x278ac2(0x32d)){if(_0x278ac2(0x3dd)!==_0x278ac2(0x3dd)){const _0x10b6bc=this[_0x278ac2(0x3f4)](),_0x5eba47=this['bitmapHeight']();_0x59a1db[_0x278ac2(0x297)]=new _0x5d153e(_0x10b6bc,_0x5eba47);const _0x273b41=_0x590e2a[_0x278ac2(0x3fa)](_0x290d89[_0x278ac2(0x234)[_0x278ac2(0x18b)](_0x5da4fc)]),_0x50fca8=_0xedb0a6[_0x278ac2(0x3fa)](_0x47bb2c[_0x278ac2(0x210)[_0x278ac2(0x18b)](_0x9aef1f)]);_0x591c52[_0x278ac2(0x297)][_0x278ac2(0x342)](0x0,0x0,_0x10b6bc,_0x5eba47,_0x273b41,_0x50fca8,!![]);}else _0x25a97c+=Math['round'](_0x4051f4-_0x141108);}}this[_0x278ac2(0x1af)](_0x3f6c44,_0x25a97c,_0x3f0efb,_0x4051f4);},Window_StatusBase[_0x5130b4(0x249)]['showBravePoints']=function(_0x164fb9){const _0x3bf557=_0x5130b4;if(!_0x164fb9)return![];if(!BattleManager['isBTB']())return![];if(!this[_0x3bf557(0x39e)])return![];if(_0x164fb9[_0x3bf557(0x3d4)]())return![];const _0x4ded02=VisuMZ[_0x3bf557(0x2ca)][_0x3bf557(0x16c)][_0x3bf557(0x1ed)],_0x30654e=this[_0x3bf557(0x39e)]();return _0x4ded02[_0x3bf557(0x382)[_0x3bf557(0x18b)](_0x30654e)];},VisuMZ[_0x5130b4(0x2ca)]['Window_BattleStatus_drawItemStatusListStyle']=Window_BattleStatus['prototype'][_0x5130b4(0x3a2)],Window_BattleStatus[_0x5130b4(0x249)][_0x5130b4(0x3a2)]=function(_0xd8e608){const _0x11cc36=_0x5130b4;VisuMZ[_0x11cc36(0x2ca)][_0x11cc36(0x1f9)][_0x11cc36(0x3a1)](this,_0xd8e608);const _0x5b4356=this[_0x11cc36(0x319)](_0xd8e608);if(this[_0x11cc36(0x31d)](_0x5b4356)){if(_0x11cc36(0x35f)==='SwNEg'){const _0x4e9601=this['itemLineRect'](_0xd8e608),_0x2def5d=$dataSystem['optDisplayTp']?0x4:0x3,_0x2be10c=_0x2def5d*0x80+(_0x2def5d-0x1)*0x8+0x4;let _0x2d5ae6=_0x4e9601['x']+this['padding'];if(VisuMZ['BattleCore'][_0x11cc36(0x16c)]['BattleLayout'][_0x11cc36(0x174)])_0x2d5ae6=_0x4e9601['x']+ImageManager['faceWidth']+0x8;else{if('kBZIg'===_0x11cc36(0x17a)){const _0xe5b6a5=new _0x463edf(_0x4677a2,_0x2402cb);this['_turnOrderInnerSprite'][_0x11cc36(0x22a)](_0xe5b6a5),this['_turnOrderContainer']['push'](_0xe5b6a5);}else _0x2d5ae6+=ImageManager['iconWidth'];}const _0xee5afb=Math[_0x11cc36(0x2ba)](Math[_0x11cc36(0x156)](_0x4e9601['x']+_0x4e9601[_0x11cc36(0x23e)]-_0x2be10c,_0x2d5ae6));let _0x3006ea=_0xee5afb+0x88,_0xe900b2=_0x4e9601['y'];_0x3006ea+=0x88*($dataSystem[_0x11cc36(0x3c4)]?0x3:0x2),_0x3006ea+=this[_0x11cc36(0x13e)](),_0xe900b2+=this['getOffsetY_BTB']();const _0x93b7ec=this[_0x11cc36(0x287)]();if(_0x3006ea>_0x4e9601['x']+_0x4e9601[_0x11cc36(0x23e)])return;this[_0x11cc36(0x1ea)](_0x5b4356,_0x3006ea,_0xe900b2,_0x4e9601[_0x11cc36(0x23e)],_0x93b7ec);}else{const _0x549bfb=_0x34adfc[_0x11cc36(0x2ca)][_0x11cc36(0x16c)][_0x11cc36(0x1ed)],_0x884bbf=this[_0x11cc36(0x39e)]();return _0x549bfb[_0x11cc36(0x296)[_0x11cc36(0x18b)](_0x884bbf)]||0x0;}}},VisuMZ[_0x5130b4(0x2ca)][_0x5130b4(0x164)]=Window_BattleStatus['prototype']['drawItemStatusXPStyle'],Window_BattleStatus[_0x5130b4(0x249)][_0x5130b4(0x2f6)]=function(_0xf91b07){const _0x15dedc=_0x5130b4;VisuMZ[_0x15dedc(0x2ca)][_0x15dedc(0x164)][_0x15dedc(0x3a1)](this,_0xf91b07);const _0xb2a207=this[_0x15dedc(0x319)](_0xf91b07);if(this[_0x15dedc(0x31d)](_0xb2a207)){const _0x168b49=this[_0x15dedc(0x19c)](_0xf91b07);let _0x3c59c2=_0x168b49['x'],_0x1f8964=_0x168b49['y'];_0x3c59c2+=this[_0x15dedc(0x13e)](),_0x1f8964+=this[_0x15dedc(0x13f)]();const _0x240359=this[_0x15dedc(0x287)]();this[_0x15dedc(0x1ea)](_0xb2a207,_0x3c59c2,_0x1f8964,_0x168b49['width'],_0x240359);}},Window_BattleStatus[_0x5130b4(0x249)][_0x5130b4(0x19c)]=function(_0x398756){const _0x2214e4=_0x5130b4,_0xd35501=this[_0x2214e4(0x2fd)](_0x398756);if(_0xd35501['width']<ImageManager['faceWidth'])return _0xd35501;let _0x36e4a5=Math[_0x2214e4(0x2ba)]((_0xd35501[_0x2214e4(0x23e)]-ImageManager[_0x2214e4(0x1e9)])/0x2);return _0xd35501[_0x2214e4(0x23e)]=ImageManager['faceWidth'],_0xd35501['x']+=_0x36e4a5,_0xd35501;},Window_BattleStatus['prototype'][_0x5130b4(0x287)]=function(){const _0x17e272=_0x5130b4,_0x57c8c0=VisuMZ['BattleSystemBTB']['Settings'][_0x17e272(0x1ed)],_0x2a4dd8=this['battleLayoutStyle']();return _0x57c8c0[_0x17e272(0x279)[_0x17e272(0x18b)](_0x2a4dd8)]||0x0;},Window_BattleStatus[_0x5130b4(0x249)][_0x5130b4(0x13e)]=function(){const _0x4132d2=_0x5130b4,_0x264e46=VisuMZ[_0x4132d2(0x2ca)]['Settings'][_0x4132d2(0x1ed)],_0x52ddb8=this['battleLayoutStyle']();return _0x264e46[_0x4132d2(0x296)[_0x4132d2(0x18b)](_0x52ddb8)]||0x0;},Window_BattleStatus[_0x5130b4(0x249)][_0x5130b4(0x13f)]=function(){const _0x549a75=_0x5130b4,_0x53ac4c=VisuMZ[_0x549a75(0x2ca)][_0x549a75(0x16c)]['Window'],_0x4dd6e4=this[_0x549a75(0x39e)]();return _0x53ac4c['%1_offsetY'[_0x549a75(0x18b)](_0x4dd6e4)]||0x0;},Window_BattleSkill['prototype']['isBattleItemWindowBTB']=function(){const _0x32ee7b=_0x5130b4;return BattleManager[_0x32ee7b(0x29d)]();},Window_BattleSkill[_0x5130b4(0x249)][_0x5130b4(0x2b0)]=function(){const _0x3bd2ce=_0x5130b4,_0x4b3b56=this[_0x3bd2ce(0x29c)](),_0x43fa6c=BattleManager[_0x3bd2ce(0x3c8)]();if(_0x43fa6c)_0x43fa6c['setSkill'](_0x4b3b56?_0x4b3b56['id']:null);Window_SkillList['prototype'][_0x3bd2ce(0x2b0)][_0x3bd2ce(0x3a1)](this);},Window_BattleItem['prototype'][_0x5130b4(0x321)]=function(){const _0x74a07d=_0x5130b4;return BattleManager[_0x74a07d(0x29d)]();},Window_BattleItem['prototype']['applyBattleItemWindowBTB']=function(){const _0x1b4288=_0x5130b4,_0x5f0327=this[_0x1b4288(0x29c)](),_0x5d3586=BattleManager[_0x1b4288(0x3c8)]();if(_0x5d3586)_0x5d3586[_0x1b4288(0x2d3)](_0x5f0327?_0x5f0327['id']:null);Window_ItemList[_0x1b4288(0x249)][_0x1b4288(0x2b0)][_0x1b4288(0x3a1)](this);};function _0x292a(_0x5638fb,_0xb038a2){const _0x8b096=_0x8b09();return _0x292a=function(_0x292a7c,_0x56b6a0){_0x292a7c=_0x292a7c-0x139;let _0x1e1e9c=_0x8b096[_0x292a7c];return _0x1e1e9c;},_0x292a(_0x5638fb,_0xb038a2);}function Window_BTB_TurnOrder(){const _0xfc39b6=_0x5130b4;this[_0xfc39b6(0x3e8)](...arguments);}Window_BTB_TurnOrder['prototype']=Object['create'](Window_Base[_0x5130b4(0x249)]),Window_BTB_TurnOrder['prototype']['constructor']=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x5130b4(0x16c)]=VisuMZ['BattleSystemBTB']['Settings']['TurnOrder'],Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x3e8)]=function(){const _0x4f7cfa=_0x5130b4,_0x50cb84=this[_0x4f7cfa(0x2c4)]();this[_0x4f7cfa(0x2b9)](_0x50cb84),Window_Base[_0x4f7cfa(0x249)][_0x4f7cfa(0x3e8)][_0x4f7cfa(0x3a1)](this,_0x50cb84),this[_0x4f7cfa(0x395)](),this[_0x4f7cfa(0x36b)](),this[_0x4f7cfa(0x2a0)]=0x0;},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x2c4)]=function(){const _0x18fac6=_0x5130b4;return this[_0x18fac6(0x3e3)]($gameParty[_0x18fac6(0x3d9)](),0x9,!![]);},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x2b9)]=function(_0x3d84ae){const _0x344366=_0x5130b4;this[_0x344366(0x369)]=this[_0x344366(0x350)]=_0x3d84ae['x'],this[_0x344366(0x19d)]=this[_0x344366(0x22f)]=_0x3d84ae['y'],this['_fullWidth']=_0x3d84ae['width'],this[_0x344366(0x30e)]=_0x3d84ae[_0x344366(0x2e7)],this['_homeDuration']=0x0;},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x3e3)]=function(_0x30cae0,_0x421591,_0x12359d){const _0x39e4d1=_0x5130b4,_0x495611=Window_BTB_TurnOrder[_0x39e4d1(0x16c)],_0x5419af=this[_0x39e4d1(0x1f8)]()?_0x495611[_0x39e4d1(0x3ab)]:_0x495611[_0x39e4d1(0x32a)],_0x16f218=Math['min'](_0x5419af,_0x30cae0+_0x421591),_0x46a1d3=SceneManager[_0x39e4d1(0x239)][_0x39e4d1(0x1f0)][_0x39e4d1(0x2e7)],_0xc7dfb1=SceneManager[_0x39e4d1(0x239)]['_helpWindow'][_0x39e4d1(0x2e7)],_0x3eec46=_0x495611[_0x39e4d1(0x2d0)],_0x508d13=Graphics[_0x39e4d1(0x2e7)]-_0x46a1d3-_0xc7dfb1;let _0x3896d8=0x0,_0x35981a=0x0,_0x4a0f12=0x0,_0x34457a=0x0;switch(_0x495611[_0x39e4d1(0x1bb)]){case'top':_0x3896d8=_0x495611['SpriteThin']*_0x16f218+_0x3eec46,_0x35981a=_0x495611[_0x39e4d1(0x14f)],_0x4a0f12=Math['ceil']((Graphics[_0x39e4d1(0x23e)]-_0x3896d8)/0x2),_0x34457a=_0x495611[_0x39e4d1(0x2fc)];break;case _0x39e4d1(0x1a2):_0x3896d8=_0x495611[_0x39e4d1(0x2f5)]*_0x16f218+_0x3eec46,_0x35981a=_0x495611[_0x39e4d1(0x14f)],_0x4a0f12=Math[_0x39e4d1(0x357)]((Graphics[_0x39e4d1(0x23e)]-_0x3896d8)/0x2),_0x34457a=Graphics[_0x39e4d1(0x2e7)]-_0x46a1d3-_0x35981a-_0x495611[_0x39e4d1(0x2fc)];break;case _0x39e4d1(0x33f):_0x3896d8=_0x495611[_0x39e4d1(0x14f)],_0x35981a=_0x495611[_0x39e4d1(0x2f5)]*_0x16f218+_0x3eec46,_0x4a0f12=_0x495611[_0x39e4d1(0x2fc)],_0x34457a=Math[_0x39e4d1(0x357)]((_0x508d13-_0x35981a)/0x2),_0x34457a+=_0xc7dfb1;break;case _0x39e4d1(0x32d):_0x3896d8=_0x495611[_0x39e4d1(0x14f)],_0x35981a=_0x495611[_0x39e4d1(0x2f5)]*_0x16f218+_0x3eec46,_0x4a0f12=Graphics[_0x39e4d1(0x23e)]-_0x3896d8-_0x495611[_0x39e4d1(0x2fc)],_0x34457a=Math[_0x39e4d1(0x357)]((_0x508d13-_0x35981a)/0x2),_0x34457a+=_0xc7dfb1;break;}if(!_0x12359d){const _0x4c22da=Window_BTB_TurnOrder[_0x39e4d1(0x16c)][_0x39e4d1(0x2b4)];let _0x2661f2=Math['min'](_0x5419af,Math['min']($gameParty[_0x39e4d1(0x3d9)]()+0x8)-_0x16f218);switch(_0x495611[_0x39e4d1(0x1bb)]){case _0x39e4d1(0x311):case _0x39e4d1(0x1a2):_0x4c22da&&(_0x4a0f12-=_0x2661f2*_0x495611[_0x39e4d1(0x2f5)]);break;}}return _0x4a0f12+=_0x495611[_0x39e4d1(0x2f8)],_0x34457a+=_0x495611['DisplayOffsetY'],new Rectangle(_0x4a0f12,_0x34457a,_0x3896d8,_0x35981a);},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x2e3)]=function(){this['padding']=0x0;},Window_BTB_TurnOrder['prototype']['isHorz']=function(){const _0x2dbb33=_0x5130b4,_0x7ef7d2=Window_BTB_TurnOrder[_0x2dbb33(0x16c)],_0x3aacd5=['top',_0x2dbb33(0x1a2)][_0x2dbb33(0x2c2)](_0x7ef7d2[_0x2dbb33(0x1bb)]);return _0x3aacd5;},Window_BTB_TurnOrder['prototype'][_0x5130b4(0x395)]=function(){const _0x54aad8=_0x5130b4;this['_turnOrderInnerSprite']=new Sprite(),this[_0x54aad8(0x322)](this[_0x54aad8(0x1d1)]),this[_0x54aad8(0x269)]=[];for(let _0x4731ad=0x0;_0x4731ad<$gameParty[_0x54aad8(0x3d9)]();_0x4731ad++){const _0x2c546f=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x4731ad);this['_turnOrderInnerSprite'][_0x54aad8(0x22a)](_0x2c546f),this['_turnOrderContainer'][_0x54aad8(0x21e)](_0x2c546f);}for(let _0x2c98c9=0x0;_0x2c98c9<$gameTroop[_0x54aad8(0x339)]()[_0x54aad8(0x286)];_0x2c98c9++){const _0x451abb=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x2c98c9);this[_0x54aad8(0x1d1)][_0x54aad8(0x22a)](_0x451abb),this[_0x54aad8(0x269)][_0x54aad8(0x21e)](_0x451abb);}},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x33c)]=function(){const _0x48c15d=_0x5130b4;Window_Base[_0x48c15d(0x249)][_0x48c15d(0x33c)][_0x48c15d(0x3a1)](this),this[_0x48c15d(0x3b0)](),this[_0x48c15d(0x24e)](),this[_0x48c15d(0x1cb)](),this[_0x48c15d(0x2de)](),this[_0x48c15d(0x36b)]();},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x3b0)]=function(){const _0x1de538=_0x5130b4;if(this['_homeDuration']>0x0){if(_0x1de538(0x3ff)!==_0x1de538(0x3ff))return 0x1;else{const _0x4be258=this['_homeDuration'];this['_homeX']=(this[_0x1de538(0x350)]*(_0x4be258-0x1)+this['_targetHomeX'])/_0x4be258,this[_0x1de538(0x22f)]=(this[_0x1de538(0x22f)]*(_0x4be258-0x1)+this[_0x1de538(0x19d)])/_0x4be258,this[_0x1de538(0x407)]--,this[_0x1de538(0x407)]<=0x0&&(this['_homeX']=this['_targetHomeX'],this[_0x1de538(0x22f)]=this['_targetHomeY']);}}},Window_BTB_TurnOrder[_0x5130b4(0x249)][_0x5130b4(0x24e)]=function(){const _0x56a2c8=_0x5130b4,_0x36d820=Window_BTB_TurnOrder['Settings'];if(_0x36d820[_0x56a2c8(0x1bb)]!=='top')return;if(!_0x36d820[_0x56a2c8(0x264)])return;const _0x18d831=SceneManager[_0x56a2c8(0x239)][_0x56a2c8(0x3cf)];if(!_0x18d831)return;if(_0x18d831[_0x56a2c8(0x1ec)]){if(_0x56a2c8(0x1c8)!==_0x56a2c8(0x37a))this['x']=this['_homeX']+(_0x36d820[_0x56a2c8(0x38f)]||0x0),this['y']=this['_homeY']+(_0x36d820[_0x56a2c8(0x227)]||0x0);else{if(this['isBTB']())return![];return _0x31c4c7[_0x56a2c8(0x2ca)][_0x56a2c8(0x313)][_0x56a2c8(0x3a1)](this);}}else _0x56a2c8(0x303)===_0x56a2c8(0x41a)?this['commandCancel']():(this['x']=this['_homeX'],this['y']=this['_homeY']);const _0x382ad2=SceneManager[_0x56a2c8(0x239)][_0x56a2c8(0x3df)];this['_ogWindowLayerX']===undefined&&(this[_0x56a2c8(0x1eb)]=Math[_0x56a2c8(0x2ba)]((Graphics[_0x56a2c8(0x23e)]-Math[_0x56a2c8(0x156)](Graphics['boxWidth'],_0x382ad2['width']))/0x2),this[_0x56a2c8(0x392)]=Math[_0x56a2c8(0x2ba)]((Graphics[_0x56a2c8(0x2e7)]-Math[_0x56a2c8(0x156)](Graphics[_0x56a2c8(0x364)],_0x382ad2[_0x56a2c8(0x2e7)]))/0x2)),this['x']+=_0x382ad2['x']-this[_0x56a2c8(0x1eb)],this['y']+=_0x382ad2['y']-this[_0x56a2c8(0x392)];},Window_BTB_TurnOrder[_0x5130b4(0x249)]['updateSidePosition']=function(){const _0x146d8e=_0x5130b4,_0x28f471=Window_BTB_TurnOrder[_0x146d8e(0x16c)];if([_0x146d8e(0x311)][_0x146d8e(0x2c2)](_0x28f471[_0x146d8e(0x1bb)]))return;this['x']=this['_homeX'],this['y']=this[_0x146d8e(0x22f)];const _0x5734a1=SceneManager[_0x146d8e(0x239)][_0x146d8e(0x3df)];this['x']+=_0x5734a1['x'],this['y']+=_0x5734a1['y'];},Window_BTB_TurnOrder['prototype'][_0x5130b4(0x2de)]=function(){const _0x4ef973=_0x5130b4;if(!this['_turnOrderInnerSprite'])return;const _0x1043ed=this[_0x4ef973(0x1d1)][_0x4ef973(0x3be)];if(!_0x1043ed)return;_0x1043ed[_0x4ef973(0x2f1)](this[_0x4ef973(0x365)][_0x4ef973(0x1dc)](this));},Window_BTB_TurnOrder[_0x5130b4(0x249)]['compareBattlerSprites']=function(_0xf21853,_0x8941d5){const _0x524ebc=_0x5130b4,_0x13b869=this[_0x524ebc(0x1f8)](),_0x1efee0=Window_BTB_TurnOrder[_0x524ebc(0x16c)]['OrderDirection'];if(_0x13b869&&!_0x1efee0){if(_0x524ebc(0x2e0)===_0x524ebc(0x2e0))return _0xf21853['x']-_0x8941d5['x'];else this[_0x524ebc(0x21e)](_0x524ebc(0x1ab),[_0x531b44],_0x5745db),_0x2e6687>0x0?this[_0x524ebc(0x21e)](_0x524ebc(0x189),_0x5ae23b):this[_0x524ebc(0x21e)]('waitForAnimation');}else{if(_0x13b869&&_0x1efee0)return _0x8941d5['x']-_0xf21853['x'];else{if(!_0x13b869&&_0x1efee0)return _0xf21853['y']-_0x8941d5['y'];else{if(!_0x13b869&&!_0x1efee0)return _0x8941d5['y']-_0xf21853['y'];}}}},Window_BTB_TurnOrder['prototype'][_0x5130b4(0x36b)]=function(){const _0x4000bf=_0x5130b4;this[_0x4000bf(0x1ec)]=$gameSystem['isBattleSystemBTBTurnOrderVisible']();},Window_BTB_TurnOrder[_0x5130b4(0x249)]['updateTurnOrder']=function(_0x317c10){const _0x2a875b=_0x5130b4;this[_0x2a875b(0x269)][_0x2a875b(0x2f1)]((_0x14c99f,_0x4320bc)=>{const _0x201f73=_0x2a875b;return _0x14c99f[_0x201f73(0x2d1)]()-_0x4320bc[_0x201f73(0x2d1)]();}),this['recalculateHome']();if(!_0x317c10)return;for(const _0x554670 of this[_0x2a875b(0x269)]){if(!_0x554670)continue;_0x554670[_0x2a875b(0x33c)](),_0x554670[_0x2a875b(0x405)]=0x0;}},Window_BTB_TurnOrder['prototype'][_0x5130b4(0x202)]=function(){const _0x3e861f=_0x5130b4;if(!this[_0x3e861f(0x1f8)]())return;const _0x27c0a4=VisuMZ[_0x3e861f(0x2ca)][_0x3e861f(0x16c)]['TurnOrder'];if(!_0x27c0a4[_0x3e861f(0x35c)])return;const _0x47bff9=$gameParty[_0x3e861f(0x339)]()[_0x3e861f(0x2fb)](_0x355da3=>_0x355da3&&_0x355da3[_0x3e861f(0x15a)]()&&_0x355da3[_0x3e861f(0x314)]())['length'],_0x16275b=$gameTroop[_0x3e861f(0x339)]()[_0x3e861f(0x2fb)](_0x102836=>_0x102836&&_0x102836['isAlive']()&&_0x102836[_0x3e861f(0x314)]())[_0x3e861f(0x286)],_0x126688=this[_0x3e861f(0x3e3)](_0x47bff9,_0x16275b);this[_0x3e861f(0x369)]=_0x126688['x'],this[_0x3e861f(0x19d)]=_0x126688['y'],(this['_targetHomeX']!==this[_0x3e861f(0x350)]||this[_0x3e861f(0x19d)]!==this[_0x3e861f(0x22f)])&&(this[_0x3e861f(0x407)]=_0x27c0a4[_0x3e861f(0x3b1)]);};